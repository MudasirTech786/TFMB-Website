"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type ProposalGenderAvatarProps = {
  variant: "male" | "female";
};

const avatarAssets = {
  male: {
    src: "/images/proposals/male-proposal.jpg",
    video: "/images/proposals/male.mp4",
    position: "center 31%",
  },
  female: {
    src: "/images/proposals/female-proposal.jpg",
    video: "/images/proposals/female.mp4",
    position: "center 30%",
  },
} as const;

export default function ProposalGenderAvatar({ variant }: ProposalGenderAvatarProps) {
  const avatar = avatarAssets[variant];
  const sceneRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const video = videoRef.current;
    if (!scene || !video || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onPlaying = () => video.setAttribute("data-video-playing", "true");
    const onPause = () => video.removeAttribute("data-video-playing");
    const onError = () => {
      video.removeAttribute("data-video-playing");
      video.setAttribute("data-video-failed", "true");
      video.pause();
    };

    video.addEventListener("playing", onPlaying);
    video.addEventListener("pause", onPause);
    video.addEventListener("error", onError);

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target !== scene) continue;
        if (entry.isIntersecting) {
          if (video.dataset.videoFailed === "true") continue;
          if (!video.hasAttribute("src")) {
            video.src = avatar.video;
            video.load();
          }
          void video.play().catch(() => {
            // Keep the poster image visible when autoplay is unavailable.
          });
        } else {
          video.pause();
        }
      }
    }, { threshold: 0.25 });

    observer.observe(scene);
    return () => {
      observer.disconnect();
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("error", onError);
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [avatar.video]);

  return (
    <div ref={sceneRef} className={`proposal-avatar-scene ${variant}`} aria-hidden="true">
      <Image
        src={avatar.src}
        alt=""
        fill
        sizes="(max-width: 760px) 100vw, (max-width: 1420px) 50vw, 680px"
        className="proposal-avatar-image"
        style={{ objectPosition: avatar.position }}
        preload
      />
      <video
        ref={videoRef}
        className="proposal-avatar-video"
        data-src={avatar.video}
        poster={avatar.src}
        muted
        playsInline
        loop
        preload="none"
        tabIndex={-1}
        aria-hidden="true"
        style={{ objectPosition: avatar.position }}
      />
    </div>
  );
}
