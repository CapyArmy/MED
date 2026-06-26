import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function CTABanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="bg-[#0D9488] py-20">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
          className="font-['Poppins'] text-[30px] sm:text-[36px] font-semibold text-white leading-tight"
        >
          Ready to Take the First Step?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15, ease: [0, 0, 0.2, 1] }}
          className="font-['Inter'] text-base text-white/85 max-w-[520px] mx-auto mt-4 leading-relaxed"
        >
          Schedule your appointment today and experience the MED+ difference. New patients are always welcome.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: 0.3,
          }}
          className="mt-8"
        >
          <Link
            to="/book-appointment"
            className="inline-block bg-white text-[#0D9488] font-['Inter'] text-sm font-semibold tracking-[0.02em] px-8 py-4 rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.15)] hover:bg-[#F0FDFA] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)] transition-all duration-200"
          >
            Book an Appointment
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
