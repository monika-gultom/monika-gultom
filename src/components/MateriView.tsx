import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Gamepad2,
  Home,
  Scale,
} from 'lucide-react';
import { AppSection, ItemKey } from '../types';
import {
  LEARNING_ITEMS,
  SCALE_TOOLS,
  UNIT_CONVERSION_EXAMPLES,
} from '../data/learningContent';
import {
  BalanceScaleInteractive,
  InteractiveScale,
  ItemIllustration,
} from './Illustrations';
import { MascotHelper } from './MascotHelper';
import { soundEngine } from '../utils/sound';

interface MateriViewProps {
  completedLessons: number[];
  onCompleteLesson: (lessonId: number) => void;
  onNavigate: (section: AppSection) => void;
}

const CHAPTER_TITLES = [
  { id: 1, shortTitle: '1. Apa Itu Berat?' },
  { id: 2, shortTitle: '2. Alat Ukur' },
  { id: 3, shortTitle: '3. Satuan kg & g' },
  { id: 4, shortTitle: '4. 1 kg = 1.000 g' },
  { id: 5, shortTitle: '5. Membandingkan' },
];

const QUICK_UNIT_CHECK: { item: ItemKey; name: string; weightHint: string; answer: 'kg' | 'g' }[] = [
  { item: 'beras', name: 'Karung Beras', weightHint: '5 ...', answer: 'kg' },
  { item: 'apel', name: 'Satu Buah Apel', weightHint: '150 ...', answer: 'g' },
  { item: 'gula', name: 'Sebungkus Gula', weightHint: '1 ...', answer: 'kg' },
  { item: 'cokelat', name: 'Sebatang Cokelat', weightHint: '100 ...', answer: 'g' },
];

const COMPARE_OPTIONS: { id: ItemKey; label: string; grams: number }[] = [
  { id: 'cokelat', label: 'Cokelat (100 g)', grams: 100 },
  { id: 'apel', label: 'Apel (150 g)', grams: 150 },
  { id: 'tepung', label: 'Tepung (500 g)', grams: 500 },
  { id: 'gula', label: 'Gula (1 kg)', grams: 1000 },
  { id: 'semangka', label: 'Semangka (2 kg)', grams: 2000 },
  { id: 'beras', label: 'Beras (5 kg)', grams: 5000 },
];

export const MateriView: React.FC<MateriViewProps> = ({
  completedLessons,
  onCompleteLesson,
  onNavigate,
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedItem, setSelectedItem] = useState(LEARNING_ITEMS[0]);
  const [selectedScaleIdx, setSelectedScaleIdx] = useState(0);
  const [selectedKg, setSelectedKg] = useState(1);
  const [unitCheckFeedback, setUnitCheckFeedback] = useState<Record<string, 'correct' | 'wrong'>>({});
  const [leftCompare, setLeftCompare] = useState(COMPARE_OPTIONS[1]); // Apel 150g
  const [rightCompare, setRightCompare] = useState(COMPARE_OPTIONS[4]); // Semangka 2kg

  const handleSelectChapter = (id: number) => {
    soundEngine.playClick();
    setStep(id);
    onCompleteLesson(id);
  };

  const handleNext = () => {
    soundEngine.playClick();
    onCompleteLesson(step);
    if (step < 5) {
      const nextStep = step + 1;
      setStep(nextStep);
      onCompleteLesson(nextStep);
    } else {
      onNavigate('permainan');
    }
  };

  const handlePrev = () => {
    soundEngine.playClick();
    if (step > 1) setStep(step - 1);
  };

  const handleUnitCheck = (itemKey: string, choice: 'kg' | 'g', correct: 'kg' | 'g') => {
    if (choice === correct) {
      soundEngine.playCorrect();
      setUnitCheckFeedback((prev) => ({ ...prev, [itemKey]: 'correct' }));
    } else {
      soundEngine.playWrong();
      setUnitCheckFeedback((prev) => ({ ...prev, [itemKey]: 'wrong' }));
    }
  };

  const currentScale = SCALE_TOOLS[selectedScaleIdx];

  const comparisonText =
    leftCompare.grams > rightCompare.grams
      ? `${leftCompare.label} LEBIH BERAT daripada ${rightCompare.label}.`
      : leftCompare.grams < rightCompare.grams
      ? `${leftCompare.label} LEBIH RINGAN daripada ${rightCompare.label}.`
      : `${leftCompare.label} SAMA BERAT dengan ${rightCompare.label}.`;

  return (
    <div className="space-y-6">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => {
            soundEngine.playClick();
            onNavigate('beranda');
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Menu Utama</span>
        </button>

        <div className="text-sm font-bold text-sky-800">
          Materi Bagian {step} dari 5 · {completedLessons.length}/5 bagian dibuka
        </div>
      </div>

      {/* Chapter Segmented Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-2 bg-white border border-sky-100 rounded-2xl shadow-sm">
        {CHAPTER_TITLES.map((ch) => {
          const active = step === ch.id;
          const done = completedLessons.includes(ch.id);
          return (
            <button
              key={ch.id}
              type="button"
              onClick={() => handleSelectChapter(ch.id)}
              className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-bold transition-colors whitespace-nowrap cursor-pointer ${
                active
                  ? 'bg-sky-600 text-white shadow-sm'
                  : done
                  ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                  : 'text-slate-600 hover:bg-sky-50'
              }`}
            >
              {done && !active && <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />}
              <span className="truncate">{ch.shortTitle}</span>
            </button>
          );
        })}
      </div>

      {/* Main Content Stage */}
      <div className="bg-white rounded-3xl border border-sky-100 shadow-sm p-6 sm:p-8 space-y-6">
        {step === 1 && (
          <div className="space-y-6 animate-gentle-pop">
            <div className="space-y-2">
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
                1. Apa Itu Satuan Berat?
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed max-w-3xl">
                <strong>Satuan berat</strong> digunakan untuk mengetahui seberapa berat atau ringan
                suatu benda. Coba klik salah satu benda di bawah ini untuk menimbangnya!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {LEARNING_ITEMS.map((item) => {
                  const isSelected = selectedItem.id === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        soundEngine.playClick();
                        setSelectedItem(item);
                        onCompleteLesson(1);
                      }}
                      className={`p-4 rounded-2xl border text-center flex flex-col items-center gap-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-sky-50 border-sky-500 ring-2 ring-sky-200'
                          : 'bg-slate-50/60 border-slate-200 hover:bg-sky-50/40'
                      }`}
                    >
                      <ItemIllustration item={item.id} className="w-16 h-16" />
                      <span className="font-display font-bold text-base text-slate-900">
                        {item.name}
                      </span>
                      <span className="text-sm font-bold text-sky-700 tabular-nums">
                        {item.weightLabel}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="lg:col-span-5 bg-sky-50/80 border border-sky-200 rounded-2xl p-6 flex flex-col items-center text-center gap-4">
                <InteractiveScale
                  type="digital"
                  grams={selectedItem.weightGrams}
                  label={selectedItem.weightLabel}
                  item={selectedItem.id}
                />
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-xl text-slate-900">
                    {selectedItem.name} · {selectedItem.weightLabel}
                  </h3>
                  <p className="text-base text-slate-700 leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-gentle-pop">
            <div className="space-y-2">
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
                2. Alat Ukur Berat (Timbangan)
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed max-w-3xl">
                Alat untuk mengukur berat disebut <strong>timbangan</strong>. Ada berbagai jenis
                timbangan yang sering kita temui. Klik tiap jenis timbangan untuk melihat cara
                kerjanya!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SCALE_TOOLS.map((tool, idx) => {
                const active = selectedScaleIdx === idx;
                return (
                  <button
                    key={tool.id}
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      setSelectedScaleIdx(idx);
                      onCompleteLesson(2);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      active
                        ? 'bg-orange-50 border-orange-500 ring-2 ring-orange-200'
                        : 'bg-white border-slate-200 hover:bg-orange-50/40'
                    }`}
                  >
                    <p className="font-display font-bold text-lg text-slate-900">{tool.name}</p>
                    <p className="text-sm text-slate-600 mt-1">{tool.subtitle}</p>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-amber-50/60 border border-amber-200 rounded-2xl p-6">
              <div className="lg:col-span-5 flex justify-center">
                <InteractiveScale
                  type={currentScale.id}
                  grams={currentScale.sampleGrams}
                  label={currentScale.sampleWeightLabel}
                  item={currentScale.sampleItem}
                />
              </div>
              <div className="lg:col-span-7 space-y-3">
                <h3 className="font-display font-extrabold text-2xl text-slate-900">
                  {currentScale.name}
                </h3>
                <p className="text-lg text-slate-700 leading-relaxed">{currentScale.description}</p>
                <div className="bg-white border border-amber-200 rounded-xl p-4">
                  <p className="text-sm font-bold text-amber-800">Di mana biasanya kita temui?</p>
                  <p className="text-base font-semibold text-slate-800 mt-0.5">
                    {currentScale.whereFound}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-gentle-pop">
            <div className="space-y-2">
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
                3. Mengenal Satuan Kilogram (kg) dan Gram (g)
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed max-w-3xl">
                Di sekolah dasar, ada dua satuan berat baku yang paling sering digunakan, yaitu{' '}
                <strong>kilogram (kg)</strong> untuk benda yang lebih berat dan{' '}
                <strong>gram (g)</strong> untuk benda yang lebih ringan.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 space-y-4">
                <div>
                  <h3 className="font-display font-extrabold text-2xl text-emerald-900">
                    Kilogram (kg)
                  </h3>
                  <p className="text-base text-emerald-800 mt-1">
                    Dipakai untuk mengukur benda yang cukup berat.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-xl p-4 border border-emerald-100 flex flex-col items-center text-center gap-2">
                    <ItemIllustration item="beras" className="w-16 h-16" />
                    <p className="font-bold text-slate-900">Karung Beras</p>
                    <p className="text-base font-extrabold text-emerald-700 tabular-nums">5 kg</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-emerald-100 flex flex-col items-center text-center gap-2">
                    <ItemIllustration item="gula" className="w-16 h-16" />
                    <p className="font-bold text-slate-900">Sebungkus Gula</p>
                    <p className="text-base font-extrabold text-emerald-700 tabular-nums">1 kg</p>
                  </div>
                </div>
              </div>

              <div className="bg-sky-50 border border-sky-200 rounded-2xl p-6 space-y-4">
                <div>
                  <h3 className="font-display font-extrabold text-2xl text-sky-900">
                    Gram (g)
                  </h3>
                  <p className="text-base text-sky-800 mt-1">
                    Dipakai untuk mengukur benda yang ringan atau kecil.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-xl p-4 border border-sky-100 flex flex-col items-center text-center gap-2">
                    <ItemIllustration item="apel" className="w-16 h-16" />
                    <p className="font-bold text-slate-900">Sebuah Apel</p>
                    <p className="text-base font-extrabold text-sky-700 tabular-nums">150 g</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-sky-100 flex flex-col items-center text-center gap-2">
                    <ItemIllustration item="cokelat" className="w-16 h-16" />
                    <p className="font-bold text-slate-900">Sebatang Cokelat</p>
                    <p className="text-base font-extrabold text-sky-700 tabular-nums">100 g</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mini Practice */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
              <h3 className="font-display font-bold text-lg text-slate-900">
                Latihan Singkat: Pilih satuan yang tepat (kg atau g)!
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {QUICK_UNIT_CHECK.map((q) => {
                  const status = unitCheckFeedback[q.item];
                  return (
                    <div
                      key={q.item}
                      className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col items-center text-center gap-3"
                    >
                      <ItemIllustration item={q.item} className="w-14 h-14" />
                      <div>
                        <p className="font-bold text-slate-900">{q.name}</p>
                        <p className="text-sm font-bold text-slate-600 tabular-nums">
                          {status === 'correct' ? q.weightHint.replace('...', q.answer) : q.weightHint}
                        </p>
                      </div>
                      <div className="flex gap-2 w-full">
                        <button
                          type="button"
                          onClick={() => handleUnitCheck(q.item, 'kg', q.answer)}
                          className={`flex-1 py-2 rounded-lg font-bold text-sm border cursor-pointer transition-colors ${
                            status === 'correct' && q.answer === 'kg'
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-sky-50 text-sky-800 border-sky-200 hover:bg-sky-100'
                          }`}
                        >
                          kg
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUnitCheck(q.item, 'g', q.answer)}
                          className={`flex-1 py-2 rounded-lg font-bold text-sm border cursor-pointer transition-colors ${
                            status === 'correct' && q.answer === 'g'
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-orange-50 text-orange-800 border-orange-200 hover:bg-orange-100'
                          }`}
                        >
                          g
                        </button>
                      </div>
                      {status === 'correct' && (
                        <p className="text-xs font-bold text-emerald-700">Benar! Tepat sekali.</p>
                      )}
                      {status === 'wrong' && (
                        <p className="text-xs font-bold text-orange-700">Coba pilih satuan satunya!</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-gentle-pop">
            <div className="space-y-2">
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
                4. Hubungan Kilogram dan Gram
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed max-w-3xl">
                Tahukah kamu? Berat <strong>1 kilogram (kg)</strong> sama persis dengan{' '}
                <strong>1.000 gram (g)</strong>. Klik angka di bawah untuk melihat keseimbangannya!
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-center">
              <p className="font-display font-extrabold text-2xl sm:text-4xl text-amber-900 tabular-nums">
                1 kg = 1.000 gram
              </p>
            </div>

            {/* Interactive kg Selector */}
            <div className="flex flex-wrap justify-center gap-3">
              {UNIT_CONVERSION_EXAMPLES.map((ex) => {
                const active = selectedKg === ex.kg;
                return (
                  <button
                    key={ex.kg}
                    type="button"
                    onClick={() => {
                      soundEngine.playCorrect();
                      setSelectedKg(ex.kg);
                      onCompleteLesson(4);
                    }}
                    className={`px-5 py-3 rounded-xl font-display font-bold text-lg border transition-all cursor-pointer tabular-nums ${
                      active
                        ? 'bg-sky-600 text-white border-sky-600 shadow-sm scale-105'
                        : 'bg-white text-slate-800 border-slate-200 hover:bg-sky-50'
                    }`}
                  >
                    {ex.kg} kg = {ex.grams.toLocaleString('id-ID')} g
                  </button>
                );
              })}
            </div>

            {/* Visual Equivalence Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center bg-sky-50/70 border border-sky-200 rounded-2xl p-6">
              <div className="md:col-span-5 bg-white rounded-2xl p-5 border border-sky-100 text-center space-y-3">
                <p className="text-sm font-bold text-sky-700">Satuan Kilogram</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {Array.from({ length: selectedKg }).map((_, idx) => (
                    <div
                      key={idx}
                      className="w-16 h-16 rounded-xl bg-sky-600 text-white flex flex-col items-center justify-center font-display font-extrabold shadow-sm animate-gentle-pop"
                    >
                      <span className="text-lg tabular-nums">1 kg</span>
                    </div>
                  ))}
                </div>
                <p className="font-display font-extrabold text-2xl text-slate-900 tabular-nums">
                  Total: {selectedKg} kg
                </p>
              </div>

              <div className="md:col-span-1 flex items-center justify-center">
                <span className="font-display font-extrabold text-4xl text-emerald-600">=</span>
              </div>

              <div className="md:col-span-5 bg-white rounded-2xl p-5 border border-emerald-100 text-center space-y-3">
                <p className="text-sm font-bold text-emerald-700">Satuan Gram</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {Array.from({ length: selectedKg }).map((_, idx) => (
                    <div
                      key={idx}
                      className="w-20 h-16 rounded-xl bg-emerald-600 text-white flex flex-col items-center justify-center font-display font-extrabold shadow-sm animate-gentle-pop"
                    >
                      <span className="text-base tabular-nums">1.000 g</span>
                    </div>
                  ))}
                </div>
                <p className="font-display font-extrabold text-2xl text-slate-900 tabular-nums">
                  Total: {(selectedKg * 1000).toLocaleString('id-ID')} gram
                </p>
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6 animate-gentle-pop">
            <div className="space-y-2">
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
                5. Membandingkan Berat Benda
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed max-w-3xl">
                Saat membandingkan dua benda di timbangan, sisi yang lebih berat akan{' '}
                <strong>turun ke bawah</strong>, dan sisi yang lebih ringan akan{' '}
                <strong>naik ke atas</strong>. Jika sama berat, timbangan tetap{' '}
                <strong>seimbang (lurus)</strong>!
              </p>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 space-y-1">
              <p className="text-sm font-bold text-emerald-800 flex items-center gap-1.5">
                <Scale className="w-4 h-4" />
                Contoh Soal Cerita
              </p>
              <p className="text-base sm:text-lg font-semibold text-slate-900">
                Apel beratnya 150 gram dan semangka beratnya 2 kilogram (2.000 gram). Karena 2.000
                gram lebih besar dari 150 gram, maka <strong>semangka lebih berat</strong> dari apel!
              </p>
            </div>

            {/* Interactive Comparison Sandbox */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <div className="lg:col-span-4 space-y-4">
                <div>
                  <label htmlFor="left-item-select" className="block text-sm font-bold text-sky-800 mb-1.5">
                    Pilih Benda Sisi Kiri
                  </label>
                  <select
                    id="left-item-select"
                    value={leftCompare.id}
                    onChange={(e) => {
                      soundEngine.playClick();
                      const found = COMPARE_OPTIONS.find((o) => o.id === e.target.value);
                      if (found) setLeftCompare(found);
                      onCompleteLesson(5);
                    }}
                    className="w-full px-3.5 py-3 text-base font-bold bg-white border border-sky-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    {COMPARE_OPTIONS.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="right-item-select" className="block text-sm font-bold text-orange-800 mb-1.5">
                    Pilih Benda Sisi Kanan
                  </label>
                  <select
                    id="right-item-select"
                    value={rightCompare.id}
                    onChange={(e) => {
                      soundEngine.playClick();
                      const found = COMPARE_OPTIONS.find((o) => o.id === e.target.value);
                      if (found) setRightCompare(found);
                      onCompleteLesson(5);
                    }}
                    className="w-full px-3.5 py-3 text-base font-bold bg-white border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {COMPARE_OPTIONS.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-4">
                  <p className="text-xs font-bold text-slate-500 mb-1">Kesimpulan Timbangan</p>
                  <p className="text-base font-bold text-slate-900">{comparisonText}</p>
                </div>
              </div>

              <div className="lg:col-span-8">
                <BalanceScaleInteractive
                  leftGrams={leftCompare.grams}
                  rightGrams={rightCompare.grams}
                  leftItem={leftCompare.id}
                  rightItem={rightCompare.id}
                  leftLabel={leftCompare.label}
                  rightLabel={rightCompare.label}
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            disabled={step === 1}
            onClick={handlePrev}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-base transition-colors ${
              step === 1
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 cursor-pointer'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Sebelumnya</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-bold text-base text-white bg-emerald-600 hover:bg-emerald-700 transition-colors cursor-pointer"
          >
            {step < 5 ? (
              <>
                <span>Lanjut ke Bagian {step + 1}</span>
                <ArrowRight className="w-5 h-5" />
              </>
            ) : (
              <>
                <Gamepad2 className="w-5 h-5" />
                <span>Ayo Bermain Game!</span>
              </>
            )}
          </button>
        </div>
      </div>

      <MascotHelper
        message={
          step === 5
            ? 'Hebat! Semua materi sudah kamu pelajari. Sekarang waktunya bermain Game Edukasi!'
            : 'Baca pelan-pelan dan coba klik gambar atau timbangannya ya, supaya makin paham!'
        }
        mood={step === 5 ? 'cheer' : 'happy'}
      />
    </div>
  );
};
