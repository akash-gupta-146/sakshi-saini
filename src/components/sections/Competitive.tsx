import { useRef } from "react";
import { brands, positioning } from "../../content/forecast";
import { cn } from "../../lib/cn";
import { useReveals } from "../../lib/useReveals";
import { SectionHeader } from "../ui/SectionHeader";

const ROWS = [
  ["Position", "position"],
  ["Strength", "strength"],
  ["Example", "example"],
  ["Overlap", "overlap"],
] as const;

/** The Art of Forecasting, part C: competitive positioning (PDF page 4). */
export function Competitive() {
  const root = useRef<HTMLElement>(null);
  useReveals(root);

  return (
    <section ref={root} className="py-28 md:py-40" aria-label="Competitive positioning">
      <div className="mx-auto max-w-[1800px] px-5 md:px-10">
        <SectionHeader as="h3" size="lg" kicker="C — Competitive positioning" title="Where does KAZO stand?" />

        <div
          data-stagger=""
          className="mt-16 grid gap-y-6 md:mt-24 md:grid-cols-4 md:grid-rows-[repeat(5,auto)] md:gap-x-4 md:gap-y-0"
        >
          {brands.map((b) => {
            const highlight = "highlight" in b;
            return (
              <article
                key={b.name}
                className={cn("md:row-span-5 md:grid md:grid-rows-subgrid", highlight && "bg-blush/55")}
              >
                <h4 className={cn("font-serif text-4xl", highlight ? "px-4 pt-4 pb-3" : "px-4 pb-3")}>{b.name}</h4>
                {ROWS.map(([label, key]) => {
                  const dark = key === "overlap";
                  return (
                    <div
                      key={key}
                      className={cn(
                        "border-t px-4 py-4",
                        dark ? "on-dark border-charcoal bg-charcoal text-ivory" : "border-charcoal/20",
                      )}
                    >
                      <p className={cn("label text-xs", dark ? "text-butter" : "text-ash")}>{label}</p>
                      <p className="mt-1">{b[key]}</p>
                    </div>
                  );
                })}
              </article>
            );
          })}
        </div>

        <div className="mt-20 grid gap-10 border-t border-charcoal/20 pt-10 md:grid-cols-3 md:gap-12" data-stagger="">
          <div>
            <p className="label text-ash">Already offered</p>
            <p className="mt-3 text-lg">{positioning.alreadyOffered}</p>
          </div>
          <div>
            <p className="label text-ash">Under-served</p>
            <p className="mt-3 text-lg">
              <mark className="bg-butter px-1">{positioning.underServed}</mark>
            </p>
          </div>
          <div>
            <p className="label text-ash">KAZO advantage</p>
            <p className="serif-italic mt-3 text-4xl leading-tight md:text-5xl">{positioning.advantage}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
