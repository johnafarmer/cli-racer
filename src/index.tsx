#!/usr/bin/env node
import React, { useState } from 'react';
import { render, Box } from 'ink';
import { Logo } from './components/Logo.js';
import { Menu } from './components/Menu.js';
import { Game } from './components/Game.js';
import { GameMode, GameConfig } from './types/index.js';

// Check if we're in a TTY environment
if (!process.stdin.isTTY) {
  console.error('Error: cli-racer must be run in an interactive terminal');
  process.exit(1);
}

// Clear the terminal for a clean start
console.clear();

const App = () => {
  const [screen, setScreen] = useState<'splash' | 'menu' | 'game'>('splash');
  const [gameMode, setGameMode] = useState<GameMode>('words');
  const [gameConfig, setGameConfig] = useState<GameConfig>({
    wordCount: 25,
    difficulty: 'medium'
  });
  
  React.useEffect(() => {
    // Show splash screen for 2 seconds
    const timer = setTimeout(() => {
      setScreen('menu');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleModeSelect = (mode: GameMode, config: GameConfig) => {
    setGameMode(mode);
    setGameConfig(config);
    setScreen('game');
  };
  
  const handleExitGame = () => {
    setScreen('menu');
  };
  
  return (
    <Box flexDirection="column" alignItems="center" justifyContent="center" minHeight={20}>
      {screen === 'splash' && <Logo />}
      {screen === 'menu' && (
        <>
          <Logo />
          <Menu onSelectMode={handleModeSelect} />
        </>
      )}
      {screen === 'game' && (
        <Game 
          mode={gameMode}
          config={gameConfig}
          onExit={handleExitGame}
        />
      )}
    </Box>
  );
};

render(<App />);