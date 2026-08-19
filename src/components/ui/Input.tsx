"use client";

import React from "react";
import { cn } from "@/lib/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, label, helperText, endAdornment, startAdornment, ...props },
    ref,
  ) => {
    return (
      <label className="block">
        {label ? (
          <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.18em] text-slate-600">
            {label}
            {props.required ? (
              <span className="text-orange-500"> *</span>
            ) : null}
          </span>
        ) : null}
        <div className="relative">
          {startAdornment ? (
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
              {startAdornment}
            </span>
          ) : null}
          <input
            ref={ref}
            className={cn(
              "h-12 w-full rounded-xl border border-[var(--border-subtle)]  px-4 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-slate-300 focus:outline-none focus:ring-0",
              startAdornment ? "pl-11" : "",
              endAdornment ? "pr-11" : "",
              className,
            )}
            {...props}
          />
          {endAdornment ? (
            <span className="absolute inset-y-0 right-4 flex items-center text-slate-400">
              {endAdornment}
            </span>
          ) : null}
        </div>
        {helperText ? (
          <span className="mt-2 block text-xs text-slate-500">
            {helperText}
          </span>
        ) : null}
      </label>
    );
  },
);

Input.displayName = "Input";
