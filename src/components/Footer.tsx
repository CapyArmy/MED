import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer ref={ref} className="bg-[#1A202C]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
        className="max-w-[1200px] mx-auto px-6 pt-16 pb-8"
      >
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 - Clinic Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                <path d="M14 2C14 2 8 8 8 14C8 17.3137 10.6863 20 14 20C17.3137 20 20 17.3137 20 14C20 8 14 2 14 2Z" fill="#0D9488" fillOpacity="0.2" />
                <path d="M14 8V20M8 14H20" stroke="#0D9488" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="14" cy="14" r="11" stroke="#0D9488" strokeWidth="1.5" fill="none" />
              </svg>
              <span className="font-['Poppins'] font-semibold text-white text-base">
                Evergreen Medical Clinic
              </span>
            </div>
            <p className="text-[#94A3B8] text-sm leading-relaxed mb-3">
              Compassionate care for your family's health.
            </p>
            <p className="text-[#94A3B8] text-sm">
              742 Evergreen Terrace, Springfield
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="font-['Poppins'] font-semibold text-white text-base mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Home", path: "/" },
                { label: "Services", path: "/services" },
                { label: "Book Appointment", path: "/book-appointment" },
                { label: "Patient Portal", path: "/patient-portal" },
                { label: "Contact Us", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-[#94A3B8] text-sm hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Services */}
          <div>
            <h4 className="font-['Poppins'] font-semibold text-white text-base mb-4">
              Our Services
            </h4>
            <ul className="space-y-2.5">
              {[
                "Family Medicine",
                "Pediatric Care",
                "Women's Health",
                "Preventive Care",
                "Chronic Disease",
              ].map((service) => (
                <li key={service}>
                  <span className="text-[#94A3B8] text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h4 className="font-['Poppins'] font-semibold text-white text-base mb-4">
              Contact Us
            </h4>
            <ul className="space-y-2.5">
              <li className="text-[#94A3B8] text-sm">(555) 123-4567</li>
              <li className="text-[#94A3B8] text-sm">info@evergreenclinic.com</li>
              <li className="text-[#94A3B8] text-sm">Mon-Fri: 8AM-6PM</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#374151] my-10" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#94A3B8] text-xs">
            &copy; 2024 Evergreen Medical Clinic. All rights reserved.
          </p>
          <div className="flex gap-4 text-[#94A3B8] text-xs">
            <span className="hover:text-white transition-colors duration-200 cursor-pointer">
              Privacy Policy
            </span>
            <span>|</span>
            <span className="hover:text-white transition-colors duration-200 cursor-pointer">
              Terms of Service
            </span>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
