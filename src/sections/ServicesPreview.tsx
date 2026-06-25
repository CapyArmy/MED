import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Baby, Heart, Shield } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import SectionHeading from "@/components/SectionHeading";

const services = [
  {
    icon: Users,
    title: "Family Medicine",
    description:
      "Comprehensive primary care for patients of all ages, from infants to seniors. Routine checkups, acute illness treatment, and ongoing health management.",
  },
  {
    icon: Baby,
    title: "Pediatric Care",
    description:
      "Specialized care for infants, children, and adolescents. Well-child visits, vaccinations, developmental screenings, and acute care.",
  },
  {
    icon: Heart,
    title: "Women's Health",
    description:
      "Annual exams, family planning, prenatal care, menopause management, and screenings including Pap smears and mammogram referrals.",
  },
  {
    icon: Shield,
    title: "Preventive Care",
    description:
      "Health screenings, immunizations, lifestyle counseling, and wellness programs designed to keep you healthy and catch issues early.",
  },
];

export default function ServicesPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="py-20 bg-[#F8FAFA]">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionHeading
          label="OUR SERVICES"
          heading="Comprehensive Care for Your Family"
          description="From preventive screenings to chronic disease management, we offer a full spectrum of healthcare services tailored to your needs."
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.2 + i * 0.1,
                ease: [0, 0, 0.2, 1],
              }}
            >
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.7, ease: [0, 0, 0.2, 1] }}
          className="text-center mt-10"
        >
          <Link
            to="/services"
            className="inline-block bg-[#0D9488] text-white font-['Inter'] text-sm font-semibold tracking-[0.02em] px-7 py-3.5 rounded-xl shadow-[0_2px_8px_rgba(13,148,136,0.25)] hover:bg-[#0F766E] hover:shadow-[0_4px_16px_rgba(13,148,136,0.35)] transition-all duration-200"
          >
            View All Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
