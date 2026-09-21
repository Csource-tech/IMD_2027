export interface HeroImage {
  id: string;
  url: string;
  publicId?: string;
  caption?: string;
  active: boolean;
  order: number;
}

export interface HeroCmsData {
  kicker: string;
  titlePart1: string;
  titlePart2: string;
  shroomConnect: string;
  subtitlePart1: string;
  subtitlePart2: string;
  visitorBtnText: string;
  boothBtnText: string;
  images: HeroImage[];
  updatedAt?: string;
}

export const DEFAULT_CAROUSEL_IMAGES: string[] = [
  "/carousel/3U3A5155.JPG",
  "/carousel/3U3A5379.JPG",
  "/carousel/3U3A6154.JPG",
  "/carousel/3U3A5002.JPG",
  "/carousel/3U3A5077.JPG",
  "/carousel/3U3A5264.JPG",
  "/carousel/3U3A5523.JPG",
  "/carousel/image1.jpeg",
  "/carousel/image2.jpeg",
  "/carousel/image3.jpeg",
  "/carousel/image4.jpeg",
  "/carousel/image5.jpeg",
  "/carousel/image6.jpeg",
  "/carousel/a2.jpeg",
  "/carousel/b8.jpeg",
  "/carousel/b15.jpeg",
];

export const DEFAULT_HERO_DATA: HeroCmsData = {
  kicker: "Asia's Premier Edible & Medicinal Mushroom Summit",
  titlePart1: "India Mushroom Days",
  titlePart2: "2027",
  shroomConnect: "Shroom Connect",
  subtitlePart1: "19–20–21 February 2027 • New Delhi, India",
  subtitlePart2: "The Global Conclave for Cultivators, Agribusiness Leaders & Institutional Buyers",
  visitorBtnText: "Register as Visitor",
  boothBtnText: "Book Exhibition Space",
  images: DEFAULT_CAROUSEL_IMAGES.map((url, idx) => ({
    id: `default-${idx + 1}`,
    url,
    caption: `India Mushroom Days Showcase ${idx + 1}`,
    active: true,
    order: idx,
  })),
  updatedAt: new Date().toISOString(),
};
