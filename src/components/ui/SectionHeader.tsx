import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { SplitText } from "./SplitText";

interface SectionHeaderProps {
  kicker: string;
  title: string;
  intro?: ReactNode;
  /** `dark` sections invert type colours. */
  tone?: "light" | "dark";
  as?: "h2" | "h3";
  size?: "xl" | "lg";
  className?: string;
}

/** Kicker + animated rule + oversized serif title (+ optional intro). Used by every section. */
export function SectionHeader({
  kicker,
  title,
  intro,
  tone = "light",
  as = "h2",
  size = "xl",
  className,
}: SectionHeaderProps) {
  return (
    <header className={cn("grid gap-6 md:gap-8", className)}>
      <div className="flex items-center gap-5">
        <span className={cn("label whitespace-nowrap", tone === "dark" ? "text-ivory/75" : "text-ash")}>{kicker}</span>
        <span data-line="" className="h-px flex-1 bg-current opacity-25" aria-hidden="true" />
      </div>
      <SplitText
        as={as}
        text={title}
        className={cn(
          "display uppercase",
          size === "xl" ? "text-[clamp(2.9rem,8.5vw,8rem)]" : "text-[clamp(2.2rem,5.5vw,4.75rem)]",
        )}
      />
      {intro ? (
        <div data-reveal="" className={cn("max-w-2xl text-lg leading-relaxed", tone === "dark" ? "text-ivory/80" : "text-ash")}>
          {intro}
        </div>
      ) : null}
    </header>
  );
}
