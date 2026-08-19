'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bike, CarFront, PersonStanding } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { completeOnboarding, updateVehicle } from '@/store/slices/onboardingSlice';
import { setCredentials } from '@/store/slices/authSlice';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { persistAuthSession, buildFallbackUser } from '@/lib/auth-storage';

type VehicleOption = {
  id: 'none' | 'bike' | 'motorcycle';
  label: string;
  icon: React.ReactNode;
};

const vehicleOptions: VehicleOption[] = [
  {
    id: 'none',
    label: 'No vehicle',
    icon: <PersonStanding className="h-7 w-7" />,
  },
  {
    id: 'bike',
    label: 'Bicycle',
    icon: <Bike className="h-7 w-7" />,
  },
  {
    id: 'motorcycle',
    label: 'Motorcycle',
    icon: <CarFront className="h-7 w-7" />,
  },
];

export default function VehicleInfoForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const { vehicle, signUp, role } = useAppSelector((state) => state.onboarding);

  const handleFinish = () => {
    const completedUser = auth.user
      ? { ...auth.user, role: 'traveler' as const, isVerified: true }
      : buildFallbackUser({
          id: `usr_${Date.now()}`,
          fullName: signUp.fullName,
          email: signUp.email,
          role: 'traveler',
          phoneNumber: signUp.phone,
        });

    dispatch(
      setCredentials({
        user: completedUser,
        token: auth.token ?? 'centric-session-token',
      })
    );
    dispatch(completeOnboarding());
    persistAuthSession({
      user: completedUser,
      token: auth.token ?? 'centric-session-token',
    });
    router.push('/dashboard');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
    >
      <div className="text-center">
        <h2 className="text-[2rem] font-semibold tracking-[-0.04em] text-slate-900 sm:text-[2.25rem]">
          Tell us about your vehicle
        </h2>
      </div>

      <div className="mx-auto mt-12 max-w-[684px]">
        <p className="text-center text-[12px] font-semibold uppercase tracking-[0.18em] text-slate-600">
          Vehicle type
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {vehicleOptions.map((option) => {
            const isActive = vehicle.vehicleType === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => dispatch(updateVehicle({ vehicleType: option.id }))}
                className={cn(
                  'flex h-[141px] flex-col items-start justify-between rounded-xl border bg-white px-5 py-5 text-left transition-all',
                  isActive
                    ? 'border-slate-800 shadow-[0_6px_20px_rgba(15,23,42,0.08)]'
                    : 'border-slate-200 hover:border-slate-300'
                )}
              >
                <div className="flex h-12 w-12 items-center justify-center text-slate-900">
                  {option.icon}
                </div>
                <p className="text-[15px] font-medium text-slate-900">
                  {option.label}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Button onClick={handleFinish} className="h-[53px] w-full max-w-[470px] text-base">
            Finish & Launch Dashboard
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
