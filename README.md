# Bingo Game - Local Network Application

A real-time bingo number drawing application designed for local home network deployment. Run bingo games with a host control interface and large-screen display.

## Features

- **Host Control Interface**: Draw numbers and manage games from Computer A
- **Large Display View**: TV-optimized display for Computer B showing current number and history
- **Real-time Sync**: WebSocket-based instant updates across all devices
- **Audio Feedback**: Sound effects when numbers are drawn
- **Automatic Reconnection**: Handles network interruptions gracefully
- **No Cloud Required**: Runs entirely on your local network

## Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Modern Web Browser**: Chrome 90+, Firefox 88+, or Edge 90+
- **Local Network**: WiFi or Ethernet (100Mbps+)

## Quick Start

### 1. Installation

```bash
# Clone the repository
git clone <repository-url>
cd bingo

# Install all dependencies
npm install
npm run install:all

# Build the application
npm run build
```

### 2. Configuration

```bash
# Copy environment file
cp .env.example .env

# Edit .env if you need custom port (optional)
```

### 3. Run the Application

**Development Mode** (for development on Computer A only):
```bash
npm run dev
```
- Vite dev server: `http://localhost:5173` or `http://192.168.68.75:5173` (after Vite config update)
- Backend server: `http://localhost:3001`
- Hot reload enabled for faster development

**Production Mode** (for actual games across network):
```bash
npm run start
```
- Server accessible on local network at displayed IP

The server will display your network IP:
```
🎯 Bingo Game Server Running
📡 Local access:   http://localhost:3001
🌐 Network access: http://192.168.68.75:3001  ← Use this IP

📍 Interfaces:
   Host Control:  http://192.168.68.75:3001/host
   Display View:  http://192.168.68.75:3001/display
```

### 4. Access the Interfaces

**Development Mode:**
- **Computer A only**: `http://localhost:5173/host` or `http://192.168.68.75:5173/host`

**Production Mode (Recommended for actual games):**

**Computer A (Office - Host):**
- Navigate to: `http://192.168.68.75:3001/host` (or use the IP shown by your server)
- Control the game: draw numbers, reset, view statistics

**Computer B (Living Room - Display):**
- Navigate to: `http://192.168.68.75:3001/display` (use Computer A's IP)
- Press F11 for fullscreen mode
- Display auto-updates when host draws numbers

**Mobile Devices (Phone/Tablet):**
- Navigate to: `http://192.168.68.75:3001/display`
- Can be used as additional display screens

## Network Setup

### Windows Firewall Configuration

```powershell
# Allow Node.js through Windows Firewall
New-NetFirewallRule -DisplayName "Bingo Game Server" `
  -Direction Inbound `
  -Program "C:\Program Files\nodejs\node.exe" `
  -Action Allow
```

### macOS Firewall Configuration

1. Go to System Preferences → Security & Privacy → Firewall
2. Click "Firewall Options"
3. Add Node.js to allowed applications

## Project Structure

```
bingo/
├── server/          # Backend Node.js server
├── client/          # React frontend
├── shared/          # Shared TypeScript types
├── prd.md          # Product Requirements Document
└── story-tracker.md # Development stories and epics
```

## Development

```bash
# Run linting
npm run lint

# Run tests
npm run test

# Build for production
npm run build
```

## Troubleshooting

### Display Can't Connect
- Check firewall settings on Computer A
- Verify the IP address is correct
- Ensure both computers are on the same network

### Audio Not Playing
- Check browser permissions for audio
- Unmute the browser tab
- Adjust volume in the host interface

### Connection Drops
- Check WiFi signal strength
- Consider using Ethernet for the display
- The app will auto-reconnect within a few seconds

## Documentation

- **[PRD](prd.md)**: Complete product requirements and technical specifications
- **[Story Tracker](story-tracker.md)**: Development epics and user stories

## Technology Stack

- **Backend**: Node.js, Express, Socket.io, TypeScript
- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Real-time**: WebSockets (Socket.io)
- **Build**: Vite, npm workspaces

## License

MIT

## Support

For issues and feature requests, please check the documentation or create an issue in the repository.
