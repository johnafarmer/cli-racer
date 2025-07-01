import { useState, useEffect, useCallback } from 'react';
import { GameState, GameConfig, GameMode } from '../types/index.js';
import { getRandomWords } from '../utils/words.js';
import { calculateWPM, calculateAccuracy, initializeStats } from '../utils/stats.js';

export function useGameEngine(config: GameConfig & { mode: GameMode }) {
  const [gameState, setGameState] = useState<GameState>(() => {
    const wordCount = config.mode === 'words' ? config.wordCount! : 50;
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
        const isLastWord = nextIndex >= prev.words.length;
        
        if (nextIndex < prev.words.length) {
          newWords[nextIndex].current = true;
        }

        // Only count correct keystrokes if the word was typed correctly
        const correctKeystrokes = isCorrect 
          ? prev.stats.correctKeystrokes + currentWord.text.length + 1 
          : prev.stats.correctKeystrokes;
        const totalKeystrokes = prev.stats.totalKeystrokes + prev.currentInput.length + 1;
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
      currentInput: input,
      stats: {
        ...prev.stats,
        totalKeystrokes: prev.stats.totalKeystrokes + 1,
        accuracy: calculateAccuracy(prev.stats.correctKeystrokes, prev.stats.totalKeystrokes + 1)
      }
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
    const wordCount = config.mode === 'words' ? config.wordCount! : 50;
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