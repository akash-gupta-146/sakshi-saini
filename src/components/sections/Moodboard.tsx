import { useRef, useState } from "react";
import { moodboard } from "../../content/garments";
import { useReveals } from "../../lib/useReveals";
import { CursorFollower } from "../ui/CursorFollower";
import { Frame } from "../ui/Frame";
import { Lightbox } from "../ui/Lightbox";
import { SectionHeader } from "../ui/SectionHeader";

const [sundress, lace, wildflowers, bouquet, ranunculus, tulle] = moodboard.items;

/** Collage columns echo the composition of the original page-6 moodboard. */
const columns = [
  { items: [sundress, ranunculus], offset: "" },
  { items: [lace], offset: "md:mt-20" },
  { items: [wildflowers], offset: "md:mt-8" },
  { items: [bouquet, tulle], offset: "md:mt-28" },
];

/** Subsection A: the creative inspiration behind Modern Romance (PDF page 6). */
export function Moodboard() {
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  useReveals(root);

  const lightboxItems = moodboard.items.map((m) => ({ image: m.image, caption: m.tag }));

  return (
    <div ref={root} className="mx-auto mt-32 max-w-[1800px] px-5 pb-28 md:mt-48 md:px-10 md:pb-40">
      <SectionHeader
        as="h3"
        size="lg"
        kicker="A — Moodboard & creative inspiration"
        title="Blooming gardens, summer warmth"
        intro="Inspired by blooming gardens and summer warmth, the collection blends pretty prints, cut work, intricate work and airy shapes."
      />

      <div className="mt-14 grid grid-cols-2 items-start gap-3 md:mt-20 md:grid-cols-12 md:gap-6">
        {columns.map((col, c) => (
          <div key={c} className={`flex flex-col gap-3 md:col-span-3 md:gap-6 ${col.offset}`}>
            {col.items.map((item) => {
              const index = moodboard.items.indexOf(item);
              return (
                <button
                  key={item.image}
                  type="button"
                  data-cursor="View"
                  onClick={() => setOpen(index)}
                  aria-label={`View larger: ${item.tag}`}
                  className="group relative block text-left"
                >
                  <Frame name={item.image} ratio="natural" mask sizes="(min-width: 768px) 24vw, 48vw" />
                  <span className="label absolute bottom-3 left-3 bg-ivory/95 px-2.5 py-1.5 text-[0.7rem]">{item.tag}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="mt-14 md:mt-20">
        <p className="label mb-4 text-ash">Summer colour palette</p>
        <ul className="grid grid-cols-5 gap-2 md:gap-4" data-stagger="">
          {moodboard.palette.map((c) => (
            <li key={c.hex}>
              <div className="h-14 border border-charcoal/10 md:h-24" style={{ backgroundColor: c.hex }} />
              <p className="label mt-2 text-[0.68rem] text-ash md:text-xs">{c.name}</p>
              <p className="hidden text-xs text-warm-grey md:block">{c.hex}</p>
            </li>
          ))}
        </ul>
      </div>

      <CursorFollower containerRef={root} />
      <Lightbox items={lightboxItems} index={open} onChange={setOpen} />
    </div>
  );
}
