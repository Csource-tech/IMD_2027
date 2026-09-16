"use client";

import { useEffect, useRef } from "react";

export default function WelcomeJingle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = 0.4;
    audio.preload = "auto";

    let stopTimer: NodeJS.Timeout | null = null;

    const interactionEvents = [
      "pointerdown",
      "touchstart",
      "click",
      "wheel",
      "scroll",
      "keydown",
    ] as const;

    const removeInteractionListeners = () => {
      interactionEvents.forEach((evt) => {
        window.removeEventListener(evt, handleFirstInteraction, true);
      });
    };

    const startAudio = async () => {
      if (startedRef.current) return;

      try {
        await audio.play();

        startedRef.current = true;
        removeInteractionListeners();

        // Safety stop after 3.5 seconds
        stopTimer = setTimeout(() => {
          audio.pause();
          audio.currentTime = 0;
        }, 4000);
      } catch {
        // Autoplay blocked by browser policy.
        // Waiting for user interaction to trigger playback.
      }
    };

    const handleFirstInteraction = () => {
      // Detach scroll & wheel immediately after first attempt to prevent scroll spam
      window.removeEventListener("scroll", handleFirstInteraction, true);
      window.removeEventListener("wheel", handleFirstInteraction, true);
      startAudio();
    };

    // Attach listeners with passive and capture for instant response
    interactionEvents.forEach((evt) => {
      window.addEventListener(evt, handleFirstInteraction, {
        passive: true,
        capture: true,
      });
    });

    // 1. Try autoplay immediately on page mount
    startAudio();

    return () => {
      removeInteractionListeners();
      if (stopTimer) clearTimeout(stopTimer);
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      playsInline
      preload="auto"
      className="hidden"
      aria-hidden="true"
    >
      <source src="/jingle.webm" type="audio/webm" />
      <source src="/jingle.mp3" type="audio/mpeg" />
    </audio>
  );
}