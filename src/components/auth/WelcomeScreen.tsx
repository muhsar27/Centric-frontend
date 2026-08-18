'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Package, ShieldCheck, ArrowRight } from 'lucide-react';
import CentricLogo from '@/components/ui/CentricLogo';
import { useAppDispatch } from '@/store/hooks';
import { nextStep } from '@/store/slices/onboardingSlice';

export default function WelcomeScreen() {
  const dispatch = useAppDispatch();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full min-h-[580px] justify-between"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between pt-2">
        <CentricLogo size="md" />
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-centric-green">
          v1.0
        </span>
      </div>

      {/* Main Visual Banner */}
      <div className="my-6 relative py-4">
        {/* Dynamic Graphic Card */}
        <div className="w-full bg-gradient-to-br from-emerald-50 to-emerald-100/60 rounded-3xl p-6 border border-emerald-100 shadow-sm relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Your Journey.{' '}
              <span className="text-centric-green block">Someone&apos;s Delivery.</span>
              Earn On Your Way.
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xs leading-relaxed">
              Safe, affordable and reliable parcel delivery through verified travelers across cities.
            </p>
          </div>

          {/* Map & Delivery Route Visual Illustration */}
          <div className="mt-6 pt-4 border-t border-emerald-200/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-centric-green text-white flex items-center justify-center shadow-md">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="h-0.5 w-12 bg-centric-green/40 border-dashed border-t-2 border-centric-green"></div>
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md">
                <Package className="w-4 h-4" />
              </div>
              <div className="h-0.5 w-12 bg-centric-green/40 border-dashed border-t-2 border-centric-green"></div>
              <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center shadow-md">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <span className="text-[11px] font-semibold text-centric-green bg-white px-2.5 py-1 rounded-full border border-emerald-200 shadow-2xs">
              Live Matching
            </span>
          </div>

          {/* Decorative background shapes */}
          <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-centric-green/10 blur-xl pointer-events-none" />
        </div>
      </div>

      {/* Actions & Rating */}
      <div className="space-y-4 pb-2">
        <button
          onClick={() => dispatch(nextStep())}
          className="w-full py-3.5 px-6 rounded-2xl bg-centric-green hover:bg-centric-green-dark text-white font-semibold text-base shadow-centric transition-all flex items-center justify-center gap-2 group cursor-pointer"
        >
          <span>Get Started</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={() => dispatch(nextStep())}
          className="w-full py-3 px-6 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-all cursor-pointer"
        >
          Learn More
        </button>

        {/* User rating banner */}
        <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
          <div className="flex items-center gap-2">
            {/* Avatar stack */}
            <div className="flex -space-x-2 overflow-hidden">
              <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-slate-300 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces"
                  alt="user"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-slate-400 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces"
                  alt="user"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-slate-500 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces"
                  alt="user"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <span>Trusted by 200K+ users</span>
          </div>

          <div className="flex items-center gap-1 font-semibold text-slate-700">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>4.9</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
