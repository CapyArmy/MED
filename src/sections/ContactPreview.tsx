import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const contacts = [
  {
    icon: Phone,
    title: "Call Us",
    detail: "(555) 123-4567",
    sub: "Mon-Fri, 8AM-6PM",
  },
  {
    icon: Mail,
    title: "Email Us",
    detail: "info@evergreenclinic.com",
    sub: "We reply within 24 hours",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    detail: "742 Evergreen Terrace",
    sub: "Springfield, ST 12345",
  },
];

export default function ContactPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionHeading
          label="GET IN TOUCH"
          heading="We're Here to Help"
          description="Have questions or need to reach us? Our team is available to assist you."
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
          {contacts.map((contact, i) => (
            <motion.div
              key={contact.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0, 0, 0.2, 1],
              }}
              className="bg-white rounded-2xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 transition-all duration-250 text-center"
            >
              <div className="w-14 h-14 rounded-full bg-[#F8FAFA] flex items-center justify-center mx-auto mb-5">
                <contact.icon size={28} className="text-[#0D9488]" />
              </div>
              <h4 className="font-['Poppins'] text-base font-semibold text-[#1A202C] mb-2">
                {contact.title}
              </h4>
              <p className="font-['Inter'] text-sm text-[#1A202C]">
                {contact.detail}
              </p>
              <p className="font-['Inter'] text-xs text-[#94A3B8] mt-1">
                {contact.sub}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.5, ease: [0, 0, 0.2, 1] }}
          className="text-center mt-10"
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 font-['Inter'] text-sm font-medium text-[#0D9488] hover:underline transition-all duration-200"
          >
            View Full Contact Information
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
