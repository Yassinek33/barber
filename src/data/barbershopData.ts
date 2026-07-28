import { BarberService, Barber, CustomerReview, LookbookItem, AuditComparisonItem } from '../types';

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
    price: 150,
    description: "De premium ervaring bij u thuis: onze master barber komt naar u toe voor een volledige knip- en baardbehandeling in het comfort van uw eigen woning.",
    badge: "VIP Luxe",
    popular: true,
    icon: "Sparkles"
  },
  {
    id: "weekend-thuis",
    name: "Knipbeurt aan Huis (Weekend)",
    category: "combo",
    price: 250,
    description: "Onze exclusieve weekendservice aan huis: een uitgebreide knip- en verzorgingssessie op het tijdstip dat u het beste uitkomt.",
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

export const BOOKING_EXTRAS = [
  { id: "wash", name: "Ontspannende Shampoo-Massage", price: 5 },
  { id: "wax", name: "Wax Ontharing (Neus & Oren)", price: 6 },
  { id: "mask", name: "Reinigend Kleimasker Gezicht", price: 10 },
  { id: "beverage", name: "Italiaanse Espresso of Whisky Proeverij", price: 0 }
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
  }
];

export const LOOKBOOK_ITEMS: LookbookItem[] = [
  {
    id: "look-1",
    title: "Sharp Low Skin Fade & Textured Top",
    category: "fades",
    imageUrl: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&auto=format&fit=crop&q=80",
    description: "Zeer strakke lage skin fade met getextureerd volume bovenop. Natuurlijke matte afwerking.",
    tags: ["Skin Fade", "Textured Crop", "Modern"],
    serviceIdToBook: "skin-fade"
  },
  {
    id: "look-2",
    title: "Full Beard Sculpt & Sharp Contour",
    category: "beards",
    imageUrl: "https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?w=600&auto=format&fit=crop&q=80",
    description: "Dichte, gesculpteerde baard met scherpe wanglijnen tot op de millimeter getekend met het scheermes.",
    tags: ["Baardtrim", "Scheermes", "Gentleman"],
    serviceIdToBook: "beard-sculpt"
  },
  {
    id: "look-3",
    title: "Mid Fade Pompadour & Taper",
    category: "combos",
    imageUrl: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?w=600&auto=format&fit=crop&q=80",
    description: "Iconische stijl in een nieuw jasje met elegant volume en geleidelijke overgang.",
    tags: ["Pompadour", "Classic", "Premium"],
    serviceIdToBook: "royal-combo"
  },
  {
    id: "look-4",
    title: "Gentleman Side-Part & Sharp Beard",
    category: "classics",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
    description: "Met de schaar gesculpteerde zijscheiding met subtiele slapenfade.",
    tags: ["Side Part", "Klassiek", "Business"],
    serviceIdToBook: "classic-cut"
  }
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
