import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Stethoscope, UserCheck, Building2 } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const differentiators = [
  {
    icon: Stethoscope,
    title: "Experienced Team",
    description:
      "Our physicians average 20+ years of clinical experience and stay current with the latest medical advances through continuing education.",
  },
  {
    icon: UserCheck,
    title: "Patient-Centered Care",
    description:
      "We take time to listen, answer questions, and involve you in every decision about your health. Your concerns are our priority.",
  },
  {
    icon: Building2,
    title: "Modern Facilities",
    description:
      "Our clinic features state-of-the-art diagnostic equipment, comfortable exam rooms, and an on-site laboratory for quick results.",
  },
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionHeading
          label="WHY CHOOSE US"
          heading="What Sets Us Apart"
          description="We combine medical excellence with a personal touch, ensuring every patient receives the attention and care they deserve."
          align="left"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {differentiators.map((diff, i) => (
            <motion.div
              key={diff.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0, 0, 0.2, 1],
              }}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                  delay: i * 0.12 - 0.1,
                }}
                className="w-16 h-16 rounded-full bg-[#F8FAFA] flex items-center justify-center mb-5"
              >
                <diff.icon size={32} className="text-[#0D9488]" />
              </motion.div>
              <h3 className="font-['Poppins'] text-xl font-semibold text-[#1A202C] mb-3">
                {diff.title}
              </h3>
              <p className="font-['Inter'] text-sm text-[#4A5568] leading-relaxed">
                {diff.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
