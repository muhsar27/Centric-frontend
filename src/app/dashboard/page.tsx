'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Package,
  ShieldCheck,
  Search,
  Plus,
  Bell,
  LogOut,
  MapPin,
} from 'lucide-react';
import CentricLogo from '@/components/ui/CentricLogo';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import { resetOnboarding } from '@/store/slices/onboardingSlice';

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { role } = useAppSelector((state) => state.onboarding);

  const activeRole = user?.role || role || 'sender';

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetOnboarding());
    router.push('/auth/onboarding');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <CentricLogo size="md" />

        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-500 hover:text-slate-700 rounded-full hover:bg-slate-100 relative">
            <Bell className="w-5 h-5" />
            <span className="w-2 h-2 rounded-full bg-centric-green absolute top-1.5 right-1.5" />
          </button>

          <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
            <div className="w-9 h-9 rounded-full bg-centric-green text-white font-bold flex items-center justify-center text-sm shadow-2xs">
              {user?.fullName ? user.fullName[0] : 'T'}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold text-slate-900">
                {user?.fullName || 'Tobi Afolayan'}
              </p>
              <p className="text-[10px] font-semibold text-centric-green capitalize">
                {activeRole} Account
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors ml-2"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Good morning, {user?.fullName?.split(' ')[0] || 'Tobi'} 👋
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Here&apos;s what&apos;s happening with your deliveries today.
            </p>
          </div>

          <Link
            href="/auth/onboarding"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-centric-green hover:bg-centric-green-dark text-white font-semibold text-sm shadow-centric transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>
              {activeRole === 'sender' ? 'Create Delivery' : 'Find Available Tasks'}
            </span>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <p className="text-xs font-semibold text-slate-500">Active Deliveries</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-2">2</p>
            <span className="inline-block text-[10px] font-semibold text-centric-green bg-emerald-50 px-2 py-0.5 rounded-md mt-2">
              In progress
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <p className="text-xs font-semibold text-slate-500">Completed (This Month)</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-2">24</p>
            <span className="inline-block text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md mt-2">
              +12% vs last month
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <p className="text-xs font-semibold text-slate-500">
              {activeRole === 'sender' ? 'Total Spent' : 'Total Earnings'}
            </p>
            <p className="text-2xl font-extrabold text-slate-900 mt-2">
              ₦{activeRole === 'sender' ? '234,500' : '144,000'}
            </p>
            <span className="inline-block text-[10px] font-semibold text-centric-green bg-emerald-50 px-2 py-0.5 rounded-md mt-2">
              Verified
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <p className="text-xs font-semibold text-slate-500">Wallet Balance</p>
            <p className="text-2xl font-extrabold text-centric-green mt-2">₦45,300</p>
            <span className="inline-block text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md mt-2 cursor-pointer hover:bg-slate-200">
              Top-up
            </span>
          </div>
        </div>

        {/* Dynamic Action Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Track Card */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Track your delivery
              </h3>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Enter tracking code (e.g. #CTA25378)"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-centric-green pl-10"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
                <button className="px-5 py-3 rounded-xl bg-centric-green text-white text-sm font-semibold hover:bg-centric-green-dark transition-all">
                  Track
                </button>
              </div>
            </div>

            {/* Recent Deliveries */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-900">
                  Recent deliveries
                </h3>
                <span className="text-xs font-semibold text-centric-green hover:underline cursor-pointer">
                  View all
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-centric-green flex items-center justify-center">
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        Laptop Charger
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-centric-green" /> Ikeja → Yaba, Lagos
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-centric-green bg-emerald-100/80 px-2.5 py-1 rounded-full">
                    In Transit
                  </span>
                </div>

                <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-600 flex items-center justify-center">
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Documents</h4>
                      <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" /> Surulere → Victoria Island
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-slate-600 bg-slate-200 px-2.5 py-1 rounded-full">
                    Delivered
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Info Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-600 to-centric-green text-white shadow-xl flex flex-col justify-between h-80">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">Centric Guarantee</h3>
              <p className="text-xs text-emerald-100 mt-2 leading-relaxed">
                All packages are insured up to ₦75,000 and delivered by verified community travelers.
              </p>
            </div>

            <Link
              href="/auth/onboarding"
              className="w-full py-3 rounded-xl bg-white text-centric-green font-bold text-xs text-center hover:bg-emerald-50 transition-colors shadow-sm"
            >
              Test Onboarding Flow Again
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
