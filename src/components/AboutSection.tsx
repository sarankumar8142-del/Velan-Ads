import { ArrowRight, MapPin, MessageCircle } from 'lucide-react';
import { BUSINESS, WORKFLOW_STANDARDS, getWhatsAppUrl } from '../data/businessData';
import { CmykRule } from './CmykMark';

export function AboutSection() {
  const discussWhatsApp = getWhatsAppUrl(
    'Hello Velan Ads Digital Printer, I would like guidance on the best print material and pricing for my business in Chennai.'
  );

  return (
    <section id="about" className="border-b border-slate-200/80 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Narrative Column */}
          <div className="lg:col-span-5">
            <CmykRule />
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0C1220] sm:text-4xl">
              Practical Print Craft for Medavakkam & Chennai Businesses
            </h2>

            <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-600">
              <p>
                <strong className="font-semibold text-[#0C1220]">
                  {BUSINESS.name}
                </strong>{' '}
                is a dedicated digital printing and advertising service based in{' '}
                <strong className="font-semibold text-[#0C1220]">
                  Medavakkam, Chennai
                </strong>
                . We help local shop owners, clinics, real estate offices,
                educational centres, startups, and families turn ideas into sharp,
                dependable print materials.
              </p>
              <p>
                Whether you are opening a new storefront on Medavakkam Main Road
                and need outdoor flex banners, acrylic signage, and opening flyers,
                or printing custom invitations, packaging stickers, and visiting
                cards—we focus on clean color reproduction, durable substrates, and
                straightforward communication from file check to handover.
              </p>
            </div>

            {/* Service Area Coverage */}
            <div className="mt-8 border-t border-slate-200 pt-6">
              <p className="flex items-center gap-2 text-xs font-semibold text-[#0C1220]">
                <MapPin className="h-4 w-4 text-[#0369A1]" aria-hidden="true" />
                <span>Serving Customers Across South Chennai</span>
              </p>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                {BUSINESS.serviceAreas.join(' · ')}
              </p>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href={discussWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#0C1220] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-slate-800 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0C1220]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>Discuss Your Print Job</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0369A1] hover:text-[#0C4A6E] transition-colors whitespace-nowrap"
              >
                <span>Open quote builder</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right Workflow Standards Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {WORKFLOW_STANDARDS.map((item) => (
                <div
                  key={item.number}
                  className="rounded-2xl border border-slate-200 bg-[#FAFAF9] p-6"
                >
                  <span className="font-mono text-sm font-semibold text-[#0369A1] tabular-nums">
                    {item.number}.
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold tracking-tight text-[#0C1220]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
