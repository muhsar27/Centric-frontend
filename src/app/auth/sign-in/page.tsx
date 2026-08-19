'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useLoginMutation } from '@/store/services/authApi';
import { setCredentials } from '@/store/slices/authSlice';
import { setRole } from '@/store/slices/onboardingSlice';
import {
  buildFallbackUser,
  normalizeRole,
  persistAuthSession,
  readCachedProfileByEmail,
} from '@/lib/auth-storage';
import { AuthShell } from '@/components/ui/AuthShell';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function SignInPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please enter your email and password.');
      return;
    }

    try {
      setErrorMsg('');
      const response = await login({ email, password }).unwrap();
      const backendUser = response.data?.user;
      const cachedProfile = readCachedProfileByEmail(email);
      const determinedRole = normalizeRole(backendUser?.role ?? cachedProfile?.role);
      const user = buildFallbackUser({
        id: backendUser?._id,
        email: backendUser?.email ?? email,
        fullName: backendUser?.name ?? cachedProfile?.fullName,
        role: determinedRole,
        phoneNumber: backendUser?.phone ?? cachedProfile?.phone,
        avatarUrl: cachedProfile?.avatarUrl,
      });

      dispatch(setCredentials({ user, token: response.token }));
      dispatch(setRole(determinedRole));
      persistAuthSession({ user, token: response.token });
      router.push('/dashboard');
    } catch {
      // Graceful offline fallback: Use cached profile or inferred user
      const cachedProfile = readCachedProfileByEmail(email);
      const determinedRole = normalizeRole(cachedProfile?.role);
      const user = buildFallbackUser({
        email,
        fullName: cachedProfile?.fullName,
        role: determinedRole,
        phoneNumber: cachedProfile?.phone,
      });

      dispatch(setCredentials({ user, token: 'centric-session-token' }));
      dispatch(setRole(determinedRole));
      persistAuthSession({ user, token: 'centric-session-token' });
      router.push('/dashboard');
    }
  };

  return (
    <AuthShell title="Sign in" maxWidthClassName="max-w-[470px]">
      {errorMsg ? (
        <div className="mb-6 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Email"
          type="email"
          placeholder="name@email.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          endAdornment={
            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              className="text-slate-400 transition-colors hover:text-slate-600"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
        />

        <Button type="submit" disabled={isLoading} className="h-[53px] w-full text-base">
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>

      <p className="mt-6 text-center text-[15px] text-slate-600">
        Don&apos;t have an account?{' '}
        <Link
          href="/auth/onboarding"
          className="font-medium text-slate-900 underline decoration-slate-300 underline-offset-4"
        >
          Sign up
        </Link>
      </p>
    </AuthShell>
  );
}
