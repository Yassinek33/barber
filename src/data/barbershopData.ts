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
    id: "skin-fade",
    name: "Precisie Skin Fade & Contour",
    category: "haircut",
    price: 32,
    durationMinutes: 40,
    description: "Ultra-precieze skin fade met tondeuse/scheermes, geleidelijke overgang op maat, afwerking met de schaar en getextureerd stylen.",
    badge: "Populair",
    popular: true,
    icon: "Scissors"
  },
  {
    id: "classic-cut",
    name: "Gentleman Classic Cut",
    category: "haircut",
    price: 28,
    durationMinutes: 35,
    description: "Klassieke knipbeurt met schaar & tondeuse, nette afwerking in de nek en contouren, verfrissende spoeling en premium pomade.",
    icon: "Scissors"
  },
  {
    id: "beard-sculpt",
    name: "Baardtrim & Contourlijn met Scheermes",
    category: "beard",
    price: 24,
    durationMinutes: 30,
    description: "Handmatig gesculpteerde baard, strakke contouren met het scheermes, warme handdoek met eucalyptus en voedende olie.",
    badge: "Bestseller",
    icon: "Razor"
  },
  {
    id: "royal-combo",
    name: "Royal Combo (Knipbeurt + VIP Baard)",
    category: "combo",
    price: 49,
    durationMinutes: 65,
    description: "De complete ervaring: op maat gemaakte fade + VIP baardverzorging met dubbele warme handdoek, hoofdhuidmassage en verzorging.",
    badge: "Signature",
    popular: true,
    icon: "Crown"
  },
  {
    id: "hot-towel-shave",
    name: "Traditioneel Ouderwets Scheren",
    category: "beard",
    price: 29,
    durationMinutes: 35,
    description: "Authentiek scheren met het rechte scheermes, warm scheerschuim met scheerkwast, 2 warme handdoeken en kalmerende aftershave balsem.",
    icon: "Flame"
  },
  {
    id: "deluxe-grooming",
    name: "The Premium Deluxe Experience",
    category: "combo",
    price: 68,
    durationMinutes: 80,
    description: "De ultieme verzorging: Knipbeurt + Baard + Ontspannende shampoo-massage + Neus-/oorharen wax + Reinigend gezichtsmasker + Gratis drankje.",
    badge: "VIP Luxe",
    popular: true,
    icon: "Sparkles"
  },
  {
    id: "junior-cut",
    name: "Jonge Gentleman Knipbeurt (-14 jaar)",
    category: "junior",
    price: 22,
    durationMinutes: 30,
    description: "Moderne en aangepaste knipbeurt voor de jongsten, verzorgde contouren en een vleugje stylingwax.",
    icon: "User"
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
    nickname: "Master Barber (12+ jaar ervaring)",
    role: "Master Barber & Stylist",
    experienceYears: 12,
    rating: 4.96,
    reviewsCount: 198,
    avatarUrl: "/barbers/ayoub.png",
    bio: "Ayoub is een ervaren Master Barber met meer dan 12 jaar in de kappersbranche. Gedreven door passie en vakmanschap, staat hij bekend om zijn precisie, creativiteit en klantgerichtheid. Ayoub biedt moderne stijlen, klassieke kapsels en gespecialiseerde baardverzorging, altijd met een perfecte en gepersonaliseerde look.",
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
    text: "Zonder twijfel de beste barbier van Groningen aan de Gedempte Zuiderdiep! Majid leverde een perfecte knipbeurt met indrukwekkend oog voor detail. Het reserveringssysteem is direct.",
    serviceName: "Royal Combo (Knipbeurt + VIP Baard)",
    barberName: "Majid - Senior Master Barber",
    verified: true
  },
  {
    id: "rev-2",
    author: "Lars De Jong",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    rating: 5,
    date: "4 dagen geleden",
    text: "Ayoub heeft meer dan 12 jaar ervaring en dat is meteen te zien! Baardtrim met het scheermes ultra netjes. Top sfeer in de zaak.",
    serviceName: "Baardtrim & Contourlijn",
    barberName: "Ayoub - Master Barber",
    verified: true
  },
  {
    id: "rev-3",
    author: "Thomas Miller",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80",
    rating: 5,
    date: "1 week geleden",
    text: "Uitzonderlijke service bij Yanti. Zijn persoonlijke aandacht en precisie zijn opmerkelijk. Ik raad het zonder twijfel aan.",
    serviceName: "Precisie Skin Fade",
    barberName: "Yanti - Barber Specialist",
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
    feature: "Stijladvies Quiz",
    oldSite: "Afwezig - Blind kiezen van een kapsel",
    newSite: "Interactieve quiz met 3 vragen om het perfecte kapsel te vinden op basis van gezichtsvorm",
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
