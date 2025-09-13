import React from 'react';
import { Box, Text } from 'ink';
import { Word } from '../types/index.js';

interface WordDisplayProps {
  words: Word[];
  currentInput: string;
  currentWordIndex: number;
}

export const WordDisplay: React.FC<WordDisplayProps> = ({ words, currentInput, currentWordIndex }) => {
  // Keep current word centered in viewport for smooth typing experience
  const windowSize = 7; // Show 3 previous + current + 3 upcoming
  const centerPosition = 3; // Position 3 in a 7-word window

  // Calculate start index to keep current word centered
  let startIndex = currentWordIndex - centerPosition;

  // Handle edge cases at the beginning and end
  if (startIndex < 0) {
    startIndex = 0;
  } else if (startIndex + windowSize > words.length) {
    startIndex = Math.max(0, words.length - windowSize);
  }

  const endIndex = Math.min(words.length, startIndex + windowSize);
  const visibleWords = words.slice(startIndex, endIndex);

  return (
    <Box flexDirection="row" flexWrap="wrap" width={60} justifyContent="center">
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

        // Calculate distance from current word for fade effect
        const distance = Math.abs(globalIndex - currentWordIndex);
        const isNext = globalIndex === currentWordIndex + 1;

        return (
          <Box key={globalIndex} marginRight={1} marginBottom={1}>
            <Text
              color={isCompleted ? 'green' : isNext ? 'cyan' : 'gray'}
              dimColor={!isCurrent && !isCompleted && distance > 2}
              bold={isNext}
            >
              {word.text}
            </Text>
          </Box>
        );
      })}
    </Box>
  );
};