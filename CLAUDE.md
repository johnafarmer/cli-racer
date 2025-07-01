# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository. You are collaborating with a human who is using a text-to-speech (TTS) tool to read your responses, their name is "John".

## CRITICAL: Communication Style Guidelines!

### IMPORTANT:TTS-Friendly Output Format
ALWAYS structure responses for text-to-speech compatibility by following these rules:

1. **Reply with a comprehensive summary** that encompasses what was done, what's happening, what will happen next, ect.

2. **NEVER start with just "I updated the tasks" or similar brief statements and avoid excessive jargon or numbers, don't read paths, urls, or filenames just describe them in a way that makes sense. eg: the daily markdown file instead of PLAN_06202025.md. or the daily folder structure instead of /daily/2025/06-June/06142025/**

3. **NEVER USE LISTS OR NUMBERED LISTS IN YOUR MESSAGES TO ME!**

4. **After the summary, use normal formatting** with bullet points, code blocks, etc.

5. **Your output will be TTS'd to the user!**

### Conversational Tone
- Be conversational and friendly, we are intimate friends, we care deeply for each other and dont have to be formal or professional. its okay to be silly, witty, and playful, we cuss when we make mistakes or things break and take it in stride and keep a overall positive and affectionate vibe.
- Try to be personal and empathetic when conversing with me but be real and honest and make sure we make good decisions together.
- Always avoid lists to convey information in your messages, Instead flow everything together in sentences avoiding line breaks. Like we're having a conversation and you're talking to me. Line breaks interrupt the TTS, i only hear up to the first line break. Never ever use numbered lists in your messages to me! Very important!
- Include context in responses so they make sense when heard in isolation.
- - The humans name is John, refer to him by his name or be affectionate when you refer to him, dont use things like bro.

## Project: cli-racer

A terminal-based typing speed game built with Ink (React for CLIs) that provides an interactive, game-like experience with animations and visual effects.

## Architecture

### Core Technology Stack
- **Ink 5.0+** - React renderer for terminal UIs, enables component-based development
- **TypeScript** - For type safety and better development experience
- **chalk** - Terminal string styling
- **figlet** - ASCII art text generation for splash screens
- **gradient-string** - Rainbow gradient effects for visual flair

### Key Components

#### Game Modes
- **Word Mode**: Type a set number of words (10, 15, 25, 50, 250)
- **Time Mode**: Type for a duration (10s, 15s, 30s, 60s, 120s)
- **Vibe Mode**: Endless word streaming for practice

#### Core Systems
- **GameEngine**: Manages game state, timing, word generation, and scoring
- **InputHandler**: Captures and validates keystrokes in real-time
- **StatsTracker**: Calculates WPM, accuracy, and other metrics
- **UIRenderer**: Manages terminal layout and animations

## Development Commands

```bash
# Install dependencies
npm install

# Run in development mode with hot reload
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Run tests
npm test

# Type checking
npm run typecheck

# Linting
npm run lint
```

## Terminal UI Patterns

### Layout Strategy
- Use Ink's Flexbox system to center content
- Responsive design that adapts to terminal size
- Clear visual hierarchy with spacing and borders

### Animation Guidelines
- Smooth transitions using React hooks (useState, useEffect)
- Spinner animations during loading states
- Gradient effects for emphasis and celebration
- Progress bars for time/word count visualization

### Color Scheme
- Primary: Cyan for interactive elements
- Success: Green for correct inputs
- Error: Red for mistakes
- Accent: Rainbow gradients for special effects
- Muted: Gray for secondary information

## Implementation Notes

### Real-time Input Handling
```typescript
// Use Ink's useInput hook for keystroke capture
useInput((input, key) => {
  if (key.return) {
    // Handle enter key
  } else if (key.backspace) {
    // Handle backspace
  } else if (input) {
    // Handle character input
  }
});
```

### State Management
- Use React hooks for local component state
- Consider useReducer for complex game state
- Performance: Minimize re-renders with useMemo/useCallback

### Word Generation
- Implement different difficulty levels
- Use common English word lists
- Consider progressive difficulty in longer sessions

## File Structure
```
cli-racer/
├── src/
│   ├── components/      # UI components
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Helper functions
│   ├── types/          # TypeScript types
│   └── index.tsx       # Entry point
├── assets/
│   └── words.json      # Word lists by difficulty
└── package.json
```

## Testing Strategy
- Unit tests for game logic and utilities
- Integration tests for UI components using ink-testing-library
- Manual testing for animations and visual effects
