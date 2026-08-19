'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import CentricLogo from '@/components/ui/CentricLogo';
import { useForgotPasswordMutation } from '@/store/services/authApi';

export default function ForgotPasswordPage() {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      await forgotPassword({ email }).unwrap();
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 flex flex-col lg:flex-row overflow-x-hidden font-sans">
      {/* LEFT COLUMN: Desktop Brand Showcase */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-7/12 bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 p-12 text-white flex-col justify-between relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-centric-green/25 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-centric-green flex items-center justify-center shadow-lg">
              <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-centric-green rounded-full"></div>
              </div>
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">Centric</span>
          </div>
        </div>

        <div className="relative z-10 my-auto py-8 max-w-xl">
          <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Account Recovery <br />
            <span className="text-centric-green">Secure & Fast.</span>
          </h1>
          <p className="text-slate-300 text-base mt-4 leading-relaxed">
            We will help you reset your password and recover access to your Centric account securely.
          </p>
        </div>

        <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span>Centric Africa Logistics Platform</span>
        </div>
      </div>

      {/* RIGHT COLUMN: Password Recovery Form */}
      <div className="flex-1 lg:w-1/2 xl:w-5/12 bg-white flex flex-col justify-center items-center p-6 sm:p-12 min-h-screen">
        <div className="w-full max-w-md mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/auth/sign-in"
              className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="lg:hidden">
              <CentricLogo size="sm" />
            </div>
            <div className="w-9" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {!submitted ? (
              <>
                <div className="text-left mb-8">
                  <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    Reset password
                  </h1>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                    Enter your account email address and we will send you instructions to reset your password.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Email address
                    </label>
                    <input
                      type="email"
                      placeholder="tobiafolayan@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-centric-green focus:ring-1 focus:ring-centric-green transition-all"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 px-6 rounded-2xl bg-centric-green hover:bg-centric-green-dark text-white font-semibold text-base shadow-centric transition-all cursor-pointer disabled:opacity-50 mt-4"
                  >
                    {isLoading ? 'Sending...' : 'Send reset link'}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-centric-green flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Check your email</h2>
                <p className="text-sm text-slate-500 mt-2 max-w-xs mx-auto leading-relaxed">
                  We have sent password reset instructions to{' '}
                  <span className="font-semibold text-slate-700">{email}</span>.
                </p>
                <Link
                  href="/auth/sign-in"
                  className="block w-full py-3.5 px-6 rounded-2xl bg-centric-green hover:bg-centric-green-dark text-white font-semibold text-sm shadow-centric transition-all mt-8 text-center"
                >
                  Return to Sign In
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
