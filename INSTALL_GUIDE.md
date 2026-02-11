# VisionBreak APK Installation & Troubleshooting Guide

## 📦 APK Information

- **File**: `VisionBreak-v1.0-debug.apk`
- **Size**: 119 MB (Debug build with symbols)
- **Package**: `com.visionbreak.app`
- **Min Android**: 7.0 (API 24)
- **Target Android**: 14.0 (API 36)
- **Architecture**: ARM64 (64-bit)

## ✅ Required Permissions

The app requests these permissions:

- ✅ **INTERNET** - For potential future features
- ✅ **POST_NOTIFICATIONS** - For eye care reminders
- ✅ **WAKE_LOCK** - To ensure timers work in background
- ✅ **RECEIVE_BOOT_COMPLETED** - To restore timers after reboot

## 📲 Installation Steps

### Step 1: Transfer APK to Your Phone

Choose one method:

1. **USB Cable**: Connect phone → Copy APK to Downloads folder
2. **Cloud**: Upload to Google Drive → Download on phone
3. **Email**: Email yourself the APK → Open on phone
4. **ADB** (Advanced): `adb install VisionBreak-v1.0-debug.apk`

### Step 2: Enable Installation from Unknown Sources

**Android 8.0+**:

1. Open **Settings** → **Apps** → **Special access**
2. Tap **Install unknown apps**
3. Select your **File Manager** or **Browser**
4. Enable **Allow from this source**

**Android 7.0-7.1**:

1. Open **Settings** → **Security**
2. Enable **Unknown sources**
3. Confirm the warning

### Step 3: Install the APK

1. Open your **File Manager** or **Downloads**
2. Tap on **VisionBreak-v1.0-debug.apk**
3. Tap **Install**
4. Wait for installation to complete
5. Tap **Open** or find "VisionBreak" in your app drawer

## 🐛 Troubleshooting

### ❌ "App not installed" Error

**Cause 1: Conflicting Package**

- **Solution**: If you have an older version, uninstall it first
  - Settings → Apps → VisionBreak → Uninstall

**Cause 2: Corrupted Download**

- **Solution**: Re-download the APK
- Verify file size is exactly 119 MB

**Cause 3: Insufficient Storage**

- **Solution**: Free up at least 250 MB of space
- Settings → Storage → Free up space

**Cause 4: Installation Blocked**

- **Solution**: Ensure "Install unknown apps" is enabled
- Try using a different file manager (e.g., Google Files)

### ❌ App Crashes on Launch

**Cause 1: Android Version Too Old**

- **Solution**: You need Android 7.0 (Nougat) or newer
- Check: Settings → About phone → Android version

**Cause 2: 32-bit Device**

- **Solution**: This APK is ARM64 only
- Check if your phone is 64-bit compatible
- Most phones after 2017 are 64-bit

**Cause 3: Missing System WebView**

- **Solution**: Update Android System WebView
  - Play Store → Search "Android System WebView" → Update

### ❌ App Opens Then Closes Immediately

**Cause: Permission Issues**

- **Solution**: Grant all permissions when prompted
  - Settings → Apps → VisionBreak → Permissions
  - Allow all requested permissions

## 🔍 How to Check If App Is Working

After installing:

1. **App Icon**: Look for "VisionBreak" icon in app drawer
2. **Open App**: Should show 3 tabs at bottom (👁️ Timer, 😴 Sleep, 🎯 Focus)
3. **Test Features**:
   - Tap 👁️ Timer → Select 20 min → Press Play
   - Should show countdown timer
4. **Permissions**: If prompts appear, tap "Allow"

## 📱 Supported Devices

### ✅ Works On:

- Samsung Galaxy S7 and newer
- Google Pixel (all models)
- OnePlus 3 and newer
- Xiaomi (Android 7.0+)
- Most phones from 2016 onwards

### ❌ Won't Work On:

- Phones older than 2016
- Android 6.0 Marshmallow or older
- 32-bit only devices
- Huawei phones without Google Mobile Services

## 🛠️ Advanced Troubleshooting

### Get Crash Logs (if app crashes):

1. Enable Developer Options:
   - Settings → About phone → Tap "Build number" 7 times
2. Developer Options → USB Debugging → Enable
3. Connect to computer
4. Run: `adb logcat -d > crash.log`
5. Look for errors mentioning "com.visionbreak.app"

### Clear App Data (if app misbehaves):

1. Settings → Apps → VisionBreak
2. Storage → Clear Data
3. Restart app

### Reinstall Clean:

1. Uninstall current version
2. Restart phone
3. Install fresh APK
4. Grant all permissions

## 📊 App Features (After Successful Install)

### 👁️ Eye Care Timer

- 20-20-20 rule reminder
- Custom intervals: 15, 20, 30, 45, 60 minutes
- Play/Pause/Reset controls
- Notification alerts

### 😴 Sleep Cycle Calculator

- Optimal wake-up time suggestions
- Based on 90-minute sleep cycles
- Morning ratings to track sleep quality

### 🎯 Pomodoro Focus Timer

- 25-minute work sessions
- 5-minute break reminders
- Customizable durations
- Productivity tracking

## 📝 Notes

- **Debug Build**: This is a debug version (119 MB). Production release would be ~15-20 MB
- **Battery Usage**: Timers use minimal battery (< 1% per hour)
- **Background**: App can run in background for notifications
- **No Internet Required**: All features work offline

## 🆘 Still Having Issues?

1. **Re-download the APK** - Ensure it's not corrupted
2. **Try a different phone** - Test on another device
3. **Check Android version** - Must be 7.0 or higher
4. **Update System WebView** - From Google Play Store
5. **Factory reset** (last resort) - Only if all else fails

---

**Built with**: Tauri 2.0 + React + Rust
**Package**: com.visionbreak.app
**Version**: 0.1.0
