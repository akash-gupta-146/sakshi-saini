import { useCallback, type KeyboardEvent } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { imageSrcSet, imageSrc, imageMeta, imageAlts, type ImageKey } from "../../content/images";
import { pad2 } from "../../lib/format";
import { ModalDialog } from "./ModalDialog";

export interface LightboxItem {
  image: ImageKey;
  caption: string;
}

interface LightboxProps {
  items: LightboxItem[];
  /** null = closed */
  index: number | null;
  onChange: (index: number | null) => void;
}

/** Full-screen image viewer with keyboard (←/→/Esc) and button navigation. */
export function Lightbox({ items, index, onChange }: LightboxProps) {
  const count = items.length;
  const go = useCallback(
    (delta: number) => onChange(index === null ? null : (index + delta + count) % count),
    [index, count, onChange],
  );

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") go(1);
    if (event.key === "ArrowLeft") go(-1);
  };

  const item = index === null ? null : items[index];

  return (
    <ModalDialog
      open={index !== null}
      onClose={() => onChange(null)}
      label="Image gallery"
      className="on-dark bg-charcoal! text-ivory!"
    >
      {item && index !== null ? (
        <div className="flex h-full flex-col" onKeyDown={onKeyDown}>
          <div className="flex items-center justify-between px-5 py-4 md:px-8">
            <p className="label text-ivory/80" aria-live="polite">
              {pad2(index + 1)} / {pad2(count)}
            </p>
            <button
              type="button"
              autoFocus
              onClick={() => onChange(null)}
              className="label flex items-center gap-2 rounded-full border border-ivory/30 px-4 py-2 transition-colors hover:bg-ivory hover:text-charcoal"
            >
              Close <X size={14} aria-hidden="true" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-20">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="absolute left-2 z-10 grid size-11 place-items-center rounded-full border border-ivory/30 transition-colors hover:bg-ivory hover:text-charcoal md:left-6"
            >
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
            <img
              key={item.image}
              src={imageSrc(item.image)}
              srcSet={imageSrcSet(item.image)}
              sizes="(min-width: 768px) 70vw, 100vw"
              width={imageMeta(item.image).w}
              height={imageMeta(item.image).h}
              alt={imageAlts[item.image]}
              className="max-h-full max-w-full object-contain"
            />
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next image"
              className="absolute right-2 z-10 grid size-11 place-items-center rounded-full border border-ivory/30 transition-colors hover:bg-ivory hover:text-charcoal md:right-6"
            >
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>

          <p className="serif-italic px-6 py-5 text-center text-xl md:text-2xl">{item.caption}</p>
        </div>
      ) : null}
    </ModalDialog>
  );
}
