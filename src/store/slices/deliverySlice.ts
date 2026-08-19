import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  DeliveryItem,
  DeliveryStatus,
  LocationPoint,
  PackageDetails,
  TravelerMatch,
  CreateDeliveryState,
  TravelerActiveJobState,
  DeliveryReview,
} from '@/types/delivery';

export const mockTravelers: TravelerMatch[] = [
  {
    id: 'trv-1',
    name: 'Ridwan K.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces',
    rating: 4.9,
    reviewsCount: 230,
    completionRate: 98,
    distanceKm: 0.8,
    etaMins: 3,
    totalEarning: 1360,
    phone: '+234 812 345 6789',
    levelBadge: 'Level 3',
  },
  {
    id: 'trv-2',
    name: 'David N.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces',
    rating: 4.8,
    reviewsCount: 176,
    completionRate: 96,
    distanceKm: 1.1,
    etaMins: 4,
    totalEarning: 1360,
    phone: '+234 803 111 2233',
    levelBadge: 'Level 2',
  },
  {
    id: 'trv-3',
    name: 'James E.',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop&crop=faces',
    rating: 4.9,
    reviewsCount: 156,
    completionRate: 95,
    distanceKm: 1.3,
    etaMins: 5,
    totalEarning: 1360,
    phone: '+234 814 999 8877',
    levelBadge: 'Level 2',
  },
  {
    id: 'trv-4',
    name: 'Tobi A.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces',
    rating: 4.7,
    reviewsCount: 99,
    completionRate: 94,
    distanceKm: 1.6,
    etaMins: 6,
    totalEarning: 1360,
    phone: '+234 809 555 4433',
    levelBadge: 'Level 1',
  },
];

export const initialDeliveries: DeliveryItem[] = [
  {
    id: 'CTR-78291',
    pickup: {
      title: 'Ikeja City Mall',
      address: 'Alausa, Ikeja, Lagos',
      lat: 6.6145,
      lng: 3.3582,
    },
    dropoff: {
      title: 'Yaba Tech Hub',
      address: 'Herbert Macaulay Way, Yaba, Lagos',
      lat: 6.5173,
      lng: 3.3761,
    },
    distanceKm: 12.4,
    estTime: '25-35 mins',
    package: {
      category: 'Electronics',
      size: 'Medium',
      estimatedValue: 25000,
      weight: '1kg',
      fragile: false,
      notes: 'Please handle with care.',
    },
    price: {
      deliveryFee: 1240,
      serviceFee: 120,
      total: 1360,
    },
    status: 'on_the_way_to_pickup',
    traveler: mockTravelers[0],
    sender: {
      id: 'usr-1',
      name: 'Tobi A.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces',
      rating: 4.9,
      completionRate: 98,
      phone: '+234 802 345 6789',
    },
    recipient: {
      name: 'David N.',
      phone: '+234 809 112 3344',
      address: 'Yaba Tech Hub, Yaba, Lagos',
    },
    otpCode: '374912',
    createdAt: 'May 12, 2025 • 10:46 AM',
    paymentMethod: 'wallet',
  },
  {
    id: 'CTR-78288',
    pickup: {
      title: 'Maryland Mall',
      address: 'Ikorodu Rd, Maryland, Lagos',
      lat: 6.5721,
      lng: 3.3664,
    },
    dropoff: {
      title: 'Surulere',
      address: 'Adeniran Ogunsanya St, Surulere, Lagos',
      lat: 6.4969,
      lng: 3.3533,
    },
    distanceKm: 8.5,
    estTime: '20-30 mins',
    package: {
      category: 'Documents',
      size: 'Small',
      estimatedValue: 5000,
      weight: '0.5kg',
      fragile: false,
    },
    price: {
      deliveryFee: 850,
      serviceFee: 100,
      total: 950,
    },
    status: 'picked_up',
    traveler: mockTravelers[1],
    sender: {
      id: 'usr-2',
      name: 'David N.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces',
      rating: 4.8,
      completionRate: 96,
      phone: '+234 803 111 2233',
    },
    otpCode: '582910',
    createdAt: 'May 12, 2025 • 09:12 AM',
    paymentMethod: 'card',
  },
  {
    id: 'CTR-78280',
    pickup: {
      title: 'Computer Village',
      address: 'Otigba St, Ikeja, Lagos',
      lat: 6.5986,
      lng: 3.3392,
    },
    dropoff: {
      title: 'Ikeja GRA',
      address: 'Isaac John St, Ikeja GRA, Lagos',
      lat: 6.5862,
      lng: 3.3562,
    },
    distanceKm: 4.2,
    estTime: '15 mins',
    package: {
      category: 'Accessories',
      size: 'Small',
      estimatedValue: 12000,
      weight: '0.5kg',
      fragile: true,
    },
    price: {
      deliveryFee: 1000,
      serviceFee: 120,
      total: 1120,
    },
    status: 'in_transit',
    traveler: mockTravelers[2],
    sender: {
      id: 'usr-3',
      name: 'James E.',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop&crop=faces',
      rating: 4.9,
      completionRate: 95,
      phone: '+234 814 999 8877',
    },
    otpCode: '918234',
    createdAt: 'May 11, 2025 • 04:30 PM',
    paymentMethod: 'bank_transfer',
  },
  {
    id: 'CTR-78275',
    pickup: {
      title: 'Alausa Secretariat',
      address: 'Governor Rd, Alausa, Ikeja, Lagos',
      lat: 6.6192,
      lng: 3.3571,
    },
    dropoff: {
      title: 'Ikeja City Mall',
      address: 'Alausa, Ikeja, Lagos',
      lat: 6.6145,
      lng: 3.3582,
    },
    distanceKm: 2.1,
    estTime: '10 mins',
    package: {
      category: 'Parcel',
      size: 'Medium',
      estimatedValue: 18000,
      weight: '2kg',
      fragile: false,
    },
    price: {
      deliveryFee: 1450,
      serviceFee: 170,
      total: 1620,
    },
    status: 'delivered',
    traveler: mockTravelers[0],
    sender: {
      id: 'usr-1',
      name: 'Tobi A.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces',
      rating: 4.9,
      completionRate: 98,
      phone: '+234 802 345 6789',
    },
    otpCode: '445901',
    createdAt: 'May 11, 2025 • 11:15 AM',
    completedAt: 'May 11, 2025 • 11:45 AM',
    paymentMethod: 'wallet',
  },
];

interface DeliverySliceState {
  deliveries: DeliveryItem[];
  createFlow: CreateDeliveryState;
  travelerJob: TravelerActiveJobState;
  selectedDeliveryId: string | null;
}

const initialCreateFlow: CreateDeliveryState = {
  step: 1,
  pickup: {
    title: 'Ikeja City Mall',
    address: 'Alausa, Ikeja, Lagos',
    lat: 6.6145,
    lng: 3.3582,
  },
  dropoff: {
    title: 'Yaba Tech Hub',
    address: 'Herbert Macaulay Way, Yaba, Lagos',
    lat: 6.5173,
    lng: 3.3761,
  },
  package: {
    category: 'Electronics',
    size: 'Medium',
    estimatedValue: 25000,
    weight: '1kg',
    fragile: false,
    notes: 'Wireless headphones. Please handle with care.',
  },
  price: {
    deliveryFee: 1240,
    serviceFee: 120,
    total: 1360,
  },
  paymentMethod: 'card',
  selectedTraveler: mockTravelers[0],
  activeDeliveryId: 'CTR-78291',
  isCompleted: false,
};

const initialTravelerJob: TravelerActiveJobState = {
  step: 1,
  deliveryId: 'CTR-78291',
  proofPhoto: null,
  otpInput: ['3', '7', '4', '9', '1', '2'],
  isOtpValid: true,
  isCompleted: false,
};

const initialState: DeliverySliceState = {
  deliveries: initialDeliveries,
  createFlow: initialCreateFlow,
  travelerJob: initialTravelerJob,
  selectedDeliveryId: 'CTR-78291',
};

export const deliverySlice = createSlice({
  name: 'delivery',
  initialState,
  reducers: {
    setCreateStep: (state, action: PayloadAction<number>) => {
      state.createFlow.step = action.payload;
    },
    nextCreateStep: (state) => {
      if (state.createFlow.step < 9) {
        state.createFlow.step += 1;
      }
    },
    prevCreateStep: (state) => {
      if (state.createFlow.step > 1) {
        state.createFlow.step -= 1;
      }
    },
    setPickupLocation: (state, action: PayloadAction<LocationPoint>) => {
      state.createFlow.pickup = action.payload;
    },
    setDropoffLocation: (state, action: PayloadAction<LocationPoint>) => {
      state.createFlow.dropoff = action.payload;
    },
    updatePackageDetails: (
      state,
      action: PayloadAction<Partial<PackageDetails>>
    ) => {
      state.createFlow.package = { ...state.createFlow.package, ...action.payload };
    },
    setPaymentMethod: (
      state,
      action: PayloadAction<'wallet' | 'card' | 'bank_transfer' | 'ussd'>
    ) => {
      state.createFlow.paymentMethod = action.payload;
    },
    selectTraveler: (state, action: PayloadAction<TravelerMatch>) => {
      state.createFlow.selectedTraveler = action.payload;
    },
    finalizeDeliveryCreation: (state) => {
      const newId = `CTR-${Math.floor(10000 + Math.random() * 90000)}`;
      const newDelivery: DeliveryItem = {
        id: newId,
        pickup: state.createFlow.pickup,
        dropoff: state.createFlow.dropoff,
        distanceKm: 12.4,
        estTime: '25-35 mins',
        package: state.createFlow.package,
        price: state.createFlow.price,
        status: 'on_the_way_to_pickup',
        traveler: state.createFlow.selectedTraveler || mockTravelers[0],
        sender: {
          id: 'usr-1',
          name: 'Tobi A.',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces',
          rating: 4.9,
          completionRate: 98,
          phone: '+234 802 345 6789',
        },
        recipient: {
          name: 'David N.',
          phone: '+234 809 112 3344',
          address: state.createFlow.dropoff.address,
        },
        otpCode: '374912',
        createdAt: 'Just now',
        paymentMethod: state.createFlow.paymentMethod,
      };

      state.deliveries.unshift(newDelivery);
      state.createFlow.activeDeliveryId = newId;
      state.createFlow.step = 8;
    },
    submitDeliveryRating: (
      state,
      action: PayloadAction<{ id: string; review: DeliveryReview }>
    ) => {
      const delivery = state.deliveries.find((d) => d.id === action.payload.id);
      if (delivery) {
        delivery.review = action.payload.review;
      }
    },
    // Traveler Job Flow
    setTravelerJobStep: (state, action: PayloadAction<number>) => {
      state.travelerJob.step = action.payload;
    },
    nextTravelerJobStep: (state) => {
      if (state.travelerJob.step < 9) {
        state.travelerJob.step += 1;
      }
    },
    prevTravelerJobStep: (state) => {
      if (state.travelerJob.step > 1) {
        state.travelerJob.step -= 1;
      }
    },
    setTravelerProofPhoto: (state, action: PayloadAction<string>) => {
      state.travelerJob.proofPhoto = action.payload;
      const delivery = state.deliveries.find((d) => d.id === state.travelerJob.deliveryId);
      if (delivery) {
        delivery.proofPhotoUrl = action.payload;
        delivery.status = 'picked_up';
      }
    },
    setTravelerOtpInput: (state, action: PayloadAction<string[]>) => {
      state.travelerJob.otpInput = action.payload;
      const enteredCode = action.payload.join('');
      const delivery = state.deliveries.find((d) => d.id === state.travelerJob.deliveryId);
      state.travelerJob.isOtpValid =
        enteredCode.length === 6 && (!delivery || enteredCode === delivery.otpCode || enteredCode === '374912');
    },
    completeTravelerJob: (state) => {
      state.travelerJob.isCompleted = true;
      const delivery = state.deliveries.find((d) => d.id === state.travelerJob.deliveryId);
      if (delivery) {
        delivery.status = 'delivered';
        delivery.completedAt = 'Just now';
      }
    },
    updateDeliveryStatus: (
      state,
      action: PayloadAction<{ id: string; status: DeliveryStatus }>
    ) => {
      const delivery = state.deliveries.find((d) => d.id === action.payload.id);
      if (delivery) {
        delivery.status = action.payload.status;
      }
    },
    setSelectedDeliveryId: (state, action: PayloadAction<string>) => {
      state.selectedDeliveryId = action.payload;
    },
    resetCreateFlow: (state) => {
      state.createFlow = initialCreateFlow;
    },
  },
});

export const {
  setCreateStep,
  nextCreateStep,
  prevCreateStep,
  setPickupLocation,
  setDropoffLocation,
  updatePackageDetails,
  setPaymentMethod,
  selectTraveler,
  finalizeDeliveryCreation,
  submitDeliveryRating,
  setTravelerJobStep,
  nextTravelerJobStep,
  prevTravelerJobStep,
  setTravelerProofPhoto,
  setTravelerOtpInput,
  completeTravelerJob,
  updateDeliveryStatus,
  setSelectedDeliveryId,
  resetCreateFlow,
} = deliverySlice.actions;

export default deliverySlice.reducer;
