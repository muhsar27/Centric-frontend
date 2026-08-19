'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Package,
  MapPin,
  Clock,
  ArrowRight,
  User,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Eye,
  X,
  Phone,
  MessageSquare,
} from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import CentricMap from '@/components/map/CentricMap';
import { Button } from '@/components/ui/Button';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useAppSelector } from '@/store/hooks';
import { DeliveryItem, DeliveryStatus } from '@/types/delivery';
import { cn } from '@/lib/cn';
import { useRouter } from 'next/navigation';

type FilterTab = 'all' | 'in_progress' | 'completed' | 'cancelled';

export default function DeliveriesPage() {
  const router = useRouter();
  const { role, isSender } = useCurrentUser();
  const deliveries = useAppSelector((state) => state.delivery.deliveries);

  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryItem | null>(null);

  const filteredDeliveries = deliveries.filter((d) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'in_progress') {
      return (
        d.status === 'on_the_way_to_pickup' ||
        d.status === 'arrived_pickup' ||
        d.status === 'picked_up' ||
        d.status === 'in_transit' ||
        d.status === 'arrived_dropoff'
      );
    }
    if (activeTab === 'completed') return d.status === 'delivered';
    if (activeTab === 'cancelled') return d.status === 'cancelled';
    return true;
  });

  const getStatusBadge = (status: DeliveryStatus) => {
    switch (status) {
      case 'on_the_way_to_pickup':
        return (
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-[var(--primary)] border border-emerald-200">
            On the way to pickup
          </span>
        );
      case 'arrived_pickup':
        return (
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 border border-amber-200">
            Arrived at pickup
          </span>
        );
      case 'picked_up':
        return (
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 border border-blue-200">
            Picked up
          </span>
        );
      case 'in_transit':
        return (
          <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700 border border-purple-200">
            In transit
          </span>
        );
      case 'arrived_dropoff':
        return (
          <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 border border-teal-200">
            Arrived at drop-off
          </span>
        );
      case 'delivered':
        return (
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-[var(--primary)] border border-emerald-200">
            Delivered
          </span>
        );
      case 'cancelled':
        return (
          <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 border border-red-200">
            Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page Header & Filter Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              My Deliveries ({isSender ? 'Sender' : 'Traveler'})
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Track and manage all your package deliveries and history
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 rounded-2xl bg-slate-100 p-1">
            {(['all', 'in_progress', 'completed', 'cancelled'] as FilterTab[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'rounded-xl px-3.5 py-1.5 text-xs font-bold capitalize transition-all',
                  activeTab === tab
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                )}
              >
                {tab.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Deliveries Table Card */}
        <div className="rounded-3xl border border-slate-100 bg-white shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50/70 text-xs font-bold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-6 py-4">Delivery</th>
                  <th className="px-6 py-4">Route</th>
                  {isSender && <th className="px-6 py-4">Traveler</th>}
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Time</th>
                  <th className="px-6 py-4">{isSender ? 'Paid' : 'Earnings'}</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDeliveries.map((delivery) => (
                  <tr key={delivery.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">{delivery.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-800 font-medium">
                        <span>{delivery.pickup.title}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                        <span>{delivery.dropoff.title}</span>
                      </div>
                    </td>

                    {isSender && (
                      <td className="px-6 py-4">
                        {delivery.traveler ? (
                          <div className="flex items-center gap-2">
                            <img
                              src={delivery.traveler.avatar}
                              alt={delivery.traveler.name}
                              className="h-6 w-6 rounded-full object-cover"
                            />
                            <span className="font-semibold text-slate-800">
                              {delivery.traveler.name}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400">Pending match</span>
                        )}
                      </td>
                    )}

                    <td className="px-6 py-4">{getStatusBadge(delivery.status)}</td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-500">
                      {delivery.createdAt.split('•')[1] || '10:45 AM'}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">
                      ₦{delivery.price.total.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedDelivery(delivery)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[var(--primary)] hover:underline"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredDeliveries.length === 0 && (
            <div className="py-12 text-center">
              <Package className="mx-auto h-12 w-12 text-slate-300" />
              <p className="mt-3 text-sm font-semibold text-slate-900">No deliveries found</p>
              <p className="mt-1 text-xs text-slate-500">
                You don&apos;t have any deliveries under this tab.
              </p>
            </div>
          )}
        </div>

        {/* Delivery Details Modal / Drawer */}
        {selectedDelivery && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
              onClick={() => setSelectedDelivery(null)}
            />

            <div className="relative w-full max-w-xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
              <button
                type="button"
                onClick={() => setSelectedDelivery(null)}
                className="absolute right-5 top-5 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-semibold text-slate-400">Delivery Details</span>
                  <h3 className="text-xl font-bold text-slate-900">{selectedDelivery.id}</h3>
                </div>
                {getStatusBadge(selectedDelivery.status)}
              </div>

              {/* Map Preview */}
              <div className="mt-4 rounded-2xl overflow-hidden">
                <CentricMap heightClassName="h-[200px]" showRoute />
              </div>

              {/* Route & Info */}
              <div className="mt-5 space-y-4">
                <div className="rounded-2xl bg-slate-50 p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-3 w-3 rounded-full bg-[var(--primary)]" />
                    <div>
                      <p className="text-xs font-medium text-slate-400">Pickup Location</p>
                      <p className="text-sm font-bold text-slate-900">
                        {selectedDelivery.pickup.title}
                      </p>
                      <p className="text-xs text-slate-500">{selectedDelivery.pickup.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-3 w-3 rounded-full bg-slate-900" />
                    <div>
                      <p className="text-xs font-medium text-slate-400">Drop-off Location</p>
                      <p className="text-sm font-bold text-slate-900">
                        {selectedDelivery.dropoff.title}
                      </p>
                      <p className="text-xs text-slate-500">{selectedDelivery.dropoff.address}</p>
                    </div>
                  </div>
                </div>

                {/* Package & Payment */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl border border-slate-100 p-3 bg-white">
                    <p className="text-slate-400">Package</p>
                    <p className="font-bold text-slate-900">
                      {selectedDelivery.package.category} • {selectedDelivery.package.size}
                    </p>
                    <p className="text-slate-500">{selectedDelivery.package.weight}</p>
                  </div>
                  <div className="rounded-xl border border-slate-100 p-3 bg-white">
                    <p className="text-slate-400">Total Price</p>
                    <p className="text-base font-bold text-[var(--primary)]">
                      ₦{selectedDelivery.price.total.toLocaleString()}
                    </p>
                    <p className="text-slate-500 capitalize">{selectedDelivery.paymentMethod}</p>
                  </div>
                </div>

                {/* Sender / Traveler actions */}
                <div className="flex items-center justify-between gap-3 pt-2">
                  <Button
                    variant="secondary"
                    onClick={() => router.push('/messages')}
                    className="flex-1 h-11 rounded-full text-xs font-semibold gap-2"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Message
                  </Button>
                  {!isSender && selectedDelivery.status !== 'delivered' && (
                    <Button
                      onClick={() => router.push('/traveler/active-delivery')}
                      className="flex-1 h-11 rounded-full text-xs font-semibold"
                    >
                      Open Live Job
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
