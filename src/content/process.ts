import type { ImageKey } from "./images";

export const journey = {
  heading: "The Design Journey",
  disclaimer:
    "A presentation of the workflow demonstrated by this project, not a claim about a separately documented professional process.",
  stages: [
    {
      title: "Research",
      text: "Trend forecasting, consumer insights, and market analysis.",
      image: "forecast-tulip",
    },
    {
      title: "Concept",
      text: "Moodboards, colour stories, inspiration, and creative direction.",
      image: "mood-wildflowers",
    },
    {
      title: "Design",
      text: "Silhouette development, fabric selection, and garment design.",
      image: "fleure-front",
    },
    {
      title: "Technical Development",
      text: "Tech packs, construction details, fit, and finishing.",
      image: "tech-front",
    },
    {
      title: "Collection & Commercialisation",
      text: "Range planning, pricing, merchandising, and launch strategy.",
      image: "look-golden-hour-full",
    },
  ] satisfies { title: string; text: string; image: ImageKey }[],
};

export const skills = {
  heading: "Skills & Expertise",
  note: "Drawn from the work shown on this page. No software, certifications or proficiency levels are claimed.",
  groups: [
    {
      title: "Fashion Research & Forecasting",
      items: ["Trend Forecasting", "Market Research", "Competitive Analysis", "Seasonal Direction"],
    },
    {
      title: "Apparel & Garment Design",
      items: ["Women's Western Wear", "Silhouette Development", "Garment Design", "Collection Development", "Print & Colour Direction"],
    },
    {
      title: "Materials & Construction",
      items: ["Fabric Selection", "Fabric Composition", "Garment Construction", "Trims & Finishing", "Technical Documentation", "Tech Pack Development"],
    },
    {
      title: "Merchandising & Strategy",
      items: ["Range Planning", "Product Pricing", "Collection Merchandising", "Commercial Strategy", "Product Development"],
    },
  ],
};
