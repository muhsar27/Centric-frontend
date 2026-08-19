'use client';

import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { store } from './store';
import { hydrateAuth } from './slices/authSlice';
import { setRole } from './slices/onboardingSlice';
import { readAuthSession } from '@/lib/auth-storage';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const session = readAuthSession();
    if (session) {
      store.dispatch(hydrateAuth(session));
      if (session.user?.role) {
        store.dispatch(setRole(session.user.role));
      }
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
