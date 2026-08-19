'use client';

import React, { useState } from 'react';
import { MapPin, Navigation, Navigation2, Compass, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface MapMarker {
  id: string;
  lat?: number;
  lng?: number;
  xPercent: number; // 0 to 100
  yPercent: number; // 0 to 100
  title: string;
  subtitle?: string;
  type: 'pickup' | 'dropoff' | 'courier' | 'poi';
  price?: string;
  badge?: string;
}

interface CentricMapProps {
  className?: string;
  markers?: MapMarker[];
  showRoute?: boolean;
  interactive?: boolean;
  onSelectLocation?: (location: { title: string; address: string; x: number; y: number }) => void;
  courierProgress?: number; // 0 (pickup) to 100 (dropoff)
  heightClassName?: string;
}

export default function CentricMap({
  className,
  markers = [],
  showRoute = true,
  interactive = false,
  onSelectLocation,
  courierProgress = 45,
  heightClassName = 'h-[360px] md:h-[480px]',
}: CentricMapProps) {
  const [selectedPoint, setSelectedPoint] = useState<{ x: number; y: number } | null>(null);

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSelectedPoint({ x, y });

    // Mock neighborhood resolution based on coordinates in Lagos
    let title = 'Ikeja City Mall';
    let address = 'Alausa, Ikeja, Lagos';
    if (y > 60 && x > 50) {
      title = 'Yaba Tech Hub';
      address = 'Herbert Macaulay Way, Yaba, Lagos';
    } else if (y > 40 && x < 45) {
      title = 'Maryland Mall';
      address = 'Ikorodu Rd, Maryland, Lagos';
    } else if (y > 70) {
      title = 'Surulere';
      address = 'Adeniran Ogunsanya St, Surulere, Lagos';
    }

    if (onSelectLocation) {
      onSelectLocation({ title, address, x, y });
    }
  };

  // Pickup marker (Ikeja) is roughly at (36%, 32%)
  // Dropoff marker (Yaba) is roughly at (68%, 76%)
  const pickupX = 36;
  const pickupY = 32;
  const dropoffX = 68;
  const dropoffY = 76;

  // Courier coordinates along the path
  const courierX = pickupX + (dropoffX - pickupX) * (courierProgress / 100);
  const courierY = pickupY + (dropoffY - pickupY) * (courierProgress / 100);

  return (
    <div
      onClick={handleMapClick}
      className={cn(
        'relative w-full overflow-hidden rounded-3xl border border-slate-200/80 bg-[#f4f7f6] select-none transition-all shadow-[0_1px_3px_rgba(0,0,0,0.03)]',
        heightClassName,
        interactive && 'cursor-crosshair',
        className
      )}
    >
      {/* Background Map Graphic Styling (Lagos layout) */}
      <svg
        className="absolute inset-0 h-full w-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 600"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e8edf0" strokeWidth="1" />
          </pattern>
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2ea46e" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>

        {/* Base Grid */}
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Lagoon / Waterbody representation */}
        <path
          d="M 680,0 Q 640,180 720,320 T 780,600 L 800,600 L 800,0 Z"
          fill="#dceaf7"
          opacity="0.8"
        />
        <path
          d="M 520,380 C 580,440 640,490 750,520 L 780,600 L 480,600 Z"
          fill="#dceaf7"
          opacity="0.6"
        />

        {/* Major Road Arteries in Lagos (Ikorodu Rd, Third Mainland, Agege Motor Rd) */}
        {/* Road 1: Expressway */}
        <path
          d="M 120,0 C 180,140 280,240 380,310 S 620,440 760,560"
          fill="none"
          stroke="#ffffff"
          strokeWidth="16"
          strokeLinecap="round"
        />
        <path
          d="M 120,0 C 180,140 280,240 380,310 S 620,440 760,560"
          fill="none"
          stroke="#d1d9e0"
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* Road 2: Cross Arteries */}
        <path
          d="M 0,220 C 180,210 360,250 560,240 S 750,260 800,280"
          fill="none"
          stroke="#ffffff"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M 0,220 C 180,210 360,250 560,240 S 750,260 800,280"
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Road 3: North-South */}
        <path
          d="M 300,0 C 310,180 340,320 330,600"
          fill="none"
          stroke="#ffffff"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M 300,0 C 310,180 340,320 330,600"
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Road 4: Yaba to Ikeja connector */}
        <path
          d="M 280,180 Q 420,240 540,460"
          fill="none"
          stroke="#ffffff"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M 280,180 Q 420,240 540,460"
          fill="none"
          stroke="#d8e1e8"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Parks / Green Zones */}
        <rect x="220" y="80" width="80" height="60" rx="14" fill="#e2f5ea" opacity="0.85" />
        <rect x="420" y="340" width="100" height="70" rx="18" fill="#e2f5ea" opacity="0.85" />
        <rect x="140" y="380" width="90" height="90" rx="20" fill="#e2f5ea" opacity="0.85" />

        {/* Route Polyline connecting Pickup (Ikeja) to Dropoff (Yaba) */}
        {showRoute && (
          <>
            {/* Route Glow */}
            <path
              d="M 288,192 C 340,240 400,290 460,360 S 510,410 544,456"
              fill="none"
              stroke="#2ea46e"
              strokeWidth="8"
              strokeOpacity="0.25"
              strokeLinecap="round"
            />
            {/* Active Route Line with dash */}
            <path
              d="M 288,192 C 340,240 400,290 460,360 S 510,410 544,456"
              fill="none"
              stroke="#2ea46e"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeDasharray="8 6"
              className="animate-[dash_1.5s_linear_infinite]"
            />
          </>
        )}
      </svg>

      {/* Map Labels for Lagos Area */}
      <div className="absolute left-6 top-6 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur-sm">
          <Compass className="h-3.5 w-3.5 text-[var(--primary)]" />
          Lagos Metro Network
        </span>
      </div>

      {/* Neighborhood Watermarks */}
      <div className="absolute top-[26%] left-[28%] pointer-events-none text-[11px] font-bold tracking-wider uppercase text-slate-400/80">
        Ikeja
      </div>
      <div className="absolute top-[38%] left-[48%] pointer-events-none text-[11px] font-bold tracking-wider uppercase text-slate-400/80">
        Maryland
      </div>
      <div className="absolute top-[70%] left-[64%] pointer-events-none text-[11px] font-bold tracking-wider uppercase text-slate-400/80">
        Yaba
      </div>
      <div className="absolute top-[78%] left-[24%] pointer-events-none text-[11px] font-bold tracking-wider uppercase text-slate-400/80">
        Surulere
      </div>

      {/* Custom Markers rendered via props */}
      {markers.length > 0
        ? markers.map((m) => (
            <div
              key={m.id}
              style={{ left: `${m.xPercent}%`, top: `${m.yPercent}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-110 z-10"
            >
              {m.type === 'pickup' && (
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)] text-white shadow-lg ring-4 ring-[var(--primary)]/20 animate-bounce">
                    <MapPin className="h-5 w-5" />
                  </div>
                  {m.title && (
                    <div className="mt-1.5 whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1 text-xs font-medium text-white shadow-md">
                      {m.title}
                    </div>
                  )}
                </div>
              )}

              {m.type === 'dropoff' && (
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-700 text-white shadow-lg ring-4 ring-emerald-700/20">
                    <MapPin className="h-5 w-5" />
                  </div>
                  {m.title && (
                    <div className="mt-1.5 whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1 text-xs font-medium text-white shadow-md">
                      {m.title}
                    </div>
                  )}
                </div>
              )}

              {m.type === 'courier' && (
                <div className="relative flex items-center justify-center">
                  <div className="absolute h-12 w-12 rounded-full bg-[var(--primary)]/20 animate-ping" />
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary)] text-white shadow-lg ring-2 ring-white">
                    <Navigation2 className="h-4 w-4 fill-white rotate-45" />
                  </div>
                </div>
              )}

              {m.type === 'poi' && (
                <div className="group flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-800 shadow-md border border-slate-200">
                    <span className="h-2.5 w-2.5 rounded-full bg-[var(--primary)]" />
                  </div>
                  {m.price && (
                    <div className="mt-1 rounded-md bg-white px-2 py-0.5 text-[11px] font-bold text-slate-900 shadow border border-slate-100">
                      {m.price}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        : showRoute && (
            <>
              {/* Default Pickup Marker (Ikeja) */}
              <div
                style={{ left: `${pickupX}%`, top: `${pickupY}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary)] text-white shadow-lg ring-4 ring-[var(--primary)]/20">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="mt-1.5 whitespace-nowrap rounded-lg bg-slate-900/90 px-2.5 py-0.5 text-[11px] font-medium text-white shadow-sm backdrop-blur-sm">
                  Pickup: Ikeja City Mall
                </div>
              </div>

              {/* Default Dropoff Marker (Yaba) */}
              <div
                style={{ left: `${dropoffX}%`, top: `${dropoffY}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg ring-4 ring-slate-900/20">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="mt-1.5 whitespace-nowrap rounded-lg bg-slate-900/90 px-2.5 py-0.5 text-[11px] font-medium text-white shadow-sm backdrop-blur-sm">
                  Drop-off: Yaba Tech Hub
                </div>
              </div>

              {/* Courier Marker moving on route */}
              <div
                style={{ left: `${courierX}%`, top: `${courierY}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-700 ease-out"
              >
                <div className="relative flex items-center justify-center">
                  <div className="absolute h-11 w-11 rounded-full bg-[var(--primary)]/30 animate-ping" />
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary)] text-white shadow-md border-2 border-white">
                    <Navigation2 className="h-4 w-4 fill-current rotate-45" />
                  </div>
                </div>
              </div>
            </>
          )}

      {/* Selected location indicator when clicked */}
      {interactive && selectedPoint && (
        <div
          style={{ left: `${selectedPoint.x}%`, top: `${selectedPoint.y}%` }}
          className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xl ring-4 ring-emerald-600/30 animate-bounce">
            <MapPin className="h-5 w-5" />
          </div>
        </div>
      )}

      {/* Map Bottom Legend / Controls */}
      <div className="absolute right-4 bottom-4 flex items-center gap-2 z-10">
        <div className="flex items-center gap-1 rounded-xl bg-white/90 px-3 py-1.5 text-[12px] font-medium text-slate-700 shadow-sm backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-[var(--primary)]" />
          Live GPS Route
        </div>
      </div>
    </div>
  );
}
