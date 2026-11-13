import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, RotateCcw, Scale, XCircle } from 'lucide-react';
import { ItemKey } from '../../types';
import { BalanceScaleInteractive } from '../Illustrations';
import { MascotHelper } from '../MascotHelper';
import { CelebrationBurst } from '../CelebrationBurst';
import { soundEngine } from '../../utils/sound';

interface BalanceRound {
  id: number;
  leftItem: ItemKey;
  leftLabel: string;
  leftGrams: number;
  rightItem: ItemKey;
  rightLabel: string;
  rightGrams: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const BALANCE_ROUNDS: BalanceRound[] = [
  {
    id: 1,
    leftItem: 'beras',
    leftLabel: '1 kg beras',
    leftGrams: 1000,
    rightItem: 'gula',
    rightLabel: '500 gram gula',
    rightGrams: 500,
    question: 'Benda manakah yang lebih berat?',
    options: ['1 kg beras (Sisi Kiri)', '500 gram gula (Sisi Kanan)', 'Keduanya sama berat'],
    correctIndex: 0,
    explanation: '1 kg beras = 1.000 gram, lebih besar daripada 500 gram gula!',
  },
  {
    id: 2,
    leftItem: 'apel',
    leftLabel: '150 gram apel',
    leftGrams: 150,
    rightItem: 'semangka',
    rightLabel: '2 kg semangka',
    rightGrams: 2000,
    question: 'Benda manakah yang lebih ringan?',
    options: ['150 gram apel (Sisi Kiri)', '2 kg semangka (Sisi Kanan)', 'Keduanya sama berat'],
    correctIndex: 0,
    explanation: '2 kg = 2.000 gram. Jadi 150 gram apel jauh lebih ringan!',
  },
  {
    id: 3,
    leftItem: 'gula',
    leftLabel: '1 kg gula',
    leftGrams: 1000,
    rightItem: 'tepung',
    rightLabel: '1.000 gram tepung',
    rightGrams: 1000,
    question: 'Bagaimana posisi timbangan kedua benda ini?',
    options: ['Gula lebih berat', 'Tepung lebih berat', 'Sama berat (Seimbang)'],
    correctIndex: 2,
    explanation: '1 kg = 1.000 gram, jadi timbangan tetap seimbang lurus!',
  },
  {
    id: 4,
    leftItem: 'wortel',
    leftLabel: '300 gram wortel',
    leftGrams: 300,
    rightItem: 'kentang',
    rightLabel: '1 kg kentang',
    rightGrams: 1000,
    question: 'Benda manakah yang lebih berat?',
    options: ['300 gram wortel (Sisi Kiri)', '1 kg kentang (Sisi Kanan)', 'Keduanya sama berat'],
    correctIndex: 1,
    explanation: '1 kg kentang = 1.000 gram, lebih berat daripada 300 gram wortel.',
  },
  {
    id: 5,
    leftItem: 'semangka',
    leftLabel: '3 kg semangka',
    leftGrams: 3000,
    rightItem: 'mangga',
    rightLabel: '1.500 gram mangga',
    rightGrams: 1500,
    question: 'Benda manakah yang lebih berat?',
    options: ['3 kg semangka (Sisi Kiri)', '1.500 gram mangga (Sisi Kanan)', 'Keduanya sama berat'],
    correctIndex: 0,
    explanation: '3 kg semangka = 3.000 gram, lebih berat dari 1.500 gram mangga!',
  },
];

interface GameTimbanganAjaibProps {
  onRecordAnswer: (isCorrect: boolean) => void;
  onCompleteGame: () => void;
  onBackToGames: () => void;
}

export const GameTimbanganAjaib: React.FC<GameTimbanganAjaibProps> = ({
  onRecordAnswer,
  onCompleteGame,
  onBackToGames,
}) => {
  const [roundIdx, setRoundIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  const current = BALANCE_ROUNDS[roundIdx];

  const handleAnswer = (idx: number) => {
    if (revealed) return;
    setSelectedIdx(idx);

    if (idx === current.correctIndex) {
      soundEngine.playCorrect();
      setStatus('correct');
      setRevealed(true);
      setScore((s) => s + 10);
      onRecordAnswer(true);
    } else {
      soundEngine.playWrong();
      setStatus('wrong');
      onRecordAnswer(false);
    }
  };

  const handleNext = () => {
    soundEngine.playClick();
    if (roundIdx + 1 < BALANCE_ROUNDS.length) {
      setRoundIdx((i) => i + 1);
      setSelectedIdx(null);
      setRevealed(false);
      setStatus('idle');
    } else {
      soundEngine.playVictory();
      setFinished(true);
      onCompleteGame();
    }
  };

  const handleRestart = () => {
    soundEngine.playClick();
    setRoundIdx(0);
    setSelectedIdx(null);
    setRevealed(false);
    setStatus('idle');
    setFinished(false);
    setScore(0);
  };

  if (finished) {
    return (
      <div className="bg-white rounded-3xl border border-sky-100 shadow-sm p-6 sm:p-10 text-center space-y-6 animate-gentle-pop">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center">
          <Scale className="w-11 h-11" />
        </div>
        <div className="space-y-2">
          <h3 className="font-display font-extrabold text-3xl text-slate-900">
            Timbangan Ajaib Selesai!
          </h3>
          <p className="text-lg text-slate-700">
            Kamu sudah jago membandingkan berat benda! Skor game ini:{' '}
            <strong className="text-emerald-700 tabular-nums">{score} poin</strong>
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Ulangi Permainan</span>
          </button>
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              onBackToGames();
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-bold text-white bg-sky-600 hover:bg-sky-700 cursor-pointer"
          >
            <span>Pilih Game Lainnya</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-3xl border border-sky-100 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-sky-700">
              Game 4 · Ronde {roundIdx + 1} dari {BALANCE_ROUNDS.length}
            </p>
            <h3 className="font-display font-extrabold text-2xl text-slate-900">
              Timbangan Ajaib
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-emerald-700 tabular-nums">
              Skor Game: {score}
            </span>
            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi</span>
            </button>
          </div>
        </div>

        <BalanceScaleInteractive
          leftGrams={current.leftGrams}
          rightGrams={current.rightGrams}
          leftItem={current.leftItem}
          rightItem={current.rightItem}
          leftLabel={current.leftLabel}
          rightLabel={current.rightLabel}
          neutralBeforeReveal={!revealed}
        />

        <div className="space-y-4 pt-2">
          <h4 className="font-display font-bold text-xl text-center text-slate-900">
            {current.question}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {current.options.map((opt, idx) => {
              const isSelected = selectedIdx === idx;
              const isCorrect = revealed && idx === current.correctIndex;
              const isWrong = status === 'wrong' && isSelected;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleAnswer(idx)}
                  disabled={revealed}
                  className={`px-4 py-4 rounded-2xl border font-bold text-base text-center transition-all cursor-pointer ${
                    isCorrect
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 animate-gentle-pop'
                      : isWrong
                      ? 'bg-red-50 border-red-400 text-red-900 animate-gentle-wiggle'
                      : 'bg-sky-50/60 border-sky-200 hover:bg-sky-100 text-slate-900'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {status === 'correct' && (
            <div className="relative flex flex-wrap items-center justify-between gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 animate-gentle-pop">
              <CelebrationBurst active={true} />
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-emerald-900">Hore! Jawaban kamu benar! (+10 Poin)</p>
                  <p className="text-sm text-emerald-800">{current.explanation}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-display font-bold text-white bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
              >
                <span>{roundIdx + 1 < BALANCE_ROUNDS.length ? 'Lanjut' : 'Selesai'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {status === 'wrong' && (
            <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-2xl p-4 text-orange-900 font-bold text-base animate-gentle-wiggle">
              <XCircle className="w-6 h-6 text-orange-600 shrink-0" />
              <span>Belum tepat, ayo ubah kg menjadi gram dulu lalu coba lagi!</span>
            </div>
          )}
        </div>
      </div>

      <MascotHelper
        message={
          revealed
            ? 'Lihat timbangannya bergerak! Benda yang lebih berat membuat timbangan turun ke bawah.'
            : 'Samakan satuannya ke gram (1 kg = 1.000 gram) agar kamu bisa langsung tahu mana yang lebih berat!'
        }
        mood={revealed ? 'cheer' : 'happy'}
      />
    </div>
  );
};
