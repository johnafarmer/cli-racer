import React, { useEffect } from 'react';
import { Box, Text, useInput } from 'ink';
import Spinner from 'ink-spinner';
import Gradient from 'ink-gradient';
import { GameConfig, GameMode } from '../types/index.js';
import { useGameEngine } from '../hooks/useGameEngine.js';
import { WordDisplay } from './WordDisplay.js';
import { StatsDisplay } from './StatsDisplay.js';

interface GameProps {
  mode: GameMode;
  config: GameConfig;
  onExit: () => void;
}

export const Game: React.FC<GameProps> = ({ mode, config, onExit }) => {
  const [gameKey, setGameKey] = React.useState(0);
  
  const {
    gameState,
    timeRemaining,
    startGame,
    handleInput,
    handleBackspace,
    restartGame,
    endGame
  } = useGameEngine({ ...config, mode });

  // Start game automatically
  useEffect(() => {
    const timer = setTimeout(() => {
      startGame();
    }, 1000);
    return () => clearTimeout(timer);
  }, [startGame, gameKey]);

  // Handle keyboard input
  useInput((input, key) => {
    if (key.escape) {
      onExit();
      return;
    }

    if (gameState.isFinished) {
      if (key.tab) {
        restartGame();
        setGameKey(prev => prev + 1); // Trigger useEffect to start game again
      }
      return;
    }

    if (!gameState.isPlaying) return;

    if (key.backspace || key.delete) {
      handleBackspace();
      return;
    } else if (key.return && mode === 'vibe') {
      // End vibe mode on enter
      endGame();
    } else if (input === ' ') {
      handleInput(gameState.currentInput, true);
    } else if (input && input.match(/^[a-zA-Z0-9.,!?;:'"()-]$/)) {
      handleInput(gameState.currentInput + input, false);
    }
  });

  if (!gameState.isPlaying && !gameState.isFinished) {
    return (
      <Box flexDirection="column" alignItems="center" justifyContent="center" minHeight={20}>
        <Text color="cyan" bold>Get Ready!</Text>
        <Box marginTop={1}>
          <Text color="green">
            <Spinner type="dots" /> Starting in a moment...
          </Text>
        </Box>
        <Box marginTop={2}>
          <Text dimColor>Press ESC to return to menu</Text>
        </Box>
      </Box>
    );
  }

  if (gameState.isFinished) {
    return (
      <Box flexDirection="column" alignItems="center" justifyContent="center" minHeight={20}>
        <Gradient name="rainbow">
          <Text bold>Game Over!</Text>
        </Gradient>
        
        <Box marginTop={2} borderStyle="round" borderColor="cyan" padding={1}>
          <Box flexDirection="column" alignItems="center">
            <Text color="yellow" bold>Final Stats</Text>
            <Box marginTop={1}>
              <Text>WPM: <Text color="green" bold>{gameState.stats.wpm}</Text></Text>
            </Box>
            <Text>Accuracy: <Text color="green" bold>{gameState.stats.accuracy}%</Text></Text>
            <Text>Words Typed: <Text color="green" bold>{gameState.stats.correctWords}</Text></Text>
          </Box>
        </Box>
        
        <Box marginTop={2} flexDirection="column" alignItems="center">
          <Text color="cyan">Press TAB to play again</Text>
          <Text dimColor>Press ESC to return to menu</Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" alignItems="center" minHeight={20}>
      <Box marginBottom={2}>
        <Text color="cyan" bold>
          {mode === 'words' ? `Type ${config.wordCount} words` : 
           mode === 'time' ? `Type for ${config.timeLimit} seconds` :
           'Vibe Mode - Type endlessly'}
        </Text>
      </Box>

      <Box borderStyle="single" borderColor="gray" padding={1}>
        <WordDisplay 
          words={gameState.words}
          currentInput={gameState.currentInput}
          currentWordIndex={gameState.currentWordIndex}
        />
      </Box>

      <StatsDisplay 
        stats={gameState.stats}
        timeRemaining={timeRemaining}
        mode={mode}
      />

      <Box marginTop={2} flexDirection="column" alignItems="center">
        <Text dimColor>Press ESC to return to menu</Text>
        {mode === 'vibe' && (
          <Text dimColor>Press ENTER to finish and see your stats</Text>
        )}
      </Box>
    </Box>
  );
};