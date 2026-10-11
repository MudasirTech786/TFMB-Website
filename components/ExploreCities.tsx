"use client";

import { useCallback, useEffect, useRef } from "react";
import { Icon } from "./Icons";

const cities = [
  { name: "Lahore", slug: "lahore", icon: "landmark" as const, art: "/images/cities/lahore.png" },
  { name: "Karachi", slug: "karachi", icon: "waves" as const, art: "/images/cities/karachi.png" },
  { name: "Islamabad", slug: "islamabad", icon: "trees" as const, art: "/images/cities/islamabd-pindi.png" },
  { name: "Kashmir", slug: "kashmir", icon: "mountain" as const, art: "/images/cities/kashmir.png" },
  { name: "KPK", slug: "kpk", icon: "landmark" as const, art: "/images/cities/KPK.png" },
  { name: "South Punjab", slug: "south-punjab", icon: "landmark" as const, art: "/images/cities/southpunjab.png" },
  { name: "Peshawar", slug: "peshawar", icon: "landmark" as const, art: "/images/cities/KPK.png" },
  { name: "Rawalpindi", slug: "rawalpindi", icon: "building" as const, art: "/images/cities/islamabd-pindi.png" },
  { name: "Sialkot", slug: "sialkot", icon: "trophy" as const },
  { name: "Quetta", slug: "quetta", icon: "mountain" as const },
  { name: "Other City", slug: "other-city", icon: "landmark" as const, art: "/images/cities/othercity.png" },
  { name: "International", slug: "international", icon: "globe" as const, art: "/images/cities/international.png" },
];

/** Cities per copy — the track renders the list three times for an endless loop. */
const SET_SIZE = cities.length;
/** Continuous, gentle glide speed — pixels per second. */
const DRIFT_SPEED = 52;
const PENDING_TIMEOUT = 700;
const SNAP_DELAY = 160;

const reducedMotionQuery =
  typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
const prefersReducedMotion = () => reducedMotionQuery?.matches ?? false;

export default function ExploreCities() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const snapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const driftRafRef = useRef<number | null>(null);
  const lastFrameRef = useRef(0);
  const metricsRef = useRef({ step: 0, loop: 0, max: 0 });
  /** Last card-aligned position we animated to, so consecutive moves chain exactly. */
  const pendingRef = useRef<number | null>(null);
  const isPausedRef = useRef(false);
  /** Whether the pointer is over the carousel — resumes only after it leaves. */
  const hoveringRef = useRef(false);

  const pauseTemporarily = useCallback(() => {
    isPausedRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      if (!hoveringRef.current) isPausedRef.current = false;
    }, 1800);
  }, []);

  /**
   * The card width is sized in CSS so a whole number of cards always fills the viewport.
   * Re-read those metrics so every move lands exactly on a card edge (no clipped cards).
   */
  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const track = viewport?.querySelector<HTMLElement>(".city-track");
    if (!viewport || !track) return;
    const cards = track.querySelectorAll<HTMLElement>(".city-card");
    if (cards.length < SET_SIZE * 2) return;
    const origin = track.getBoundingClientRect().left;
    const offsetOf = (card: HTMLElement) => card.getBoundingClientRect().left - origin;
    const step = offsetOf(cards[1]) - offsetOf(cards[0]);
    const loop = offsetOf(cards[SET_SIZE]) - offsetOf(cards[0]);
    metricsRef.current = { step, loop, max: viewport.scrollWidth - viewport.clientWidth };
  }, []);

  const animateTo = useCallback((left: number, smooth: boolean) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    pendingRef.current = left;
    if (pendingTimerRef.current) clearTimeout(pendingTimerRef.current);
    pendingTimerRef.current = setTimeout(() => { pendingRef.current = null; }, PENDING_TIMEOUT);
    viewport.scrollTo({ left, behavior: smooth && !prefersReducedMotion() ? "smooth" : "auto" });
  }, []);

  const move = useCallback((direction: -1 | 1, pause = true) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const { step, loop, max } = metricsRef.current;
    if (!(step > 0)) return;

    const from = pendingRef.current ?? viewport.scrollLeft;
    let base = from;
    let target = Math.round(from / step) * step + direction * step;

    // Seamless loop: jump a full copy (identical view) before crossing either end.
    if (target < -0.5) { base += loop; target += loop; }
    else if (target > max + 0.5) { base -= loop; target -= loop; }
    if (Math.abs(base - viewport.scrollLeft) > 0.05) viewport.scrollLeft = base;

    animateTo(target, true);
    if (pause) pauseTemporarily();
  }, [animateTo, pauseTemporarily]);

  /** Keyboard focus can leave a card half visible; snap it flush to the viewport edge. */
  const alignCard = useCallback((card: HTMLElement) => {
    const viewport = viewportRef.current;
    const track = viewport?.querySelector<HTMLElement>(".city-track");
    if (!viewport || !track) return;
    const left = card.getBoundingClientRect().left - track.getBoundingClientRect().left;
    if (Math.abs(left - viewport.scrollLeft) > 1) animateTo(left, true);
  }, [animateTo]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    measure();
    viewport.scrollLeft = metricsRef.current.loop;

    const handleResize = () => {
      measure();
      const { step } = metricsRef.current;
      // Only realign while paused; the drift settles into the new grid on its own.
      if (pendingRef.current !== null || isPausedRef.current || !(step > 0)) return;
      const aligned = Math.round(viewport.scrollLeft / step) * step;
      if (Math.abs(aligned - viewport.scrollLeft) > 1) viewport.scrollLeft = aligned;
    };

    // After a free scroll/drag, rest on a card boundary so no card sits clipped.
    const handleScroll = () => {
      // Skip while the drift is running — it manages its own cadence.
      if (pendingRef.current !== null || !isPausedRef.current) return;
      if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
      snapTimerRef.current = setTimeout(() => {
        const { step } = metricsRef.current;
        if (pendingRef.current !== null || !isPausedRef.current || !(step > 0)) return;
        const aligned = Math.round(viewport.scrollLeft / step) * step;
        if (Math.abs(aligned - viewport.scrollLeft) > 1) animateTo(aligned, true);
      }, SNAP_DELAY);
    };

    const handleScrollEnd = () => { pendingRef.current = null; };

    const observer = new ResizeObserver(handleResize);
    observer.observe(viewport);
    viewport.addEventListener("scroll", handleScroll);
    viewport.addEventListener("scrollend", handleScrollEnd);

    // A calm, continuous glide: sub-pixel steps every frame with a seamless wrap at the ends.
    // It pauses on hover/interaction (isPausedRef) and never fights a manual scroll.
    const tick = (time: number) => {
      driftRafRef.current = requestAnimationFrame(tick);
      const { step, loop, max } = metricsRef.current;
      if (!(step > 0) || !(loop > 0) || !(max > 0)) return;
      if (isPausedRef.current || prefersReducedMotion() || document.visibilityState !== "visible") {
        lastFrameRef.current = time;
        return;
      }
      const dt = lastFrameRef.current ? Math.min((time - lastFrameRef.current) / 1000, 0.05) : 0;
      lastFrameRef.current = time;
      let left = viewport.scrollLeft + DRIFT_SPEED * dt;
      if (left > max) left -= loop; // seamless wrap onto the identical previous copy
      else if (left < 0) left += loop;
      viewport.scrollLeft = left;
    };
    driftRafRef.current = requestAnimationFrame(tick);

    return () => {
      if (driftRafRef.current !== null) cancelAnimationFrame(driftRafRef.current);
      observer.disconnect();
      viewport.removeEventListener("scroll", handleScroll);
      viewport.removeEventListener("scrollend", handleScrollEnd);
      if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
      if (pendingTimerRef.current) clearTimeout(pendingTimerRef.current);
    };
  }, [animateTo, measure, move]);

  useEffect(() => () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  }, []);

  const pauseOnHover = () => { hoveringRef.current = true; isPausedRef.current = true; };
  const resumeOnLeave = () => { hoveringRef.current = false; isPausedRef.current = false; };

  return (
    <section className="explore-cities !pt-6" aria-label="Explore marriage profiles by city">
      <div className="explore-cities-inner">
        <button
          type="button"
          className="city-nav city-nav-prev"
          aria-label="Show previous cities"
          onClick={() => move(-1)}
          onPointerEnter={pauseOnHover}
          onPointerLeave={resumeOnLeave}
        >
          <Icon name="arrow" size={17} />
        </button>
        <div
          className="city-slider"
          ref={viewportRef}
          role="region"
          onPointerDown={() => { pendingRef.current = null; pauseTemporarily(); }}
          onWheel={() => { pendingRef.current = null; pauseTemporarily(); }}
          onPointerEnter={pauseOnHover}
          onPointerLeave={resumeOnLeave}
          onFocus={() => {
            isPausedRef.current = true;
            window.requestAnimationFrame(() => {
              const active = document.activeElement;
              if (active instanceof HTMLElement && active.classList.contains("city-card")) alignCard(active);
            });
          }}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) isPausedRef.current = false;
          }}
          aria-label="Explore marriage profiles by city"
        >
          <div className="city-track">
            {[...cities, ...cities, ...cities].map((city, index) => (
              <a
                className={`city-card city-${city.slug}`}
                href="#search"
                key={`${city.slug}-${index}`}
                aria-label={`Explore profiles in ${city.name}`}
                aria-hidden={index < cities.length || index >= cities.length * 2}
                tabIndex={index < cities.length || index >= cities.length * 2 ? -1 : undefined}
                data-city-slug={city.slug}
              >
                {/* TODO: Preselect this city in Profile Search when city filtering is connected. */}
                <span className="city-icon">
                  {city.art
                    ? <span className="city-art" style={{ "--city-art": `url("${city.art}")` } as React.CSSProperties} />
                    : <Icon name={city.icon} size={26} />}
                </span>
                <span className="city-card-copy">
                  <strong>{city.name} Profiles</strong>
                </span>
              </a>
            ))}
          </div>
        </div>
        <button
          type="button"
          className="city-nav city-nav-next"
          aria-label="Show next cities"
          onClick={() => move(1)}
          onPointerEnter={pauseOnHover}
          onPointerLeave={resumeOnLeave}
        >
          <Icon name="arrow" size={17} />
        </button>
      </div>
    </section>
  );
}
