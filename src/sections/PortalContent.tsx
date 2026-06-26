import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import PatientDashboard from "./PatientDashboard";

export default function PortalContent() {
  const { user, loading } = useAuth();
  const [showSignUp, setShowSignUp] = useState(false);

  if (loading) {
    return (
      <section className="py-20 bg-[#F0F4F4] min-h-[600px]">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0D9488]" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-[#F0F4F4] min-h-[600px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <AnimatePresence mode="wait">
          {!user ? (
            <AnimatePresence mode="wait">
              {!showSignUp ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <LoginForm onSwitchToSignUp={() => setShowSignUp(true)} />
                </motion.div>
              ) : (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <SignUpForm onSwitchToLogin={() => setShowSignUp(false)} />
                </motion.div>
              )}
            </AnimatePresence>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <PatientDashboard />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
