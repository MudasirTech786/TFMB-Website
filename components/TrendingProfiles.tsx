"use client";

import { useEffect, useRef } from "react";
import { trendingProfiles } from "../lib/trendingData";
import type { TrendingProfile } from "../lib/trendingData";
import TrendingProfileCard from "./TrendingProfileCard";
import { Icon } from "./Icons";

/** Glide speed in px per second — a calm, luxurious pace (~50–60 s per desktop set). */
const SPEED = 40;

/**
 * TrendingProfiles — a premium matrimonial "profile wall" showing a TRUE
 * seamless infinite loop.
 *
 * The list is rendered twice as two identical groups side by side:
 *   [1 2 3 4 5 6][1 2 3 4 5 6]
 * A pure CSS keyframe animation translates the track by exactly ONE measured
 * group width (--marquee-w), then the loop restarts invisibly because the
 * second group is identical to the first. There is never an empty area:
 * a profile is always immediately behind the last visible one.
 *
 * - motion: linear, ~50–60 s per set, transform-only (GPU friendly)
 * - pauses while hovered (CSS) or touched (animationPlayState)
 * - disabled entirely under prefers-reduced-motion
 */
export default function TrendingProfiles({ items = trendingProfiles }: { items?: TrendingProfile[] }) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    const set = setRef.current;
    if (!marquee || !set) return;

    const measure = () => {
      const w = set.getBoundingClientRect().width;
      if (w <= 0) return;
      marquee.style.setProperty("--marquee-w", `${-w}px`);
      marquee.style.setProperty("--marquee-duration", `${Math.max(30, Math.round(w / SPEED))}s`);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  if (items.length === 0) return null;

  const pause = () => {
    const m = marqueeRef.current;
    if (m) m.style.animationPlayState = "paused";
  };
  const resume = () => {
    const m = marqueeRef.current;
    if (m) m.style.animationPlayState = "running";
  };

  return (
    <section className="trending-section home-section-spacing !pb-10" aria-labelledby="trending-title">
      <div className="trend-inner home-section-gutter">
        <header className="trend-head home-section-header">
          <span className="eyebrow home-section-eyebrow">CURATED PROFILES</span>
          <h2 className="home-section-title" id="trending-title">Trending <em>Profiles</em></h2>
          <p className="trend-sub home-section-description">Explore thoughtfully selected profiles from our matchmaking community.</p>
          <span className="trend-rule" aria-hidden="true"><i /><b /><i /></span>
        </header>

        <div
          className="trend-viewport"
          role="region"
          aria-label="Trending profiles showcase"
          onTouchStart={pause}
          onTouchEnd={resume}
          onTouchCancel={resume}
        >
          <div ref={marqueeRef} className="trend-marquee">
            <div ref={setRef} className="trend-group">
              {items.map((p) => (
                <TrendingProfileCard key={p.id} profile={p} />
              ))}
            </div>
            <div className="trend-group" aria-hidden="true">
              {items.map((p) => (
                <TrendingProfileCard key={p.id} profile={p} />
              ))}
            </div>
          </div>
        </div>

        <div className="trend-cta-wrap">
          <a className="trend-cta" href="#profiles">View All Profiles <Icon name="arrow" size={16} /></a>
        </div>
      </div>
    </section>
  );
}