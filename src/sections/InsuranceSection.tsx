import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "@/components/SectionHeading";

const providers = ["Blue Cross", "Aetna", "Cigna", "UnitedHealth", "Medicare", "Medicaid"];

export default function InsuranceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-[#F8FAFA]">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionHeading
          label="INSURANCE"
          heading="We Accept Most Major Insurance Plans"
          description="We work with a wide range of insurance providers to make quality healthcare accessible."
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
          className="max-w-[800px] mx-auto mt-10 bg-white rounded-2xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] text-center"
        >
          <p className="font-['Inter'] text-base text-[#4A5568] leading-relaxed">
            MED+ Medical Clinic accepts most major insurance plans including Blue Cross Blue Shield, Aetna, Cigna, UnitedHealthcare, Medicare, and Medicaid. We also offer competitive self-pay rates for uninsured patients. Our billing team is happy to verify your coverage and explain any costs before your visit.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {providers.map((name) => (
              <span
                key={name}
                className="font-['Poppins'] text-sm font-medium text-[#4A5568] bg-[#F8FAFA] border border-[#E2E8F0] rounded-lg px-4 py-2"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
