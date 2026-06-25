import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Users, Heart } from "lucide-react";

const stats = [
  { icon: Award, number: "15+", label: "Years of Service" },
  { icon: Users, number: "12,000+", label: "Patients Cared For" },
  { icon: Heart, number: "98%", label: "Patient Satisfaction" },
];

export default function StatsBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="bg-[#F8FAFA] py-12">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.15,
                ease: [0, 0, 0.2, 1],
              }}
              className={`flex flex-col items-center text-center py-4 ${
                i < stats.length - 1
                  ? "sm:border-r sm:border-[#E2E8F0]"
                  : ""
              }`}
            >
              <stat.icon size={24} className="text-[#94A3B8] mb-3" />
              <span className="font-['Poppins'] text-[36px] font-semibold text-[#0D9488]">
                {stat.number}
              </span>
              <span className="font-['Inter'] text-xs font-medium uppercase tracking-[0.04em] text-[#4A5568] mt-1">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
