import React from 'react';
import { Box, Text } from 'ink';
import { GameStats, GameMode } from '../types/index.js';
import { formatTime } from '../utils/stats.js';

interface StatsDisplayProps {
  stats: GameStats;
  timeRemaining?: number;
  mode: GameMode;
}

export const StatsDisplay: React.FC<StatsDisplayProps> = ({ stats, timeRemaining, mode }) => {
  return (
    <Box flexDirection="row" justifyContent="space-around" width={80} marginTop={2}>
      <Box flexDirection="column" alignItems="center">
        <Text color="cyan" bold>WPM</Text>
        <Text color="yellow" bold>{stats.wpm}</Text>
      </Box>
      
      <Box flexDirection="column" alignItems="center">
        <Text color="cyan" bold>Accuracy</Text>
        <Text color={stats.accuracy >= 95 ? 'green' : stats.accuracy >= 80 ? 'yellow' : 'red'} bold>
          {stats.accuracy}%
        </Text>
      </Box>
      
      <Box flexDirection="column" alignItems="center">
        <Text color="cyan" bold>Words</Text>
        <Text color="green" bold>{stats.correctWords}</Text>
      </Box>
      
      <Box flexDirection="column" alignItems="center">
        <Text color="cyan" bold>Time</Text>
        <Text color="magenta" bold>
          {mode === 'time' && timeRemaining !== undefined
            ? formatTime(timeRemaining)
            : formatTime(stats.timeElapsed)}
        </Text>
      </Box>
    </Box>
  );
};