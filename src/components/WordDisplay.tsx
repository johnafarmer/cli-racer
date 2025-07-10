import React from 'react';
import { Box, Text } from 'ink';
import { Word } from '../types/index.js';

interface WordDisplayProps {
  words: Word[];
  currentInput: string;
  currentWordIndex: number;
}

export const WordDisplay: React.FC<WordDisplayProps> = ({ words, currentInput, currentWordIndex }) => {
  // Show a window of words around the current word
  const windowSize = 15;
  const startIndex = Math.max(0, currentWordIndex - 4);
  const endIndex = Math.min(words.length, startIndex + windowSize);
  const visibleWords = words.slice(startIndex, endIndex);

  return (
    <Box flexDirection="row" flexWrap="wrap" width={80} justifyContent="center">
      {visibleWords.map((word, index) => {
        const globalIndex = startIndex + index;
        const isCurrent = globalIndex === currentWordIndex;
        const isCompleted = word.completed;

        if (isCurrent) {
          // Render current word with character-by-character coloring
          return (
            <Box key={globalIndex} marginRight={1} marginBottom={1}>
              {word.text.split('').map((char, charIndex) => {
                const inputChar = currentInput[charIndex];
                const isCurrentChar = charIndex === currentInput.length;
                let color = 'gray';
                let backgroundColor = undefined;
                
                if (inputChar) {
                  color = inputChar === char ? 'green' : 'red';
                } else if (isCurrentChar) {
                  // Highlight the current character position
                  color = 'cyan';
                  backgroundColor = 'gray';
                }

                return (
                  <Text 
                    key={charIndex} 
                    color={color} 
                    backgroundColor={backgroundColor}
                    bold={isCurrentChar || inputChar !== undefined}
                  >
                    {char}
                  </Text>
                );
              })}
              {currentInput.length > word.text.length && (
                <Text color="red" bold>{currentInput.slice(word.text.length)}</Text>
              )}
            </Box>
          );
        }

        return (
          <Box key={globalIndex} marginRight={1} marginBottom={1}>
            <Text color={isCompleted ? 'green' : 'gray'} dimColor={!isCurrent && !isCompleted}>
              {word.text}
            </Text>
          </Box>
        );
      })}
    </Box>
  );
};