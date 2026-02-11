#!/bin/bash

# VisionBreak Build Script
# This script helps build the APK for different architectures

set -e

echo "🚀 VisionBreak Build Script"
echo "=========================="

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js first."
    exit 1
fi

# Check if cargo is installed
if ! command -v cargo &> /dev/null; then
    echo "❌ Rust/Cargo is not installed. Please install Rust first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if Tauri CLI is installed
if ! command -v cargo-tauri &> /dev/null; then
    echo "📦 Installing Tauri CLI..."
    cargo install tauri-cli --version ^2.0.0
fi

# Initialize Android if not done
echo "🤖 Setting up Android..."
npm run tauri android init || echo "Android already initialized"

# Build options
echo ""
echo "Select build type:"
echo "1) Debug APK (faster, larger size)"
echo "2) Release APK (optimized, smaller size)"
read -p "Enter choice [1-2]: " choice

case $choice in
    1)
        echo "🔨 Building debug APK..."
        npm run tauri android build --apk
        echo "✅ Debug APK built successfully!"
        echo "📱 Location: src-tauri/gen/android/app/build/outputs/apk/debug/"
        ;;
    2)
        echo "🔨 Building release APK..."
        npm run tauri android build --apk --release
        echo "✅ Release APK built successfully!"
        echo "📱 Location: src-tauri/gen/android/app/build/outputs/apk/release/"
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "🎉 Build complete!"
echo "📲 Install the APK on your Android device to test."
