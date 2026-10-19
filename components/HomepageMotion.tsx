"use client";

import { useEffect } from "react";

export default function HomepageMotion({ scope = "main" }: { scope?: string }) {
  useEffect(() => {
    const main = document.querySelector(scope);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (
      !main ||
      reducedMotion.matches ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    const selectors = scope === ".tf-about"
      ? [
          ".tf-about-intro .home-section-header", ".tf-about-divider",
          ".tf-about-story-heading", ".tf-about-story-copy p",
          ".tf-about-why .home-section-header", ".tf-about-mantra",
          ".tf-about-benefit", ".tf-about-joining-intro",
          ".tf-about-checklist li", ".tf-about-process .home-section-header",
          ".tf-about-step", ".tf-about-closing-inner > div",
        ]
      : [
          ".search-intro", ".search-panel", ".explore-cities .city-slider",
          ".about-heading", ".about-copy", ".about-visual", ".trend-head",
          ".trend-viewport", ".trend-cta-wrap", "#stories .home-section-header", "#stories [aria-roledescription='carousel']",
          "main > section > dl > div", ".matchmakers-editorial", ".matchmakers-team",
          ".matchmakers-consultation",
        ];
    const targets = [
      ...main.querySelectorAll<HTMLElement>(selectors.join(",")),
    ];
    const uniqueTargets = [...new Set(targets)];
    const hero = main.querySelector<HTMLElement>(".hero");
    const aboutIntro = main.querySelector<HTMLElement>(".tf-about-intro");
    const footerTargets = [...document.querySelectorAll<HTMLElement>(".site-footer .footer-brand, .site-footer .footer-nav, .site-footer .footer-social, .site-footer .footer-bottom")];
    const allTargets = [...uniqueTargets, ...footerTargets];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          entry.target.setAttribute("data-home-reveal", "visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    document.body.classList.add("homepage-motion-ready");
    hero?.setAttribute("data-home-hero", "ready");
    aboutIntro?.setAttribute("data-about-hero", "ready");
    for (const [index, target] of allTargets.entries()) {
      target.style.setProperty("--home-reveal-delay", `${(index % 5) * 90}ms`);
      if (target.getBoundingClientRect().top > window.innerHeight * 0.92) {
        target.setAttribute("data-home-reveal", "pending");
      }
      observer.observe(target);
    }

    return () => {
      observer.disconnect();
      document.body.classList.remove("homepage-motion-ready");
      hero?.removeAttribute("data-home-hero");
      aboutIntro?.removeAttribute("data-about-hero");
      for (const target of allTargets) {
        target.removeAttribute("data-home-reveal");
        target.style.removeProperty("--home-reveal-delay");
      }
    };
  }, [scope]);

  return null;
}
