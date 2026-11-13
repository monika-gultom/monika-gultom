export type AppSection = 'beranda' | 'materi' | 'permainan' | 'kuis' | 'hasil';

export type GameId = 'tebak-berat' | 'pasangkan' | 'pasar-ceria' | 'timbangan-ajaib';

export type ItemKey =
  | 'beras'
  | 'gula'
  | 'apel'
  | 'semangka'
  | 'tepung'
  | 'buku'
  | 'cokelat'
  | 'jeruk'
  | 'mangga'
  | 'wortel'
  | 'kentang';

export type ScaleType = 'digital' | 'jarum' | 'duduk';

export interface LearningItem {
  id: ItemKey;
  name: string;
  weightLabel: string;
  weightGrams: number;
  description: string;
  unitHint: 'kg' | 'g';
}

export interface ScaleToolInfo {
  id: ScaleType;
  name: string;
  subtitle: string;
  description: string;
  whereFound: string;
  sampleItem: ItemKey;
  sampleWeightLabel: string;
  sampleGrams: number;
}

export interface QuizQuestion {
  id: number;
  levelLabel: string;
  topic: string;
  question: string;
  itemVisual?: ItemKey;
  scaleVisual?: ScaleType;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface StudentProgress {
  studentName: string;
  totalScore: number;
  correctCount: number;
  wrongCount: number;
  completedLessons: number[];
  completedGames: GameId[];
  quizCompleted: boolean;
  quizBestScore: number;
}
