import { useState, useEffect, useCallback } from 'react';
import { GameState, GameConfig, GameMode } from '../types/index.js';
import { getRandomWords } from '../utils/words.js';
import { calculateWPM, calculateAccuracy, initializeStats } from '../utils/stats.js';

export function useGameEngine(config: GameConfig & { mode: GameMode }) {
  const [gameState, setGameState] = useState<GameState>(() => {
    // For vibe mode, start with more words and we'll add more dynamically
    const wordCount = config.mode === 'words' ? config.wordCount! :
                      config.mode === 'vibe' ? 100 : 50;
    const words = getRandomWords(config.difficulty, wordCount);

    return {
      words: words.map((text, index) => ({
        text,
        display: text,
        completed: false,
        current: index === 0
      })),
      currentWordIndex: 0,
      currentInput: '',
      stats: initializeStats(),
      isPlaying: false,
      isFinished: false
    };
  });

  const [timeRemaining, setTimeRemaining] = useState(config.timeLimit || 0);

  // Start game
  const startGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isPlaying: true,
      startTime: Date.now()
    }));
  }, []);

  // Handle input
  const handleInput = useCallback((input: string, isSpace: boolean = false) => {
    if (!gameState.isPlaying || gameState.isFinished) return;
    
    // Handle space - move to next word regardless of correctness
    if (isSpace) {
      setGameState(prev => {
        const newWords = [...prev.words];
        const currentWord = prev.words[prev.currentWordIndex];
        const isCorrect = prev.currentInput === currentWord.text;

        newWords[prev.currentWordIndex].completed = true;

        const nextIndex = prev.currentWordIndex + 1;

        // For vibe mode, generate more words if we're getting close to the end
        if (config.mode === 'vibe' && nextIndex >= prev.words.length - 20) {
          const additionalWords = getRandomWords(config.difficulty, 50);
          const newWordObjects = additionalWords.map(text => ({
            text,
            display: text,
            completed: false,
            current: false
          }));
          newWords.push(...newWordObjects);
        }

        const isLastWord = config.mode !== 'vibe' && nextIndex >= prev.words.length;

        if (nextIndex < newWords.length) {
          newWords[nextIndex].current = true;
        }

        // Count correct characters typed for this word
        let correctCharsInWord = 0;
        for (let i = 0; i < Math.min(prev.currentInput.length, currentWord.text.length); i++) {
          if (prev.currentInput[i] === currentWord.text[i]) {
            correctCharsInWord++;
          }
        }

        // Only count the actual characters submitted (including space)
        const charsSubmitted = prev.currentInput.length + 1; // +1 for the space
        const correctKeystrokes = prev.stats.correctKeystrokes + correctCharsInWord + (isCorrect ? 1 : 0); // +1 for space if word is correct
        const totalKeystrokes = prev.stats.totalKeystrokes + charsSubmitted;
        const timeElapsed = (Date.now() - prev.startTime!) / 1000;

        return {
          ...prev,
          words: newWords,
          currentWordIndex: nextIndex,
          currentInput: '',
          stats: {
            ...prev.stats,
            correctWords: isCorrect ? prev.stats.correctWords + 1 : prev.stats.correctWords,
            totalWords: prev.stats.totalWords + 1,
            correctKeystrokes,
            totalKeystrokes,
            wpm: calculateWPM(correctKeystrokes, timeElapsed),
            accuracy: calculateAccuracy(correctKeystrokes, totalKeystrokes),
            timeElapsed
          },
          isFinished: isLastWord || (config.mode === 'words' && prev.stats.totalWords + 1 >= config.wordCount!)
        };
      });
      return;
    }
    
    // Update current input for regular typing
    setGameState(prev => ({
      ...prev,
      currentInput: input
    }));
  }, [gameState.isPlaying, gameState.isFinished, gameState.words, gameState.currentWordIndex, config]);

  // Handle backspace
  const handleBackspace = useCallback(() => {
    if (!gameState.isPlaying || gameState.isFinished) return;
    
    setGameState(prev => ({
      ...prev,
      currentInput: prev.currentInput.slice(0, -1)
    }));
  }, [gameState.isPlaying, gameState.isFinished]);

  // Timer effect
  useEffect(() => {
    if (!gameState.isPlaying || gameState.isFinished || config.mode !== 'time') return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setGameState(state => ({
            ...state,
            isFinished: true,
            endTime: Date.now()
          }));
          return 0;
        }
        return prev - 1;
      });

      // Update stats
      setGameState(prev => {
        const timeElapsed = (Date.now() - prev.startTime!) / 1000;
        return {
          ...prev,
          stats: {
            ...prev.stats,
            wpm: calculateWPM(prev.stats.correctKeystrokes, timeElapsed),
            timeElapsed
          }
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState.isPlaying, gameState.isFinished, config.mode]);

  // Restart game
  const restartGame = useCallback(() => {
    const wordCount = config.mode === 'words' ? config.wordCount! :
                      config.mode === 'vibe' ? 100 : 50;
    const words = getRandomWords(config.difficulty, wordCount);

    setGameState({
      words: words.map((text, index) => ({
        text,
        display: text,
        completed: false,
        current: index === 0
      })),
      currentWordIndex: 0,
      currentInput: '',
      stats: initializeStats(),
      isPlaying: false,
      isFinished: false
    });

    setTimeRemaining(config.timeLimit || 0);
  }, [config]);

  // End game manually (for vibe mode)
  const endGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isFinished: true,
      endTime: Date.now()
    }));
  }, []);

  return {
    gameState,
    timeRemaining,
    startGame,
    handleInput,
    handleBackspace,
    restartGame,
    endGame
  };
}