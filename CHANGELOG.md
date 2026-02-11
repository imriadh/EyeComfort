# Changelog

All notable changes to VisionBreak will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned

- Data export to JSON
- Weekly/monthly statistics graphs
- Custom notification sounds
- Do-not-disturb integration
- Widget support
- Backup/restore functionality
- Sleep history visualization
- Focus mode enhancements

## [0.1.0] - 2026-02-11

### Added

- Initial release of VisionBreak
- Eye Care Timer with 20-20-20 rule
  - Customizable intervals (15, 20, 30, 45, 60 minutes)
  - Circular progress indicator
  - Play/Pause/Reset controls
  - Session tracking
  - Push notifications
- Sleep Cycle Calculator
  - 90-minute sleep cycle calculations
  - Optimal wake-up time suggestions (4-6 cycles)
  - Alarm setting functionality
  - Morning rating system (5-emoji scale)
  - Sleep quality statistics
- Pomodoro Study Timer
  - Configurable work sessions (15, 25, 30, 45 minutes)
  - Configurable break durations (5, 10, 15 minutes)
  - Session counter
  - Productivity statistics (daily, weekly, total)
  - Visual phase indicators
- Material Design 3 UI
  - Glassmorphism effects
  - Smooth 60fps animations
  - Gradient backgrounds
  - Bottom navigation
- Theme System
  - Dark mode
  - Light mode
  - Seamless theme switching
- Data Persistence
  - Local storage for statistics
  - Settings persistence
- Android Support
  - Minimum SDK 24 (Android 7.0)
  - Notification support
  - Wake lock support
  - Alarm scheduling

### Technical

- Built with Tauri 2.0
- React 18 frontend
- TypeScript support
- Vite build system
- Rust backend
- Target APK size < 10MB

[Unreleased]: https://github.com/yourusername/vision-break/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/yourusername/vision-break/releases/tag/v0.1.0
