'use client';

import React, { useState, useEffect } from 'react';
import {
  User,
  Shield,
  Bell,
  CreditCard,
  MapPin,
  Globe,
  Moon,
  Mail,
  HelpCircle,
  Headphones,
  ChevronRight,
  Check,
  X,
} from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

export default function SettingsPage() {
  const { fullName: userFullName, email: userEmail, phone: userPhone } = useCurrentUser();
  const [darkMode, setDarkMode] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Form states initialized with current user details
  const [fullName, setFullName] = useState(userFullName);
  const [email, setEmail] = useState(userEmail);
  const [phone, setPhone] = useState(userPhone);

  const accountItems = [
    {
      id: 'personal',
      title: 'Personal Information',
      description: 'Update your name, email, and phone number',
      icon: <User className="h-4 w-4" />,
    },
    {
      id: 'security',
      title: 'Security',
      description: 'Password, two-factor authentication, and login history',
      icon: <Shield className="h-4 w-4" />,
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Choose push, email, and SMS alerts for deliveries',
      icon: <Bell className="h-4 w-4" />,
    },
    {
      id: 'payments',
      title: 'Payment Methods',
      description: 'Manage debit cards and linked bank accounts',
      icon: <CreditCard className="h-4 w-4" />,
    },
    {
      id: 'addresses',
      title: 'Saved Addresses',
      description: 'Default pickup and frequent delivery locations',
      icon: <MapPin className="h-4 w-4" />,
    },
  ];

  return (
    <AppLayout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Settings</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your account preferences, security settings, and notifications
          </p>
        </div>

        {/* Section 1: Account */}
        <div className="rounded-3xl border border-slate-100 bg-white shadow-xs overflow-hidden">
          <div className="border-b border-slate-100 px-6 py-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">Account</h2>
          </div>

          <div className="divide-y divide-slate-100">
            {accountItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveModal(item.id)}
                className="flex w-full items-center justify-between px-6 py-4.5 text-left transition-colors hover:bg-slate-50/70"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{item.title}</p>
                    <p className="text-xs text-slate-400">{item.description}</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Section 2: Preferences */}
        <div className="rounded-3xl border border-slate-100 bg-white shadow-xs overflow-hidden">
          <div className="border-b border-slate-100 px-6 py-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Preferences
            </h2>
          </div>

          <div className="divide-y divide-slate-100">
            <div className="flex items-center justify-between px-6 py-4.5">
              <div className="flex items-center gap-3.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <Globe className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Language</p>
                  <p className="text-xs text-slate-400">English (United Kingdom / Nigeria)</p>
                </div>
              </div>
              <span className="flex items-center gap-1 text-xs font-semibold text-slate-500">
                English <ChevronRight className="h-3.5 w-3.5" />
              </span>
            </div>

            <div className="flex items-center justify-between px-6 py-4.5">
              <div className="flex items-center gap-3.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <Moon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Dark Mode</p>
                  <p className="text-xs text-slate-400">Adjust the appearance of Centric</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDarkMode(!darkMode)}
                className={cn(
                  'flex h-6 w-11 items-center rounded-full p-0.5 transition-colors',
                  darkMode ? 'bg-[var(--primary)]' : 'bg-slate-300'
                )}
              >
                <span
                  className={cn(
                    'h-5 w-5 rounded-full bg-white shadow-sm transition-transform',
                    darkMode ? 'translate-x-5' : 'translate-x-0'
                  )}
                />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setActiveModal('notifications')}
              className="flex w-full items-center justify-between px-6 py-4.5 text-left hover:bg-slate-50/70"
            >
              <div className="flex items-center gap-3.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Email Preferences</p>
                  <p className="text-xs text-slate-400">Manage monthly digests and receipts</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Section 3: Support */}
        <div className="rounded-3xl border border-slate-100 bg-white shadow-xs overflow-hidden">
          <div className="border-b border-slate-100 px-6 py-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">Support</h2>
          </div>

          <div className="divide-y divide-slate-100">
            <button
              type="button"
              onClick={() => alert('Opening Centric Help Center knowledgebase...')}
              className="flex w-full items-center justify-between px-6 py-4.5 text-left hover:bg-slate-50/70"
            >
              <div className="flex items-center gap-3.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <HelpCircle className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Help Center</p>
                  <p className="text-xs text-slate-400">FAQs, terms of service, and safety tips</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </button>

            <button
              type="button"
              onClick={() => alert('Opening Live Support Chat...')}
              className="flex w-full items-center justify-between px-6 py-4.5 text-left hover:bg-slate-50/70"
            >
              <div className="flex items-center gap-3.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <Headphones className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Contact Support</p>
                  <p className="text-xs text-slate-400">Chat with a Centric representative 24/7</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Interactive Modal for Personal Info / Security */}
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
              onClick={() => setActiveModal(null)}
            />

            <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl z-10">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="absolute right-5 top-5 rounded-full p-1.5 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>

              <h3 className="text-xl font-bold text-slate-900 capitalize">
                {activeModal === 'personal' && 'Personal Information'}
                {activeModal === 'security' && 'Security & Password'}
                {activeModal === 'notifications' && 'Notification Settings'}
                {activeModal === 'payments' && 'Payment Methods'}
                {activeModal === 'addresses' && 'Saved Addresses'}
              </h3>

              <div className="mt-4 space-y-3">
                {activeModal === 'personal' && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="h-11 w-full rounded-xl border border-slate-200 px-3.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-11 w-full rounded-xl border border-slate-200 px-3.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="h-11 w-full rounded-xl border border-slate-200 px-3.5 text-sm"
                      />
                    </div>
                  </>
                )}

                {activeModal !== 'personal' && (
                  <p className="text-xs text-slate-500 py-4">
                    Your {activeModal} preferences are up to date and verified with Centric security.
                  </p>
                )}

                <div className="pt-3">
                  <Button
                    onClick={() => setActiveModal(null)}
                    className="h-11 w-full rounded-full text-sm font-semibold"
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
