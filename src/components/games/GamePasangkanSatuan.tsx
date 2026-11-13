import React, { useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, GripVertical, RotateCcw } from 'lucide-react';
import { MascotHelper } from '../MascotHelper';
import { soundEngine } from '../../utils/sound';

interface MatchPair {
  id: number;
  kgText: string;
  gramText: string;
}

const BASE_PAIRS: MatchPair[] = [
  { id: 1, kgText: '1 kg', gramText: '1.000 gram' },
  { id: 2, kgText: '2 kg', gramText: '2.000 gram' },
  { id: 3, kgText: '3 kg', gramText: '3.000 gram' },
  { id: 4, kgText: '4 kg', gramText: '4.000 gram' },
  { id: 5, kgText: '5 kg', gramText: '5.000 gram' },
];

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

interface GamePasangkanSatuanProps {
  onRecordAnswer: (isCorrect: boolean) => void;
  onCompleteGame: () => void;
  onBackToGames: () => void;
}

export const GamePasangkanSatuan: React.FC<GamePasangkanSatuanProps> = ({
  onRecordAnswer,
  onCompleteGame,
  onBackToGames,
}) => {
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const [selectedKgId, setSelectedKgId] = useState<number | null>(null);
  const [draggedKgId, setDraggedKgId] = useState<number | null>(null);
  const [matchedIds, setMatchedIds] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<{ type: 'idle' | 'correct' | 'wrong'; text: string }>({
    type: 'idle',
    text: 'Seret kartu Kilogram (kg) ke kartu Gram (g) yang cocok, atau klik dua kartu yang berpasangan!',
  });

  const shuffledGrams = useMemo(() => {
    void shuffleSeed;
    return shuffleArray(BASE_PAIRS);
  }, [shuffleSeed]);

  const tryMatch = (kgId: number, gramId: number) => {
    if (matchedIds.includes(kgId) || matchedIds.includes(gramId)) return;

    if (kgId === gramId) {
      soundEngine.playCorrect();
      const updated = [...matchedIds, kgId];
      setMatchedIds(updated);
      setSelectedKgId(null);
      setDraggedKgId(null);
      onRecordAnswer(true);

      if (updated.length === BASE_PAIRS.length) {
        soundEngine.playVictory();
        onCompleteGame();
        setFeedback({
          type: 'correct',
          text: 'Hebat! Semua 5 pasangan satuan berat sudah cocok!',
        });
      } else {
        setFeedback({
          type: 'correct',
          text: `Hore! ${kgId} kg sama dengan ${kgId}.000 gram! (+10 Poin)`,
        });
      }
    } else {
      soundEngine.playWrong();
      setSelectedKgId(null);
      setDraggedKgId(null);
      onRecordAnswer(false);
      setFeedback({
        type: 'wrong',
        text: 'Belum cocok! Ingat: 1 kg = 1.000 gram. Ayo coba lagi!',
      });
    }
  };

  const handleRestart = () => {
    soundEngine.playClick();
    setMatchedIds([]);
    setSelectedKgId(null);
    setDraggedKgId(null);
    setShuffleSeed((s) => s + 1);
    setFeedback({
      type: 'idle',
      text: 'Seret kartu Kilogram (kg) ke kartu Gram (g) yang cocok, atau klik dua kartu yang berpasangan!',
    });
  };

  const allDone = matchedIds.length === BASE_PAIRS.length;

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-3xl border border-sky-100 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-emerald-700">
              Game 2 · {matchedIds.length} dari {BASE_PAIRS.length} pasangan cocok
            </p>
            <h3 className="font-display font-extrabold text-2xl text-slate-900">
              Pasangkan Satuan Berat
            </h3>
          </div>

          <button
            type="button"
            onClick={handleRestart}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Ulangi Permainan</span>
          </button>
        </div>

        {/* Status Feedback */}
        <div
          className={`rounded-2xl p-4 border font-bold text-base ${
            feedback.type === 'correct'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : feedback.type === 'wrong'
              ? 'bg-orange-50 border-orange-200 text-orange-900 animate-gentle-wiggle'
              : 'bg-sky-50 border-sky-200 text-sky-900'
          }`}
        >
          {feedback.text}
        </div>

        {/* Matching Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-display font-bold text-lg text-sky-900">
              Satuan Kilogram (kg)
            </h4>
            {BASE_PAIRS.map((pair) => {
              const isMatched = matchedIds.includes(pair.id);
              const isSelected = selectedKgId === pair.id;
              return (
                <button
                  key={pair.id}
                  type="button"
                  draggable={!isMatched}
                  onDragStart={(e) => {
                    setDraggedKgId(pair.id);
                    e.dataTransfer.setData('text/plain', String(pair.id));
                  }}
                  onClick={() => {
                    if (isMatched) return;
                    soundEngine.playClick();
                    setSelectedKgId(isSelected ? null : pair.id);
                  }}
                  disabled={isMatched}
                  className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl border font-display font-extrabold text-xl transition-all tabular-nums ${
                    isMatched
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-700 opacity-75 cursor-default'
                      : isSelected
                      ? 'bg-sky-600 border-sky-600 text-white shadow-sm scale-[1.02] cursor-pointer'
                      : 'bg-sky-50/80 border-sky-200 text-slate-900 hover:bg-sky-100 cursor-grab active:cursor-grabbing'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {!isMatched && <GripVertical className="w-5 h-5 opacity-50" />}
                    <span>{pair.kgText}</span>
                  </div>
                  {isMatched && <CheckCircle2 className="w-6 h-6 text-emerald-600" />}
                </button>
              );
            })}
          </div>

          <div className="space-y-3">
            <h4 className="font-display font-bold text-lg text-orange-900">
              Satuan Gram (g)
            </h4>
            {shuffledGrams.map((pair) => {
              const isMatched = matchedIds.includes(pair.id);
              return (
                <button
                  key={pair.id}
                  type="button"
                  onDragOver={(e) => {
                    if (!isMatched) e.preventDefault();
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (isMatched) return;
                    const dataId = Number(e.dataTransfer.getData('text/plain')) || draggedKgId;
                    if (dataId) tryMatch(dataId, pair.id);
                  }}
                  onClick={() => {
                    if (isMatched) return;
                    if (selectedKgId !== null) {
                      tryMatch(selectedKgId, pair.id);
                    } else {
                      soundEngine.playClick();
                      setFeedback({
                        type: 'idle',
                        text: 'Pilih kartu di sebelah kiri (kg) dulu, lalu klik pasangannya di sini!',
                      });
                    }
                  }}
                  disabled={isMatched}
                  className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl border font-display font-extrabold text-xl transition-all tabular-nums ${
                    isMatched
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-700 animate-gentle-pop cursor-default'
                      : selectedKgId !== null
                      ? 'bg-orange-50 border-orange-300 hover:bg-orange-100 text-slate-900 cursor-pointer'
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-900 cursor-pointer'
                  }`}
                >
                  <span>{pair.gramText}</span>
                  {isMatched ? (
                    <span className="text-sm font-bold text-emerald-700 inline-flex items-center gap-1">
                      <CheckCircle2 className="w-5 h-5" />
                      Cocok ({pair.kgText})
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-slate-500">
                      {selectedKgId !== null ? 'Klik untuk cocokkan' : 'Taruh di sini'}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {allDone && (
          <div className="flex flex-wrap items-center justify-between gap-4 bg-emerald-50 border border-emerald-200 rounded-2xl p-5 animate-gentle-pop">
            <div>
              <h4 className="font-display font-extrabold text-xl text-emerald-900">
                Luar Biasa! Semua Satuan Berat Berhasil Dipasangkan!
              </h4>
              <p className="text-base text-emerald-800">
                Kamu sudah jago mengubah kilogram menjadi gram!
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                onBackToGames();
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-display font-bold text-white bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
            >
              <span>Pilih Game Lain</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      <MascotHelper
        message={
          allDone
            ? 'Keren sekali! Kamu mengerti bahwa setiap 1 kg itu sama dengan 1.000 gram!'
            : 'Kamu bisa menyeret kartu sebelah kiri ke kanan, atau klik satu kartu kiri lalu klik pasangannya di kanan!'
        }
        mood={allDone ? 'cheer' : 'happy'}
      />
    </div>
  );
};
