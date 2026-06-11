"use client";

import { useEffect, useRef, useState } from "react";

function SpeakerOn() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
      <path d="M16 8.5a4 4 0 010 7M18.5 6a7 7 0 010 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function SpeakerOff() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
      <path d="M16 9l5 6M21 9l-5 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Lively in-view muted autoplay plus an explicit "play with sound" control that
 * restarts the clip with its audio. Under prefers-reduced-motion it does not
 * autoplay and shows native controls instead.
 */
export default function BrandFilm({
  src,
  poster,
  className = "",
  wrapperClassName = "relative",
  withSound = true,
}: {
  src: string;
  poster: string;
  className?: string;
  wrapperClassName?: string;
  withSound?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (v) v.muted = muted;
  }, [muted]);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reduced) v.play().catch(() => {});
        else {
          v.pause();
          if (!muted) setMuted(true);
        }
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    const nextMuted = !muted;
    setMuted(nextMuted);
    v.muted = nextMuted;
    if (!nextMuted) {
      v.currentTime = 0;
      v.play().catch(() => {});
    }
  };

  return (
    <div className={wrapperClassName}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        controls={reduced}
        className={className}
      />
      {withSound && !reduced && (
        <button
          type="button"
          onClick={toggleSound}
          className="absolute bottom-4 right-4 z-20 inline-flex items-center gap-2 rounded-full bg-black/45 px-3.5 py-2 text-xs font-medium text-paper backdrop-blur-[2px] transition-colors hover:bg-black/65"
          aria-pressed={!muted}
        >
          {muted ? <SpeakerOn /> : <SpeakerOff />}
          {muted ? "Play with sound" : "Mute"}
        </button>
      )}
    </div>
  );
}
