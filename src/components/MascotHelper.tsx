import React from 'react';
import { ResilientImage } from './Illustrations';

interface MascotHelperProps {
  message: string;
  mood?: 'happy' | 'cheer' | 'encourage';
}

export const MascotHelper: React.FC<MascotHelperProps> = ({ message, mood = 'happy' }) => {
  const bgTone =
    mood === 'cheer'
      ? 'bg-emerald-50 border-emerald-200'
      : mood === 'encourage'
      ? 'bg-amber-50 border-amber-200'
      : 'bg-sky-50 border-sky-200';

  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-2xl border ${bgTone} transition-colors duration-200`}
      role="status"
      aria-live="polite"
    >
      <div
        className={`w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl overflow-hidden border border-white shadow-sm bg-white ${
          mood === 'cheer' ? 'animate-mascot-cheer' : ''
        }`}
      >
        <ResilientImage
          src="/src/assets/images/mascot_bima_ceria_1794552842150.jpg"
          alt="Bima Si Petualang Timbangan"
          fallbackTitle="Bima"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-bold text-sky-800 mb-0.5">Bima · Teman Belajarmu</p>
        <p className="text-base sm:text-lg font-semibold text-slate-900 leading-snug">{message}</p>
      </div>
    </div>
  );
};
