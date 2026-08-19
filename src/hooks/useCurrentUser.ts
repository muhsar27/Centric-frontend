'use client';

import { useAppSelector } from '@/store/hooks';
import { readAuthSession } from '@/lib/auth-storage';
import { UserRole, UserProfile } from '@/types/auth';

export function useCurrentUser() {
  const authUser = useAppSelector((state) => state.auth.user);
  const onboardingRole = useAppSelector((state) => state.onboarding.role);
  const onboardingSignUp = useAppSelector((state) => state.onboarding.signUp);

  // Read persisted session from localStorage if available
  const session = typeof window !== 'undefined' ? readAuthSession() : null;
  const persistedUser = session?.user;

  // Determine active user object
  const user: UserProfile | null =
    authUser ||
    persistedUser ||
    (onboardingSignUp.email
      ? {
          id: 'usr_session',
          fullName: onboardingSignUp.fullName || 'Centric User',
          email: onboardingSignUp.email,
          role: onboardingRole || 'sender',
          phoneNumber: onboardingSignUp.phone,
          isVerified: true,
        }
      : null);

  // Determine effective role strictly from the signed in/signed up user
  const role: UserRole = user?.role || onboardingRole || 'sender';

  // Determine user name
  const fullName =
    user?.fullName?.trim() ||
    onboardingSignUp.fullName?.trim() ||
    (role === 'sender' ? 'Tobi Fayemi' : 'Ridwan Kareem');

  const firstName = fullName.split(' ')[0] || (role === 'sender' ? 'Tobi' : 'Ridwan');

  // Determine user email
  const email =
    user?.email?.trim() ||
    onboardingSignUp.email?.trim() ||
    (role === 'sender' ? 'tobi@centric.com' : 'ridwan@centric.com');

  // Determine user phone
  const phone =
    user?.phoneNumber?.trim() ||
    onboardingSignUp.phone?.trim() ||
    '+234 812 345 6789';

  // Determine avatar
  const avatarUrl =
    user?.avatarUrl ||
    (role === 'sender'
      ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces'
      : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces');

  return {
    user,
    role,
    isSender: role === 'sender',
    isTraveler: role === 'traveler',
    fullName,
    firstName,
    email,
    phone,
    avatarUrl,
  };
}
