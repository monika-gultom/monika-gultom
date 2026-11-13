import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, RotateCcw, XCircle } from 'lucide-react';
import { ItemKey } from '../../types';
import { ItemIllustration } from '../Illustrations';
import { MascotHelper } from '../MascotHelper';
import { CelebrationBurst } from '../CelebrationBurst';
import { soundEngine } from '../../utils/sound';

interface TebakRound {
  id: number;
  item: ItemKey;
  title: string;
  hint: string;
  options: string[];
  correctIndex: number;
}

const ROUNDS: TebakRound[] = [
  {
    id: 1,
    item: 'semangka',
    title: 'Satu Buah Semangka Besar',
    hint: 'Semangka cukup berat saat diangkat dengan dua tangan.',
    options: ['10 gram', '2 kilogram', '5 gram'],
    correctIndex: 1,
  },
  {
    id: 2,
    item: 'apel',
    title: 'Satu Buah Apel Segar',
    hint: 'Apel berukuran kecil dan ringan di satu genggaman tangan.',
    options: ['150 gram', '20 kilogram', '50 kilogram'],
    correctIndex: 0,
  },
  {
    id: 3,
    item: 'beras',
    title: 'Satu Karung Beras',
    hint: 'Karung beras di dapur biasanya cukup berat.',
    options: ['5 gram', '5 kilogram', '10 gram'],
    correctIndex: 1,
  },
  {
    id: 4,
    item: 'cokelat',
    title: 'Sebatang Cokelat',
    hint: 'Cokelat jajanan ringan ukurannya kecil.',
    options: ['100 gram', '10 kilogram', '50 kilogram'],
    correctIndex: 0,
  },
  {
    id: 5,
    item: 'gula',
    title: 'Sebungkus Gula Pasir Kemasan',
    hint: 'Gula kemasan standar di warung memiliki berat 1.000 gram.',
    options: ['2 gram', '1 kilogram', '100 kilogram'],
    correctIndex: 1,
  },
  {
    id: 6,
    item: 'buku',
    title: 'Satu Buku Pelajaran Matematika',
    hint: 'Satu buku pelajaran tidak sampai 1 kilogram.',
    options: ['300 gram', '30 kilogram', '100 kilogram'],
    correctIndex: 0,
  },
];

interface GameTebakBeratProps {
  onRecordAnswer: (isCorrect: boolean) => void;
  onCompleteGame: () => void;
  onBackToGames: () => void;
}

export const GameTebakBerat: React.FC<GameTebakBeratProps> = ({
  onRecordAnswer,
  onCompleteGame,
  onBackToGames,
}) => {
  const [roundIdx, setRoundIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [roundSolved, setRoundSolved] = useState(false);
  const [finished, setFinished] = useState(false);
  const [sessionScore, setSessionScore] = useState(0);

  const current = ROUNDS[roundIdx];

  const handleChoose = (idx: number) => {
    if (roundSolved) return;
    setSelectedIdx(idx);

    if (idx === current.correctIndex) {
      soundEngine.playCorrect();
      setStatus('correct');
      setRoundSolved(true);
      setSessionScore((prev) => prev + 10);
      onRecordAnswer(true);
    } else {
      soundEngine.playWrong();
      setStatus('wrong');
      onRecordAnswer(false);
    }
  };

  const handleNext = () => {
    soundEngine.playClick();
    if (roundIdx + 1 < ROUNDS.length) {
      setRoundIdx((prev) => prev + 1);
      setSelectedIdx(null);
      setStatus('idle');
      setRoundSolved(false);
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
    setStatus('idle');
    setRoundSolved(false);
    setFinished(false);
    setSessionScore(0);
  };

  if (finished) {
    return (
      <div className="bg-white rounded-3xl border border-sky-100 shadow-sm p-6 sm:p-10 text-center space-y-6 animate-gentle-pop">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
          <CheckCircle2 className="w-11 h-11" />
        </div>
        <div className="space-y-2">
          <h3 className="font-display font-extrabold text-3xl text-slate-900">
            Yeay! Kamu Menyelesaikan Tebak Berat Benda!
          </h3>
          <p className="text-lg text-slate-700">
            Total poin yang kamu kumpulkan di game ini:{' '}
            <strong className="text-emerald-700 tabular-nums">{sessionScore} poin</strong>
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
              Game 1 · Soal {roundIdx + 1} dari {ROUNDS.length}
            </p>
            <h3 className="font-display font-extrabold text-2xl text-slate-900">
              Tebak Berat Benda
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-emerald-700 tabular-nums">
              Skor Game: {sessionScore}
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

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-5 bg-sky-50 border border-sky-200 rounded-2xl p-6 flex flex-col items-center text-center gap-3">
            <ItemIllustration item={current.item} className="w-32 h-32" />
            <h4 className="font-display font-bold text-xl text-slate-900">{current.title}</h4>
            <p className="text-sm text-slate-600">{current.hint}</p>
          </div>

          <div className="md:col-span-7 space-y-4">
            <p className="font-display font-bold text-xl text-slate-900">
              Berapa perkiraan berat benda di samping?
            </p>

            <div className="space-y-3">
              {current.options.map((opt, idx) => {
                const letters = ['A', 'B', 'C'];
                const isSelected = selectedIdx === idx;
                const isCorrectChoice = roundSolved && idx === current.correctIndex;
                const isWrongChoice = status === 'wrong' && isSelected;

                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleChoose(idx)}
                    disabled={roundSolved}
                    className={`w-full flex items-center justify-between gap-4 px-5 py-4 rounded-2xl border text-left font-bold text-lg transition-all cursor-pointer ${
                      isCorrectChoice
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 animate-gentle-pop'
                        : isWrongChoice
                        ? 'bg-red-50 border-red-400 text-red-900 animate-gentle-wiggle'
                        : 'bg-white border-slate-200 hover:bg-sky-50 hover:border-sky-300 text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-display font-extrabold text-base ${
                          isCorrectChoice
                            ? 'bg-emerald-600 text-white'
                            : isWrongChoice
                            ? 'bg-red-500 text-white'
                            : 'bg-sky-100 text-sky-800'
                        }`}
                      >
                        {letters[idx]}
                      </span>
                      <span className="tabular-nums">{opt}</span>
                    </div>

                    {isCorrectChoice && <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />}
                    {isWrongChoice && <XCircle className="w-6 h-6 text-red-500 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {status === 'correct' && (
              <div className="relative flex flex-wrap items-center justify-between gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 animate-gentle-pop">
                <CelebrationBurst active={true} />
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-base sm:text-lg">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  <span>Hore! Jawaban kamu benar! (+10 Poin)</span>
                </div>
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-display font-bold text-white bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
                >
                  <span>{roundIdx + 1 < ROUNDS.length ? 'Soal Berikutnya' : 'Selesai'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {status === 'wrong' && (
              <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-2xl p-4 text-orange-900 font-bold text-base animate-gentle-wiggle">
                <XCircle className="w-6 h-6 text-orange-600 shrink-0" />
                <span>Belum tepat, ayo coba lagi!</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <MascotHelper
        message={
          status === 'correct'
            ? 'Hore! Kamu hebat sekali menebak berat benda!'
            : status === 'wrong'
            ? 'Belum tepat, ingat kembali: gram untuk benda ringan, kilogram untuk benda berat ya!'
            : 'Perhatikan ukuran benda di gambar, lalu pilih perkiraan berat yang paling masuk akal!'
        }
        mood={status === 'correct' ? 'cheer' : status === 'wrong' ? 'encourage' : 'happy'}
      />
    </div>
  );
};
