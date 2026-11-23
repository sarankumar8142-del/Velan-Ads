import { MapPin, MessageCircle, Phone } from 'lucide-react';
import {
  BUSINESS,
  PRINT_SERVICES,
  getPhoneHref,
  getWhatsAppUrl,
  type LivePlaceInfo,
} from '../data/businessData';
import { CmykMark } from './CmykMark';

interface FooterProps {
  placeInfo: LivePlaceInfo | null;
}

export function Footer({ placeInfo }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0C1220] text-slate-300">
      {/* Subtle Top CMYK Registration Hairline */}
      <div className="flex h-[3px] w-full" aria-hidden="true">
        <span className="flex-1 bg-[#009FE3]" />
        <span className="flex-1 bg-[#D90368]" />
        <span className="flex-1 bg-[#EAB308]" />
        <span className="flex-1 bg-[#1E293B]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6 md:pb-12 lg:px-8 lg:pt-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Brand & Direct Contact */}
          <div className="lg:col-span-4">
            <a
              href="#top"
              className="inline-flex items-center gap-2.5 font-display text-lg font-bold tracking-tight text-white"
            >
              <CmykMark size="sm" />
              <span>{BUSINESS.name}</span>
            </a>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-300">
              Digital printing and advertising services in Medavakkam, Chennai.
              Reliable print output for storefronts, local enterprises,
              corporate offices, and family celebrations.
            </p>

            <div className="mt-6 space-y-2.5 text-sm">
              <a
                href={getPhoneHref()}
                className="flex items-center gap-2.5 font-mono font-semibold text-white tabular-nums hover:text-[#38BDF8] transition-colors"
              >
                <Phone className="h-4 w-4 text-[#38BDF8]" aria-hidden="true" />
                <span>{BUSINESS.phoneDisplay}</span>
              </a>

              <a
                href={getWhatsAppUrl(
                  `Hello ${BUSINESS.name}, I found your website and would like to enquire about printing services.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>WhatsApp Enquiry (+91 91504 21389)</span>
              </a>

              <p className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#38BDF8]" aria-hidden="true" />
                <span>
                  {placeInfo?.foundSpecificBusiness
                    ? placeInfo.formattedAddress
                    : BUSINESS.locationFull}
                </span>
              </p>
            </div>
          </div>

          {/* All Printing Services Navigation */}
          <div className="lg:col-span-5">
            <h3 className="font-display text-sm font-semibold tracking-wide text-white">
              Printing & Advertising Services
            </h3>
            <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
              {PRINT_SERVICES.map((service) => (
                <li key={service.id}>
                  <a
                    href={`#service-${service.id}`}
                    className="text-slate-300 transition-colors hover:text-white"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links & Local Service Areas */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-semibold tracking-wide text-white">
              Quick Navigation
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#top" className="text-slate-300 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="text-slate-300 hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#portfolio" className="text-slate-300 hover:text-white transition-colors">
                  Print Showcase
                </a>
              </li>
              <li>
                <a href="#about" className="text-slate-300 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#faq" className="text-slate-300 hover:text-white transition-colors">
                  Reviews & FAQ
                </a>
              </li>
              <li>
                <a href="#location" className="text-slate-300 hover:text-white transition-colors">
                  Medavakkam Location Map
                </a>
              </li>
              <li>
                <a href="#contact" className="text-slate-300 hover:text-white transition-colors">
                  Request Print Quote
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Attribution Row */}
        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-slate-800 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center">
          <p>
            © {year} {BUSINESS.name}, Medavakkam, Chennai, Tamil Nadu. All rights reserved.
          </p>
          <p>
            Interactive location map powered by Google Maps Platform (subject to{' '}
            <a
              href="https://maps.google.com/help/terms_maps/?utm_campaign=gmp_mcp_codeassist_v1_aistudio"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-slate-200"
            >
              Google Maps End User Terms
            </a>
            ).
          </p>
        </div>
      </div>
    </footer>
  );
}
