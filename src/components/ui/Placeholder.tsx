import type { ReactNode } from "react";

/** Visibly marks an unverified personal detail that Sakshi should replace. */
export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <span className="placeholder-mark italic" title="Placeholder: edit in src/content/site.ts">
      {children}
    </span>
  );
}
