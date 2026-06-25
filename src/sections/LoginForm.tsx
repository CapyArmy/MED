import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

interface LoginFormProps {
  onLogin: () => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || password.length < 6) {
      setError("Please enter a valid email/patient ID and password.");
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }

    onLogin();
  };

  return (
    <div className="max-w-[420px] mx-auto">
      {/* Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="flex justify-center mb-5"
      >
        <svg width="64" height="64" viewBox="0 0 28 28" fill="none">
          <path d="M14 2C14 2 8 8 8 14C8 17.3137 10.6863 20 14 20C17.3137 20 20 17.3137 20 14C20 8 14 2 14 2Z" fill="#0D9488" fillOpacity="0.2" />
          <path d="M14 8V20M8 14H20" stroke="#0D9488" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="14" cy="14" r="11" stroke="#0D9488" strokeWidth="1.5" fill="none" />
        </svg>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="font-['Poppins'] text-[28px] font-semibold text-[#1A202C] text-center"
      >
        Patient Sign In
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="font-['Inter'] text-sm text-[#4A5568] text-center mt-2"
      >
        Sign in to access your health information
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white rounded-2xl p-8 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.06)] mt-8"
      >
        <motion.form
          onSubmit={handleSubmit}
          animate={shake ? { x: [-4, 4, -4, 4, 0] } : { x: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-4"
        >
          {error && (
            <p className="text-[#DC2626] text-xs text-center font-['Inter'] mb-2">
              {error}
            </p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <input
              type="text"
              placeholder="Email or Patient ID"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className="w-full h-12 px-4 border border-[#E2E8F0] rounded-xl font-['Inter'] text-sm transition-all duration-200 outline-none focus:border-[#0D9488] focus:ring-[3px] focus:ring-[rgba(13,148,136,0.15)]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.3 }}
            className="relative"
          >
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="w-full h-12 px-4 pr-12 border border-[#E2E8F0] rounded-xl font-['Inter'] text-sm transition-all duration-200 outline-none focus:border-[#0D9488] focus:ring-[3px] focus:ring-[rgba(13,148,136,0.15)]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#4A5568] transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.46, duration: 0.3 }}
            className="flex items-center gap-2.5"
          >
            <button
              type="button"
              onClick={() => setRememberMe(!rememberMe)}
              className={`w-5 h-5 rounded border transition-all duration-200 flex items-center justify-center ${
                rememberMe
                  ? "bg-[#0D9488] border-[#0D9488]"
                  : "border-[#E2E8F0] bg-white"
              }`}
            >
              {rememberMe && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
            <span className="font-['Inter'] text-sm text-[#4A5568]">
              Remember me
            </span>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.54, duration: 0.3 }}
            type="submit"
            className="w-full bg-[#0D9488] text-white font-['Inter'] text-sm font-semibold tracking-[0.02em] py-3.5 rounded-xl shadow-[0_2px_8px_rgba(13,148,136,0.25)] hover:bg-[#0F766E] hover:scale-[1.01] transition-all duration-200"
          >
            Sign In
          </motion.button>
        </motion.form>

        <p className="text-center mt-4">
          <span className="font-['Inter'] text-sm text-[#0D9488] hover:underline cursor-pointer">
            Forgot your password?
          </span>
        </p>

        <div className="border-t border-[#E2E8F0] mt-6 pt-6">
          <p className="font-['Inter'] text-xs font-medium uppercase tracking-[0.04em] text-[#94A3B8] text-center">
            For demo purposes, enter any email and password to sign in.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
