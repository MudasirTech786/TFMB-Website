"use client";

import { useEffect, useRef } from "react";

type ProposalGenderAvatarProps = {
  variant: "male" | "female";
};

const avatarAssets = {
  male: {
    video: "/images/proposals/male.mp4",
  },
  female: {
    video: "/images/proposals/female.mp4",
  },
} as const;

export default function ProposalGenderAvatar({ variant }: ProposalGenderAvatarProps) {
  const avatar = avatarAssets[variant];
  const sceneRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const video = videoRef.current;
    if (!scene || !video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onError = () => {
      video.setAttribute("data-video-failed", "true");
      video.pause();
    };

    video.addEventListener("error", onError);

    const loadSource = (preload: "metadata" | "none") => {
      if (video.dataset.videoFailed === "true" || video.hasAttribute("src")) return;
      video.preload = preload;
      video.src = avatar.video;
      video.load();
    };

    if (!("IntersectionObserver" in window)) {
      loadSource("none");
      void video.play().catch(() => {});
      return () => {
        video.removeEventListener("error", onError);
        video.pause();
        video.removeAttribute("src");
        video.load();
      };
    }

    // Fetch metadata before the portrait reaches the viewport so playback can
    // start promptly, without downloading every video at initial page load.
    const warmObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        loadSource("metadata");
        warmObserver.unobserve(scene);
      }
    }, { rootMargin: "320px 0px", threshold: 0 });

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target !== scene) continue;
        if (entry.isIntersecting) {
          if (video.dataset.videoFailed === "true") continue;
          loadSource("none");
          void video.play().catch(() => {
            // Leave playback stopped if the browser declines autoplay.
          });
        } else {
          video.pause();
        }
      }
    }, { threshold: 0.05 });

    warmObserver.observe(scene);
    observer.observe(scene);
    return () => {
      warmObserver.disconnect();
      observer.disconnect();
      video.removeEventListener("error", onError);
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [avatar.video]);

  return (
    <div ref={sceneRef} className={`proposal-avatar-scene ${variant}`} aria-hidden="true">
      <video
        ref={videoRef}
        className="proposal-avatar-video"
        muted
        playsInline
        loop
        preload="none"
        tabIndex={-1}
        aria-hidden="true"
      />
    </div>
  );
}
