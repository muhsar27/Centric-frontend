'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Camera, FileText, Upload, Check } from 'lucide-react';
import StepIndicator from './StepIndicator';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateIdVerification, nextStep } from '@/store/slices/onboardingSlice';
import { useUploadDocumentMutation } from '@/store/services/authApi';

export default function IdVerification() {
  const dispatch = useAppDispatch();
  const { idVerification, role } = useAppSelector((state) => state.onboarding);
  const [uploadDocument, { isLoading }] = useUploadDocumentMutation();

  const [activeUpload, setActiveUpload] = useState<string | null>(null);

  const handleSimulatedUpload = async (type: 'id' | 'selfie' | 'proof') => {
    setActiveUpload(type);
    try {
      await uploadDocument({ file: 'mock-file-data', type }).unwrap();
      if (type === 'id') dispatch(updateIdVerification({ isIdUploaded: true }));
      if (type === 'selfie') dispatch(updateIdVerification({ isSelfieVerified: true }));
      if (type === 'proof') dispatch(updateIdVerification({ isProofUploaded: true }));
    } catch {
      if (type === 'id') dispatch(updateIdVerification({ isIdUploaded: true }));
      if (type === 'selfie') dispatch(updateIdVerification({ isSelfieVerified: true }));
      if (type === 'proof') dispatch(updateIdVerification({ isProofUploaded: true }));
    } finally {
      setActiveUpload(null);
    }
  };

  const handleContinue = () => {
    dispatch(nextStep());
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
          title="Verify your identity"
          subtitle={
            role === 'sender'
              ? 'We take verification seriously to keep everyone safe'
              : 'We need to verify you to keep our community safe'
          }
        />

        <div className="space-y-4 mt-6">
          {/* Card 1: Upload ID card */}
          <div
            onClick={() => handleSimulatedUpload('id')}
            className={`p-4.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
              idVerification.isIdUploaded
                ? 'border-centric-green bg-emerald-50/50 shadow-2xs'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                  idVerification.isIdUploaded
                    ? 'bg-centric-green text-white'
                    : 'bg-emerald-100/70 text-centric-green'
                }`}
              >
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Upload ID card</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  National ID, Driver&apos;s License or Passport
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {idVerification.isIdUploaded ? (
                <div className="w-6 h-6 rounded-full bg-centric-green text-white flex items-center justify-center">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
              ) : (
                <div className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
                  {activeUpload === 'id' ? (
                    <span className="text-[10px] font-bold text-centric-green animate-pulse">
                      Uploading...
                    </span>
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Card 2: Selfie verification */}
          <div
            onClick={() => handleSimulatedUpload('selfie')}
            className={`p-4.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
              idVerification.isSelfieVerified
                ? 'border-centric-green bg-emerald-50/50 shadow-2xs'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                  idVerification.isSelfieVerified
                    ? 'bg-centric-green text-white'
                    : 'bg-emerald-100/70 text-centric-green'
                }`}
              >
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Selfie verification</h4>
                <p className="text-xs text-slate-500 mt-0.5">Take a quick selfie</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {idVerification.isSelfieVerified ? (
                <div className="w-6 h-6 rounded-full bg-centric-green text-white flex items-center justify-center">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
              ) : (
                <div className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
                  {activeUpload === 'selfie' ? (
                    <span className="text-[10px] font-bold text-centric-green animate-pulse">
                      Processing...
                    </span>
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Card 3: Proof of address (Sender only) */}
          {role === 'sender' && (
            <div
              onClick={() => handleSimulatedUpload('proof')}
              className={`p-4.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                idVerification.isProofUploaded
                  ? 'border-centric-green bg-emerald-50/50 shadow-2xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                    idVerification.isProofUploaded
                      ? 'bg-centric-green text-white'
                      : 'bg-emerald-100/70 text-centric-green'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Proof of address</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Utility bill or bank statement
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {idVerification.isProofUploaded ? (
                  <div className="w-6 h-6 rounded-full bg-centric-green text-white flex items-center justify-center">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                ) : (
                  <div className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
                    {activeUpload === 'proof' ? (
                      <span className="text-[10px] font-bold text-centric-green animate-pulse">
                        Uploading...
                      </span>
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="pt-6">
        <button
          onClick={handleContinue}
          disabled={isLoading}
          className="w-full py-3.5 px-6 rounded-2xl bg-centric-green hover:bg-centric-green-dark text-white font-semibold text-base shadow-centric transition-all cursor-pointer"
        >
          Continue
        </button>
      </div>
    </motion.div>
  );
}
