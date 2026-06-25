import { ClipboardList, Clock, Phone } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const sidebarCards = [
  {
    icon: ClipboardList,
    title: "What to Bring",
    items: [
      "Photo ID",
      "Insurance card",
      "List of current medications",
      "Previous medical records (if new patient)",
    ],
  },
  {
    icon: Clock,
    title: "Office Hours",
    items: [
      "Monday \u2013 Friday: 8:00 AM \u2013 6:00 PM",
      "Saturday: 9:00 AM \u2013 2:00 PM",
      "Sunday: Closed",
    ],
  },
  {
    icon: Phone,
    title: "Need Help?",
    items: [],
    custom: true,
    content: (
      <>
        <p className="font-['Inter'] text-sm text-[#4A5568] mb-2">
          If you have trouble booking online or need same-day care, call us at
        </p>
        <p className="font-['Poppins'] text-lg font-semibold text-[#0D9488]">
          (555) 123-4567
        </p>
        <p className="font-['Inter'] text-xs text-[#94A3B8] mt-2">
          Our staff is available during office hours to assist you.
        </p>
      </>
    ),
  },
];

export default function FormSidebar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3, ease: [0, 0, 0.2, 1] }}
      className="bg-[#F8FAFA] rounded-2xl p-8 lg:p-10 lg:ml-12 space-y-8"
    >
      {sidebarCards.map((card, i) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.4,
            delay: 0.3 + i * 0.15,
            ease: [0, 0, 0.2, 1],
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
              <card.icon size={28} className="text-[#0D9488]" />
            </div>
            <h4 className="font-['Poppins'] text-base font-semibold text-[#1A202C]">
              {card.title}
            </h4>
          </div>

          {card.custom ? (
            card.content
          ) : (
            <ul className="space-y-2.5">
              {card.items?.map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488] shrink-0" />
                  <span className="font-['Inter'] text-sm text-[#4A5568]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}
