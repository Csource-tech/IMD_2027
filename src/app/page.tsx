import Navbar from "@/components/Navbar";
import HeroVideo from "@/components/HeroVideo";
import CountdownTimer from "@/components/CountdownTimer";
import SloganBanner from "@/components/SloganBanner";
import AboutEvent from "@/components/AboutEvent";
import FullIndustryChain from "@/components/FullIndustryChain";
import WhyJoinSection from "@/components/WhyJoinSection";
import OurStrength from "@/components/OurStrength";
import ScheduleSection from "@/components/ScheduleSection";
import OrganisingCommittee from "@/components/OrganisingCommittee";
import BuyerClubSection from "@/components/BuyerClubSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import GallerySection from "@/components/GallerySection";
import PastSponsorsSection from "@/components/PastSponsorsSection";
import ExhibitorsSection from "@/components/ExhibitorsSection";
import RegisterSection from "@/components/RegisterSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-[#faf9f5] relative font-sans">
      {/* 1. Floating Pill Glassmorphism Navigation Bar */}
      <Navbar />

      {/* 2. Cinematic Macro Mushroom Editorial Hero */}
      <HeroVideo />

      {/* 3. Official Live Countdown Split-Flap Ticker */}
      <CountdownTimer />

      {/* 4. Editorial Manifesto Bar: Mushrooms First */}
      <SloganBanner />

      {/* 5. Dual Ecosystem Architecture: IMD 2027 & Shroom Connect */}
      <AboutEvent />

      {/* 6. Mushroom as Hero: Button Backbone & 6 Specialty Sectors */}
      <FullIndustryChain />

      {/* 7. Strategic Imperatives: 6 Interactive Value Chapters */}
      <WhyJoinSection />

      {/* 8. National Scale & Industry Impact: 5000+ Delegates & 100+ Brands */}
      <OurStrength />

      {/* 9. 3-Day Program Agenda: Discover • Innovate • Grow */}
      <ScheduleSection />

      {/* 10. Visionary Leadership & Advisory Council (Real Member Photography) */}
      <OrganisingCommittee />

      {/* 11. Mushroom Exchange & VIP Buyer Club Trade Linkages */}
      <BuyerClubSection />

      {/* 12. Industry Endorsements & Dignitary Reviews */}
      <TestimonialsSection />

      {/* 13. Visual Chronicle: Curated Bento Photo Gallery & Lightbox */}
      <GallerySection />

      {/* 14. Strategic Alliances & Institutional Partners */}
      <PastSponsorsSection />

      {/* 15. 100+ Corporate Exhibitors Infinite Marquee */}
      <ExhibitorsSection />

      {/* 16. Official Secretariat & Direct Inquiry Pavilion */}
      <RegisterSection />

      {/* 17. Editorial Grand Finale & Comprehensive Sitemap Footer */}
      <FooterSection />
    </main>
  );
}
