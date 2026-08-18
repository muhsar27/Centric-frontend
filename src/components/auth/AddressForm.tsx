'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Plus, ChevronDown } from 'lucide-react';
import StepIndicator from './StepIndicator';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateAddress, nextStep } from '@/store/slices/onboardingSlice';

export default function AddressForm() {
  const dispatch = useAppDispatch();
  const { address } = useAppSelector((state) => state.onboarding);

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
          title="Where are you based?"
          subtitle="This helps us show accurate delivery options"
        />

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Current location */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Current location
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search location..."
                value={address.currentLocation || 'Ikeja, Lagos, Nigeria'}
                onChange={(e) =>
                  dispatch(updateAddress({ currentLocation: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-centric-green focus:ring-1 focus:ring-centric-green transition-all pl-10"
                required
              />
              <MapPin className="w-4 h-4 text-centric-green absolute left-3.5 top-1/2 -translate-y-1/2" />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <Navigation className="w-4 h-4 text-centric-green" />
              </button>
            </div>
          </div>

          {/* Home address dropdown */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Home address
            </label>
            <div className="relative">
              <select
                value={address.homeAddress || '23, Allen Avenue, Ikeja, Lagos'}
                onChange={(e) =>
                  dispatch(updateAddress({ homeAddress: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-centric-green focus:ring-1 focus:ring-centric-green transition-all bg-white appearance-none pr-10"
              >
                <option value="23, Allen Avenue, Ikeja, Lagos">
                  23, Allen Avenue, Ikeja, Lagos
                </option>
                <option value="15, Bode Thomas Street, Surulere, Lagos">
                  15, Bode Thomas Street, Surulere, Lagos
                </option>
                <option value="42, Admiralty Way, Lekki Phase 1, Lagos">
                  42, Admiralty Way, Lekki Phase 1, Lagos
                </option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <button
              type="button"
              className="mt-2 text-xs font-semibold text-centric-green hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add on map</span>
            </button>
          </div>

          {/* Map Preview Graphic */}
          <div className="w-full h-40 rounded-2xl border border-slate-200 bg-slate-100 overflow-hidden relative shadow-2xs mt-4">
            <svg
              className="w-full h-full object-cover opacity-80"
              viewBox="0 0 400 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="400" height="160" fill="#E2E8F0" />
              {/* Roads */}
              <path
                d="M -20 40 Q 150 20 420 80"
                stroke="#CBD5E1"
                strokeWidth="18"
              />
              <path
                d="M 120 -10 Q 140 80 180 180"
                stroke="#CBD5E1"
                strokeWidth="14"
              />
              <path
                d="M 280 -10 Q 260 100 310 180"
                stroke="#CBD5E1"
                strokeWidth="12"
              />
              {/* Green route line */}
              <path
                d="M 60 45 C 120 45, 140 70, 190 75 S 250 85, 320 60"
                stroke="#00A651"
                strokeWidth="4"
                strokeDasharray="6 4"
              />
            </svg>

            {/* Map Pin marker */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-centric-green text-white flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="w-3 h-1 bg-slate-900/30 rounded-full blur-2xs mt-0.5"></div>
            </div>

            <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-lg text-[10px] font-semibold text-slate-700 shadow-2xs border border-slate-200">
              📍 Ikeja, Lagos
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-centric-green hover:bg-centric-green-dark text-white font-semibold text-base shadow-centric transition-all cursor-pointer"
            >
              Save & Continue
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
