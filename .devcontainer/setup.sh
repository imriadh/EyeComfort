#!/bin/bash

# Auto-setup script for Codespaces
# This runs automatically when the Codespace is created

echo "🚀 Setting up VisionBreak development environment..."

# Install Rust if not present
if ! command -v cargo &> /dev/null; then
    echo "📦 Installing Rust..."
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
    source "$HOME/.cargo/env"
fi

# Install system dependencies
echo "📦 Installing system dependencies..."
sudo apt-get update > /dev/null 2>&1
sudo apt-get install -y libwebkit2gtk-4.1-dev build-essential wget \
    libssl-dev libayatana-appindicator3-dev librsvg2-dev \
    openjdk-17-jdk > /dev/null 2>&1

# Add Android targets
echo "🤖 Adding Android build targets..."
source "$HOME/.cargo/env"
rustup target add aarch64-linux-android armv7-linux-androideabi \
    i686-linux-android x86_64-linux-android > /dev/null 2>&1

# Install Tauri CLI
if ! command -v cargo-tauri &> /dev/null; then
    echo "📦 Installing Tauri CLI (this may take a few minutes)..."
    cargo install tauri-cli@~2.5 --locked > /dev/null 2>&1
fi

# Add cargo to path
echo 'source "$HOME/.cargo/env"' >> ~/.bashrc

echo "✅ Setup complete!"
echo ""
echo "To get started:"
echo "  1. npm install"
echo "  2. npm run dev"
echo ""
echo "For Android builds:"
echo "  1. npm run tauri android init"
echo "  2. npm run tauri android build"
echo ""
