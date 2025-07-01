# 🏎️ CLI Racer

A blazing fast terminal-based typing speed game that brings the addictive gameplay of typing tests right to your command line. Built with React (Ink) for a smooth, interactive experience that feels more like a retro video game than a typical CLI tool.

![CLI Racer Demo](https://img.shields.io/badge/status-awesome-ff69b4)
![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

## ✨ Features

- **🎮 Multiple Game Modes**
  - **Word Mode**: Type a specific number of words (10, 25, 50, 100, or 250)
  - **Time Mode**: Race against the clock (10s, 15s, 30s, 60s, or 120s)
  - **Vibe Mode**: Endless zen typing - press Enter when you're done to see stats

- **📊 Real-time Statistics**
  - Live WPM (Words Per Minute) calculation
  - Accuracy percentage with color-coded feedback
  - Word count and time tracking
  - Beautiful game over screen with final stats

- **🎨 Slick Terminal UI**
  - Rainbow gradient ASCII art splash screen
  - Character-by-character color feedback (green = correct, red = mistake)
  - Current character highlighting with cyan glow
  - Smooth animations and transitions
  - Clean, centered layout that adapts to terminal size

- **⌨️ Typing Features**
  - Backspace support for corrections
  - Space to move to next word (even with mistakes)
  - Visual feedback for current typing position
  - 1150+ diverse words including common English and technical terms

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/cli-racer.git
cd cli-racer

# Install dependencies
npm install

# Build the project
npm run build

# Start racing!
npm start
```

Or install globally (coming soon):
```bash
npm install -g cli-racer
cli-racer
```

## 🎯 How to Play

1. Launch the game with `npm start`
2. Choose your game mode from the main menu:
   - 📝 **Word Mode**: Select how many words to type
   - ⏱️ **Time Mode**: Select your time limit
   - 🌊 **Vibe Mode**: Just start typing, no pressure!
3. Type the highlighted words as they appear
4. Your current character position glows cyan
5. Green letters = correct, Red = mistakes
6. Press Space to move to the next word
7. Press ESC anytime to return to menu
8. In Vibe Mode, press Enter to finish and see your stats

## 🛠️ Development

```bash
# Run in development mode with hot reload
npm run dev

# Run tests
npm test

# Lint code
npm run lint

# Type check
npm run typecheck
```

## 📁 Project Structure

```
cli-racer/
├── src/
│   ├── components/      # React components (Game, Menu, Logo, etc.)
│   ├── hooks/          # Custom React hooks (useGameEngine)
│   ├── utils/          # Helper functions
│   ├── types/          # TypeScript types
│   └── index.tsx       # Entry point
├── assets/
│   └── words.json      # Word database (1150+ words)
└── package.json
```

## 🎨 Built With

- **[Ink](https://github.com/vadimdemedes/ink)** - React for interactive CLIs
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety and better DX
- **[ink-gradient](https://github.com/sindresorhus/ink-gradient)** - Rainbow text effects
- **[ink-big-text](https://github.com/sindresorhus/ink-big-text)** - ASCII art logos
- **[ink-select-input](https://github.com/vadimdemedes/ink-select-input)** - Interactive menus

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 💡 Ideas for Future Features

- [ ] Multiplayer races via websockets
- [ ] Custom word lists and themes
- [ ] Difficulty levels with adaptive word selection
- [ ] Global leaderboard
- [ ] Practice mode for specific key combinations
- [ ] Stats history and progress tracking
- [ ] Sound effects (optional)
- [ ] More color themes
- [ ] Export stats to CSV/JSON

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [Monkeytype](https://monkeytype.com/) and other typing games
- Special thanks to the Ink library for making terminal UIs actually fun to build
- Claude Code did literally everything including this readme

---

Made with ❤️ by [John](https://github.com/johnafarmer) and [Claude](https://claude.ai)

**Happy typing! May your WPM be high and your accuracy higher! 🚀**