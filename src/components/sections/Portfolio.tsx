import { useRef } from "react";
import { featuredProject } from "../../content/garments";
import { useReveals } from "../../lib/useReveals";
import { Frame } from "../ui/Frame";
import { SectionHeader } from "../ui/SectionHeader";
import { Moodboard } from "./Moodboard";

/**
 * "Selected Work": the Modern Romance SS27 feature gets the biggest visual treatment on
 * the site, then flows into the moodboard (subsection A). Subsections B–D live in <Collections />.
 */
export function Portfolio() {
  const root = useRef<HTMLElement>(null);
  useReveals(root);

  return (
    <div id="portfolio" className="bg-blush/35">
      <section ref={root} className="pt-28 md:pt-40" aria-label="Selected work">
      <div className="mx-auto max-w-[1800px] px-5 md:px-10">
        <SectionHeader
          kicker="02 — Portfolio"
          title="Selected Work"
          intro="A collection of ideas, research, and designs translated into contemporary apparel."
        />

        <article className="mt-24 md:mt-36" aria-labelledby="featured-title">
          <div className="flex items-end justify-between gap-6 border-b border-charcoal/20 pb-4">
            <p className="label">Featured project</p>
            <p className="label text-ash">{featuredProject.season}</p>
          </div>

          <h3
            id="featured-title"
            data-split=""
            className="display mt-8 text-[clamp(3.2rem,14.5vw,16rem)] uppercase md:mt-12"
          >
            <span className="sr-only">{featuredProject.title}</span>
            <span aria-hidden="true" className="block">
              {["Modern", "Romance"].map((word, i) => (
                <span key={word} className={`split-word ${i === 1 ? "italic md:ml-[1.2em]" : ""}`}>
                  <span className="split-inner">{word}</span>
                </span>
              ))}
            </span>
          </h3>

          <div className="mt-10 grid grid-cols-12 items-start gap-3 md:mt-16 md:gap-8">
            <div className="col-span-5 md:col-span-4 md:mt-28">
              <Frame name="look-golden-hour-detail" mask parallax={0.04} ratio={0.7} sizes="(min-width: 768px) 30vw, 42vw" position="50% 20%" />
            </div>
            <div className="col-span-7 md:col-span-5">
              <Frame name="look-brunch-to-party-full" mask parallax={0.04} ratio={0.75} sizes="(min-width: 768px) 42vw, 58vw" />
            </div>
            <div className="col-span-5 col-start-5 -mt-8 md:col-span-3 md:col-start-auto md:mt-56">
              <Frame name="look-birthday-full" mask parallax={0.04} ratio={0.667} sizes="(min-width: 768px) 24vw, 42vw" />
            </div>
          </div>

          <div className="mt-16 grid gap-12 md:mt-28 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-7">
              <p data-reveal="" className="serif-italic text-3xl leading-[1.2] md:text-5xl md:leading-[1.15]">
                {featuredProject.intro}
              </p>
            </div>
            <div className="lg:col-span-5" data-reveal="" data-delay="0.15">
              <dl className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-charcoal/20 pt-6">
                {featuredProject.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="label text-ash">{fact.label}</dt>
                    <dd className="mt-1 font-serif text-xl md:text-2xl">{fact.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-8 text-sm text-ash">{featuredProject.disclaimer}</p>
            </div>
          </div>
        </article>
      </div>

      </section>
      <Moodboard />
    </div>
  );
}
