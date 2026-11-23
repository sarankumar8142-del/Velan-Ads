import { MessageCircle, Phone } from 'lucide-react';
import { BUSINESS, getPhoneHref, getWhatsAppUrl } from '../data/businessData';

export function MobileStickyBar() {
  const quickWhatsApp = getWhatsAppUrl(
    `Hello ${BUSINESS.name}, I would like to enquire about digital printing in Medavakkam.`
  );

  return (
    <div
      role="region"
      aria-label="Quick contact actions"
      className="fixed inset-x-0 bottom-0 z-40 grid h-12 grid-cols-2 border-t border-slate-200 bg-white shadow-sm md:hidden"
    >
      <a
        href={getPhoneHref()}
        className="flex items-center justify-center gap-2 border-r border-slate-200 bg-white text-xs font-semibold text-[#0C1220] active:bg-slate-100 whitespace-nowrap"
      >
        <Phone className="h-4 w-4 text-[#0369A1]" aria-hidden="true" />
        <span>Call Now</span>
      </a>
      <a
        href={quickWhatsApp}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-[#15803D] text-xs font-semibold text-white active:bg-[#166534] whitespace-nowrap"
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        <span>WhatsApp Quote</span>
      </a>
    </div>
  );
}
