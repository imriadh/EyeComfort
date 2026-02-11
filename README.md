# VisionBreak 🌟

<div align="center">
  <h3>A Lightweight Wellness App for Eye Care, Sleep Tracking & Productivity</h3>
  <p>Built with Tauri + React for minimal app size (<10MB)</p>
</div>

## ✨ Features

### 👁️ Eye Care Timer (20-20-20 Rule)

- Customizable countdown timer with circular progress indicator
- Interval options: 15, 20, 30, 45, or 60 minutes
- Beautiful notifications with custom sounds
- Play/Pause/Reset controls
- One-tap start functionality
- Session tracking

### 😴 Sleep Cycle Alarm Clock

- Sleep cycle calculator based on 90-minute cycles
- Optimal wake-up time suggestions (4-6 cycles)
- In-app alarm setting with AlarmManager
- Morning rating system (5-emoji scale)
- Sleep quality tracking and statistics

### 🎯 Pomodoro Study Timer

- 25-minute work sessions with 5-minute breaks
- Customizable work/break durations (15/25/30/45 min work, 5/10/15 min breaks)
- Session counter and productivity statistics
- Visual phase indicators (work vs. break)
- Daily, weekly, and total productivity tracking

## 🎨 Design Features

- **Modern UI**: Material Design 3 aesthetics with glassmorphism effects
- **Theme Support**: Seamless dark/light mode switching
- **Smooth Animations**: 60fps animations throughout
- **Gradient Backgrounds**: Beautiful color gradients
- **Bottom Navigation**: Easy access to all three features
- **Responsive Design**: Optimized for various screen sizes

## 🛠️ Tech Stack

- **Framework**: Tauri 2.0 (Rust backend)
- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Pure CSS with custom properties
- **Target**: Android 7.0+ (API 24)

## 📦 Installation

### Prerequisites

1. **Node.js** (v18 or higher)

   ```bash
   node --version
   ```

2. **Rust** (stable)

   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```

3. **Java JDK** (17 or higher)

   ```bash
   java --version
   ```

4. **Android SDK** (for Android builds)

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/vision-break.git
   cd vision-break
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Initialize Tauri Android**
   ```bash
   npm run tauri android init
   ```

## 🚀 Development

### Run in development mode (web)

```bash
npm run dev
```

### Run on Android device/emulator

```bash
npm run tauri:android
```

### Build APK

**Using the build script (recommended)**:

```bash
chmod +x scripts/build-android.sh
./scripts/build-android.sh
```

**Manual build**:

```bash
# Debug APK
npm run tauri android build

# Release APK
npm run tauri android build --release
```

The APK will be generated in:

- Debug: `src-tauri/gen/android/app/build/outputs/apk/debug/`
- Release: `src-tauri/gen/android/app/build/outputs/apk/release/`

## 📱 Installation on Device

1. Enable "Unknown Sources" in Android Settings
2. Transfer the APK to your device
3. Open and install the APK
4. Grant necessary permissions (notifications, alarms)

## 🔔 Permissions

The app requires the following permissions:

- **Notifications**: For timer and alarm alerts
- **Exact Alarms**: For precise sleep cycle alarms
- **Wake Lock**: To keep timers running in background
- **Vibration**: For notification feedback

## 📊 Data Storage

All data is stored locally using Android SharedPreferences:

- Timer sessions and statistics
- Sleep ratings and history
- Pomodoro session counts
- User preferences (theme, intervals)

**Export Data**: Future feature to export data as JSON

## 🎯 Optimization

This app is optimized for minimal size and battery usage:

- **APK Size**: Target <10MB
- **Bundle Size**: Tree-shaking removes unused code
- **Assets**: WebP images for optimal compression
- **Background**: Efficient service implementation
- **Battery**: Smart wake lock management

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Development Roadmap

- [x] Eye Care Timer with 20-20-20 rule
- [x] Sleep Cycle Calculator
- [x] Pomodoro Timer
- [x] Dark/Light theme support
- [ ] Data export to JSON
- [ ] Weekly/monthly statistics graphs
- [ ] Custom notification sounds
- [ ] Do-not-disturb integration
- [ ] Widget support
- [ ] Backup/restore functionality

## 🐛 Known Issues

- Android notification scheduling requires proper permissions
- Background service limitations on some Android versions
- Theme preference not persisted between sessions (coming soon)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Tauri team for the amazing framework
- React team for the UI library
- Material Design for design inspiration
- 20-20-20 rule by the American Optometric Association

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

<div align="center">
  <p>Made with ❤️ for your wellness</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
