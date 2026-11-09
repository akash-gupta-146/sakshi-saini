import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger };

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const DESKTOP = "(min-width: 1024px)";
export const DESKTOP_MOTION_OK = `${DESKTOP} and ${MOTION_OK}`;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Fine pointer + hover: the only devices where a cursor follower makes sense. */
export const hasFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export const EASE = {
  editorial: "power4.inOut",
  out: "power3.out",
  outStrong: "power4.out",
} as const;
