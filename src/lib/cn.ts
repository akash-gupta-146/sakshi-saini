/** Tiny class joiner: avoids a dependency for something this small. */
export const cn = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(" ");
