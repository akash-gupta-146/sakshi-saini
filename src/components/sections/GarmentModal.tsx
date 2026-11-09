import { useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { garments, type Garment } from "../../content/garments";
import { priceItems } from "../../content/commercial";
import { formatINR, pad2 } from "../../lib/format";
import { cn } from "../../lib/cn";
import { Img } from "../ui/Img";
import { ModalDialog } from "../ui/ModalDialog";

interface GarmentModalProps {
  /** null = closed */
  index: number | null;
  onChange: (index: number | null) => void;
}

const SPEC_ROWS = [
  ["Fabric", "fabric"],
  ["Lining", "lining"],
  ["Silhouette", "silhouette"],
  ["Construction", "construction"],
  ["Trims & finishing", "trims"],
] as const;

/** Close control. Rendered twice: pinned top-right on small screens (the spec column is far below the photo), inline on desktop. */
function CloseButton({ onClose, className }: { onClose: () => void; className: string }) {
  return (
    <button
      type="button"
      autoFocus
      onClick={onClose}
      className={cn(
        "label flex items-center gap-2 rounded-full border border-charcoal/30 px-4 py-2 transition-colors hover:bg-charcoal hover:text-ivory",
        className,
      )}
    >
      Close <X size={14} aria-hidden="true" />
    </button>
  );
}

/** Subsection C: the full specification for one garment, with every available view. */
function GarmentDetail({ garment, position, total, onPrev, onNext, onClose }: {
  garment: Garment;
  position: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}) {
  const [viewIndex, setViewIndex] = useState(0);
  const view = garment.views[viewIndex];
  const prices = garment.priceIds.map((id) => priceItems.find((p) => p.id === id)).filter((p) => p !== undefined);

  return (
    <div
      className="grid min-h-full lg:grid-cols-[1.15fr_1fr]"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") onNext();
        if (e.key === "ArrowLeft") onPrev();
      }}
    >
      <CloseButton onClose={onClose} className="fixed top-3 right-3 z-30 bg-ivory lg:hidden" />
      <div className="flex flex-col gap-4 bg-[#EEE8DF] p-4 md:p-8 lg:sticky lg:top-0 lg:h-dvh">
        <div className="min-h-0 flex-1">
          <Img
            key={view.image}
            name={view.image}
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="h-[62dvh] w-full object-contain mix-blend-multiply lg:h-full"
          />
        </div>
        <ul className="flex gap-2 overflow-x-auto pb-1 md:gap-3" aria-label="Garment views">
          {garment.views.map((v, i) => (
            <li key={v.label} className="shrink-0">
              <button
                type="button"
                aria-pressed={i === viewIndex}
                aria-label={`Show ${v.label}`}
                onClick={() => setViewIndex(i)}
                className={cn("block w-16 border-2 bg-ivory transition-opacity md:w-20", i === viewIndex ? "border-charcoal" : "border-transparent opacity-65 hover:opacity-100")}
              >
                <Img name={v.image} sizes="80px" alt="" className="aspect-[3/4] w-full object-cover object-top" />
                <span className="label block py-1 text-center text-[0.58rem] tracking-[0.08em]">{v.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="px-6 pt-6 pb-12 md:px-12 lg:pt-8">
        <div className="flex items-center justify-between">
          <p className="label text-ash">
            Modern Romance · SS27 · {pad2(position + 1)} / {pad2(total)}
          </p>
          <CloseButton onClose={onClose} className="hidden lg:flex" />
        </div>

        <h2 className="display mt-14 text-[clamp(2.6rem,5vw,4.5rem)]">{garment.name}</h2>

        <dl className="mt-10 divide-y divide-charcoal/15 border-y border-charcoal/15">
          {SPEC_ROWS.map(([label, key]) => {
            const value = (garment.spec as Record<string, string | undefined>)[key];
            if (!value) {
              return key === "construction" && garment.note ? (
                <div key={key} className="grid gap-1 py-4 md:grid-cols-[9rem_1fr] md:gap-6">
                  <dt className="label pt-1 text-ash">{label}</dt>
                  <dd className="text-ash italic">Not separately documented in the source.</dd>
                </div>
              ) : null;
            }
            return (
              <div key={key} className="grid gap-1 py-4 md:grid-cols-[9rem_1fr] md:gap-6">
                <dt className="label pt-1 text-ash">{label}</dt>
                <dd className="text-lg leading-snug">{value}</dd>
              </div>
            );
          })}
          <div className="grid gap-1 py-4 md:grid-cols-[9rem_1fr] md:gap-6">
            <dt className="label pt-1 text-ash">MRP</dt>
            <dd className="text-lg">
              {prices.map((p) => (
                <span key={p.id} className="mr-5 inline-block">
                  {formatINR(p.mrp)} <span className="label text-ash">{prices.length > 1 ? p.label : p.tier}</span>
                </span>
              ))}
            </dd>
          </div>
        </dl>

        {garment.note ? <p className="mt-6 text-sm text-ash">{garment.note}</p> : null}
        <p className="mt-6 text-xs text-warm-grey">DTM: dyed to match · AOP: all-over print</p>

        <div className="mt-12 flex items-center justify-between gap-4 border-t border-charcoal/15 pt-6">
          <button type="button" onClick={onPrev} className="label flex items-center gap-3 py-2 transition-transform hover:-translate-x-1">
            <ArrowLeft size={16} aria-hidden="true" /> Previous
          </button>
          <button type="button" onClick={onNext} className="label flex items-center gap-3 py-2 transition-transform hover:translate-x-1">
            Next <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function GarmentModal({ index, onChange }: GarmentModalProps) {
  const total = garments.length;
  const step = (delta: number) => index !== null && onChange((index + delta + total) % total);

  return (
    <ModalDialog
      open={index !== null}
      onClose={() => onChange(null)}
      label={index !== null ? `${garments[index].name}: details` : "Garment details"}
      className="overflow-y-auto"
    >
      {index !== null ? (
        <GarmentDetail
          key={garments[index].id}
          garment={garments[index]}
          position={index}
          total={total}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
          onClose={() => onChange(null)}
        />
      ) : null}
    </ModalDialog>
  );
}
