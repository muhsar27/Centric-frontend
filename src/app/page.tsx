'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { readAuthSession } from '@/lib/auth-storage';

export default function Home() {
  const router = useRouter();
  const authUser = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const session = readAuthSession();
    if (authUser || session) {
      router.replace('/dashboard');
      return;
    }

    router.replace('/auth/sign-in');
  }, [authUser, router]);

  return null;
}
