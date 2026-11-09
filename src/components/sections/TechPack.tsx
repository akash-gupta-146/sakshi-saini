import { useRef } from "react";
import { techpack } from "../../content/technical";
import { pad2 } from "../../lib/format";
import { useReveals } from "../../lib/useReveals";
import { Frame } from "../ui/Frame";
import { SectionHeader } from "../ui/SectionHeader";
import { ZoomViewer, type ViewerTab } from "../ui/ZoomViewer";

const tabs: readonly ViewerTab[] = [
  { id: "techpack", label: "Tech pack sheet", image: "techpack-sheet" },
  { id: "construction", label: "Construction sheet", image: "construction-sheet", focusPoints: techpack.focusPoints },
];

/** From concept to construction: the Solène mini dress tech pack (PDF pages 24–25). */
export function TechPack() {
  const root = useRef<HTMLElement>(null);
  useReveals(root);

  return (
    <section id="technical" ref={root} className="bg-white py-28 md:py-40" aria-label="Technical design and tech pack">
      <div className="mx-auto max-w-[1800px] px-5 md:px-10">
        <SectionHeader kicker="05 — Technical design" title={techpack.heading} intro={techpack.intro} />

        <dl
          data-reveal=""
          className="mt-16 grid gap-px border border-charcoal/15 bg-charcoal/15 sm:grid-cols-2 lg:grid-cols-5"
        >
          {techpack.header.map((h) => (
            <div key={h.label} className="bg-white p-5 sm:last:col-span-2 lg:last:col-span-1">
              <dt className="label text-ash">{h.label}</dt>
              <dd className="mt-1.5 leading-snug">{h.value}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-10 grid grid-cols-3 gap-3 md:mt-14 md:gap-8">
          {techpack.strip.map((s) => (
            <li key={s.image}>
              <Frame name={s.image} ratio="natural" mask className="border border-charcoal/10" sizes="(min-width: 768px) 30vw, 33vw" />
              <p className="label mt-3 text-ash">{s.label}</p>
            </li>
          ))}
        </ul>

        <div className="mt-20 grid gap-14 lg:mt-28 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <ZoomViewer tabs={tabs} />
          </div>

          <aside className="lg:col-span-4" aria-label="Construction details">
            <p className="label border-b border-charcoal/20 pb-3 text-ash">What the sheet documents</p>
            <ol data-stagger="" className="mt-2 divide-y divide-charcoal/10">
              {techpack.highlights.map((item, i) => (
                <li key={item} className="flex items-baseline gap-4 py-3">
                  <span className="serif-italic w-6 text-lg text-rose">{pad2(i + 1)}</span>
                  <span className="font-serif text-xl">{item}</span>
                </li>
              ))}
            </ol>

            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
              {(
                [
                  ["Front callouts", techpack.callouts.front],
                  ["Back callouts", techpack.callouts.back],
                ] as const
              ).map(([title, list]) => (
                <div key={title}>
                  <p className="label text-ash">{title}, as drawn</p>
                  <ul className="mt-3 space-y-1.5 text-sm">
                    {list.map((c) => (
                      <li key={c} className="flex gap-3">
                        <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-rose" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
