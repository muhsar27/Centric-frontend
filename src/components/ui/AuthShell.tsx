'use client';

import React from 'react';
import CentricLogo from './CentricLogo';
import { cn } from '@/lib/cn';

type AuthShellProps = {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  maxWidthClassName?: string;
};

export function AuthShell({
  title,
  description,
  children,
  className,
  contentClassName,
  maxWidthClassName = 'max-w-[470px]',
}: AuthShellProps) {
  return (
    <div className={cn('min-h-screen bg-white text-slate-900', className)}>
      <div className="mx-auto flex min-h-screen w-full flex-col px-6 py-6 sm:px-8">
        <div className="flex items-start">
          <CentricLogo variant="badge" size="sm" />
        </div>

        <div className="flex flex-1 items-center justify-center py-10">
        <div className={cn('w-full', maxWidthClassName, contentClassName)}>
            {title ? (
              <div className="text-center">
                <h1 className="text-[2rem] font-semibold tracking-[-0.04em] text-slate-900 sm:text-[2.25rem]">
                  {title}
                </h1>
                {description ? (
                  <p className="mx-auto mt-3 max-w-[30rem] text-sm leading-6 text-slate-500">
                    {description}
                  </p>
                ) : null}
              </div>
            ) : null}
            <div className={cn(title ? 'mt-12' : 'mt-0')}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
