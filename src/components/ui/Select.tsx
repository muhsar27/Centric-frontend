'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, children, ...props }, ref) => {
    return (
      <label className="block">
        {label ? (
          <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.18em] text-slate-600">
            {label}
            {props.required ? <span className="text-orange-500"> *</span> : null}
          </span>
        ) : null}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              'h-12 w-full appearance-none rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-soft)] px-4 pr-10 text-sm text-slate-900 transition-colors focus:border-slate-300 focus:outline-none focus:ring-0',
              className
            )}
            {...props}
          >
            {children}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        </div>
      </label>
    );
  }
);

Select.displayName = 'Select';
