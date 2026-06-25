import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SectionHeadingProps {
  label: string;
  heading: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  label,
  heading,
  description,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const alignClass = align === "center" ? "items-center text-center" : "items-start text-left";
  const descMaxWidth = align === "center" ? "max-w-[560px] mx-auto" : "max-w-[560px]";

  return (
    <div ref={ref} className={`flex flex-col ${alignClass} ${className}`}>
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
        className="font-['Inter'] text-xs font-medium uppercase tracking-[0.04em] text-[#0D9488] mb-3"
      >
        {label}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1, ease: [0, 0, 0.2, 1] }}
        className="font-['Poppins'] text-[28px] font-semibold text-[#1A202C] leading-tight"
      >
        {heading}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease: [0, 0, 0.2, 1] }}
          className={`font-['Inter'] text-base text-[#4A5568] mt-3 leading-relaxed ${descMaxWidth}`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
