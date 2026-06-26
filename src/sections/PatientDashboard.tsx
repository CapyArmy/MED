import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Calendar, HeartPulse, Pill, Bell, CalendarPlus, MessageSquare, FileText, ArrowUpRight, ArrowDownRight, Minus, CircleAlert as AlertCircle, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase, type AppointmentWithDetails, type Vital } from "@/lib/supabase";

const quickActions = [
  { icon: CalendarPlus, label: "Schedule Appointment", path: "/book-appointment" },
  { icon: MessageSquare, label: "Message Your Doctor", path: "#" },
  { icon: FileText, label: "View Lab Results", path: "#" },
  { icon: Pill, label: "Refill Prescription", path: "#" },
];

const reminders = [
  { text: "Annual flu vaccination due \u2014 schedule today" },
  { text: "Follow-up blood work recommended within 2 weeks" },
];

export default function PatientDashboard() {
  const { user, profile, signOut } = useAuth();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const [appointments, setAppointments] = useState<AppointmentWithDetails[]>([]);
  const [vitals, setVitals] = useState<Vital | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      setLoading(true);

      // Fetch appointments
      const { data: appointmentsData } = await supabase
        .from('appointments')
        .select(`
          *,
          doctors (*),
          services (*)
        `)
        .eq('patient_id', user.id)
        .in('status', ['pending', 'confirmed'])
        .order('appointment_date', { ascending: true })
        .limit(5);

      if (appointmentsData) {
        setAppointments(appointmentsData as AppointmentWithDetails[]);
      }

      // Fetch latest vitals
      const { data: vitalsData } = await supabase
        .from('vitals')
        .select('*')
        .eq('patient_id', user.id)
        .order('recorded_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (vitalsData) {
        setVitals(vitalsData);
      }

      setLoading(false);
    };

    fetchData();
  }, [user]);

  const getInitials = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase();
    }
    return user?.email?.substring(0, 2).toUpperCase() || "U";
  };

  const getFirstName = () => {
    return profile?.first_name || "Patient";
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      day: date.getDate().toString(),
      month: date.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
    };
  };

  const upcomingCount = appointments.filter(a => a.status === 'pending' || a.status === 'confirmed').length;

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
            Welcome back, {getFirstName()}
          </h2>
          <p className="font-['Inter'] text-sm text-[#94A3B8] mt-1">
            Your health dashboard &mdash; last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0D9488] flex items-center justify-center text-white font-['Poppins'] font-semibold text-sm sm:text-base">
            {getInitials()}
          </div>
          <button className="relative p-2 text-[#94A3B8] hover:text-[#4A5568] transition-colors">
            <Bell size={22} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#DC2626] rounded-full" />
          </button>
          <button
            onClick={signOut}
            className="p-2 text-[#94A3B8] hover:text-[#DC2626] transition-colors"
            title="Sign out"
          >
            <LogOut size={20} />
          </button>
        </div>
      </motion.div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0D9488]" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-white rounded-xl p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
              >
                <div className="w-10 h-10 rounded-[10px] bg-[#F8FAFA] flex items-center justify-center mb-3">
                  <Calendar size={20} className="text-[#0D9488]" />
                </div>
                <p className="font-['Poppins'] text-2xl font-semibold text-[#1A202C]">
                  {upcomingCount}
                </p>
                <p className="font-['Inter'] text-xs font-medium uppercase tracking-[0.04em] text-[#94A3B8] mt-1">
                  Upcoming Appointments
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-white rounded-xl p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
              >
                <div className="w-10 h-10 rounded-[10px] bg-[#F8FAFA] flex items-center justify-center mb-3">
                  <HeartPulse size={20} className="text-[#0D9488]" />
                </div>
                <p className="font-['Poppins'] text-2xl font-semibold text-[#1A202C]">
                  92%
                </p>
                <p className="font-['Inter'] text-xs font-medium uppercase tracking-[0.04em] text-[#94A3B8] mt-1">
                  Health Score
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="bg-white rounded-xl p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
              >
                <div className="w-10 h-10 rounded-[10px] bg-[#F8FAFA] flex items-center justify-center mb-3">
                  <Pill size={20} className="text-[#0D9488]" />
                </div>
                <p className="font-['Poppins'] text-2xl font-semibold text-[#1A202C]">
                  Active
                </p>
                <p className="font-['Inter'] text-xs font-medium uppercase tracking-[0.04em] text-[#94A3B8] mt-1">
                  Medication Status
                </p>
              </motion.div>
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
                <Link to="/book-appointment" className="font-['Inter'] text-sm text-[#0D9488] hover:underline">
                  Book New &rarr;
                </Link>
              </div>
              {appointments.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar size={40} className="text-[#94A3B8] mx-auto mb-3" />
                  <p className="font-['Inter'] text-sm text-[#4A5568]">
                    No upcoming appointments
                  </p>
                  <Link
                    to="/book-appointment"
                    className="inline-block mt-3 font-['Inter'] text-sm text-[#0D9488] hover:underline"
                  >
                    Schedule your first appointment &rarr;
                  </Link>
                </div>
              ) : (
                <div className="space-y-0">
                  {appointments.map((apt, i) => {
                    const dateInfo = formatDate(apt.appointment_date);
                    return (
                      <div key={apt.id}>
                        <div className="flex items-start gap-4 py-4">
                          <div className="bg-[#F8FAFA] rounded-xl px-4 py-3 text-center shrink-0 min-w-[60px]">
                            <p className="font-['Poppins'] text-xl font-semibold text-[#1A202C]">
                              {dateInfo.day}
                            </p>
                            <p className="font-['Inter'] text-xs font-medium uppercase tracking-[0.04em] text-[#94A3B8]">
                              {dateInfo.month}
                            </p>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-['Inter'] text-sm font-semibold text-[#1A202C]">
                              {apt.doctors?.name || apt.services?.name || "Appointment"}
                            </p>
                            <p className="font-['Inter'] text-xs text-[#94A3B8] mt-1">
                              {apt.time_slot}
                            </p>
                            <div className="flex items-center gap-1.5 mt-2">
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  apt.status === "confirmed"
                                    ? "bg-[#16A34A]"
                                    : "bg-[#F59E0B]"
                                }`}
                              />
                              <span
                                className={`font-['Inter'] text-xs font-medium capitalize ${
                                  apt.status === "confirmed"
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
                    );
                  })}
                </div>
              )}
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
              {vitals ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {vitals.blood_pressure_systolic && vitals.blood_pressure_diastolic && (
                    <div className="bg-[#F8FAFA] rounded-xl p-4">
                      <p className="font-['Inter'] text-xs font-medium uppercase tracking-[0.04em] text-[#94A3B8]">
                        Blood Pressure
                      </p>
                      <p className="font-['Poppins'] text-xl font-semibold text-[#1A202C] mt-1">
                        {vitals.blood_pressure_systolic}/{vitals.blood_pressure_diastolic}
                        <span className="font-['Inter'] text-xs font-medium text-[#94A3B8] ml-1">
                          mmHg
                        </span>
                      </p>
                    </div>
                  )}
                  {vitals.heart_rate && (
                    <div className="bg-[#F8FAFA] rounded-xl p-4">
                      <p className="font-['Inter'] text-xs font-medium uppercase tracking-[0.04em] text-[#94A3B8]">
                        Heart Rate
                      </p>
                      <p className="font-['Poppins'] text-xl font-semibold text-[#1A202C] mt-1">
                        {vitals.heart_rate}
                        <span className="font-['Inter'] text-xs font-medium text-[#94A3B8] ml-1">
                          bpm
                        </span>
                      </p>
                    </div>
                  )}
                  {vitals.weight && (
                    <div className="bg-[#F8FAFA] rounded-xl p-4">
                      <p className="font-['Inter'] text-xs font-medium uppercase tracking-[0.04em] text-[#94A3B8]">
                        Weight
                      </p>
                      <p className="font-['Poppins'] text-xl font-semibold text-[#1A202C] mt-1">
                        {vitals.weight}
                        <span className="font-['Inter'] text-xs font-medium text-[#94A3B8] ml-1">
                          lbs
                        </span>
                      </p>
                    </div>
                  )}
                  {vitals.bmi && (
                    <div className="bg-[#F8FAFA] rounded-xl p-4">
                      <p className="font-['Inter'] text-xs font-medium uppercase tracking-[0.04em] text-[#94A3B8]">
                        BMI
                      </p>
                      <p className="font-['Poppins'] text-xl font-semibold text-[#1A202C] mt-1">
                        {vitals.bmi}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-6">
                  <HeartPulse size={40} className="text-[#94A3B8] mx-auto mb-3" />
                  <p className="font-['Inter'] text-sm text-[#4A5568]">
                    No vitals recorded yet
                  </p>
                </div>
              )}
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
                  <Link
                    key={action.label}
                    to={action.path}
                    className="w-full flex items-center gap-3 bg-[#F8FAFA] hover:bg-[#F0F4F4] rounded-xl px-4 py-4 transition-colors duration-200 text-left"
                  >
                    <action.icon size={20} className="text-[#0D9488] shrink-0" />
                    <span className="font-['Inter'] text-sm text-[#1A202C]">
                      {action.label}
                    </span>
                  </Link>
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
      )}
    </div>
  );
}
