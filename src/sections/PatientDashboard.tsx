import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Calendar,
  HeartPulse,
  Pill,
  Bell,
  CalendarPlus,
  MessageSquare,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  AlertCircle,
  LogOut,
} from "lucide-react";

interface PatientDashboardProps {
  onLogout: () => void;
}

const quickStats = [
  { icon: Calendar, value: "3", label: "Upcoming Appointments" },
  { icon: HeartPulse, value: "92%", label: "Health Score" },
  { icon: Pill, value: "Active", label: "Medication Status" },
];

const appointments = [
  {
    day: "15",
    month: "JAN",
    title: "Dr. Emily Chen \u2014 Family Medicine",
    time: "10:30 AM \u2014 11:00 AM",
    status: "Confirmed",
  },
  {
    day: "22",
    month: "JAN",
    title: "Dr. Michael Torres",
    time: "2:00 PM \u2014 2:30 PM",
    status: "Confirmed",
  },
  {
    day: "3",
    month: "FEB",
    title: "Lab Work \u2014 Blood Panel",
    time: "9:00 AM \u2014 9:30 AM",
    status: "Pending",
  },
];

const vitals = [
  { label: "Blood Pressure", value: "120/80", unit: "mmHg", trend: "down", change: "2%" },
  { label: "Heart Rate", value: "72", unit: "bpm", trend: "same", change: "0%" },
  { label: "Weight", value: "165", unit: "lbs", trend: "down", change: "3%" },
  { label: "BMI", value: "24.2", unit: "", trend: "down", change: "1%" },
];

const quickActions = [
  { icon: CalendarPlus, label: "Schedule Appointment" },
  { icon: MessageSquare, label: "Message Your Doctor" },
  { icon: FileText, label: "View Lab Results" },
  { icon: Pill, label: "Refill Prescription" },
];

const reminders = [
  { text: "Annual flu vaccination due \u2014 schedule today" },
  { text: "Follow-up blood work recommended within 2 weeks" },
];

export default function PatientDashboard({ onLogout }: PatientDashboardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <div ref={ref}>
      {/* Welcome Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] mb-8 flex items-center justify-between"
      >
        <div>
          <h2 className="font-['Poppins'] text-xl sm:text-2xl font-semibold text-[#1A202C]">
            Welcome back, Sarah
          </h2>
          <p className="font-['Inter'] text-sm text-[#94A3B8] mt-1">
            Your health dashboard &mdash; last updated: Jan 10, 2025
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0D9488] flex items-center justify-center text-white font-['Poppins'] font-semibold text-sm sm:text-base">
            SM
          </div>
          <button className="relative p-2 text-[#94A3B8] hover:text-[#4A5568] transition-colors">
            <Bell size={22} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#DC2626] rounded-full" />
          </button>
          <button
            onClick={onLogout}
            className="p-2 text-[#94A3B8] hover:text-[#DC2626] transition-colors"
            title="Sign out"
          >
            <LogOut size={20} />
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {quickStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                className="bg-white rounded-xl p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
              >
                <div className="w-10 h-10 rounded-[10px] bg-[#F8FAFA] flex items-center justify-center mb-3">
                  <stat.icon size={20} className="text-[#0D9488]" />
                </div>
                <p className="font-['Poppins'] text-2xl font-semibold text-[#1A202C]">
                  {stat.value}
                </p>
                <p className="font-['Inter'] text-xs font-medium uppercase tracking-[0.04em] text-[#94A3B8] mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Upcoming Appointments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-['Poppins'] text-xl font-semibold text-[#1A202C]">
                Upcoming Appointments
              </h3>
              <span className="font-['Inter'] text-sm text-[#0D9488] hover:underline cursor-pointer">
                View All &rarr;
              </span>
            </div>
            <div className="space-y-0">
              {appointments.map((apt, i) => (
                <div key={i}>
                  <div className="flex items-start gap-4 py-4">
                    <div className="bg-[#F8FAFA] rounded-xl px-4 py-3 text-center shrink-0 min-w-[60px]">
                      <p className="font-['Poppins'] text-xl font-semibold text-[#1A202C]">
                        {apt.day}
                      </p>
                      <p className="font-['Inter'] text-xs font-medium uppercase tracking-[0.04em] text-[#94A3B8]">
                        {apt.month}
                      </p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-['Inter'] text-sm font-semibold text-[#1A202C]">
                        {apt.title}
                      </p>
                      <p className="font-['Inter'] text-xs text-[#94A3B8] mt-1">
                        {apt.time}
                      </p>
                      <div className="flex items-center gap-1.5 mt-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            apt.status === "Confirmed"
                              ? "bg-[#16A34A]"
                              : "bg-[#F59E0B]"
                          }`}
                        />
                        <span
                          className={`font-['Inter'] text-xs font-medium ${
                            apt.status === "Confirmed"
                              ? "text-[#16A34A]"
                              : "text-[#F59E0B]"
                          }`}
                        >
                          {apt.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  {i < appointments.length - 1 && (
                    <div className="border-t border-[#E2E8F0]" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Vitals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
          >
            <h3 className="font-['Poppins'] text-xl font-semibold text-[#1A202C] mb-6">
              Recent Vitals
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {vitals.map((vital) => (
                <div
                  key={vital.label}
                  className="bg-[#F8FAFA] rounded-xl p-4"
                >
                  <p className="font-['Inter'] text-xs font-medium uppercase tracking-[0.04em] text-[#94A3B8]">
                    {vital.label}
                  </p>
                  <p className="font-['Poppins'] text-xl font-semibold text-[#1A202C] mt-1">
                    {vital.value}
                    {vital.unit && (
                      <span className="font-['Inter'] text-xs font-medium text-[#94A3B8] ml-1">
                        {vital.unit}
                      </span>
                    )}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    {vital.trend === "down" && (
                      <>
                        <ArrowDownRight size={14} className="text-[#16A34A]" />
                        <span className="font-['Inter'] text-xs text-[#16A34A]">
                          {vital.change}
                        </span>
                      </>
                    )}
                    {vital.trend === "up" && (
                      <>
                        <ArrowUpRight size={14} className="text-[#DC2626]" />
                        <span className="font-['Inter'] text-xs text-[#DC2626]">
                          {vital.change}
                        </span>
                      </>
                    )}
                    {vital.trend === "same" && (
                      <>
                        <Minus size={14} className="text-[#94A3B8]" />
                        <span className="font-['Inter'] text-xs text-[#94A3B8]">
                          {vital.change}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
          >
            <h4 className="font-['Poppins'] text-base font-semibold text-[#1A202C] mb-4">
              Quick Actions
            </h4>
            <div className="space-y-3">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  className="w-full flex items-center gap-3 bg-[#F8FAFA] hover:bg-[#F0F4F4] rounded-xl px-4 py-4 transition-colors duration-200 text-left"
                >
                  <action.icon size={20} className="text-[#0D9488] shrink-0" />
                  <span className="font-['Inter'] text-sm text-[#1A202C]">
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Health Reminders */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
          >
            <h4 className="font-['Poppins'] text-base font-semibold text-[#1A202C] mb-4">
              Health Reminders
            </h4>
            <div className="space-y-3">
              {reminders.map((reminder, i) => (
                <div
                  key={i}
                  className="bg-[#F8FAFA] rounded-xl p-4 flex items-start gap-3"
                >
                  <AlertCircle size={20} className="text-[#F59E0B] shrink-0 mt-0.5" />
                  <p className="font-['Inter'] text-sm text-[#1A202C]">
                    {reminder.text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
