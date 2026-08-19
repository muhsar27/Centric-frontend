'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Eye, EyeOff, Check, AlertCircle, Phone } from 'lucide-react';
import StepIndicator from './StepIndicator';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateSignUp, updatePhone, nextStep } from '@/store/slices/onboardingSlice';
import { useRegisterMutation } from '@/store/services/authApi';

export default function SignUpForm() {
  const dispatch = useAppDispatch();
  const { signUp, role } = useAppSelector((state) => state.onboarding);
  const [register, { isLoading }] = useRegisterMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Password validation checks
  const hasMinLength = signUp.password.length >= 8;
  const hasNumber = /\d/.test(signUp.password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(signUp.password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUp.fullName.trim() || !signUp.email.trim() || !signUp.phoneNumber?.trim()) {
      setErrorMsg('Please fill in all fields including your phone number');
      return;
    }
    if (!hasMinLength || !hasNumber || !hasSpecial) {
      setErrorMsg('Please ensure password meets all security criteria');
      return;
    }

    // Format phone number with country code if needed
    let formattedPhone = signUp.phoneNumber.trim();
    if (!formattedPhone.startsWith('+')) {
      if (formattedPhone.startsWith('0')) {
        formattedPhone = '+234 ' + formattedPhone.slice(1);
      } else {
        formattedPhone = '+234 ' + formattedPhone;
      }
    }

    dispatch(updatePhone({ phoneNumber: formattedPhone }));

    try {
      setErrorMsg('');
      await register({ ...signUp, phoneNumber: formattedPhone, role }).unwrap();
      dispatch(nextStep());
    } catch {
      // Proceed even on mock network failure
      dispatch(nextStep());
    }
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
          title="Create your account"
          subtitle="Let's get you started"
        />

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2 text-xs text-red-600">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Full name input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Full name
            </label>
            <input
              type="text"
              placeholder="e.g. Ciroma Adekunle"
              value={signUp.fullName}
              onChange={(e) => dispatch(updateSignUp({ fullName: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-centric-green focus:ring-1 focus:ring-centric-green transition-all"
              required
            />
          </div>

          {/* Email address input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Email address
            </label>
            <input
              type="email"
              placeholder="ciromaadekunle@gmail.com"
              value={signUp.email}
              onChange={(e) => dispatch(updateSignUp({ email: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-centric-green focus:ring-1 focus:ring-centric-green transition-all"
              required
            />
          </div>

          {/* Phone number input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Phone number
            </label>
            <div className="relative flex">
              <div className="inline-flex items-center gap-1.5 px-3 py-3 rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 text-slate-600 text-sm font-medium select-none">
                <span>🇳🇬</span>
                <span className="text-xs font-semibold text-slate-700">+234</span>
              </div>
              <input
                type="tel"
                placeholder="801 234 5678"
                value={signUp.phoneNumber || ''}
                onChange={(e) => dispatch(updateSignUp({ phoneNumber: e.target.value }))}
                className="w-full px-4 py-3 rounded-r-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-centric-green focus:ring-1 focus:ring-centric-green transition-all"
                required
              />
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              We&apos;ll send an SMS verification code to this number
            </span>
          </div>

          {/* Password input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••••"
                value={signUp.password}
                onChange={(e) => dispatch(updateSignUp({ password: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-centric-green focus:ring-1 focus:ring-centric-green transition-all pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Password Criteria List */}
          <div className="space-y-1.5 pt-1">
            <div
              className={`flex items-center gap-2 text-xs transition-colors ${hasMinLength ? 'text-centric-green font-medium' : 'text-slate-400'
                }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${hasMinLength ? 'bg-centric-green text-white' : 'bg-slate-200'
                  }`}
              >
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
              <span>At least 8 characters</span>
            </div>

            <div
              className={`flex items-center gap-2 text-xs transition-colors ${hasNumber ? 'text-centric-green font-medium' : 'text-slate-400'
                }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${hasNumber ? 'bg-centric-green text-white' : 'bg-slate-200'
                  }`}
              >
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
              <span>One number</span>
            </div>

            <div
              className={`flex items-center gap-2 text-xs transition-colors ${hasSpecial ? 'text-centric-green font-medium' : 'text-slate-400'
                }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${hasSpecial ? 'bg-centric-green text-white' : 'bg-slate-200'
                  }`}
              >
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
              <span>One special character</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 py-3.5 px-6 rounded-2xl bg-centric-green hover:bg-centric-green-dark text-white font-semibold text-base shadow-centric transition-all cursor-pointer disabled:opacity-50"
          >
            {isLoading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        {/* Social logins */}
        <div className="mt-6 text-center">
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-3 text-xs text-slate-400">
              or continue with
            </span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-3">
            <button
              onClick={() => dispatch(nextStep())}
              className="flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Google</span>
            </button>

            <button
              onClick={() => dispatch(nextStep())}
              className="flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.13-1.97.99-3.12-1 .04-2.18.67-2.88 1.48-.62.72-1.16 1.88-1.01 3.01 1.12.09 2.23-.55 2.9-1.37z" />
              </svg>
              <span>Apple</span>
            </button>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-slate-500 pt-6">
        Already have an account?{' '}
        <Link
          href="/auth/sign-in"
          className="text-centric-green font-semibold hover:underline"
        >
          Sign in
        </Link>
      </p>
    </motion.div>
  );
}
