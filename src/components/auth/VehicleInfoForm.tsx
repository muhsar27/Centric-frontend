'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bike, Car, Truck, Camera, Check } from 'lucide-react';
import StepIndicator from './StepIndicator';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateVehicle, nextStep } from '@/store/slices/onboardingSlice';

export default function VehicleInfoForm() {
  const dispatch = useAppDispatch();
  const { vehicle } = useAppSelector((state) => state.onboarding);

  const [previewImage, setPreviewImage] = useState<string | null>(
    vehicle.vehiclePhoto ||
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=300&h=180&fit=crop'
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
      dispatch(updateVehicle({ vehiclePhoto: url }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(nextStep());
  };

  const vehicleOptions = [
    { type: 'bike', label: 'Bike', icon: Bike },
    { type: 'car', label: 'Car', icon: Car },
    { type: 'van', label: 'Van', icon: Truck },
  ] as const;

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
          title="Tell us about your vehicle"
          subtitle="Add your vehicle details"
        />

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Vehicle Type Cards */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Vehicle type
            </label>
            <div className="grid grid-cols-3 gap-3">
              {vehicleOptions.map((v) => {
                const Icon = v.icon;
                const isSelected = vehicle.vehicleType === v.type;
                return (
                  <div
                    key={v.type}
                    onClick={() => dispatch(updateVehicle({ vehicleType: v.type }))}
                    className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 relative ${
                      isSelected
                        ? 'border-centric-green bg-emerald-50/50 shadow-2xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isSelected
                          ? 'bg-centric-green text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-800">
                      {v.label}
                    </span>
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-centric-green text-white flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Make input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Make
            </label>
            <input
              type="text"
              placeholder="e.g. Honda"
              value={vehicle.make || 'Honda'}
              onChange={(e) => dispatch(updateVehicle({ make: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-centric-green focus:ring-1 focus:ring-centric-green transition-all"
              required
            />
          </div>

          {/* Model input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Model
            </label>
            <input
              type="text"
              placeholder="e.g. CBR 150"
              value={vehicle.model || 'CBR 150'}
              onChange={(e) => dispatch(updateVehicle({ model: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-centric-green focus:ring-1 focus:ring-centric-green transition-all"
              required
            />
          </div>

          {/* Plate number input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Plate number
            </label>
            <input
              type="text"
              placeholder="e.g. LND 123 QW"
              value={vehicle.plateNumber || 'LND 123 QW'}
              onChange={(e) =>
                dispatch(updateVehicle({ plateNumber: e.target.value }))
              }
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-centric-green focus:ring-1 focus:ring-centric-green transition-all uppercase tracking-wider font-semibold"
              required
            />
          </div>

          {/* Upload vehicle photo */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Upload vehicle photo
            </label>
            <label className="block w-full rounded-2xl border-2 border-dashed border-slate-200 p-3 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer text-center relative overflow-hidden">
              {previewImage ? (
                <div className="relative h-28 w-full rounded-xl overflow-hidden">
                  <img
                    src={previewImage}
                    alt="Vehicle"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <span className="text-white text-xs font-semibold flex items-center gap-1">
                      <Camera className="w-4 h-4" /> Change photo
                    </span>
                  </div>
                </div>
              ) : (
                <div className="py-4 flex flex-col items-center gap-1.5">
                  <Camera className="w-6 h-6 text-centric-green" />
                  <span className="text-xs font-semibold text-slate-700">
                    Click to upload vehicle photo
                  </span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

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
