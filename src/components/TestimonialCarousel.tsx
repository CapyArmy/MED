import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import { supabase, type Testimonial } from "@/lib/supabase";

const fallbackTestimonials = [
  {
    quote: "The team at MED+ Medical Clinic has been incredible. They always take the time to explain everything and make my kids feel comfortable. I wouldn't trust anyone else with my family's health.",
    patient_name: "Sarah Mitchell",
    rating: 5,
  },
  {
    quote: "After years of feeling like just a number at other practices, I finally found a clinic that treats me like a person. Dr. Chen and her team are compassionate, thorough, and truly care.",
    patient_name: "Robert Thompson",
    rating: 5,
  },
  {
    quote: "The online booking system is so convenient, and the staff is always friendly and professional. When I had an urgent issue, they got me in the same day. Highly recommend!",
    patient_name: "Maria Garcia",
    rating: 5,
  },
];

export default function TestimonialCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_approved', true)
        .order('display_order', { ascending: true });

      if (data && data.length > 0) {
        setTestimonials(data);
      } else {
        setTestimonials(fallbackTestimonials as Testimonial[]);
      }
    };
    fetchTestimonials();
  }, []);

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
  }, [testimonials.length]);

  useEffect(() => {
    if (testimonials.length === 0) return;
    intervalRef.current = setInterval(() => {
      if (!isHoveredRef.current) {
        next();
      }
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [next, testimonials.length]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  if (testimonials.length === 0) return null;

  const currentTestimonial = testimonials[current];

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
              &ldquo;{currentTestimonial.quote}&rdquo;
            </p>
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={i < (currentTestimonial.rating || 5) ? "text-[#F59E0B] fill-[#F59E0B]" : "text-[#E2E8F0]"}
                />
              ))}
            </div>
            <p className="font-['Poppins'] text-base font-semibold text-[#1A202C]">
              {currentTestimonial.patient_name}
            </p>
            <p className="font-['Inter'] text-sm text-[#94A3B8] mt-1">
              MED+ Patient
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
