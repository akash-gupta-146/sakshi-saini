import type { ReactNode } from "react";
import { imageRatio, type ImageKey } from "../../content/images";
import { cn } from "../../lib/cn";
import { Img } from "./Img";

interface FrameProps {
  name: ImageKey;
  alt?: string;
  decorative?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** "natural" keeps the photograph's own proportions (nothing is cropped). */
  ratio?: "natural" | number;
  /** Clip-path reveal on scroll (see useReveals). */
  mask?: boolean;
  /** Scrubbed parallax drift, e.g. 0.07. Crops ~8% top/bottom to make room. */
  parallax?: number;
  /** Slow zoom when a parent `.group` is hovered/focused. */
  zoom?: boolean;
  /** object-position for cropped frames, e.g. "50% 20%". */
  position?: string;
  fit?: "cover" | "contain";
  children?: ReactNode;
}

/**
 * The one image container used across the site: handles aspect ratio, mask reveal,
 * parallax and hover zoom, so sections never re-implement them.
 */
export function Frame({
  name,
  alt,
  decorative,
  sizes,
  priority,
  className,
  ratio,
  mask,
  parallax,
  zoom = true,
  position,
  fit = "cover",
  children,
}: FrameProps) {
  const aspectRatio = ratio === "natural" ? imageRatio(name) : ratio;
  return (
    <div
      data-mask={mask ? "" : undefined}
      className={cn("group relative overflow-hidden", className)}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <div
        data-mask-inner={mask ? "" : undefined}
        data-parallax={parallax}
        className={cn("absolute", parallax ? "inset-x-0 -top-[8%] h-[116%]" : "inset-0")}
      >
        <div
          className={cn(
            "h-full w-full",
            zoom && "transition-transform duration-[1400ms] ease-out group-hover:scale-[1.045] group-focus-visible:scale-[1.045]",
          )}
        >
          <Img
            name={name}
            alt={alt}
            decorative={decorative}
            sizes={sizes}
            priority={priority}
            className={cn("h-full w-full", fit === "cover" ? "object-cover" : "object-contain")}
            style={position ? { objectPosition: position } : undefined}
          />
        </div>
      </div>
      {children}
    </div>
  );
}
