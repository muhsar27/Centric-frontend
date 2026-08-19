import { UserProfile, UserRole } from '@/types/auth';

const SESSION_KEY = 'centric:auth_session';
const PROFILE_CACHE_KEY = 'centric:auth_profiles';

type StoredSession = {
  user: UserProfile;
  token: string;
};

type CachedProfile = {
  email: string;
  fullName: string;
  role: UserRole;
  phone?: string;
  avatarUrl?: string;
};

function canUseStorage() {
  return typeof window !== 'undefined';
}

function readJson<T>(key: string): T | null {
  if (!canUseStorage()) return null;
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function removeKey(key: string) {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(key);
}

function readProfiles(): CachedProfile[] {
  return readJson<CachedProfile[]>(PROFILE_CACHE_KEY) ?? [];
}

function writeProfiles(profiles: CachedProfile[]) {
  writeJson(PROFILE_CACHE_KEY, profiles);
}

export function normalizeRole(role?: string | null): UserRole {
  return role?.toUpperCase() === 'TRAVELER' ? 'traveler' : 'sender';
}

export function persistAuthSession(session: StoredSession) {
  writeJson(SESSION_KEY, session);

  const profiles = readProfiles();
  const nextProfile: CachedProfile = {
    email: session.user.email,
    fullName: session.user.fullName,
    role: session.user.role,
    phone: session.user.phoneNumber,
    avatarUrl: session.user.avatarUrl,
  };

  const index = profiles.findIndex((profile) => profile.email === nextProfile.email);
  if (index >= 0) {
    profiles[index] = nextProfile;
  } else {
    profiles.unshift(nextProfile);
  }

  writeProfiles(profiles.slice(0, 10));
}

export function readAuthSession(): StoredSession | null {
  return readJson<StoredSession>(SESSION_KEY);
}

export function clearAuthSession() {
  removeKey(SESSION_KEY);
}

export function readCachedProfileByEmail(email: string): CachedProfile | null {
  const profiles = readProfiles();
  const normalizedEmail = email.trim().toLowerCase();
  return (
    profiles.find((profile) => profile.email.toLowerCase() === normalizedEmail) ??
    null
  );
}

export function buildFallbackUser(params: {
  email: string;
  role?: UserRole;
  fullName?: string;
  id?: string;
  phoneNumber?: string;
  avatarUrl?: string;
}): UserProfile {
  const { email, role = 'sender', fullName, id, phoneNumber, avatarUrl } = params;
  const nameFromEmail = email.split('@')[0].replace(/[._-]+/g, ' ');

  return {
    id: id ?? `usr_${Date.now()}`,
    fullName: fullName || nameFromEmail || 'Centric User',
    email,
    role,
    phoneNumber,
    avatarUrl,
    isVerified: false,
  };
}
