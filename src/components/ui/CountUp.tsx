import { useLayoutEffect, useRef } from "react";
import { gsap, MOTION_OK } from "../../lib/motion";

interface CountUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
}

const grouped = new Intl.NumberFormat("en-IN");

/** Counts up from zero when scrolled into view; renders the final number when motion is reduced. */
export function CountUp({ value, prefix = "", suffix = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const format = (n: number) => `${prefix}${grouped.format(Math.round(n))}${suffix}`;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const counter = { n: 0 };
      el.textContent = format(0);
      gsap.to(counter, {
        n: value,
        duration: 2,
        ease: "power3.out",
        onUpdate: () => {
          el.textContent = format(counter.n);
        },
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    });
    return () => {
      mm.revert();
      el.textContent = format(value);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <span ref={ref}>{format(value)}</span>;
}
