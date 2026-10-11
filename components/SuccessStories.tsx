"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { stories } from "../lib/mockData";
import { Icon } from "./Icons";

const storyImages = [
  "/images/success4.jpg",
  "/images/success2.jpg",
  "/images/success3.jpg",
] as const;

const AUTOPLAY_MS = 7000;
const SWIPE_THRESHOLD = 48;

const slides = stories.slice(0, storyImages.length).map((story, index) => {
  const sentenceEnd = story.quote.indexOf(".");

  return {
    ...story,
    image: storyImages[index],
    caption:
      sentenceEnd === -1 ? story.quote : story.quote.slice(0, sentenceEnd + 1),
  };
});

const pad = (value: number) => String(value).padStart(2, "0");

const arrowButton =
  "ss-arrow group grid size-11 place-items-center rounded-full border border-[#fff3cf]/60 transition duration-500 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0b2a4a] motion-reduce:transition-none motion-reduce:hover:scale-100";

const cornerMarks = [
  "left-3 top-3 border-l border-t sm:left-4 sm:top-4",
  "right-3 top-3 border-r border-t sm:right-4 sm:top-4",
  "bottom-3 left-3 border-b border-l sm:bottom-4 sm:left-4",
  "bottom-3 right-3 border-b border-r sm:bottom-4 sm:right-4",
] as const;

// Scoped keyframes: a soft gold ring that keeps pulsing, and a drifting arrow
// glyph that speeds up on hover. All of it stops under prefers-reduced-motion.
const sliderStyles = `
.ss-arrow{position:relative;isolation:isolate;color:#081f38;background:linear-gradient(135deg,#f3dc9b 0%,#d2ae64 52%,#a9843f 100%);box-shadow:0 8px 20px rgba(8,31,56,.28),inset 0 1px 0 rgba(255,255,255,.45)}
.ss-arrow::after{content:"";position:absolute;inset:-1px;border-radius:9999px;border:1px solid rgba(230,203,135,.65);pointer-events:none;animation:ss-ring 3s ease-out infinite;animation-delay:var(--ss-delay,0s)}
.ss-arrow:hover{background:linear-gradient(135deg,#fbebb9 0%,#e0bd76 52%,#b8924a 100%);box-shadow:0 10px 26px rgba(200,164,93,.55),inset 0 1px 0 rgba(255,255,255,.6)}
.ss-glyph{display:block;animation:ss-drift 3.2s ease-in-out infinite;animation-delay:var(--ss-delay,0s)}
.ss-arrow:hover .ss-glyph{animation:ss-nudge 1s ease-in-out infinite}
.ss-fill{transform-origin:left;animation:ss-fill var(--ss-duration) linear forwards}
@keyframes ss-ring{0%{transform:scale(1);opacity:.75}65%,100%{transform:scale(1.6);opacity:0}}
@keyframes ss-drift{0%,100%{transform:translateX(0)}50%{transform:translateX(2px)}}
@keyframes ss-nudge{0%,100%{transform:translateX(-1px)}50%{transform:translateX(5px)}}
@keyframes ss-fill{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@media (prefers-reduced-motion:reduce){.ss-arrow::after,.ss-glyph{animation:none!important}.ss-fill{animation:none!important;transform:scaleX(1)}}
`;

export default function SuccessStories() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true); // safe default for SSR
  const pointerStart = useRef<{ x: number; y: number } | null>(null);

  const count = slides.length;

  const goTo = useCallback(
    (index: number) => setActiveIndex(((index % count) + count) % count),
    [count],
  );
  const move = useCallback(
    (direction: -1 | 1) => setActiveIndex((i) => (i + direction + count) % count),
    [count],
  );

  // Reduced-motion preference (client only, avoids hydration mismatch)
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // Slow autoplay; restarts after every change so manual navigation resets the clock
  useEffect(() => {
    if (paused || reducedMotion || count < 2) return;
    const timer = window.setTimeout(() => move(1), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [activeIndex, paused, reducedMotion, count, move]);

  // Pause while the tab is hidden
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      move(event.key === "ArrowLeft" ? -1 : 1);
    }
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    pointerStart.current = { x: event.clientX, y: event.clientY };
    if (event.pointerType !== "mouse") setPaused(true);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (event.pointerType !== "mouse") setPaused(false);
    if (!start) return;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (Math.abs(deltaX) > SWIPE_THRESHOLD && Math.abs(deltaX) > Math.abs(deltaY)) {
      move(deltaX < 0 ? 1 : -1);
    }
  };

  const cancelPointer = () => {
    pointerStart.current = null;
    setPaused(false);
  };

  return (
    <section
      id="stories"
      aria-labelledby="success-stories-title"
      className="home-section-spacing home-section-gutter !pt-10 bg-[#f7f6f1]"
    >
      <style>{sliderStyles}</style>
      <div className="mx-auto max-w-[1240px]">
        <header className="home-section-header">
          <div>
            <span className="eyebrow home-section-eyebrow inline-flex items-center gap-3">
              <span className="h-px w-7 bg-[#c8a45d]/70" aria-hidden="true" />
              SUCCESS STORIES
            </span>
            <h2
              id="success-stories-title"
              className="home-section-title"
            >
              Beautiful Beginnings
            </h2>
          </div>
        </header>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Success stories"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
          onPointerLeave={(e) => e.pointerType === "mouse" && setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          className="outline-none focus-visible:ring-2 focus-visible:ring-[#c8a45d] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f7f6f1]"
        >
          {/* Image stage: stacked cross-fade, so there are no clones, gaps or loop jumps */}
          <div
            className="relative aspect-[4/3] touch-pan-y select-none overflow-hidden rounded-[2px] bg-[#e8e1d4] shadow-[0_28px_70px_rgba(11,42,74,0.16)] sm:aspect-[16/9] lg:aspect-[21/8]"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={cancelPointer}
          >
            {slides.map((slide, index) => {
              const isActive = index === activeIndex;
              return (
                <figure
                  key={slide.names}
                  aria-hidden={!isActive}
                  className={`absolute inset-0 transition-opacity duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:duration-300 ${
                    isActive ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                >
                  <Image
                    src={slide.image}
                    alt={`Wedding portrait of ${slide.names}`}
                    fill
                    priority={index === 0}
                    draggable={false}
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 92vw, 1240px"
                    className={`object-cover object-[center_20%] transition-transform duration-[7500ms] ease-out motion-reduce:transition-none ${
                      isActive ? "scale-100" : "scale-[1.045]"
                    }`}
                  />
                </figure>
              );
            })}

            {/* Gradient corners: navy vignette melting into the photograph */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(8,31,56,0.55),transparent_42%),radial-gradient(circle_at_100%_0%,rgba(8,31,56,0.55),transparent_42%),radial-gradient(circle_at_0%_100%,rgba(8,31,56,0.6),transparent_45%),radial-gradient(circle_at_100%_100%,rgba(8,31,56,0.6),transparent_45%)]"
            />
            {/* Gold corner marks */}
            {cornerMarks.map((position) => (
              <span
                key={position}
                aria-hidden="true"
                className={`pointer-events-none absolute size-7 border-[#f0d995] sm:size-10 ${position}`}
              />
            ))}
          </div>

          {/* Caption panel overlaps the photograph; controls sit on the cream */}
          <div className="relative z-10 -mt-10 flex flex-col gap-6 px-4 sm:-mt-14 sm:px-8 lg:-mt-20 lg:flex-row lg:items-end lg:justify-between lg:px-14">
            <div className="relative w-full border-t-2 border-[#c8a45d] bg-[#0b2a4a] px-6 py-6 shadow-[0_18px_44px_rgba(11,42,74,0.28)] sm:px-8 sm:py-7 lg:max-w-[460px] lg:px-9 lg:py-8">
              <div className="grid">
                {slides.map((slide, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <div
                      key={slide.names}
                      aria-hidden={!isActive}
                      className={`col-start-1 row-start-1 transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                        isActive
                          ? "translate-y-0 opacity-100 delay-300"
                          : "pointer-events-none translate-y-2 opacity-0"
                      }`}
                    >
                      <p
                        aria-live={isActive ? "polite" : "off"}
                        className="text-[19px] leading-[1.45] text-[#f7f6f1] sm:text-[21px]"
                        style={{ fontFamily: "var(--serif)" }}
                      >
                        {slide.caption}
                      </p>
                      <p className="mt-4 text-[11px] font-medium tracking-[0.06em] text-[#d8bb78]">
                        {slide.names}
                        <span className="px-2 text-[#c8a45d]/60" aria-hidden="true">
                          ·
                        </span>
                        <span className="text-[#f7f6f1]/70">{slide.location}</span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between gap-5 lg:justify-end lg:pb-2">
              <div className="flex items-center gap-5">
                <span
                  className="text-[22px] leading-none tracking-[-0.02em] text-[#0b2a4a]"
                  style={{ fontFamily: "var(--serif)" }}
                  aria-label={`Story ${activeIndex + 1} of ${count}`}
                >
                  {pad(activeIndex + 1)}
                  <span className="px-1.5 text-[#c8a45d]">/</span>
                  <span className="text-[#0b2a4a]/45">{pad(count)}</span>
                </span>

                <div
                  role="group"
                  aria-label="Choose a success story"
                  className="flex items-center"
                >
                  {slides.map((slide, index) => (
                    <button
                      key={slide.names}
                      type="button"
                      aria-label={`Show story ${index + 1}: ${slide.names}`}
                      aria-current={index === activeIndex ? "true" : undefined}
                      onClick={() => goTo(index)}
                      className="grid h-8 min-w-5 place-items-center rounded-sm px-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8a45d]"
                    >
                      <span
                        className={`relative block h-px overflow-hidden bg-[#0b2a4a]/25 transition-[width] duration-500 motion-reduce:transition-none ${
                          index === activeIndex ? "w-9" : "w-4"
                        }`}
                      >
                        {index === activeIndex && (
                          <span
                            key={activeIndex}
                            className="ss-fill absolute inset-0 bg-[#c8a45d]"
                            style={
                              {
                                "--ss-duration": `${AUTOPLAY_MS}ms`,
                                animationPlayState: paused ? "paused" : "running",
                              } as React.CSSProperties
                            }
                          />
                        )}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous story"
                  onClick={() => move(-1)}
                  className={arrowButton}
                >
                  <span className="rotate-180">
                    <span className="ss-glyph">
                      <Icon name="arrow" size={17} />
                    </span>
                  </span>
                </button>
                <button
                  type="button"
                  aria-label="Next story"
                  onClick={() => move(1)}
                  className={arrowButton}
                  style={{ "--ss-delay": "1.5s" } as React.CSSProperties}
                >
                  <span className="ss-glyph">
                    <Icon name="arrow" size={17} />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}