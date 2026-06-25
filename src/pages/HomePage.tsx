import HeroSection from "@/sections/HeroSection";
import StatsBar from "@/sections/StatsBar";
import AboutPreview from "@/sections/AboutPreview";
import ServicesPreview from "@/sections/ServicesPreview";
import WhyChooseUs from "@/sections/WhyChooseUs";
import TestimonialsSection from "@/sections/TestimonialsSection";
import CTABanner from "@/sections/CTABanner";
import ContactPreview from "@/sections/ContactPreview";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <AboutPreview />
      <ServicesPreview />
      <WhyChooseUs />
      <TestimonialsSection />
      <CTABanner />
      <ContactPreview />
    </>
  );
}
