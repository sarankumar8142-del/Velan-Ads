import { ArrowRight, MapPin, MessageCircle, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { BUSINESS, getPhoneHref, getWhatsAppUrl } from '../data/businessData';
import { CmykRule, SafeImage } from './CmykMark';

export function HeroSection() {
  const heroWhatsApp = getWhatsAppUrl(
    'Hello Velan Ads Digital Printer, I would like to request a printing quote for my requirement in Medavakkam.'
  );

  return (
    <section id="top" className="relative border-b border-slate-200/80 bg-[#FAFAF9]">
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 lg:px-8 lg:pb-16 lg:pt-14">
        {/* Balanced 2-Column Split with items-stretch */}
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Editorial Value Proposition Column */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between lg:col-span-6"
          >
            <div>
              <div className="mb-5 flex flex-col gap-3">
                <CmykRule />
                <p className="text-sm font-medium text-slate-600">
                  <span>{BUSINESS.category}</span>
                  <span className="mx-2 text-slate-300" aria-hidden="true">
                    ·
                  </span>
                  <span className="text-[#0369A1] font-semibold">
                    {BUSINESS.locationShort}
                  </span>
                </p>
              </div>

              <h1
                className="font-display font-bold tracking-tight text-[#0C1220]"
                style={{
                  fontSize: 'clamp(2.25rem, 4vw, 3.6rem)',
                  lineHeight: 1.08,
                }}
              >
                Your Trusted Digital Printing Partner in Medavakkam
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                From crisp digital business cards, brochures, flyers, and event
                invitations to vibrant outdoor flex banners, eco-solvent vinyl
                graphics, and commercial shop signage—Velan Ads Digital Printer
                delivers reliable commercial printing across Medavakkam and
                Chennai.
              </p>

              {/* Single Dominant Primary CTA + Secondary Direct Phone Call */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={heroWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-lg bg-[#15803D] px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#166534] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#15803D]"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Send Enquiry on WhatsApp</span>
                </a>

                <a
                  href={getPhoneHref()}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 font-mono text-sm font-semibold text-[#0C1220] tabular-nums transition-colors duration-150 hover:border-slate-400 hover:bg-slate-50 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0369A1]"
                >
                  <Phone className="h-4 w-4 text-[#0369A1] shrink-0" aria-hidden="true" />
                  <span>{BUSINESS.phoneDisplay}</span>
                </a>
              </div>
            </div>

            {/* Quiet Practical Orientation Line */}
            <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-200 pt-5 text-sm text-slate-600">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-[#0369A1]" aria-hidden="true" />
                <span>{BUSINESS.locationFull}</span>
              </span>
              <a
                href="#services"
                className="inline-flex items-center gap-1 font-semibold text-[#0369A1] hover:text-[#0C4A6E] transition-colors whitespace-nowrap"
              >
                <span>Explore all 11 print services</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </motion.div>

          {/* Dominant Focal Visual Carrier */}
          <motion.div
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="relative h-full min-h-[280px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 sm:min-h-[360px]">
              <SafeImage
                src="/src/assets/images/hero_digital_press_1795405331390.jpg"
                alt="Commercial digital printing press producing crisp full-color marketing prints and posters at a modern studio"
                title="Commercial Digital Production Press"
                loading="eager"
                className="h-full w-full object-cover"
              />
              {/* Measured Bottom Contrast Scrim for Subtle Editorial Caption */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0C1220]/85 via-[#0C1220]/40 to-transparent px-6 pb-5 pt-16">
                <p className="text-xs font-medium tracking-wide text-slate-200">
                  Digital Press · Wide-Format Flex & Vinyl · Commercial Signage
                </p>
                <p className="mt-1 font-display text-base font-semibold text-white">
                  Precision color output for storefronts, offices, and family events in Chennai
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-Width Print Scope Strip Below Hero Split */}
        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white px-5 py-4">
            <p className="font-mono text-xs font-medium text-[#0369A1]">01</p>
            <p className="mt-1 font-display text-sm font-semibold text-[#0C1220]">
              Commercial Digital Prints
            </p>
            <p className="mt-0.5 text-xs leading-relaxed text-slate-600">
              Visiting cards, brochures, flyers, posters, and office stationery.
            </p>
          </div>
          <div className="bg-white px-5 py-4">
            <p className="font-mono text-xs font-medium text-[#D90368]">02</p>
            <p className="mt-1 font-display text-sm font-semibold text-[#0C1220]">
              Flex Banners & Vinyl
            </p>
            <p className="mt-0.5 text-xs leading-relaxed text-slate-600">
              Outdoor star flex, backlit boards, glass vinyl, and standees.
            </p>
          </div>
          <div className="bg-white px-5 py-4">
            <p className="font-mono text-xs font-medium text-[#B45309]">03</p>
            <p className="mt-1 font-display text-sm font-semibold text-[#0C1220]">
              Invitations & Stickers
            </p>
            <p className="mt-0.5 text-xs leading-relaxed text-slate-600">
              Custom event cards, die-cut packaging labels, and brand stickers.
            </p>
          </div>
          <div className="bg-white px-5 py-4">
            <p className="font-mono text-xs font-medium text-[#0C1220]">04</p>
            <p className="mt-1 font-display text-sm font-semibold text-[#0C1220]">
              Direct Medavakkam Support
            </p>
            <p className="mt-0.5 text-xs leading-relaxed text-slate-600">
              Share files on WhatsApp for fast material advice and clear pricing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
