import { NextResponse } from "next/server";

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const CURRENTLY_PLAYING_URL = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_URL =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

// Simple in-memory cache for the access token (tokens live ~1h).
let cachedToken: { token: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  // Reuse a still-valid token to avoid hitting the auth endpoint on every call.
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.token;
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  cachedToken = {
    token: data.access_token as string,
    expiresAt: Date.now() + (data.expires_in as number) * 1000,
  };

  return cachedToken.token;
}

function mapTrack(track: any) {
  const image =
    track?.album?.images?.sort((a: any, b: any) => a.height - b.height)?.[0]?.url ??
    track?.album?.images?.[0]?.url ??
    "";

  return {
    title: track?.name ?? "Unknown track",
    artist: track?.artists?.map((a: any) => a.name).join(", ") ?? "Unknown artist",
    image,
    link: track?.external_urls?.spotify ?? "https://open.spotify.com",
    audio: track?.preview_url ?? undefined,
  };
}

// Spotify's preview_url is null for most tracks now, so fall back to a free
// 30-second preview clip from the iTunes Search API (no key/auth required).
async function getItunesPreview(title: string, artist: string): Promise<string | undefined> {
  try {
    const term = `${title} ${artist}`.trim();
    const res = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(
        term
      )}&entity=song&limit=1`,
      { cache: "force-cache" }
    );
    if (!res.ok) return undefined;
    const data = await res.json();
    const preview = data?.results?.[0]?.previewUrl;
    return typeof preview === "string" ? preview : undefined;
  } catch {
    return undefined;
  }
}

async function buildTrackResponse(track: any) {
  const mapped = mapTrack(track);
  if (!mapped.audio) {
    mapped.audio = await getItunesPreview(mapped.title, mapped.artist);
  }
  return mapped;
}

export const GET = async () => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return NextResponse.json(
      { error: "Spotify credentials are not configured." },
      { status: 500 }
    );
  }

  const headers = { Authorization: `Bearer ${accessToken}` };

  // Prefer the currently-playing track; fall back to the most recent play.
  try {
    const currentRes = await fetch(CURRENTLY_PLAYING_URL, {
      headers,
      cache: "no-store",
    });

    // 204 No Content means nothing is actively playing right now.
    if (currentRes.status === 200) {
      const data = await currentRes.json();
      const track = data?.item;
      if (track && data?.is_playing !== false) {
        return NextResponse.json(await buildTrackResponse(track));
      }
    }
  } catch {
    // ignore and fall through to recently-played
  }

  try {
    const recentRes = await fetch(RECENTLY_PLAYED_URL, {
      headers,
      cache: "no-store",
    });

    if (recentRes.ok) {
      const data = await recentRes.json();
      const track = data?.items?.[0]?.track;
      if (track) {
        return NextResponse.json(await buildTrackResponse(track));
      }
    }
  } catch {
    // handled below
  }

  return NextResponse.json(
    { error: "Could not read your recent Spotify plays." },
    { status: 503 }
  );
};
