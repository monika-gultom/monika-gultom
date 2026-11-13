import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Home,
  Scale,
  ShoppingBasket,
  Sparkles,
  Link2,
} from 'lucide-react';
import { AppSection, GameId } from '../types';
import { GameTebakBerat } from './games/GameTebakBerat';
import { GamePasangkanSatuan } from './games/GamePasangkanSatuan';
import { GamePasarCeria } from './games/GamePasarCeria';
import { GameTimbanganAjaib } from './games/GameTimbanganAjaib';
import { MascotHelper } from './MascotHelper';
import { soundEngine } from '../utils/sound';

interface PermainanViewProps {
  completedGames: GameId[];
  onRecordAnswer: (isCorrect: boolean) => void;
  onCompleteGame: (gameId: GameId) => void;
  onNavigate: (section: AppSection) => void;
}

const GAME_CARDS: {
  id: GameId;
  title: string;
  subtitle: string;
  howToPlay: string;
  accentBg: string;
  accentText: string;
  icon: React.ReactNode;
}[] = [
  {
    id: 'tebak-berat',
    title: 'Game 1: Tebak Berat Benda',
    subtitle: 'Pilih perkiraan berat yang tepat untuk setiap benda sehari-hari.',
    howToPlay: 'Lihat gambar benda, lalu klik A, B, atau C untuk jawaban yang paling pas!',
    accentBg: 'bg-sky-100',
    accentText: 'text-sky-700',
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    id: 'pasangkan',
    title: 'Game 2: Pasangkan Satuan Berat',
    subtitle: 'Cocokkan satuan kilogram (kg) dengan nilai gram (g) yang sama.',
    howToPlay: 'Seret kartu kiri ke kartu kanan, atau klik dua kartu yang berpasangan!',
    accentBg: 'bg-emerald-100',
    accentText: 'text-emerald-700',
    icon: <Link2 className="w-6 h-6" />,
  },
  {
    id: 'pasar-ceria',
    title: 'Game 3: Petualangan Pasar Ceria',
    subtitle: 'Jadilah pembeli pintar di toko buah dan sayur sesuai misi belanja.',
    howToPlay: 'Baca misi belanja di papan pasar, lalu klik buah atau sayur yang diminta!',
    accentBg: 'bg-orange-100',
    accentText: 'text-orange-700',
    icon: <ShoppingBasket className="w-6 h-6" />,
  },
  {
    id: 'timbangan-ajaib',
    title: 'Game 4: Timbangan Ajaib',
    subtitle: 'Tebak benda mana yang lebih berat, lebih ringan, atau sama berat.',
    howToPlay: 'Bandingkan dua sisi timbangan, lalu pilih jawaban dan lihat timbangannya bergerak!',
    accentBg: 'bg-amber-100',
    accentText: 'text-amber-700',
    icon: <Scale className="w-6 h-6" />,
  },
];

export const PermainanView: React.FC<PermainanViewProps> = ({
  completedGames,
  onRecordAnswer,
  onCompleteGame,
  onNavigate,
}) => {
  const [activeGame, setActiveGame] = useState<GameId | null>(null);

  if (activeGame) {
    return (
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              setActiveGame(null);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Daftar Permainan</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              onNavigate('beranda');
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Menu Utama</span>
          </button>
        </div>

        {activeGame === 'tebak-berat' && (
          <GameTebakBerat
            onRecordAnswer={onRecordAnswer}
            onCompleteGame={() => onCompleteGame('tebak-berat')}
            onBackToGames={() => setActiveGame(null)}
          />
        )}
        {activeGame === 'pasangkan' && (
          <GamePasangkanSatuan
            onRecordAnswer={onRecordAnswer}
            onCompleteGame={() => onCompleteGame('pasangkan')}
            onBackToGames={() => setActiveGame(null)}
          />
        )}
        {activeGame === 'pasar-ceria' && (
          <GamePasarCeria
            onRecordAnswer={onRecordAnswer}
            onCompleteGame={() => onCompleteGame('pasar-ceria')}
            onBackToGames={() => setActiveGame(null)}
          />
        )}
        {activeGame === 'timbangan-ajaib' && (
          <GameTimbanganAjaib
            onRecordAnswer={onRecordAnswer}
            onCompleteGame={() => onCompleteGame('timbangan-ajaib')}
            onBackToGames={() => setActiveGame(null)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => {
            soundEngine.playClick();
            onNavigate('beranda');
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Menu Utama</span>
        </button>

        <div className="text-sm font-bold text-emerald-800 tabular-nums">
          {completedGames.length} dari 4 game selesai · 10 poin tiap jawaban benar
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="font-display font-extrabold text-3xl text-slate-900">
          Arena Game Edukasi Satuan Berat
        </h2>
        <p className="text-lg text-slate-700">
          Pilih permainan seru di bawah ini untuk melatih kemampuanmu menimbang dan menghitung satuan berat!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {GAME_CARDS.map((card) => {
          const isDone = completedGames.includes(card.id);
          return (
            <div
              key={card.id}
              className="bg-white rounded-3xl border border-sky-100 shadow-sm p-6 flex flex-col justify-between gap-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.accentBg} ${card.accentText}`}>
                    {card.icon}
                  </div>
                  {isDone && (
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700">
                      <CheckCircle2 className="w-5 h-5" />
                      Sudah Selesai
                    </span>
                  )}
                </div>

                <h3 className="font-display font-extrabold text-xl text-slate-900">
                  {card.title}
                </h3>
                <p className="text-base text-slate-700">{card.subtitle}</p>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                  <p className="text-xs font-bold text-slate-500">Petunjuk Permainan</p>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5">{card.howToPlay}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setActiveGame(card.id);
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-display font-bold text-base text-white bg-sky-600 hover:bg-sky-700 transition-colors cursor-pointer"
              >
                <span>{isDone ? 'Mainkan Lagi' : 'Mainkan Sekarang'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Game 5 / Quiz Callout */}
      <div className="bg-orange-50 border border-orange-200 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0">
            <ClipboardCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-display font-extrabold text-xl text-slate-900">
              Game 5: Kuis Petualangan Satuan Berat (10 Soal)
            </h3>
            <p className="text-base text-slate-700 mt-0.5">
              Sudah siap menguji kemampuanmu? Jawab 10 soal pilihan ganda untuk meraih gelar Juara!
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            soundEngine.playClick();
            onNavigate('kuis');
          }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-bold text-white bg-orange-500 hover:bg-orange-600 whitespace-nowrap shrink-0 cursor-pointer"
        >
          <span>Mulai Kuis 10 Soal</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <MascotHelper
        message="Pilih salah satu game untuk dimainkan! Setiap jawaban benar akan memberimu 10 poin!"
        mood="happy"
      />
    </div>
  );
};
