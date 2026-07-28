export type ServiceCategory = 'all' | 'haircut' | 'beard' | 'combo' | 'junior';

export interface BarberService {
  id: string;
  name: string;
  category: ServiceCategory;
  price: number;
  durationMinutes?: number;
  description: string;
  badge?: string;
  icon: string;
  popular?: boolean;
}

export interface Barber {
  id: string;
  name: string;
  nickname: string;
  role: string;
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  avatarUrl: string;
  bio: string;
  specialties: string[];
  instagram: string;
}

export interface BookingDetails {
  serviceId: string;
  barberId: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. '10:30'
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes?: string;
  extras: string[];
}

export interface ConfirmedBooking {
  id: string; // e.g. PBG-9482
  service: BarberService;
  barber: Barber;
  date: string;
  timeSlot: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  extras: { name: string; price: number }[];
  totalPrice: number;
  durationMinutes?: number;
  createdAt: string;
  status: 'bevestigd' | 'voltooid' | 'geannuleerd';
}

export interface CustomerReview {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
  serviceName: string;
  barberName: string;
  verified: boolean;
}

export interface GalleryMediaItem {
  id: string;
  type: 'image' | 'video';
  src: string;
}

export interface AuditComparisonItem {
  feature: string;
  oldSite: string;
  newSite: string;
  status: 'better' | 'equal';
}
