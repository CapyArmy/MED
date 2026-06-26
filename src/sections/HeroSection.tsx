import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-white pt-[72px]">
      {/* Ambient Gradient Orbs */}
      <motion.div
        animate={{
          x: [0, 60, 0, -60, 0],
          y: [0, -30, 60, -30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[10%] right-[5%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(13,148,136,0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <motion.div
        animate={{
          x: [0, -40, 0, 40, 0],
          y: [0, 60, -40, 60, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[10%] left-[5%] w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(13,148,136,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-8">
          {/* Left Content */}
          <div className="lg:w-[55%] text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0, 0, 0.2, 1] }}
              className="font-['Poppins'] text-[36px] sm:text-[42px] lg:text-[48px] font-semibold text-[#1A202C] leading-[1.15] max-w-[520px] mx-auto lg:mx-0"
            >
              Your Family&apos;s Health, Our Priority
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0, 0, 0.2, 1] }}
              className="font-['Inter'] text-base text-[#4A5568] mt-5 max-w-[480px] mx-auto lg:mx-0 leading-relaxed"
            >
              Compassionate, comprehensive healthcare for every stage of life. From routine checkups to specialized care, our dedicated team is here for you.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6, ease: [0, 0, 0.2, 1] }}
              className="mt-8"
            >
              <Link
                to="/book-appointment"
                className="inline-block bg-[#0D9488] text-white font-['Inter'] text-sm font-semibold tracking-[0.02em] px-7 py-3.5 rounded-xl shadow-[0_2px_8px_rgba(13,148,136,0.25)] hover:bg-[#0F766E] hover:shadow-[0_4px_16px_rgba(13,148,136,0.35)] hover:scale-[1.02] transition-all duration-200"
              >
                Book an Appointment
              </Link>
            </motion.div>
          </div>

          {/* Right Image */}
          <div className="lg:w-[45%] relative">
            {/* Decorative offset card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0, 0, 0.2, 1] }}
              className="absolute top-6 -right-6 w-full h-full rounded-[20px] bg-[#0D9488]/[0.08]"
            />
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0, 0, 0.2, 1] }}
              className="relative rounded-[20px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
            >
              <img
                src="/assets/hero-clinic.jpg"
                alt="MED+ Medical Clinic interior"
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
