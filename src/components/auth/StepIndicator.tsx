'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { prevStep } from '@/store/slices/onboardingSlice';

interface StepIndicatorProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
}

export default function StepIndicator({
  title,
  subtitle,
  showBack = true,
}: StepIndicatorProps) {
  const dispatch = useAppDispatch();
  const { step, role } = useAppSelector((state) => state.onboarding);

  const totalSteps = role === 'sender' ? 8 : 9;

  const handleBack = () => {
    dispatch(prevStep());
  };

  return (
    <div className="w-full mb-6">
      {/* Navigation Top Bar */}
      <div className="flex items-center justify-between mb-4">
        {showBack && step > 1 ? (
          <button
            onClick={handleBack}
            className="p-2 rounded-full text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        ) : (
          <div className="w-9" />
        )}

        {/* Step progress pills */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                s === step
                  ? 'w-6 bg-centric-green'
                  : s < step
                  ? 'w-2 bg-centric-green/50'
                  : 'w-2 bg-slate-200'
              }`}
            />
          ))}
        </div>

        <div className="w-9 text-xs text-right font-medium text-slate-400">
          {step}/{totalSteps}
        </div>
      </div>

      {/* Step Title & Subtitle */}
      {title && (
        <div className="text-left mt-2">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-slate-500 mt-1 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
