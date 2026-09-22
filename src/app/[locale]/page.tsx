import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import HeroVideo from "@/components/HeroVideo";
import SummitPillars from "@/components/SummitPillars";
import MediaPartners from "@/components/MediaPartners";
import SloganBanner from "@/components/SloganBanner";
import AboutEvent from "@/components/AboutEvent";
import FullIndustryChain from "@/components/FullIndustryChain";
import WhyJoinSection from "@/components/WhyJoinSection";
import InstagramFeed from "@/components/InstagramFeed";
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

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen flex flex-col bg-[#faf9f5] relative font-sans w-full max-w-full overflow-x-hidden">
      <Navbar />
      <HeroVideo />
      <SummitPillars />
      <MediaPartners />
      <SloganBanner />
      <AboutEvent />
      <FullIndustryChain />
      <WhyJoinSection />
      <InstagramFeed />
      <OurStrength />
      <ExhibitorsSection />
      <ScheduleSection />
      <OrganisingCommittee />
      <BuyerClubSection />
      <TestimonialsSection />
      <GallerySection />
      <PastSponsorsSection />
      <RegisterSection />
      <FooterSection />
    </main>
  );
}
