import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';
import { AppSection, GameId, StudentProgress } from './types';
import { BerandaView } from './components/BerandaView';
import { MateriView } from './components/MateriView';
import { PermainanView } from './components/PermainanView';
import { KuisView } from './components/KuisView';
import { HasilView } from './components/HasilView';
import { soundEngine } from './utils/sound';

const STORAGE_KEY = 'petualangan_satuan_berat_v1';

const DEFAULT_PROGRESS: StudentProgress = {
  studentName: 'Petualang Cilik',
  totalScore: 0,
  correctCount: 0,
  wrongCount: 0,
  completedLessons: [],
  completedGames: [],
  quizCompleted: false,
  quizBestScore: 0,
};

function getTitleLabel(score: number): string {
  if (score >= 200) return 'Juara Satuan Berat';
  if (score >= 100) return 'Ahli Timbangan';
  return 'Bintang Pemula';
}

const NAV_ITEMS: { id: AppSection; label: string }[] = [
  { id: 'beranda', label: 'Beranda' },
  { id: 'materi', label: 'Materi' },
  { id: 'permainan', label: 'Permainan' },
  { id: 'kuis', label: 'Kuis' },
  { id: 'hasil', label: 'Hasil Belajar' },
];

export default function App() {
  const [section, setSection] = useState<AppSection>('beranda');
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [progress, setProgress] = useState<StudentProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_PROGRESS, ...JSON.parse(saved) };
      }
    } catch {
      // Ignore storage errors
    }
    return DEFAULT_PROGRESS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage errors
    }
  }, [progress]);

  useEffect(() => {
    soundEngine.setEnabled(soundOn);
  }, [soundOn]);

  const handleNavigate = (target: AppSection) => {
    setSection(target);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNameChange = (name: string) => {
    setProgress((prev) => ({ ...prev, studentName: name }));
  };

  const handleRecordAnswer = (isCorrect: boolean) => {
    setProgress((prev) => ({
      ...prev,
      totalScore: prev.totalScore + (isCorrect ? 10 : 0),
      correctCount: prev.correctCount + (isCorrect ? 1 : 0),
      wrongCount: prev.wrongCount + (isCorrect ? 0 : 1),
    }));
  };

  const handleCompleteLesson = (lessonId: number) => {
    setProgress((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
      };
    });
  };

  const handleCompleteGame = (gameId: GameId) => {
    setProgress((prev) => {
      if (prev.completedGames.includes(gameId)) return prev;
      return {
        ...prev,
        completedGames: [...prev.completedGames, gameId],
      };
    });
  };

  const handleCompleteQuiz = (quizScore: number) => {
    setProgress((prev) => ({
      ...prev,
      quizCompleted: true,
      quizBestScore: Math.max(prev.quizBestScore, quizScore),
    }));
  };

  const handleResetAll = () => {
    setProgress((prev) => ({
      ...DEFAULT_PROGRESS,
      studentName: prev.studentName,
    }));
    setSection('beranda');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    soundEngine.setEnabled(next);
    if (next) soundEngine.playClick();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F9FF] text-slate-900">
      {/* 3-Zone Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-sky-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Title */}
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              handleNavigate('beranda');
            }}
            className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-sky-800 whitespace-nowrap shrink-0 cursor-pointer text-left"
          >
            Petualangan Satuan Berat
          </button>

          {/* Zone 2: Desktop Single-Line Navigation Links */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Navigasi Utama">
            {NAV_ITEMS.map((item) => {
              const active = section === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    handleNavigate(item.id);
                  }}
                  className={`py-1 text-base font-bold transition-colors whitespace-nowrap shrink-0 border-b-2 cursor-pointer ${
                    active
                      ? 'text-sky-700 border-sky-600'
                      : 'text-slate-600 border-transparent hover:text-sky-700 hover:border-sky-300'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Control (Sound Toggle) + Mobile Drawer Trigger */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={toggleSound}
              aria-label={soundOn ? 'Matikan efek suara' : 'Nyalakan efek suara'}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                soundOn
                  ? 'bg-sky-50 text-sky-800 border-sky-200 hover:bg-sky-100'
                  : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
              }`}
            >
              {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">{soundOn ? 'Suara Nyala' : 'Suara Mati'}</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
              className="md:hidden p-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        {mobileMenuOpen && (
          <nav
            className="md:hidden border-t border-sky-100 bg-white px-4 py-3 grid grid-cols-2 gap-2"
            aria-label="Menu Mobile"
          >
            {NAV_ITEMS.map((item) => {
              const active = section === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    handleNavigate(item.id);
                  }}
                  className={`px-3 py-2.5 rounded-xl text-sm font-bold text-left transition-colors cursor-pointer ${
                    active
                      ? 'bg-sky-600 text-white'
                      : 'bg-sky-50/70 text-slate-700 hover:bg-sky-100'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Clean Unboxed Score & Student Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-sky-100 text-sm font-bold text-slate-700">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-900">
              Siswa: {progress.studentName.trim() || 'Petualang Cilik'}
            </span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span className="text-sky-700">Gelar: {getTitleLabel(progress.totalScore)}</span>
          </div>

          <div className="flex items-center gap-3 tabular-nums">
            <span className="text-emerald-700">Total Poin: {progress.totalScore}</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span>Benar: {progress.correctCount}</span>
          </div>
        </div>

        {section === 'beranda' && (
          <BerandaView
            progress={progress}
            onNameChange={handleNameChange}
            onNavigate={handleNavigate}
          />
        )}

        {section === 'materi' && (
          <MateriView
            completedLessons={progress.completedLessons}
            onCompleteLesson={handleCompleteLesson}
            onNavigate={handleNavigate}
          />
        )}

        {section === 'permainan' && (
          <PermainanView
            completedGames={progress.completedGames}
            onRecordAnswer={handleRecordAnswer}
            onCompleteGame={handleCompleteGame}
            onNavigate={handleNavigate}
          />
        )}

        {section === 'kuis' && (
          <KuisView
            onRecordAnswer={handleRecordAnswer}
            onCompleteQuiz={handleCompleteQuiz}
            onNavigate={handleNavigate}
          />
        )}

        {section === 'hasil' && (
          <HasilView
            progress={progress}
            onNameChange={handleNameChange}
            onResetAll={handleResetAll}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-sky-100 bg-white mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-semibold text-slate-500">
          <span>Petualangan Satuan Berat · Matematika Kelas 3 SD</span>
          <span>Belajar Mengenal Kilogram (kg) dan Gram (g)</span>
        </div>
      </footer>
    </div>
  );
}
