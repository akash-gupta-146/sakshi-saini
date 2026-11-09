import { useRef, useState } from "react";
import { looks } from "../../content/lookbook";
import { imageRatio } from "../../content/images";
import { pad2 } from "../../lib/format";
import { DESKTOP_MOTION_OK, gsap } from "../../lib/motion";
import { useReveals } from "../../lib/useReveals";
import { CursorFollower } from "../ui/CursorFollower";
import { Frame } from "../ui/Frame";
import { Lightbox } from "../ui/Lightbox";
import { SectionHeader } from "../ui/SectionHeader";

const lightboxItems = looks.flatMap((look) => [
  { image: look.full, caption: `${look.name}: ${look.wearing}` },
  { image: look.detail, caption: `${look.name}: detail` },
]);

/**
 * Subsection D: the editorial lookbook (PDF pages 17–22).
 * Desktop + motion: the gallery pins and travels horizontally with the scroll.
 * Everywhere else it is a native, swipeable scroll-snap strip: touch friendly,
 * keyboard reachable, and fully usable without animation.
 */
export function Lookbook() {
  const root = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  useReveals(root, (mm) => {
    mm.add(DESKTOP_MOTION_OK, () => {
      const vp = viewport.current;
      const tr = track.current;
      if (!vp || !tr) return;
      vp.dataset.pinned = "true";
      const distance = () => Math.max(0, tr.scrollWidth - vp.clientWidth);

      const tween = gsap.to(tr, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: vp,
          pin: true,
          scrub: 0.8,
          start: "top top",
          end: () => `+=${distance()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progress.current) progress.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });

      // Tabbing to an off-screen look must scroll the page, not the clipped container.
      const onFocusIn = (event: FocusEvent) => {
        vp.scrollLeft = 0;
        const st = tween.scrollTrigger;
        const panel = (event.target as HTMLElement).closest<HTMLElement>("[data-panel]");
        const total = distance();
        if (!st || !panel || !total) return;
        const centred = panel.offsetLeft - (vp.clientWidth - panel.offsetWidth) / 2;
        const ratio = Math.min(1, Math.max(0, centred / total));
        window.scrollTo({ top: st.start + ratio * (st.end - st.start), behavior: "instant" });
      };
      vp.addEventListener("focusin", onFocusIn);

      return () => {
        vp.removeEventListener("focusin", onFocusIn);
        delete vp.dataset.pinned;
        vp.scrollLeft = 0;
      };
    });
  });

  return (
    <section ref={root} className="relative bg-blush/35 pt-28 md:pt-40" aria-label="Editorial lookbook">
      <div className="mx-auto max-w-[1800px] px-5 md:px-10">
        <SectionHeader
          kicker="03 — Collections · D"
          title="Editorial Lookbook"
          intro="Six occasions, nine pieces, styled to be worn twice. Scroll to travel through the looks."
        />
      </div>

      <div
        ref={viewport}
        tabIndex={-1}
        className="group/vp no-scrollbar relative mt-14 snap-x snap-mandatory overflow-x-auto pb-20 data-[pinned=true]:flex data-[pinned=true]:h-svh data-[pinned=true]:snap-none data-[pinned=true]:items-center data-[pinned=true]:overflow-hidden data-[pinned=true]:pb-0 md:mt-20"
      >
        <div ref={track} className="relative flex w-max gap-5 px-5 md:gap-8 md:px-10 lg:gap-16 lg:px-[6vw]">
          {looks.map((look, i) => (
            <article
              key={look.id}
              data-panel=""
              className="relative w-[84vw] shrink-0 snap-center md:w-[62vw] lg:flex lg:h-[74svh] lg:w-auto lg:items-stretch lg:gap-10"
            >
              <div className="mb-6 lg:mb-0 lg:flex lg:w-[17rem] lg:flex-col lg:justify-end lg:pb-2">
                <p className="serif-italic text-6xl text-rose lg:text-8xl">{pad2(i + 1)}</p>
                <h3 className="display mt-3 text-4xl uppercase lg:text-5xl">{look.name}</h3>
                <p className="label mt-4 text-ash">{look.wearing}</p>
              </div>

              <div className="relative lg:contents">
                <button
                  type="button"
                  data-cursor="View"
                  onClick={() => setOpen(i * 2)}
                  aria-label={`${look.name}: view full look`}
                  className="block w-full lg:h-full lg:w-auto lg:shrink-0"
                  style={{ aspectRatio: imageRatio(look.full) }}
                >
                  <Frame name={look.full} className="h-full w-full" sizes="(min-width: 1024px) 38vw, 84vw" position="50% 20%" />
                </button>

                <button
                  type="button"
                  data-cursor="View"
                  onClick={() => setOpen(i * 2 + 1)}
                  aria-label={`${look.name}: view detail`}
                  className="absolute right-3 -bottom-8 w-[38%] border-4 border-blush bg-blush lg:static lg:mt-[7%] lg:h-[82%] lg:w-auto lg:shrink-0 lg:border-0"
                  style={{ aspectRatio: imageRatio(look.detail) }}
                >
                  <Frame name={look.detail} className="h-full w-full" sizes="(min-width: 1024px) 30vw, 36vw" position="50% 25%" />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div
          className="pointer-events-none absolute right-[6vw] bottom-10 left-[6vw] hidden h-px bg-charcoal/15 group-data-[pinned=true]/vp:block"
          aria-hidden="true"
        >
          <div ref={progress} className="h-full origin-left scale-x-0 bg-charcoal" />
        </div>
      </div>

      <CursorFollower containerRef={root} />
      <Lightbox items={lightboxItems} index={open} onChange={setOpen} />
    </section>
  );
}
