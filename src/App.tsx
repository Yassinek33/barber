import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { BarbersSection } from './components/BarbersSection';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { StyleFinderQuiz } from './components/StyleFinderQuiz';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { AuditComparisonModal } from './components/AuditComparisonModal';
import { BookingModal } from './components/BookingModal';
import { MyBookingsModal } from './components/MyBookingsModal';
import { Footer } from './components/Footer';
import { ConfirmedBooking } from './types';

// Scrolls to top on every route change, or to a #hash target if present
// (used by links that point back to a home-page section, e.g. /#quiz).
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
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>();
  const [preselectedBarberId, setPreselectedBarberId] = useState<string | undefined>();

  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  // LocalStorage state for persistent client appointments
  const [bookings, setBookings] = useState<ConfirmedBooking[]>(() => {
    try {
      const saved = localStorage.getItem('pbg_my_bookings');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('pbg_my_bookings', JSON.stringify(bookings));
    } catch {
      // ignore
    }
  }, [bookings]);

  const handleOpenBooking = (serviceId?: string, barberId?: string) => {
    setPreselectedServiceId(serviceId);
    setPreselectedBarberId(barberId);
    setIsBookingModalOpen(true);
  };

  const handleBookingConfirmed = (newBooking: ConfirmedBooking) => {
    setBookings([newBooking, ...bookings]);
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings(bookings.filter(b => b.id !== bookingId));
  };

  return (
    <div className="min-h-screen bg-[#0B0B0E] text-slate-100 font-sans antialiased selection:bg-[#D4AF37] selection:text-black">

      <ScrollManager />

      {/* Top Fixed Header */}
      <Navbar
        onOpenBooking={(sId) => handleOpenBooking(sId)}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        onOpenAuditModal={() => setIsAuditModalOpen(true)}
        myBookingsCount={bookings.length}
      />

      {/* Routed Page Content */}
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero
                  onOpenBooking={() => handleOpenBooking()}
                  onOpenQuiz={() => {
                    const el = document.getElementById('quiz');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onOpenAuditModal={() => setIsAuditModalOpen(true)}
                />
                <BeforeAfterSlider onOpenBooking={() => handleOpenBooking()} />
                <StyleFinderQuiz onSelectServiceToBook={(sId) => handleOpenBooking(sId)} />
                <ReviewsSection />
                <LocationSection />
              </>
            }
          />

          <Route
            path="/diensten"
            element={
              <div className="pt-24">
                <ServicesSection onSelectServiceToBook={(sId) => handleOpenBooking(sId)} />
              </div>
            }
          />

          <Route
            path="/barbiers"
            element={
              <div className="pt-24">
                <BarbersSection onSelectBarberToBook={(bId) => handleOpenBooking(undefined, bId)} />
              </div>
            }
          />

          <Route
            path="/galerij"
            element={
              <div className="pt-24">
                <GallerySection onSelectServiceToBook={(sId) => handleOpenBooking(sId)} />
              </div>
            }
          />
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
        onBookingConfirmed={handleBookingConfirmed}
      />

      <MyBookingsModal
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
        bookings={bookings}
        onCancelBooking={handleCancelBooking}
        onOpenBooking={() => handleOpenBooking()}
      />

      <AuditComparisonModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        onOpenBooking={() => handleOpenBooking()}
      />

    </div>
  );
}
