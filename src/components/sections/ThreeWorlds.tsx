import { useRef } from "react";
import { worlds } from "../../content/forecast";
import { cn } from "../../lib/cn";
import { useReveals } from "../../lib/useReveals";
import { Frame } from "../ui/Frame";
import { SectionHeader } from "../ui/SectionHeader";

const OFFSETS = ["", "lg:mt-20", "lg:mt-10"];

/** The Art of Forecasting, part B: three worlds, one wardrobe (PDF page 3). */
export function ThreeWorlds() {
  const root = useRef<HTMLElement>(null);
  useReveals(root);

  return (
    <section ref={root} className="bg-white py-28 md:py-40" aria-label="Three worlds, one SS27 wardrobe">
      <div className="mx-auto max-w-[1800px] px-5 md:px-10">
        <SectionHeader
          as="h3"
          size="lg"
          kicker="B — Western wear forecast"
          title="Three worlds. One SS27 wardrobe."
        />

        <div className="mt-16 grid gap-16 md:mt-24 lg:grid-cols-3 lg:gap-10">
          {worlds.map((w, i) => (
            <article key={w.number} className={cn("flex flex-col", OFFSETS[i])}>
              <Frame name={w.image} ratio="natural" mask sizes="(min-width: 1024px) 30vw, 100vw" />

              <div className="mt-6 flex items-baseline gap-4">
                <span className="serif-italic text-2xl text-rose">{w.number}</span>
                <h4 className="display text-5xl uppercase md:text-6xl">{w.name}</h4>
              </div>
              <p className="serif-italic mt-2 text-xl text-ash">{w.tagline}</p>

              <div className="mt-6 flex h-4 overflow-hidden" aria-hidden="true">
                {w.palette.map((hex) => (
                  <span key={hex} className="h-full flex-1" style={{ backgroundColor: hex }} />
                ))}
              </div>

              <dl className="mt-6 divide-y divide-charcoal/15 border-y border-charcoal/15 text-[0.95rem]">
                {(
                  [
                    ["Fabric", w.fabrics],
                    ["Print", w.prints],
                    ["Direction", w.direction],
                  ] as const
                ).map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[5.5rem_1fr] gap-3 py-3">
                    <dt className="label pt-0.5 text-ash">{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
                <div className="grid grid-cols-[5.5rem_1fr] gap-3 bg-butter/40 px-0 py-3">
                  <dt className="label pt-0.5">KAZO</dt>
                  <dd className="font-medium">{w.kazoRole}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
