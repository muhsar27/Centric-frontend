'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home,
  Package,
  PlusCircle,
  MessageSquare,
  Wallet,
  Settings,
  TrendingUp,
  Compass,
  User,
  LogOut,
  Menu,
  X,
  Star,
} from 'lucide-react';
import CentricLogo from '@/components/ui/CentricLogo';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useAppDispatch } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import { clearAuthSession } from '@/lib/auth-storage';
import { cn } from '@/lib/cn';
import { UserRole } from '@/types/auth';

interface AppLayoutProps {
  children: React.ReactNode;
  activeRoleOverride?: UserRole;
}

export default function AppLayout({ children, activeRoleOverride }: AppLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    role: detectedRole,
    fullName,
    email,
    avatarUrl,
  } = useCurrentUser();

  const role: UserRole = activeRoleOverride || detectedRole;
  const isSender = role === 'sender';

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [travelerOnline, setTravelerOnline] = useState(true);

  const handleLogout = () => {
    clearAuthSession();
    dispatch(logout());
    router.push('/auth/sign-in');
  };

  const senderNavItems = [
    { label: 'Dashboard', href: '/dashboard', icon: <Home className="h-4 w-4" /> },
    { label: 'Create Delivery', href: '/create-delivery', icon: <PlusCircle className="h-4 w-4" /> },
    { label: 'My Deliveries', href: '/deliveries', icon: <Package className="h-4 w-4" /> },
    { label: 'Messages', href: '/messages', icon: <MessageSquare className="h-4 w-4" />, badge: '1' },
    { label: 'Wallet', href: '/wallet', icon: <Wallet className="h-4 w-4" /> },
    { label: 'Settings', href: '/settings', icon: <Settings className="h-4 w-4" /> },
    { label: 'Profile & Ratings', href: '/profile', icon: <User className="h-4 w-4" /> },
  ];

  const travelerNavItems = [
    { label: 'Dashboard', href: '/dashboard', icon: <Home className="h-4 w-4" /> },
    { label: 'Available Deliveries', href: '/available-deliveries', icon: <Compass className="h-4 w-4" /> },
    { label: 'My Deliveries', href: '/deliveries', icon: <Package className="h-4 w-4" /> },
    { label: 'Messages', href: '/messages', icon: <MessageSquare className="h-4 w-4" />, badge: '1' },
    { label: 'Earnings', href: '/earnings', icon: <TrendingUp className="h-4 w-4" /> },
    { label: 'Wallet', href: '/wallet', icon: <Wallet className="h-4 w-4" /> },
    { label: 'Profile & Ratings', href: '/profile', icon: <Star className="h-4 w-4" /> },
    { label: 'Settings', href: '/settings', icon: <Settings className="h-4 w-4" /> },
  ];

  const navItems = isSender ? senderNavItems : travelerNavItems;

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between p-5">
      <div>
        {/* Top Centric Branding */}
        <div className="px-1">
          <Link href="/dashboard" className="transition-opacity hover:opacity-80">
            <CentricLogo variant="wordmark" size="lg" />
          </Link>
        </div>

        {/* Navigation links */}
        <nav className="mt-8 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all',
                  isActive
                    ? 'bg-emerald-50 text-[var(--primary)] font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                )}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-lg transition-colors',
                      isActive ? 'bg-white text-[var(--primary)] shadow-xs' : 'text-slate-400 group-hover:text-slate-700'
                    )}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </span>

                {item.badge ? (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--primary)] text-[11px] font-bold text-white shadow-xs">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Area: Online toggle (for traveler), User info, Logout */}
      <div className="space-y-4 pt-6 border-t border-slate-100">
        {!isSender && (
          <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
            <span className="text-xs font-semibold text-slate-700">Online Status</span>
            <button
              type="button"
              onClick={() => setTravelerOnline(!travelerOnline)}
              className={cn(
                'flex h-6 w-11 items-center rounded-full p-0.5 transition-colors',
                travelerOnline ? 'bg-[var(--primary)]' : 'bg-slate-300'
              )}
            >
              <span
                className={cn(
                  'h-5 w-5 rounded-full bg-white shadow-xs transition-transform',
                  travelerOnline ? 'translate-x-5' : 'translate-x-0'
                )}
              />
            </button>
          </div>
        )}

        <Link
          href="/profile"
          className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-slate-50"
        >
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-slate-200">
            <img src={avatarUrl} alt={fullName} className="h-full w-full object-cover" />
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border border-white bg-[var(--primary)]" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-900">{fullName}</p>
            <p className="truncate text-xs text-slate-500 capitalize">{role} • {email}</p>
          </div>
        </Link>

        <div className="flex items-center justify-between gap-2 px-1">
          <Link
            href="/settings"
            className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900"
          >
            <Settings className="h-3.5 w-3.5" />
            Settings
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs font-medium text-red-600 hover:text-red-700"
          >
            <LogOut className="h-3.5 w-3.5" />
            Log out
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Mobile Top Navigation */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:hidden">
        <CentricLogo variant="wordmark" size="md" />
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] bg-white shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Main Layout Grid */}
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[260px_1fr]">
        {/* Desktop Fixed Sidebar */}
        <aside className="hidden border-r border-slate-200 bg-white lg:block">
          <div className="sticky top-0 h-screen overflow-y-auto">{sidebarContent}</div>
        </aside>

        {/* Main Content Area */}
        <main className="min-h-screen px-4 py-6 sm:px-8 lg:px-10 max-w-[1360px] mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
