// One-time helper to obtain a Spotify REFRESH_TOKEN for the portfolio footer card.
//
// Usage:
//   1. Create an app at https://developer.spotify.com/dashboard
//   2. Add this exact Redirect URI in the app settings:  http://127.0.0.1:3000/
//   3. Put your SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env.local
//   4. Run:  node scripts/spotify-auth.mjs
//   5. Authorize in the browser that opens, then copy the printed
//      SPOTIFY_REFRESH_TOKEN line into .env.local
//
// Requires Node 18+ (uses built-in fetch).

import http from "node:http";
import { URL } from "node:url";
import { readFileSync, existsSync } from "node:fs";
import { randomBytes } from "node:crypto";

// --- Load SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET from .env.local ---
const env = {};
if (existsSync(".env.local")) {
  for (const line of readFileSync(".env.local", "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)\s*=\s*(.*)$/i);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const clientId = process.env.SPOTIFY_CLIENT_ID || env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET || env.SPOTIFY_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  console.error(
    "✖ Missing SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET. Add them to .env.local first."
  );
  process.exit(1);
}

const PORT = 3000;
const HOST = "127.0.0.1";
const redirectUri = `http://${HOST}:${PORT}/`;
const scopes = ["user-read-currently-playing", "user-read-recently-played"].join(
  " "
);
const state = randomBytes(16).toString("hex");

const authUrl =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    scope: scopes,
    state,
    show_dialog: "true",
  }).toString();

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${HOST}:${PORT}`);
  if (url.pathname !== "/") return;

  const code = url.searchParams.get("code");
  const returnedState = url.searchParams.get("state");
  const error = url.searchParams.get("error");

  if (error) {
    res.end("Authorization denied. You can close this tab.");
    console.error("✖ Authorization denied:", error);
    return;
  }
  if (!code || returnedState !== state) {
    res.end("Invalid callback.");
    return;
  }

  try {
    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString(
          "base64"
        )}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
    });

    const data = await tokenRes.json();
    if (!tokenRes.ok) throw new Error(JSON.stringify(data));

    console.log("\n✅ Success! Add this line to your .env.local:\n");
    console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}\n`);
    res.end(
      "<h2>✅ Got your refresh token.</h2><p>Check the terminal, then close this tab.</p>"
    );
  } catch (err) {
    console.error("✖ Token exchange failed:", err.message);
    res.end("Token exchange failed. Check the terminal.");
  } finally {
    server.close();
    setTimeout(() => process.exit(0), 200);
  }
});

server.listen(PORT, HOST, () => {
  console.log("Open this URL in your browser to authorize:\n");
  console.log(authUrl + "\n");
  // Best-effort auto-open across platforms.
  import("node:child_process").then(({ exec }) => {
    const cmd =
      process.platform === "win32"
        ? `start "" "${authUrl}"`
        : process.platform === "darwin"
        ? `open "${authUrl}"`
        : `xdg-open "${authUrl}"`;
    exec(cmd, () => {});
  });
});
