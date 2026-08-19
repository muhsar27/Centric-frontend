'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, ShieldCheck, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { completeOnboarding, nextStep, updateIdVerification } from '@/store/slices/onboardingSlice';
import { setCredentials } from '@/store/slices/authSlice';
import { Button } from '@/components/ui/Button';
import { persistAuthSession, buildFallbackUser } from '@/lib/auth-storage';

type UploadKey = 'id' | 'selfie' | 'proof';

const rows: Array<{
  key: UploadKey;
  title: string;
  description: string;
  icon: React.ReactNode;
}> = [
  {
    key: 'id',
    title: 'Upload a means of identification',
    description: 'NIN, drivers license, passport',
    icon: <Upload className="h-4 w-4" />,
  },
  {
    key: 'selfie',
    title: 'Selfie verification',
    description: 'Take a selfie',
    icon: <ShieldCheck className="h-4 w-4" />,
  },
  {
    key: 'proof',
    title: 'Proof of address',
    description: 'Utility bill or bank statement',
    icon: <FileText className="h-4 w-4" />,
  },
];

export default function IdVerification() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const { role, signUp, phone } = useAppSelector((state) => state.onboarding);
  const fileInputs = useRef<Record<UploadKey, HTMLInputElement | null>>({
    id: null,
    selfie: null,
    proof: null,
  });
  const [uploaded, setUploaded] = useState<Record<UploadKey, boolean>>({
    id: false,
    selfie: false,
    proof: false,
  });

  const handleFileChange = (key: UploadKey, file?: File) => {
    if (!file) return;

    setUploaded((current) => ({ ...current, [key]: true }));
    if (key === 'id') dispatch(updateIdVerification({ isIdUploaded: true }));
    if (key === 'selfie') dispatch(updateIdVerification({ isSelfieVerified: true }));
    if (key === 'proof') dispatch(updateIdVerification({ isProofUploaded: true }));
  };

  const handleFinish = () => {
    const completedUser = auth.user
      ? { ...auth.user, role, isVerified: true }
      : buildFallbackUser({
          id: `usr_${Date.now()}`,
          fullName: signUp.fullName,
          email: signUp.email,
          role,
          phoneNumber: signUp.phone || phone.phoneNumber || undefined,
        });

    dispatch(
      setCredentials({
        user: completedUser,
        token: auth.token ?? 'centric-session-token',
      })
    );
    persistAuthSession({
      user: completedUser,
      token: auth.token ?? 'centric-session-token',
    });

    if (role === 'traveler') {
      dispatch(nextStep());
      return;
    }

    dispatch(completeOnboarding());
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
          Verify your identity
        </h2>
      </div>

      <div className="mx-auto mt-12 max-w-[470px] space-y-3">
        {rows.map((row) => (
          <div
            key={row.key}
            className="flex h-[72px] items-center justify-between rounded-xl border border-slate-100 bg-white px-3.5 shadow-[0_1px_0_rgba(15,23,42,0.02)]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                {row.icon}
              </div>
              <div className="min-w-0">
                <h3 className="text-[15px] font-medium text-slate-900">
                  {row.title}
                </h3>
                <p className="mt-1 text-[13px] leading-5 text-slate-500">
                  {row.description}
                </p>
              </div>
            </div>

            <div>
              <input
                ref={(element) => {
                  fileInputs.current[row.key] = element;
                }}
                type="file"
                className="sr-only"
                onChange={(event) => handleFileChange(row.key, event.target.files?.[0])}
              />
              <Button
                type="button"
                variant="secondary"
                onClick={() => fileInputs.current[row.key]?.click()}
                className="h-10 rounded-full px-4 text-[14px] font-medium shadow-none"
              >
                {uploaded[row.key] ? 'Uploaded' : 'Upload'}
              </Button>
            </div>
          </div>
        ))}

        <div className="pt-8">
          <Button onClick={handleFinish} className="h-[53px] w-full text-base">
            {role === 'traveler' ? 'Next: Vehicle Details' : 'Finish'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
