import React, { useState } from 'react';
import { Scale } from 'lucide-react';
import { ItemKey, ScaleType } from '../types';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle = 'Ilustrasi Petualangan',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-sky-100 via-amber-50 to-emerald-100 text-sky-800 p-6 text-center ${className}`}
      >
        <Scale className="w-12 h-12 mb-2 text-sky-600" />
        <span className="font-display font-bold text-base">{fallbackTitle}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};

interface ItemIllustrationProps {
  item: ItemKey;
  className?: string;
}

export const ItemIllustration: React.FC<ItemIllustrationProps> = ({ item, className = 'w-20 h-20' }) => {
  switch (item) {
    case 'beras':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-label="Karung Beras">
          <path d="M35 30 C35 20, 85 20, 85 30 L96 92 C98 104, 22 104, 24 92 Z" fill="#FDE68A" stroke="#B45309" strokeWidth="4" strokeLinejoin="round" />
          <path d="M40 30 Q60 38 80 30" fill="none" stroke="#B45309" strokeWidth="4" strokeLinecap="round" />
          <path d="M46 18 L52 29 M60 16 L60 29 M74 18 L68 29" stroke="#D97706" strokeWidth="4" strokeLinecap="round" />
          <rect x="38" y="48" width="44" height="28" rx="6" fill="#FFFFFF" stroke="#D97706" strokeWidth="2.5" />
          <text x="60" y="67" textAnchor="middle" fill="#92400E" fontSize="13" fontWeight="800" fontFamily="Outfit, sans-serif">
            BERAS
          </text>
          <circle cx="48" cy="88" r="3" fill="#FFFBEB" />
          <circle cx="60" cy="86" r="3" fill="#FFFBEB" />
          <circle cx="72" cy="89" r="3" fill="#FFFBEB" />
        </svg>
      );
    case 'gula':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-label="Bungkus Gula">
          <rect x="28" y="24" width="64" height="76" rx="12" fill="#E0F2FE" stroke="#0284C7" strokeWidth="4" />
          <path d="M28 42 H92" stroke="#0284C7" strokeWidth="3" />
          <rect x="38" y="52" width="44" height="26" rx="6" fill="#FFFFFF" stroke="#0369A1" strokeWidth="2.5" />
          <text x="60" y="70" textAnchor="middle" fill="#0369A1" fontSize="13" fontWeight="800" fontFamily="Outfit, sans-serif">
            GULA
          </text>
          <path d="M44 24 L48 16 H72 L76 24" fill="#BAE6FD" stroke="#0284C7" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="45" cy="88" r="2.5" fill="#0284C7" />
          <circle cx="60" cy="88" r="2.5" fill="#0284C7" />
          <circle cx="75" cy="88" r="2.5" fill="#0284C7" />
        </svg>
      );
    case 'apel':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-label="Buah Apel">
          <path d="M60 32 C60 22, 65 16, 70 14" fill="none" stroke="#78350F" strokeWidth="5" strokeLinecap="round" />
          <path d="M62 24 C74 14, 90 18, 86 30 C78 36, 66 32, 62 24 Z" fill="#22C55E" stroke="#15803D" strokeWidth="3" />
          <path
            d="M60 36 C44 26, 22 36, 24 64 C26 90, 44 102, 56 98 C59 97, 61 97, 64 98 C76 102, 94 90, 96 64 C98 36, 76 26, 60 36 Z"
            fill="#EF4444"
            stroke="#991B1B"
            strokeWidth="4"
          />
          <ellipse cx="42" cy="52" rx="6" ry="12" transform="rotate(-18 42 52)" fill="#FCA5A5" opacity="0.65" />
        </svg>
      );
    case 'semangka':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-label="Semangka">
          <circle cx="60" cy="62" r="40" fill="#22C55E" stroke="#14532D" strokeWidth="4" />
          <path d="M40 27 Q52 62 40 97" fill="none" stroke="#15803D" strokeWidth="6" strokeLinecap="round" />
          <path d="M60 22 Q68 62 60 102" fill="none" stroke="#15803D" strokeWidth="6" strokeLinecap="round" />
          <path d="M80 27 Q88 62 80 97" fill="none" stroke="#15803D" strokeWidth="6" strokeLinecap="round" />
          <path d="M58 22 C58 14, 68 12, 72 16" fill="none" stroke="#14532D" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="42" cy="44" rx="6" ry="10" transform="rotate(-25 42 44)" fill="#86EFAC" opacity="0.6" />
        </svg>
      );
    case 'tepung':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-label="Tepung Terigu">
          <rect x="30" y="26" width="60" height="74" rx="10" fill="#FFF7ED" stroke="#EA580C" strokeWidth="4" />
          <path d="M30 44 H90" stroke="#FDBA74" strokeWidth="4" />
          <rect x="38" y="52" width="44" height="28" rx="6" fill="#FFEDD5" stroke="#EA580C" strokeWidth="2.5" />
          <text x="60" y="70" textAnchor="middle" fill="#9A3412" fontSize="11.5" fontWeight="800" fontFamily="Outfit, sans-serif">
            TEPUNG
          </text>
          <path d="M44 26 L48 16 H72 L76 26" fill="#FED7AA" stroke="#EA580C" strokeWidth="3" />
        </svg>
      );
    case 'buku':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-label="Buku Pelajaran">
          <rect x="26" y="22" width="68" height="78" rx="8" fill="#0284C7" stroke="#075985" strokeWidth="4" />
          <rect x="26" y="22" width="14" height="78" rx="4" fill="#0369A1" stroke="#075985" strokeWidth="3" />
          <rect x="46" y="34" width="38" height="24" rx="5" fill="#FFFFFF" />
          <line x1="52" y1="43" x2="78" y2="43" stroke="#0284C7" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="52" y1="51" x2="72" y2="51" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
          <path d="M68 100 V110 L75 105 L82 110 V100" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
        </svg>
      );
    case 'cokelat':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-label="Sebatang Cokelat">
          <rect x="24" y="34" width="72" height="52" rx="8" fill="#78350F" stroke="#451A03" strokeWidth="4" />
          <rect x="30" y="40" width="26" height="16" rx="3" fill="#92400E" />
          <rect x="64" y="40" width="26" height="16" rx="3" fill="#92400E" />
          <rect x="30" y="62" width="26" height="16" rx="3" fill="#92400E" />
          <rect x="64" y="62" width="26" height="16" rx="3" fill="#92400E" />
          <path d="M56 32 L98 32 L98 88 L66 88 L56 60 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="3" />
          <rect x="66" y="48" width="24" height="22" rx="4" fill="#FDE047" />
        </svg>
      );
    case 'jeruk':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-label="Buah Jeruk">
          <circle cx="60" cy="64" r="34" fill="#FB923C" stroke="#C2410C" strokeWidth="4" />
          <path d="M60 30 C62 20, 74 16, 82 22 C76 32, 66 32, 60 30 Z" fill="#22C55E" stroke="#15803D" strokeWidth="3" />
          <circle cx="46" cy="52" r="4" fill="#FED7AA" opacity="0.7" />
          <circle cx="72" cy="72" r="2" fill="#C2410C" opacity="0.5" />
          <circle cx="65" cy="80" r="2" fill="#C2410C" opacity="0.5" />
          <circle cx="78" cy="62" r="2" fill="#C2410C" opacity="0.5" />
        </svg>
      );
    case 'mangga':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-label="Buah Mangga">
          <path d="M58 26 C60 18, 66 15, 70 15" fill="none" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
          <path d="M62 24 C74 16, 88 22, 82 32 C72 34, 65 29, 62 24 Z" fill="#22C55E" stroke="#15803D" strokeWidth="2.5" />
          <path
            d="M58 28 C82 28, 94 48, 86 72 C78 96, 54 102, 40 94 C28 86, 30 68, 36 52 C42 36, 46 28, 58 28 Z"
            fill="#FACC15"
            stroke="#CA8A04"
            strokeWidth="4"
          />
          <ellipse cx="48" cy="48" rx="6" ry="12" transform="rotate(15 48 48)" fill="#FEF08A" opacity="0.7" />
        </svg>
      );
    case 'wortel':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-label="Wortel">
          <path d="M60 32 C50 18, 42 18, 44 28 M60 32 C60 14, 64 14, 64 28 M60 32 C72 18, 80 22, 74 30" fill="none" stroke="#16A34A" strokeWidth="5" strokeLinecap="round" />
          <path d="M40 36 C40 28, 80 28, 80 36 L64 98 C62 106, 58 106, 56 98 Z" fill="#F97316" stroke="#C2410C" strokeWidth="4" strokeLinejoin="round" />
          <line x1="48" y1="50" x2="60" y2="50" stroke="#9A3412" strokeWidth="3" strokeLinecap="round" />
          <line x1="58" y1="66" x2="70" y2="66" stroke="#9A3412" strokeWidth="3" strokeLinecap="round" />
          <line x1="52" y1="80" x2="62" y2="80" stroke="#9A3412" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'kentang':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-label="Kentang">
          <ellipse cx="52" cy="68" rx="28" ry="22" transform="rotate(-10 52 68)" fill="#D97706" stroke="#78350F" strokeWidth="4" />
          <ellipse cx="76" cy="54" rx="24" ry="18" transform="rotate(15 76 54)" fill="#F59E0B" stroke="#78350F" strokeWidth="4" />
          <circle cx="44" cy="64" r="2.5" fill="#78350F" />
          <circle cx="58" cy="74" r="2.5" fill="#78350F" />
          <circle cx="76" cy="52" r="2.5" fill="#78350F" />
          <circle cx="84" cy="60" r="2" fill="#78350F" />
        </svg>
      );
  }
};

interface InteractiveScaleProps {
  type: ScaleType;
  grams: number;
  label?: string;
  item?: ItemKey;
  className?: string;
}

export const InteractiveScale: React.FC<InteractiveScaleProps> = ({
  type,
  grams,
  label,
  item,
  className = 'w-full max-w-[260px]',
}) => {
  const displayWeight =
    label ?? (grams >= 1000 ? `${(grams / 1000).toFixed(grams % 1000 === 0 ? 0 : 1)} kg` : `${grams} g`);

  if (type === 'digital') {
    return (
      <div className={`flex flex-col items-center ${className}`}>
        {item && (
          <div className="-mb-3 z-10 animate-gentle-pop">
            <ItemIllustration item={item} className="w-20 h-20 drop-shadow-sm" />
          </div>
        )}
        <svg viewBox="0 0 220 125" className="w-full h-auto" aria-label="Timbangan Digital">
          <rect x="25" y="16" width="170" height="14" rx="6" fill="#CBD5E1" stroke="#475569" strokeWidth="3" />
          <rect x="100" y="30" width="20" height="10" fill="#64748B" />
          <rect x="16" y="40" width="188" height="72" rx="16" fill="#0EA5E9" stroke="#0369A1" strokeWidth="4" />
          <rect x="40" y="54" width="140" height="44" rx="8" fill="#0F172A" stroke="#38BDF8" strokeWidth="2.5" />
          <text
            x="110"
            y="84"
            textAnchor="middle"
            fill="#4ADE80"
            fontSize="24"
            fontWeight="800"
            fontFamily="Outfit, monospace"
          >
            {displayWeight}
          </text>
        </svg>
      </div>
    );
  }

  if (type === 'jarum') {
    const clampedGrams = Math.min(Math.max(grams, 0), 5000);
    const angle = (clampedGrams / 5000) * 300;
    return (
      <div className={`flex flex-col items-center ${className}`}>
        {item && (
          <div className="-mb-3 z-10 animate-gentle-pop">
            <ItemIllustration item={item} className="w-20 h-20 drop-shadow-sm" />
          </div>
        )}
        <svg viewBox="0 0 220 175" className="w-full h-auto" aria-label="Timbangan Jarum">
          <path d="M40 16 H180 L166 36 H54 Z" fill="#E2E8F0" stroke="#475569" strokeWidth="3.5" strokeLinejoin="round" />
          <rect x="98" y="36" width="24" height="14" fill="#94A3B8" stroke="#475569" strokeWidth="3" />
          <rect x="34" y="50" width="152" height="114" rx="20" fill="#F97316" stroke="#9A3412" strokeWidth="4" />
          <circle cx="110" cy="108" r="44" fill="#FFFFFF" stroke="#9A3412" strokeWidth="3.5" />
          <text x="110" y="77" textAnchor="middle" fontSize="10" fontWeight="700" fill="#334155">0</text>
          <text x="144" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#334155">1kg</text>
          <text x="136" y="136" textAnchor="middle" fontSize="10" fontWeight="700" fill="#334155">2kg</text>
          <text x="84" y="136" textAnchor="middle" fontSize="10" fontWeight="700" fill="#334155">3kg</text>
          <text x="76" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#334155">4kg</text>
          <g transform={`rotate(${angle} 110 108)`} style={{ transition: 'transform 450ms cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <line x1="110" y1="108" x2="110" y2="73" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
          </g>
          <circle cx="110" cy="108" r="6" fill="#0F172A" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {item && (
        <div className="-mb-4 -ml-20 z-10 animate-gentle-pop">
          <ItemIllustration item={item} className="w-16 h-16 drop-shadow-sm" />
        </div>
      )}
      <svg viewBox="0 0 240 150" className="w-full h-auto" aria-label="Timbangan Duduk">
        <rect x="42" y="95" width="156" height="36" rx="10" fill="#10B981" stroke="#065F46" strokeWidth="4" />
        <path d="M24 58 H112 L98 84 H38 Z" fill="#FDE047" stroke="#A16207" strokeWidth="3.5" strokeLinejoin="round" />
        <rect x="60" y="84" width="16" height="12" fill="#475569" />
        <rect x="132" y="78" width="76" height="14" rx="4" fill="#CBD5E1" stroke="#475569" strokeWidth="3" />
        <rect x="148" y="50" width="22" height="28" rx="4" fill="#94A3B8" stroke="#334155" strokeWidth="3" />
        <text x="159" y="68" textAnchor="middle" fontSize="9" fontWeight="800" fill="#0F172A">1kg</text>
        <rect x="176" y="58" width="20" height="20" rx="4" fill="#94A3B8" stroke="#334155" strokeWidth="3" />
        <text x="186" y="72" textAnchor="middle" fontSize="8" fontWeight="800" fill="#0F172A">500g</text>
        <circle cx="120" cy="113" r="8" fill="#FFFFFF" stroke="#065F46" strokeWidth="3" />
      </svg>
    </div>
  );
};

interface BalanceScaleProps {
  leftGrams: number;
  rightGrams: number;
  leftItem: ItemKey;
  rightItem: ItemKey;
  leftLabel: string;
  rightLabel: string;
  neutralBeforeReveal?: boolean;
}

export const BalanceScaleInteractive: React.FC<BalanceScaleProps> = ({
  leftGrams,
  rightGrams,
  leftItem,
  rightItem,
  leftLabel,
  rightLabel,
  neutralBeforeReveal = false,
}) => {
  let tiltDeg = 0;
  if (!neutralBeforeReveal) {
    if (leftGrams > rightGrams) tiltDeg = -13;
    else if (rightGrams > leftGrams) tiltDeg = 13;
    else tiltDeg = 0;
  }

  const leftOffsetY = tiltDeg === -13 ? 18 : tiltDeg === 13 ? -18 : 0;
  const rightOffsetY = tiltDeg === 13 ? 18 : tiltDeg === -13 ? -18 : 0;

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="relative pt-4 pb-2">
        <svg viewBox="0 0 420 220" className="w-full h-auto overflow-visible" aria-label="Timbangan Dua Sisi">
          {/* Base & Pillar */}
          <rect x="145" y="196" width="130" height="18" rx="9" fill="#D97706" stroke="#78350F" strokeWidth="3.5" />
          <rect x="198" y="54" width="24" height="142" rx="6" fill="#F59E0B" stroke="#78350F" strokeWidth="3.5" />

          {/* Tilting Beam */}
          <g
            transform={`rotate(${tiltDeg} 210 56)`}
            style={{ transition: 'transform 550ms cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            <rect x="65" y="48" width="290" height="14" rx="7" fill="#FBBF24" stroke="#78350F" strokeWidth="3.5" />
            <circle cx="80" cy="55" r="7" fill="#FEF3C7" stroke="#78350F" strokeWidth="3" />
            <circle cx="340" cy="55" r="7" fill="#FEF3C7" stroke="#78350F" strokeWidth="3" />
          </g>

          {/* Center Pivot */}
          <circle cx="210" cy="56" r="14" fill="#FDE047" stroke="#78350F" strokeWidth="4" />
          <circle cx="210" cy="56" r="5" fill="#78350F" />

          {/* Left Pan */}
          <g
            transform={`translate(0, ${leftOffsetY})`}
            style={{ transition: 'transform 550ms cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            <line x1="80" y1="58" x2="45" y2="128" stroke="#92400E" strokeWidth="3" />
            <line x1="80" y1="58" x2="115" y2="128" stroke="#92400E" strokeWidth="3" />
            <path d="M32 128 H128 L116 146 H44 Z" fill="#F59E0B" stroke="#78350F" strokeWidth="3.5" strokeLinejoin="round" />
            <g transform="translate(45, 58)">
              <ItemIllustration item={leftItem} className="w-[70px] h-[70px]" />
            </g>
          </g>

          {/* Right Pan */}
          <g
            transform={`translate(0, ${rightOffsetY})`}
            style={{ transition: 'transform 550ms cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            <line x1="340" y1="58" x2="305" y2="128" stroke="#92400E" strokeWidth="3" />
            <line x1="340" y1="58" x2="375" y2="128" stroke="#92400E" strokeWidth="3" />
            <path d="M292 128 H388 L376 146 H304 Z" fill="#F59E0B" stroke="#78350F" strokeWidth="3.5" strokeLinejoin="round" />
            <g transform="translate(305, 58)">
              <ItemIllustration item={rightItem} className="w-[70px] h-[70px]" />
            </g>
          </g>
        </svg>

        <div className="grid grid-cols-2 gap-4 mt-2 text-center">
          <div className="bg-sky-50 border border-sky-200 rounded-xl px-3 py-2">
            <p className="text-xs font-semibold text-sky-700">Sisi Kiri</p>
            <p className="font-display font-bold text-base sm:text-lg text-slate-900 tabular-nums">{leftLabel}</p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-xl px-3 py-2">
            <p className="text-xs font-semibold text-orange-700">Sisi Kanan</p>
            <p className="font-display font-bold text-base sm:text-lg text-slate-900 tabular-nums">{rightLabel}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
