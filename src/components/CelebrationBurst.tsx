import React from 'react';
import { Star } from 'lucide-react';

interface CelebrationBurstProps {
  active: boolean;
}

export const CelebrationBurst: React.FC<CelebrationBurstProps> = ({ active }) => {
  if (!active) return null;

  return (
    <div
      className="pointer-events-none relative flex items-center justify-center h-0 overflow-visible"
      aria-hidden="true"
    >
      <div className="absolute -top-6 left-1/4 animate-float-confetti text-amber-400">
        <Star className="w-6 h-6 fill-amber-400" />
      </div>
      <div
        className="absolute -top-8 left-1/2 animate-float-confetti text-emerald-500"
        style={{ animationDelay: '70ms' }}
      >
        <Star className="w-7 h-7 fill-emerald-400" />
      </div>
      <div
        className="absolute -top-6 right-1/4 animate-float-confetti text-sky-500"
        style={{ animationDelay: '130ms' }}
      >
        <Star className="w-6 h-6 fill-sky-400" />
      </div>
    </div>
  );
};
