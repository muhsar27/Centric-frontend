'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ShieldCheck,
  Users,
  BadgePercent,
  Search,
  MapPin,
  Package,
  Clock3,
  CreditCard,
  Building2,
  Smartphone,
  Check,
  Star,
  Phone,
  MessageSquare,
  Sparkles,
  Download,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import CentricMap from '@/components/map/CentricMap';
import { Button } from '@/components/ui/Button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setCreateStep,
  nextCreateStep,
  prevCreateStep,
  setPickupLocation,
  setDropoffLocation,
  updatePackageDetails,
  setPaymentMethod,
  selectTraveler,
  finalizeDeliveryCreation,
  submitDeliveryRating,
  mockTravelers,
  resetCreateFlow,
} from '@/store/slices/deliverySlice';
import TopUpModal from '@/components/wallet/TopUpModal';
import { cn } from '@/lib/cn';
import { TravelerMatch } from '@/types/delivery';

export default function CreateDeliveryPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const createFlow = useAppSelector((state) => state.delivery.createFlow);
  const senderBalance = useAppSelector((state) => state.wallet.senderBalance);

  const [topUpModalOpen, setTopUpModalOpen] = useState(false);
  const [selectedStars, setSelectedStars] = useState(5);
  const [selectedTags, setSelectedTags] = useState<string[]>(['On-time', 'Good communication']);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const currentStep = createFlow.step;

  const quickTags = [
    'On-time',
    'Friendly',
    'Careful handling',
    'Good communication',
    'Professional',
  ];

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSelectTraveler = (traveler: TravelerMatch) => {
    dispatch(selectTraveler(traveler));
    dispatch(finalizeDeliveryCreation());
  };

  const handleReviewSubmit = () => {
    if (createFlow.activeDeliveryId) {
      dispatch(
        submitDeliveryRating({
          id: createFlow.activeDeliveryId,
          review: {
            rating: selectedStars,
            tags: selectedTags,
            comment: reviewComment,
            createdAt: 'Just now',
          },
        })
      );
    }
    setReviewSubmitted(true);
  };

  return (
    <AppLayout activeRoleOverride="sender">
      <div className="mx-auto max-w-4xl pb-16">
        {/* Step Progression Bar */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {currentStep > 1 && currentStep < 9 && (
              <button
                type="button"
                onClick={() => dispatch(prevCreateStep())}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            )}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Step {currentStep} of 9
              </p>
              <h2 className="text-lg font-bold text-slate-900">
                {currentStep === 1 && 'Create a new delivery'}
                {currentStep === 2 && 'Where are we picking up?'}
                {currentStep === 3 && 'Where are we delivering to?'}
                {currentStep === 4 && 'Delivery Details'}
                {currentStep === 5 && 'Review & Price'}
                {currentStep === 6 && 'Payment'}
                {currentStep === 7 && 'Available Travelers'}
                {currentStep === 8 && 'Delivery in Progress (Live Tracking)'}
                {currentStep === 9 && 'Delivery Summary & Review'}
              </h2>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((s) => (
              <div
                key={s}
                className={cn(
                  'h-2 rounded-full transition-all',
                  s === currentStep
                    ? 'w-6 bg-[var(--primary)]'
                    : s < currentStep
                    ? 'w-2 bg-[var(--primary)]/60'
                    : 'w-2 bg-slate-200'
                )}
              />
            ))}
          </div>
        </div>

        {/* STEP 1: Welcome / Intro */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm"
          >
            <div className="text-center max-w-xl mx-auto py-4">
              <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-emerald-50 text-[var(--primary)]">
                <Package className="h-12 w-12" />
                <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--primary)] text-white text-xs font-bold">
                  ✓
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Create a new delivery
              </h1>
              <p className="mt-3 text-base text-slate-600">
                Send a package to anyone, anywhere in Lagos safely and affordably.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5 text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[var(--primary)] shadow-sm">
                  <Users className="h-5 w-5" />
                </div>
                <h4 className="mt-3 text-sm font-semibold text-slate-900">Verified travelers</h4>
                <p className="mt-1 text-xs text-slate-500">Trusted people, real reviews</p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5 text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[var(--primary)] shadow-sm">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h4 className="mt-3 text-sm font-semibold text-slate-900">Safe & secure</h4>
                <p className="mt-1 text-xs text-slate-500">Your package is protected</p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5 text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[var(--primary)] shadow-sm">
                  <BadgePercent className="h-5 w-5" />
                </div>
                <h4 className="mt-3 text-sm font-semibold text-slate-900">Affordable</h4>
                <p className="mt-1 text-xs text-slate-500">Low fees based on distance</p>
              </div>
            </div>

            <div className="mt-10">
              <Button
                onClick={() => dispatch(nextCreateStep())}
                className="h-14 w-full rounded-full text-base font-semibold"
              >
                Get Started
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: Where are we picking up? */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Where are we picking up?</h3>
              <p className="mt-1 text-sm text-slate-500">Add the pickup location</p>
            </div>

            <div className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search address or drop a pin on map"
                  defaultValue={createFlow.pickup.title + ', ' + createFlow.pickup.address}
                  onChange={(e) =>
                    dispatch(
                      setPickupLocation({
                        title: e.target.value.split(',')[0] || e.target.value,
                        address: e.target.value,
                      })
                    )
                  }
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-medium text-slate-900 focus:border-[var(--primary)] focus:outline-none"
                />
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>

              <button
                type="button"
                onClick={() =>
                  dispatch(
                    setPickupLocation({
                      title: 'Ikeja City Mall',
                      address: 'Alausa, Ikeja, Lagos',
                    })
                  )
                }
                className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--primary)] hover:underline"
              >
                <MapPin className="h-3.5 w-3.5" />
                Use current location
              </button>
            </div>

            {/* Interactive Vector Map with Pickup Marker */}
            <div className="rounded-2xl overflow-hidden">
              <CentricMap
                interactive
                showRoute={false}
                markers={[
                  {
                    id: 'p1',
                    xPercent: 36,
                    yPercent: 32,
                    title: createFlow.pickup.title,
                    type: 'pickup',
                  },
                ]}
                onSelectLocation={(loc) =>
                  dispatch(setPickupLocation({ title: loc.title, address: loc.address }))
                }
              />
            </div>

            {/* Selected Location Card */}
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[var(--primary)] shadow-sm">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{createFlow.pickup.title}</p>
                  <p className="text-xs text-slate-500">{createFlow.pickup.address}</p>
                </div>
              </div>
              <button
                type="button"
                className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm border border-slate-200 hover:bg-slate-50"
              >
                Edit
              </button>
            </div>

            <Button
              onClick={() => dispatch(nextCreateStep())}
              className="h-12 w-full rounded-full text-base font-semibold"
            >
              Continue
            </Button>
          </motion.div>
        )}

        {/* STEP 3: Where are we delivering to? */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Where are we delivering to?</h3>
              <p className="mt-1 text-sm text-slate-500">Add the drop-off location</p>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search address or drop a pin on map"
                defaultValue={createFlow.dropoff.title + ', ' + createFlow.dropoff.address}
                onChange={(e) =>
                  dispatch(
                    setDropoffLocation({
                      title: e.target.value.split(',')[0] || e.target.value,
                      address: e.target.value,
                    })
                  )
                }
                className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-medium text-slate-900 focus:border-[var(--primary)] focus:outline-none"
              />
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>

            {/* Interactive Vector Map with Dropoff Marker */}
            <div className="rounded-2xl overflow-hidden">
              <CentricMap
                interactive
                showRoute
                markers={[
                  {
                    id: 'p1',
                    xPercent: 36,
                    yPercent: 32,
                    title: createFlow.pickup.title,
                    type: 'pickup',
                  },
                  {
                    id: 'd1',
                    xPercent: 68,
                    yPercent: 76,
                    title: createFlow.dropoff.title,
                    type: 'dropoff',
                  },
                ]}
                onSelectLocation={(loc) =>
                  dispatch(setDropoffLocation({ title: loc.title, address: loc.address }))
                }
              />
            </div>

            {/* Selected Location Card */}
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{createFlow.dropoff.title}</p>
                  <p className="text-xs text-slate-500">{createFlow.dropoff.address}</p>
                </div>
              </div>
              <button
                type="button"
                className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm border border-slate-200 hover:bg-slate-50"
              >
                Edit
              </button>
            </div>

            <Button
              onClick={() => dispatch(nextCreateStep())}
              className="h-12 w-full rounded-full text-base font-semibold"
            >
              Continue
            </Button>
          </motion.div>
        )}

        {/* STEP 4: Delivery Details */}
        {currentStep === 4 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Delivery Details</h3>
              <p className="mt-1 text-sm text-slate-500">Tell us more about your package</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  Package category
                </label>
                <select
                  value={createFlow.package.category}
                  onChange={(e) =>
                    dispatch(
                      updatePackageDetails({
                        category: e.target.value as PackageDetails['category'],
                      })
                    )
                  }
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-900 focus:border-[var(--primary)] focus:outline-none"
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Documents">Documents</option>
                  <option value="Food">Food</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Parcel">Parcel</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  Package size
                </label>
                <select
                  value={createFlow.package.size}
                  onChange={(e) =>
                    dispatch(
                      updatePackageDetails({
                        size: e.target.value as PackageDetails['size'],
                      })
                    )
                  }
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-900 focus:border-[var(--primary)] focus:outline-none"
                >
                  <option value="Small">Small (fits in pocket/backpack)</option>
                  <option value="Medium">Medium (laptop bag / box)</option>
                  <option value="Large">Large (suit bag / larger carton)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  Estimated value (₦)
                </label>
                <input
                  type="number"
                  defaultValue={createFlow.package.estimatedValue}
                  onChange={(e) =>
                    dispatch(
                      updatePackageDetails({
                        estimatedValue: parseFloat(e.target.value) || 0,
                      })
                    )
                  }
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-900 focus:border-[var(--primary)] focus:outline-none"
                  placeholder="25000"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  Approximate weight
                </label>
                <input
                  type="text"
                  defaultValue={createFlow.package.weight}
                  onChange={(e) =>
                    dispatch(
                      updatePackageDetails({
                        weight: e.target.value,
                      })
                    )
                  }
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-900 focus:border-[var(--primary)] focus:outline-none"
                  placeholder="1kg"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Fragile?
              </label>
              <select
                value={createFlow.package.fragile ? 'yes' : 'no'}
                onChange={(e) =>
                  dispatch(
                    updatePackageDetails({
                      fragile: e.target.value === 'yes',
                    })
                  )
                }
                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-900 focus:border-[var(--primary)] focus:outline-none"
              >
                <option value="no">No - standard handling</option>
                <option value="yes">Yes - handle with extra care</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Additional notes (optional)
              </label>
              <textarea
                defaultValue={createFlow.package.notes}
                onChange={(e) =>
                  dispatch(
                    updatePackageDetails({
                      notes: e.target.value,
                    })
                  )
                }
                placeholder="E.g. Wireless headphones in black box. Call sender upon arrival."
                rows={3}
                className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-sm font-medium text-slate-900 focus:border-[var(--primary)] focus:outline-none"
              />
            </div>

            {/* Insurance Info Banner */}
            <div className="flex items-center justify-between rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[var(--primary)] shadow-sm">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Centric Package Protection</p>
                  <p className="text-xs text-slate-600">
                    We’re working on insurance coverage to protect your high-value goods.
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-[var(--primary)] border border-emerald-200">
                Active
              </span>
            </div>

            <Button
              onClick={() => dispatch(nextCreateStep())}
              className="h-12 w-full rounded-full text-base font-semibold"
            >
              Continue
            </Button>
          </motion.div>
        )}

        {/* STEP 5: Review & Price */}
        {currentStep === 5 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Review your delivery</h3>
              <p className="mt-1 text-sm text-slate-500">Please confirm the details below</p>
            </div>

            {/* Route Box */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--primary)] text-white text-xs font-bold">
                    P
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400">Pickup</p>
                    <p className="text-sm font-bold text-slate-900">{createFlow.pickup.title}</p>
                    <p className="text-xs text-slate-500">{createFlow.pickup.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-bold">
                    D
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400">Drop-off</p>
                    <p className="text-sm font-bold text-slate-900">{createFlow.dropoff.title}</p>
                    <p className="text-xs text-slate-500">{createFlow.dropoff.address}</p>
                  </div>
                </div>
              </div>

              {/* Specs Pills */}
              <div className="border-t border-slate-200 pt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="rounded-xl bg-white p-2.5 border border-slate-100">
                  <p className="text-[11px] font-medium text-slate-400">Distance</p>
                  <p className="text-sm font-bold text-slate-900">12.4 km</p>
                </div>
                <div className="rounded-xl bg-white p-2.5 border border-slate-100">
                  <p className="text-[11px] font-medium text-slate-400">Est. Time</p>
                  <p className="text-sm font-bold text-slate-900">25–35 mins</p>
                </div>
                <div className="rounded-xl bg-white p-2.5 border border-slate-100">
                  <p className="text-[11px] font-medium text-slate-400">Package</p>
                  <p className="text-sm font-bold text-slate-900">
                    {createFlow.package.size} • {createFlow.package.weight}
                  </p>
                </div>
                <div className="rounded-xl bg-white p-2.5 border border-slate-100">
                  <p className="text-[11px] font-medium text-slate-400">Category</p>
                  <p className="text-sm font-bold text-slate-900">{createFlow.package.category}</p>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="rounded-2xl border border-slate-100 bg-white p-5 space-y-3">
              <h4 className="text-sm font-bold text-slate-900">Price Breakdown</h4>
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>Delivery fee (based on distance)</span>
                <span>₦{createFlow.price.deliveryFee.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>Service & insurance fee</span>
                <span>₦{createFlow.price.serviceFee.toLocaleString()}</span>
              </div>
              <div className="border-t border-slate-100 pt-3 flex items-center justify-between font-bold text-slate-900">
                <span className="text-base">Total to pay</span>
                <span className="text-xl text-[var(--primary)]">
                  ₦{createFlow.price.total.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                onClick={() => dispatch(prevCreateStep())}
                className="h-12 px-6 rounded-full text-base font-semibold"
              >
                Back
              </Button>
              <Button
                onClick={() => dispatch(nextCreateStep())}
                className="h-12 flex-1 rounded-full text-base font-semibold"
              >
                Continue to Payment
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 6: Payment */}
        {currentStep === 6 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Payment</h3>
              <p className="mt-1 text-sm text-slate-500">Choose a payment method</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Wallet Option */}
              <div
                onClick={() => dispatch(setPaymentMethod('wallet'))}
                className={cn(
                  'cursor-pointer rounded-2xl border p-5 transition-all',
                  createFlow.paymentMethod === 'wallet'
                    ? 'border-[var(--primary)] bg-emerald-50/50 ring-2 ring-[var(--primary)]/20'
                    : 'border-slate-200 hover:bg-slate-50'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">Wallet balance</span>
                  <input
                    type="radio"
                    checked={createFlow.paymentMethod === 'wallet'}
                    onChange={() => {}}
                    className="accent-[var(--primary)]"
                  />
                </div>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  ₦{senderBalance.toLocaleString()}
                </p>

                {senderBalance < createFlow.price.total ? (
                  <div className="mt-3">
                    <p className="text-xs font-medium text-amber-600 flex items-center gap-1">
                      <AlertCircle className="h-3.5 w-3.5" />
                      Insufficient balance
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setTopUpModalOpen(true);
                      }}
                      className="mt-2 inline-flex items-center justify-center rounded-xl bg-[var(--primary)] px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-[var(--primary-hover)]"
                    >
                      Top Up Wallet
                    </button>
                  </div>
                ) : (
                  <p className="mt-2 text-xs font-semibold text-[var(--primary)]">
                    ✓ Balance available
                  </p>
                )}
              </div>

              {/* Other Methods */}
              <div className="space-y-2.5">
                <div
                  onClick={() => dispatch(setPaymentMethod('card'))}
                  className={cn(
                    'flex cursor-pointer items-center justify-between rounded-2xl border p-3.5 transition-all',
                    createFlow.paymentMethod === 'card'
                      ? 'border-[var(--primary)] bg-emerald-50/50'
                      : 'border-slate-200 hover:bg-slate-50'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-slate-700" />
                    <div>
                      <p className="text-sm font-bold text-slate-900">Pay with Card</p>
                      <p className="text-xs text-slate-400">Mastercard, Visa, Verve</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    checked={createFlow.paymentMethod === 'card'}
                    onChange={() => {}}
                    className="accent-[var(--primary)]"
                  />
                </div>

                <div
                  onClick={() => dispatch(setPaymentMethod('bank_transfer'))}
                  className={cn(
                    'flex cursor-pointer items-center justify-between rounded-2xl border p-3.5 transition-all',
                    createFlow.paymentMethod === 'bank_transfer'
                      ? 'border-[var(--primary)] bg-emerald-50/50'
                      : 'border-slate-200 hover:bg-slate-50'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-slate-700" />
                    <div>
                      <p className="text-sm font-bold text-slate-900">Bank Transfer</p>
                      <p className="text-xs text-slate-400">Instant payment</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    checked={createFlow.paymentMethod === 'bank_transfer'}
                    onChange={() => {}}
                    className="accent-[var(--primary)]"
                  />
                </div>

                <div
                  onClick={() => dispatch(setPaymentMethod('ussd'))}
                  className={cn(
                    'flex cursor-pointer items-center justify-between rounded-2xl border p-3.5 transition-all',
                    createFlow.paymentMethod === 'ussd'
                      ? 'border-[var(--primary)] bg-emerald-50/50'
                      : 'border-slate-200 hover:bg-slate-50'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-slate-700" />
                    <div>
                      <p className="text-sm font-bold text-slate-900">USSD</p>
                      <p className="text-xs text-slate-400">Quick pay code</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    checked={createFlow.paymentMethod === 'ussd'}
                    onChange={() => {}}
                    className="accent-[var(--primary)]"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Total to pay</p>
                <p className="text-xl font-bold text-slate-900">
                  ₦{createFlow.price.total.toLocaleString()}
                </p>
              </div>

              <Button
                onClick={() => dispatch(nextCreateStep())}
                className="h-12 px-8 rounded-full text-base font-semibold"
              >
                Pay & Continue
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 7: Available Travelers */}
        {currentStep === 7 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm space-y-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Available Travelers</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Choose a verified traveler to deliver your package
                </p>
              </div>
              <button
                type="button"
                onClick={() => {}}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Refresh list
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {mockTravelers.map((traveler) => (
                <div
                  key={traveler.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4.5 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full border border-slate-200">
                      <img
                        src={traveler.avatar}
                        alt={traveler.name}
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[var(--primary)]" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-slate-900">{traveler.name}</h4>
                        {traveler.levelBadge && (
                          <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-[var(--primary)]">
                            {traveler.levelBadge}
                          </span>
                        )}
                      </div>
                      <p className="flex items-center gap-1 text-xs text-slate-500">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-semibold text-slate-800">{traveler.rating}</span>
                        <span>({traveler.reviewsCount})</span>
                        <span className="mx-1">•</span>
                        <span>{traveler.completionRate}% completion rate</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6">
                    <div className="text-right">
                      <p className="text-base font-bold text-slate-900">
                        ₦{traveler.totalEarning.toLocaleString()}
                      </p>
                      <p className="text-xs text-slate-400">
                        {traveler.distanceKm} km away • {traveler.etaMins} mins
                      </p>
                    </div>

                    <Button
                      onClick={() => handleSelectTraveler(traveler)}
                      className="h-10 px-5 rounded-full text-sm font-semibold"
                    >
                      Select
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP 8: Delivery in Progress (Live Tracking) */}
        {currentStep === 8 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-[var(--primary)] border border-emerald-200">
                    <span className="h-2 w-2 rounded-full bg-[var(--primary)] animate-ping" />
                    Delivery in Progress
                  </span>
                  <h3 className="mt-2 text-2xl font-bold text-slate-900">
                    {createFlow.selectedTraveler?.name || 'Ridwan K.'} is on the way to pick up
                    your package
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => router.push('/messages')}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  >
                    <MessageSquare className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  >
                    <Phone className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Vector Map with Live Tracking */}
              <div className="mt-6 rounded-2xl overflow-hidden">
                <CentricMap showRoute courierProgress={55} />
              </div>

              {/* Status and Details Grid */}
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div className="space-y-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400">Status</span>
                    <span className="rounded-full bg-emerald-100/80 px-2.5 py-0.5 text-xs font-bold text-[var(--primary)]">
                      On the way to pickup
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 h-3 w-3 rounded-full bg-[var(--primary)]" />
                      <div>
                        <p className="text-xs font-medium text-slate-400">Pickup</p>
                        <p className="text-sm font-bold text-slate-900">
                          {createFlow.pickup.title}
                        </p>
                        <p className="text-xs text-slate-500">{createFlow.pickup.address}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-1 h-3 w-3 rounded-full bg-slate-900" />
                      <div>
                        <p className="text-xs font-medium text-slate-400">Drop-off</p>
                        <p className="text-sm font-bold text-slate-900">
                          {createFlow.dropoff.title}
                        </p>
                        <p className="text-xs text-slate-500">{createFlow.dropoff.address}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-3 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Estimated delivery</span>
                    <span className="font-bold text-slate-900">25–35 mins</span>
                  </div>
                </div>

                {/* Assigned Traveler Card */}
                <div className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5">
                  <div className="flex items-center gap-3.5">
                    <div className="relative h-14 w-14 overflow-hidden rounded-full border border-slate-200">
                      <img
                        src={
                          createFlow.selectedTraveler?.avatar ||
                          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces'
                        }
                        alt="Traveler"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">
                        {createFlow.selectedTraveler?.name || 'Ridwan K.'}
                      </h4>
                      <p className="flex items-center gap-1 text-xs text-slate-500">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-semibold text-slate-800">
                          {createFlow.selectedTraveler?.rating || 4.9}
                        </span>
                        <span>({createFlow.selectedTraveler?.reviewsCount || 230} reviews)</span>
                      </p>
                      <p className="mt-0.5 text-xs text-[var(--primary)] font-semibold">
                        On the way • 2 mins away
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Button
                      variant="secondary"
                      onClick={() => router.push('/deliveries')}
                      className="flex-1 h-11 rounded-full text-sm font-semibold"
                    >
                      View in Deliveries
                    </Button>
                    <Button
                      onClick={() => dispatch(setCreateStep(9))}
                      className="flex-1 h-11 rounded-full text-sm font-semibold"
                    >
                      Simulate Delivered
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 9: Delivered, Rating, and Receipt Summary */}
        {currentStep === 9 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Delivery Completion Banner Card */}
            <div className="rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-[var(--primary)]">
                <CheckCircle2 className="h-12 w-12" />
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
                Delivery completed!
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Your package has been delivered successfully.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button
                  variant="secondary"
                  onClick={() => router.push('/deliveries')}
                  className="h-11 px-6 rounded-full text-sm font-semibold"
                >
                  View Delivery Details
                </Button>
                <Button
                  onClick={() => {
                    dispatch(resetCreateFlow());
                    dispatch(setCreateStep(1));
                  }}
                  className="h-11 px-6 rounded-full text-sm font-semibold"
                >
                  Create Another Delivery
                </Button>
              </div>
            </div>

            {/* 2-Column: Rate Your Experience + Receipt */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Rate Experience */}
              <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900">Rate your experience</h3>
                <p className="mt-1 text-xs text-slate-500">How was your delivery?</p>

                {reviewSubmitted ? (
                  <div className="mt-6 rounded-2xl bg-emerald-50 p-6 text-center">
                    <Sparkles className="mx-auto h-8 w-8 text-[var(--primary)]" />
                    <p className="mt-2 text-sm font-bold text-slate-900">
                      Thank you for your review!
                    </p>
                    <p className="mt-1 text-xs text-slate-600">
                      Your feedback helps keep Centric safe and trusted.
                    </p>
                  </div>
                ) : (
                  <div className="mt-5 space-y-4">
                    {/* Star Selector */}
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setSelectedStars(star)}
                          className="p-1 text-amber-400 transition-transform hover:scale-125"
                        >
                          <Star
                            className={cn(
                              'h-8 w-8',
                              star <= selectedStars ? 'fill-amber-400' : 'text-slate-200'
                            )}
                          />
                        </button>
                      ))}
                    </div>

                    {/* Quick Tags */}
                    <div>
                      <p className="text-xs font-semibold text-slate-600 mb-2">
                        Great! What did you love?
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {quickTags.map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => handleTagToggle(tag)}
                            className={cn(
                              'rounded-full px-3 py-1 text-xs font-medium transition-all',
                              selectedTags.includes(tag)
                                ? 'bg-[var(--primary)] text-white shadow-xs'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            )}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Comment */}
                    <div>
                      <textarea
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Add a comment (optional)..."
                        rows={3}
                        className="w-full rounded-xl border border-slate-200 p-3 text-xs font-medium text-slate-900 focus:border-[var(--primary)] focus:outline-none"
                      />
                    </div>

                    <Button
                      onClick={handleReviewSubmit}
                      className="h-11 w-full rounded-full text-sm font-semibold"
                    >
                      Submit Review
                    </Button>
                  </div>
                )}
              </div>

              {/* Delivery Receipt Summary */}
              <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-lg font-bold text-slate-900">Delivery Summary</h3>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-[var(--primary)]">
                      Delivered
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Delivery ID</span>
                      <span className="font-bold text-slate-900">
                        {createFlow.activeDeliveryId || 'CTR-78291'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Date</span>
                      <span className="font-medium text-slate-900">May 12, 2025 • 10:46 AM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Pickup</span>
                      <span className="font-medium text-slate-900 text-right">
                        {createFlow.pickup.title}, Alausa, Lagos
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Drop-off</span>
                      <span className="font-medium text-slate-900 text-right">
                        {createFlow.dropoff.title}, Yaba, Lagos
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Delivered by</span>
                      <span className="font-medium text-slate-900">
                        {createFlow.selectedTraveler?.name || 'Ridwan K.'} (4.9 ★)
                      </span>
                    </div>
                    <div className="border-t border-slate-100 pt-2 flex justify-between text-sm font-bold text-slate-900">
                      <span>Total paid</span>
                      <span className="text-[var(--primary)]">
                        ₦{createFlow.price.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="button"
                    onClick={() => alert('Receipt downloaded!')}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                  >
                    <Download className="h-4 w-4" />
                    Download Receipt
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <TopUpModal isOpen={topUpModalOpen} onClose={() => setTopUpModalOpen(false)} />
    </AppLayout>
  );
}
