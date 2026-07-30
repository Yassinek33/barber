export interface Translations {
  nav: {
    services: string;
    barbers: string;
    gallery: string;
    about: string;
    privacy: string;
    bookNow: string;
    mobileReserveSlot: string;
    asmrEnable: string;
    asmrDisable: string;
  };
  hero: {
    photoTagline: string;
    reserveringsmodule: string;
    directBoeken: string;
    beschikbaar: string;
    aanbevolenBehandelingen: string;
    knippenStylen: string;
    skinFade: string;
    eerstvolgendeTijden: string;
    vandaag: string;
    morgen: string;
    tevredenGratis: string;
    tevredenDesc: string;
    kiesDatum: string;
  };
  about: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    paragraph4: string;
    value1: string;
    value2: string;
    value3: string;
    cta: string;
  };
  services: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    catAll: string;
    catHaircut: string;
    catBeard: string;
    catCombo: string;
    catJunior: string;
    durationLabel: string;
    minutesShort: string;
    bookThis: string;
  };
  barbers: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    specialties: string;
    bookWith: string;
  };
  beforeAfter: {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
    bullet1: string;
    bullet2: string;
    bullet3: string;
    cta: string;
    switchExample: string;
    instructionBar: string;
    example1Before: string;
    example1After: string;
    example2Before: string;
    example2After: string;
  };
  gallery: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    filterAll: string;
    filterPhotos: string;
    filterVideos: string;
    lightboxPrompt: string;
    lightboxCta: string;
    imageAlt: string;
    videoLabel: string;
  };
  reviews: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    addReview: string;
    verifiedCustomer: string;
    modalTitle: string;
    nameLabel: string;
    namePlaceholder: string;
    scoreLabel: string;
    serviceLabel: string;
    commentLabel: string;
    commentPlaceholder: string;
    submit: string;
  };
  location: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    addressTitle: string;
    openInMaps: string;
    phoneTitle: string;
    parkingTitle: string;
    parkingDesc: string;
    openingHours: string;
    today: string;
    accessible: string;
    getDirections: string;
  };
  footer: {
    ticker: string;
    taglineSuffix: string;
    auditVsOldSite: string;
    navigation: string;
    linkServices: string;
    linkBarbers: string;
    linkBeforeAfter: string;
    linkGallery: string;
    linkReviews: string;
    contactDetails: string;
    onlineReserveren: string;
    rightsReserved: string;
    backToTop: string;
  };
  booking: {
    modalTitle: string;
    modalSubtitle: string;
    stepService: string;
    stepBarber: string;
    stepDateTime: string;
    stepConfirmation: string;
    step1Title: string;
    minutes: string;
    weekendOnlyNote: string;
    step2Title: string;
    anyBarberTitle: string;
    anyBarberDesc: string;
    step3Title: string;
    weekendOnlyBanner: string;
    selected: string;
    morning: string;
    afternoon: string;
    evening: string;
    noSlotsLeft: string;
    noSlotsForDay: string;
    step4Title: string;
    at: string;
    withBarber: string;
    availableBarber: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    extrasLabel: string;
    free: string;
    confirmedTitle: string;
    referenceLabel: string;
    confirmationSent: string;
    receiptTreatment: string;
    receiptBarber: string;
    receiptDateTime: string;
    receiptTotal: string;
    addToCalendar: string;
    done: string;
    back: string;
    continueBtn: string;
    confirmBooking: string;
    slotTaken: string;
    submitting: string;
    invalidName: string;
    invalidPhone: string;
  };
  audit: {
    modalTitle: string;
    modalSubtitle: string;
    metric1Label: string;
    metric1Desc: string;
    metric2Label: string;
    metric2Value: string;
    metric2Desc: string;
    metric3Label: string;
    metric3Desc: string;
    tableFeature: string;
    tableOld: string;
    tableNew: string;
    highlightsTitle: string;
    highlight1: string;
    highlight2: string;
    highlight3: string;
    highlight4: string;
    close: string;
    testBooking: string;
  };
}

export const translations: Record<'nl' | 'en', Translations> = {
  nl: {
    nav: {
      services: 'Diensten',
      barbers: 'Barbiers',
      gallery: 'Galerij',
      about: 'Over Ons',
      privacy: 'Veiligheid & Privacy',
      bookNow: 'Afspraak Maken',
      mobileReserveSlot: 'Reserveer een Tijdslot',
      asmrEnable: 'ASMR barbergeluid inschakelen',
      asmrDisable: 'ASMR-sfeer uitschakelen',
    },
    hero: {
      photoTagline: 'Uw plek voor precisiekapsels en klassieke baardverzorging in het hart van Groningen.',
      reserveringsmodule: 'Reserveringsmodule',
      directBoeken: 'Direct Boeken',
      beschikbaar: 'Beschikbaar',
      aanbevolenBehandelingen: 'Aanbevolen Behandelingen',
      knippenStylen: 'Knippen & Stylen',
      skinFade: 'Skin Fade',
      eerstvolgendeTijden: 'Eerstvolgende Beschikbare Tijden',
      vandaag: 'Vandaag',
      morgen: 'Morgen',
      tevredenGratis: 'Tevreden of Gratis Retouche',
      tevredenDesc: 'Als de knipbeurt niet 100% naar wens is, bieden we binnen 7 dagen een gratis retouche.',
      kiesDatum: 'Kies mijn Datum & Tijd',
    },
    about: {
      badge: 'Over Ons',
      title: 'Het verhaal achter',
      titleHighlight: 'de schaar',
      subtitle: 'Wie we zijn, waar we vandaan komen, en waarom vakmanschap bij ons nooit onderhandelbaar is.',
      paragraph1: 'The Premium Barbershop Groningen is opgericht door Majid, met een simpel maar niet-onderhandelbaar uitgangspunt: een knipbeurt is pas af als hij tot in de details klopt. Na jaren achter andermans stoel besloot hij zijn eigen zaak te openen aan het Zuiderdiep, in het hart van Groningen, met precies één doel: mannen een knipbeurt geven waar ze zonder twijfel weer voor terugkomen.',
      paragraph2: 'Wat begon met één stoel groeide uit tot een vast team van master barbers, elk met hun eigen stijl maar dezelfde instelling: geen haastwerk, geen shortcuts. Skin fades die tot op de millimeter kloppen, baarden die met het scheermes worden afgewerkt, en een oog voor de details die het verschil maken tussen "goed" en "precies goed".',
      paragraph3: 'Kappen is voor ons geen trend, het is een ambacht. Die filosofie zit in elke knip, van de eerste klant \'s ochtends tot de laatste in de avond. Of je nu al jaren vaste klant bent of voor het eerst binnenstapt: je gaat weg met een kapsel waar je zelf tevreden mee bent, niet alleen wij.',
      paragraph4: 'Daarom investeren we net zo hard in de sfeer als in de techniek. Een goede knipbeurt begint bij op je gemak zijn in de stoel, een goed gesprek, en een barbier die echt luistert naar wat je wilt. Dat is het verschil dat we elke dag opnieuw willen waarmaken.',
      value1: '18 jaar vakmanschap',
      value2: 'Klassiek scheermes-werk',
      value3: 'Een hecht team van master barbers',
      cta: 'Maak Kennis in de Stoel',
    },
    services: {
      badge: 'Menu & Behandelingen Hoogwaardig Kappen',
      title: 'Tarieven &',
      titleHighlight: 'Barbering Behandelingen',
      subtitle: 'Elke behandeling omvat een persoonlijke diagnose, hoogwaardige verzorgingsproducten voor mannen en een gratis drankje.',
      catAll: 'Alle Diensten',
      catHaircut: 'Knipbeurten & Skin Fades',
      catBeard: 'Baardtrim & Scheren',
      catCombo: 'Signature VIP Pakketten',
      catJunior: 'Jonge Gentleman',
      durationLabel: 'Geschatte duur:',
      minutesShort: 'min',
      bookThis: 'Reserveer deze Dienst',
    },
    barbers: {
      badge: 'Het Team van Master Barbiers',
      title: 'Kunstenaars van',
      titleHighlight: 'Scheermes & Schaar',
      subtitle: 'Elk teamlid heeft jarenlange ervaring in een hoogwaardige zaak om u de perfecte knipbeurt te bieden.',
      specialties: 'Specialiteiten:',
      bookWith: 'Reserveer bij',
    },
    beforeAfter: {
      badge: 'Interactieve Transformatie Simulator',
      title: 'Sleep om te vergelijken',
      titleHighlight: 'Voor vs Na',
      description: 'Zie de metamorfose live. Onze barbiers werken met op maat gemaakte kniptechnieken om de structuur van uw gezicht in balans te brengen en uw baardlijn aan te scherpen.',
      bullet1: 'Geleidelijke fade zonder scheidingslijn, tot op de millimeter',
      bullet2: 'Baardlijn met het scheermes & kalmerende warme handdoek',
      bullet3: 'Natuurlijke styling die de hele dag standhoudt',
      cta: 'Krijg deze Transformatie',
      switchExample: 'Ander Voorbeeld',
      instructionBar: '◀ Sleep de schuifregelaar om te vergelijken ▶',
      example1Before: 'Voor (Ongestyled)',
      example1After: 'Na (Low Fade & Krullen)',
      example2Before: 'Voor (Ongestyled)',
      example2After: 'Na (Skin Fade & Nette Baard)',
    },
    gallery: {
      badge: 'Lookbook & Barbier Inspiratie',
      title: 'Galerij van onze',
      titleHighlight: 'Creaties',
      subtitle: 'Echte foto\'s en video\'s, rechtstreeks uit de zaak in Groningen.',
      filterAll: 'Alles',
      filterPhotos: "Foto's",
      filterVideos: "Video's",
      lightboxPrompt: 'Zelf ook zo\'n resultaat?',
      lightboxCta: 'Boek een Afspraak',
      imageAlt: 'Resultaat van The Premium Barbershop Groningen',
      videoLabel: 'Video',
    },
    reviews: {
      badge: 'Echte Klantbeoordelingen Groningen',
      title: 'Wat onze',
      titleHighlight: 'Gentlemen zeggen',
      subtitle: 'Gemiddelde score van 4.9/5★ op basis van meer dan 488 geverifieerde reviews.',
      addReview: 'Beoordeling Achterlaten',
      verifiedCustomer: 'Geverifieerde Klant',
      modalTitle: 'Geef uw Klantbeoordeling',
      nameLabel: 'Uw Naam / Bijnaam:',
      namePlaceholder: 'bijv: Julien D.',
      scoreLabel: 'Tevredenheidsscore:',
      serviceLabel: 'Uitgevoerde Dienst:',
      commentLabel: 'Uw Opmerking:',
      commentPlaceholder: 'Deel uw ervaring met de knipbeurt, de sfeer en de barbier...',
      submit: 'Mijn Beoordeling Plaatsen',
    },
    location: {
      badge: 'Adres & Openingstijden',
      title: 'In het Hart van het Centrum van',
      titleHighlight: 'Groningen',
      subtitle: 'Vind ons eenvoudig in de winkelstraat Oosterstraat, op enkele minuten van de Grote Markt.',
      addressTitle: 'Adres van de Zaak',
      openInMaps: 'Openen in Google Maps',
      phoneTitle: 'Telefoon',
      parkingTitle: 'Parkeren in de Buurt',
      parkingDesc: 'Q-Park Rademarkt & Damsterdiep (3 min lopen)',
      openingHours: 'Openingstijden',
      today: '(Vandaag)',
      accessible: 'Toegankelijk voor Rolstoelgebruikers & Krachtige Airco',
      getDirections: 'Bereken de Route',
    },
    footer: {
      ticker: 'Moderne Snelle Premium Verzorging • Groningen Westerhaven • Boek Nu • Scherp Geknipt • Zonder Zorgen • Sinds 2018 • Premium Baard Detail • 4.9/5 Google Beoordeling • ',
      taglineSuffix: 'Uitmuntende mannenverzorging in het hart van Groningen.',
      auditVsOldSite: 'Audit vs Oude Site',
      navigation: 'Navigatie',
      linkServices: 'Diensten & Tarieven',
      linkBarbers: 'Onze Master Barbiers',
      linkBeforeAfter: 'Voor / Na',
      linkGallery: 'Fotogalerij',
      linkReviews: 'Klantbeoordelingen',
      contactDetails: 'Contactgegevens',
      onlineReserveren: 'Online Reserveren',
      rightsReserved: 'Alle rechten voorbehouden.',
      backToTop: 'Naar Boven',
    },
    booking: {
      modalTitle: 'Reserveer een Tijdslot bij de Barbier',
      modalSubtitle: 'The Premium Barbershop Groningen • Direct & Zonder Wachten',
      stepService: 'Dienst',
      stepBarber: 'Barbier',
      stepDateTime: 'Datum & Tijd',
      stepConfirmation: 'Bevestiging',
      step1Title: 'Stap 1: Kies uw Behandeling',
      minutes: 'minuten',
      weekendOnlyNote: 'Alleen op zaterdag & zondag',
      step2Title: 'Stap 2: Kies uw Favoriete Barbier',
      anyBarberTitle: 'Elke Beschikbare Barbier',
      anyBarberDesc: 'Automatische toewijzing op basis van de beste beschikbaarheid',
      step3Title: 'Stap 3: Kies de Dag & het Tijdstip',
      weekendOnlyBanner: 'Deze dienst is alleen beschikbaar op zaterdag en zondag — de kalender toont enkel weekenddagen.',
      selected: 'Geselecteerd:',
      morning: 'Ochtend',
      afternoon: 'Middag',
      evening: 'Avond / Late Uren',
      noSlotsLeft: 'Geen tijden meer beschikbaar',
      noSlotsForDay: 'Geen tijden meer beschikbaar op deze dag — kies een andere dag in de kalender.',
      step4Title: 'Stap 4: Uw Gegevens & VIP Opties',
      at: 'om',
      withBarber: 'Bij',
      availableBarber: 'Beschikbare Barbier',
      fullNameLabel: 'Voor- & Achternaam *:',
      fullNamePlaceholder: 'bijv: Lucas Jansen',
      phoneLabel: 'Telefoonnummer *:',
      phonePlaceholder: 'bijv: 6 1234 5678',
      emailLabel: 'E-mailadres (voor bevestiging) *:',
      emailPlaceholder: 'bijv: lucas@example.com',
      extrasLabel: 'Extra of VIP Opties:',
      free: 'Gratis',
      confirmedTitle: 'Reservering Bevestigd!',
      referenceLabel: 'Referentie:',
      confirmationSent: 'Een SMS & e-mail ter bevestiging is verzonden naar',
      receiptTreatment: 'Behandeling:',
      receiptBarber: 'Barbier:',
      receiptDateTime: 'Datum & Tijd:',
      receiptTotal: 'Totaal te betalen in de zaak:',
      addToCalendar: 'Toevoegen aan mijn Agenda',
      done: 'Voltooien',
      back: 'Terug',
      continueBtn: 'Doorgaan',
      confirmBooking: 'Bevestig mijn Reservering',
      slotTaken: 'Dit tijdstip is net bezet geraakt — kies een ander tijdstip.',
      submitting: 'Bezig met bevestigen...',
      invalidName: 'Vul een geldige naam in (alleen letters).',
      invalidPhone: 'Vul een geldig telefoonnummer in voor het gekozen land.',
    },
    audit: {
      modalTitle: 'Analyse & Vergelijking van de Barbier Website',
      modalSubtitle: 'Oude standaard site (thepremiumbarbershopgroningen.nl) vs Nieuw Gemoderniseerd Platform',
      metric1Label: 'Laadsnelheid',
      metric1Desc: 'Reactieve Vite SPA architectuur',
      metric2Label: 'Geïntegreerd Reserveren',
      metric2Value: 'Direct in 4 Stappen',
      metric2Desc: 'Keuze barbier, tijdslot & bevestiging',
      metric3Label: 'Mobiele UX Score',
      metric3Desc: 'Precieze dark-luxury touch-ervaring',
      tableFeature: 'Functie',
      tableOld: 'Oude Barbier Site',
      tableNew: 'Nieuwe Ultra-Moderne Versie',
      highlightsTitle: 'Waarom deze nieuwe versie de klantconversie transformeert:',
      highlight1: 'Direct reserveringssysteem zonder de site te verlaten: Hiermee kiest u precies het type fade, de favoriete barbier en het exacte tijdslot.',
      highlight2: 'Interactieve Voor/Na Module: Laat klanten het precisiewerk zien voordat ze een afspraak maken.',
      highlight3: 'VIP Service aan Huis: Boek een knipbeurt of weekendafspraak gewoon bij u thuis, zonder de deur uit te hoeven.',
      highlight4: 'Persoonlijke bevestigingsmail: elke reservering krijgt een professionele e-mail met een beveiligde link om de afspraak zelf te wijzigen of te annuleren.',
      close: 'Sluiten',
      testBooking: 'Test de Reservering',
    },
  },
  en: {
    nav: {
      services: 'Services',
      barbers: 'Barbers',
      gallery: 'Gallery',
      about: 'About Us',
      privacy: 'Safety & Privacy',
      bookNow: 'Book Now',
      mobileReserveSlot: 'Book a Time Slot',
      asmrEnable: 'Enable ASMR barbershop sound',
      asmrDisable: 'Disable ASMR ambience',
    },
    hero: {
      photoTagline: 'Your spot for precision haircuts and classic beard grooming in the heart of Groningen.',
      reserveringsmodule: 'Booking Module',
      directBoeken: 'Book Instantly',
      beschikbaar: 'Available',
      aanbevolenBehandelingen: 'Recommended Treatments',
      knippenStylen: 'Haircut & Style',
      skinFade: 'Skin Fade',
      eerstvolgendeTijden: 'Next Available Times',
      vandaag: 'Today',
      morgen: 'Tomorrow',
      tevredenGratis: 'Satisfied or a Free Touch-up',
      tevredenDesc: "If you're not 100% happy with the cut, we offer a free touch-up within 7 days.",
      kiesDatum: 'Choose my Date & Time',
    },
    about: {
      badge: 'About Us',
      title: 'The story behind',
      titleHighlight: 'the scissors',
      subtitle: "Who we are, where we come from, and why craftsmanship is never up for negotiation.",
      paragraph1: "The Premium Barbershop Groningen was founded by Majid, on one simple, non-negotiable idea: a haircut isn't finished until it's right down to the last detail. After years working behind someone else's chair, he decided to open his own shop on the Zuiderdiep, in the heart of Groningen, with exactly one goal: to give men a haircut they'd come back for without a second thought.",
      paragraph2: "What started with a single chair grew into a permanent team of master barbers, each with their own style but the same mindset: no rushing, no shortcuts. Skin fades that are right down to the millimetre, beards finished with the straight razor, and an eye for the details that make the difference between \"good\" and \"exactly right\".",
      paragraph3: "Barbering isn't a trend to us, it's a craft. That philosophy runs through every cut, from the first client in the morning to the last one at night. Whether you've been a regular for years or you're stepping in for the first time: you leave with a cut you're happy with, not just us.",
      paragraph4: "That's why we put as much into the atmosphere as into the technique. A good haircut starts with feeling at ease in the chair, a good conversation, and a barber who genuinely listens to what you want. That's the difference we aim to deliver, every single day.",
      value1: '18 years of craftsmanship',
      value2: 'Classic straight-razor work',
      value3: 'A tight-knit team of master barbers',
      cta: 'Come Meet Us in the Chair',
    },
    services: {
      badge: 'Menu & Premium Barbering Treatments',
      title: 'Pricing &',
      titleHighlight: 'Barbering Treatments',
      subtitle: "Every treatment includes a personal consultation, premium men's grooming products, and a complimentary drink.",
      catAll: 'All Treatments',
      catHaircut: 'Haircuts & Skin Fades',
      catBeard: 'Beard Trim & Shaves',
      catCombo: 'Signature VIP Packages',
      catJunior: 'Young Gentleman',
      durationLabel: 'Estimated duration:',
      minutesShort: 'min',
      bookThis: 'Book this Treatment',
    },
    barbers: {
      badge: 'The Team of Master Barbers',
      title: 'Artisans of',
      titleHighlight: 'Razor & Scissors',
      subtitle: 'Every team member brings years of experience in a premium shop to give you the perfect haircut.',
      specialties: 'Specialties:',
      bookWith: 'Book with',
    },
    beforeAfter: {
      badge: 'Interactive Transformation Simulator',
      title: 'Drag to compare',
      titleHighlight: 'Before vs After',
      description: 'See the transformation live. Our barbers use tailored cutting techniques to balance the structure of your face and sharpen your beard line.',
      bullet1: 'Gradual fade with no visible line, down to the millimetre',
      bullet2: 'Beard line with the straight razor & a soothing warm towel',
      bullet3: 'Natural styling that holds up all day',
      cta: 'Get this Transformation',
      switchExample: 'Different Example',
      instructionBar: '◀ Drag the slider to compare ▶',
      example1Before: 'Before (Unstyled)',
      example1After: 'After (Low Fade & Curls)',
      example2Before: 'Before (Unstyled)',
      example2After: 'After (Skin Fade & Groomed Beard)',
    },
    gallery: {
      badge: 'Lookbook & Barber Inspiration',
      title: 'Gallery of our',
      titleHighlight: 'Creations',
      subtitle: 'Real photos and videos, straight from the shop in Groningen.',
      filterAll: 'All',
      filterPhotos: 'Photos',
      filterVideos: 'Videos',
      lightboxPrompt: 'Want this result yourself?',
      lightboxCta: 'Book an Appointment',
      imageAlt: 'Result from The Premium Barbershop Groningen',
      videoLabel: 'Video',
    },
    reviews: {
      badge: 'Real Customer Reviews Groningen',
      title: 'What our',
      titleHighlight: 'Gentlemen say',
      subtitle: 'Average rating of 4.9/5★ based on more than 488 verified reviews.',
      addReview: 'Leave a Review',
      verifiedCustomer: 'Verified Customer',
      modalTitle: 'Leave your Review',
      nameLabel: 'Your Name / Nickname:',
      namePlaceholder: 'e.g. Julien D.',
      scoreLabel: 'Satisfaction Score:',
      serviceLabel: 'Service Received:',
      commentLabel: 'Your Comment:',
      commentPlaceholder: 'Share your experience with the haircut, the vibe and the barber...',
      submit: 'Post my Review',
    },
    location: {
      badge: 'Address & Opening Hours',
      title: 'In the Heart of Downtown',
      titleHighlight: 'Groningen',
      subtitle: 'Easy to find on the Oosterstraat shopping street, just minutes from the Grote Markt.',
      addressTitle: 'Shop Address',
      openInMaps: 'Open in Google Maps',
      phoneTitle: 'Phone',
      parkingTitle: 'Parking Nearby',
      parkingDesc: 'Q-Park Rademarkt & Damsterdiep (3 min walk)',
      openingHours: 'Opening Hours',
      today: '(Today)',
      accessible: 'Wheelchair Accessible & Powerful A/C',
      getDirections: 'Get Directions',
    },
    footer: {
      ticker: "Modern Fast Premium Grooming • Groningen Westerhaven • Book Now • Sharp Cuts • Zero Worries • Since 2018 • Premium Beard Detail • 4.9/5 Google Rating • ",
      taglineSuffix: "Premium men's grooming in the heart of Groningen.",
      auditVsOldSite: 'Audit vs Old Site',
      navigation: 'Navigation',
      linkServices: 'Services & Pricing',
      linkBarbers: 'Our Master Barbers',
      linkBeforeAfter: 'Before / After',
      linkGallery: 'Photo Gallery',
      linkReviews: 'Customer Reviews',
      contactDetails: 'Contact Details',
      onlineReserveren: 'Book Online',
      rightsReserved: 'All rights reserved.',
      backToTop: 'Back to Top',
    },
    booking: {
      modalTitle: 'Book a Time Slot with the Barber',
      modalSubtitle: 'The Premium Barbershop Groningen • Instant & No Waiting',
      stepService: 'Service',
      stepBarber: 'Barber',
      stepDateTime: 'Date & Time',
      stepConfirmation: 'Confirmation',
      step1Title: 'Step 1: Choose your Treatment',
      minutes: 'minutes',
      weekendOnlyNote: 'Saturday & Sunday only',
      step2Title: 'Step 2: Choose your Favorite Barber',
      anyBarberTitle: 'Any Available Barber',
      anyBarberDesc: 'Automatically assigned based on best availability',
      step3Title: 'Step 3: Choose the Day & Time',
      weekendOnlyBanner: 'This service is only available on Saturday and Sunday — the calendar only shows weekend days.',
      selected: 'Selected:',
      morning: 'Morning',
      afternoon: 'Afternoon',
      evening: 'Evening / Late Hours',
      noSlotsLeft: 'No times left available',
      noSlotsForDay: 'No times left available on this day — pick another day on the calendar.',
      step4Title: 'Step 4: Your Details & VIP Options',
      at: 'at',
      withBarber: 'With',
      availableBarber: 'Available Barber',
      fullNameLabel: 'First & Last Name *:',
      fullNamePlaceholder: 'e.g. Lucas Jansen',
      phoneLabel: 'Phone Number *:',
      phonePlaceholder: 'e.g. 6 1234 5678',
      emailLabel: 'Email Address (for confirmation) *:',
      emailPlaceholder: 'e.g. lucas@example.com',
      extrasLabel: 'Extras or VIP Options:',
      free: 'Free',
      confirmedTitle: 'Booking Confirmed!',
      referenceLabel: 'Reference:',
      confirmationSent: 'A confirmation SMS & email has been sent to',
      receiptTreatment: 'Treatment:',
      receiptBarber: 'Barber:',
      receiptDateTime: 'Date & Time:',
      receiptTotal: 'Total to pay in-store:',
      addToCalendar: 'Add to my Calendar',
      done: 'Done',
      back: 'Back',
      continueBtn: 'Continue',
      confirmBooking: 'Confirm my Booking',
      slotTaken: 'This time slot was just taken — please pick another one.',
      submitting: 'Confirming...',
      invalidName: 'Please enter a valid name (letters only).',
      invalidPhone: 'Please enter a valid phone number for the selected country.',
    },
    audit: {
      modalTitle: 'Analysis & Comparison of the Barbershop Website',
      modalSubtitle: 'Old standard site (thepremiumbarbershopgroningen.nl) vs New Modernized Platform',
      metric1Label: 'Load Speed',
      metric1Desc: 'Reactive Vite SPA architecture',
      metric2Label: 'Integrated Booking',
      metric2Value: 'Instant in 4 Steps',
      metric2Desc: 'Choice of barber, time slot & confirmation',
      metric3Label: 'Mobile UX Score',
      metric3Desc: 'Precise dark-luxury touch experience',
      tableFeature: 'Feature',
      tableOld: 'Old Barbershop Site',
      tableNew: 'New Ultra-Modern Version',
      highlightsTitle: 'Why this new version transforms customer conversion:',
      highlight1: 'Instant booking system without leaving the site: pick the exact fade type, favorite barber, and exact time slot.',
      highlight2: 'Interactive Before/After Module: shows clients the precision work before they even book.',
      highlight3: 'VIP At-Home Service: book a haircut or weekend appointment right at home, no need to go out.',
      highlight4: 'Personal confirmation email: every booking gets a professional email with a secure link to modify or cancel the appointment.',
      close: 'Close',
      testBooking: 'Test the Booking',
    },
  },
};
