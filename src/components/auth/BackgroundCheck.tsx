'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Check } from 'lucide-react';
import StepIndicator from './StepIndicator';
import { useAppDispatch } from '@/store/hooks';
import { nextStep } from '@/store/slices/onboardingSlice';

export default function BackgroundCheck() {
  const dispatch = useAppDispatch();

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
          title="Background check"
          subtitle="We run a quick background check for safety"
        />

        {/* Pulsing Shield Icon Graphic */}
        <div className="my-8 flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-centric-green/15 animate-ping absolute" />
            <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center relative shadow-inner border border-emerald-200">
              <ShieldCheck className="w-12 h-12 text-centric-green" />
            </div>
          </div>

          <div className="space-y-3.5 w-full mt-8 max-w-xs mx-auto">
            {/* Step 1: Identity verified */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-centric-green text-white flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-xs font-bold text-slate-800">
                  Identity verified
                </span>
              </div>
              <span className="text-[10px] font-semibold text-centric-green">
                Completed
              </span>
            </div>

            {/* Step 2: Background check */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full border-2 border-centric-green border-t-transparent animate-spin" />
                <span className="text-xs font-bold text-slate-800">
                  Background check
                </span>
              </div>
              <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                In progress...
              </span>
            </div>

            {/* Step 3: Account review */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-slate-400" />
                <span className="text-xs font-bold text-slate-700">
                  Account review
                </span>
              </div>
              <span className="text-[10px] font-semibold text-slate-500">
                Pending
              </span>
            </div>
          </div>

          <p className="text-center text-xs text-slate-400 mt-6">
            This usually takes a few minutes.
          </p>
        </div>
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
