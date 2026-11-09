import { useRef, type CSSProperties } from "react";
import { pricing, priceItems, tiers, type Tier } from "../../content/commercial";
import { cn } from "../../lib/cn";
import { formatINR } from "../../lib/format";
import { useReveals } from "../../lib/useReveals";
import { CountUp } from "../ui/CountUp";
import { Img } from "../ui/Img";
import { SectionHeader } from "../ui/SectionHeader";

const barTone: Record<Tier, string> = {
  Core: "bg-warm-grey",
  Fashion: "bg-rose",
  Statement: "bg-butter",
};

const maxMrp = Math.max(...priceItems.map((p) => p.mrp));
const sortedByPrice = [...priceItems].sort((a, b) => a.mrp - b.mrp);

/** Average and range are calculated from the listed prices, not taken from the PDF. */
const tierStats = (tier: Tier) => {
  const prices = priceItems.filter((p) => p.tier === tier).map((p) => p.mrp);
  return {
    average: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length),
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
};

/** Commercial strategy, part A: range & pricing (PDF page 27). */
export function RangePricing() {
  const root = useRef<HTMLElement>(null);
  useReveals(root);

  return (
    <section id="commercial" ref={root} className="py-28 md:py-40" aria-label="Commercial strategy: range and pricing">
      <div className="mx-auto max-w-[1800px] px-5 md:px-10">
        <SectionHeader
          kicker="06 — Commercial strategy"
          title="Design with a commercial mindset"
          intro="Creative decisions connect directly to pricing, collection planning, sourcing and merchandising."
        />

        <div className="mt-24 md:mt-32">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="label text-base">A — Range & pricing</h3>
            <p className="serif-italic text-xl text-ash md:text-2xl">{pricing.tagline}</p>
          </div>

          <div className="mt-6 flex h-3 overflow-hidden" role="img" aria-label="Unit mix: 45% core, 35% fashion, 20% statement">
            {tiers.map((t) => (
              <span key={t.tier} data-line="" className={cn("h-full border-r-2 border-ivory last:border-0", barTone[t.tier])} style={{ width: `${t.units}%` }} />
            ))}
          </div>

          <div className="mt-3 grid gap-3 lg:grid-cols-[45fr_35fr_20fr]">
            {tiers.map((t) => {
              const items = priceItems.filter((p) => p.tier === t.tier);
              const stats = tierStats(t.tier);
              return (
                <article key={t.tier} className={cn("p-5 md:p-7", t.tint)}>
                  <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h4 className="label text-base">{t.tier}</h4>
                    <p className="font-serif text-4xl leading-none">
                      {t.units}
                      <span className="text-xl">%</span> <span className="label text-ash">of units</span>
                    </p>
                  </header>
                  <ul
                    className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-[repeat(var(--n),minmax(0,1fr))]"
                    style={{ "--n": items.length } as CSSProperties}
                    data-stagger=""
                  >
                    {items.map((p) => (
                      <li key={p.id} className="flex flex-col">
                        <div className="h-40 md:h-48">
                          <Img name={p.image} sizes="(min-width: 1024px) 12vw, 40vw" alt="" className="h-full w-full object-contain mix-blend-multiply" />
                        </div>
                        <p className="mt-3 font-serif text-2xl leading-none">{formatINR(p.mrp)}</p>
                        <p className="label mt-1.5 text-ash">{p.label}</p>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-8 border-t border-charcoal/15 pt-3 text-xs text-ash">
                    Avg {formatINR(stats.average)} · {formatINR(stats.min)}–{formatINR(stats.max)}
                    <span className="sr-only"> (calculated from the listed prices)</span>
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-20 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
            <div>
              <h4 className="label border-b border-charcoal/20 pb-3 text-ash">Price by piece, lowest to highest</h4>
              <ul className="mt-4 space-y-2.5">
                {sortedByPrice.map((p) => (
                  <li key={p.id} className="grid grid-cols-[7.5rem_1fr_4.2rem] items-center gap-3 sm:grid-cols-[10rem_1fr_5rem]">
                    <span className="label truncate text-ash">{p.label}</span>
                    <span className="block h-4 bg-charcoal/[0.05]">
                      <span data-line="" className={cn("block h-full", barTone[p.tier])} style={{ width: `${(p.mrp / maxMrp) * 100}%` }} />
                    </span>
                    <span className="text-right font-serif text-xl">{formatINR(p.mrp)}</span>
                  </li>
                ))}
              </ul>
              <ul className="label mt-5 flex gap-6 text-ash">
                {(Object.keys(barTone) as Tier[]).map((tier) => (
                  <li key={tier} className="flex items-center gap-2">
                    <span className={cn("size-3", barTone[tier])} aria-hidden="true" /> {tier}
                  </li>
                ))}
              </ul>
            </div>

            <dl className="grid content-start gap-px bg-charcoal/15" data-stagger="">
              {pricing.kpis.map((k) => (
                <div key={k.label} className="flex flex-col-reverse bg-ivory py-6 first:pt-0 lg:pl-8 lg:first:pl-8">
                  <dt className="mt-2 text-ash">{k.label}</dt>
                  <dd className="font-serif text-6xl leading-none md:text-7xl">
                    <CountUp value={k.value} prefix={k.prefix} suffix={k.suffix} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="mt-6 text-sm text-ash">The Celeste set sold as separates: {formatINR(2990)} top + {formatINR(3490)} skirt.</p>
        </div>
      </div>
    </section>
  );
}
