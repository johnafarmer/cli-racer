import wordsData from '../../assets/words.json' with { type: 'json' };
import { Difficulty } from '../types/index.js';

export function getRandomWords(_difficulty: Difficulty, count: number): string[] {
  // Combine all words into one big list
  const allWords = [
    ...wordsData.easy,
    ...wordsData.medium,
    ...wordsData.hard,
    ...wordsData.programming
  ];
  
  const words: string[] = [];
  
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * allWords.length);
    words.push(allWords[randomIndex]);
  }
  
  return words;
}

export function shuffleWords(words: string[]): string[] {
  const shuffled = [...words];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}