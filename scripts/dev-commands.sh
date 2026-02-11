#!/bin/bash

# Quick development commands for VisionBreak
# Source this file: source scripts/dev-commands.sh

alias vb-dev="npm run dev"
alias vb-build="npm run build"
alias vb-android-init="npm run tauri android init"
alias vb-android-dev="npm run tauri:android"
alias vb-android-build="nprun tauri android build"
alias vb-setup="source scripts/setup-env.sh"

echo "VisionBreak dev commands loaded:"
echo "  vb-dev             - Start web dev server"
echo "  vb-build           - Build frontend"
echo "  vb-android-init    - Initialize Android"
echo "  vb-android-dev     - Run on Android device"
echo "  vb-android-build   - Build Android APK"
echo "  vb-setup           - Run environment check"
