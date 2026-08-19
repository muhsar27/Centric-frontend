'use client';

import React from 'react';
import { Star, ShieldCheck, Edit3 } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { Button } from '@/components/ui/Button';

export default function ProfilePage() {
  const { role, isSender, fullName, email, avatarUrl } = useCurrentUser();

  const profileData = isSender
    ? {
        name: fullName,
        roleName: 'Sender',
        avatar: avatarUrl,
        about: 'I send packages across Lagos. I value safe and reliable deliveries.',
        memberSince: 'Apr 2025',
        stats: {
          total: 18,
          successful: 17,
          cancelled: 1,
        },
        rating: 4.8,
        reviewsCount: 17,
        ratingBars: [
          { star: 5, count: 14, percent: 82 },
          { star: 4, count: 2, percent: 12 },
          { star: 3, count: 1, percent: 6 },
          { star: 2, count: 0, percent: 0 },
          { star: 1, count: 0, percent: 0 },
        ],
        recentReviews: [
          {
            name: 'Ridwan K.',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces',
            rating: 5,
            date: 'May 12, 2025',
            comment: 'Great sender! Clear instructions and quick response.',
          },
          {
            name: 'David N.',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces',
            rating: 5,
            date: 'May 10, 2025',
            comment: 'Smooth transaction and easy pickup.',
          },
        ],
      }
    : {
        name: fullName,
        roleName: 'Traveler',
        avatar: avatarUrl,
        about: 'Daily commuter between Ikeja and Yaba. Passionate about timely package delivery.',
        memberSince: 'Apr 2025',
        stats: {
          total: 156,
          successful: 149,
          cancelled: 7,
        },
        rating: 4.9,
        reviewsCount: 230,
        ratingBars: [
          { star: 5, count: 198, percent: 86 },
          { star: 4, count: 24, percent: 10 },
          { star: 3, count: 6, percent: 3 },
          { star: 2, count: 1, percent: 0.5 },
          { star: 1, count: 1, percent: 0.5 },
        ],
        recentReviews: [
          {
            name: 'Tobi A.',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces',
            rating: 5,
            date: 'May 12, 2025',
            comment: 'Excellent service. Very reliable and quick.',
          },
          {
            name: 'James E.',
            avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop&crop=faces',
            rating: 5,
            date: 'May 10, 2025',
            comment: 'On time and very professional.',
          },
        ],
      };

  return (
    <AppLayout>
      <div className="space-y-6 max-w-4xl">
        {/* Profile Card Header */}
        <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-slate-100 shadow-sm">
              <img
                src={profileData.avatar}
                alt={profileData.name}
                className="h-full w-full object-cover"
              />
              <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-[var(--primary)]" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900">{profileData.name}</h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-[var(--primary)] border border-emerald-200">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Verified
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-400 capitalize">
                {profileData.roleName} • {email}
              </p>
            </div>
          </div>

          <Button
            variant="secondary"
            onClick={() => alert('Edit profile modal')}
            className="h-11 px-5 rounded-full text-xs font-semibold gap-2"
          >
            <Edit3 className="h-4 w-4" />
            Edit Profile
          </Button>
        </div>

        {/* Bio & Details */}
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">About me</h3>
          <p className="text-sm text-slate-700 font-medium">{profileData.about}</p>

          {/* Stats Grid */}
          <div className="border-t border-slate-100 pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="rounded-2xl bg-slate-50/80 p-3.5 border border-slate-100">
              <p className="text-xs font-semibold text-slate-400">Deliveries</p>
              <p className="text-xl font-bold text-slate-900">{profileData.stats.total}</p>
            </div>
            <div className="rounded-2xl bg-emerald-50/60 p-3.5 border border-emerald-100">
              <p className="text-xs font-semibold text-emerald-800">
                {isSender ? 'Successful' : 'Completed'}
              </p>
              <p className="text-xl font-bold text-[var(--primary)]">
                {profileData.stats.successful}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50/80 p-3.5 border border-slate-100">
              <p className="text-xs font-semibold text-slate-400">Cancelled</p>
              <p className="text-xl font-bold text-slate-900">{profileData.stats.cancelled}</p>
            </div>
            <div className="rounded-2xl bg-slate-50/80 p-3.5 border border-slate-100">
              <p className="text-xs font-semibold text-slate-400">Member since</p>
              <p className="text-base font-bold text-slate-900 mt-1">{profileData.memberSince}</p>
            </div>
          </div>
        </div>

        {/* Ratings & Breakdown */}
        <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Ratings & Reviews</h3>
              <p className="text-xs text-slate-400">Feedback from peer community members</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-3xl font-bold text-slate-900">{profileData.rating}</div>
              <div>
                <div className="flex text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-0.5">({profileData.reviewsCount} reviews)</p>
              </div>
            </div>
          </div>

          {/* Progress Bars for Stars */}
          <div className="space-y-2 max-w-md">
            {profileData.ratingBars.map((bar) => (
              <div key={bar.star} className="flex items-center gap-3 text-xs">
                <span className="w-3 font-semibold text-slate-600">{bar.star}★</span>
                <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[var(--primary)] transition-all duration-500"
                    style={{ width: `${bar.percent}%` }}
                  />
                </div>
                <span className="w-6 text-right font-medium text-slate-400">{bar.count}</span>
              </div>
            ))}
          </div>

          {/* Recent Reviews List */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900">Recent Reviews</h4>
              <button type="button" className="text-xs font-bold text-[var(--primary)] hover:underline">
                View all
              </button>
            </div>

            <div className="space-y-3">
              {profileData.recentReviews.map((review, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="h-7 w-7 rounded-full object-cover"
                      />
                      <span className="text-xs font-bold text-slate-900">{review.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex text-amber-400">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-[11px] text-slate-400">{review.date}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 font-medium pl-9">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
