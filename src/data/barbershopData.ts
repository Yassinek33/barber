import { BarberService, Barber, CustomerReview, LookbookItem, AuditComparisonItem } from '../types';

export const HERO_IMAGE_PATH = '/src/assets/images/barber_hero_1785073738321.jpg';
export const MASTER_IMAGE_PATH = '/src/assets/images/barber_master_1785073753141.jpg';

export const SHOP_INFO = {
  name: "The Premium Barbershop Groningen",
  tagline: "L'art de la haute coiffure & taille de barbe pour hommes exigeants à Groningen",
  address: "Gedempte Zuiderdiep 116, 9711 HM Groningen",
  phone: "06-84289005",
  email: "booking@thepremiumbarbershopgroningen.nl",
  instagram: "@thepremiumbarbershop_groningen",
  googleRating: 4.9,
  reviewsTotal: 488,
  openingHoursSummary: "Maandag—Zaterdag (Donderdag nocturne tot 21:00)",
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
    name: "Precision Skin Fade & Contour",
    category: "haircut",
    price: 32,
    durationMinutes: 40,
    description: "Dégradé à blanc ultra-précis au rasoir/shaver, dégradé progressif sur mesure, finition aux ciseaux et coiffage texturisé.",
    badge: "Populaire",
    popular: true,
    icon: "Scissors"
  },
  {
    id: "classic-cut",
    name: "Gentleman Classic Cut",
    category: "haircut",
    price: 28,
    durationMinutes: 35,
    description: "Coupe classique aux ciseaux & tondeuse, finition nuque et contours propres, rinçage rafraîchissant et pommade premium.",
    icon: "Scissors"
  },
  {
    id: "beard-sculpt",
    name: "Taille de Barbe & Tracé au Rasoir",
    category: "beard",
    price: 24,
    durationMinutes: 30,
    description: "Sculpture de la barbe à la main, contours nets au coupe-choux, serviette chaude infusée à l'eucalyptus et huile nourissante.",
    badge: "Best-Seller",
    icon: "Razor"
  },
  {
    id: "royal-combo",
    name: "Royal Combo (Coupe + Barbe VIP)",
    category: "combo",
    price: 49,
    durationMinutes: 65,
    description: "L'expérience complète : Coupe dégradée sur-mesure + Taille de barbe VIP avec double serviette chaude, massage du cuir chevelu et soin.",
    badge: "Signature",
    popular: true,
    icon: "Crown"
  },
  {
    id: "hot-towel-shave",
    name: "Rasage Traditionnel à l'Ancienne",
    category: "beard",
    price: 29,
    durationMinutes: 35,
    description: "Véritable rasage au coupe-choux traditionnel, mousse chaude montée au blaireau, 2 serviettes chaudes et baume après-rasage apaisant.",
    icon: "Flame"
  },
  {
    id: "deluxe-grooming",
    name: "The Premium Deluxe Experience",
    category: "combo",
    price: 68,
    durationMinutes: 80,
    description: "Soin ultime : Coupe + Barbe + Shampooing massant + Epilation nez/oreilles à la cire + Masque du visage purifiant + Boisson offerte.",
    badge: "VIP Luxe",
    popular: true,
    icon: "Sparkles"
  },
  {
    id: "junior-cut",
    name: "Coupe Jeune Gentleman (-14 ans)",
    category: "junior",
    price: 22,
    durationMinutes: 30,
    description: "Coupe moderne et adaptée pour les plus jeunes, contours soignés et touche de cire coiffante.",
    icon: "User"
  }
];

export const BARBERS: Barber[] = [
  {
    id: "majid",
    name: "Majid",
    nickname: "Master Barber (18 ans exp.)",
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
    nickname: "Master Barber (12+ ans exp.)",
    role: "Master Barber & Stylist",
    experienceYears: 12,
    rating: 4.96,
    reviewsCount: 198,
    avatarUrl: "/barbers/ayoub.png",
    bio: "Ayoub is een ervaren Master Barber met meer dan 12 jaar in de kappersbranche. Gedreven door passie en vakmanschap, staat hij bekend om zijn precisie, creativiteit en klantgerichtheid. Ayoub biedt moderne stijlen, klassieke kapsels en gespecialiseerde baardverzorging, altijd met een perfecte en gepersonalisederde look.",
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
  { id: "wash", name: "Shampooing Massant & Relaxant", price: 5 },
  { id: "wax", name: "Épilation Cire (Nez & Oreilles)", price: 6 },
  { id: "mask", name: "Masque Purifiant Visage à l'Argile", price: 10 },
  { id: "beverage", name: "Espresso Italien ou Whisky de Dégustation", price: 0 }
];

export const CLIENT_REVIEWS: CustomerReview[] = [
  {
    id: "rev-1",
    author: "Daan Van Der Berg",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    rating: 5,
    date: "Il y a 2 jours",
    text: "Sans doute le meilleur barber de Groningen sur Gedempte Zuiderdiep ! Majid a réalisé une coupe parfaite avec un soin du détail impressionnant. Le système de réservation est instantané.",
    serviceName: "Royal Combo (Coupe + Barbe VIP)",
    barberName: "Majid - Senior Master Barber",
    verified: true
  },
  {
    id: "rev-2",
    author: "Lars De Jong",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    rating: 5,
    date: "Il y a 4 jours",
    text: "Ayoub a plus de 12 ans d'expérience et ça se voit direct ! Taille de barbe au coupe-choux ultra nette. Ambiance au top au salon.",
    serviceName: "Taille de Barbe & Tracé",
    barberName: "Ayoub - Master Barber",
    verified: true
  },
  {
    id: "rev-3",
    author: "Thomas Miller",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80",
    rating: 5,
    date: "Il y a 1 semaine",
    text: "Service exceptionnel avec Yanti. Son attention personnelle et la précision de sa coupe sont remarquables. Je recommande sans hésitation.",
    serviceName: "Precision Skin Fade",
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
    description: "Dégradé bas très propre avec du relief texturisé sur le dessus. Finition mat naturelle.",
    tags: ["Skin Fade", "Textured Crop", "Modern"],
    serviceIdToBook: "skin-fade"
  },
  {
    id: "look-2",
    title: "Full Beard Sculpt & Sharp Contour",
    category: "beards",
    imageUrl: "https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?w=600&auto=format&fit=crop&q=80",
    description: "Barbe dense sculptée avec lignes de joues au tracé rasoir millimétré.",
    tags: ["Taille Barbe", "Rasoir", "Gentleman"],
    serviceIdToBook: "beard-sculpt"
  },
  {
    id: "look-3",
    title: "Mid Fade Pompadour & Taper",
    category: "combos",
    imageUrl: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?w=600&auto=format&fit=crop&q=80",
    description: "Style iconique revisité avec volume élégant et transition progressive.",
    tags: ["Pompadour", "Classic", "Premium"],
    serviceIdToBook: "royal-combo"
  },
  {
    id: "look-4",
    title: "Gentleman Side-Part & Sharp Beard",
    category: "classics",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
    description: "Raie sur le côté sculptée aux ciseaux avec fondu temporel subtil.",
    tags: ["Side Part", "Classique", "Business"],
    serviceIdToBook: "classic-cut"
  }
];

export const AUDIT_BENCHMARKS: AuditComparisonItem[] = [
  {
    feature: "Réservation en Ligne",
    oldSite: "Formulaire externe lent ou redirection tierce",
    newSite: "Module natif ultra-rapide 4 étapes avec choix du barbier et créneau direct",
    status: "better"
  },
  {
    feature: "Vitesse de chargement & Fluidité",
    oldSite: "Page statique lourde (Score ~45/100)",
    newSite: "Architecture React + Vite ultra-instantanée (Score ~99/100)",
    status: "better"
  },
  {
    feature: "Expérience Mobile & Ergonomie",
    oldSite: "Design basique non optimisé pour smartphones",
    newSite: "Interface tactile dark luxury intuitive avec effets de transition fluides",
    status: "better"
  },
  {
    feature: "Quiz Recommandation de Style",
    oldSite: "Absents - Choix de coupe à l'aveugle",
    newSite: "Quiz interactif 3 questions pour trouver la coupe parfaite selon la morphologie",
    status: "better"
  },
  {
    feature: "Expérience Sensorielle & Effets",
    oldSite: "Site vitrine passif sans animation",
    newSite: "Simulateur Avant/Après, ambiance sonore ASMR barber et confirmation animée",
    status: "better"
  },
  {
    feature: "Gestion des Rendez-vous",
    oldSite: "Pas d'historique ni de récapitulatif modifiable",
    newSite: "Espace 'Mes Rendez-vous' avec code de suivi, possibilité de décaler/annuler",
    status: "better"
  }
];
