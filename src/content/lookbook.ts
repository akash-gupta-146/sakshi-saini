import type { ImageKey } from "./images";

export interface Look {
  id: string;
  name: string;
  full: ImageKey;
  detail: ImageKey;
  /** What is visibly styled in the photographs. */
  wearing: string;
}

/** Pages 17–22. Originals only: no generated or replaced imagery. */
export const looks: Look[] = [
  {
    id: "brunch-to-party",
    name: "Brunch-to-Party Look",
    full: "look-brunch-to-party-full",
    detail: "look-brunch-to-party-detail",
    wearing: "The Celeste Lace Set Co-ord",
  },
  {
    id: "golden-hour",
    name: "Golden Hour Party",
    full: "look-golden-hour-full",
    detail: "look-golden-hour-detail",
    wearing: "The Soléa Sequins Dress",
  },
  {
    id: "birthday",
    name: "Birthday Party",
    full: "look-birthday-full",
    detail: "look-birthday-detail",
    wearing: "The Fleuré Gathered Dress",
  },
  {
    id: "brunch-day-out",
    name: "Brunch Day Out",
    full: "look-brunch-day-out-full",
    detail: "look-brunch-day-out-detail",
    wearing: "The Solène Mini Dress",
  },
  {
    id: "office-to-dinner",
    name: "Office to Dinner Party",
    full: "look-office-dinner-full",
    detail: "look-office-dinner-detail",
    wearing: "The Rosé Élise Stripe Shirt with The Ivory Muse Jeans",
  },
  {
    id: "vacation-brunch",
    name: "Vacation Brunch",
    full: "look-vacation-full",
    detail: "look-vacation-detail",
    wearing: "The Solara Halter Neck Top with The Pearl Shorts",
  },
];
