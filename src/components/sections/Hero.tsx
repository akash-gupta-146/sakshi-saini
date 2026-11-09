import { useEffect, useLayoutEffect, useRef } from "react";
import { site } from "../../content/site";
import { gsap, MOTION_OK } from "../../lib/motion";
import { useReveals } from "../../lib/useReveals";
import { Frame } from "../ui/Frame";
import { Img } from "../ui/Img";

/**
 * The signature moment: an ivory editorial spread with oversized serif type on the left
 * and Sakshi's own SS27 photography on the right. Nothing is invented: both images come
 * straight from the PDF (cover page and forecast page).
 */
export function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);
  const intro = useRef<gsap.core.Timeline | null>(null);

  useReveals(root);

  // Build the intro timeline paused; the preloader tells us when to play it.
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia(el);
    mm.add(MOTION_OK, () => {
      const q = (selector: string) => el.querySelectorAll(selector);
      intro.current = gsap
        .timeline({ paused: true, defaults: { ease: "power4.out" } })
        .fromTo(q("[data-hero=image]"), { clipPath: "inset(0% 0% 0% 100%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "power4.inOut" }, 0)
        .from(q("[data-hero=eyebrow]"), { autoAlpha: 0, y: 16, duration: 0.9 }, 0.25)
        .from(q("[data-hero-word]"), { yPercent: 120, duration: 1.4, stagger: 0.14 }, 0.2)
        .from(q("[data-hero=fade]"), { autoAlpha: 0, y: 26, duration: 1, stagger: 0.12 }, 0.9)
        .from(q("[data-hero=inset]"), { autoAlpha: 0, y: 40, duration: 1.2 }, 1.1)
        .from(q("[data-hero=cue]"), { autoAlpha: 0, duration: 1 }, 1.8);
      return () => {
        intro.current = null;
      };
    });
    return () => mm.revert();
  }, []);

  useEffect(() => {
    if (ready) intro.current?.play();
  }, [ready]);

  return (
    <section id="home" ref={root} aria-label="Introduction" className="relative min-h-svh overflow-hidden">
      <Img
        name="botanical-shadow"
        decorative
        sizes="100vw"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-70 mix-blend-multiply"
      />

      <div className="relative mx-auto grid min-h-svh max-w-[1800px] items-center gap-10 px-5 pt-24 pb-28 md:px-10 lg:grid-cols-12 lg:gap-8 lg:pt-24">
        <div className="relative z-10 lg:col-span-7">
          <p data-hero="eyebrow" className="label mb-5 text-ash md:mb-8">
            Hello, I&rsquo;m
          </p>

          <h1 className="display text-[clamp(3.8rem,17vw,5.5rem)] uppercase lg:text-[clamp(5rem,10.5vw,11rem)]">
            <span className="block">
              <span className="split-word">
                <span data-hero-word="" className="split-inner">
                  Sakshi
                </span>
              </span>
            </span>
            <span className="block pl-[0.5em] italic lg:pl-[0.9em]">
              <span className="split-word">
                <span data-hero-word="" className="split-inner">
                  Saini
                </span>
              </span>
            </span>
          </h1>

          <div className="mt-7 grid gap-5 border-t border-charcoal/20 pt-5 sm:grid-cols-[auto_1fr] sm:items-baseline sm:gap-10 md:mt-9">
            <p data-hero="fade" className="label text-base tracking-[0.3em] md:text-lg">
              Apparel Designer.
            </p>
            <p data-hero="fade" className="serif-italic text-2xl leading-snug md:text-3xl">
              {site.heroLine}
            </p>
          </div>

          <p data-hero="fade" className="mt-6 max-w-md text-ash">
            {site.supporting}
          </p>

          <div data-hero="fade" className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="#portfolio"
              className="label border border-charcoal bg-charcoal px-7 py-4 text-ivory transition-colors hover:bg-transparent hover:text-charcoal"
            >
              Explore Modern Romance SS27
            </a>
            <a href="#contact" className="label link-underline pb-1">
              Get in touch
            </a>
          </div>
          <p data-hero="fade" className="serif-italic mt-6 text-lg text-ash">
            {site.tagline}
          </p>
        </div>

        <div className="relative lg:col-span-5">
          <div data-hero-image="" data-hero="image" className="relative">
            <Frame
              name="hero-model"
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              parallax={0.06}
              zoom={false}
              position="50% 30%"
              className="aspect-[4/5] w-full lg:aspect-auto lg:h-[calc(100svh-12rem)] lg:min-h-[34rem]"
            />
            <p className="label absolute right-0 bottom-0 bg-ivory px-4 py-2.5">Modern Romance · SS27</p>
          </div>

          <div
            data-hero="inset"
            className="absolute -bottom-8 -left-6 hidden w-[32%] border-[6px] border-ivory shadow-none md:block lg:-left-14"
          >
            <Frame name="forecast-tulip" sizes="20vw" ratio="natural" decorative />
          </div>
        </div>
      </div>

      <a
        href="#about"
        data-hero="cue"
        className="label absolute bottom-6 left-5 flex items-center gap-4 text-ash md:left-10"
        aria-label="Scroll to the About section"
      >
        <span className="relative block h-12 w-px overflow-hidden bg-charcoal/15" aria-hidden="true">
          <span className="scroll-cue-line absolute inset-0 bg-charcoal" />
        </span>
        Scroll
      </a>
    </section>
  );
}
