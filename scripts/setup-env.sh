#!/bin/bash

# VisionBreak Environment Setup Script
# This script sets up the necessary environment for building Android APKs

set -e

echo "🔧 Setting up VisionBreak Build Environment"
echo "============================================"

# Source Cargo environment
if [ -f "$HOME/.cargo/env" ]; then
    source "$HOME/.cargo/env"
    echo "✅ Cargo environment loaded"
else
    echo "❌ Cargo not found. Please install Rust first."
    exit 1
fi

# Check for required tools
echo "📋 Checking required tools..."

if ! command -v cargo &> /dev/null; then
    echo "❌ Cargo not found in PATH"
    exit 1
fi
echo "✅ Cargo found: $(cargo --version)"

if ! command -v npm &> /dev/null; then
    echo "❌ npm not found"
    exit 1
fi
echo "✅ npm found: $(npm --version)"

if ! command -v cargo-tauri &> /dev/null; then
    echo "⚠️  Tauri CLI not found. Installing..."
    cargo install tauri-cli@~2.5 --locked
fi
echo "✅ Tauri CLI found: $(cargo tauri --version)"

# Check Java
if command -v java &> /dev/null; then
    echo "✅ Java found: $(java --version 2>&1 | head -n 1)"
else
    echo "⚠️  Java not found. You'll need Java 17+ for Android builds."
fi

# Add Cargo bin to current session
export PATH="$HOME/.cargo/bin:$PATH"

echo ""
echo "✅ Environment setup complete!"
echo ""
echo "Available commands:"
echo "  npm run dev              - Run web development server"
echo "  npm run build            - Build frontend"
echo "  cargo tauri dev          - Run desktop app"
echo "  cargo tauri android init - Initialize Android (one-time)"
echo "  cargo tauri android dev  - Run on Android device/emulator"
echo "  cargo tauri android build- Build Android APK"
echo ""
