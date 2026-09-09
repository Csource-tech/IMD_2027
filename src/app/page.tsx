import Navbar from "@/components/Navbar";
import HeroVideo from "@/components/HeroVideo";
import CountdownTimer from "@/components/CountdownTimer";
import SloganBanner from "@/components/SloganBanner";
import AboutEvent from "@/components/AboutEvent";
import WhyJoinSection from "@/components/WhyJoinSection";
import OurStrength from "@/components/OurStrength";
import FullIndustryChain from "@/components/FullIndustryChain";
import TestimonialsSection from "@/components/TestimonialsSection";
import GallerySection from "@/components/GallerySection";
import ExhibitorsSection from "@/components/ExhibitorsSection";
import BuyerClubSection from "@/components/BuyerClubSection";
import RegisterSection from "@/components/RegisterSection";
import FooterSection from "@/components/FooterSection";
import FloatingChat from "@/components/FloatingChat";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-white relative">
      {/* 1. Transparent-to-Solid Sticky Navigation Bar */}
      <Navbar />

      {/* 2. Hero Video with Left-Aligned Title and Subtitle */}
      <HeroVideo />

      {/* 3. FlipDown Countdown Timer */}
      <CountdownTimer />

      {/* 4. Slogan Banner Bar */}
      <SloganBanner />

      {/* 5. About The Event */}
      <AboutEvent />

      {/* 6. Why Indian Mushroom Days (Interactive Tabs) */}
      <WhyJoinSection />

      {/* 7. Our Strength (Metrics Counter) */}
      <OurStrength />

      {/* 8. Full Industry Chain Coverage (Zig-zag) */}
      <FullIndustryChain />

      {/* 9. Our Highlights / Testimonials Carousel */}
      <TestimonialsSection />

      {/* 10. Photo Gallery */}
      <GallerySection />

      {/* 11. Part of Exhibitors (Continuous Logo Marquee) */}
      <ExhibitorsSection />

      {/* 12. Buyer Club Program Banner */}
      <BuyerClubSection />

      {/* 13. Pre-Registration Form */}
      <RegisterSection />

      {/* 14. Footer with CFNA Details & Contacts */}
      <FooterSection />

      {/* 15. Floating Live Chat Widget */}
      <FloatingChat />
    </main>
  );
}
