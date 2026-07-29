import { BarberService, Barber, CustomerReview, GalleryMediaItem, AuditComparisonItem } from '../types';

export const HERO_IMAGE_PATH = '/barbers/home.png';
export const MASTER_IMAGE_PATH = '/src/assets/images/barber_master_1785073753141.jpg';

export const SHOP_INFO = {
  name: "The Premium Barbershop Groningen",
  tagline: "De kunst van hoogwaardig kappen & baardverzorging voor de veeleisende heer in Groningen",
  address: "Gedempte Zuiderdiep 116, 9711 HM Groningen",
  phone: "06-84289005",
  email: "booking@thepremiumbarbershopgroningen.nl",
  instagram: "@thepremiumbarbershop_groningen",
  googleRating: 4.9,
  reviewsTotal: 488,
  openingHoursSummary: "Maandag—Zaterdag (Donderdag koopavond tot 21:00)",
  openingHours: [
    { day: "Maandag", hours: "12.00 tot 18.00", open: true },
    { day: "Dinsdag", hours: "10.00 tot 18.00", open: true },
    { day: "Woensdag", hours: "10.00 tot 18.00", open: true },
    { day: "Donderdag", hours: "10.00 tot 21.00", open: true },
    { day: "Vrijdag", hours: "10.00 tot 19.00", open: true },
    { day: "Zaterdag", hours: "10.00 tot 18.00", open: true },
    { day: "Zondag", hours: "gesloten", open: false },
  ],
  latitude: 53.2144,
  longitude: 6.5681,
};

export const SHOP_INFO_EN = {
  tagline: "The art of premium haircuts & beard grooming for the discerning gentleman in Groningen",
  openingHoursSummary: "Monday—Saturday (Late-night shopping Thursday until 21:00)",
};

const DAY_NAME_EN: Record<string, string> = {
  Maandag: "Monday",
  Dinsdag: "Tuesday",
  Woensdag: "Wednesday",
  Donderdag: "Thursday",
  Vrijdag: "Friday",
  Zaterdag: "Saturday",
  Zondag: "Sunday",
};

// Translates a Dutch day name ("Maandag") to English when lang is 'en'; the
// underlying opening-hours data itself stays in Dutch as the single source
// of truth for booking logic, this only affects display.
export const translateDayName = (day: string, lang: 'nl' | 'en'): string =>
  lang === 'en' ? (DAY_NAME_EN[day] || day) : day;

// Translates an hours string ("12.00 tot 18.00" / "gesloten") for display.
export const translateHoursLabel = (hours: string, lang: 'nl' | 'en'): string => {
  if (lang === 'nl') return hours;
  if (hours.toLowerCase() === 'gesloten') return 'Closed';
  return hours.replace(/\./g, ':').replace(' tot ', ' – ');
};

export const BARBER_SERVICES: BarberService[] = [
  {
    id: "knippen",
    name: "Knippen",
    category: "haircut",
    price: 27.50,
    durationMinutes: 30,
    description: "Klassieke knipbeurt op maat met schaar & tondeuse, nette afwerking in de nek en contouren voor een fris en verzorgd resultaat.",
    badge: "Populair",
    popular: true,
    icon: "Scissors"
  },
  {
    id: "knippen-baard",
    name: "Knippen met Baard",
    category: "combo",
    price: 37.50,
    durationMinutes: 30,
    description: "De complete combinatie: een precieze knipbeurt gevolgd door een strakke baardverzorging, voor een verzorgde look van top tot teen.",
    badge: "Bestseller",
    popular: true,
    icon: "Crown"
  },
  {
    id: "studenten",
    name: "Studenten",
    category: "haircut",
    price: 25.00,
    durationMinutes: 30,
    description: "Dezelfde vakkundige knipbeurt tegen een voordelig studententarief, altijd met oog voor detail en een frisse, moderne afwerking.",
    icon: "User"
  },
  {
    id: "kinderen-tot-12",
    name: "Kinderen t/m 12 jaar",
    category: "junior",
    price: 20.00,
    durationMinutes: 30,
    description: "Een geduldige en zorgvuldige knipbeurt speciaal voor de jongsten, in een ontspannen sfeer met een net en modern resultaat.",
    icon: "User"
  },
  {
    id: "kinderen-12-16",
    name: "Kinderen 12 t/m 16 jaar",
    category: "junior",
    price: 22.50,
    durationMinutes: 30,
    description: "Een moderne knipbeurt op maat voor tieners, met verzorgde contouren en een stijl die aansluit bij de laatste trends.",
    icon: "User"
  },
  {
    id: "lijnen",
    name: "Lijnen",
    category: "beard",
    price: 12.50,
    durationMinutes: 15,
    description: "Scherpe contourlijnen bij de haargrens en baard, voor een messcherpe en verzorgde afwerking tussen twee knipbeurten door.",
    icon: "Razor"
  },
  {
    id: "baard",
    name: "Baard",
    category: "beard",
    price: 17.50,
    durationMinutes: 15,
    description: "Vakkundige baardtrim en -verzorging, netjes bijgewerkt met het scheermes voor een strakke en verzorgde uitstraling.",
    icon: "Flame"
  },
  {
    id: "vip-thuis",
    name: "VIP Knipbeurt aan Huis",
    category: "combo",
    price: 100,
    description: "De premium ervaring bij u thuis: onze master barber komt naar u toe voor een volledige knip- en baardbehandeling in het comfort van uw eigen woning.",
    badge: "VIP Luxe",
    popular: true,
    icon: "Sparkles"
  },
  {
    id: "weekend-thuis",
    name: "Knipbeurt aan Huis (Weekend)",
    category: "combo",
    price: 150,
    description: "Onze exclusieve weekendservice aan huis: een uitgebreide knip- en verzorgingssessie op het tijdstip dat u het beste uitkomt.",
    badge: "Signature",
    icon: "Crown"
  }
];

export const BARBER_SERVICES_EN: BarberService[] = [
  {
    id: "knippen",
    name: "Haircut",
    category: "haircut",
    price: 27.50,
    durationMinutes: 30,
    description: "A classic tailored haircut with scissors & clippers, neatly finished at the neck and contours for a fresh, groomed result.",
    badge: "Popular",
    popular: true,
    icon: "Scissors"
  },
  {
    id: "knippen-baard",
    name: "Haircut with Beard",
    category: "combo",
    price: 37.50,
    durationMinutes: 30,
    description: "The complete combo: a precise haircut followed by sharp beard grooming, for a polished look from head to toe.",
    badge: "Bestseller",
    popular: true,
    icon: "Crown"
  },
  {
    id: "studenten",
    name: "Student",
    category: "haircut",
    price: 25.00,
    durationMinutes: 30,
    description: "The same skilled haircut at a discounted student rate, always with an eye for detail and a fresh, modern finish.",
    icon: "User"
  },
  {
    id: "kinderen-tot-12",
    name: "Kids up to 12 years",
    category: "junior",
    price: 20.00,
    durationMinutes: 30,
    description: "A patient, careful haircut made specially for the youngest clients, in a relaxed setting with a neat, modern result.",
    icon: "User"
  },
  {
    id: "kinderen-12-16",
    name: "Kids 12 to 16 years",
    category: "junior",
    price: 22.50,
    durationMinutes: 30,
    description: "A modern tailored haircut for teens, with groomed contours and a style that follows the latest trends.",
    icon: "User"
  },
  {
    id: "lijnen",
    name: "Line-up",
    category: "beard",
    price: 12.50,
    durationMinutes: 15,
    description: "Sharp contour lines along the hairline and beard, for a razor-sharp, groomed finish between two haircuts.",
    icon: "Razor"
  },
  {
    id: "baard",
    name: "Beard",
    category: "beard",
    price: 17.50,
    durationMinutes: 15,
    description: "Skilled beard trim & grooming, neatly finished with the straight razor for a sharp, well-kept look.",
    icon: "Flame"
  },
  {
    id: "vip-thuis",
    name: "VIP Haircut at Home",
    category: "combo",
    price: 100,
    description: "The premium experience at your door: our master barber comes to you for a full haircut and beard treatment in the comfort of your own home.",
    badge: "VIP Luxe",
    popular: true,
    icon: "Sparkles"
  },
  {
    id: "weekend-thuis",
    name: "Haircut at Home (Weekend)",
    category: "combo",
    price: 150,
    description: "Our exclusive at-home weekend service: an extensive haircut and grooming session at the time that suits you best.",
    badge: "Signature",
    icon: "Crown"
  }
];

export const BARBERS: Barber[] = [
  {
    id: "majid",
    name: "Majid",
    nickname: "Master Barber (18 jaar ervaring)",
    role: "Senior Master Barber",
    experienceYears: 18,
    rating: 4.98,
    reviewsCount: 245,
    avatarUrl: "/barbers/majid.png",
    bio: "Met 18 jaar ervaring ben ik een gerespecteerde kapper bekend om mijn vakmanschap en oog voor detail. Ik bedien een diverse klantenkring, van lokale vaste klanten tot mensen van ver. Mijn passie voor haar en stijl houdt me up-to-date met de nieuwste trends, waardoor ik mijn klanten altijd de beste service bied.",
    specialties: ["18 Jaar Ervaring", "Oog voor Detail", "Nieuwste Hair Trends"],
    instagram: "@majid_barber"
  },
  {
    id: "ayoub",
    name: "Ayoub",
    nickname: "Master Barber & Stylist",
    role: "Master Barber & Stylist",
    experienceYears: 12,
    rating: 4.96,
    reviewsCount: 198,
    avatarUrl: "/barbers/ayoub.png",
    bio: "Ayoub is een ervaren Master Barber. Gedreven door passie en vakmanschap, staat hij bekend om zijn precisie, creativiteit en klantgerichtheid. Ayoub biedt moderne stijlen, klassieke kapsels en gespecialiseerde baardverzorging, altijd met een perfecte en gepersonaliseerde look.",
    specialties: ["Precisie & Creativiteit", "Moderne Stijlen", "Baardverzorging"],
    instagram: "@ayoub_barber"
  },
  {
    id: "yanti",
    name: "Yanti",
    nickname: "Barber Specialist",
    role: "Stylist & Barber Specialist",
    experienceYears: 10,
    rating: 4.94,
    reviewsCount: 155,
    avatarUrl: "/barbers/yanti.png",
    bio: "Yanti heeft veel ervaring in de kappersbranche. Met zijn passie voor het vak en vakmanschap weet hij elke klant te voorzien van een stijl die perfect past. Hij combineert moderne trends met klassieke kapsels en biedt daarnaast gespecialiseerde baardverzorging. Yanti werkt nauwkeurig, creatief en met persoonlijke aandacht.",
    specialties: ["Persoonlijke Aandacht", "Nauwkeurig & Creatief", "Klassiek & Modern"],
    instagram: "@yanti_barber"
  }
];

export const BARBERS_EN: Barber[] = [
  {
    id: "majid",
    name: "Majid",
    nickname: "Master Barber (18 years experience)",
    role: "Senior Master Barber",
    experienceYears: 18,
    rating: 4.98,
    reviewsCount: 245,
    avatarUrl: "/barbers/majid.png",
    bio: "With 18 years of experience, I'm a respected barber known for my craftsmanship and eye for detail. I serve a diverse clientele, from local regulars to people who travel from further afield. My passion for hair and style keeps me up to date with the latest trends, so my clients always get the best service.",
    specialties: ["18 Years Experience", "Eye for Detail", "Latest Hair Trends"],
    instagram: "@majid_barber"
  },
  {
    id: "ayoub",
    name: "Ayoub",
    nickname: "Master Barber & Stylist",
    role: "Master Barber & Stylist",
    experienceYears: 12,
    rating: 4.96,
    reviewsCount: 198,
    avatarUrl: "/barbers/ayoub.png",
    bio: "Ayoub is an experienced Master Barber. Driven by passion and craftsmanship, he's known for his precision, creativity and client focus. Ayoub offers modern styles, classic cuts and specialized beard grooming, always with a perfectly personalized look.",
    specialties: ["Precision & Creativity", "Modern Styles", "Beard Grooming"],
    instagram: "@ayoub_barber"
  },
  {
    id: "yanti",
    name: "Yanti",
    nickname: "Barber Specialist",
    role: "Stylist & Barber Specialist",
    experienceYears: 10,
    rating: 4.94,
    reviewsCount: 155,
    avatarUrl: "/barbers/yanti.png",
    bio: "Yanti has extensive experience in the barbering trade. With a passion for the craft, he knows how to give every client a style that fits them perfectly. He combines modern trends with classic cuts and also offers specialized beard grooming. Yanti works precisely, creatively and with personal attention.",
    specialties: ["Personal Attention", "Precise & Creative", "Classic & Modern"],
    instagram: "@yanti_barber"
  }
];

export const BOOKING_EXTRAS = [
  { id: "wash", name: "Ontspannende Shampoo-Massage", price: 5 },
  { id: "wax", name: "Wax Ontharing (Neus & Oren)", price: 6 },
  { id: "mask", name: "Reinigend Kleimasker Gezicht", price: 10 },
  { id: "beverage", name: "Italiaanse Espresso of Whisky Proeverij", price: 0 }
];

export const BOOKING_EXTRAS_EN = [
  { id: "wash", name: "Relaxing Shampoo Massage", price: 5 },
  { id: "wax", name: "Wax Hair Removal (Nose & Ears)", price: 6 },
  { id: "mask", name: "Purifying Clay Face Mask", price: 10 },
  { id: "beverage", name: "Italian Espresso or Whisky Tasting", price: 0 }
];

export const CLIENT_REVIEWS: CustomerReview[] = [
  {
    id: "rev-1",
    author: "Daan Van Der Berg",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    rating: 5,
    date: "2 dagen geleden",
    text: "Top geknipt zoals altijd. Majid weet precies wat ik wil zonder dat ik veel hoef uit te leggen.",
    serviceName: "Knippen met Baard",
    barberName: "Majid - Senior Master Barber",
    verified: true
  },
  {
    id: "rev-2",
    author: "Lars De Jong",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    rating: 5,
    date: "4 dagen geleden",
    text: "Ayoub weet gewoon wat ie doet. Baard weer strak en recht, geen gezeur.",
    serviceName: "Baard",
    barberName: "Ayoub - Master Barber",
    verified: true
  },
  {
    id: "rev-3",
    author: "Thomas Miller",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80",
    rating: 5,
    date: "1 week geleden",
    text: "Rustig baasje, netjes werk. Kom hier nu al een tijdje en het blijft goed.",
    serviceName: "Knippen",
    barberName: "Yanti - Barber Specialist",
    verified: true
  },
  {
    id: "rev-4",
    author: "Sven Bakker",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80",
    rating: 5,
    date: "3 dagen geleden",
    text: "Studententarief maar geen studentenwerk. Prima knipbeurt voor een normale prijs.",
    serviceName: "Studenten",
    barberName: "Majid - Senior Master Barber",
    verified: true
  },
  {
    id: "rev-5",
    author: "Milan de Wit",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&auto=format&fit=crop&q=80",
    rating: 5,
    date: "5 dagen geleden",
    text: "Even binnenlopen voor de lijnen en zo weer strak de deur uit. Handig tussendoor.",
    serviceName: "Lijnen",
    barberName: "Ayoub - Master Barber",
    verified: true
  },
  {
    id: "rev-6",
    author: "Kevin Postma",
    avatar: "https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?w=100&auto=format&fit=crop&q=80",
    rating: 5,
    date: "1 dag geleden",
    text: "Mijn zoon vond het meteen leuk hier. Geduldig met kinderen, dat is niet overal zo.",
    serviceName: "Kinderen 12 t/m 16 jaar",
    barberName: "Yanti - Barber Specialist",
    verified: true
  },
  {
    id: "rev-7",
    author: "Rik Jansen",
    avatar: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?w=100&auto=format&fit=crop&q=80",
    rating: 5,
    date: "2 weken geleden",
    text: "Kom hier al jaren en nog nooit voor niks gegaan. Gewoon elke keer goed.",
    serviceName: "Knippen met Baard",
    barberName: "Majid - Senior Master Barber",
    verified: true
  },
  {
    id: "rev-8",
    author: "Bram Vermeulen",
    avatar: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=100&auto=format&fit=crop&q=80",
    rating: 5,
    date: "6 dagen geleden",
    text: "Hij kwam gewoon bij mij thuis knippen. Superhandig, zeker doen als je weinig tijd hebt.",
    serviceName: "VIP Knipbeurt aan Huis",
    barberName: "Ayoub - Master Barber",
    verified: true
  },
  {
    id: "rev-9",
    author: "Yusuf Al-Amin",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80",
    rating: 5,
    date: "1 week ago",
    text: "Been to a lot of barbershops in this city, this is the only one that gets my fade exactly right every single time. Worth the trip across town.",
    serviceName: "Knippen met Baard",
    barberName: "Majid - Senior Master Barber",
    verified: true
  },
  {
    id: "rev-10",
    author: "Marcus Washington",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&auto=format&fit=crop&q=80",
    rating: 5,
    date: "3 weeks ago",
    text: "Finally found a shop in Groningen that knows how to handle my hair texture properly. Clean lineup, great vibe, no rush. I'm a regular now.",
    serviceName: "Lijnen",
    barberName: "Ayoub - Master Barber",
    verified: true
  }
];

// Real photos & clips from the shop floor, uploaded directly by the owner.
export const GALLERY_MEDIA: GalleryMediaItem[] = [
  { id: "im1", type: "image", src: "/barbers/IM1.jpeg" },
  { id: "im2", type: "image", src: "/barbers/IM2.jpeg" },
  { id: "im3", type: "image", src: "/barbers/IM3.jpeg" },
  { id: "im4", type: "image", src: "/barbers/IM4.jpeg" },
  { id: "im5", type: "image", src: "/barbers/IM5.jpeg" },
  { id: "v1", type: "video", src: "/barbers/V1.mp4" },
  { id: "v2", type: "video", src: "/barbers/V2.mp4" },
  { id: "v3", type: "video", src: "/barbers/V3.mp4" },
  { id: "v4", type: "video", src: "/barbers/V4.mp4" },
  { id: "v5", type: "video", src: "/barbers/V5.mp4" },
  { id: "v6", type: "video", src: "/barbers/V6.mp4" },
  { id: "v7", type: "video", src: "/barbers/V7.mp4" },
  { id: "v8", type: "video", src: "/barbers/V8.mp4" },
  { id: "v9", type: "video", src: "/barbers/V9.mp4" }
];

export const AUDIT_BENCHMARKS: AuditComparisonItem[] = [
  {
    feature: "Online Reserveren",
    oldSite: "Traag extern formulier of omleiding naar derde partij",
    newSite: "Razendsnelle native module in 4 stappen met keuze van barbier en direct tijdslot",
    status: "better"
  },
  {
    feature: "Laadsnelheid & Soepelheid",
    oldSite: "Zware statische pagina (Score ~45/100)",
    newSite: "React + Vite architectuur, ultrasnel (Score ~99/100)",
    status: "better"
  },
  {
    feature: "Mobiele Ervaring & Ergonomie",
    oldSite: "Basic design, niet geoptimaliseerd voor smartphones",
    newSite: "Intuïtieve dark-luxury touch-interface met vloeiende overgangseffecten",
    status: "better"
  },
  {
    feature: "Aan-Huis Service",
    oldSite: "Niet beschikbaar",
    newSite: "VIP knipbeurt of weekendservice gewoon bij u thuis",
    status: "better"
  },
  {
    feature: "Sensorische Ervaring & Effecten",
    oldSite: "Passieve website zonder animatie",
    newSite: "Voor/Na-simulator, ASMR barber geluidssfeer en geanimeerde bevestiging",
    status: "better"
  },
  {
    feature: "Afsprakenbeheer",
    oldSite: "Geen geschiedenis of aanpasbaar overzicht",
    newSite: "'Mijn Afspraken'-omgeving met trackingcode, mogelijkheid om te verzetten/annuleren",
    status: "better"
  }
];

export const AUDIT_BENCHMARKS_EN: AuditComparisonItem[] = [
  {
    feature: "Online Booking",
    oldSite: "Slow external form or redirect to a third party",
    newSite: "Lightning-fast native module in 4 steps with barber choice and instant time slot",
    status: "better"
  },
  {
    feature: "Load Speed & Smoothness",
    oldSite: "Heavy static page (Score ~45/100)",
    newSite: "React + Vite architecture, ultra fast (Score ~99/100)",
    status: "better"
  },
  {
    feature: "Mobile Experience & Ergonomics",
    oldSite: "Basic design, not optimized for smartphones",
    newSite: "Intuitive dark-luxury touch interface with smooth transition effects",
    status: "better"
  },
  {
    feature: "At-Home Service",
    oldSite: "Not available",
    newSite: "VIP haircut or weekend service right at your home",
    status: "better"
  },
  {
    feature: "Sensory Experience & Effects",
    oldSite: "Passive website with no animation",
    newSite: "Before/After simulator, ASMR barbershop ambience and animated confirmation",
    status: "better"
  },
  {
    feature: "Appointment Management",
    oldSite: "No history or editable overview",
    newSite: "'My Appointments' dashboard with tracking code, ability to reschedule/cancel",
    status: "better"
  }
];
