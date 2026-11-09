const inr = new Intl.NumberFormat("en-IN");

/** 2490 -> "₹2,490" (Indian digit grouping). */
export const formatINR = (amount: number) => `₹${inr.format(amount)}`;

/** Zero-pads for editorial numbering: 3 -> "03". */
export const pad2 = (n: number) => String(n).padStart(2, "0");
