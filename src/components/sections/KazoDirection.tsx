import { useRef } from "react";
import { kazoDirection as k } from "../../content/forecast";
import { useReveals } from "../../lib/useReveals";
import { SectionHeader } from "../ui/SectionHeader";

const subheading = "label border-b border-ivory/20 pb-3 text-butter";

/** The Art of Forecasting, part D: the KAZO SS27 creative direction (PDF page 5), set in a dark editorial block. */
export function KazoDirection() {
  const root = useRef<HTMLElement>(null);
  useReveals(root);

  return (
    <section ref={root} className="on-dark bg-charcoal py-28 text-ivory md:py-40" aria-label="KAZO SS27 creative direction">
      <div className="mx-auto grid max-w-[1800px] gap-16 px-5 md:px-10 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <SectionHeader as="h3" size="lg" tone="dark" kicker="D — SS27 creative direction" title={k.headline} />
          <p data-reveal="" className="display mt-10 text-[clamp(2.6rem,5vw,4.5rem)] text-butter uppercase">
            {k.subhead}
          </p>
          <p data-reveal="" className="mt-8 max-w-md text-lg leading-relaxed text-ivory/80">
            {k.body}
          </p>
          <p data-reveal="" className="serif-italic mt-16 text-[clamp(3.4rem,8vw,7.5rem)] leading-[0.95] text-butter">
            {k.statement}
          </p>
        </div>

        <div className="grid content-start gap-x-12 gap-y-12 md:grid-cols-2 lg:col-span-7">
          <div data-reveal="">
            <h4 className={subheading}>01 · Design DNA</h4>
            <ul className="mt-4 space-y-2 font-serif text-2xl">
              {k.dna.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>

          <div data-reveal="">
            <h4 className={subheading}>02 · Priorities, ranked</h4>
            <ol className="mt-4 space-y-2">
              {k.priorities.map((p, i) => (
                <li key={p} className="flex items-baseline gap-4 font-serif text-2xl">
                  <span className="serif-italic w-5 text-lg text-butter">{i + 1}</span>
                  {p}
                </li>
              ))}
            </ol>
          </div>

          <div data-reveal="" className="md:col-span-2">
            <h4 className={subheading}>03 · Colour strategy</h4>
            <ul className="mt-4 divide-y divide-ivory/15">
              {k.colour.map((c) => (
                <li key={c.tier} className="grid grid-cols-[6rem_auto_1fr] items-center gap-5 py-3">
                  <span className="label text-ivory/75">{c.tier}</span>
                  <span className="flex gap-1.5" aria-hidden="true">
                    {c.swatches.map((hex) => (
                      <span key={hex} className="size-7 border border-ivory/25" style={{ backgroundColor: hex }} />
                    ))}
                  </span>
                  <span>{c.names}</span>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal="" className="md:col-span-2">
            <h4 className={subheading}>04 · Print + fabric</h4>
            <dl className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <dt className="label text-ivory/75">Prints</dt>
                <dd className="mt-1">{k.print}</dd>
              </div>
              <div>
                <dt className="label text-ivory/75">Fabrics</dt>
                <dd className="mt-1">{k.fabric}</dd>
              </div>
            </dl>
          </div>

          <div data-reveal="" className="md:col-span-2">
            <h4 className={subheading}>05 · Competitive differentiation</h4>
            <ul className="mt-4 grid gap-6 md:grid-cols-3">
              {k.differentiation.map((d) => (
                <li key={d.versus}>
                  <p className="label text-ivory/75">vs {d.versus}</p>
                  <p className="mt-1 font-serif text-2xl leading-tight">{d.edge}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
