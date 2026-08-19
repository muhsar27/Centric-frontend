'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, UserRound, Upload, MapPin } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { nextStep, updateBasicInfo, updateAddress } from '@/store/slices/onboardingSlice';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

export default function BasicInfoForm() {
  const dispatch = useAppDispatch();
  const { basicInfo, address } = useAppSelector((state) => state.onboarding);
  const [previewImage, setPreviewImage] = useState<string | null>(
    basicInfo.profilePhoto || null
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);
    dispatch(updateBasicInfo({ profilePhoto: imageUrl }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(nextStep());
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
          Tell us about you
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto mt-12 max-w-[470px] space-y-5">
        <div className="flex flex-col items-center">
          <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-slate-600">
            Upload profile photo
          </span>
          <label className="relative mt-6 block h-[100px] w-[100px] cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleImageUpload}
            />
            <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-slate-200 text-slate-500">
              {previewImage ? (
                <img src={previewImage} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <UserRound className="h-10 w-10" />
              )}
            </div>
            <span className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg">
              <Upload className="h-3.5 w-3.5" />
            </span>
          </label>
        </div>

        <Input
          label="Date of birth"
          placeholder="12th May 1998"
          value={basicInfo.dob}
          onChange={(e) => dispatch(updateBasicInfo({ dob: e.target.value }))}
          required
          endAdornment={<CalendarDays className="h-4 w-4" />}
        />

        <Select
          label="Gender"
          value={basicInfo.gender}
          onChange={(e) => dispatch(updateBasicInfo({ gender: e.target.value }))}
          required
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Prefer not to say</option>
        </Select>

        <Input
          label="Address"
          placeholder="23, Allen Avenue, Ikeja, Lagos"
          value={address.homeAddress || ''}
          onChange={(e) => dispatch(updateAddress({ homeAddress: e.target.value }))}
          required
          startAdornment={<MapPin className="h-4 w-4" />}
        />

        <Button type="submit" className="h-[53px] w-full text-base">
          Continue
        </Button>
      </form>
    </motion.div>
  );
}
