"use client";

import { useEffect } from "react";

export default function HomepageMotion() {
  useEffect(() => {
    const main = document.querySelector("main");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (
      !main ||
      reducedMotion.matches ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    const targets = [
      ...main.querySelectorAll<HTMLElement>(":scope > section:not(.hero)"),
      ...document.querySelectorAll<HTMLElement>(".site-footer"),
    ];
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
    for (const target of targets) {
      if (target.getBoundingClientRect().top > window.innerHeight * 0.92) {
        target.setAttribute("data-home-reveal", "pending");
      }
      observer.observe(target);
    }

    return () => {
      observer.disconnect();
      document.body.classList.remove("homepage-motion-ready");
      for (const target of targets) {
        target.removeAttribute("data-home-reveal");
      }
    };
  }, []);

  return null;
}
