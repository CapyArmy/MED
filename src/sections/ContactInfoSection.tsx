import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const contactCards = [
  {
    icon: Phone,
    title: "Phone",
    lines: [
      { text: "(555) 123-4567", sub: "Main Line" },
      { text: "(555) 123-4568", sub: "Appointments" },
      { text: "(555) 123-4569", sub: "After-Hours Nurse Line" },
    ],
  },
  {
    icon: Mail,
    title: "Email",
    lines: [
      { text: "info@evergreenclinic.com", sub: "General Inquiries" },
      { text: "appointments@evergreenclinic.com", sub: "Appointment Requests" },
    ],
  },
  {
    icon: MapPin,
    title: "Clinic Address",
    lines: [
      { text: "742 Evergreen Terrace", sub: "" },
      { text: "Springfield, ST 12345", sub: "" },
    ],
    note: "Located at the corner of Evergreen Terrace and Main Street, with accessible parking in the rear.",
  },
  {
    icon: Clock,
    title: "Office Hours",
    lines: [
      { text: "Monday \u2013 Friday: 8:00 AM \u2013 6:00 PM", sub: "" },
      { text: "Saturday: 9:00 AM \u2013 2:00 PM", sub: "" },
      { text: "Sunday: Closed", sub: "" },
    ],
    highlight: "After-Hours Nurse Line: Available 24/7",
  },
];

export default function ContactInfoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Contact Info Cards */}
          <div className="lg:w-[40%] space-y-4">
            {contactCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: [0, 0, 0.2, 1],
                }}
                className="bg-white border border-[#E2E8F0] rounded-xl p-6 flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F8FAFA] flex items-center justify-center shrink-0">
                  <card.icon size={24} className="text-[#0D9488]" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-['Poppins'] text-base font-semibold text-[#1A202C] mb-2">
                    {card.title}
                  </h4>
                  {card.lines.map((line, j) => (
                    <div key={j} className={j > 0 ? "mt-1.5" : ""}>
                      <p className="font-['Inter'] text-sm text-[#1A202C]">
                        {line.text}
                      </p>
                      {line.sub && (
                        <p className="font-['Inter'] text-xs text-[#94A3B8] mt-0.5">
                          {line.sub}
                        </p>
                      )}
                    </div>
                  ))}
                  {card.note && (
                    <p className="font-['Inter'] text-xs text-[#94A3B8] mt-2 leading-relaxed">
                      {card.note}
                    </p>
                  )}
                  {card.highlight && (
                    <p className="font-['Inter'] text-sm font-medium text-[#0D9488] mt-2">
                      {card.highlight}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0, 0, 0.2, 1] }}
            className="lg:w-[60%] relative"
          >
            <div className="bg-[#F8FAFA] rounded-2xl overflow-hidden h-[320px] lg:h-[480px] relative">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=-89.65%2C39.78%2C-89.55%2C39.82&amp;layer=mapnik&amp;marker=39.80%2C-89.60"
                className="w-full h-full border-0"
                title="Evergreen Medical Clinic Location"
              />
              {/* Overlay Card */}
              <div className="absolute bottom-4 left-4 bg-white rounded-xl p-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] max-w-[220px]">
                <p className="font-['Poppins'] text-sm font-semibold text-[#1A202C]">
                  Evergreen Medical Clinic
                </p>
                <p className="font-['Inter'] text-xs text-[#4A5568] mt-1">
                  742 Evergreen Terrace
                </p>
                <a
                  href="https://www.openstreetmap.org/?mlat=39.80&amp;mlon=-89.60#map=15/39.80/-89.60"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-['Inter'] text-sm text-[#0D9488] hover:underline mt-2"
                >
                  Get Directions &rarr;
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
