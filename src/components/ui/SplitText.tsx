import { createElement } from "react";
import { cn } from "../../lib/cn";

interface SplitTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  delay?: number;
}

/**
 * Headline whose words rise out of a mask when scrolled into view (see useReveals).
 * Assistive tech reads one clean string; the animated words are aria-hidden.
 */
export function SplitText({ text, as = "h2", className, delay }: SplitTextProps) {
  const words = text.split(" ");
  return createElement(
    as,
    { className: cn(className), "data-split": "", "data-delay": delay },
    <span className="sr-only">{text}</span>,
    <span aria-hidden="true">
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span className="split-word">
            <span className="split-inner">{word}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>,
  );
}
