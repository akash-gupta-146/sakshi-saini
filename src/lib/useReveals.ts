import { useLayoutEffect, type RefObject } from "react";
import { gsap, MOTION_OK } from "./motion";

/**
 * Declarative scroll animations driven by data attributes, so every section gets the
 * same cinematic vocabulary without re-writing GSAP:
 *
 *   data-reveal            fade + rise                (data-delay="0.2" optional)
 *   data-stagger           children fade + rise in sequence
 *   data-split             <SplitText /> words rise out of a mask
 *   data-mask              clip-path image reveal; [data-mask-inner] eases from a zoom
 *   data-parallax="0.07"   scrubbed vertical drift (fraction of own height)
 *   data-line              scaleX draw-in (rules, bars, timelines)
 *
 * Content is fully visible by default. Animations only run when the user has not
 * requested reduced motion, and are reverted on unmount.
 *
 * GOTCHA: never put a CSS `transition` on opacity/transform of an element GSAP animates
 * (e.g. `transition-all` on a [data-stagger] child): the two fight and the element can
 * stay stuck at its starting value. Scope transitions to other properties instead.
 *
 * Sections that need bespoke behaviour (pinned galleries, etc.) pass `setup`, which
 * receives the same matchMedia scope so cleanup stays automatic.
 */
export function useReveals(
  scope: RefObject<HTMLElement | null>,
  setup?: (mm: gsap.MatchMedia, root: HTMLElement) => void,
) {
  useLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;
    const mm = gsap.matchMedia(root);
    mm.add(MOTION_OK, () => applyReveals(root));
    setup?.(mm, root);
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

const trigger = (el: Element, extra: ScrollTrigger.Vars = {}): ScrollTrigger.Vars => ({
  trigger: el,
  start: "top 86%",
  once: true,
  ...extra,
});

const delayOf = (el: HTMLElement) => Number(el.dataset.delay ?? 0);

function applyReveals(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
    gsap.from(el, {
      y: 36,
      opacity: 0,
      duration: 1.1,
      ease: "power3.out",
      delay: delayOf(el),
      scrollTrigger: trigger(el),
    });
  });

  root.querySelectorAll<HTMLElement>("[data-stagger]").forEach((el) => {
    gsap.from(el.children, {
      y: 32,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.12,
      delay: delayOf(el),
      scrollTrigger: trigger(el),
    });
  });

  root.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
    gsap.from(el.querySelectorAll(".split-inner"), {
      yPercent: 115,
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.07,
      delay: delayOf(el),
      scrollTrigger: trigger(el, { start: "top 90%" }),
    });
  });

  root.querySelectorAll<HTMLElement>("[data-mask]").forEach((el) => {
    const inner = el.querySelector("[data-mask-inner]");
    const st = trigger(el, { start: "top 88%" });
    gsap.fromTo(
      el,
      { clipPath: "inset(100% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "power4.inOut", delay: delayOf(el), scrollTrigger: st },
    );
    if (inner) {
      gsap.from(inner, { scale: 1.22, duration: 1.8, ease: "power3.out", delay: delayOf(el), scrollTrigger: st });
    }
  });

  root.querySelectorAll<HTMLElement>("[data-line]").forEach((el) => {
    gsap.from(el, {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 1.4,
      ease: "power4.inOut",
      delay: delayOf(el),
      scrollTrigger: trigger(el),
    });
  });

  root.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
    const amount = Number(el.dataset.parallax) * 100;
    gsap.fromTo(
      el,
      { yPercent: -amount },
      {
        yPercent: amount,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement ?? el,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      },
    );
  });
}
