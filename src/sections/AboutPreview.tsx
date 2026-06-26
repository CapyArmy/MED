import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CircleCheck as CheckCircle } from "lucide-react";

const features = [
  "Board-Certified Physicians",
  "Same-Day Appointments",
  "In-House Laboratory",
  "Electronic Health Records",
];

export default function AboutPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0, 0, 0.2, 1] }}
            className="lg:w-[45%]"
          >
            <img
              src="/assets/clinic-exterior.jpg"
              alt="MED+ Medical Clinic exterior"
              className="w-full h-auto rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] object-cover"
            />
          </motion.div>

          {/* Text Content */}
          <div className="lg:w-[55%]">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1, ease: [0, 0, 0.2, 1] }}
              className="font-['Inter'] text-xs font-medium uppercase tracking-[0.04em] text-[#0D9488]"
            >
              ABOUT US
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2, ease: [0, 0, 0.2, 1] }}
              className="font-['Poppins'] text-[28px] font-semibold text-[#1A202C] leading-tight mt-3"
            >
              Caring for Our Community Since 2009
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3, ease: [0, 0, 0.2, 1] }}
              className="font-['Inter'] text-base text-[#4A5568] leading-[1.7] mt-4"
            >
              MED+ Medical Clinic has been a trusted healthcare provider in Springfield for over 15 years. Our team of board-certified physicians, nurses, and specialists is committed to delivering personalized, compassionate care to patients of all ages. We believe in building lasting relationships with our patients and their families, focusing on preventive care and overall wellness.
            </motion.p>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {features.map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: 0.4 + i * 0.08,
                    ease: [0, 0, 0.2, 1],
                  }}
                  className="flex items-center gap-2.5"
                >
                  <CheckCircle size={20} className="text-[#0D9488] shrink-0" />
                  <span className="font-['Inter'] text-sm text-[#1A202C]">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.7, ease: [0, 0, 0.2, 1] }}
              className="mt-7"
            >
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 font-['Inter'] text-sm font-medium text-[#0D9488] hover:underline transition-all duration-200"
              >
                Learn More About Us
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
