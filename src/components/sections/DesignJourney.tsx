import { useRef, useState } from "react";
import { journey } from "../../content/process";
import { cn } from "../../lib/cn";
import { pad2 } from "../../lib/format";
import { useReveals } from "../../lib/useReveals";
import { Img } from "../ui/Img";
import { SectionHeader } from "../ui/SectionHeader";

/**
 * Five stages from research to commercialisation, illustrated with the project's own imagery.
 * Desktop: an accordion of image strips that expands on hover/focus. Mobile: stacked cards.
 */
export function DesignJourney() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useReveals(root);

  return (
    <section id="journey" ref={root} className="bg-white py-28 md:py-40" aria-label="The design journey">
      <div className="mx-auto max-w-[1800px] px-5 md:px-10">
        <SectionHeader kicker="07 — Process" title={journey.heading} intro={journey.disclaimer} />

        <ol data-stagger="" className="mt-16 flex flex-col gap-4 md:mt-24 lg:h-[34rem] lg:flex-row lg:gap-3">
          {journey.stages.map((stage, i) => {
            const isActive = i === active;
            return (
              <li
                key={stage.title}
                className={cn(
                  "relative overflow-hidden bg-charcoal text-ivory transition-[flex-grow] duration-[900ms] ease-[var(--ease-editorial)] lg:min-w-0",
                  isActive ? "lg:flex-[3.2]" : "lg:flex-1",
                )}
                onMouseEnter={() => setActive(i)}
              >
                <button
                  type="button"
                  className="absolute inset-0 z-10 hidden lg:block"
                  aria-label={`Stage ${i + 1}: ${stage.title}`}
                  aria-pressed={isActive}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                />
                <Img
                  name={stage.image}
                  alt=""
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className={cn(
                    "absolute inset-0 h-full w-full object-cover transition-all duration-[1200ms]",
                    isActive ? "scale-100 opacity-70" : "scale-110 opacity-40 lg:grayscale",
                  )}
                  style={{ objectPosition: "50% 20%" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" aria-hidden="true" />

                <div className="relative flex h-80 flex-col justify-between p-6 md:p-8 lg:h-full lg:p-6">
                  <span className="serif-italic text-5xl text-butter">{pad2(i + 1)}</span>
                  <div className="min-h-0">
                    {/* Collapsed strips read vertically so long titles never clip. */}
                    <h3
                      className={cn(
                        "display text-3xl uppercase md:text-4xl",
                        !isActive && "lg:rotate-180 lg:text-2xl lg:whitespace-nowrap lg:[writing-mode:vertical-rl]",
                      )}
                    >
                      {stage.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-3 max-w-sm text-ivory/90 transition-all duration-700",
                        isActive ? "lg:translate-y-0 lg:opacity-100" : "lg:translate-y-3 lg:opacity-0",
                      )}
                    >
                      {stage.text}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
