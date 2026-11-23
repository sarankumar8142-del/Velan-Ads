import { useEffect, useState } from 'react';
import { Expand, MessageCircle, X } from 'lucide-react';
import {
  PORTFOLIO_ITEMS,
  SERVICE_CATEGORIES,
  getWhatsAppUrl,
  type PortfolioItem,
  type ServiceCategory,
} from '../data/businessData';
import { CmykRule, SafeImage } from './CmykMark';

export function PortfolioSection() {
  const [filter, setFilter] = useState<ServiceCategory>('all');
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);

  const visibleItems =
    filter === 'all'
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === filter);

  useEffect(() => {
    if (!activeItem) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItem]);

  return (
    <section id="portfolio" className="border-b border-slate-200/80 bg-[#FAFAF9] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <CmykRule />
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0C1220] sm:text-4xl">
              Print Showcase & Material Gallery
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Explore representative print finishes—from exterior acrylic signage and
              wide-format vinyl rolls to matte-laminated brochures, event invitations,
              and custom product stickers.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter print gallery"
            className="flex flex-wrap items-center gap-1.5 rounded-xl bg-slate-200/70 p-1.5"
          >
            {SERVICE_CATEGORIES.map((category) => {
              const isSelected = filter === category.id;
              const label = category.id === 'all' ? 'All Finishes' : category.label;
              return (
                <button
                  key={category.id}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  onClick={() => setFilter(category.id)}
                  className={`min-h-[40px] rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0369A1] sm:text-sm ${
                    isSelected
                      ? 'bg-white text-[#0C1220] shadow-xs'
                      : 'text-slate-600 hover:text-[#0C1220]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetric Editorial Gallery Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6">
          {visibleItems.map((item, idx) => {
            const spanClass =
              visibleItems.length >= 4 && idx < 2
                ? 'lg:col-span-3'
                : 'lg:col-span-2';

            return (
              <article
                key={item.id}
                className={`group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white ${spanClass}`}
              >
                <button
                  type="button"
                  onClick={() => setActiveItem(item)}
                  aria-label={`Inspect ${item.title}`}
                  className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 text-left focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#0369A1]"
                >
                  <SafeImage
                    src={item.image}
                    alt={item.alt}
                    title={item.title}
                    className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                  />
                  <span className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#0C1220]/75 text-white backdrop-blur-xs transition-opacity duration-150 group-hover:bg-[#0C1220]">
                    <Expand className="h-4 w-4" aria-hidden="true" />
                  </span>
                </button>

                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      <span>{item.categoryLabel}</span>
                      <span className="mx-1.5 text-slate-300" aria-hidden="true">
                        ·
                      </span>
                      <span>{item.specs.split('·')[0].trim()}</span>
                    </p>
                    <h3 className="mt-2 font-display text-lg font-bold tracking-tight text-[#0C1220]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {item.caption}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                    <button
                      type="button"
                      onClick={() => setActiveItem(item)}
                      className="text-xs font-semibold text-[#0369A1] hover:text-[#0C4A6E] transition-colors whitespace-nowrap"
                    >
                      View print specs
                    </button>
                    <a
                      href={getWhatsAppUrl(
                        `Hello Velan Ads Digital Printer, I saw "${item.title}" in your showcase and would like pricing for a similar print.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15803D] hover:text-[#166534] transition-colors whitespace-nowrap"
                    >
                      <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Ask price</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Lightbox Detail Modal */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0C1220]/75 p-4 backdrop-blur-xs"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveItem(null)}
              aria-label="Close preview"
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#0C1220]/80 text-white transition-colors hover:bg-[#0C1220] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="aspect-[4/3] w-full bg-slate-100 sm:aspect-[16/10]">
              <SafeImage
                src={activeItem.image}
                alt={activeItem.alt}
                title={activeItem.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-xs font-medium text-[#0369A1]">
                {activeItem.categoryLabel}
              </p>
              <h3
                id="lightbox-title"
                className="mt-1.5 font-display text-2xl font-bold text-[#0C1220]"
              >
                {activeItem.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                {activeItem.caption}
              </p>

              <dl className="mt-5 grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-[#FAFAF9] p-4 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-semibold text-[#0C1220]">
                    Typical Substrates & Finish
                  </dt>
                  <dd className="mt-1 text-xs leading-relaxed text-slate-600">
                    {activeItem.specs}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-[#0C1220]">
                    Common Local Uses
                  </dt>
                  <dd className="mt-1 text-xs leading-relaxed text-slate-600">
                    {activeItem.applications}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveItem(null)}
                  className="min-h-[44px] rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-[#0C1220] hover:bg-slate-50"
                >
                  Close
                </button>
                <a
                  href={getWhatsAppUrl(
                    `Hello Velan Ads Digital Printer, I would like a quote similar to "${activeItem.title}" (${activeItem.specs}).`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#15803D] px-5 py-2 text-sm font-semibold text-white hover:bg-[#166534]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  <span>Request Quote on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
