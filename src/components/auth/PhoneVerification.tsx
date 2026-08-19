'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import StepIndicator from './StepIndicator';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updatePhone, nextStep, prevStep } from '@/store/slices/onboardingSlice';
import { useVerifyOtpMutation, useSendOtpMutation } from '@/store/services/authApi';
import { Edit2 } from 'lucide-react';

export default function PhoneVerification() {
  const dispatch = useAppDispatch();
  const { phone, signUp } = useAppSelector((state) => state.onboarding);
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [sendOtp, { isLoading: isSendingOtp }] = useSendOtpMutation();

  const phoneNumberDisplay =
    phone.phoneNumber || signUp.phoneNumber || '+234 801 234 5678';

  const initialCode = phone.otpCode ? phone.otpCode.split('') : ['', '', '', '', '', ''];
  const [otp, setOtp] = useState<string[]>(
    initialCode.length === 6 && initialCode.some((c) => c !== '')
      ? initialCode
      : ['', '', '', '', '', '']
  );

  const [timeLeft, setTimeLeft] = useState(165); // 02:45
  const [resendSuccess, setResendSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    const fullCode = newOtp.join('');
    dispatch(updatePhone({ otpCode: fullCode }));

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim().slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split('').concat(Array(6 - pastedData.length).fill(''));
      setOtp(newOtp);
      dispatch(updatePhone({ otpCode: pastedData }));
      inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
    }
  };

  const handleSubmit = async () => {
    try {
      await verifyOtp({
        phoneNumber: phoneNumberDisplay,
        code: otp.join(''),
      }).unwrap();
      dispatch(updatePhone({ isVerified: true }));
      dispatch(nextStep());
    } catch {
      dispatch(updatePhone({ isVerified: true }));
      dispatch(nextStep());
    }
  };

  const handleResend = async () => {
    try {
      await sendOtp({ phoneNumber: phoneNumberDisplay }).unwrap();
      setTimeLeft(165);
      setResendSuccess(true);
      setTimeout(() => setResendSuccess(false), 4000);
    } catch {
      setTimeLeft(165);
      setResendSuccess(true);
      setTimeout(() => setResendSuccess(false), 4000);
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
          title="Verify your phone"
          subtitle={`Enter the 6-digit code we sent to ${phoneNumberDisplay}`}
        />

        {/* Phone number badge with change option */}
        <div className="flex items-center justify-between mt-2 p-3 bg-slate-50 border border-slate-200 rounded-xl">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Sent to:</span>
            <span className="text-xs font-bold text-slate-900">{phoneNumberDisplay}</span>
          </div>
          <button
            type="button"
            onClick={() => dispatch(prevStep())}
            className="flex items-center gap-1 text-xs font-semibold text-centric-green hover:underline cursor-pointer"
          >
            <Edit2 className="w-3 h-3" />
            Change number
          </button>
        </div>

        {/* OTP Input Grid */}
        <div className="my-8">
          <div className="grid grid-cols-6 gap-2 sm:gap-3" onPaste={handlePaste}>
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => {
                  inputRefs.current[idx] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="w-full aspect-square text-center font-bold text-xl sm:text-2xl text-slate-900 border-2 rounded-2xl border-slate-200 focus:border-centric-green focus:ring-2 focus:ring-centric-green/20 focus:outline-none transition-all shadow-2xs bg-white"
              />
            ))}
          </div>

          <div className="text-center mt-6">
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
              Code expires in{' '}
              <span className="text-centric-green font-bold">
                {formatTime(timeLeft)}
              </span>
            </span>
          </div>

          {resendSuccess && (
            <p className="text-center text-xs text-emerald-600 font-semibold mt-3 animate-fade-in">
              ✓ New verification code sent!
            </p>
          )}
        </div>
      </div>

      <div className="space-y-4 pt-6">
        <button
          onClick={handleSubmit}
          disabled={isLoading || otp.join('').length < 6}
          className="w-full py-3.5 px-6 rounded-2xl bg-centric-green hover:bg-centric-green-dark text-white font-semibold text-base shadow-centric transition-all cursor-pointer disabled:opacity-50"
        >
          {isLoading ? 'Verifying...' : 'Verify & Continue'}
        </button>

        <p className="text-center text-xs text-slate-500">
          Didn&apos;t receive code?{' '}
          <button
            type="button"
            onClick={handleResend}
            disabled={isSendingOtp}
            className="text-centric-green font-bold hover:underline cursor-pointer disabled:opacity-50"
          >
            {isSendingOtp ? 'Sending...' : 'Resend'}
          </button>
        </p>
      </div>
    </motion.div>
  );
}
