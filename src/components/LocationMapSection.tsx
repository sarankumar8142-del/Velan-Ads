import { useEffect, useState } from 'react';
import {
  APIProvider,
  APILoadingStatus,
  AdvancedMarker,
  InfoWindow,
  Map as GoogleMap,
  Pin,
  useAdvancedMarkerRef,
  useApiLoadingStatus,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
import { ExternalLink, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react';
import {
  BUSINESS,
  getPhoneHref,
  getWhatsAppUrl,
  type LivePlaceInfo,
} from '../data/businessData';
import { CmykRule } from './CmykMark';

const MAPS_API_KEY = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined) || '';
const ATTRIBUTION_IDS = ['gmp_mcp_codeassist_v1_aistudio'];

interface LocationMapSectionProps {
  onPlaceResolved: (info: LivePlaceInfo | null) => void;
  quotaExceeded: boolean;
}

export function LocationMapSection({
  onPlaceResolved,
  quotaExceeded,
}: LocationMapSectionProps) {
  const [resolvedPlace, setResolvedPlace] = useState<LivePlaceInfo | null>(null);
  const [lookupState, setLookupState] = useState<'loading' | 'ready' | 'unavailable'>(
    MAPS_API_KEY ? 'loading' : 'unavailable'
  );

  const handleResolved = (info: LivePlaceInfo | null) => {
    setResolvedPlace(info);
    setLookupState(info ? 'ready' : 'unavailable');
    onPlaceResolved(info);
  };

  const askLocationWhatsApp = getWhatsAppUrl(
    'Hello Velan Ads Digital Printer, please share your exact Medavakkam shop landmark and live location pin.'
  );

  const externalMapsUrl =
    resolvedPlace?.googleMapsURI ||
    'https://www.google.com/maps/search/?api=1&query=Velan+Ads+Digital+Printer+Medavakkam+Chennai';

  return (
    <section
      id="location"
      className="border-b border-slate-200/80 bg-white py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Left Location Info Panel */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-[#FAFAF9] p-6 sm:p-8 lg:col-span-5">
            <div>
              <CmykRule />
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0C1220]">
                Visit Us in Medavakkam, Chennai
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                Conveniently located for walk-in print proofing, banner pickups,
                and local advertising consultations in Medavakkam, Chennai.
              </p>

              <dl className="mt-6 space-y-4 border-t border-slate-200 pt-6 text-sm">
                <div>
                  <dt className="text-xs font-semibold text-slate-500">
                    {resolvedPlace?.foundSpecificBusiness
                      ? 'Verified Google Maps Address'
                      : 'Service Location'}
                  </dt>
                  <dd className="mt-1 font-medium text-[#0C1220]">
                    {resolvedPlace?.foundSpecificBusiness
                      ? resolvedPlace.formattedAddress
                      : BUSINESS.locationFull}
                  </dd>
                  {!resolvedPlace?.foundSpecificBusiness && (
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                      Exact street door number is shared directly upon enquiry so
                      you always reach the right entrance—message us on WhatsApp
                      for our live shop pin before visiting.
                    </p>
                  )}
                </div>

                {resolvedPlace?.foundSpecificBusiness &&
                  resolvedPlace.weekdayDescriptions &&
                  resolvedPlace.weekdayDescriptions.length > 0 && (
                    <div>
                      <dt className="text-xs font-semibold text-slate-500">
                        Opening Hours (Google Maps)
                      </dt>
                      <dd className="mt-1 space-y-0.5 text-xs text-slate-600 tabular-nums">
                        {resolvedPlace.weekdayDescriptions.map((line) => (
                          <p key={line}>{line}</p>
                        ))}
                      </dd>
                    </div>
                  )}

                <div>
                  <dt className="text-xs font-semibold text-slate-500">
                    Direct Phone & WhatsApp
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={getPhoneHref()}
                      className="inline-flex items-center gap-2 font-mono text-base font-semibold text-[#0369A1] tabular-nums hover:text-[#0C4A6E]"
                    >
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      <span>{BUSINESS.phoneDisplay}</span>
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-8 flex flex-col gap-2.5 sm:flex-row lg:flex-col">
              <a
                href={askLocationWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#15803D] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#166534] whitespace-nowrap"
              >
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Request Exact Location Pin on WhatsApp</span>
              </a>
              <a
                href={externalMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-[#0C1220] transition-colors hover:bg-slate-50 whitespace-nowrap"
              >
                <Navigation className="h-4 w-4 text-[#0369A1] shrink-0" aria-hidden="true" />
                <span>Open in Google Maps</span>
                <ExternalLink className="h-3.5 w-3.5 text-slate-400 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right Interactive Google Maps Canvas */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 lg:col-span-7">
            <div className="relative h-[380px] w-full sm:h-[440px] lg:h-full lg:min-h-[440px]">
              {MAPS_API_KEY && !quotaExceeded ? (
                <APIProvider
                  apiKey={MAPS_API_KEY}
                  language="en"
                  region="IN"
                  libraries={['places', 'marker']}
                  internalUsageAttributionIds={ATTRIBUTION_IDS}
                >
                  <InteractiveMedavakkamMap
                    onPlaceResolved={handleResolved}
                    resolvedPlace={resolvedPlace}
                    lookupState={lookupState}
                    askLocationWhatsApp={askLocationWhatsApp}
                    externalMapsUrl={externalMapsUrl}
                  />
                </APIProvider>
              ) : (
                <MapUnavailableFallback
                  externalMapsUrl={externalMapsUrl}
                  askLocationWhatsApp={askLocationWhatsApp}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface InteractiveMedavakkamMapProps {
  onPlaceResolved: (info: LivePlaceInfo | null) => void;
  resolvedPlace: LivePlaceInfo | null;
  lookupState: 'loading' | 'ready' | 'unavailable';
  askLocationWhatsApp: string;
  externalMapsUrl: string;
}

function InteractiveMedavakkamMap({
  onPlaceResolved,
  resolvedPlace,
  lookupState,
  askLocationWhatsApp,
  externalMapsUrl,
}: InteractiveMedavakkamMapProps) {
  const apiStatus = useApiLoadingStatus();
  const placesLib = useMapsLibrary('places');
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoOpen, setInfoOpen] = useState(true);

  useEffect(() => {
    if (!placesLib) return;
    let cancelled = false;

    async function lookupBusinessOrArea() {
      try {
        const PlaceClass = placesLib?.Place;
        if (!PlaceClass || typeof PlaceClass.searchByText !== 'function') {
          if (!cancelled) onPlaceResolved(null);
          return;
        }

        // Step 1: Search live Google Places (New) for Velan Ads Digital Printer in Medavakkam, Chennai
        const businessRes = await PlaceClass.searchByText({
          textQuery: 'Velan Ads Digital Printer Medavakkam Chennai',
          fields: [
            'displayName',
            'formattedAddress',
            'location',
            'googleMapsURI',
            'rating',
            'userRatingCount',
            'reviews',
            'regularOpeningHours',
          ],
          language: 'en',
          region: 'IN',
          maxResultCount: 3,
        });

        const matchedPlace = businessRes?.places?.find((p) => {
          const name = (p.displayName || '').toLowerCase();
          const addr = (p.formattedAddress || '').toLowerCase();
          return (
            name.includes('velan') &&
            (addr.includes('medavakkam') || addr.includes('chennai'))
          );
        });

        if (matchedPlace?.location) {
          const lat = matchedPlace.location.lat();
          const lng = matchedPlace.location.lng();
          const mappedReviews = (matchedPlace.reviews || [])
            .filter((r) => Boolean(r.text))
            .map((r) => ({
              authorName: r.authorAttribution?.displayName || 'Google Customer',
              authorUri: r.authorAttribution?.uri || undefined,
              rating: typeof r.rating === 'number' ? r.rating : 5,
              text: r.text || '',
              relativeTime: r.relativePublishTimeDescription || '',
            }));

          if (!cancelled) {
            onPlaceResolved({
              foundSpecificBusiness: true,
              displayName: matchedPlace.displayName || BUSINESS.name,
              formattedAddress:
                matchedPlace.formattedAddress || BUSINESS.locationFull,
              location: { lat, lng },
              googleMapsURI: matchedPlace.googleMapsURI || undefined,
              rating:
                typeof matchedPlace.rating === 'number'
                  ? matchedPlace.rating
                  : undefined,
              userRatingCount:
                typeof matchedPlace.userRatingCount === 'number'
                  ? matchedPlace.userRatingCount
                  : undefined,
              weekdayDescriptions:
                matchedPlace.regularOpeningHours?.weekdayDescriptions || undefined,
              reviews: mappedReviews,
            });
          }
          return;
        }

        // Step 2: Resolve verified Medavakkam, Chennai area center live via Places API (New)
        const areaRes = await PlaceClass.searchByText({
          textQuery: 'Medavakkam, Chennai, Tamil Nadu, India',
          fields: ['displayName', 'formattedAddress', 'location', 'googleMapsURI'],
          language: 'en',
          region: 'IN',
          maxResultCount: 1,
        });

        const areaPlace = areaRes?.places?.[0];
        if (areaPlace?.location && !cancelled) {
          onPlaceResolved({
            foundSpecificBusiness: false,
            displayName: `${BUSINESS.name} — Service Area`,
            formattedAddress:
              areaPlace.formattedAddress || BUSINESS.locationFull,
            location: {
              lat: areaPlace.location.lat(),
              lng: areaPlace.location.lng(),
            },
            googleMapsURI: areaPlace.googleMapsURI || undefined,
          });
          return;
        }

        if (!cancelled) onPlaceResolved(null);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        if (
          message.includes('OVER_QUERY_LIMIT') ||
          message.includes('RESOURCE_EXHAUSTED') ||
          message.includes('429')
        ) {
          window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        }
        if (!cancelled) onPlaceResolved(null);
      }
    }

    lookupBusinessOrArea();
    return () => {
      cancelled = true;
    };
  }, [placesLib]);

  if (
    apiStatus === APILoadingStatus.FAILED ||
    apiStatus === APILoadingStatus.AUTH_FAILURE
  ) {
    return (
      <MapUnavailableFallback
        externalMapsUrl={externalMapsUrl}
        askLocationWhatsApp={askLocationWhatsApp}
      />
    );
  }

  if (lookupState === 'loading' || !resolvedPlace) {
    if (lookupState === 'unavailable') {
      return (
        <MapUnavailableFallback
          externalMapsUrl={externalMapsUrl}
          askLocationWhatsApp={askLocationWhatsApp}
        />
      );
    }
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-slate-100 p-6 text-center">
        <MapPin className="h-7 w-7 text-[#0369A1]" aria-hidden="true" />
        <p className="mt-3 font-display text-sm font-semibold text-[#0C1220]">
          Loading Medavakkam, Chennai Map...
        </p>
        <p className="mt-1 text-xs text-slate-500">
          Fetching live location data via Google Maps Platform
        </p>
      </div>
    );
  }

  return (
    <GoogleMap
      mapId="DEMO_MAP_ID"
      defaultCenter={resolvedPlace.location}
      defaultZoom={resolvedPlace.foundSpecificBusiness ? 16 : 14}
      gestureHandling="cooperative"
      internalUsageAttributionIds={ATTRIBUTION_IDS}
      style={{ width: '100%', height: '100%' }}
    >
      <AdvancedMarker
        ref={markerRef}
        position={resolvedPlace.location}
        title={resolvedPlace.displayName}
        onClick={() => setInfoOpen((open) => !open)}
      >
        <Pin
          background="#0369A1"
          borderColor="#0C1220"
          glyphColor="#FFFFFF"
        />
      </AdvancedMarker>

      {infoOpen && marker && (
        <InfoWindow
          anchor={marker}
          maxWidth={270}
          onCloseClick={() => setInfoOpen(false)}
        >
          <div className="p-1 text-left">
            <p className="font-display text-sm font-bold text-[#0C1220]">
              {BUSINESS.name}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">
              {resolvedPlace.foundSpecificBusiness
                ? resolvedPlace.formattedAddress
                : `${BUSINESS.locationFull} — Contact ${BUSINESS.phoneDisplay} for exact shop landmark.`}
            </p>
            <div className="mt-2.5 flex items-center gap-3 text-xs font-semibold">
              <a
                href={getPhoneHref()}
                className="text-[#0369A1] hover:underline"
              >
                Call Now
              </a>
              <a
                href={askLocationWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#15803D] hover:underline"
              >
                WhatsApp Pin
              </a>
            </div>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

function MapUnavailableFallback({
  externalMapsUrl,
  askLocationWhatsApp,
}: {
  externalMapsUrl: string;
  askLocationWhatsApp: string;
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#F8FAFC] to-[#E2E8F0] p-8 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#0369A1]">
        <MapPin className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="mt-4 font-display text-lg font-bold text-[#0C1220]">
        {BUSINESS.name} · {BUSINESS.locationShort}
      </h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-600">
        Interactive map preview is temporarily unavailable. Open Google Maps
        directly or message us on WhatsApp to receive our exact shop landmark in
        Medavakkam.
      </p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        <a
          href={askLocationWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[42px] items-center gap-2 rounded-lg bg-[#15803D] px-4 py-2 text-xs font-semibold text-white hover:bg-[#166534]"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          <span>Get Pin on WhatsApp</span>
        </a>
        <a
          href={externalMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[42px] items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-[#0C1220] hover:bg-slate-50"
        >
          <span>Open Google Maps</span>
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
