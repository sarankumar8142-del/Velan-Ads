import { useEffect, useState, type FormEvent } from 'react';
import { Check, Copy, MapPin, MessageCircle, Phone } from 'lucide-react';
import {
  BUSINESS,
  PRINT_SERVICES,
  getPhoneHref,
  getWhatsAppUrl,
  type LivePlaceInfo,
} from '../data/businessData';
import { CmykRule } from './CmykMark';

interface ContactSectionProps {
  preselectedService: string;
  placeInfo: LivePlaceInfo | null;
}

type ArtworkStatus = 'ready' | 'need-design' | 'not-sure';

export function ContactSection({
  preselectedService,
  placeInfo,
}: ContactSectionProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(
    preselectedService || PRINT_SERVICES[0].title
  );
  const [sizeQty, setSizeQty] = useState('');
  const [artworkStatus, setArtworkStatus] = useState<ArtworkStatus>('ready');
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedBrief, setCopiedBrief] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
    }
  }, [preselectedService]);

  const buildSummaryText = () => {
    const artworkLabels: Record<ArtworkStatus, string> = {
      ready: 'Print-ready artwork available',
      'need-design': 'Need design / layout support',
      'not-sure': 'Need material & file guidance',
    };

    return [
      `Hello ${BUSINESS.name},`,
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      `Service: ${service}`,
      sizeQty.trim() ? `Size / Quantity: ${sizeQty.trim()}` : null,
      `Artwork: ${artworkLabels[artworkStatus]}`,
      notes.trim() ? `Notes: ${notes.trim()}` : null,
      `Location: ${BUSINESS.locationShort}`,
    ]
      .filter(Boolean)
      .join('\n');
  };

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(BUSINESS.phoneRaw);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } catch {
      // Clipboard API unavailable in restricted context
    }
  };

  const handleCopyBrief = async () => {
    if (!submittedMessage) return;
    try {
      await navigator.clipboard.writeText(submittedMessage);
      setCopiedBrief(true);
      setTimeout(() => setCopiedBrief(false), 2000);
    } catch {
      // Clipboard API unavailable
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};

    if (!name.trim() || name.trim().length < 2) {
      nextErrors.name = 'Please enter your name.';
    }

    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 10 || digitsOnly.length > 13) {
      nextErrors.phone = 'Please enter a valid 10-digit mobile number.';
    }

    if (!sizeQty.trim()) {
      nextErrors.sizeQty = 'Please share an approximate size or quantity.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const message = buildSummaryText();
    setSubmittedMessage(message);
  };

  const whatsappDirectUrl = submittedMessage
    ? getWhatsAppUrl(submittedMessage)
    : getWhatsAppUrl(
        `Hello ${BUSINESS.name}, I would like a printing quote in Medavakkam.`
      );

  return (
    <section
      id="contact"
      className="border-b border-slate-200/80 bg-[#FAFAF9] py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left Direct Contact Column */}
          <div className="lg:col-span-5">
            <CmykRule />
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0C1220] sm:text-4xl">
              Get a Fast Print Quote Today
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Speak directly with our Medavakkam printing desk or send your
              dimensions and artwork on WhatsApp for clear pricing.
            </p>

            {/* Primary Phone & WhatsApp Card */}
            <div className="mt-8 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <p className="text-xs font-semibold text-slate-500">
                  Call or WhatsApp Directly
                </p>
                <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                  <a
                    href={getPhoneHref()}
                    className="inline-flex items-center gap-2.5 font-mono text-xl font-bold text-[#0C1220] tabular-nums hover:text-[#0369A1] sm:text-2xl"
                  >
                    <Phone className="h-5 w-5 text-[#0369A1]" aria-hidden="true" />
                    <span>{BUSINESS.phoneDisplay}</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    aria-label="Copy phone number"
                    className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-slate-200 bg-[#FAFAF9] px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 whitespace-nowrap"
                  >
                    {copiedPhone ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#15803D]" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  <a
                    href={getWhatsAppUrl(
                      `Hello ${BUSINESS.name}, I would like to enquire about printing services in Medavakkam.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#15803D] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#166534] whitespace-nowrap"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    <span>WhatsApp Now</span>
                  </a>
                  <a
                    href={getPhoneHref()}
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-[#0C1220] transition-colors hover:bg-slate-50 whitespace-nowrap"
                  >
                    <Phone className="h-4 w-4 text-[#0369A1]" aria-hidden="true" />
                    <span>Call Now</span>
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex items-start gap-3">
                  <MapPin
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#0369A1]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-semibold text-slate-500">
                      Location
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#0C1220]">
                      {BUSINESS.name}
                    </p>
                    <p className="mt-0.5 text-sm text-slate-600">
                      {placeInfo?.foundSpecificBusiness
                        ? placeInfo.formattedAddress
                        : BUSINESS.locationFull}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Interactive Print Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <div className="border-b border-slate-100 pb-5">
                <h3 className="font-display text-xl font-bold text-[#0C1220] sm:text-2xl">
                  Quick Print Enquiry Builder
                </h3>
                <p className="mt-1.5 text-sm text-slate-600">
                  Fill in your job details below to generate a ready-to-send
                  WhatsApp quote request for +91 91504 21389.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="enquiry-name"
                      className="block text-xs font-semibold text-[#0C1220]"
                    >
                      Your Name *
                    </label>
                    <input
                      id="enquiry-name"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((p) => ({ ...p, name: '' }));
                      }}
                      placeholder="e.g., Senthil Kumar"
                      aria-invalid={Boolean(errors.name)}
                      className="mt-1.5 w-full rounded-lg border border-slate-300 bg-[#FAFAF9] px-3.5 py-2.5 text-sm text-[#0C1220] placeholder:text-slate-400 focus:border-[#0369A1] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0369A1]/20"
                    />
                    {errors.name && (
                      <p role="alert" className="mt-1 text-xs font-medium text-red-700">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-phone"
                      className="block text-xs font-semibold text-[#0C1220]"
                    >
                      Mobile Number *
                    </label>
                    <input
                      id="enquiry-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors((p) => ({ ...p, phone: '' }));
                      }}
                      placeholder="e.g., 98400 12345"
                      aria-invalid={Boolean(errors.phone)}
                      className="mt-1.5 w-full rounded-lg border border-slate-300 bg-[#FAFAF9] px-3.5 py-2.5 font-mono text-sm text-[#0C1220] tabular-nums placeholder:font-sans placeholder:text-slate-400 focus:border-[#0369A1] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0369A1]/20"
                    />
                    {errors.phone && (
                      <p role="alert" className="mt-1 text-xs font-medium text-red-700">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="enquiry-service"
                      className="block text-xs font-semibold text-[#0C1220]"
                    >
                      Printing Service *
                    </label>
                    <select
                      id="enquiry-service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="mt-1.5 w-full rounded-lg border border-slate-300 bg-[#FAFAF9] px-3.5 py-2.5 text-sm text-[#0C1220] focus:border-[#0369A1] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0369A1]/20"
                    >
                      {PRINT_SERVICES.map((item) => (
                        <option key={item.id} value={item.title}>
                          {item.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-size-qty"
                      className="block text-xs font-semibold text-[#0C1220]"
                    >
                      Size & Quantity *
                    </label>
                    <input
                      id="enquiry-size-qty"
                      type="text"
                      value={sizeQty}
                      onChange={(e) => {
                        setSizeQty(e.target.value);
                        if (errors.sizeQty)
                          setErrors((p) => ({ ...p, sizeQty: '' }));
                      }}
                      placeholder="e.g., 10x4 ft flex (2 nos) or 500 cards"
                      aria-invalid={Boolean(errors.sizeQty)}
                      className="mt-1.5 w-full rounded-lg border border-slate-300 bg-[#FAFAF9] px-3.5 py-2.5 text-sm text-[#0C1220] placeholder:text-slate-400 focus:border-[#0369A1] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0369A1]/20"
                    />
                    {errors.sizeQty && (
                      <p role="alert" className="mt-1 text-xs font-medium text-red-700">
                        {errors.sizeQty}
                      </p>
                    )}
                  </div>
                </div>

                {/* Artwork Status Selector */}
                <fieldset>
                  <legend className="text-xs font-semibold text-[#0C1220]">
                    Artwork Status
                  </legend>
                  <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {[
                      { id: 'ready', label: 'File Ready to Print' },
                      { id: 'need-design', label: 'Need Design Help' },
                      { id: 'not-sure', label: 'Need Advice' },
                    ].map((opt) => {
                      const active = artworkStatus === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() =>
                            setArtworkStatus(opt.id as ArtworkStatus)
                          }
                          aria-pressed={active}
                          className={`min-h-[42px] rounded-lg border px-3 py-2 text-xs font-semibold transition-colors whitespace-nowrap ${
                            active
                              ? 'border-[#0369A1] bg-[#0369A1]/10 text-[#0C4A6E]'
                              : 'border-slate-200 bg-[#FAFAF9] text-slate-600 hover:border-slate-300 hover:text-[#0C1220]'
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div>
                  <label
                    htmlFor="enquiry-notes"
                    className="block text-xs font-semibold text-[#0C1220]"
                  >
                    Additional Details (Optional)
                  </label>
                  <textarea
                    id="enquiry-notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Preferred paper/material finish, lamination, or required delivery date..."
                    className="mt-1.5 w-full rounded-lg border border-slate-300 bg-[#FAFAF9] px-3.5 py-2.5 text-sm text-[#0C1220] placeholder:text-slate-400 focus:border-[#0369A1] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0369A1]/20"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="submit"
                    className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg bg-[#0C1220] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0C1220]"
                  >
                    <span>Prepare WhatsApp Enquiry</span>
                  </button>
                  <span className="text-xs text-slate-500">
                    No spam—sends directly to {BUSINESS.phoneDisplay}
                  </span>
                </div>
              </form>

              {/* Confirmation & Direct WhatsApp Launch State */}
              {submittedMessage && (
                <div
                  role="status"
                  className="mt-6 rounded-xl border border-[#15803D]/30 bg-[#F0FDF4] p-5"
                >
                  <p className="text-sm font-semibold text-[#14532D]">
                    Your print enquiry is ready to send
                  </p>
                  <pre className="mt-2.5 overflow-x-auto whitespace-pre-wrap rounded-lg border border-[#15803D]/15 bg-white p-3.5 font-mono text-xs leading-relaxed text-slate-700">
                    {submittedMessage}
                  </pre>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <a
                      href={whatsappDirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#15803D] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#166534] whitespace-nowrap"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      <span>Open in WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyBrief}
                      className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-[#0C1220] hover:bg-slate-50 whitespace-nowrap"
                    >
                      {copiedBrief ? (
                        <>
                          <Check className="h-4 w-4 text-[#15803D]" aria-hidden="true" />
                          <span>Brief Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" aria-hidden="true" />
                          <span>Copy Enquiry Text</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
