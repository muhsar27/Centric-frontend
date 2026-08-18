'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Calendar, User, Phone } from 'lucide-react';
import StepIndicator from './StepIndicator';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateBasicInfo, nextStep } from '@/store/slices/onboardingSlice';

export default function BasicInfoForm() {
  const dispatch = useAppDispatch();
  const { basicInfo, role } = useAppSelector((state) => state.onboarding);

  const [previewImage, setPreviewImage] = useState<string | null>(
    basicInfo.profilePhoto ||
      (role === 'sender'
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces'
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces')
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
      dispatch(updateBasicInfo({ profilePhoto: url }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
          title="Tell us about you"
          subtitle={
            role === 'sender'
              ? 'This helps us personalize your experience'
              : 'This helps us build your traveler profile'
          }
        />

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Profile Photo Avatar Upload */}
          <div className="flex flex-col items-center justify-center my-3">
            <div className="relative group cursor-pointer">
              <div className="w-24 h-24 rounded-full border-4 border-emerald-100 overflow-hidden bg-slate-100 shadow-md relative">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <User className="w-10 h-10" />
                  </div>
                )}
              </div>

              {/* Camera Badge Icon */}
              <label className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-centric-green hover:bg-centric-green-dark text-white flex items-center justify-center shadow-lg border-2 border-white cursor-pointer transition-transform group-hover:scale-110">
                <Camera className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            <span className="text-xs text-slate-400 font-medium mt-2">
              Upload profile photo
            </span>
          </div>

          {/* Date of birth */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Date of birth
            </label>
            <div className="relative">
              <input
                type="date"
                value={basicInfo.dob || (role === 'sender' ? '1998-05-12' : '1995-07-22')}
                onChange={(e) => dispatch(updateBasicInfo({ dob: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-centric-green focus:ring-1 focus:ring-centric-green transition-all"
                required
              />
              <Calendar className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Gender Select */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Gender
            </label>
            <select
              value={basicInfo.gender}
              onChange={(e) => dispatch(updateBasicInfo({ gender: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-centric-green focus:ring-1 focus:ring-centric-green transition-all bg-white"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Prefer not to say</option>
            </select>
          </div>

          {/* Role specific inputs */}
          {role === 'sender' ? (
            /* Account Type Dropdown */
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                What best describes you?
              </label>
              <select
                value={basicInfo.accountType || 'individual'}
                onChange={(e) =>
                  dispatch(
                    updateBasicInfo({
                      accountType: e.target.value as 'individual' | 'business',
                    })
                  )
                }
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-centric-green focus:ring-1 focus:ring-centric-green transition-all bg-white"
              >
                <option value="individual">Individual</option>
                <option value="business">Business / Merchant</option>
              </select>
            </div>
          ) : (
            /* Traveler Emergency Contact Inputs */
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Emergency contact name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Aisha Kareem"
                  value={basicInfo.emergencyContactName || 'Aisha Kareem'}
                  onChange={(e) =>
                    dispatch(
                      updateBasicInfo({ emergencyContactName: e.target.value })
                    )
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-centric-green focus:ring-1 focus:ring-centric-green transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Emergency contact phone number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="+234 803 456 7890"
                    value={
                      basicInfo.emergencyContactPhone || '+234 803 456 7890'
                    }
                    onChange={(e) =>
                      dispatch(
                        updateBasicInfo({
                          emergencyContactPhone: e.target.value,
                        })
                      )
                    }
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-centric-green focus:ring-1 focus:ring-centric-green transition-all pl-10"
                    required
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </>
          )}

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-centric-green hover:bg-centric-green-dark text-white font-semibold text-base shadow-centric transition-all cursor-pointer"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
