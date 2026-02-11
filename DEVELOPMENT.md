# Development Guide

## Project Structure

```
vision-break/
├── src/                          # React frontend
│   ├── components/               # React components
│   │   ├── EyeCareTimer.tsx     # Eye care timer feature
│   │   ├── PomodoroTimer.tsx    # Pomodoro timer feature
│   │   ├── SleepCycle.tsx       # Sleep cycle calculator
│   │   └── ThemeToggle.tsx      # Theme switcher
│   ├── styles/                   # CSS files
│   ├── App.tsx                   # Main app component
│   └── main.tsx                  # Entry point
├── src-tauri/                    # Tauri backend (Rust)
│   ├── src/
│   │   └── main.rs              # Rust backend logic
│   ├── Cargo.toml               # Rust dependencies
│   ├── tauri.conf.json          # Tauri configuration
│   └── gen/android/             # Generated Android files
├── scripts/                      # Build scripts
│   └── build-android.sh         # Android build helper
└── .github/workflows/           # CI/CD
    └── build-apk.yml            # GitHub Actions workflow
```

## Development Workflow

### 1. Setup Development Environment

Install all prerequisites:

```bash
# Install Node.js dependencies
npm install

# Install Tauri CLI
cargo install tauri-cli

# Initialize Android support
npm run tauri android init
```

### 2. Web Development

For rapid UI development, use the web preview:

```bash
npm run dev
```

This starts Vite dev server at `http://localhost:1420` with hot reload.

### 3. Android Development

Connect an Android device or start an emulator, then:

```bash
npm run tauri:android
```

This builds and runs the app on your device.

### 4. Testing

#### Manual Testing Checklist

**Eye Care Timer:**

- [ ] Timer counts down correctly
- [ ] Notification appears when timer ends
- [ ] Can pause and resume
- [ ] Reset works properly
- [ ] Interval selection updates timer
- [ ] Session count increments

**Sleep Cycle:**

- [ ] Calculator shows 4-6 wake times
- [ ] Times are calculated correctly (90min cycles)
- [ ] Can set alarm for a wake time
- [ ] Rating system works
- [ ] Stats display correctly

**Pomodoro Timer:**

- [ ] Work phase counts down
- [ ] Transitions to break phase
- [ ] Break phase counts down
- [ ] Stats track correctly
- [ ] Custom durations work

**General:**

- [ ] Theme toggle works
- [ ] Navigation between tabs
- [ ] App persists state
- [ ] Notifications work on Android
- [ ] App survives background/foreground

## Building for Production

### Debug Build (Testing)

```bash
npm run tauri android build
```

### Release Build (Production)

```bash
npm run tauri android build --release
```

Release builds are:

- Smaller (minified)
- Faster (optimized)
- Unsigned (need signing for Play Store)

## Code Style Guidelines

### TypeScript/React

- Use functional components with hooks
- TypeScript strict mode enabled
- Props interfaces for all components
- Meaningful variable names
- Comments for complex logic

### CSS

- Use CSS custom properties for theming
- Mobile-first responsive design
- BEM-like naming conventions
- Animations should be 60fps

### Rust

- Follow Rust naming conventions
- Add error handling for all operations
- Document public functions
- Use async where appropriate

## Adding New Features

### 1. Create Component

```tsx
// src/components/MyFeature.tsx
import { useState } from "react";
import "./MyFeature.css";

const MyFeature = () => {
  // Component logic
  return <div>Feature UI</div>;
};

export default MyFeature;
```

### 2. Add Styling

```css
/* src/components/MyFeature.css */
.my-feature {
  /* Use theme variables */
  background: var(--bg-glass);
  color: var(--text-primary);
}
```

### 3. Add to Navigation

Update `App.tsx` to include your new feature.

### 4. Backend Integration

Add Tauri commands in `src-tauri/src/main.rs` if needed:

```rust
#[tauri::command]
fn my_command(param: String) -> Result<String, String> {
    // Backend logic
    Ok("result".to_string())
}
```

## Troubleshooting

### Build Issues

**"Tauri CLI not found"**

```bash
cargo install tauri-cli --version ^2.0.0
```

**"Android SDK not found"**
Set ANDROID_HOME environment variable:

```bash
export ANDROID_HOME=$HOME/Android/Sdk
```

**"Gradle build failed"**
Check Java version (needs 17+):

```bash
java --version
```

### Runtime Issues

**Notifications not working**

- Check Android permissions in settings
- Ensure notification channel is created
- Test on physical device (emulator may not support all features)

**Timer not running in background**

- Wake lock permission required
- Some Android versions restrict background activities
- Consider implementing foreground service

## Performance Optimization

### Frontend

- Use React.memo for expensive components
- Debounce user inputs
- Lazy load components if needed
- Optimize re-renders

### Backend

- Use async/await for I/O operations
- Minimize data serialization
- Cache frequently accessed data

### Android

- Use ProGuard for release builds
- Optimize assets (WebP images)
- Tree-shake unused dependencies

## Debugging

### Web Console

```bash
npm run dev
# Open browser DevTools (F12)
```

### Android Logs

```bash
adb logcat | grep VisionBreak
```

### Rust Debugging

Add debug prints:

```rust
println!("Debug: {:?}", variable);
```

## Publishing

### Google Play Store

1. Generate signing key
2. Build release APK
3. Sign APK
4. Create Play Store listing
5. Upload APK
6. Submit for review

See [Android Publishing Guide](https://developer.android.com/studio/publish) for details.

## Resources

- [Tauri Docs](https://tauri.app/)
- [React Docs](https://react.dev/)
- [Android Developer Guide](https://developer.android.com/)
- [Material Design 3](https://m3.material.io/)
