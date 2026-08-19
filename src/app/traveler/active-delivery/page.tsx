'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  MapPin,
  Clock,
  Package,
  Phone,
  MessageSquare,
  ShieldCheck,
  Camera,
  CheckCircle2,
  Navigation,
  KeyRound,
  Sparkles,
  ExternalLink,
  RotateCcw,
} from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import CentricMap from '@/components/map/CentricMap';
import { Button } from '@/components/ui/Button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setTravelerJobStep,
  nextTravelerJobStep,
  prevTravelerJobStep,
  setTravelerProofPhoto,
  setTravelerOtpInput,
  completeTravelerJob,
} from '@/store/slices/deliverySlice';
import { creditTravelerEarning } from '@/store/slices/walletSlice';
import { cn } from '@/lib/cn';

export default function TravelerActiveJobPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { travelerJob, deliveries } = useAppSelector((state) => state.delivery);

  const activeDelivery =
    deliveries.find((d) => d.id === travelerJob.deliveryId) || deliveries[0];

  const currentStep = travelerJob.step;
  const [otpDigits, setOtpDigits] = useState<string[]>(travelerJob.otpInput);
  const [photoCaptured, setPhotoCaptured] = useState(
    'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&h=350&fit=crop'
  );

  const handleOtpChange = (index: number, val: string) => {
    const updated = [...otpDigits];
    updated[index] = val.slice(-1);
    setOtpDigits(updated);
    dispatch(setTravelerOtpInput(updated));
  };

  const handleCompleteDelivery = () => {
    dispatch(completeTravelerJob());
    dispatch(
      creditTravelerEarning({
        amount: 1360,
        routeText: `${activeDelivery.pickup.title} → ${activeDelivery.dropoff.title}`,
      })
    );
    dispatch(setTravelerJobStep(9));
  };

  return (
    <AppLayout activeRoleOverride="traveler">
      <div className="mx-auto max-w-3xl pb-16 space-y-6">
        {/* Step Top Bar */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              if (currentStep > 2) {
                dispatch(prevTravelerJobStep());
              } else {
                router.push('/available-deliveries');
              }
            }}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            {currentStep === 2 ? 'Back to list' : 'Previous Step'}
          </button>

          <div className="text-right">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Delivery Job {travelerJob.deliveryId}
            </span>
          </div>
        </div>

        {/* STEP 2: Delivery Details & Accept */}
        {currentStep <= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Delivery Details</h2>
              <p className="mt-1 text-sm text-slate-500">
                Review shipment information before accepting
              </p>
            </div>

            {/* Route Map Preview */}
            <div className="rounded-2xl overflow-hidden">
              <CentricMap heightClassName="h-[220px]" showRoute />
            </div>

            {/* Route Specs */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--primary)] text-white text-xs font-bold">
                    P
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400">Pickup</p>
                    <p className="text-sm font-bold text-slate-900">
                      {activeDelivery.pickup.title}
                    </p>
                    <p className="text-xs text-slate-500">1.8 km away from you</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-bold">
                    D
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400">Drop-off</p>
                    <p className="text-sm font-bold text-slate-900">
                      {activeDelivery.dropoff.title}
                    </p>
                    <p className="text-xs text-slate-500">2.6 km route</p>
                  </div>
                </div>
              </div>

              {/* Package Tags */}
              <div className="border-t border-slate-200 pt-3 flex flex-wrap gap-2 text-xs font-medium">
                <span className="rounded-lg bg-white px-2.5 py-1 text-slate-700 border border-slate-200">
                  {activeDelivery.package.category}
                </span>
                <span className="rounded-lg bg-white px-2.5 py-1 text-slate-700 border border-slate-200">
                  {activeDelivery.package.size}
                </span>
                <span className="rounded-lg bg-white px-2.5 py-1 text-slate-700 border border-slate-200">
                  {activeDelivery.package.weight}
                </span>
                {activeDelivery.package.fragile && (
                  <span className="rounded-lg bg-amber-50 px-2.5 py-1 text-amber-700 border border-amber-200">
                    Fragile
                  </span>
                )}
              </div>
            </div>

            {/* Sender & Instructions */}
            <div className="rounded-2xl border border-slate-100 bg-white p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={activeDelivery.sender.avatar}
                    alt={activeDelivery.sender.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {activeDelivery.sender.name}
                    </p>
                    <p className="text-xs text-slate-400">
                      ★ {activeDelivery.sender.rating} • {activeDelivery.sender.completionRate}%
                      completion
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xs text-slate-400">Pickup deadline</p>
                  <p className="text-xs font-bold text-slate-800">10:45 AM (8 mins left)</p>
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-600">
                <span className="font-bold text-slate-900">Note from sender: </span>
                {activeDelivery.package.notes || 'Please handle with care.'}
              </div>
            </div>

            {/* Est Earnings Banner */}
            <div className="flex items-center justify-between rounded-2xl bg-emerald-50 p-4 border border-emerald-100">
              <div>
                <p className="text-xs text-emerald-800 font-semibold">Estimated Earnings</p>
                <p className="text-2xl font-bold text-[var(--primary)]">
                  ₦{activeDelivery.price.total.toLocaleString()}
                </p>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[var(--primary)] shadow-xs">
                You keep 100%
              </span>
            </div>

            <Button
              onClick={() => dispatch(setTravelerJobStep(3))}
              className="h-12 w-full rounded-full text-base font-semibold"
            >
              Accept Delivery
            </Button>
          </motion.div>
        )}

        {/* STEP 3: On the Way to Pickup */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm space-y-6"
          >
            <div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-[var(--primary)]">
                Navigation Active
              </span>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">On the way to pickup</h2>
              <p className="mt-1 text-sm text-slate-500">Navigate to the sender&apos;s location</p>
            </div>

            {/* Live Navigation Map */}
            <div className="rounded-2xl overflow-hidden">
              <CentricMap heightClassName="h-[280px]" courierProgress={25} />
            </div>

            {/* Floating Navigation Card */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    {activeDelivery.pickup.title}
                  </h4>
                  <p className="text-xs text-slate-500">{activeDelivery.pickup.address}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-[var(--primary)]">3 mins</p>
                  <p className="text-xs text-slate-400">0.6 km remaining</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                onClick={() => alert('Opening turn-by-turn navigation in Google Maps...')}
                className="h-12 flex-1 rounded-full text-sm font-semibold gap-2"
              >
                <Navigation className="h-4 w-4" />
                Start Navigation
              </Button>
              <Button
                onClick={() => dispatch(setTravelerJobStep(4))}
                className="h-12 flex-1 rounded-full text-sm font-semibold"
              >
                Arrived at Pickup
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 4: Arrived at Pickup Location */}
        {currentStep === 4 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm space-y-6"
          >
            <div className="text-center max-w-md mx-auto py-2">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-[var(--primary)]">
                <MapPin className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Arrived at pickup location</h2>
              <p className="mt-1 text-sm text-slate-500">
                Meet the sender and collect the package safely
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    {activeDelivery.pickup.title}
                  </h4>
                  <p className="text-xs text-slate-500">{activeDelivery.pickup.address}</p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[var(--primary)] shadow-xs">
                  Pickup Point
                </span>
              </div>

              {/* Contact Sender row */}
              <div className="border-t border-slate-200 pt-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={activeDelivery.sender.avatar}
                    alt={activeDelivery.sender.name}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <span className="text-xs font-bold text-slate-900">
                    {activeDelivery.sender.name}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => router.push('/messages')}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => alert(`Calling ${activeDelivery.sender.phone}`)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                  >
                    <Phone className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <Button
              onClick={() => dispatch(setTravelerJobStep(5))}
              className="h-12 w-full rounded-full text-base font-semibold"
            >
              I&apos;ve Arrived & Collected Package
            </Button>
          </motion.div>
        )}

        {/* STEP 5: Confirm Pickup / Take Photo */}
        {currentStep === 5 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Confirm pickup</h2>
              <p className="mt-1 text-sm text-slate-500">
                Take a clear photo of the package to verify condition
              </p>
            </div>

            {/* Photo Capture Box */}
            <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-center">
              <img
                src={photoCaptured}
                alt="Package photo"
                className="mx-auto h-52 w-auto rounded-xl object-cover shadow-sm"
              />
              <div className="mt-3 flex justify-center gap-2">
                <button
                  type="button"
                  onClick={() => alert('Photo retake simulated!')}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 shadow-sm border border-slate-200"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Retake Photo
                </button>
              </div>
            </div>

            {/* Package Summary Card */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-900">{activeDelivery.pickup.title} → {activeDelivery.dropoff.title}</p>
                <p className="text-slate-500">
                  {activeDelivery.package.category} • {activeDelivery.package.size} • {activeDelivery.package.weight}
                </p>
              </div>
              <span className="font-mono font-bold text-slate-700">{activeDelivery.id}</span>
            </div>

            <Button
              onClick={() => {
                dispatch(setTravelerProofPhoto(photoCaptured));
                dispatch(setTravelerJobStep(6));
              }}
              className="h-12 w-full rounded-full text-base font-semibold"
            >
              Confirm Picked Up
            </Button>
          </motion.div>
        )}

        {/* STEP 6: In Transit */}
        {currentStep === 6 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm space-y-6"
          >
            <div>
              <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-purple-700 border border-purple-200">
                In Transit
              </span>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">Heading to Drop-off</h2>
              <p className="mt-1 text-sm text-slate-500">You&apos;re on your way to deliver the package</p>
            </div>

            {/* Route Map to destination */}
            <div className="rounded-2xl overflow-hidden">
              <CentricMap heightClassName="h-[260px]" courierProgress={70} />
            </div>

            {/* Recipient & ETA card */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    {activeDelivery.dropoff.title}
                  </h4>
                  <p className="text-xs text-slate-500">{activeDelivery.dropoff.address}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-[var(--primary)]">5 mins</p>
                  <p className="text-xs text-slate-400">1.2 km remaining</p>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-3 flex items-center justify-between text-xs">
                <span className="text-slate-500">Recipient: David N.</span>
                <span className="font-semibold text-slate-700">Drop-off by 11:30 AM</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                onClick={() => alert('Opening route in Maps...')}
                className="h-12 flex-1 rounded-full text-sm font-semibold gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Open in Maps
              </Button>
              <Button
                onClick={() => dispatch(setTravelerJobStep(7))}
                className="h-12 flex-1 rounded-full text-sm font-semibold"
              >
                Arrived at Drop-off
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 7: Arrived at Drop-off */}
        {currentStep === 7 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm space-y-6"
          >
            <div className="text-center max-w-md mx-auto py-2">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-[var(--primary)]">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Arrived at drop-off</h2>
              <p className="mt-1 text-sm text-slate-500">
                Get the 6-digit verification code from the recipient
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    {activeDelivery.dropoff.title}
                  </h4>
                  <p className="text-xs text-slate-500">{activeDelivery.dropoff.address}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => router.push('/messages')}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => alert('Calling recipient...')}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                  >
                    <Phone className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <Button
              onClick={() => dispatch(setTravelerJobStep(8))}
              className="h-12 w-full rounded-full text-base font-semibold"
            >
              Enter Code
            </Button>
          </motion.div>
        )}

        {/* STEP 8: Enter Code & Deliver */}
        {currentStep === 8 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm space-y-6 text-center"
          >
            <div>
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-[var(--primary)]">
                <KeyRound className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Enter delivery code</h2>
              <p className="mt-1 text-sm text-slate-500">
                Ask the recipient for the 6-digit confirmation code
              </p>
            </div>

            {/* 6 OTP Boxes */}
            <div className="my-6 flex justify-center gap-2.5 sm:gap-3">
              {otpDigits.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="h-14 w-12 sm:w-14 rounded-2xl border-2 border-slate-200 text-center text-xl font-bold text-slate-900 focus:border-[var(--primary)] focus:outline-none"
                />
              ))}
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-bold text-[var(--primary)] border border-emerald-200">
              <CheckCircle2 className="h-4 w-4" />
              Code looks good!
            </div>

            <div className="pt-4">
              <Button
                onClick={handleCompleteDelivery}
                className="h-12 w-full rounded-full text-base font-semibold"
              >
                Confirm Delivery
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 9: Delivery Completed */}
        {currentStep === 9 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm space-y-6"
          >
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50 text-[var(--primary)] animate-bounce">
              <CheckCircle2 className="h-14 w-14" />
            </div>

            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Delivery completed!
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Great job! You&apos;ve completed the delivery.
              </p>
            </div>

            {/* Earnings Credited Box */}
            <div className="rounded-2xl bg-emerald-50/70 p-6 border border-emerald-100 max-w-sm mx-auto">
              <p className="text-xs uppercase tracking-wider text-emerald-800 font-semibold">
                Earnings Added
              </p>
              <p className="mt-1 text-3xl font-bold text-[var(--primary)]">₦1,360</p>
              <p className="mt-1 text-xs text-slate-500">Payment is now available in your wallet.</p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <Button
                variant="secondary"
                onClick={() => router.push('/deliveries')}
                className="h-11 px-6 rounded-full text-sm font-semibold"
              >
                View in My Deliveries
              </Button>
              <Button
                onClick={() => router.push('/dashboard')}
                className="h-11 px-6 rounded-full text-sm font-semibold"
              >
                Back to Dashboard
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
}
