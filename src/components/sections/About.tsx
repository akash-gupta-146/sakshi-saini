import { useRef } from "react";
import { about } from "../../content/site";
import { pad2 } from "../../lib/format";
import { useReveals } from "../../lib/useReveals";
import { Frame } from "../ui/Frame";
import { Placeholder } from "../ui/Placeholder";
import { SectionHeader } from "../ui/SectionHeader";

export function About() {
  const root = useRef<HTMLElement>(null);
  useReveals(root);

  return (
    <section id="about" ref={root} className="relative py-28 md:py-40">
      <div className="mx-auto grid max-w-[1800px] gap-14 px-5 md:px-10 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Frame
              name="look-brunch-day-out-detail"
              sizes="(min-width: 1024px) 40vw, 100vw"
              ratio={4 / 5}
              position="50% 25%"
              mask
              parallax={0.05}
              className="w-full"
            />
            <p className="label mt-4 text-ash">Brunch Day Out · Modern Romance SS27</p>
          </div>
        </div>

        <div className="lg:col-span-7 lg:pt-10">
          <SectionHeader kicker="01 — About" title={about.heading} />

          <div className="mt-12 grid gap-10 md:mt-16 xl:grid-cols-[1fr_1.1fr]">
            <div data-reveal="">
              <p className="font-serif text-4xl leading-none md:text-5xl">Sakshi Saini</p>
              <p className="label mt-3 text-ash">Apparel Designer</p>
              <dl className="mt-10 divide-y divide-charcoal/15 border-y border-charcoal/15">
                {about.facts.map((fact) => (
                  <div key={fact.label} className="grid grid-cols-[7.5rem_1fr] gap-4 py-3">
                    <dt className="label pt-0.5 text-ash">{fact.label}</dt>
                    <dd>{fact.value ? fact.value : <Placeholder>{"placeholder" in fact ? fact.placeholder : ""}</Placeholder>}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div data-reveal="" data-delay="0.15" className="space-y-5 text-lg leading-relaxed">
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>

          <ol className="mt-16 grid gap-px border-y border-charcoal/15 bg-charcoal/15 md:mt-20 md:grid-cols-3" data-stagger="">
            {about.highlights.map((h, i) => (
              <li key={h.title} className="bg-ivory py-7 md:px-6 md:first:pl-0">
                <p className="serif-italic text-3xl text-rose">{pad2(i + 1)}</p>
                <h3 className="label mt-3 text-base">{h.title}</h3>
                <p className="mt-3 text-ash">{h.text}</p>
              </li>
            ))}
          </ol>

          <p className="mt-6 text-sm text-ash">
            <span className="label mr-2">Note</span>
            {about.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}
