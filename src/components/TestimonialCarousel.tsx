import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  detail: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "The team at Evergreen Medical Clinic has been incredible. They always take the time to explain everything and make my kids feel comfortable. I wouldn't trust anyone else with my family's health.",
    name: "Sarah Mitchell",
    detail: "Patient since 2019",
  },
  {
    quote: "After years of feeling like just a number at other practices, I finally found a clinic that treats me like a person. Dr. Chen and her team are compassionate, thorough, and truly care.",
    name: "Robert Thompson",
    detail: "Patient since 2021",
  },
  {
    quote: "The online booking system is so convenient, and the staff is always friendly and professional. When I had an urgent issue, they got me in the same day. Highly recommend!",
    name: "Maria Garcia",
    detail: "Patient since 2020",
  },
];

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isHoveredRef = useRef(false);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!isHoveredRef.current) {
        next();
      }
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [next]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div
      className="max-w-[800px] mx-auto"
      onMouseEnter={() => (isHoveredRef.current = true)}
      onMouseLeave={() => (isHoveredRef.current = false)}
    >
      <div className="relative overflow-hidden min-h-[280px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="bg-white rounded-2xl p-10 shadow-[0_4px_24px_rgba(0,0,0,0.06)] text-center"
          >
            <p className="font-['Poppins'] text-xl text-[#1A202C] italic leading-relaxed mb-6">
              &ldquo;{testimonials[current].quote}&rdquo;
            </p>
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="text-[#F59E0B] fill-[#F59E0B]" />
              ))}
            </div>
            <p className="font-['Poppins'] text-base font-semibold text-[#1A202C]">
              {testimonials[current].name}
            </p>
            <p className="font-['Inter'] text-sm text-[#94A3B8] mt-1">
              {testimonials[current].detail}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
              i === current ? "bg-[#0D9488]" : "bg-[#E2E8F0]"
            }`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
