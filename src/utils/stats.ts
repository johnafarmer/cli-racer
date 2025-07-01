import { GameStats } from '../types/index.js';

export function calculateWPM(correctChars: number, timeInSeconds: number): number {
  if (timeInSeconds === 0) return 0;
  const minutes = timeInSeconds / 60;
  const words = correctChars / 5; // Standard: 5 characters = 1 word
  return Math.round(words / minutes);
}

export function calculateAccuracy(correct: number, total: number): number {
  if (total === 0) return 100;
  return Math.round((correct / total) * 100);
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function initializeStats(): GameStats {
  return {
    wpm: 0,
    accuracy: 100,
    correctWords: 0,
    totalWords: 0,
    correctKeystrokes: 0,
    totalKeystrokes: 0,
    timeElapsed: 0
  };
}