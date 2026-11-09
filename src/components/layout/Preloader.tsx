import { useLayoutEffect, useRef } from "react";
import { site } from "../../content/site";
import { gsap, prefersReducedMotion } from "../../lib/motion";

const NAME = "SAKSHI SAINI";
const FAILSAFE_MS = 6000;
const ASSET_CAP_MS = 3500;

interface PreloaderProps {
  /** Fired as the curtain starts lifting: kick off the hero intro. */
  onReveal: () => void;
  /** Fired when the preloader can be unmounted. */
  onDone: () => void;
}

/** Resolves when web fonts and the hero photograph are ready, but never waits past the cap. */
function waitForAssets(): Promise<void> {
  const fonts: Promise<unknown> = document.fonts?.ready ?? Promise.resolve();
  const hero = new Promise<void>((resolve) => {
    const img = document.querySelector<HTMLImageElement>("[data-hero-image] img");
    if (!img) return resolve();
    img.decode().then(() => resolve(), () => resolve());
  });
  const cap = new Promise<void>((resolve) => window.setTimeout(resolve, ASSET_CAP_MS));
  return Promise.race([Promise.all([fonts, hero]).then(() => undefined), cap]);
}

/**
 * Full-screen ivory intro: the name appears letter by letter, a hairline progress bar fills,
 * then the whole sheet lifts away with a clip-path mask. It only lasts as long as the
 * intro animation or the real asset loading (whichever is longer), with hard failsafes.
 */
export function Preloader({ onReveal, onDone }: PreloaderProps) {
  const root = useRef<HTMLDivElement>(null);
  const handlers = useRef({ onReveal, onDone });
  handlers.current = { onReveal, onDone };

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    let cancelled = false;
    const reduce = prefersReducedMotion();
    document.body.classList.add("is-locked");

    const finish = () => {
      document.body.classList.remove("is-locked");
      handlers.current.onDone();
    };
    // If anything above misbehaves, never trap the visitor behind the curtain.
    const failsafe = window.setTimeout(() => {
      handlers.current.onReveal();
      finish();
    }, FAILSAFE_MS);

    const ctx = gsap.context(() => {
      const chars = el.querySelectorAll("[data-char]");
      const bar = el.querySelector("[data-bar]");
      const sub = el.querySelector("[data-sub]");
      const label = el.querySelector("[data-label]");
      const content = el.querySelector("[data-content]");

      const intro = new Promise<void>((resolve) => {
        if (reduce) {
          gsap.set(bar, { scaleX: 1 });
          return resolve();
        }
        gsap
          .timeline({ onComplete: resolve })
          .from(chars, { yPercent: 115, duration: 0.9, ease: "power4.out", stagger: 0.055 })
          .from(sub, { autoAlpha: 0, y: 12, duration: 0.8, ease: "power3.out" }, "-=0.5")
          .from(label, { autoAlpha: 0, duration: 0.6 }, "-=0.5");
        gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 0.8, duration: 1.7, ease: "power2.out" });
      });

      Promise.all([intro, waitForAssets()]).then(() => {
        if (cancelled) return;
        window.clearTimeout(failsafe);
        handlers.current.onReveal();
        if (reduce) {
          gsap.to(el, { autoAlpha: 0, duration: 0.4, onComplete: finish });
          return;
        }
        gsap
          .timeline({ onComplete: finish })
          .to(bar, { scaleX: 1, duration: 0.35, ease: "power2.inOut" })
          .to(content, { y: -28, autoAlpha: 0, duration: 0.5, ease: "power2.in" }, ">0.1")
          .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 1.05, ease: "power4.inOut" }, "<0.15");
      });
    }, root);

    return () => {
      cancelled = true;
      window.clearTimeout(failsafe);
      ctx.revert();
      document.body.classList.remove("is-locked");
    };
  }, []);

  return (
    <div
      ref={root}
      role="status"
      className="fixed inset-0 z-[100] grid place-items-center bg-ivory px-6 text-center"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <span className="sr-only">Loading the portfolio of {site.name}</span>
      <div data-content="" className="flex w-full max-w-5xl flex-col items-center gap-7" aria-hidden="true">
        <p className="display flex justify-center text-[clamp(2.6rem,10vw,8rem)] tracking-[0.06em]">
          {NAME.split("").map((char, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.1em]">
              <span data-char="" className="inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            </span>
          ))}
        </p>
        <p data-sub="" className="label max-w-[28ch] text-ash sm:max-w-none">
          {site.descriptor}
        </p>
        <div className="h-px w-[min(60vw,22rem)] bg-charcoal/15">
          <div data-bar="" className="h-full origin-left scale-x-0 bg-charcoal" />
        </div>
        <p data-label="" className="label text-[0.7rem] text-warm-grey">
          Curating the experience
        </p>
      </div>
    </div>
  );
}
