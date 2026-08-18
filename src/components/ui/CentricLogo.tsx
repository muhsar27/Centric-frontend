import React from 'react';

interface CentricLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function CentricLogo({ className = '', size = 'md' }: CentricLogoProps) {
  const sizes = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10',
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className={`${sizes[size]} aspect-square relative flex items-center justify-center`}>
        {/* Outer green ring */}
        <div className="w-full h-full rounded-full bg-centric-green flex items-center justify-center p-1.5 shadow-sm">
          {/* Inner white circle with pin logo */}
          <div className="w-full h-full bg-white rounded-full flex items-center justify-center relative">
            <div className="w-2.5 h-2.5 rounded-full bg-centric-green"></div>
            <div className="absolute -top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-centric-green animate-ping"></div>
          </div>
        </div>
      </div>
      <span className="font-bold tracking-tight text-slate-900 text-xl font-sans">
        Centric
      </span>
    </div>
  );
}
