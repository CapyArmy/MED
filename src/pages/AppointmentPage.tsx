import PageHeader from "@/components/PageHeader";
import AppointmentForm from "@/sections/AppointmentForm";
import FormSidebar from "@/sections/FormSidebar";

export default function AppointmentPage() {
  return (
    <>
      <PageHeader
        breadcrumb="Book Appointment"
        title="Book an Appointment"
        subtitle="Schedule your visit with our care team. For urgent medical concerns, please call us directly at (555) 123-4567."
      />
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-[55%]">
              <AppointmentForm />
            </div>
            <div className="lg:w-[45%]">
              <FormSidebar />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
