import { useRef } from "react";
import { newLanguage } from "../../content/forecast";
import { pad2 } from "../../lib/format";
import { useReveals } from "../../lib/useReveals";
import { Frame } from "../ui/Frame";
import { SectionHeader } from "../ui/SectionHeader";

const CHART_MAX = 12; // percent: scale ceiling so the bars have breathing room

/** The Art of Forecasting, part A: the five macro signals behind SS27 (PDF page 2). */
export function NewLanguage() {
  const root = useRef<HTMLElement>(null);
  useReveals(root);
  const { chart } = newLanguage;

  return (
    <section ref={root} className="py-28 md:py-40" aria-label="The new language: SS27 macro signals">
      <div className="mx-auto max-w-[1800px] px-5 md:px-10">
        <SectionHeader
          kicker="04 — Research · SS27 Western Wear Forecast"
          title="The Art of Forecasting"
        />

        <div className="mt-20 grid gap-16 md:mt-28 lg:grid-cols-12 lg:gap-20">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Frame name={newLanguage.image} ratio="natural" mask sizes="(min-width: 1024px) 30vw, 100vw" />
              <dl className="mt-8 divide-y divide-charcoal/15 border-y border-charcoal/15" data-reveal="">
                {newLanguage.directions.map((d) => (
                  <div key={d.label} className="grid grid-cols-[5.5rem_1fr] gap-4 py-3">
                    <dt className="label pt-0.5 text-ash">{d.label}</dt>
                    <dd>
                      {d.value}
                      {d.swatches ? (
                        <span className="mt-2 flex gap-1.5" aria-hidden="true">
                          {d.swatches.map((hex) => (
                            <span key={hex} className="size-4 rounded-full border border-charcoal/15" style={{ backgroundColor: hex }} />
                          ))}
                        </span>
                      ) : null}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>

          <div className="lg:col-span-8">
            <p className="label text-ash">A — {newLanguage.kicker}</p>
            <p data-reveal="" className="serif-italic mt-5 max-w-3xl text-4xl leading-[1.1] md:text-6xl">
              {newLanguage.statement}
            </p>

            <p className="label mt-16 border-b border-charcoal/20 pb-3 text-ash">Five macro signals</p>
            <ol>
              {newLanguage.signals.map((s, i) => (
                <li key={s.title} data-reveal="" className="grid gap-x-8 gap-y-3 border-b border-charcoal/15 py-7 md:grid-cols-[4.5rem_1.2fr_1fr]">
                  <span className="serif-italic text-4xl leading-none text-rose md:text-5xl">{pad2(i + 1)}</span>
                  <div>
                    <h3 className="label text-lg tracking-[0.12em]">{s.title}</h3>
                    <p className="mt-2">{s.summary}</p>
                    <p className="mt-2 text-sm text-ash">{s.evidence}</p>
                  </div>
                  <p className="text-ash md:border-l md:border-charcoal/15 md:pl-6">
                    <span className="label mb-1 block text-xs">KAZO translation</span>
                    {s.translation}
                  </p>
                </li>
              ))}
            </ol>

            <figure className="mt-14" aria-label={chart.title}>
              <figcaption className="label text-ash">{chart.title}</figcaption>
              <div className="mt-5 space-y-3">
                {[chart.from, chart.to].map((bar, i) => (
                  <div key={bar.label} className="grid grid-cols-[3rem_1fr] items-center gap-4">
                    <span className="label text-ash">{bar.label}</span>
                    <div className="h-9 w-full bg-charcoal/[0.06]">
                      <div
                        data-line=""
                        data-delay={i * 0.25}
                        className={`flex h-full items-center justify-end px-3 ${i ? "bg-charcoal text-ivory" : "bg-rose text-charcoal"}`}
                        style={{ width: `${(bar.value / CHART_MAX) * 100}%` }}
                      >
                        <span className="font-serif text-xl">{bar.value}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </figure>

            <div data-reveal="" className="on-dark mt-14 bg-charcoal px-7 py-8 text-ivory md:px-10 md:py-10">
              <p className="label text-butter">The central opportunity</p>
              <p className="serif-italic mt-3 text-2xl leading-snug md:text-4xl">{newLanguage.opportunity}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
