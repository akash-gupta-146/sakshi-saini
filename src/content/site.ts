/**
 * Site-wide copy and personal details.
 *
 * VERIFIED  = comes from Sakshi's PDF.
 * ILLUSTRATIVE = suggested portfolio copy supplied in the design brief (not verified history).
 * PLACEHOLDER = empty string -> the UI renders a clearly marked "add me" placeholder.
 */
export const site = {
  name: "Sakshi Saini",
  title: "Apparel Designer",
  descriptor: "Apparel Designer · Fashion & Collection Development",
  tagline: "Where creativity meets craftsmanship.",
  heroLine: "Designing stories through fabric, form & detail.",
  supporting:
    "Creating thoughtful collections through trend research, material exploration, and contemporary design.",
  footerQuote: "Designed with intention. Created with passion.",
} as const;

export const nav = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "portfolio", label: "Portfolio" },
  { id: "collections", label: "Collections" },
  { id: "process", label: "Process" },
  { id: "contact", label: "Contact" },
] as const;

export const about = {
  heading: "The Designer",
  paragraphs: [
    "I approach apparel design as a balance between creativity, functionality, and thoughtful craftsmanship. From researching emerging fashion trends to translating concepts into wearable collections, my design process explores the relationship between silhouettes, colours, fabrics, and construction.",
    "My work brings together contemporary aesthetics, attention to detail, and an understanding of how a collection evolves from an initial concept into a finished garment.",
  ],
  highlights: [
    {
      title: "Trend & Research",
      text: "Understanding fashion movements, consumer preferences, and seasonal directions.",
    },
    {
      title: "Collection Development",
      text: "Translating creative concepts into cohesive, wearable collections.",
    },
    {
      title: "Technical Design",
      text: "Developing garment specifications, construction details, and technical documentation.",
    },
  ],
  /** Facts verifiable from the PDF. Add real details to the placeholder rows. */
  facts: [
    { label: "Discipline", value: "Women's Western Wear", verified: true },
    { label: "Featured project", value: "Modern Romance · SS27", verified: true },
    { label: "Based in", value: "", placeholder: "Add your city", verified: false },
    { label: "Education", value: "", placeholder: "Add your qualification", verified: false },
  ],
  disclaimer:
    "Biography is suggested portfolio copy. Replace it, and the placeholder details, with your own story.",
} as const;

/** Leave empty until real details exist; the UI will show a labelled placeholder. */
export const contact = {
  email: "",
  linkedin: "",
  instagram: "",
  portfolioPdf: "",
  headline: "Let’s create something beautiful.",
  text: "Have a project, collaboration, or creative opportunity in mind? I’d love to hear from you.",
  formNotice:
    "Frontend demonstration: this form does not send messages yet. Connect a form backend to go live.",
} as const;
