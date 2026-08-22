import faqs from "./knowledge/faqs.json";

export type FaqItem = {
  question: string;
  answer: string;
  showOnPage: boolean;
};

export const faqItems = faqs as FaqItem[];
export const pageFaqs = faqItems.filter((item) => item.showOnPage);
