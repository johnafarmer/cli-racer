import React from 'react';
import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';
import { GameMode, GameConfig } from '../types/index.js';


interface MenuProps {
  onSelectMode: (mode: GameMode, config: GameConfig) => void;
}

export const Menu: React.FC<MenuProps> = ({ onSelectMode }) => {
  const [step, setStep] = React.useState<'mode' | 'config'>('mode');
  const [selectedMode, setSelectedMode] = React.useState<GameMode>('words');
  
  const modeItems = [
    { label: '📝 Word Mode - Type a specific number of words', value: 'words' },
    { label: '⏱️  Time Mode - Type for a set duration', value: 'time' },
    { label: '🌊 Vibe Mode - Endless typing practice', value: 'vibe' }
  ];
  
  const wordCountItems = [
    { label: '10 words', value: 10 },
    { label: '25 words', value: 25 },
    { label: '50 words', value: 50 },
    { label: '100 words', value: 100 },
    { label: '250 words', value: 250 }
  ];
  
  const timeItems = [
    { label: '10 seconds', value: 10 },
    { label: '15 seconds', value: 15 },
    { label: '30 seconds', value: 30 },
    { label: '60 seconds', value: 60 },
    { label: '120 seconds', value: 120 }
  ];
  
  const handleModeSelect = (item: { value: string }) => {
    setSelectedMode(item.value as GameMode);
    if (item.value === 'vibe') {
      onSelectMode('vibe', { difficulty: 'medium' });
    } else {
      setStep('config');
    }
  };
  
  const handleConfigSelect = (item: { value: number }) => {
    const config: GameConfig = selectedMode === 'words' 
      ? { wordCount: item.value, difficulty: 'medium' }
      : { timeLimit: item.value, difficulty: 'medium' };
    
    onSelectMode(selectedMode, config);
  };
  
  return (
    <Box flexDirection="column" alignItems="center" marginTop={1}>
      {step === 'mode' ? (
        <>
          <Text color="cyan" bold>Choose Your Game Mode:</Text>
          <Box marginTop={1}>
            <SelectInput items={modeItems} onSelect={handleModeSelect} />
          </Box>
        </>
      ) : (
        <>
          <Text color="cyan" bold>
            {selectedMode === 'words' ? 'How many words?' : 'How long?'}
          </Text>
          <Box marginTop={1}>
            <SelectInput 
              items={selectedMode === 'words' ? wordCountItems : timeItems} 
              onSelect={handleConfigSelect} 
            />
          </Box>
        </>
      )}
    </Box>
  );
};