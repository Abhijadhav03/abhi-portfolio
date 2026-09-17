'use client';

import GitHubActivity from "@/components/ui/github-activity";

export function GitHubActivitySection() {
  return (
    <section className="py-16 text-center">
      <h2 className="text-4xl md:text-5xl font-instrument-serif text-white">
        Github Stats
      </h2>
      <p className="mt-3 text-base md:text-lg text-white/50 mx-6">
        abhijadhav03&apos;s coding journey over the past year
      </p>
      <div className="flex justify-center items-center mt-10 px-4">
        <GitHubActivity username="Abhijadhav03" />
      </div>
    </section>
  );
}
