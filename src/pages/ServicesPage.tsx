import PageHeader from "@/components/PageHeader";
import ServiceCategories from "@/sections/ServiceCategories";
import InsuranceSection from "@/sections/InsuranceSection";

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        breadcrumb="Services"
        title="Our Services"
        subtitle="Comprehensive healthcare services designed to meet the needs of your entire family, from routine wellness checks to specialized treatments."
      />
      <ServiceCategories />
      <InsuranceSection />
    </>
  );
}
