'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, Check } from 'lucide-react';
import StepIndicator from './StepIndicator';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setRole, nextStep } from '@/store/slices/onboardingSlice';
import { UserRole } from '@/types/auth';

export default function RoleSelector() {
  const dispatch = useAppDispatch();
  const { role } = useAppSelector((state) => state.onboarding);

  const handleSelectRole = (selectedRole: UserRole) => {
    dispatch(setRole(selectedRole));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full justify-between"
    >
      <div>
        <StepIndicator
          title="What best describes you?"
          subtitle="Select how you want to use Centric"
        />

        {/* Role options */}
        <div className="space-y-4 mt-6">
          {/* Sender Option */}
          <div
            onClick={() => handleSelectRole('sender')}
            className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative flex items-start gap-4 ${
              role === 'sender'
                ? 'border-centric-green bg-emerald-50/40 shadow-sm'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 text-centric-green flex items-center justify-center shrink-0">
              <Package className="w-6 h-6" />
            </div>

            <div className="flex-1 pr-6">
              <h3 className="text-base font-bold text-slate-900">
                I want to send a package
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-normal">
                Send packages to anyone safely, affordably, and quickly through verified travelers.
              </p>
            </div>

            {/* Selection Check Circle */}
            <div
              className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors absolute top-5 right-5 ${
                role === 'sender'
                  ? 'border-centric-green bg-centric-green text-white'
                  : 'border-slate-300 bg-white'
              }`}
            >
              {role === 'sender' && <Check className="w-4 h-4 stroke-[3]" />}
            </div>
          </div>

          {/* Traveler Option */}
          <div
            onClick={() => handleSelectRole('traveler')}
            className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative flex items-start gap-4 ${
              role === 'traveler'
                ? 'border-centric-green bg-emerald-50/40 shadow-sm'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 text-centric-green flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>

            <div className="flex-1 pr-6">
              <h3 className="text-base font-bold text-slate-900">
                I want to deliver packages
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-normal">
                Earn extra income by delivering parcels along routes you are already traveling.
              </p>
            </div>

            {/* Selection Check Circle */}
            <div
              className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors absolute top-5 right-5 ${
                role === 'traveler'
                  ? 'border-centric-green bg-centric-green text-white'
                  : 'border-slate-300 bg-white'
              }`}
            >
              {role === 'traveler' && <Check className="w-4 h-4 stroke-[3]" />}
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          You can change this later in settings.
        </p>
      </div>

      <div className="pt-6">
        <button
          onClick={() => dispatch(nextStep())}
          className="w-full py-3.5 px-6 rounded-2xl bg-centric-green hover:bg-centric-green-dark text-white font-semibold text-base shadow-centric transition-all cursor-pointer"
        >
          Continue
        </button>
      </div>
    </motion.div>
  );
}
