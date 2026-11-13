import React from 'react';
import {
  Award,
  CheckCircle2,
  Gamepad2,
  Home,
  RotateCcw,
  Star,
  XCircle,
} from 'lucide-react';
import { AppSection, StudentProgress } from '../types';
import { MascotHelper } from './MascotHelper';
import { soundEngine } from '../utils/sound';

interface HasilViewProps {
  progress: StudentProgress;
  onNameChange: (name: string) => void;
  onResetAll: () => void;
  onNavigate: (section: AppSection) => void;
}

export const HasilView: React.FC<HasilViewProps> = ({
  progress,
  onNameChange,
  onResetAll,
  onNavigate,
}) => {
  const score = progress.totalScore;

  // Determine title & stars
  let titleName = 'Bintang Pemula';
  let stars = 1;
  let motivation =
    'Langkah awal yang hebat! Ayo terus berlatih materi dan mainkan game seru agar bintangmu bertambah!';

  if (score >= 200) {
    titleName = 'Juara Satuan Berat';
    stars = 5;
    motivation =
      'Luar biasa! Kamu sudah menguasai kilogram, gram, alat ukur timbangan, dan perbandingan berat benda dengan sangat baik!';
  } else if (score >= 100) {
    titleName = 'Ahli Timbangan';
    stars = 3;
    motivation =
      'Keren sekali! Kamu sudah paham cara menimbang dan mengubah satuan berat. Mainkan lagi game dan kuis untuk menjadi Juara Satuan Berat!';
  } else if (score >= 40) {
    titleName = 'Bintang Pemula';
    stars = 2;
    motivation =
      'Bagus! Kamu sudah mulai mengenal satuan berat. Yuk selesaikan lebih banyak game dan kuis!';
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
          <span>Kembali ke Menu Utama</span>
        </button>

        <button
          type="button"
          onClick={() => {
            soundEngine.playClick();
            onResetAll();
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-orange-700 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-xl cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Ulangi dari Awal</span>
        </button>
      </div>

      {/* Reward Certificate Card */}
      <section className="bg-white rounded-3xl border border-amber-200 shadow-sm p-6 sm:p-10 space-y-8">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
            <Award className="w-11 h-11" />
          </div>

          <div className="space-y-1">
            <p className="text-sm font-bold text-amber-700">Piagam Penghargaan Petualang</p>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900">
              {progress.studentName.trim() || 'Petualang Cilik'}
            </h2>
            <p className="font-display font-extrabold text-xl sm:text-2xl text-sky-700 pt-1">
              Gelar: {titleName}
            </p>
          </div>

          {/* Star Display */}
          <div className="flex items-center justify-center gap-2 pt-1" aria-label={`Memperoleh ${stars} dari 5 bintang`}>
            {[1, 2, 3, 4, 5].map((n) => (
              <Star
                key={n}
                className={`w-10 h-10 transition-transform ${
                  n <= stars
                    ? 'text-amber-400 fill-amber-400 scale-105'
                    : 'text-slate-200 fill-slate-100'
                }`}
              />
            ))}
          </div>
          <p className="text-sm font-bold text-slate-600 tabular-nums">
            Bintang yang diperoleh: {stars} dari 5 Bintang Emas
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5 text-center">
            <p className="text-sm font-bold text-sky-800">Total Skor</p>
            <p className="font-display font-extrabold text-4xl text-slate-900 mt-1 tabular-nums">
              {progress.totalScore}
            </p>
            <p className="text-xs font-semibold text-slate-600 mt-1">Poin terkumpul</p>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center">
            <p className="text-sm font-bold text-emerald-800 inline-flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Jawaban Benar
            </p>
            <p className="font-display font-extrabold text-4xl text-emerald-700 mt-1 tabular-nums">
              {progress.correctCount}
            </p>
            <p className="text-xs font-semibold text-emerald-700 mt-1">+10 poin setiap benar</p>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 text-center">
            <p className="text-sm font-bold text-orange-800 inline-flex items-center justify-center gap-1.5">
              <XCircle className="w-4 h-4" />
              Jawaban Salah
            </p>
            <p className="font-display font-extrabold text-4xl text-orange-700 mt-1 tabular-nums">
              {progress.wrongCount}
            </p>
            <p className="text-xs font-semibold text-orange-700 mt-1">Tetap semangat berlatih</p>
          </div>
        </div>

        {/* Edit Student Name inline + Motivation */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center bg-amber-50/60 border border-amber-200 rounded-2xl p-5">
          <div className="md:col-span-7 space-y-1">
            <p className="text-sm font-bold text-amber-900">Pesan Motivasi Untukmu</p>
            <p className="text-base sm:text-lg font-semibold text-slate-800 leading-relaxed">
              {motivation}
            </p>
          </div>
          <div className="md:col-span-5">
            <label htmlFor="result-name-edit" className="block text-xs font-bold text-slate-700 mb-1.5">
              Ubah Nama di Piagam
            </label>
            <input
              id="result-name-edit"
              type="text"
              maxLength={30}
              value={progress.studentName}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="Tulis namamu..."
              className="w-full px-3.5 py-2.5 text-base font-bold text-slate-900 bg-white border border-amber-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>

        {/* Title Tiers Reference */}
        <div className="space-y-3">
          <h3 className="font-display font-bold text-lg text-slate-900">
            Tingkatan Gelar Petualangan Satuan Berat
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { title: '1. Bintang Pemula', req: '0 – 90 Poin', active: score < 100 },
              { title: '2. Ahli Timbangan', req: '100 – 190 Poin', active: score >= 100 && score < 200 },
              { title: '3. Juara Satuan Berat', req: '200+ Poin', active: score >= 200 },
            ].map((tier) => (
              <div
                key={tier.title}
                className={`p-4 rounded-2xl border ${
                  tier.active
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <p className="font-display font-bold text-base">{tier.title}</p>
                <p className="text-sm font-semibold mt-0.5 tabular-nums">{tier.req}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              onNavigate('permainan');
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-bold text-white bg-sky-600 hover:bg-sky-700 cursor-pointer"
          >
            <Gamepad2 className="w-5 h-5" />
            <span>Mainkan Game Lagi</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              onNavigate('kuis');
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-bold text-white bg-orange-500 hover:bg-orange-600 cursor-pointer"
          >
            <span>Coba Kuis Lagi</span>
          </button>
        </div>
      </section>

      <MascotHelper
        message={`Terus semangat belajar matematika, ${progress.studentName.trim() || 'Petualang Cilik'}! Kamu pasti bisa menjadi Juara Satuan Berat!`}
        mood="cheer"
      />
    </div>
  );
};
