export type DeliveryStatus =
  | 'on_the_way_to_pickup'
  | 'arrived_pickup'
  | 'picked_up'
  | 'in_transit'
  | 'arrived_dropoff'
  | 'delivered'
  | 'cancelled';

export interface LocationPoint {
  title: string;
  address: string;
  lat?: number;
  lng?: number;
}

export interface TravelerMatch {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  completionRate: number;
  distanceKm: number;
  etaMins: number;
  totalEarning: number;
  phone?: string;
  levelBadge?: string;
}

export interface PackageDetails {
  category: 'Electronics' | 'Documents' | 'Food' | 'Clothing' | 'Accessories' | 'Parcel';
  size: 'Small' | 'Medium' | 'Large';
  estimatedValue: number;
  weight: string;
  fragile: boolean;
  notes?: string;
}

export interface PriceBreakdown {
  deliveryFee: number;
  serviceFee: number;
  total: number;
}

export interface DeliveryReview {
  rating: number;
  tags: string[];
  comment?: string;
  createdAt: string;
}

export interface DeliveryItem {
  id: string; // e.g. "CTR-78291"
  pickup: LocationPoint;
  dropoff: LocationPoint;
  distanceKm: number;
  estTime: string;
  package: PackageDetails;
  price: PriceBreakdown;
  status: DeliveryStatus;
  traveler?: TravelerMatch;
  sender: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    completionRate: number;
    phone: string;
  };
  recipient?: {
    name: string;
    phone: string;
    address: string;
  };
  otpCode: string; // e.g. "374912"
  proofPhotoUrl?: string;
  createdAt: string;
  completedAt?: string;
  paymentMethod: 'wallet' | 'card' | 'bank_transfer' | 'ussd';
  review?: DeliveryReview;
}

export interface CreateDeliveryState {
  step: number; // 1 to 9
  pickup: LocationPoint;
  dropoff: LocationPoint;
  package: PackageDetails;
  price: PriceBreakdown;
  paymentMethod: 'wallet' | 'card' | 'bank_transfer' | 'ussd';
  selectedTraveler: TravelerMatch | null;
  activeDeliveryId: string | null;
  isCompleted: boolean;
}

export interface TravelerActiveJobState {
  step: number; // 1 to 9
  deliveryId: string;
  proofPhoto: string | null;
  otpInput: string[];
  isOtpValid: boolean;
  isCompleted: boolean;
}
