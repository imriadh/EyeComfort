# Quick Start Guide

## First-Time Setup

### 1. Set Up Environment

```bash
source scripts/setup-env.sh
```

This script will:

- Load Rust/Cargo environment
- Verify all required tools are installed
- Add necessary paths to your session

### 2. Install Dependencies

```bash
npm install
```

### 3. Test Web Version (Recommended First Step)

```bash
npm run dev
```

Open your browser to `http://localhost:1420` to see the app running.

## Building for Android

### Prerequisites

Before building for Android, ensure you have:

1. **Java JDK 17+**

   ```bash
   # Check version
   java --version

   # If not installed, install OpenJDK
   sudo apt-get install openjdk-17-jdk
   ```

2. **Android SDK** (will be installed automatically by Tauri)

3. **Source the environment** (in every new terminal)
   ```bash
   source "$HOME/.cargo/env"
   ```

### Initialize Android (One-Time Setup)

```bash
# Make sure environment is loaded
source "$HOME/.cargo/env"

# Initialize Android project
npm run tauri android init
```

This will:

- Download and set up Android SDK
- Create Android project structure
- Configure Gradle
- Set up necessary permissions

### Build Android APK

```bash
# Debug build (faster, for testing)
npm run tauri android build

# Or use the helper script
chmod +x scripts/build-android.sh
./scripts/build-android.sh
```

The APK will be generated at:

```
src-tauri/gen/android/app/build/outputs/apk/universal/debug/app-universal-debug.apk
```

### Common Issues & Solutions

#### Issue: "cargo: command not found"

**Solution:**

```bash
# Load Rust environment
source "$HOME/.cargo/env"

# Or add to your shell rc file
echo 'source "$HOME/.cargo/env"' >> ~/.bashrc
```

#### Issue: "Java not found"

**Solution:**

```bash
# Install Java JDK 17
sudo apt-get update
sudo apt-get install openjdk-17-jdk

# Verify installation
java --version
```

#### Issue: "Android SDK not found"

**Solution:**
The Android SDK will be automatically downloaded by Tauri during `tauri android init`. If issues persist:

```bash
# Tauri will handle this, just run:
npm run tauri android init
```

#### Issue: npm security vulnerabilities

**Solution:**
The warnings about esbuild/vite are for development dependencies and don't affect the built APK. You can:

- Ignore them for development
- Or run `npm audit fix --force` (may cause breaking changes)

## Development Workflow

### Daily Development

1. **Start a new terminal:**

   ```bash
   cd /workspaces/EyeComfort
   source "$HOME/.cargo/env"
   ```

2. **For web development:**

   ```bash
   npm run dev
   ```

3. **For Android development:**
   ```bash
   # Connect device or start emulator
   npm run tauri:android
   ```

### Testing on Device

1. Enable USB debugging on your Android device
2. Connect via USB
3. Run: `npm run tauri:android`

### Building Release APK

```bash
# Production build (smaller, optimized)
npm run tauri android build --release
```

## Project Structure

```
/workspaces/EyeComfort/
├── src/                  # React source code
│   ├── components/       # React components
│   ├── styles/          # CSS files
│   ├── App.tsx          # Main app
│   └── main.tsx         # Entry point
├── src-tauri/           # Rust/Tauri backend
│   ├── src/main.rs      # Backend logic
│   ├── tauri.conf.json  # Tauri config
│   └── gen/android/     # Generated Android files (after init)
├── scripts/             # Helper scripts
│   ├── setup-env.sh     # Environment setup
│   └── build-android.sh # Build helper
└── package.json         # NPM dependencies
```

## Troubleshooting

### Reset Everything

If things get messed up:

```bash
# Clean npm
rm -rf node_modules package-lock.json
npm install

# Clean Rust
cd src-tauri
cargo clean
cd ..

# Remove Android build
rm -rf src-tauri/gen
```

### Check Environment

```bash
# Verify all tools
source scripts/setup-env.sh
```

### View Logs

```bash
# Android device logs
adb logcat | grep VisionBreak

# Tauri logs
# Will be shown in terminal during development
```

## Next Steps

1. ✅ Complete first-time setup above
2. ✅ Test web version with `npm run dev`
3. ✅ Initialize Android with `npm run tauri android init`
4. ✅ Build your first APK
5. 🚀 Start customizing the app!

## Resources

- [Tauri Documentation](https://v2.tauri.app/)
- [React Documentation](https://react.dev/)
- [Android Developer Guide](https://developer.android.com/)

Need help? Check [DEVELOPMENT.md](DEVELOPMENT.md) for detailed development info.
