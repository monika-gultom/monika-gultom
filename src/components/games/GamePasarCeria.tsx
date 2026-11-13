import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, RotateCcw, ShoppingBasket, XCircle } from 'lucide-react';
import { ItemKey } from '../../types';
import { ItemIllustration, ResilientImage } from '../Illustrations';
import { MascotHelper } from '../MascotHelper';
import { soundEngine } from '../../utils/sound';

interface MarketProduct {
  id: ItemKey;
  name: string;
  weightLabel: string;
  grams: number;
}

const MARKET_PRODUCTS: MarketProduct[] = [
  { id: 'apel', name: 'Apel', weightLabel: '200 g', grams: 200 },
  { id: 'jeruk', name: 'Jeruk', weightLabel: '1 kg', grams: 1000 },
  { id: 'mangga', name: 'Mangga', weightLabel: '600 g', grams: 600 },
  { id: 'semangka', name: 'Semangka', weightLabel: '3 kg', grams: 3000 },
  { id: 'wortel', name: 'Wortel', weightLabel: '150 g', grams: 150 },
  { id: 'kentang', name: 'Kentang', weightLabel: '800 g', grams: 800 },
];

interface MarketMission {
  id: number;
  title: string;
  instruction: string;
  targetDescription: string;
  type: 'single' | 'accumulate';
  targetItem?: ItemKey;
  targetGrams?: number;
  checkProduct: (p: MarketProduct) => boolean;
}

const MISSIONS: MarketMission[] = [
  {
    id: 1,
    title: 'Misi 1 dari 4',
    instruction: 'Pilih buah dengan berat tepat 1 kg!',
    targetDescription: 'Cari buah yang beratnya 1 kg di rak pasar.',
    type: 'single',
    checkProduct: (p) => p.grams === 1000,
  },
  {
    id: 2,
    title: 'Misi 2 dari 4',
    instruction: 'Pilih benda yang lebih berat dari 500 gram!',
    targetDescription: 'Boleh pilih buah atau sayur yang beratnya di atas 500 g.',
    type: 'single',
    checkProduct: (p) => p.grams > 500,
  },
  {
    id: 3,
    title: 'Misi 3 dari 4',
    instruction: 'Belilah 2 kg jeruk ke dalam keranjang!',
    targetDescription: 'Setiap kantong jeruk beratnya 1 kg. Masukkan sampai 2 kg!',
    type: 'accumulate',
    targetItem: 'jeruk',
    targetGrams: 2000,
    checkProduct: (p) => p.id === 'jeruk',
  },
  {
    id: 4,
    title: 'Misi 4 dari 4',
    instruction: 'Pilih benda yang paling ringan di toko ini!',
    targetDescription: 'Bandingkan semua angka berat, pilih yang paling kecil.',
    type: 'single',
    checkProduct: (p) => p.id === 'wortel',
  },
];

interface GamePasarCeriaProps {
  onRecordAnswer: (isCorrect: boolean) => void;
  onCompleteGame: () => void;
  onBackToGames: () => void;
}

export const GamePasarCeria: React.FC<GamePasarCeriaProps> = ({
  onRecordAnswer,
  onCompleteGame,
  onBackToGames,
}) => {
  const [missionIdx, setMissionIdx] = useState(0);
  const [basketGrams, setBasketGrams] = useState(0);
  const [basketItems, setBasketItems] = useState<string[]>([]);
  const [missionDone, setMissionDone] = useState(false);
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [allCompleted, setAllCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const currentMission = MISSIONS[missionIdx];

  const handleBuy = (product: MarketProduct) => {
    if (missionDone) return;

    if (currentMission.type === 'single') {
      if (currentMission.checkProduct(product)) {
        soundEngine.playCorrect();
        setBasketGrams(product.grams);
        setBasketItems([`${product.name} (${product.weightLabel})`]);
        setMissionDone(true);
        setStatus('correct');
        setScore((s) => s + 10);
        setFeedbackMsg(`Hore! Pilihan tepat: ${product.name} (${product.weightLabel})! (+10 Poin)`);
        onRecordAnswer(true);
      } else {
        soundEngine.playWrong();
        setStatus('wrong');
        setFeedbackMsg(`Ups, ${product.name} (${product.weightLabel}) belum sesuai misi. Ayo pilih lagi!`);
        onRecordAnswer(false);
      }
      return;
    }

    // Accumulate mission (e.g. 2 kg jeruk)
    if (currentMission.checkProduct(product)) {
      const nextGrams = basketGrams + product.grams;
      const nextItems = [...basketItems, `${product.name} (${product.weightLabel})`];
      setBasketGrams(nextGrams);
      setBasketItems(nextItems);

      if (currentMission.targetGrams && nextGrams >= currentMission.targetGrams) {
        soundEngine.playCorrect();
        setMissionDone(true);
        setStatus('correct');
        setScore((s) => s + 10);
        setFeedbackMsg('Hore! Keranjangmu sudah berisi tepat 2 kg jeruk! (+10 Poin)');
        onRecordAnswer(true);
      } else {
        soundEngine.playClick();
        setStatus('idle');
        setFeedbackMsg(`Bagus! Baru ${nextGrams / 1000} kg jeruk di keranjang. Tambah 1 kg lagi ya!`);
      }
    } else {
      soundEngine.playWrong();
      setStatus('wrong');
      setFeedbackMsg(`Di misi ini kita butuh ${currentMission.targetItem}, bukan ${product.name.toLowerCase()}!`);
      onRecordAnswer(false);
    }
  };

  const handleNextMission = () => {
    soundEngine.playClick();
    if (missionIdx + 1 < MISSIONS.length) {
      setMissionIdx((i) => i + 1);
      setBasketGrams(0);
      setBasketItems([]);
      setMissionDone(false);
      setStatus('idle');
      setFeedbackMsg('');
    } else {
      soundEngine.playVictory();
      setAllCompleted(true);
      onCompleteGame();
    }
  };

  const handleRestart = () => {
    soundEngine.playClick();
    setMissionIdx(0);
    setBasketGrams(0);
    setBasketItems([]);
    setMissionDone(false);
    setStatus('idle');
    setFeedbackMsg('');
    setAllCompleted(false);
    setScore(0);
  };

  if (allCompleted) {
    return (
      <div className="bg-white rounded-3xl border border-sky-100 shadow-sm p-6 sm:p-10 text-center space-y-6 animate-gentle-pop">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
          <ShoppingBasket className="w-11 h-11" />
        </div>
        <div className="space-y-2">
          <h3 className="font-display font-extrabold text-3xl text-slate-900">
            Belanja di Pasar Ceria Selesai!
          </h3>
          <p className="text-lg text-slate-700">
            Kamu pembeli yang sangat teliti! Skor dari game ini:{' '}
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
      <div className="bg-white rounded-3xl border border-orange-100 shadow-sm overflow-hidden">
        {/* Market Header Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch border-b border-orange-100">
          <div className="lg:col-span-5 h-44 lg:h-auto bg-orange-50">
            <ResilientImage
              src="/src/assets/images/pasar_ceria_banner_1794552842011.jpg"
              alt="Suasana Pasar Ceria menjual buah dan sayur segar"
              fallbackTitle="Toko Buah & Sayur Pasar Ceria"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-7 p-6 flex flex-col justify-between gap-4 bg-amber-50/50">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold text-orange-800">
                Game 3 · Petualangan Pasar Ceria · {currentMission.title}
              </span>
              <button
                type="button"
                onClick={handleRestart}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ulangi</span>
              </button>
            </div>

            <div className="space-y-1">
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
                {currentMission.instruction}
              </h3>
              <p className="text-base text-slate-700">{currentMission.targetDescription}</p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-amber-200 rounded-2xl px-4 py-3">
              <div className="flex items-center gap-2.5">
                <ShoppingBasket className="w-6 h-6 text-orange-600" />
                <div>
                  <p className="text-xs font-bold text-slate-500">Isi Keranjang Belanja</p>
                  <p className="font-display font-bold text-base text-slate-900">
                    {basketItems.length > 0 ? basketItems.join(', ') : 'Masih kosong'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-500">Berat Keranjang</p>
                <p className="font-display font-extrabold text-lg text-emerald-700 tabular-nums">
                  {basketGrams >= 1000
                    ? `${(basketGrams / 1000).toFixed(basketGrams % 1000 === 0 ? 0 : 1)} kg`
                    : `${basketGrams} g`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Market Stall Grid */}
        <div className="p-6 sm:p-8 space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {MARKET_PRODUCTS.map((product) => (
              <button
                key={product.id}
                type="button"
                onClick={() => handleBuy(product)}
                disabled={missionDone}
                className="group bg-sky-50/50 hover:bg-orange-50 border border-slate-200 hover:border-orange-400 rounded-2xl p-4 flex flex-col items-center text-center gap-2.5 transition-all hover:-translate-y-0.5 cursor-pointer disabled:opacity-70"
              >
                <ItemIllustration item={product.id} className="w-20 h-20 group-hover:scale-105 transition-transform" />
                <div>
                  <p className="font-display font-bold text-lg text-slate-900">{product.name}</p>
                  <p className="font-bold text-base text-orange-700 tabular-nums">{product.weightLabel}</p>
                </div>
                <span className="w-full py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-colors">
                  Pilih
                </span>
              </button>
            ))}
          </div>

          {feedbackMsg && (
            <div
              className={`flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4 border font-bold text-base ${
                status === 'correct'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900 animate-gentle-pop'
                  : status === 'wrong'
                  ? 'bg-orange-50 border-orange-200 text-orange-900 animate-gentle-wiggle'
                  : 'bg-sky-50 border-sky-200 text-sky-900'
              }`}
            >
              <div className="flex items-center gap-2">
                {status === 'correct' && <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />}
                {status === 'wrong' && <XCircle className="w-6 h-6 text-orange-600 shrink-0" />}
                <span>{feedbackMsg}</span>
              </div>

              {missionDone && (
                <button
                  type="button"
                  onClick={handleNextMission}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-display font-bold text-white bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
                >
                  <span>{missionIdx + 1 < MISSIONS.length ? 'Misi Berikutnya' : 'Selesai Belanja'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <MascotHelper
        message={
          status === 'correct'
            ? 'Mantap! Kamu pintar sekali berbelanja sesuai ukuran berat!'
            : 'Perhatikan tulisan kg dan gram di bawah setiap buah dan sayur sebelum memilih ya!'
        }
        mood={status === 'correct' ? 'cheer' : 'happy'}
      />
    </div>
  );
};
