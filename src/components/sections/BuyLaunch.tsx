import { useRef } from "react";
import { calendar, launch } from "../../content/commercial";
import { cn } from "../../lib/cn";
import { useReveals } from "../../lib/useReveals";
import { Img } from "../ui/Img";

const maxShare = Math.max(...launch.sizes.ratio.map((s) => s.share));

/** Commercial strategy, part B: buy, stores & launch (PDF page 28). */
export function BuyLaunch() {
  const root = useRef<HTMLElement>(null);
  useReveals(root);

  return (
    <section ref={root} className="bg-blush/35 py-28 md:py-40" aria-label="Commercial strategy: buy, stores and launch">
      <div className="mx-auto max-w-[1800px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h3 className="label text-base">B — Buy, stores & launch</h3>
          <p className="serif-italic text-xl text-ash md:text-2xl">{launch.tagline}</p>
        </div>

        <ol data-stagger="" className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {calendar.map((m, i) => (
            <li key={m.month} className="border-t-2 border-charcoal pt-4">
              <p className="label text-ash">0{i + 1}</p>
              <h4 className="mt-1 font-serif text-4xl leading-none">{m.month}</h4>
              <p className="mt-2 text-ash">{m.occasion}</p>
              <div className="mt-6 flex h-36 items-end gap-2 md:h-44">
                {m.images.map((img, k) => (
                  <Img key={`${img}-${k}`} name={img} alt="" sizes="12vw" className="max-h-full min-w-0 flex-1 object-contain object-bottom mix-blend-multiply" />
                ))}
              </div>
              <p className="label mt-4 text-[0.72rem]">{m.pieces.join(" · ")}</p>
            </li>
          ))}
        </ol>

        <div className="mt-20 grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h4 className="label border-b border-charcoal/20 pb-3 text-ash">Stores</h4>
            <dl className="divide-y divide-charcoal/15">
              {launch.stores.map((s) => (
                <div key={s.store} className="grid gap-1 py-4 sm:grid-cols-[1fr_1fr] sm:gap-6">
                  <dt className="font-medium">{s.store}</dt>
                  <dd className="text-ash">{s.range}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-4">
            <h4 className="label border-b border-charcoal/20 pb-3 text-ash">Buy</h4>
            <p className="mt-4 font-serif text-6xl leading-none md:text-7xl">
              {launch.buy.upfront} / {launch.buy.heldBack}
            </p>
            <div className="mt-5 flex h-3" role="img" aria-label={`${launch.buy.upfront}% upfront, ${launch.buy.heldBack}% held back`}>
              <span data-line="" className="h-full bg-charcoal" style={{ width: `${launch.buy.upfront}%` }} />
              <span data-line="" data-delay="0.2" className="h-full border border-charcoal" style={{ width: `${launch.buy.heldBack}%` }} />
            </div>
            <p className="mt-3 text-ash">{launch.buy.note}</p>

            <p className="label mt-8 text-ash">
              Sizes {launch.sizes.range} · {launch.sizes.ratio.map((s) => s.share).join(":")}
            </p>
            <ul className="mt-3 flex h-24 items-end gap-2" aria-label="Size ratio">
              {launch.sizes.ratio.map((s) => (
                <li key={s.size} className="flex flex-1 flex-col items-center justify-end gap-1.5">
                  <span
                    className={cn("w-full bg-rose", s.share === maxShare && "bg-charcoal")}
                    style={{ height: `${(s.share / maxShare) * 100}%`, minHeight: "0.5rem" }}
                  />
                  <span className="label text-[0.65rem]">{s.size}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="label border-b border-charcoal/20 pb-3 text-ash">Wear it twice</h4>
            <p className="mt-4 font-serif text-6xl leading-none md:text-7xl">{launch.wearTwice.value}</p>
            <p className="mt-3 text-ash">{launch.wearTwice.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
