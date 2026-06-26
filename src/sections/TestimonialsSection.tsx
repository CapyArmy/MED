import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "@/components/SectionHeading";
import TestimonialCarousel from "@/components/TestimonialCarousel";

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="relative py-20 bg-[#F0F4F4] overflow-hidden">
      {/* Decorative background */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(13,148,136,0.15) 0%, rgba(255,255,255,0) 50%, rgba(13,148,136,0.08) 100%)",
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-6">
        <SectionHeading
          label="TESTIMONIALS"
          heading="What Our Patients Say"
          description="Hear from the families who trust MED+ with their care."
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0, 0, 0.2, 1] }}
          className="mt-12"
        >
          <TestimonialCarousel />
        </motion.div>
      </div>
    </section>
  );
}
