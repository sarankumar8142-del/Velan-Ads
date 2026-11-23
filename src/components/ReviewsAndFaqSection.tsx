import { useState } from 'react';
import { ChevronDown, ExternalLink, MessageCircle, Star } from 'lucide-react';
import {
  BUSINESS,
  FAQ_ITEMS,
  getWhatsAppUrl,
  type LivePlaceInfo,
} from '../data/businessData';
import { CmykRule } from './CmykMark';

interface ReviewsAndFaqSectionProps {
  placeInfo: LivePlaceInfo | null;
}

export function ReviewsAndFaqSection({ placeInfo }: ReviewsAndFaqSectionProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const verifiedReviews =
    placeInfo?.foundSpecificBusiness && placeInfo.reviews && placeInfo.reviews.length > 0
      ? placeInfo.reviews
      : [];

  const shareFeedbackWhatsApp = getWhatsAppUrl(
    'Hello Velan Ads Digital Printer, I recently printed with you and would like to share my customer feedback:'
  );

  return (
    <section
      id="faq"
      className="border-b border-slate-200/80 bg-[#FAFAF9] py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Part 1: Verified Customer Testimonials / Feedback */}
        <div id="testimonials" className="pb-16 lg:pb-20">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <CmykRule />
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0C1220] sm:text-4xl">
                Customer Testimonials & Verified Feedback
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                Trust is earned print by print. We only display genuine, verified
                customer reviews—never fabricated quotes or stock ratings.
              </p>
            </div>

            {placeInfo?.foundSpecificBusiness &&
              typeof placeInfo.rating === 'number' && (
                <div className="rounded-xl border border-slate-200 bg-white px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <Star
                      className="h-4 w-4 fill-[#EAB308] text-[#EAB308]"
                      aria-hidden="true"
                    />
                    <span className="font-mono text-lg font-bold text-[#0C1220] tabular-nums">
                      {placeInfo.rating.toFixed(1)}
                    </span>
                    {typeof placeInfo.userRatingCount === 'number' && (
                      <span className="text-xs text-slate-500 tabular-nums">
                        ({placeInfo.userRatingCount} Google reviews)
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-[11px] text-slate-500">
                    Verified live via Google Maps
                  </p>
                </div>
              )}
          </div>

          {verifiedReviews.length > 0 ? (
            <div className="mt-8">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {verifiedReviews.slice(0, 6).map((review, index) => (
                  <article
                    key={`${review.authorName}-${index}`}
                    className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                        <span
                          className="inline-flex items-center gap-1 font-mono font-semibold text-[#0C1220] tabular-nums"
                          aria-label={`${review.rating} out of 5 stars`}
                        >
                          <Star
                            className="h-3.5 w-3.5 fill-[#EAB308] text-[#EAB308]"
                            aria-hidden="true"
                          />
                          {review.rating.toFixed(1)}
                        </span>
                        <span>{review.relativeTime}</span>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-slate-700">
                        “{review.text}”
                      </p>
                    </div>
                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3.5 text-xs">
                      <span className="font-semibold text-[#0C1220]">
                        {review.authorName}
                      </span>
                      <span className="text-slate-400">Google Review</span>
                    </div>
                  </article>
                ))}
              </div>
              {placeInfo?.googleMapsURI && (
                <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
                  <span>Reviews sourced live from Google Maps.</span>
                  <a
                    href={placeInfo.googleMapsURI}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-[#0369A1] hover:text-[#0C4A6E]"
                  >
                    <span>Read all reviews on Google</span>
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <p className="text-xs font-semibold text-[#0369A1]">
                  Verified Reviews Policy · {BUSINESS.locationShort}
                </p>
                <h3 className="mt-2 font-display text-xl font-bold text-[#0C1220] sm:text-2xl">
                  Printed with {BUSINESS.name}? Share your experience.
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                  To keep this website transparent and trustworthy, we do not publish
                  placeholder or unverified testimonials. Verified Google reviews
                  display here automatically when linked to our Google Business
                  Profile, and you can send your feedback directly to our Medavakkam
                  team on WhatsApp.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
                <a
                  href={shareFeedbackWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#15803D] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#166534] whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  <span>Send Feedback on WhatsApp</span>
                </a>
                {placeInfo?.googleMapsURI && (
                  <a
                    href={placeInfo.googleMapsURI}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-[#0C1220] transition-colors hover:bg-slate-50 whitespace-nowrap shrink-0"
                  >
                    <span>Google Profile</span>
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Part 2: Frequently Asked Questions */}
        <div className="border-t border-slate-200 pt-16 lg:pt-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <CmykRule />
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0C1220]">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                Quick answers about print file preparation, order quantities, flex
                and vinyl options, and coordinating your print job in Medavakkam.
              </p>
              <a
                href={getWhatsAppUrl(
                  'Hello Velan Ads Digital Printer, I have a question about printing my project:'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-[#0C1220] transition-colors hover:border-slate-400 hover:bg-slate-50 whitespace-nowrap"
              >
                <MessageCircle className="h-4 w-4 text-[#15803D]" aria-hidden="true" />
                <span>Ask another question</span>
              </a>
            </div>

            <div className="lg:col-span-8">
              <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
                {FAQ_ITEMS.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div key={faq.question} className="px-6 py-1">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${index}`}
                        onClick={() =>
                          setOpenFaqIndex(isOpen ? null : index)
                        }
                        className="flex w-full items-center justify-between gap-4 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0369A1]"
                      >
                        <span className="font-display text-base font-semibold text-[#0C1220] sm:text-lg">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-[#0369A1]' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                      {isOpen && (
                        <div
                          id={`faq-panel-${index}`}
                          className="pb-5 pr-8 text-sm leading-relaxed text-slate-600 sm:text-base"
                        >
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
