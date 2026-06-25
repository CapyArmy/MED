import { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Users,
  Baby,
  Heart,
  Shield,
  Activity,
  Clock,
  ChevronDown,
  CheckCircle,
} from "lucide-react";

interface ServiceCategory {
  icon: React.ElementType;
  title: string;
  summary: string;
  description: string;
  procedures: string[];
  image: string;
  imageLeft: boolean;
}

const categories: ServiceCategory[] = [
  {
    icon: Users,
    title: "Family Medicine",
    summary:
      "Your family's medical home. Our family medicine physicians provide comprehensive care for patients of all ages, managing everything from routine wellness to complex chronic conditions.",
    description:
      "Our family medicine team serves as your primary point of contact for all healthcare needs. We build long-term relationships with patients and their families, providing continuity of care across generations. Our services include annual physicals, sick visits, chronic disease management, minor procedures, and health counseling. We coordinate with specialists when needed and ensure seamless communication across your care team.",
    procedures: [
      "Annual Physical Examinations",
      "Acute Illness Treatment",
      "Chronic Disease Management",
      "Minor Surgical Procedures",
      "Health Risk Assessments",
      "Immunizations & Vaccinations",
    ],
    image: "/assets/service-family-medicine.jpg",
    imageLeft: true,
  },
  {
    icon: Baby,
    title: "Pediatric Care",
    summary:
      "Gentle, compassionate care for your little ones. Our pediatric team specializes in the physical, emotional, and developmental health of children from birth through adolescence.",
    description:
      "Our pediatric department is designed with children in mind — from our welcoming, colorful waiting area to our gentle, patient providers. We focus on preventive care to keep your child healthy, developmental monitoring to ensure they're reaching milestones, and prompt treatment when illness strikes. Our pediatricians work closely with parents to address concerns and provide guidance on nutrition, safety, and behavior.",
    procedures: [
      "Well-Child Visits",
      "Vaccinations & Immunizations",
      "Developmental Screenings",
      "School & Sports Physicals",
      "Acute Illness Care",
      "Growth & Nutrition Counseling",
    ],
    image: "/assets/service-pediatrics.jpg",
    imageLeft: false,
  },
  {
    icon: Heart,
    title: "Women's Health",
    summary:
      "Dedicated care for women at every stage of life. From adolescence through menopause and beyond, our women's health services address your unique healthcare needs with sensitivity and expertise.",
    description:
      "Our women's health providers offer a full range of services in a comfortable, private setting. We emphasize preventive care and early detection, providing screenings and education to help you make informed decisions about your health. Our team includes female physicians and nurse practitioners who understand the unique health concerns women face.",
    procedures: [
      "Annual Well-Woman Exams",
      "Pap Smears & HPV Testing",
      "Mammogram Referrals",
      "Family Planning & Contraception",
      "Prenatal Care",
      "Menopause Management",
    ],
    image: "/assets/service-womens-health.jpg",
    imageLeft: true,
  },
  {
    icon: Shield,
    title: "Preventive Care",
    summary:
      "An ounce of prevention is worth a pound of cure. Our preventive care programs are designed to keep you healthy, catch potential issues early, and empower you to take control of your wellbeing.",
    description:
      "Prevention is the cornerstone of our practice. We believe the best treatment is avoiding illness altogether. Our preventive care services include comprehensive health screenings, lifestyle counseling, vaccination programs, and wellness planning. We work with you to identify risk factors and create personalized prevention strategies.",
    procedures: [
      "Health Screenings & Physicals",
      "Vaccination Programs",
      "Lifestyle & Nutrition Counseling",
      "Smoking Cessation Support",
      "Weight Management Programs",
      "Cancer Screenings",
    ],
    image: "/assets/service-preventive.jpg",
    imageLeft: false,
  },
  {
    icon: Activity,
    title: "Chronic Disease Management",
    summary:
      "Living with a chronic condition requires ongoing support. Our chronic care program provides comprehensive management for diabetes, hypertension, asthma, heart disease, and other long-term conditions.",
    description:
      "Managing a chronic disease can feel overwhelming, but you don't have to do it alone. Our chronic care team provides regular monitoring, medication management, lifestyle coaching, and coordination with specialists. We develop individualized care plans and use our patient portal to keep you connected with your care team between visits.",
    procedures: [
      "Diabetes Management",
      "Hypertension Monitoring",
      "Asthma & COPD Care",
      "Heart Disease Management",
      "Thyroid Disorder Treatment",
      "Arthritis & Pain Management",
    ],
    image: "/assets/service-family-medicine.jpg",
    imageLeft: true,
  },
  {
    icon: Clock,
    title: "Urgent Care",
    summary:
      "When you need care quickly, we're here. Our urgent care services handle non-life-threatening illnesses and injuries that require prompt attention but not an emergency room visit.",
    description:
      "Our urgent care clinic offers same-day appointments for unexpected health issues. We treat a wide range of conditions with shorter wait times and lower costs than the emergency room. For life-threatening emergencies, please call 911 or visit your nearest emergency department.",
    procedures: [
      "Same-Day Sick Visits",
      "Minor Injury Treatment",
      "Infection Diagnosis & Treatment",
      "Allergy & Asthma Flare-ups",
      "Skin Conditions (Rashes, Infections)",
      "Diagnostic X-Rays (On-Site)",
    ],
    image: "/assets/service-preventive.jpg",
    imageLeft: false,
  },
];

function CategoryCard({ category }: { category: ServiceCategory }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const imageContent = (
    <motion.div
      initial={{ opacity: 0, x: category.imageLeft ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0, 0, 0.2, 1] }}
      className={`${category.imageLeft ? "lg:w-[45%]" : "lg:w-[45%] lg:order-2"}`}
    >
      <div
        className={`overflow-hidden ${
          category.imageLeft
            ? "rounded-2xl lg:rounded-r-none"
            : "rounded-2xl lg:rounded-l-none"
        }`}
      >
        <img
          src={category.image}
          alt={category.title}
          className="w-full h-[280px] lg:h-full object-cover"
        />
      </div>
    </motion.div>
  );

  const textContent = (
    <motion.div
      initial={{ opacity: 0, x: category.imageLeft ? 30 : -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0, 0, 0.2, 1] }}
      className={`bg-[#F8FAFA] p-8 lg:p-10 flex flex-col justify-center ${
        category.imageLeft
          ? "lg:w-[55%] rounded-2xl lg:rounded-l-none"
          : "lg:w-[55%] lg:order-1 rounded-2xl lg:rounded-r-none"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.1, ease: [0, 0, 0.2, 1] }}
        className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-5"
      >
        <category.icon size={32} className="text-[#0D9488]" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.15, ease: [0, 0, 0.2, 1] }}
        className="font-['Poppins'] text-2xl font-semibold text-[#1A202C] mb-3"
      >
        {category.title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.2, ease: [0, 0, 0.2, 1] }}
        className="font-['Inter'] text-base text-[#4A5568] leading-relaxed mb-5"
      >
        {category.summary}
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.25, ease: [0, 0, 0.2, 1] }}
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 self-start border-[1.5px] border-[#0D9488] text-[#0D9488] font-['Inter'] text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#0D9488]/5 transition-colors duration-200"
      >
        {isOpen ? "Show Less" : "Learn More"}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <ChevronDown size={18} />
        </motion.span>
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-5 mt-5 border-t border-[#E2E8F0]">
              <p className="font-['Inter'] text-sm text-[#4A5568] leading-relaxed mb-5">
                {category.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {category.procedures.map((proc) => (
                  <div key={proc} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-[#0D9488] shrink-0" />
                    <span className="font-['Inter'] text-sm text-[#1A202C]">
                      {proc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <div ref={ref} className="flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
      {imageContent}
      {textContent}
    </div>
  );
}

export default function ServiceCategories() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 space-y-8">
        {categories.map((category) => (
          <CategoryCard key={category.title} category={category} />
        ))}
      </div>
    </section>
  );
}
