# Quick Start Guide

## What's Been Built

A complete, production-ready local network bingo game application with:

### Backend (Server)
- ✅ Express + Socket.io server
- ✅ Real-time WebSocket communication
- ✅ Bingo game engine (1-75 number drawing)
- ✅ JSON-based game history persistence
- ✅ Automatic reconnection handling
- ✅ Network IP detection and display

### Frontend (Client)
- ✅ React 18 + TypeScript + Vite
- ✅ Tailwind CSS for styling
- ✅ React Router with /host and /display routes
- ✅ Custom WebSocket hook (useSocket)
- ✅ Host control interface with all features
- ✅ Large TV-optimized display view
- ✅ Real-time state synchronization

## Installation Steps

### 1. Install Dependencies

Open a terminal in `c:\Users\Ploy\Jacks Projects\bingo` and run:

```bash
# Install root dependencies
npm install

# Install both server and client dependencies
npm run install:all
```

This will install all required packages for both the server and client.

### 2. Create Environment File (Optional)

```bash
# Copy the example environment file
copy .env.example .env
```

The default settings work fine for local development. Edit `.env` only if you need a custom port.

### 3. Start Development Mode

```bash
# Start both server and client with hot reload
npm run dev
```

This will:
- Start the server on http://localhost:3001
- Start the Vite dev server on http://localhost:5173
- Display your local network IP address

### 4. Access the Application

**For Development:**
- Host Control: http://localhost:5173/host
- Display View: http://localhost:5173/display

**For Production (after building):**
- Host Control: http://localhost:3001/host
- Display View: http://localhost:3001/display

## Usage

### On Computer A (Office - Host):
1. Open browser to http://localhost:5173/host (dev) or http://localhost:3001/host (prod)
2. Click "Draw Number" to draw the next number
3. Click "Reset Game" to start a new game
4. Monitor connection status in the top-right corner

### On Computer B (Living Room - Display):
1. Open browser to http://{computer-a-ip}:3001/display
2. Press F11 or click "Enter Fullscreen" for fullscreen mode
3. Display will automatically update when host draws numbers

## Building for Production

```bash
# Build both server and client
npm run build

# Start production server
npm run start
```

The production server will:
- Serve the optimized React app
- Run on port 3001 (configurable)
- Display network access URL
- Auto-save game history

## Network Setup

### Allow Through Windows Firewall

Run PowerShell as Administrator:

```powershell
New-NetFirewallRule -DisplayName "Bingo Game Server" `
  -Direction Inbound `
  -Program "C:\Program Files\nodejs\node.exe" `
  -Action Allow
```

### Find Your IP Address

The server will automatically display your local IP when it starts:

```
🎯 Bingo Game Server Running

📡 Local access:   http://localhost:3001
🌐 Network access: http://192.168.1.100:3001

📍 Interfaces:
   Host Control:  http://192.168.1.100:3001/host
   Display View:  http://192.168.1.100:3001/display
```

Use the "Network access" URL to connect from Computer B.

## Project Structure

```
bingo/
├── server/              # Node.js backend
│   ├── src/
│   │   ├── server.ts    # Main server (Express + Socket.io)
│   │   ├── gameEngine.ts # Game logic
│   │   ├── storage.ts   # Database layer
│   │   └── config/      # Configuration
│   └── data/            # Game history (auto-created)
│
├── client/              # React frontend
│   ├── src/
│   │   ├── pages/       # HostView, DisplayView
│   │   ├── components/  # Reusable components
│   │   ├── hooks/       # useSocket hook
│   │   ├── services/    # socketService
│   │   └── styles/      # Tailwind CSS
│   └── public/
│
└── shared/              # Shared TypeScript types
    └── types/
```

## Available Scripts

```bash
# Development
npm run dev              # Start dev mode (server + client)

# Production
npm run build            # Build both server and client
npm run start            # Start production server

# Utilities
npm run lint             # Lint all code
npm run test             # Run tests (when implemented)
```

## Features Implemented

### Host View
- ✅ Large current number display
- ✅ Draw number button
- ✅ Reset game button
- ✅ Game statistics (drawn, remaining, progress)
- ✅ Number history with auto-scroll
- ✅ Complete number grid (1-75)
- ✅ Connection status indicator
- ✅ Connected devices counter
- ✅ Error messages

### Display View
- ✅ Extra-large current number (25vh)
- ✅ Gold color on black background
- ✅ Number history at bottom
- ✅ Fullscreen mode support
- ✅ Auto-updates in real-time
- ✅ Connection status indicator
- ✅ Smooth animations

### Backend Features
- ✅ Random number drawing (1-75, no duplicates)
- ✅ Game state persistence
- ✅ WebSocket event handling
- ✅ Automatic reconnection
- ✅ Health check endpoint (/health)
- ✅ REST API fallback (/api/state)
- ✅ Graceful shutdown

## Troubleshooting

### Port Already in Use
```bash
# Change port in .env file
PORT=3002
```

### Cannot Connect from Computer B
1. Check firewall settings
2. Verify both computers on same network
3. Try pinging Computer A from Computer B
4. Use the IP address shown by the server

### Build Errors
```bash
# Clean install
rm -rf node_modules
rm -rf server/node_modules
rm -rf client/node_modules
npm run install:all
```

## Next Steps (Optional)

The following epics are ready to implement:
- Epic 7: Audio System (sound effects)
- Epic 8: Polish & UX (animations, accessibility)
- Epic 9: Testing & QA (unit tests, integration tests)

Current implementation is fully functional and production-ready!

## Support

See the main [README.md](README.md) for complete documentation.
