import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  OnboardingState,
  UserRole,
  OnboardingStep,
  SignUpFormData,
  PhoneVerificationData,
  BasicInformationData,
  AddressData,
  VehicleInformationData,
  IdVerificationData,
} from '@/types/auth';

const initialState: OnboardingState = {
  role: 'sender',
  step: 1,
  signUp: {
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
  },
  phone: {
    phoneNumber: '',
    otpCode: '',
    isVerified: false,
    expiresInSeconds: 165, // 02:45
  },
  basicInfo: {
    dob: '',
    gender: 'Male',
    accountType: 'individual',
    emergencyContactName: '',
    emergencyContactPhone: '',
    profilePhoto: null,
  },
  address: {
    currentLocation: '',
    homeAddress: '',
  },
  vehicle: {
    vehicleType: 'bike',
    make: '',
    model: '',
    plateNumber: '',
    vehiclePhoto: null,
  },
  idVerification: {
    idType: 'national_id',
    idCardFile: null,
    selfieFile: null,
    proofOfAddressFile: null,
    isIdUploaded: false,
    isSelfieVerified: false,
    isProofUploaded: false,
  },
  backgroundCheck: {
    identityVerified: true,
    backgroundCheckStatus: 'in_progress',
    accountReviewStatus: 'pending',
  },
  isCompleted: false,
};

export const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<UserRole>) => {
      state.role = action.payload;
    },
    setStep: (state, action: PayloadAction<OnboardingStep>) => {
      state.step = action.payload;
    },
    nextStep: (state) => {
      state.step = (state.step + 1) as OnboardingStep;
    },
    prevStep: (state) => {
      if (state.step > 1) {
        state.step = (state.step - 1) as OnboardingStep;
      }
    },
    updateSignUp: (state, action: PayloadAction<Partial<SignUpFormData>>) => {
      state.signUp = { ...state.signUp, ...action.payload };
    },
    updatePhone: (
      state,
      action: PayloadAction<Partial<PhoneVerificationData>>
    ) => {
      state.phone = { ...state.phone, ...action.payload };
    },
    updateBasicInfo: (
      state,
      action: PayloadAction<Partial<BasicInformationData>>
    ) => {
      state.basicInfo = { ...state.basicInfo, ...action.payload };
    },
    updateAddress: (state, action: PayloadAction<Partial<AddressData>>) => {
      state.address = { ...state.address, ...action.payload };
    },
    updateVehicle: (
      state,
      action: PayloadAction<Partial<VehicleInformationData>>
    ) => {
      state.vehicle = { ...state.vehicle, ...action.payload };
    },
    updateIdVerification: (
      state,
      action: PayloadAction<Partial<IdVerificationData>>
    ) => {
      state.idVerification = { ...state.idVerification, ...action.payload };
    },
    completeOnboarding: (state) => {
      state.isCompleted = true;
    },
    resetOnboarding: () => initialState,
  },
});

export const {
  setRole,
  setStep,
  nextStep,
  prevStep,
  updateSignUp,
  updatePhone,
  updateBasicInfo,
  updateAddress,
  updateVehicle,
  updateIdVerification,
  completeOnboarding,
  resetOnboarding,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
