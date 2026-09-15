import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Indian Mushroom Days 2027 | IMD 2027 & Shroom Connect | New Delhi, India",
  description:
    "Indian Mushroom Days 2027 (IMD 2027) & Shroom Connect B2B Conclave. Join the premier international edible mushroom expo on 19-20-21 February 2027 in New Delhi, India.",
  keywords: [
    "Indian Mushroom Days 2027",
    "IMD 2027",
    "Shroom Connect 2027",
    "India Mushroom Days",
    "Mushroom Exhibition India",
    "Edible Mushroom Expo",
    "New Delhi Mushroom Days",
    "Agriculture Summit India",
    "New Delhi, India",
  ],
  authors: [{ name: "Indian Mushroom Days" }],
  icons: {
    icon: [
      { url: "/reallogo.png" },
      { url: "/reallogo.png", type: "image/png" },
    ],
    shortcut: "/reallogo.png",
    apple: "/reallogo.png",
  },
  openGraph: {
    title: "Indian Mushroom Days 2027 | IMD 2027 & Shroom Connect | New Delhi, India",
    description:
      "Indian Mushroom Days 2027 (IMD 2027) & Shroom Connect B2B Conclave. Join the premier international edible mushroom expo on 19-20-21 February 2027 in New Delhi, India.",
    url: "https://indianmushroomdays.com",
    siteName: "Indian Mushroom Days 2027",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/reallogo.png" type="image/png" sizes="any" />
      </head>
      <body
        className={`${plusJakartaSans.variable} ${playfairDisplay.variable} font-sans antialiased text-[#151c17] bg-[#faf9f5] min-h-screen flex flex-col selection:bg-[#f28822] selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
