import { useRef, useState } from "react";
import { garments } from "../../content/garments";
import { pad2 } from "../../lib/format";
import { useReveals } from "../../lib/useReveals";
import { CursorFollower } from "../ui/CursorFollower";
import { Frame } from "../ui/Frame";
import { Img } from "../ui/Img";
import { SectionHeader } from "../ui/SectionHeader";
import { GarmentModal } from "./GarmentModal";

/** Staggered vertical rhythm on desktop (3 columns) and mobile (2 columns). */
const OFFSETS = ["", "lg:mt-24", "lg:mt-12"];

/** Subsection B: nine pieces as an image-first editorial grid, not ecommerce cards. */
export function Lineup() {
  const root = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<number | null>(null);
  useReveals(root);

  return (
    <section ref={root} className="py-28 md:py-40" aria-label="Collection lineup">
      <div className="mx-auto max-w-[1800px] px-5 md:px-10">
        <SectionHeader
          kicker="03 — Collections · B"
          title="The Collection Lineup"
          intro="Nine pieces, one romantic point of view. Select any garment to see every view, fabric composition and construction detail."
        />

        <ul className="mt-16 grid grid-cols-2 items-start gap-x-3 gap-y-12 md:mt-24 md:gap-x-10 md:gap-y-20 lg:grid-cols-3">
          {garments.map((g, i) => (
            <li key={g.id} className={`${OFFSETS[i % 3]} max-lg:even:mt-12`}>
              <button
                type="button"
                data-cursor="View"
                onClick={() => setSelected(i)}
                aria-label={`${g.name}: open details`}
                className="group/tile block w-full text-left"
              >
                <Frame name={g.cover} ratio="natural" mask sizes="(min-width: 1024px) 30vw, 48vw">
                  <div className="absolute inset-0 bg-[#EEE8DF] p-[12%] opacity-0 transition-opacity duration-700 group-hover/tile:opacity-100 group-focus-visible/tile:opacity-100">
                    <Img name={g.illustration} alt="" sizes="30vw" className="h-full w-full object-contain mix-blend-multiply" />
                  </div>
                </Frame>
                <div className="mt-4 flex items-baseline gap-4 border-b border-charcoal/15 pb-4 transition-colors group-hover/tile:border-charcoal">
                  <span className="serif-italic text-xl text-rose md:text-2xl">{pad2(i + 1)}</span>
                  <div>
                    <h3 className="font-serif text-xl leading-tight md:text-3xl">{g.name}</h3>
                    <p className="label mt-2 hidden text-ash md:block">{g.spec.silhouette}</p>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <CursorFollower containerRef={root} />
      <GarmentModal index={selected} onChange={setSelected} />
    </section>
  );
}
