import PageHeader from "@/components/PageHeader";
import PortalContent from "@/sections/PortalContent";

export default function PortalPage() {
  return (
    <>
      <PageHeader
        breadcrumb="Patient Portal"
        title="Patient Portal"
        subtitle="Access your health records, upcoming appointments, and communicate with your care team — all in one secure place."
      />
      <PortalContent />
    </>
  );
}
