import type { ImageKey } from "./images";

export interface GarmentView {
  label: string;
  image: ImageKey;
}

export interface Garment {
  id: string;
  name: string;
  /** Tile image (model photograph) and the hover reveal (garment illustration). */
  cover: ImageKey;
  illustration: ImageKey;
  views: GarmentView[];
  spec: {
    fabric: string;
    lining?: string;
    silhouette: string;
    construction?: string;
    trims: string;
  };
  /** Ids into commercial.priceItems */
  priceIds: string[];
  /** Shown when the PDF does not document a field separately. */
  note?: string;
}

const modelViews = (prefix: string): GarmentView[] => [
  { label: "Front", image: `${prefix}-front` as ImageKey },
  { label: "Back", image: `${prefix}-back` as ImageKey },
  { label: "Side", image: `${prefix}-side` as ImageKey },
];

/** Product names and specifications are verbatim from pages 7–15 of the PDF. */
export const garments: Garment[] = [
  {
    id: "celeste-set",
    name: "The Celeste Lace Set Co-ord",
    cover: "celeste-front",
    illustration: "celeste-illustration",
    views: [{ label: "Illustration", image: "celeste-illustration" }, ...modelViews("celeste")],
    spec: {
      fabric: "100% cotton cutwork all-over schiffli",
      silhouette: "Round-neck short-sleeve crop top with fitted midi skirt",
      construction: "Schiffli upper body with DTM voile lining",
      trims: "DTM back zipper for both top and skirt",
    },
    priceIds: ["celeste-top", "celeste-skirt"],
  },
  {
    id: "solea",
    name: "The Soléa Sequins Dress",
    cover: "solea-front",
    illustration: "solea-illustration",
    views: [{ label: "Illustration", image: "solea-illustration" }, ...modelViews("solea")],
    spec: {
      fabric: "Lightweight scuba, 96% polyester and 4% elastane",
      lining: "92% polyester and 8% elastane",
      silhouette: "V-neck sleeveless mini dress",
      construction: "All-over DTM sequin embellishment with lining",
      trims: "DTM back zipper",
    },
    priceIds: ["solea"],
  },
  {
    id: "fleure",
    name: "The Fleuré Gathered Dress",
    cover: "fleure-front",
    illustration: "fleure-illustration",
    views: [{ label: "Illustration", image: "fleure-illustration" }, ...modelViews("fleure")],
    spec: {
      fabric: "AOP Lyocell with viscose lining",
      silhouette: "Feminine capped sleeves, V-neckline, flowing tiered midi hem",
      construction: "AOP chiffon body with DTM viscose lining",
      trims: "DTM fabric waist belt and centre-back zipper closure",
    },
    priceIds: ["fleure"],
  },
  {
    id: "solene",
    name: "The Solène Mini Dress",
    cover: "solene-front",
    illustration: "solene-illustration",
    views: [{ label: "Illustration", image: "solene-illustration" }, ...modelViews("solene")],
    spec: {
      fabric: "All-over lace (39% polyamide, 32% cotton, 29% viscose)",
      lining: "97% polyester, 3% elastane",
      silhouette: "Square neckline with modern A-line body",
      construction: "All-over lace body with DTM lining",
      trims: "DTM back zipper",
    },
    priceIds: ["solene"],
  },
  {
    id: "rose-elise",
    name: "The Rosé Élise Stripe Shirt",
    cover: "rose-front",
    illustration: "rose-illustration",
    views: [{ label: "Illustration", image: "rose-illustration" }, ...modelViews("rose")],
    spec: {
      fabric: "100% cotton yarn-dyed stripes",
      silhouette: "Modern wrap-front shirt",
      construction: "Fold-down collar, long sleeves, barrel cuffs, two-button placket, and back-waist tie",
      trims: "DTM buttons",
    },
    priceIds: ["rose"],
  },
  {
    id: "ivory-muse",
    name: "The Ivory Muse Jeans",
    cover: "ivory-front",
    illustration: "ivory-illustration",
    views: [{ label: "Illustration", image: "ivory-illustration" }, ...modelViews("ivory")],
    spec: {
      fabric: "67% cotton, 32% polyester, 1% elastane",
      silhouette: "Medium-rise slim wide-leg jeans",
      construction: "Stretch denim, open hand pockets at sides, coin pocket at right, and rear patch pockets",
      trims: "Metal button and zipper",
    },
    priceIds: ["ivory"],
  },
  {
    id: "solara",
    name: "The Solara Halter Neck Top",
    cover: "solara-front",
    illustration: "solara-illustration",
    views: [{ label: "Illustration", image: "solara-illustration" }, ...modelViews("solara")],
    spec: {
      fabric: "85% lyocell, 15% nylon",
      lining: "100% cotton",
      silhouette: "Halter-neck top",
      construction: "Softly scooped neckline, princess seams, adjustable back-neck tie",
      trims: "Back-neck button closure and centre-back zipper",
    },
    priceIds: ["solara"],
  },
  {
    id: "pearl",
    name: "The Pearl Shorts",
    cover: "pearl-front",
    illustration: "pearl-illustration",
    views: [{ label: "Illustration", image: "pearl-illustration" }, ...modelViews("pearl")],
    spec: {
      fabric: "75% recycled polyester, 19% viscose, 6% elastane",
      lining: "100% viscose",
      silhouette: "Tailored high-rise shorts",
      construction: "Functional side pockets and waist darts",
      trims: "Zipper and internal metal closure",
    },
    priceIds: ["pearl"],
  },
  {
    id: "celeste-skirt",
    name: "Celeste Schiffli Midi Skirt",
    cover: "celeste-back",
    illustration: "celeste-skirt-illustration",
    views: [
      { label: "Illustration", image: "celeste-skirt-illustration" },
      { label: "Set · Front", image: "celeste-front" },
      { label: "Set · Back", image: "celeste-back" },
      { label: "Set · Side", image: "celeste-side" },
    ],
    spec: {
      fabric: "100% cotton cutwork all-over schiffli (specified with the Celeste set)",
      silhouette: "Fitted midi skirt",
      trims: "DTM back zipper (specified for both top and skirt)",
    },
    priceIds: ["celeste-skirt"],
    note: "The source PDF documents the skirt together with the Celeste top. Model photographs show the full set; no separate skirt construction notes are given.",
  },
];

export const featuredProject = {
  title: "Modern Romance",
  season: "Spring Summer 2027",
  intro:
    "Modern Romance celebrates feminine dressing through delicate lace, soft florals, romantic silhouettes, and the warmth of summer. A palette of blush pink, butter yellow, soft ivory, and warm neutrals brings together effortless everyday elegance and modern occasion dressing.",
  facts: [
    { label: "Collection", value: "Modern Romance" },
    { label: "Season", value: "Spring/Summer 2027" },
    { label: "Category", value: "Women's Western Wear" },
    { label: "Brand direction", value: "KAZO" },
    { label: "Collection size", value: "9 pieces" },
    { label: "Styling direction", value: "Modern romantic dressing" },
  ],
  disclaimer: "A portfolio project developed with KAZO as the brand direction.",
} as const;

export const moodboard = {
  /** Page 6 palette, sampled from the PDF. */
  palette: [
    { name: "Soft ivory", hex: "#F8F6E9" },
    { name: "Warm neutral", hex: "#E8E4D9" },
    { name: "Blush", hex: "#FAE7D9" },
    { name: "Butter yellow", hex: "#F3E8B2" },
    { name: "Rose pink", hex: "#F9CEE1" },
  ],
  items: [
    { image: "mood-floral-sundress", tag: "Feminine styling references" },
    { image: "mood-lace-crop", tag: "Delicate lace & cutwork" },
    { image: "mood-wildflowers", tag: "Romantic silhouettes" },
    { image: "mood-bouquet", tag: "Floral inspiration" },
    { image: "mood-ranunculus", tag: "Soft florals" },
    { image: "mood-yellow-tulle", tag: "Butter yellow" },
  ] satisfies { image: ImageKey; tag: string }[],
};
