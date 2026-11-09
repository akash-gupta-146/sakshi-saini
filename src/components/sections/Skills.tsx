import { useRef } from "react";
import { skills } from "../../content/process";
import { pad2 } from "../../lib/format";
import { useReveals } from "../../lib/useReveals";
import { SectionHeader } from "../ui/SectionHeader";

/** Editorial skill index: grouped labels in serif type, no bars or percentages. */
export function Skills() {
  const root = useRef<HTMLElement>(null);
  useReveals(root);

  return (
    <section ref={root} className="py-28 md:py-40" aria-label="Skills and expertise">
      <div className="mx-auto max-w-[1800px] px-5 md:px-10">
        <SectionHeader kicker="08 — Expertise" title={skills.heading} />

        <div className="mt-16 grid gap-x-16 gap-y-16 md:mt-24 md:grid-cols-2">
          {skills.groups.map((group, i) => (
            <section key={group.title} aria-label={group.title}>
              <div className="flex items-baseline gap-4 border-b border-charcoal pb-3">
                <span className="serif-italic text-xl text-rose">{pad2(i + 1)}</span>
                <h3 className="label text-base">{group.title}</h3>
              </div>
              <ul data-stagger="" className="mt-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="group/skill flex items-center justify-between border-b border-charcoal/15 py-3 font-serif text-3xl transition-[padding] duration-500 hover:pl-3 md:text-4xl"
                  >
                    {item}
                    <span aria-hidden="true" className="size-2 rounded-full bg-butter opacity-0 transition-opacity group-hover/skill:opacity-100" />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="mt-12 text-sm text-ash">{skills.note}</p>
      </div>
    </section>
  );
}
