import type { ImageKey } from "./images";

/** Pages 2–5: SS27 Western Wear Forecast. Hex values are sampled from the PDF's own swatches. */

export const newLanguage = {
  kicker: "The New Language | SS27",
  statement:
    "SS27 moves drama into daylight. Skirts lead, lace and sheers become daywear, and silhouettes become lighter.",
  signals: [
    {
      title: "The skirt takes over",
      summary: "Skirt-led outfits, knee-length skirts, and skirt co-ords.",
      evidence: "60+ skirts at Prada; straight skirts 4.9% → 10.3% of looks",
      translation: "Build skirt-led outfits and skirt co-ords, not just dresses",
    },
    {
      title: "Drama by day",
      summary: "Lace, shine, and occasion-inspired details adapted for daytime dressing.",
      evidence: "Milan put lace, fur and shine into daytime looks",
      translation: "Brunch-to-dinner pieces fit KAZO's dressed-up heritage",
    },
    {
      title: "Lingerie influence in outerwear",
      summary: "Lined sheers, lace-edged pieces, and layering.",
      evidence: "Lace-edged slips at Fendi; trousseau lace at D&G",
      translation: "Translate as lined sheers and slip-over-tee layering",
    },
    {
      title: "Weightless shapes",
      summary: "Airy silhouettes, viscose, voile, and crepe for Indian summers.",
      evidence: "Paris: airy looks that skim the body",
      translation: "A direct answer to Indian heat: viscose, voile, crepe",
    },
    {
      title: "Butter yellow",
      summary: "A soft seasonal colour direction that evolves into a statement.",
      evidence: "SS26 butter yellow evolves as statement",
      translation: "A soft palette that flatters Indian skin tones",
    },
  ],
  directions: [
    { label: "Colour", value: "Butter, blush, chocolate, crisp white", swatches: ["#EBDB9D", "#EAC3BC", "#4D3225", "#F7F6F1"] },
    { label: "Fabric", value: "Sheer, fluid, lightly glossed" },
    { label: "Shape", value: "Knee skirts, slips, defined waists" },
    { label: "Mindset", value: "Dress up every day, not just for events" },
  ] as { label: string; value: string; swatches?: string[] }[],
  /** The one hard number in the forecast, charted. */
  chart: {
    title: "Straight skirts, share of looks",
    from: { label: "From", value: 4.9 },
    to: { label: "To", value: 10.3 },
  },
  opportunity:
    "Own day-to-dusk dressing: occasion polish, cut for Indian heat, built to be worn twice.",
  image: "forecast-tulip" as ImageKey,
};

export const worlds: {
  number: string;
  name: string;
  tagline: string;
  image: ImageKey;
  palette: string[];
  fabrics: string;
  prints: string;
  direction: string;
  kazoRole: string;
}[] = [
  {
    number: "01",
    name: "Soft Archive",
    tagline: "Femininity, re-edited for daylight.",
    image: "world-soft-archive",
    palette: ["#F1EADA", "#EED9A2", "#E9C4BC", "#E2B0BC", "#AAB096", "#C48A86"],
    fabrics: "Viscose, voile, cotton, lace",
    prints: "Faded florals, shadow lace",
    direction: "Lace dresses, halter-neck blouses, schiffli skirts, co-ords, tiered dresses",
    kazoRole: "Brunch to dinner and day-occasion volume",
  },
  {
    number: "02",
    name: "Sharp Ease",
    tagline: "Polish without the stiffness.",
    image: "world-sharp-ease",
    palette: ["#F7F6F2", "#D8C8A7", "#A89584", "#493326", "#9FB3CC", "#3D3E42"],
    fabrics: "Linen blend, poplin, light twill",
    prints: "Pinstripe, micro-check, dobby",
    direction: "Knee pencil skirts, elongated shirts, pleated wide trousers, vest co-ords, belted shirt dresses",
    kazoRole: "Office and repeat-wear anchor",
  },
  {
    number: "03",
    name: "Afterglow",
    tagline: "Glamour that's playful and confident.",
    image: "world-afterglow",
    palette: ["#141213", "#9E1A25", "#3A231B", "#315BD4", "#D94080", "#B9954B"],
    fabrics: "Satin-back crepe, mesh, jersey",
    prints: "Leopard jacquard, foil, strass",
    direction: "Bias slip dresses, cowl satin tops, mesh-panel bodycon, leopard skirts, one-shoulder midi dresses",
    kazoRole: "Core partywear, made new",
  },
];

export const brands = [
  {
    name: "Vero Moda",
    position: "Danish, est. 1987; feminine smart-casual",
    strength: "Dresses as ready outfits; everyday to office",
    example: "Print bishop-sleeve A-line dress, MRP ₹3,499",
    overlap: "Clashes on everyday + office dresses",
  },
  {
    name: "Forever New",
    position: "Melbourne-founded; premium feminine occasion",
    strength: "Cocktail midis, florals, satin, lace",
    example: "Lapel-collar midi wrap dress; lace shirt",
    overlap: 'Clashes on occasion florals; owns "polished"',
  },
  {
    name: "Madame",
    position: "Indian; trend-led, accessible western wear",
    strength: "Casual dresses, tops, trousers",
    example: "Textured flared dress, MRP ₹5,499",
    overlap: "Clashes on price-led casual dresses",
  },
  {
    name: "KAZO",
    position: 'Delhi, 2007; "dressed up occasions", affordable',
    strength: "Partywear, co-ords, bags, fragrance",
    example: "'Flower Power' floral dresses + sets",
    overlap: "Known for party; weaker day identity",
    highlight: true,
  },
] as const;

export const positioning = {
  alreadyOffered: "Everyday dresses, polished occasion florals, casual separates",
  underServed: "Skirt-led outfits; day-to-dusk pieces built for heat",
  advantage: "Dressed up, built for heat.",
};

export const kazoDirection = {
  headline: "The KAZO SS27 Opportunity",
  subhead: "Own the difference",
  body: "A collection that starts at brunch and ends after dark. Knee-length skirts, lined lace and fluid crepes in butter, and pink cut for Indian summers and styled to be worn twice.",
  statement: "Dress up the daylight.",
  dna: ["The day-to-night switch", "Lined transparency", "The knee-length skirt", "Butter yellow signature"],
  priorities: ["Dresses", "Skirts + skirt co-ords", "Tops + blouses", "Party separates", "Shorts", "Denim"],
  colour: [
    { tier: "Core", names: "White, sand, chocolate, black", swatches: ["#F7F6F1", "#DBC7A6", "#4D3225", "#000000"] },
    { tier: "Seasonal", names: "Butter, blush, cool blue", swatches: ["#EBDB9D", "#EAC3BC", "#9CB4D0"] },
    { tier: "Statement", names: "Crimson, electric blue, pink", swatches: ["#9E1A2A", "#2E5BD6", "#D64280"] },
  ],
  print: "Shadow florals, blooming florals, stripes",
  fabric: "Viscose crepe, linen blends, satin-back crepe, voile, lace trims",
  differentiation: [
    { versus: "Vero Moda", edge: "More occasion finish" },
    { versus: "Forever New", edge: "More heat-ready, more re-wearable" },
    { versus: "Madame", edge: "A clearer design signature" },
  ],
};
