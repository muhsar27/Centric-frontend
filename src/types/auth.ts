export type UserRole = 'sender' | 'traveler';

export type OnboardingStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface SignUpFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface PhoneVerificationData {
  phoneNumber: string;
  otpCode: string;
  isVerified: boolean;
  expiresInSeconds: number;
}

export interface BasicInformationData {
  dob: string;
  gender: string;
  accountType?: 'individual' | 'business';
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  profilePhoto?: string | null;
}

export interface AddressData {
  currentLocation: string;
  homeAddress: string;
}

export interface VehicleInformationData {
  vehicleType: 'bike' | 'car' | 'van';
  make: string;
  model: string;
  plateNumber: string;
  vehiclePhoto?: string | null;
}

export interface IdVerificationData {
  idType: 'national_id' | 'drivers_license' | 'passport';
  idCardFile?: string | null;
  selfieFile?: string | null;
  proofOfAddressFile?: string | null;
  isIdUploaded: boolean;
  isSelfieVerified: boolean;
  isProofUploaded: boolean;
}

export interface BackgroundCheckData {
  identityVerified: boolean;
  backgroundCheckStatus: 'pending' | 'in_progress' | 'passed';
  accountReviewStatus: 'pending' | 'approved';
}

export interface OnboardingState {
  role: UserRole;
  step: OnboardingStep;
  signUp: SignUpFormData;
  phone: PhoneVerificationData;
  basicInfo: BasicInformationData;
  address: AddressData;
  vehicle: VehicleInformationData;
  idVerification: IdVerificationData;
  backgroundCheck: BackgroundCheckData;
  isCompleted: boolean;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  phoneNumber?: string;
  avatarUrl?: string;
  isVerified: boolean;
}

export interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
