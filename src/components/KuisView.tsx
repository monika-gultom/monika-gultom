import React, { useState } from 'react';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Home,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import { AppSection } from '../types';
import { QUIZ_QUESTIONS } from '../data/learningContent';
import { InteractiveScale, ItemIllustration } from './Illustrations';
import { MascotHelper } from './MascotHelper';
import { CelebrationBurst } from './CelebrationBurst';
import { soundEngine } from '../utils/sound';

interface KuisViewProps {
  onRecordAnswer: (isCorrect: boolean) => void;
  onCompleteQuiz: (quizScore: number) => void;
  onNavigate: (section: AppSection) => void;
}

export const KuisView: React.FC<KuisViewProps> = ({
  onRecordAnswer,
  onCompleteQuiz,
  onNavigate,
}) => {
  const [questionIdx, setQuestionIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCorrect, setQuizCorrect] = useState(0);
  const [quizWrong, setQuizWrong] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = QUIZ_QUESTIONS[questionIdx];
  const progressPct = Math.round(((questionIdx + (answered ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100);

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelectedIdx(idx);
    setAnswered(true);

    const isCorrect = idx === current.correctIndex;
    if (isCorrect) {
      soundEngine.playCorrect();
      setQuizScore((s) => s + 10);
      setQuizCorrect((c) => c + 1);
    } else {
      soundEngine.playWrong();
      setQuizWrong((w) => w + 1);
    }
    onRecordAnswer(isCorrect);
  };

  const handleNext = () => {
    soundEngine.playClick();
    if (questionIdx + 1 < QUIZ_QUESTIONS.length) {
      setQuestionIdx((i) => i + 1);
      setSelectedIdx(null);
      setAnswered(false);
    } else {
      soundEngine.playVictory();
      setFinished(true);
      onCompleteQuiz(quizScore);
    }
  };

  const handleRestart = () => {
    soundEngine.playClick();
    setQuestionIdx(0);
    setSelectedIdx(null);
    setAnswered(false);
    setQuizScore(0);
    setQuizCorrect(0);
    setQuizWrong(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-3xl border border-amber-200 shadow-sm p-6 sm:p-10 text-center space-y-6 animate-gentle-pop">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
            <Award className="w-11 h-11" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-bold text-amber-700">Kuis Petualangan Selesai!</p>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900">
              Skor Kuis Kamu: {quizScore} / 100
            </h2>
            <p className="text-lg text-slate-700 tabular-nums">
              Jawaban Benar: <strong className="text-emerald-700">{quizCorrect} soal</strong> ·
              Jawaban Salah: <strong className="text-orange-700">{quizWrong} soal</strong>
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Ulangi Kuis</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                onNavigate('hasil');
              }}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-display font-bold text-white bg-orange-500 hover:bg-orange-600 cursor-pointer"
            >
              <Award className="w-5 h-5" />
              <span>Lihat Hasil &amp; Hadiahmu</span>
            </button>
          </div>
        </div>

        <MascotHelper
          message="Selamat! Kamu sudah menuntaskan 10 soal Kuis Petualangan Satuan Berat. Yuk buka halaman Hasil Belajar untuk melihat bintang dan gelarmu!"
          mood="cheer"
        />
      </div>
    );
  }

  const isCurrentCorrect = answered && selectedIdx === current.correctIndex;

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

        <div className="flex items-center gap-4 text-sm font-bold text-slate-700 tabular-nums">
          <span>
            Soal {questionIdx + 1} dari {QUIZ_QUESTIONS.length}
          </span>
          <span aria-hidden="true">·</span>
          <span className="text-emerald-700">Skor Kuis: {quizScore}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-2xl border border-sky-100 p-4 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-600">
          <span>
            {current.levelLabel} · {current.topic}
          </span>
          <span className="tabular-nums">{progressPct}% selesai</span>
        </div>
        <div className="w-full h-3 bg-sky-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-sky-600 transition-all duration-300 rounded-full"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl border border-sky-100 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {(current.itemVisual || current.scaleVisual) && (
            <div className="md:col-span-4 bg-sky-50 border border-sky-200 rounded-2xl p-6 flex items-center justify-center">
              {current.itemVisual && (
                <ItemIllustration item={current.itemVisual} className="w-28 h-28" />
              )}
              {current.scaleVisual && (
                <InteractiveScale
                  type={current.scaleVisual}
                  grams={current.scaleVisual === 'digital' ? 500 : 2000}
                  label={current.scaleVisual === 'digital' ? '500 g' : '2 kg'}
                  className="w-48"
                />
              )}
            </div>
          )}

          <div
            className={
              current.itemVisual || current.scaleVisual ? 'md:col-span-8 space-y-5' : 'md:col-span-12 space-y-5'
            }
          >
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 leading-snug">
              {current.question}
            </h2>

            <div className="space-y-3">
              {current.options.map((opt, idx) => {
                const letters = ['A', 'B', 'C'];
                const isSelected = selectedIdx === idx;
                const isRightOption = answered && idx === current.correctIndex;
                const isWrongSelected = answered && isSelected && idx !== current.correctIndex;

                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSelect(idx)}
                    disabled={answered}
                    className={`w-full flex items-center justify-between gap-4 px-5 py-4 rounded-2xl border text-left font-bold text-lg transition-all cursor-pointer ${
                      isRightOption
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 animate-gentle-pop'
                        : isWrongSelected
                        ? 'bg-red-50 border-red-400 text-red-900 animate-gentle-wiggle'
                        : 'bg-white border-slate-200 hover:bg-sky-50 hover:border-sky-300 text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-display font-extrabold text-base shrink-0 ${
                          isRightOption
                            ? 'bg-emerald-600 text-white'
                            : isWrongSelected
                            ? 'bg-red-500 text-white'
                            : 'bg-sky-100 text-sky-800'
                        }`}
                      >
                        {letters[idx]}
                      </span>
                      <span>{opt}</span>
                    </div>

                    {isRightOption && <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />}
                    {isWrongSelected && <XCircle className="w-6 h-6 text-red-500 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {answered && (
          <div
            className={`relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl p-5 border animate-gentle-pop ${
              isCurrentCorrect
                ? 'bg-emerald-50 border-emerald-200'
                : 'bg-orange-50 border-orange-200'
            }`}
          >
            <CelebrationBurst active={Boolean(isCurrentCorrect)} />
            <div className="space-y-1">
              <p
                className={`font-display font-extrabold text-lg flex items-center gap-2 ${
                  isCurrentCorrect ? 'text-emerald-900' : 'text-orange-900'
                }`}
              >
                {isCurrentCorrect ? (
                  <>
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    <span>Benar! (+10 Poin)</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-6 h-6 text-orange-600" />
                    <span>Kurang Tepat (0 Poin)</span>
                  </>
                )}
              </p>
              <p className="text-base text-slate-800">{current.explanation}</p>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-display font-bold text-white bg-sky-600 hover:bg-sky-700 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>
                {questionIdx + 1 < QUIZ_QUESTIONS.length ? 'Soal Berikutnya' : 'Lihat Skor Akhir'}
              </span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      <MascotHelper
        message={
          !answered
            ? 'Baca soal pelan-pelan ya! Pilih salah satu jawaban A, B, atau C.'
            : isCurrentCorrect
            ? 'Hore! Jawabanmu benar sekali! Teruskan semangatmu!'
            : 'Tidak apa-apa salah satu kali! Baca penjelasannya supaya makin paham ya!'
        }
        mood={!answered ? 'happy' : isCurrentCorrect ? 'cheer' : 'encourage'}
      />
    </div>
  );
};
