'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Check, Sparkles } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { completeOnboarding } from '@/store/slices/onboardingSlice';
import { setCredentials } from '@/store/slices/authSlice';

export default function OnboardingSuccess() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { role, signUp, phone } = useAppSelector((state) => state.onboarding);

  const handleFinish = () => {
    dispatch(completeOnboarding());
    dispatch(
      setCredentials({
        user: {
          id: 'usr_' + Date.now(),
          fullName: signUp.fullName || (role === 'sender' ? 'Ciroma Adekunle' : 'Ridwan Kareem'),
          email: signUp.email || 'user@centric.africa',
          role,
          phoneNumber: phone.phoneNumber || signUp.phoneNumber || '+234 801 234 5678',
          isVerified: true,
        },
        token: 'centric-jwt-auth-token',
      })
    );
    router.push('/dashboard');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col h-full justify-between py-2 text-center"
    >
      <div className="flex flex-col items-center justify-center my-auto">
        {/* Shield & Confetti Graphic */}
        <div className="relative mb-6">
          <div className="w-28 h-28 rounded-full bg-centric-green flex items-center justify-center shadow-xl shadow-emerald-200 border-4 border-white relative">
            <Check className="w-16 h-16 text-white stroke-[3]" />
          </div>

          {/* Floating confetti dots */}
          <Sparkles className="w-6 h-6 text-amber-400 absolute -top-2 -right-2 animate-bounce" />
          <div className="w-3 h-3 rounded-full bg-emerald-400 absolute top-2 -left-3 animate-pulse" />
          <div className="w-2.5 h-2.5 rounded-full bg-blue-400 absolute bottom-2 -right-3" />
          <div className="w-2 h-2 rounded-full bg-amber-400 absolute -bottom-1 left-2" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {role === 'sender' ? "You're all set! 🎉" : 'Welcome to Centric! 🎉'}
        </h2>

        <p className="text-sm text-slate-500 mt-2 max-w-xs leading-relaxed">
          {role === 'sender'
            ? 'Your account has been created successfully.'
            : "You're verified and ready to start delivering packages."}
        </p>

        {/* Verification checklist */}
        <div className="mt-8 space-y-2.5 text-left w-full max-w-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-800">
            <div className="w-4 h-4 rounded-full bg-centric-green text-white flex items-center justify-center">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <span>Phone verified</span>
          </div>

          <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-800">
            <div className="w-4 h-4 rounded-full bg-centric-green text-white flex items-center justify-center">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <span>
              {role === 'sender' ? 'Identity verified' : 'Background check passed'}
            </span>
          </div>

          <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-800">
            <div className="w-4 h-4 rounded-full bg-centric-green text-white flex items-center justify-center">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <span>
              {role === 'sender' ? 'Account secured' : 'Account activated'}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3 pt-6">
        {role === 'traveler' ? (
          <>
            <button
              onClick={handleFinish}
              className="w-full py-3.5 px-6 rounded-2xl bg-centric-green hover:bg-centric-green-dark text-white font-semibold text-base shadow-centric transition-all cursor-pointer"
            >
              Go Online
            </button>
            <button
              onClick={handleFinish}
              className="w-full py-3 px-6 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-all cursor-pointer"
            >
              Go to Dashboard
            </button>
          </>
        ) : (
          <button
            onClick={handleFinish}
            className="w-full py-3.5 px-6 rounded-2xl bg-centric-green hover:bg-centric-green-dark text-white font-semibold text-base shadow-centric transition-all cursor-pointer"
          >
            Go to Dashboard
          </button>
        )}
      </div>
    </motion.div>
  );
}
