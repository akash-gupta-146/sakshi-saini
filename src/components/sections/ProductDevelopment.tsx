import { useRef, type ComponentType } from "react";
import { ChartColumn, Layers, Leaf, Package, Scissors, Sun, type LucideProps } from "lucide-react";
import { development } from "../../content/commercial";
import { cn } from "../../lib/cn";
import { useReveals } from "../../lib/useReveals";

const icons: Record<(typeof development.pillars)[number]["icon"], ComponentType<LucideProps>> = {
  package: Package,
  layers: Layers,
  scissors: Scissors,
  sun: Sun,
  leaf: Leaf,
  chart: ChartColumn,
};

/** Commercial strategy, part C: product development pillars and the 24-week timeline (PDF page 29). */
export function ProductDevelopment() {
  const root = useRef<HTMLElement>(null);
  useReveals(root);
  const last = development.timeline.length - 1;

  return (
    <section ref={root} className="py-28 md:py-40" aria-label="Commercial strategy: product development">
      <div className="mx-auto max-w-[1800px] px-5 md:px-10">
        <h3 className="label text-base">C — Product development</h3>

        <ul data-stagger="" className="mt-10 grid gap-px border border-charcoal/15 bg-charcoal/15 sm:grid-cols-2 lg:grid-cols-3">
          {development.pillars.map((p) => {
            const Icon = icons[p.icon];
            return (
              <li key={p.title} className="bg-ivory p-7 md:p-9">
                <Icon size={26} strokeWidth={1.25} aria-hidden="true" className="text-rose" />
                <h4 className="mt-6 font-serif text-3xl leading-tight">{p.title}</h4>
                <p className="mt-2 text-ash">{p.text}</p>
              </li>
            );
          })}
        </ul>

        <div className="mt-24">
          <p className="label text-ash">Weeks before launch</p>
          <div className="no-scrollbar -mx-5 mt-8 overflow-x-auto px-5 pb-4 md:mx-0 md:px-0" tabIndex={0} role="group" aria-label="Product development timeline, scrollable">
            <div className="relative min-w-[44rem]">
              <div className="absolute top-[0.4rem] right-0 left-0 h-px bg-charcoal/15" aria-hidden="true" />
              <div data-line="" data-delay="0.2" className="absolute top-[0.4rem] right-0 left-0 h-px bg-charcoal" aria-hidden="true" />
              <ol data-stagger="" className="relative grid grid-cols-5">
                {development.timeline.map((step, i) => (
                  <li key={step.weeks} className="pr-4">
                    <span
                      aria-hidden="true"
                      className={cn("block size-[0.9rem] rounded-full border border-charcoal", i === last ? "bg-butter" : "bg-ivory")}
                    />
                    <p className="mt-6 font-serif text-7xl leading-none md:text-8xl">
                      {step.weeks}
                      <span className="sr-only"> weeks before launch</span>
                    </p>
                    <p className="label mt-3 text-sm">{step.label}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
