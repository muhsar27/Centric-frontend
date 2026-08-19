'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAppSelector } from '@/store/hooks';
import { AuthShell } from '@/components/ui/AuthShell';
import RoleSelector from '@/components/auth/RoleSelector';
import SignUpForm from '@/components/auth/SignUpForm';
import BasicInfoForm from '@/components/auth/BasicInfoForm';
import IdVerification from '@/components/auth/IdVerification';
import VehicleInfoForm from '@/components/auth/VehicleInfoForm';

export default function OnboardingPage() {
  const { step, role } = useAppSelector((state) => state.onboarding);

  const content = (() => {
    switch (step) {
      case 1:
        return <RoleSelector key="role" />;
      case 2:
        return <SignUpForm key="signup" />;
      case 3:
        return <BasicInfoForm key="profile" />;
      case 4:
        return <IdVerification key="verification" />;
      case 5:
        return role === 'traveler' ? (
          <VehicleInfoForm key="vehicle" />
        ) : (
          <IdVerification key="verification-fallback" />
        );
      default:
        return <RoleSelector key="role-default" />;
    }
  })();

  const maxWidthClassName =
    step === 1 || step === 5 ? 'max-w-[684px]' : 'max-w-[470px]';

  return (
    <AuthShell maxWidthClassName={maxWidthClassName} contentClassName="w-full">
      <AnimatePresence mode="wait">{content}</AnimatePresence>
    </AuthShell>
  );
}
