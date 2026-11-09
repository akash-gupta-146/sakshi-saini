/** Pages 24–25: KAZO tech pack for the Solène mini dress. Only what is visible on the sheets. */

export const techpack = {
  heading: "From Concept to Construction",
  intro:
    "Thoughtful design extends beyond aesthetics. Technical documentation translates creative intent into clear garment construction details.",
  header: [
    { label: "Style code", value: "KZ-SS27-001" },
    { label: "Category", value: "Women's Western Wear" },
    { label: "Description", value: "Mini dress" },
    { label: "Fit type", value: "Fitted on top and A-line below waist" },
    { label: "Fabric", value: "Lace (39% polyamide, 32% cotton, 29% viscose); lining (97% polyester, 3% elastane)" },
  ],
  strip: [
    { image: "tech-front", label: "Technical front" },
    { image: "tech-back", label: "Technical back" },
    { image: "tech-model", label: "On-model reference" },
  ] as const,
  /** Callouts transcribed from the construction sheet (wording kept as drawn). */
  callouts: {
    front: [
      "3.5 cm wide strap at shoulder",
      "2.5 cm wide strap",
      "Square neckline with lace scalp edges",
      "Princess line seam till waist",
      "Underbust seam",
      "Fitted bodice till waist",
      "Waist seam",
      "Both side darts",
      "All over lace fabric body",
      "A-line",
      "Mini dress standard full length",
    ],
    back: ["DTM conceal zipper", "Princess line seam till waist", "Both side darts"],
  },
  highlights: [
    "Shoulder strap widths",
    "Neckline construction",
    "Centre-back zipper",
    "Princess seam details",
    "Waist seam",
    "Under-bust seam",
    "Side darts",
    "A-line silhouette",
    "Hem length",
  ],
  /**
   * Viewer shortcuts on the construction sheet. x/y are fractions of the image,
   * pointing at the areas the callouts annotate.
   */
  focusPoints: [
    { label: "Straps & neckline", x: 0.34, y: 0.4, zoom: 2.4 },
    { label: "Seams, waist & darts", x: 0.34, y: 0.53, zoom: 2.4 },
    { label: "A-line & hem", x: 0.34, y: 0.72, zoom: 2.2 },
    { label: "Back zipper", x: 0.76, y: 0.52, zoom: 2.4 },
  ],
} as const;
