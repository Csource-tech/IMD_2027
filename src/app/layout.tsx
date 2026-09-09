import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "India Mushroom Days 2027 | IMD 2027 | New Delhi, India",
  description:
    "India Mushroom Days 2027 (IMD 2027) official website. Join the premier international edible fungi expo on 19-20-21 February 2027 at Bharat Mandapam, Pragati Maidan, New Delhi, India. Explore exhibitors, register as visitor or book your booth.",
  keywords: [
    "Indian Mushroom Days 2027",
    "IMD 2027",
    "India Mushroom Days",
    "Mushroom Exhibition India",
    "Edible Fungi Expo",
    "New Delhi Mushroom Days",
    "Agriculture Summit India",
  ],
  authors: [{ name: "Indian Mushroom Days" }],
  icons: {
    icon: "/reallogo.png",
    apple: "/reallogo.png",
  },
  openGraph: {
    title: "Indian Mushroom Days 2027 | IMD 2027 | New Delhi, India",
    description:
      "Indian Mushroom Days 2027 (IMD 2027) official website. Join the premier international edible fungi expo on 19-20-21 February 2027 in New Delhi, India.",
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
      <body className="antialiased text-[#333333] bg-white min-h-screen flex flex-col selection:bg-[#f28822] selection:text-white">
        {children}
      </body>
    </html>
  );
}
