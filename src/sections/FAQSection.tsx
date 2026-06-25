import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "@/components/SectionHeading";
import FAQAccordion from "@/components/FAQAccordion";

const faqItems = [
  {
    question: "Do I need to make an appointment, or do you accept walk-ins?",
    answer:
      "While we recommend scheduling an appointment to minimize wait times, we do accept same-day walk-ins for urgent care needs. For non-urgent visits, please book online or call us to schedule.",
  },
  {
    question: "What insurance plans do you accept?",
    answer:
      "We accept most major insurance plans including Blue Cross Blue Shield, Aetna, Cigna, UnitedHealthcare, Medicare, and Medicaid. We also offer competitive self-pay rates. Contact our billing department to verify your specific coverage.",
  },
  {
    question: "How do I access my medical records through the patient portal?",
    answer:
      "Once you register for our patient portal, you can access your medical records, lab results, appointment history, and communicate with your care team. If you need help registering, call our office or speak with staff during your next visit.",
  },
  {
    question: "What should I bring to my first appointment?",
    answer:
      "Please bring a valid photo ID, your insurance card, a list of current medications (including dosages), and any relevant medical records from previous providers. Arriving 15 minutes early will give you time to complete new patient paperwork.",
  },
  {
    question: "Do you offer telehealth appointments?",
    answer:
      "Yes! We offer telehealth visits for select services including follow-up consultations, medication management, and minor illness evaluations. Call us or use the patient portal to schedule a virtual visit.",
  },
];

export default function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-[800px] mx-auto px-6">
        <SectionHeading
          label="FAQ"
          heading="Frequently Asked Questions"
          align="center"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10"
        >
          <FAQAccordion items={faqItems} />
        </motion.div>
      </div>
    </section>
  );
}
