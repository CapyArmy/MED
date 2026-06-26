import { useState } from "react";
import type { FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CircleCheck as CheckCircle } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { supabase } from "@/lib/supabase";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactErrors {
  [key: string]: string;
}

export default function ContactFormSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: ContactErrors = {};
    if (!formData.name.trim()) newErrors.name = "This field is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = "This field is required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Please enter a valid email address";

    if (!formData.subject.trim()) newErrors.subject = "This field is required";
    if (!formData.message.trim() || formData.message.length < 10)
      newErrors.message = "Please enter a message of at least 10 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }

    setLoading(true);
    const { error } = await supabase.from('contact_messages').insert({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    });
    setLoading(false);

    if (error) {
      setErrors({ submit: "Failed to send message. Please try again." });
      setShake(true);
      setTimeout(() => setShake(false), 400);
    } else {
      setSubmitted(true);
    }
  };

  const handleChange = (field: keyof ContactFormData, value: string) => {
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
    <section className="py-20 bg-[#F8FAFA]">
      <div className="max-w-[720px] mx-auto px-6">
        <SectionHeading
          label="SEND US A MESSAGE"
          heading="We'd Love to Hear From You"
          description="Have a question, comment, or feedback? Fill out the form below and we'll get back to you as soon as possible."
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl p-8 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.06)] mt-10"
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                animate={shake ? { x: [-4, 4, -4, 4, 0] } : { x: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-5"
                exit={{ opacity: 0 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className={inputClass("name")}
                    />
                    <AnimatePresence>
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-[#DC2626] text-xs mt-1.5 font-['Inter']"
                        >
                          {errors.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
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
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={(e) => handleChange("subject", e.target.value)}
                    className={inputClass("subject")}
                  />
                  <AnimatePresence>
                    {errors.subject && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-[#DC2626] text-xs mt-1.5 font-['Inter']"
                      >
                        {errors.subject}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <textarea
                    placeholder="Your message..."
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    className={`w-full min-h-[150px] px-4 py-4 border rounded-xl font-['Inter'] text-sm resize-y transition-all duration-200 outline-none ${
                      errors.message
                        ? "border-[#DC2626] bg-[#FEF2F2] focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/15"
                        : "border-[#E2E8F0] focus:border-[#0D9488] focus:ring-[3px] focus:ring-[rgba(13,148,136,0.15)]"
                    }`}
                  />
                  <AnimatePresence>
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-[#DC2626] text-xs mt-1.5 font-['Inter']"
                      >
                        {errors.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="pt-2">
                  {errors.submit && (
                    <p className="text-[#DC2626] text-xs mb-3 font-['Inter'] text-center">
                      {errors.submit}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#0D9488] text-white font-['Inter'] text-sm font-semibold tracking-[0.02em] px-7 py-3.5 rounded-xl shadow-[0_2px_8px_rgba(13,148,136,0.25)] hover:bg-[#0F766E] hover:shadow-[0_4px_16px_rgba(13,148,136,0.35)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 rounded-full bg-[#16A34A]/10 flex items-center justify-center mx-auto">
                  <CheckCircle size={48} className="text-[#16A34A]" />
                </div>
                <h3 className="font-['Poppins'] text-xl font-semibold text-[#16A34A] mt-5">
                  Message Sent!
                </h3>
                <p className="font-['Inter'] text-base text-[#4A5568] mt-3 leading-relaxed">
                  Thank you for reaching out. We&apos;ll respond within 1-2 business days.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", subject: "", message: "" });
                    setErrors({});
                  }}
                  className="mt-6 font-['Inter'] text-sm font-medium text-[#0D9488] hover:underline"
                >
                  Send Another Message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
