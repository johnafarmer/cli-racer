export type GameMode = 'words' | 'time' | 'vibe';
export type Difficulty = 'easy' | 'medium' | 'hard' | 'programming';

export interface GameConfig {
  difficulty: Difficulty;
  wordCount?: number;
  timeLimit?: number;
}

export interface GameStats {
  wpm: number;
  accuracy: number;
  correctWords: number;
  totalWords: number;
  correctKeystrokes: number;
  totalKeystrokes: number;
  timeElapsed: number;
}

export interface Word {
  text: string;
  display: string;
  completed: boolean;
  current: boolean;
}

export interface GameState {
  words: Word[];
  currentWordIndex: number;
  currentInput: string;
  stats: GameStats;
  isPlaying: boolean;
  isFinished: boolean;
  startTime?: number;
  endTime?: number;
}