import type { ImageKey } from "./images";

/** Pages 27–29: range & pricing, buying & launch, product development. */

export type Tier = "Core" | "Fashion" | "Statement";

export interface PriceItem {
  id: string;
  label: string;
  mrp: number;
  tier: Tier;
  image: ImageKey;
}

export const priceItems: PriceItem[] = [
  { id: "pearl", label: "Pearl Shorts", mrp: 2490, tier: "Core", image: "pearl-illustration" },
  { id: "solara", label: "Solara Top", mrp: 2490, tier: "Core", image: "solara-illustration" },
  { id: "rose", label: "Rosé Élise Shirt", mrp: 2990, tier: "Core", image: "rose-illustration" },
  { id: "ivory", label: "Ivory Muse Jeans", mrp: 3490, tier: "Core", image: "ivory-illustration" },
  { id: "celeste-top", label: "Celeste Top", mrp: 2990, tier: "Fashion", image: "celeste-top-illustration" },
  { id: "celeste-skirt", label: "Celeste Skirt", mrp: 3490, tier: "Fashion", image: "celeste-skirt-illustration" },
  { id: "solene", label: "Solène Mini", mrp: 4490, tier: "Fashion", image: "solene-illustration" },
  { id: "fleure", label: "Fleuré Midi", mrp: 4990, tier: "Statement", image: "fleure-illustration" },
  { id: "solea", label: "Soléa Sequin", mrp: 5490, tier: "Statement", image: "solea-illustration" },
];

export const tiers: { tier: Tier; units: number; tint: string }[] = [
  { tier: "Core", units: 45, tint: "bg-[#EFEBE3]" },
  { tier: "Fashion", units: 35, tint: "bg-blush" },
  { tier: "Statement", units: 20, tint: "bg-butter/60" },
];

export const pricing = {
  tagline: "9 pieces. 6 looks. Priced to sell at full price.",
  kpis: [
    { value: 23, prefix: "", suffix: "%", label: "Max product cost as share of MRP" },
    { value: 2490, prefix: "₹", suffix: "", label: "Entry price, in the 5% GST slab" },
    { value: 6480, prefix: "₹", suffix: "", label: "Celeste set, sold as separates" },
  ],
};

export const calendar = [
  { month: "February", occasion: "Valentine's & weddings", pieces: ["Soléa", "Fleuré", "Celeste"], images: ["solea-illustration", "fleure-illustration", "celeste-illustration"] },
  { month: "March – April", occasion: "Brunches & birthdays", pieces: ["Solène", "Solara", "Pearl"], images: ["solene-illustration", "solara-illustration", "pearl-illustration"] },
  { month: "May", occasion: "Holidays & workwear", pieces: ["Rosé Élise", "Ivory Muse + new colours"], images: ["rose-illustration", "ivory-illustration"] },
  { month: "June – July", occasion: "End-of-season sale", pieces: ["Shirt + jeans carry into AW27"], images: ["rose-illustration", "ivory-illustration"] },
] satisfies { month: string; occasion: string; pieces: string[]; images: ImageKey[] }[];

export const launch = {
  tagline: "Right product, right store, right month.",
  stores: [
    { store: "Metro malls + online", range: "Full range, all 9 pieces" },
    { store: "Tier-I stores", range: "Core + fashion" },
    { store: "Tier-II stores", range: "Core + Solène + Fleuré" },
  ],
  buy: { upfront: 65, heldBack: 35, note: "Upfront / held back to re-order bestsellers" },
  sizes: { range: "XS–XXL", ratio: [
    { size: "XS", share: 1 },
    { size: "S", share: 2 },
    { size: "M", share: 3 },
    { size: "L", share: 3 },
    { size: "XL", share: 2 },
    { size: "XXL", share: 1 },
  ] },
  wearTwice: { value: "12+", text: "Outfits from 9 pieces, styled with KAZO bags & jewellery" },
};

export const development = {
  pillars: [
    { title: "Smart sourcing", text: "Standardise certain trims and RMs across products", icon: "package" },
    { title: "Shared pattern", text: "Standardise fits and adapt in different fabrics", icon: "layers" },
    { title: "Cost control", text: "Create marker for patterns to get the best fabric consumptions", icon: "scissors" },
    { title: "Built for heat", text: "Breathable linings, Indian fit", icon: "sun" },
    { title: "40%+ better fibres", text: "Recycled poly, lyocell and 100% cotton", icon: "leaf" },
    { title: "Tracked weekly", text: "Sell-through, margin, items per bill, returns", icon: "chart" },
  ] as const,
  timeline: [
    { weeks: 24, label: "Design freeze" },
    { weeks: 16, label: "Fit + cost sign-off" },
    { weeks: 14, label: "Fabric booked" },
    { weeks: 10, label: "Pre-production + lab tests" },
    { weeks: 0, label: "In store" },
  ],
};
