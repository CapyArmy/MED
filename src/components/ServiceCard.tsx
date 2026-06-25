import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function ServiceCard({ icon: Icon, title, description }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 transition-all duration-250">
      <div className="w-12 h-12 rounded-xl bg-[#F8FAFA] flex items-center justify-center mb-5">
        <Icon size={24} className="text-[#0D9488]" />
      </div>
      <h3 className="font-['Poppins'] text-xl font-semibold text-[#1A202C] mb-3">
        {title}
      </h3>
      <p className="font-['Inter'] text-sm text-[#4A5568] leading-relaxed mb-4">
        {description}
      </p>
      <Link
        to="/services"
        className="inline-flex items-center gap-1.5 font-['Inter'] text-sm font-medium text-[#0D9488] hover:underline transition-all duration-200"
      >
        Learn More
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </div>
  );
}
