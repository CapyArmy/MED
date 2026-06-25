import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "./LoginForm";
import PatientDashboard from "./PatientDashboard";

export default function PortalContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <section className="py-20 bg-[#F0F4F4] min-h-[600px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <AnimatePresence mode="wait">
          {!isAuthenticated ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <LoginForm onLogin={() => setIsAuthenticated(true)} />
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <PatientDashboard onLogout={() => setIsAuthenticated(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
