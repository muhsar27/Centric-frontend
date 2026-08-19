import type { Metadata } from 'next';
import { ReduxProvider } from '@/store/provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Centric - Peer-to-Peer Logistics Marketplace',
  description:
    'Centric connects verified travelers with package senders across African cities for fast, affordable, and safe deliveries.',
  keywords: [
    'Centric',
    'Logistics',
    'Peer-to-peer delivery',
    'African travel',
    'Send package',
    'Earn money traveling',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-white antialiased">
      <body className="min-h-full bg-white font-sans text-slate-900">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
