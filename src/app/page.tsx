import Navbar from "@/components/Navbar";
import HeroVideo from "@/components/HeroVideo";
import CountdownTimer from "@/components/CountdownTimer";
import SloganBanner from "@/components/SloganBanner";
import AboutEvent from "@/components/AboutEvent";
import OrganisingCommittee from "@/components/OrganisingCommittee";
import ScheduleSection from "@/components/ScheduleSection";
import WhyJoinSection from "@/components/WhyJoinSection";
import OurStrength from "@/components/OurStrength";
import PastSponsorsSection from "@/components/PastSponsorsSection";
import FullIndustryChain from "@/components/FullIndustryChain";
import TestimonialsSection from "@/components/TestimonialsSection";
import GallerySection from "@/components/GallerySection";
import ExhibitorsSection from "@/components/ExhibitorsSection";
import BuyerClubSection from "@/components/BuyerClubSection";
import RegisterSection from "@/components/RegisterSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-white relative">
      {/* 1. Transparent-to-Solid Sticky Navigation Bar */}
      <Navbar />

      {/* 2. Hero Video with Left-Aligned Title, Smaller Text & Two CTA Buttons */}
      <HeroVideo />

      {/* 3. FlipDown Countdown Timer */}
      <CountdownTimer />

      {/* 4. Slogan Banner Bar */}
      <SloganBanner />

      {/* 5. About The Event & Shroom Connect Conclave */}
      <AboutEvent />

      {/* 8. Why Indian Mushroom Days (6 USPs with Interactive Tabs) */}
      <WhyJoinSection />

      {/* 8. Our Strength (5000+ Delegates, 100+ Exhibitors, 15+ Countries, 50+ Speakers) */}
      <OurStrength />

      {/* 9. Our Past Sponsors & Partners (Milkyway, UAS Bangalore, Mushroom Exchange) */}
      <PastSponsorsSection />

      {/* 10. Full Industry Chain Coverage (Zig-zag) */}
      <FullIndustryChain />

      {/* 6. Organising Committee (Leadership & Advisory Board) */}
      <OrganisingCommittee />

      {/* 7. Schedule & Program Agenda (3 Days Itinerary) */}
      <ScheduleSection />

      {/* 11. Our Highlights / Testimonials Carousel */}
      <TestimonialsSection />

      {/* 12. Photo Gallery */}
      <GallerySection />

      {/* 13. Part of Exhibitors (Continuous Logo Marquee) */}
      <ExhibitorsSection />

      {/* 14. Buyer Club Program Banner */}
      <BuyerClubSection />

      {/* 15. Pre-Registration Form */}
      <RegisterSection />

      {/* 16. Footer with CFNA Details & Contacts */}
      <FooterSection />
    </main>
  );
}
