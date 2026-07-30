import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { VideoHero } from './components/VideoHero';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { BarbersSection } from './components/BarbersSection';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { AuditComparisonModal } from './components/AuditComparisonModal';
import { BookingModal } from './components/BookingModal';
import { Footer } from './components/Footer';
import { SplashScreen } from './components/SplashScreen';
import { BarberConnectPage } from './components/BarberConnectPage';
import { ManageBookingPage } from './components/ManageBookingPage';
import { PrivacyPage } from './components/PrivacyPage';
import { LanguageProvider } from './i18n/LanguageContext';

// Scrolls to top on every route change, or to a #hash target if present
// (used by links that point back to a home-page section, e.g. /#reviews).
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  const location = useLocation();
  const isBarberConnectRoute = location.pathname.startsWith('/team/');
  const isManageBookingRoute = location.pathname.startsWith('/afspraak/');

  const [showSplash, setShowSplash] = useState(true);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>();
  const [preselectedBarberId, setPreselectedBarberId] = useState<string | undefined>();

  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  const handleOpenBooking = (serviceId?: string, barberId?: string) => {
    setPreselectedServiceId(serviceId);
    setPreselectedBarberId(barberId);
    setIsBookingModalOpen(true);
  };

  const homeContent = (
    <>
      <VideoHero onOpenBooking={() => handleOpenBooking()} />
      <Hero onOpenBooking={handleOpenBooking} />
      <BeforeAfterSlider onOpenBooking={() => handleOpenBooking()} />
      <ReviewsSection />
      <LocationSection />
    </>
  );

  const servicesContent = (
    <div className="pt-24">
      <ServicesSection onSelectServiceToBook={(sId) => handleOpenBooking(sId)} />
    </div>
  );

  const barbersContent = (
    <div className="pt-24">
      <BarbersSection onSelectBarberToBook={(bId) => handleOpenBooking(undefined, bId)} />
    </div>
  );

  const galleryContent = (
    <div className="pt-24">
      <GallerySection onSelectServiceToBook={(sId) => handleOpenBooking(sId)} />
    </div>
  );

  const aboutContent = (
    <div className="pt-24">
      <AboutSection onOpenBooking={() => handleOpenBooking()} />
      <LocationSection />
    </div>
  );

  const privacyContent = (
    <div className="pt-24">
      <PrivacyPage />
    </div>
  );

  // Private per-barber calendar-connect page — deliberately outside the
  // public site chrome (no navbar/footer/language switcher, just the tool).
  if (isBarberConnectRoute) {
    return (
      <Routes>
        <Route path="/team/:barberId/agenda" element={<BarberConnectPage />} />
      </Routes>
    );
  }

  // Customer-facing "manage my booking" page, linked from the confirmation
  // email — also outside the site chrome, just the summary + actions.
  if (isManageBookingRoute) {
    return (
      <Routes>
        <Route path="/afspraak/:bookingId" element={<ManageBookingPage />} />
      </Routes>
    );
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#0B0B0E] text-slate-100 font-sans antialiased selection:bg-[#D4AF37] selection:text-black">

        {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

        <ScrollManager />

        {/* Top Fixed Header */}
        <Navbar
          onOpenBooking={(sId) => handleOpenBooking(sId)}
        />

        {/* Routed Page Content — Dutch routes are canonical, /en/* mirrors them for the English version */}
        <main>
          <Routes>
            <Route path="/" element={homeContent} />
            <Route path="/en" element={homeContent} />

            <Route path="/diensten" element={servicesContent} />
            <Route path="/en/services" element={servicesContent} />

            <Route path="/barbiers" element={barbersContent} />
            <Route path="/en/barbers" element={barbersContent} />

            <Route path="/galerij" element={galleryContent} />
            <Route path="/en/gallery" element={galleryContent} />

            <Route path="/over-ons" element={aboutContent} />
            <Route path="/en/about" element={aboutContent} />

            <Route path="/veiligheid-privacy" element={privacyContent} />
            <Route path="/en/safety-privacy" element={privacyContent} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer
          onOpenBooking={() => handleOpenBooking()}
          onOpenAuditModal={() => setIsAuditModalOpen(true)}
        />

        {/* Modals & Overlays */}
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          preselectedServiceId={preselectedServiceId}
          preselectedBarberId={preselectedBarberId}
          onBookingConfirmed={() => {}}
        />

        <AuditComparisonModal
          isOpen={isAuditModalOpen}
          onClose={() => setIsAuditModalOpen(false)}
          onOpenBooking={() => handleOpenBooking()}
        />

      </div>
    </LanguageProvider>
  );
}
