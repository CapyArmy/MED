import { useState, useRef } from "react";
import type { FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  preferredDate: string;
  department: string;
  preferredTime: string;
  reason: string;
}

interface FormErrors {
  [key: string]: string;
}

const departments = [
  "Family Medicine",
  "Pediatric Care",
  "Women's Health",
  "Preventive Care",
  "Chronic Disease Management",
  "Urgent Care",
];

const timeSlots = [
  "Morning (8AM - 12PM)",
  "Afternoon (12PM - 4PM)",
  "Evening (4PM - 6PM)",
];

export default function AppointmentForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    preferredDate: "",
    department: "",
    preferredTime: "",
    reason: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showModal, setShowModal] = useState(false);
  const [shake, setShake] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const today = new Date().toISOString().split("T")[0];

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "This field is required";
    if (!formData.lastName.trim()) newErrors.lastName = "This field is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = "This field is required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Please enter a valid email address";

    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (!formData.phone.trim()) newErrors.phone = "This field is required";
    else if (phoneDigits.length < 10) newErrors.phone = "Please enter a valid phone number";

    if (!formData.dob) newErrors.dob = "This field is required";
    if (!formData.preferredDate) newErrors.preferredDate = "This field is required";
    else if (formData.preferredDate < today) newErrors.preferredDate = "Please select a valid date";

    if (!formData.department) newErrors.department = "This field is required";
    if (!formData.preferredTime) newErrors.preferredTime = "This field is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setShowModal(true);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      // Focus first error field
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const el = document.getElementById(firstErrorField);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
        el?.focus();
      }
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const inputClass = (field: string) =>
    `w-full h-12 px-4 border rounded-xl font-['Inter'] text-sm transition-all duration-200 outline-none ${
      errors[field]
        ? "border-[#DC2626] bg-[#FEF2F2] focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/15"
        : "border-[#E2E8F0] focus:border-[#0D9488] focus:ring-[3px] focus:ring-[rgba(13,148,136,0.15)]"
    }`;

  return (
    <>
      <span className="font-['Inter'] text-xs font-medium uppercase tracking-[0.04em] text-[#0D9488] mb-6 block">
        PATIENT INFORMATION
      </span>

      <motion.form
        ref={formRef}
        onSubmit={handleSubmit}
        animate={shake ? { x: [-4, 4, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-5"
      >
        {/* Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <input
              id="firstName"
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              className={inputClass("firstName")}
            />
            <AnimatePresence>
              {errors.firstName && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[#DC2626] text-xs mt-1.5 font-['Inter']"
                >
                  {errors.firstName}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <div>
            <input
              id="lastName"
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              className={inputClass("lastName")}
            />
            <AnimatePresence>
              {errors.lastName && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[#DC2626] text-xs mt-1.5 font-['Inter']"
                >
                  {errors.lastName}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <input
              id="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={inputClass("email")}
            />
            <AnimatePresence>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[#DC2626] text-xs mt-1.5 font-['Inter']"
                >
                  {errors.email}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <div>
            <input
              id="phone"
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className={inputClass("phone")}
            />
            <AnimatePresence>
              {errors.phone && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[#DC2626] text-xs mt-1.5 font-['Inter']"
                >
                  {errors.phone}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <input
              id="dob"
              type="date"
              value={formData.dob}
              onChange={(e) => handleChange("dob", e.target.value)}
              className={inputClass("dob")}
            />
            <AnimatePresence>
              {errors.dob && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[#DC2626] text-xs mt-1.5 font-['Inter']"
                >
                  {errors.dob}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <div>
            <input
              id="preferredDate"
              type="date"
              min={today}
              value={formData.preferredDate}
              onChange={(e) => handleChange("preferredDate", e.target.value)}
              className={inputClass("preferredDate")}
            />
            <AnimatePresence>
              {errors.preferredDate && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[#DC2626] text-xs mt-1.5 font-['Inter']"
                >
                  {errors.preferredDate}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Row 4 - Department */}
        <div>
          <select
            id="department"
            value={formData.department}
            onChange={(e) => handleChange("department", e.target.value)}
            className={inputClass("department") + " appearance-none cursor-pointer bg-white"}
          >
            <option value="">Select Department</option>
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <AnimatePresence>
            {errors.department && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-[#DC2626] text-xs mt-1.5 font-['Inter']"
              >
                {errors.department}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Row 5 - Preferred Time */}
        <div>
          <select
            id="preferredTime"
            value={formData.preferredTime}
            onChange={(e) => handleChange("preferredTime", e.target.value)}
            className={inputClass("preferredTime") + " appearance-none cursor-pointer bg-white"}
          >
            <option value="">Select Preferred Time</option>
            {timeSlots.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <AnimatePresence>
            {errors.preferredTime && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-[#DC2626] text-xs mt-1.5 font-['Inter']"
              >
                {errors.preferredTime}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Row 6 - Reason */}
        <div>
          <textarea
            id="reason"
            placeholder="Please briefly describe your symptoms or reason for the visit..."
            value={formData.reason}
            onChange={(e) => handleChange("reason", e.target.value)}
            className="w-full min-h-[120px] px-4 py-4 border border-[#E2E8F0] rounded-xl font-['Inter'] text-sm resize-y transition-all duration-200 outline-none focus:border-[#0D9488] focus:ring-[3px] focus:ring-[rgba(13,148,136,0.15)]"
          />
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full sm:w-auto bg-[#0D9488] text-white font-['Inter'] text-sm font-semibold tracking-[0.02em] px-7 py-3.5 rounded-xl shadow-[0_2px_8px_rgba(13,148,136,0.25)] hover:bg-[#0F766E] hover:shadow-[0_4px_16px_rgba(13,148,136,0.35)] transition-all duration-200"
          >
            Book Appointment
          </button>
          <p className="font-['Inter'] text-xs font-medium uppercase tracking-[0.04em] text-[#94A3B8] mt-3">
            Our team will confirm your appointment within 24 hours via email or phone.
          </p>
        </div>
      </motion.form>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4"
            style={{ backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
            onClick={() => {
              setShowModal(false);
              setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                dob: "",
                preferredDate: "",
                department: "",
                preferredTime: "",
                reason: "",
              });
              setErrors({});
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0, 0, 0.2, 1], delay: 0.1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[20px] p-10 sm:p-12 max-w-[480px] w-full shadow-[0_24px_64px_rgba(0,0,0,0.15)] text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 12,
                  delay: 0.3,
                }}
                className="w-20 h-20 rounded-full bg-[#16A34A]/10 flex items-center justify-center mx-auto"
              >
                <CheckCircle size={40} className="text-[#16A34A]" />
              </motion.div>

              <h2 className="font-['Poppins'] text-[28px] font-semibold text-[#1A202C] mt-6">
                Appointment Request Received!
              </h2>
              <p className="font-['Inter'] text-base text-[#4A5568] mt-4 leading-relaxed">
                Thank you, {formData.firstName || "Patient"}! Your appointment request has been submitted. Our team will review your request and contact you within 24 hours to confirm your appointment details.
              </p>

              <div className="bg-[#F8FAFA] rounded-xl p-5 mt-6 text-left space-y-3">
                <div>
                  <span className="font-['Inter'] text-xs font-medium uppercase tracking-[0.04em] text-[#94A3B8]">
                    Department:
                  </span>{" "}
                  <span className="font-['Inter'] text-sm text-[#1A202C]">
                    {formData.department}
                  </span>
                </div>
                <div>
                  <span className="font-['Inter'] text-xs font-medium uppercase tracking-[0.04em] text-[#94A3B8]">
                    Preferred Date:
                  </span>{" "}
                  <span className="font-['Inter'] text-sm text-[#1A202C]">
                    {formData.preferredDate}
                  </span>
                </div>
                <div>
                  <span className="font-['Inter'] text-xs font-medium uppercase tracking-[0.04em] text-[#94A3B8]">
                    Preferred Time:
                  </span>{" "}
                  <span className="font-['Inter'] text-sm text-[#1A202C]">
                    {formData.preferredTime}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowModal(false);
                  setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    dob: "",
                    preferredDate: "",
                    department: "",
                    preferredTime: "",
                    reason: "",
                  });
                  setErrors({});
                }}
                className="w-full mt-8 bg-[#0D9488] text-white font-['Inter'] text-sm font-semibold tracking-[0.02em] py-3.5 rounded-xl shadow-[0_2px_8px_rgba(13,148,136,0.25)] hover:bg-[#0F766E] transition-all duration-200"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
