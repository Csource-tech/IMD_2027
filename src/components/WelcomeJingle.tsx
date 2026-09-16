"use client";

import { useEffect, useRef } from "react";

export default function WelcomeJingle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 1.0;

    let fadeInterval: NodeJS.Timeout | null = null;
    let stopTimeout: NodeJS.Timeout | null = null;
    let hardStopTimeout: NodeJS.Timeout | null = null;

    const stopAudio = () => {
      if (fadeInterval) clearInterval(fadeInterval);
      if (stopTimeout) clearTimeout(stopTimeout);
      if (hardStopTimeout) clearTimeout(hardStopTimeout);
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };

    const startAudio = () => {
      if (startedRef.current || !audio) return;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            startedRef.current = true;
            removeGestureListeners();

            // Smooth fade out starting at 4.2s, completing at 5.0s
            stopTimeout = setTimeout(() => {
              fadeInterval = setInterval(() => {
                if (audio.volume > 0.08) {
                  audio.volume = Math.max(0, audio.volume - 0.15);
                } else {
                  stopAudio();
                }
              }, 60);
            }, 4200);

            // Hard stop at 5.2s
            hardStopTimeout = setTimeout(stopAudio, 5200);
          })
          .catch(() => {
            // Autoplay was blocked without user gesture; gesture listeners are waiting
          });
      }
    };

    const gestureEvents = ["pointerdown", "touchstart", "mousedown", "keydown", "click"];

    const onGesture = () => {
      startAudio();
    };

    const removeGestureListeners = () => {
      gestureEvents.forEach((evt) => {
        window.removeEventListener(evt, onGesture, true);
        document.removeEventListener(evt, onGesture, true);
      });
    };

    // Attach capture listeners to window & document for instant trigger on first user touch/click
    gestureEvents.forEach((evt) => {
      window.addEventListener(evt, onGesture, { capture: true, once: true });
      document.addEventListener(evt, onGesture, { capture: true, once: true });
    });

    // Attempt instant playback on page load/reload
    startAudio();

    return () => {
      removeGestureListeners();
      stopAudio();
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      autoPlay
      playsInline
      preload="auto"
      className="hidden"
      aria-hidden="true"
    >
      <source src="/jingle.mp3" type="audio/mpeg" />
      <source src="/jingle.webm" type="audio/webm" />
    </audio>
  );
}
