"use client";

import { useState } from "react";
import { Media, PlayButton } from "@/components/ui";
import type { HomeContent } from "@/content/home";

export function VideoBanner({ content }: { content: HomeContent["videoBanner"] }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="bg-page  py-14 lg:py-16">
      <div className="container-page">
        <div className="relative h-[13rem] overflow-hidden rounded-card md:h-[25.75rem] lg:h-[30.75rem]">
          {isPlaying ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${content.videoId}?autoplay=1&rel=0`}
              title="Human Concern USA story"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <>
              <Media
                src={content.image}
                alt={content.imageAlt}
                sizes="(min-width: 1440px) 1400px, 100vw"
              />
              <PlayButton
                label="Play the Human Concern USA story"
                onClick={() => setIsPlaying(true)}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
