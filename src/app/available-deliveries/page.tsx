'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Filter,
  Package,
  Clock,
  MapPin,
  ArrowRight,
  Star,
  Navigation,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import CentricMap, { MapMarker } from '@/components/map/CentricMap';
import { Button } from '@/components/ui/Button';
import { useAppDispatch } from '@/store/hooks';
import { setTravelerJobStep, setSelectedDeliveryId } from '@/store/slices/deliverySlice';
import { cn } from '@/lib/cn';

interface AvailableJob {
  id: string;
  pickup: string;
  dropoff: string;
  distanceAway: string;
  routeDistance: string;
  category: string;
  size: string;
  weight: string;
  pickupTime: string;
  earnings: number;
  pinX: number;
  pinY: number;
}

export default function AvailableDeliveriesPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [selectedJobId, setSelectedJobId] = useState<string>('CTR-78291');

  const jobs: AvailableJob[] = [
    {
      id: 'CTR-78291',
      pickup: 'Ikeja City Mall',
      dropoff: 'Yaba Tech Hub',
      distanceAway: '1.8 km away',
      routeDistance: '2.6 km',
      category: 'Electronics',
      size: 'Medium',
      weight: '1kg',
      pickupTime: 'Pickup in 6 mins',
      earnings: 1350,
      pinX: 36,
      pinY: 32,
    },
    {
      id: 'CTR-78288',
      pickup: 'Maryland Mall',
      dropoff: 'Surulere',
      distanceAway: '2.2 km away',
      routeDistance: '3.1 km',
      category: 'Documents',
      size: 'Small',
      weight: '0.5kg',
      pickupTime: 'Pickup in 12 mins',
      earnings: 950,
      pinX: 48,
      pinY: 42,
    },
    {
      id: 'CTR-78280',
      pickup: 'Computer Village',
      dropoff: 'Ikeja GRA',
      distanceAway: '2.0 km away',
      routeDistance: '2.2 km',
      category: 'Accessories',
      size: 'Small',
      weight: '0.5kg',
      pickupTime: 'Pickup in 15 mins',
      earnings: 1120,
      pinX: 28,
      pinY: 26,
    },
    {
      id: 'CTR-78275',
      pickup: 'Alausa Secretariat',
      dropoff: 'Ikeja City Mall',
      distanceAway: '3.1 km away',
      routeDistance: '4.0 km',
      category: 'Parcel',
      size: 'Medium',
      weight: '2kg',
      pickupTime: 'Pickup in 20 mins',
      earnings: 1620,
      pinX: 42,
      pinY: 20,
    },
  ];

  const mapMarkers: MapMarker[] = jobs.map((j) => ({
    id: j.id,
    xPercent: j.pinX,
    yPercent: j.pinY,
    title: j.pickup,
    type: 'poi',
    price: `₦${j.earnings.toLocaleString()}`,
  }));

  const handleSelectAndAccept = (jobId: string) => {
    dispatch(setSelectedDeliveryId(jobId));
    dispatch(setTravelerJobStep(2));
    router.push('/traveler/active-delivery');
  };

  return (
    <AppLayout activeRoleOverride="traveler">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Available Deliveries
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Choose a delivery that matches your route today
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-xs"
          >
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>

        {/* 2-Column Grid: Delivery List + Lagos Map */}
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          {/* Deliveries Feed */}
          <div className="space-y-3.5">
            {jobs.map((job) => {
              const isSelected = selectedJobId === job.id;
              return (
                <div
                  key={job.id}
                  onClick={() => setSelectedJobId(job.id)}
                  className={cn(
                    'cursor-pointer rounded-3xl border bg-white p-5 transition-all shadow-xs',
                    isSelected
                      ? 'border-[var(--primary)] ring-2 ring-[var(--primary)]/20'
                      : 'border-slate-100 hover:border-slate-200'
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      {/* Route */}
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                        <span>{job.pickup}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                        <span>{job.dropoff}</span>
                      </div>
                      <p className="mt-1 text-xs text-slate-400">
                        {job.distanceAway} • {job.routeDistance}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold text-[var(--primary)]">
                        ₦{job.earnings.toLocaleString()}
                      </p>
                      <p className="text-[11px] text-slate-400">Est. earnings</p>
                    </div>
                  </div>

                  {/* Badges row */}
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-slate-700 font-medium">
                      {job.category}
                    </span>
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-slate-700 font-medium">
                      {job.size}
                    </span>
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-slate-700 font-medium">
                      {job.weight}
                    </span>
                    <span className="ml-auto flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                      <Clock className="h-3 w-3" />
                      {job.pickupTime}
                    </span>
                  </div>

                  {/* Accept Action */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectAndAccept(job.id);
                      }}
                      className="h-10 px-5 rounded-full text-xs font-semibold"
                    >
                      View & Accept
                    </Button>
                  </div>
                </div>
              );
            })}

            {/* Traveler Profile Card Footer */}
            <div className="rounded-2xl border border-slate-100 bg-emerald-50/60 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white shadow-xs">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces"
                    alt="Ridwan K."
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border border-white bg-[var(--primary)]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Ridwan K.</h4>
                  <p className="flex items-center gap-1 text-xs text-slate-500">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-slate-800">4.9</span>
                    <span>(230)</span>
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[var(--primary)] shadow-xs border border-emerald-200">
                Level 3 Traveler
              </span>
            </div>
          </div>

          {/* Lagos City Vector Map with Live POIs */}
          <div className="sticky top-6 h-fit">
            <CentricMap heightClassName="h-[480px] lg:h-[580px]" markers={mapMarkers} showRoute />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
