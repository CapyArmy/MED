import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface SignUpFormProps {
  onSwitchToLogin: () => void;
}

export default function SignUpForm({ onSwitchToLogin }: SignUpFormProps) {
  const { signUp } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!firstName.trim() || !lastName.trim()) {
      setError("Please enter your first and last name.");
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }

    if (!email.trim() || password.length < 6) {
      setError("Please enter a valid email and password (min 6 characters).");
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }

    setLoading(true);
    const { error: signUpError } = await signUp(email, password, {
      first_name: firstName,
      last_name: lastName,
    });
    setLoading(false);

    if (signUpError) {
      setError(signUpError.message || "Failed to create account.");
      setShake(true);
      setTimeout(() => setShake(false), 400);
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="max-w-[420px] mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.06)] text-center"
        >
          <div className="w-16 h-16 rounded-full bg-[#16A34A]/10 flex items-center justify-center mx-auto">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="font-['Poppins'] text-xl font-semibold text-[#1A202C] mt-5">
            Account Created!
          </h3>
          <p className="font-['Inter'] text-sm text-[#4A5568] mt-3">
            Your account has been created. You can now sign in with your credentials.
          </p>
          <button
            onClick={onSwitchToLogin}
            className="mt-6 w-full bg-[#0D9488] text-white font-['Inter'] text-sm font-semibold py-3.5 rounded-xl hover:bg-[#0F766E] transition-colors"
          >
            Sign In
          </button>
        </motion.div>
      </div>
    );
  }

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
        Create Account
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="font-['Inter'] text-sm text-[#4A5568] text-center mt-2"
      >
        Join MED+ to manage your health records
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

          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => { setFirstName(e.target.value); setError(""); }}
              className="w-full h-12 px-4 border border-[#E2E8F0] rounded-xl font-['Inter'] text-sm transition-all duration-200 outline-none focus:border-[#0D9488] focus:ring-[3px] focus:ring-[rgba(13,148,136,0.15)]"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => { setLastName(e.target.value); setError(""); }}
              className="w-full h-12 px-4 border border-[#E2E8F0] rounded-xl font-['Inter'] text-sm transition-all duration-200 outline-none focus:border-[#0D9488] focus:ring-[3px] focus:ring-[rgba(13,148,136,0.15)]"
            />
          </div>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            className="w-full h-12 px-4 border border-[#E2E8F0] rounded-xl font-['Inter'] text-sm transition-all duration-200 outline-none focus:border-[#0D9488] focus:ring-[3px] focus:ring-[rgba(13,148,136,0.15)]"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              className="w-full h-12 px-4 pr-12 border border-[#E2E8F0] rounded-xl font-['Inter'] text-sm transition-all duration-200 outline-none focus:border-[#0D9488] focus:ring-[3px] focus:ring-[rgba(13,148,136,0.15)]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#4A5568] transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => { setConfirmPassword(e.target.value); setError(""); }}
            className="w-full h-12 px-4 border border-[#E2E8F0] rounded-xl font-['Inter'] text-sm transition-all duration-200 outline-none focus:border-[#0D9488] focus:ring-[3px] focus:ring-[rgba(13,148,136,0.15)]"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0D9488] text-white font-['Inter'] text-sm font-semibold tracking-[0.02em] py-3.5 rounded-xl shadow-[0_2px_8px_rgba(13,148,136,0.25)] hover:bg-[#0F766E] hover:scale-[1.01] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </motion.form>

        <div className="border-t border-[#E2E8F0] mt-6 pt-6 text-center">
          <p className="font-['Inter'] text-sm text-[#4A5568]">
            Already have an account?{" "}
            <button
              onClick={onSwitchToLogin}
              className="text-[#0D9488] hover:underline font-medium"
            >
              Sign In
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
