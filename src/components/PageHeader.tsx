import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface PageHeaderProps {
  breadcrumb: string;
  title: string;
  subtitle: string;
}

export default function PageHeader({ breadcrumb, title, subtitle }: PageHeaderProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="bg-[#F0F4F4] pt-[152px] pb-12">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
          className="font-['Inter'] text-xs font-medium uppercase tracking-[0.04em] text-[#94A3B8] mb-4"
        >
          <Link to="/" className="text-[#0D9488] hover:underline">
            Home
          </Link>
          <span className="mx-2">&gt;</span>
          <span>{breadcrumb}</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: [0, 0, 0.2, 1] }}
          className="font-['Poppins'] text-[36px] font-semibold text-[#1A202C] leading-tight"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease: [0, 0, 0.2, 1] }}
          className="font-['Inter'] text-base text-[#4A5568] mt-3 max-w-[600px] leading-relaxed"
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  );
}
