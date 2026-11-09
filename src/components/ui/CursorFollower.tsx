import { useEffect, useRef, type RefObject } from "react";
import { gsap, hasFinePointer, prefersReducedMotion } from "../../lib/motion";

interface CursorFollowerProps {
  /** Region in which the follower may appear. */
  containerRef: RefObject<HTMLElement | null>;
}

/**
 * A small label that trails the cursor while hovering any `[data-cursor="LABEL"]`
 * element inside the container. Only mounts behaviour on fine-pointer devices and
 * stops smoothing when reduced motion is requested.
 */
export function CursorFollower({ containerRef }: CursorFollowerProps) {
  const bubble = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const el = bubble.current;
    if (!container || !el || !hasFinePointer()) return;

    const duration = prefersReducedMotion() ? 0 : 0.45;
    gsap.set(el, { xPercent: -50, yPercent: -50, autoAlpha: 0, scale: 0.5 });
    const moveX = gsap.quickTo(el, "x", { duration, ease: "power3" });
    const moveY = gsap.quickTo(el, "y", { duration, ease: "power3" });

    const onMove = (event: PointerEvent) => {
      moveX(event.clientX);
      moveY(event.clientY);
      const target = (event.target as Element).closest<HTMLElement>("[data-cursor]");
      if (target) {
        el.textContent = target.dataset.cursor ?? "";
        gsap.to(el, { autoAlpha: 1, scale: 1, duration: 0.3, overwrite: "auto" });
      } else {
        gsap.to(el, { autoAlpha: 0, scale: 0.5, duration: 0.25, overwrite: "auto" });
      }
    };
    const onLeave = () => gsap.to(el, { autoAlpha: 0, scale: 0.5, duration: 0.25, overwrite: "auto" });

    container.addEventListener("pointermove", onMove);
    container.addEventListener("pointerleave", onLeave);
    return () => {
      container.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerleave", onLeave);
    };
  }, [containerRef]);

  return (
    <div
      ref={bubble}
      aria-hidden="true"
      className="label pointer-events-none fixed top-0 left-0 z-40 grid size-20 place-items-center rounded-full bg-charcoal text-center text-ivory opacity-0"
    />
  );
}
