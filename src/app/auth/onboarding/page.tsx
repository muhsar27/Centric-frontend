'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppSelector } from '@/store/hooks';
import CentricLogo from '@/components/ui/CentricLogo';
import WelcomeScreen from '@/components/auth/WelcomeScreen';
import RoleSelector from '@/components/auth/RoleSelector';
import SignUpForm from '@/components/auth/SignUpForm';
import PhoneVerification from '@/components/auth/PhoneVerification';
import BasicInfoForm from '@/components/auth/BasicInfoForm';
import AddressForm from '@/components/auth/AddressForm';
import VehicleInfoForm from '@/components/auth/VehicleInfoForm';
import IdVerification from '@/components/auth/IdVerification';
import BackgroundCheck from '@/components/auth/BackgroundCheck';
import OnboardingSuccess from '@/components/auth/OnboardingSuccess';
import { Star, MapPin, Package, ShieldCheck, Truck, CheckCircle2 } from 'lucide-react';

export default function OnboardingPage() {
  const { step, role } = useAppSelector((state) => state.onboarding);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <WelcomeScreen key="welcome" />;
      case 2:
        return <RoleSelector key="role" />;
      case 3:
        return <SignUpForm key="signup" />;
      case 4:
        return <PhoneVerification key="phone" />;
      case 5:
        return <BasicInfoForm key="basic-info" />;
      case 6:
        return role === 'sender' ? (
          <AddressForm key="address" />
        ) : (
          <IdVerification key="id-traveler" />
        );
      case 7:
        return role === 'sender' ? (
          <IdVerification key="id-sender" />
        ) : (
          <VehicleInfoForm key="vehicle" />
        );
      case 8:
        return role === 'sender' ? (
          <OnboardingSuccess key="success-sender" />
        ) : (
          <BackgroundCheck key="background" />
        );
      case 9:
        return <OnboardingSuccess key="success-traveler" />;
      default:
        return <WelcomeScreen key="default" />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 flex flex-col lg:flex-row overflow-x-hidden font-sans">
      {/* LEFT COLUMN: Desktop Brand Hero & Feature Showcase (Visible on lg screens) */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-7/12 bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 p-12 text-white flex-col justify-between relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-centric-green/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Logo Header */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-centric-green flex items-center justify-center shadow-lg">
              <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-centric-green rounded-full"></div>
              </div>
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">Centric</span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/10 text-emerald-400 border border-emerald-500/30">
              Africa
            </span>
          </div>
        </div>

        {/* Hero Visual Banner Content */}
        <div className="relative z-10 my-auto py-8 max-w-xl">
          <motion.div
            key={role}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-6">
              <SparklesIcon className="w-4 h-4" />
              <span>
                {role === 'sender'
                  ? 'Peer-to-Peer Parcel Delivery'
                  : 'Earn Money While Traveling'}
              </span>
            </div>

            <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {role === 'sender' ? (
                <>
                  Send Packages <br />
                  <span className="text-centric-green">Faster & Cheaper</span> <br />
                  With Verified Travelers.
                </>
              ) : (
                <>
                  Earn Extra Income <br />
                  <span className="text-centric-green">On Routes</span> You Already Travel.
                </>
              )}
            </h1>

            <p className="text-slate-300 text-base mt-4 leading-relaxed">
              {role === 'sender'
                ? 'Centric connects businesses and individuals with trusted travelers already headed their way, cutting delivery costs and offering instant route tracking.'
                : 'Turn empty trunk space or backpacks into steady income by delivering parcels for community members heading in your direction.'}
            </p>

            {/* Interactive Desktop Showcase Cards */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="w-8 h-8 rounded-xl bg-centric-green/20 text-emerald-400 flex items-center justify-center mb-2">
                  <MapPin className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-white">Live Route Matching</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Automated GPS matching across African cities
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="w-8 h-8 rounded-xl bg-centric-green/20 text-emerald-400 flex items-center justify-center mb-2">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-white">100% Escrow Protection</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Payouts are released only after confirmed delivery
                </p>
              </div>
            </div>

            {/* Customer Testimonial Pill */}
            <div className="mt-8 p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-centric-green">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                    alt="Chinedu"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Chinedu U. — Traveler</p>
                  <p className="text-[11px] text-slate-300">
                    &quot;Earned ₦45,000 delivering packages from Ikeja to Yaba&quot;
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>4.9</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer Stats */}
        <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span>Trusted by 200,000+ active users across Africa</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-300 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-centric-green" /> Verified Identity
            </span>
            <span className="flex items-center gap-1 text-slate-300 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-centric-green" /> Instant Payouts
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Desktop Form Container / Mobile Responsive View */}
      <div className="flex-1 lg:w-1/2 xl:w-5/12 bg-white flex flex-col justify-center items-center p-4 sm:p-8 lg:p-12 min-h-screen">
        <div className="w-full max-w-lg mx-auto flex flex-col h-full justify-center">
          {/* Mobile-only Logo header */}
          <div className="lg:hidden mb-6 flex justify-center">
            <CentricLogo size="md" />
          </div>

          <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  );
}
