import PageHeader from "@/components/PageHeader";
import ContactInfoSection from "@/sections/ContactInfoSection";
import ContactFormSection from "@/sections/ContactFormSection";
import FAQSection from "@/sections/FAQSection";

export default function ContactPage() {
  return (
    <>
      <PageHeader
        breadcrumb="Contact Us"
        title="Contact Us"
        subtitle="We're here to answer your questions. Reach out to us by phone, email, or visit our clinic during office hours."
      />
      <ContactInfoSection />
      <ContactFormSection />
      <FAQSection />
    </>
  );
}
