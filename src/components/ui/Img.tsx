import type { ImgHTMLAttributes } from "react";
import { imageAlts, imageMeta, imageSrc, imageSrcSet, type ImageKey } from "../../content/images";

interface ImgProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "alt" | "name"> {
  name: ImageKey;
  /** Overrides the default description from content/images.ts */
  alt?: string;
  /** Purely decorative: empty alt and hidden from assistive tech. */
  decorative?: boolean;
  /** Above-the-fold images load eagerly with high priority. */
  priority?: boolean;
  sizes?: string;
}

/**
 * Responsive, lazy-loaded image backed by the generated manifest.
 * Intrinsic width/height are always set so layout never shifts while loading.
 */
export function Img({ name, alt, decorative, priority, sizes = "100vw", ...rest }: ImgProps) {
  const { w, h } = imageMeta(name);
  return (
    <img
      src={imageSrc(name, 960)}
      srcSet={imageSrcSet(name)}
      sizes={sizes}
      width={w}
      height={h}
      alt={decorative ? "" : (alt ?? imageAlts[name])}
      aria-hidden={decorative || undefined}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      {...rest}
    />
  );
}
