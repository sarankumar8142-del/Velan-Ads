export const BUSINESS = {
  name: 'Velan Ads Digital Printer',
  category: 'Digital Printing and Advertising Services',
  locationShort: 'Medavakkam, Chennai',
  locationFull: 'Medavakkam, Chennai, Tamil Nadu, India',
  phoneDisplay: '+91 91504 21389',
  phoneRaw: '+919150421389',
  whatsappNumber: '919150421389',
  serviceAreas: [
    'Medavakkam',
    'Pallikaranai',
    'Velachery',
    'Sholinganallur',
    'Perumbakkam',
    'Tambaram',
    'Madipakkam',
    'OMR & ECR Corridor',
  ],
} as const;

export function getWhatsAppUrl(message: string): string {
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function getPhoneHref(): string {
  return `tel:${BUSINESS.phoneRaw}`;
}

export type ServiceCategory = 'all' | 'large-format' | 'commercial' | 'events-custom';

export interface PrintService {
  id: string;
  number: string;
  title: string;
  category: Exclude<ServiceCategory, 'all'>;
  categoryLabel: string;
  summary: string;
  materials: string;
  bestFor: string;
  featured?: boolean;
  whatsappPrompt: string;
}

export const SERVICE_CATEGORIES: { id: ServiceCategory; label: string }[] = [
  { id: 'all', label: 'All Services (11)' },
  { id: 'large-format', label: 'Large Format & Signage' },
  { id: 'commercial', label: 'Business & Marketing' },
  { id: 'events-custom', label: 'Events & Custom Print' },
];

export const PRINT_SERVICES: PrintService[] = [
  {
    id: 'digital-printing',
    number: '01',
    title: 'Digital Printing',
    category: 'commercial',
    categoryLabel: 'Business & Marketing',
    summary:
      'High-definition color and monochrome digital press prints for crisp text, accurate brand tones, and flexible short-run or urgent office print quantities.',
    materials: 'Art paper · Matte & gloss card · Bond & textured stock',
    bestFor: 'Catalogues, presentations, menus, certificates, and short-run marketing',
    featured: true,
    whatsappPrompt:
      'Hello Velan Ads Digital Printer, I would like a quote for Digital Printing in Medavakkam. Here are my details:',
  },
  {
    id: 'flex-banner-printing',
    number: '02',
    title: 'Flex Banner Printing',
    category: 'large-format',
    categoryLabel: 'Large Format & Signage',
    summary:
      'Weather-resistant outdoor and indoor flex banners printed with rich saturation for storefronts, grand openings, retail promotions, and local events across Chennai.',
    materials: 'Normal flex · Star flex · Backlit flex · Metal eyelets & framing',
    bestFor: 'Shop hoardings, launch promotions, event backdrops, and roadside banners',
    featured: true,
    whatsappPrompt:
      'Hello Velan Ads Digital Printer, I need a quote for Flex Banner Printing. Size and quantity:',
  },
  {
    id: 'vinyl-printing',
    number: '03',
    title: 'Vinyl Printing',
    category: 'large-format',
    categoryLabel: 'Large Format & Signage',
    summary:
      'Smooth, durable eco-solvent adhesive vinyl graphics for glass doors, office walls, retail branding, sunboard mounting, and one-way vision window displays.',
    materials: 'Gloss & matte adhesive vinyl · Frosted film · One-way vision',
    bestFor: 'Showroom glass branding, clinic interiors, office walls, and vehicle decals',
    whatsappPrompt:
      'Hello Velan Ads Digital Printer, I would like a quote for Vinyl Printing. Dimensions and application surface:',
  },
  {
    id: 'signage',
    number: '04',
    title: 'Signage & Display Boards',
    category: 'large-format',
    categoryLabel: 'Large Format & Signage',
    summary:
      'High-visibility retail signage solutions engineered to make your Medavakkam storefront stand out day and night, plus portable displays for exhibitions.',
    materials: 'Glow-sign boards · Acrylic & LED signage · Sunboard · Roll-up standees',
    bestFor: 'Shop name boards, reception branding, directional signs, and trade stalls',
    whatsappPrompt:
      'Hello Velan Ads Digital Printer, I am enquiring about Signage / Display Boards for my business in Chennai:',
  },
  {
    id: 'posters',
    number: '05',
    title: 'Posters',
    category: 'large-format',
    categoryLabel: 'Large Format & Signage',
    summary:
      'Vibrant promotional and informational posters in standard A3, A2, A1, or custom dimensions with clean ink coverage for indoor retail and event walls.',
    materials: '170–300 GSM art paper · Photo gloss · Matte laminated posters',
    bestFor: 'Store offers, coaching centres, workshops, movie & cultural notices',
    whatsappPrompt:
      'Hello Velan Ads Digital Printer, I would like a quote for Poster Printing. Size and quantity:',
  },
  {
    id: 'brochures',
    number: '06',
    title: 'Brochures',
    category: 'commercial',
    categoryLabel: 'Business & Marketing',
    summary:
      'Crisply creased bi-fold, tri-fold, and multi-page company brochures that showcase your products, real estate projects, healthcare services, or courses clearly.',
    materials: '170–300 GSM gloss or matte art paper · Center-pin & folded finishes',
    bestFor: 'Real estate builders, clinics, schools, B2B profiles, and product catalogues',
    whatsappPrompt:
      'Hello Velan Ads Digital Printer, I would like a quote for Brochure Printing. Fold type and quantity:',
  },
  {
    id: 'business-cards',
    number: '07',
    title: 'Business Cards',
    category: 'commercial',
    categoryLabel: 'Business & Marketing',
    summary:
      'Sharp, heavyweight visiting cards with clean typography and refined finishes that leave a lasting first impression at every client meeting.',
    materials: '300–350 GSM matte/gloss lamination · Textured stock · Spot UV options',
    bestFor: 'Founders, doctors, consultants, retail owners, and corporate teams',
    whatsappPrompt:
      'Hello Velan Ads Digital Printer, I need Business Card Printing. Single/double-sided and quantity:',
  },
  {
    id: 'flyers',
    number: '08',
    title: 'Flyers & Pamphlets',
    category: 'commercial',
    categoryLabel: 'Business & Marketing',
    summary:
      'Cost-effective A5, A4, and DL promotional flyers printed with bright, easy-to-read layouts for neighborhood distribution, retail launches, and local campaigns.',
    materials: '90–170 GSM art paper · Single or double-sided full color',
    bestFor: 'Supermarkets, restaurants, tuition centres, gyms, and local offers',
    whatsappPrompt:
      'Hello Velan Ads Digital Printer, I would like pricing for Flyers / Pamphlets Printing. Size and quantity:',
  },
  {
    id: 'invitation-printing',
    number: '09',
    title: 'Invitation Printing',
    category: 'events-custom',
    categoryLabel: 'Events & Custom Print',
    summary:
      'Thoughtfully printed cards for weddings, engagements, housewarmings, ear-piercing ceremonies, birthdays, and formal corporate inaugurations.',
    materials: 'Heavy ivory & textured cards · Metallic & matte card stock · Matching envelopes',
    bestFor: 'Family celebrations, traditional ceremonies, and business openings',
    whatsappPrompt:
      'Hello Velan Ads Digital Printer, I am enquiring about Invitation Printing. Event type and quantity:',
  },
  {
    id: 'stickers',
    number: '10',
    title: 'Stickers & Labels',
    category: 'events-custom',
    categoryLabel: 'Events & Custom Print',
    summary:
      'Custom shape-cut paper and waterproof vinyl stickers and product labels for food packaging, bottles, retail boxes, and promotional giveaways.',
    materials: 'Waterproof vinyl · Transparent & matte stickers · Sheet & kiss-cut labels',
    bestFor: 'Home bakeries, cosmetics, spice/food jars, courier parcels, and branding',
    whatsappPrompt:
      'Hello Velan Ads Digital Printer, I need a quote for Custom Stickers / Product Labels. Size and quantity:',
  },
  {
    id: 'customized-advertising',
    number: '11',
    title: 'Customized Advertising Materials',
    category: 'events-custom',
    categoryLabel: 'Events & Custom Print',
    summary:
      'Tailored promotional print collateral built around your campaign—from danglers, menu cards, and ID lanyards to letterheads, bill books, and branded handouts.',
    materials: 'Custom substrates · Laminated cards · Printed stationery & retail POS',
    bestFor: 'Complete store branding packages, corporate offices, and seasonal promotions',
    whatsappPrompt:
      'Hello Velan Ads Digital Printer, I want to enquire about Customized Advertising Materials for my business:',
  },
];

export interface PortfolioItem {
  id: string;
  title: string;
  category: Exclude<ServiceCategory, 'all'>;
  categoryLabel: string;
  image: string;
  alt: string;
  caption: string;
  specs: string;
  applications: string;
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'signage-flex',
    title: 'Storefront LED Signage & Outdoor Flex Displays',
    category: 'large-format',
    categoryLabel: 'Large Format & Signage',
    image: '/src/assets/images/portfolio_flex_signage_1795405349991.jpg',
    alt: 'Commercial backlit storefront signage and taut outdoor promotional banner installed on a retail facade',
    caption:
      'Clean architectural shopfront boards and taut exterior promotional banners designed for clear street-level visibility.',
    specs: 'Backlit Acrylic · Star Flex · Outdoor UV-Resistant Inks',
    applications: 'Retail showrooms, clinics, cafes, and commercial complexes in Medavakkam & Chennai',
  },
  {
    id: 'brochures-cards',
    title: 'Corporate Brochures, Visiting Cards & Flyers',
    category: 'commercial',
    categoryLabel: 'Business & Marketing',
    image: '/src/assets/images/portfolio_brochures_cards_1795405329911.jpg',
    alt: 'Studio arrangement of matte-laminated business cards, tri-fold corporate brochures, and promotional flyers',
    caption:
      'Matched business stationery and multi-fold marketing literature printed with consistent color across every piece.',
    specs: '300–350 GSM Art Card · Matte Lamination · Precision Creasing',
    applications: 'Corporate branding kits, real estate sales folders, and service catalogues',
  },
  {
    id: 'invitations-stickers',
    title: 'Bespoke Event Invitations & Die-Cut Product Labels',
    category: 'events-custom',
    categoryLabel: 'Events & Custom Print',
    image: '/src/assets/images/portfolio_invitations_stickers_1795405343788.jpg',
    alt: 'Textured ivory event invitation card with envelope alongside custom round and square product label stickers',
    caption:
      'Heavy textured invitation suites and precision-cut brand stickers crafted for personal milestones and retail packaging.',
    specs: 'Textured Card Stock · Kiss-Cut Vinyl & Paper Labels · Custom Shapes',
    applications: 'Weddings, housewarmings, artisanal food brands, and gift packaging',
  },
  {
    id: 'wide-format-vinyl',
    title: 'Wide-Format Eco-Solvent Vinyl & Retail Posters',
    category: 'large-format',
    categoryLabel: 'Large Format & Signage',
    image: '/src/assets/images/portfolio_posters_vinyl_1795405350979.jpg',
    alt: 'Wide-format eco-solvent printer producing vibrant retail promotional vinyl posters on roll media',
    caption:
      'High-resolution wide-format printing for vibrant seasonal sale posters, roll-up standees, and glass vinyl branding.',
    specs: 'Eco-Solvent Vinyl · Gloss & Matte Roll Media · High-DPI Output',
    applications: 'Seasonal retail campaigns, mall kiosks, interior wall graphics, and standees',
  },
  {
    id: 'digital-production-press',
    title: 'High-Precision Commercial Digital Production Press',
    category: 'commercial',
    categoryLabel: 'Business & Marketing',
    image: '/src/assets/images/hero_digital_press_1795405331390.jpg',
    alt: 'Modern commercial digital printing studio with production press outputting crisp full-color marketing sheets',
    caption:
      'Calibrated digital sheet and roll output built for sharp typography, smooth gradients, and reliable print consistency.',
    specs: 'CMYK Color Calibration · Short-Run & Bulk Production · Proof Review',
    applications: 'Marketing decks, flyers, posters, menus, and custom commercial print runs',
  },
];

export interface WorkflowStandard {
  number: string;
  title: string;
  description: string;
}

export const WORKFLOW_STANDARDS: WorkflowStandard[] = [
  {
    number: '01',
    title: 'Clear Pre-Print Review',
    description:
      'Before printing begins, we check dimensions, bleed margins, resolution, and spelling with you so there are no surprises at pickup.',
  },
  {
    number: '02',
    title: 'Honest Media & Stock Guidance',
    description:
      'Not sure between normal flex, star flex, matte vinyl, or 300 GSM art card? We recommend the right material for indoor or Chennai outdoor weather.',
  },
  {
    number: '03',
    title: 'Direct WhatsApp Ordering',
    description:
      'Send your artwork, size, and quantity directly to +91 91504 21389 on WhatsApp for fast pricing and coordination without back-and-forth delays.',
  },
  {
    number: '04',
    title: 'Flexible Local Quantities',
    description:
      'From a small batch of event invitations or visiting cards to full shop signage and bulk flyers, we support Medavakkam households and businesses alike.',
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What printing and advertising services do you offer in Medavakkam?',
    answer:
      'Velan Ads Digital Printer offers digital printing, flex banner printing, eco-solvent vinyl printing, posters, brochures, business cards, flyers, invitation printing, custom stickers and product labels, commercial signage, and customized advertising materials.',
  },
  {
    question: 'How do I get a quick price estimate or place an order?',
    answer:
      'Message us directly on WhatsApp or call +91 91504 21389. Share the print item, approximate size, quantity, and whether you already have artwork ready—we will confirm material options and pricing clearly before printing.',
  },
  {
    question: 'What file formats should I share for the sharpest print quality?',
    answer:
      'Print-ready PDF, CDR (CorelDRAW), AI, or EPS files with fonts converted to curves/outlines deliver the crispest output. For images, high-resolution 300 DPI PNG or JPEG files in CMYK color mode work best. Send files as a "Document" on WhatsApp so image compression does not reduce clarity.',
  },
  {
    question: 'Can you help if I do not have a print-ready design yet?',
    answer:
      'Yes. If you only have your text, logo, or a rough reference on paper, reach out to us on WhatsApp or by phone at +91 91504 21389 to discuss layout setup before printing.',
  },
  {
    question: 'Do you accept both small personal orders and bulk commercial print jobs?',
    answer:
      'Yes. Digital printing makes short runs—like small batches of visiting cards, posters, stickers, or family invitations—practical and affordable, while our commercial and wide-format services handle bulk flyers, brochures, flex banners, and storefront branding.',
  },
  {
    question: 'Which areas around Medavakkam do you serve, and how do I find your shop?',
    answer:
      'We serve customers across Medavakkam, Pallikaranai, Velachery, Sholinganallur, Perumbakkam, Madipakkam, Tambaram, and greater Chennai. Call or WhatsApp +91 91504 21389 anytime for our exact landmark and live shop location pin.',
  },
];

export interface LivePlaceInfo {
  foundSpecificBusiness: boolean;
  displayName: string;
  formattedAddress: string;
  location: { lat: number; lng: number };
  googleMapsURI?: string;
  rating?: number;
  userRatingCount?: number;
  weekdayDescriptions?: string[];
  reviews?: {
    authorName: string;
    rating: number;
    text: string;
    relativeTime: string;
    authorUri?: string;
  }[];
}
