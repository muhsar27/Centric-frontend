import React from 'react';
import { cn } from '@/lib/cn';

interface CentricLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'badge' | 'wordmark';
}

export default function CentricLogo({
  className = '',
  size = 'md',
  variant = 'badge',
}: CentricLogoProps) {
  const sizeMap = {
    sm: variant === 'badge' ? 'px-3 py-1.5 text-sm' : 'text-2xl',
    md: variant === 'badge' ? 'px-4 py-2 text-sm' : 'text-[2rem]',
    lg: variant === 'badge' ? 'px-4.5 py-2 text-base' : 'text-[2.25rem]',
  };

  if (variant === 'wordmark') {
    return (
      <div
        className={cn(
          'inline-flex items-center text-slate-900 font-semibold tracking-[-0.04em] leading-none',
          sizeMap[size],
          className
        )}
      >
        centric
      </div>
    );
  }

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 font-semibold tracking-[-0.03em] shadow-[0_1px_0_rgba(15,23,42,0.02)]',
        sizeMap[size],
        className
      )}
    >
      centric
    </div>
  );
}
