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

        // Count correct characters typed for this word
        let correctCharsInWord = 0;
        for (let i = 0; i < Math.min(prev.currentInput.length, currentWord.text.length); i++) {
          if (prev.currentInput[i] === currentWord.text[i]) {
            correctCharsInWord++;
          }
        }
        
        const correctKeystrokes = prev.stats.correctKeystrokes + correctCharsInWord + (isCorrect ? 1 : 0); // +1 for space if word is correct
        const totalKeystrokes = prev.stats.totalKeystrokes + 1; // Just add 1 for the space key
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
    setGameState(prev => {
      // Track if this is a new character being typed (not just updating the string)
      const isNewChar = input.length > prev.currentInput.length;
      
      return {
        ...prev,
        currentInput: input,
        stats: {
          ...prev.stats,
          totalKeystrokes: isNewChar ? prev.stats.totalKeystrokes + 1 : prev.stats.totalKeystrokes
        }
      };
    });
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