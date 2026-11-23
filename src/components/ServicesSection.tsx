import { useState } from 'react';
import { ArrowUpRight, FileText, MessageCircle } from 'lucide-react';
import {
  PRINT_SERVICES,
  SERVICE_CATEGORIES,
  getWhatsAppUrl,
  type PrintService,
  type ServiceCategory,
} from '../data/businessData';
import { CmykRule } from './CmykMark';

interface ServicesSectionProps {
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export function ServicesSection({ onSelectServiceForQuote }: ServicesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');

  const filteredServices =
    activeCategory === 'all'
      ? PRINT_SERVICES
      : PRINT_SERVICES.filter((service) => service.category === activeCategory);

  return (
    <section id="services" className="border-b border-slate-200/80 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header + Filter Bar */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <CmykRule />
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0C1220] sm:text-4xl">
              Complete Digital Printing & Advertising Services
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Every print medium you need to promote a storefront, launch an event,
              or equip a business in Medavakkam and across Chennai—handled under one roof.
            </p>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter printing services by category"
            className="flex flex-wrap items-center gap-1.5 rounded-xl bg-slate-100 p-1.5"
          >
            {SERVICE_CATEGORIES.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(category.id)}
                  className={`min-h-[40px] rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0369A1] sm:text-sm ${
                    isActive
                      ? 'bg-white text-[#0C1220] shadow-xs'
                      : 'text-slate-600 hover:text-[#0C1220]'
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetric Editorial Service Grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service, index) => {
            const isMarqueeSpan =
              activeCategory === 'all' && (index === 0 || index === 1);
            return (
              <ServiceCard
                key={service.id}
                service={service}
                wide={isMarqueeSpan && index === 0}
                onSelectForQuote={onSelectServiceForQuote}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface ServiceCardProps {
  service: PrintService;
  wide?: boolean;
  onSelectForQuote: (serviceTitle: string) => void;
}

function ServiceCard({ service, wide = false, onSelectForQuote }: ServiceCardProps) {
  const whatsappHref = getWhatsAppUrl(service.whatsappPrompt);

  return (
    <article
      id={`service-${service.id}`}
      className={`group flex flex-col justify-between rounded-2xl border border-slate-200 bg-[#FAFAF9] p-6 transition-colors duration-150 hover:border-slate-300 hover:bg-white ${
        wide ? 'md:col-span-2 lg:col-span-2' : ''
      }`}
    >
      <div>
        {/* Clean Unboxed Metadata Line */}
        <div className="flex items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-mono font-semibold text-[#0369A1] tabular-nums">
              {service.number}.
            </span>
            <span>{service.categoryLabel}</span>
          </div>
          <span className="font-mono text-[11px] text-slate-400">Medavakkam</span>
        </div>

        <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-[#0C1220]">
          {service.title}
        </h3>

        <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
          {service.summary}
        </p>

        {/* Print Specifications */}
        <dl className="mt-5 space-y-2 border-t border-slate-200/80 pt-4 text-xs">
          <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
            <dt className="font-semibold text-[#0C1220] shrink-0">Media & Finish:</dt>
            <dd className="text-slate-600">{service.materials}</dd>
          </div>
          <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
            <dt className="font-semibold text-[#0C1220] shrink-0">Ideal For:</dt>
            <dd className="text-slate-600">{service.bestFor}</dd>
          </div>
        </dl>
      </div>

      {/* Direct Action Footer */}
      <div className="mt-6 flex flex-wrap items-center gap-2.5 border-t border-slate-200/80 pt-4">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-[#15803D] px-3.5 py-2 text-xs font-semibold text-white transition-colors duration-150 hover:bg-[#166534] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#15803D]"
        >
          <MessageCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>Enquire on WhatsApp</span>
          <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        </a>

        <button
          type="button"
          onClick={() => onSelectForQuote(service.title)}
          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-[#0C1220] transition-colors duration-150 hover:border-slate-400 hover:bg-slate-50 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0369A1]"
        >
          <FileText className="h-3.5 w-3.5 text-[#0369A1] shrink-0" aria-hidden="true" />
          <span>Build Quote</span>
        </button>
      </div>
    </article>
  );
}
