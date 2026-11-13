import React from 'react';
import { BookOpen, Gamepad2, ClipboardCheck, Award, ArrowRight, User } from 'lucide-react';
import { AppSection, StudentProgress } from '../types';
import { ResilientImage } from './Illustrations';
import { MascotHelper } from './MascotHelper';
import { soundEngine } from '../utils/sound';

interface BerandaViewProps {
  progress: StudentProgress;
  onNameChange: (name: string) => void;
  onNavigate: (section: AppSection) => void;
}

export const BerandaView: React.FC<BerandaViewProps> = ({
  progress,
  onNameChange,
  onNavigate,
}) => {
  const handleStart = () => {
    soundEngine.playClick();
    onNavigate('materi');
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-white rounded-3xl border border-sky-100 shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <p className="text-sm font-bold text-sky-700">
                Matematika Kelas 3 SD · Pengukuran Baku
              </p>
              <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 leading-tight text-balance">
                Petualangan Satuan Berat
              </h1>
              <p className="text-lg text-slate-700 leading-relaxed max-w-xl">
                Ayo belajar mengenal satuan berat <strong>kilogram (kg)</strong> dan{' '}
                <strong>gram (g)</strong> sambil bermain timbangan ajaib dan berbelanja di pasar ceria!
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="student-name-input"
                  className="block text-sm font-bold text-slate-800 mb-2"
                >
                  Siapa namamu, Petualang?
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <User className="w-5 h-5 text-sky-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="student-name-input"
                      type="text"
                      maxLength={30}
                      value={progress.studentName}
                      onChange={(e) => onNameChange(e.target.value)}
                      placeholder="Tulis namamu di sini..."
                      className="w-full pl-11 pr-4 py-3 text-base font-semibold text-slate-900 bg-sky-50/70 border border-sky-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleStart}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-display font-bold text-white bg-orange-500 hover:bg-orange-600 active:scale-[0.98] rounded-xl shadow-sm transition-all whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>MULAI BELAJAR</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-semibold text-slate-600 pt-1">
                <span>5 Materi Seru</span>
                <span aria-hidden="true">·</span>
                <span>4 Game Interaktif</span>
                <span aria-hidden="true">·</span>
                <span>10 Soal Kuis</span>
                <span aria-hidden="true">·</span>
                <span>Kumpulkan Bintang &amp; Gelar</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-sky-50 min-h-[260px] lg:min-h-full">
            <ResilientImage
              src="/src/assets/images/hero_petualangan_berat_1794552841718.jpg"
              alt="Anak-anak SD belajar menimbang buah, beras, dan gula di taman"
              fallbackTitle="Petualangan Satuan Berat"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mascot Greeting */}
      <MascotHelper
        message={`Halo ${progress.studentName.trim() || 'Petualang Cilik'}! Aku Bima. Yuk kita ikuti alur belajar dari Materi, Bermain Game, lalu Kuis supaya dapat gelar Juara Satuan Berat!`}
        mood="happy"
      />

      {/* Learning Journey Menu Cards */}
      <section aria-labelledby="menu-petualangan-heading" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 id="menu-petualangan-heading" className="font-display font-bold text-2xl text-slate-900">
              Peta Petualangan Belajarmu
            </h2>
            <p className="text-base text-slate-600">
              Ikuti langkah belajar secara bertahap atau pilih kegiatan yang ingin kamu coba.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              onNavigate('materi');
            }}
            className="text-left bg-white hover:bg-sky-50/70 border border-sky-200 rounded-2xl p-6 transition-all hover:-translate-y-0.5 shadow-sm flex flex-col justify-between gap-5 cursor-pointer"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-sky-700">Langkah 1 · Mengenal</p>
              <h3 className="font-display font-bold text-xl text-slate-900">Materi Belajar</h3>
              <p className="text-base text-slate-600 leading-snug">
                Kenali pengertian berat, timbangan, kg &amp; gram, dan cara membandingkan berat benda.
              </p>
            </div>
            <div className="flex items-center justify-between text-sm font-bold text-sky-700 pt-2 border-t border-slate-100">
              <span className="tabular-nums">{progress.completedLessons.length}/5 bagian selesai</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              onNavigate('permainan');
            }}
            className="text-left bg-white hover:bg-emerald-50/70 border border-emerald-200 rounded-2xl p-6 transition-all hover:-translate-y-0.5 shadow-sm flex flex-col justify-between gap-5 cursor-pointer"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-emerald-700">Langkah 2 · Bermain</p>
              <h3 className="font-display font-bold text-xl text-slate-900">Game Edukasi</h3>
              <p className="text-base text-slate-600 leading-snug">
                Mainkan Tebak Berat, Pasangkan Satuan, Pasar Ceria, dan Timbangan Ajaib!
              </p>
            </div>
            <div className="flex items-center justify-between text-sm font-bold text-emerald-700 pt-2 border-t border-slate-100">
              <span className="tabular-nums">{progress.completedGames.length}/4 game selesai</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              onNavigate('kuis');
            }}
            className="text-left bg-white hover:bg-orange-50/70 border border-orange-200 rounded-2xl p-6 transition-all hover:-translate-y-0.5 shadow-sm flex flex-col justify-between gap-5 cursor-pointer"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center">
                <ClipboardCheck className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-orange-700">Langkah 3 · Tantangan</p>
              <h3 className="font-display font-bold text-xl text-slate-900">Kuis 10 Soal</h3>
              <p className="text-base text-slate-600 leading-snug">
                Jawab 10 soal pilihan ganda bertahap dan kumpulkan hingga 100 poin!
              </p>
            </div>
            <div className="flex items-center justify-between text-sm font-bold text-orange-700 pt-2 border-t border-slate-100">
              <span>{progress.quizCompleted ? 'Sudah dikerjakan' : 'Siap dicoba'}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              onNavigate('hasil');
            }}
            className="text-left bg-white hover:bg-amber-50/70 border border-amber-200 rounded-2xl p-6 transition-all hover:-translate-y-0.5 shadow-sm flex flex-col justify-between gap-5 cursor-pointer"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-amber-700">Langkah 4 · Hadiah</p>
              <h3 className="font-display font-bold text-xl text-slate-900">Hasil Belajar</h3>
              <p className="text-base text-slate-600 leading-snug">
                Lihat total skor, jumlah bintang emas, dan gelar juara yang kamu raih.
              </p>
            </div>
            <div className="flex items-center justify-between text-sm font-bold text-amber-700 pt-2 border-t border-slate-100">
              <span className="tabular-nums">Skor saat ini: {progress.totalScore}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      </section>

      {/* Tujuan Pembelajaran */}
      <section aria-labelledby="tujuan-heading" className="bg-white rounded-3xl border border-sky-100 shadow-sm p-6 sm:p-8 space-y-4">
        <h2 id="tujuan-heading" className="font-display font-bold text-xl sm:text-2xl text-slate-900">
          Tujuan Pembelajaran Kita Hari Ini
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2.5 text-base text-slate-700">
          <p>1. Mengenal pengertian satuan berat.</p>
          <p>2. Mengenal alat ukur berat (timbangan).</p>
          <p>3. Mengenal satuan kilogram (kg) dan gram (g).</p>
          <p>4. Memahami hubungan 1 kg = 1.000 gram.</p>
          <p>5. Membandingkan berat dua benda.</p>
          <p>6. Memperkirakan &amp; menyelesaikan soal satuan berat.</p>
        </div>
      </section>
    </div>
  );
};
