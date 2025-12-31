# Story Tracker - Bingo Game Application

**Project**: Local Network Bingo Game
**Project Directory**: `c:\Users\Ploy\Jacks Projects\bingo`
**Version**: 1.0
**Last Updated**: 2025-12-30

---

## Epic Overview

| Epic ID | Epic Name | Priority | Status | Stories | Story Points |
|---------|-----------|----------|--------|---------|--------------|
| E1 | Project Foundation | P0 | Not Started | 6 | 13 |
| E2 | Backend Core | P0 | Not Started | 7 | 21 |
| E3 | Frontend Foundation | P0 | Not Started | 8 | 21 |
| E4 | Host Interface | P0 | Not Started | 6 | 13 |
| E5 | Display Interface | P0 | Not Started | 5 | 13 |
| E6 | Real-time Communication | P0 | Not Started | 6 | 21 |
| E7 | Audio System | P1 | Not Started | 4 | 8 |
| E8 | Polish & UX | P1 | Not Started | 7 | 13 |
| E9 | Testing & QA | P1 | Not Started | 6 | 13 |
| E10 | Documentation & Deployment | P1 | Not Started | 5 | 8 |

**Total Story Points**: 144

---

## Story Status Legend

- **Not Started**: Story has not begun
- **In Progress**: Actively being worked on
- **In Review**: Code complete, awaiting review
- **Done**: Completed and merged
- **Blocked**: Cannot proceed due to dependencies

---

## Epic 1: Project Foundation (E1)

**Goal**: Set up project structure, tooling, and build configuration

**Priority**: P0 - Must Have
**Story Points**: 13
**Status**: Not Started

### Stories

#### E1-S1: Initialize Monorepo Structure
**Story Points**: 2
**Priority**: P0
**Status**: Not Started

**As a** developer
**I want** a monorepo with separate client and server workspaces
**So that** I can manage dependencies and builds independently

**Acceptance Criteria**:
- [ ] Root `package.json` with npm workspaces configured
- [ ] `server/` directory created with own `package.json`
- [ ] `client/` directory created with own `package.json`
- [ ] `shared/` directory for shared types
- [ ] `.gitignore` properly configured
- [ ] `README.md` with basic project info
- [ ] All directories have proper npm workspace links

**Technical Notes**:
- Use npm workspaces, not lerna or yarn workspaces
- Shared types directory for cross-package imports

---

#### E1-S2: Configure TypeScript
**Story Points**: 2
**Priority**: P0
**Status**: Not Started

**As a** developer
**I want** TypeScript configured for both client and server
**So that** I have type safety across the entire codebase

**Acceptance Criteria**:
- [ ] `tsconfig.json` in root directory
- [ ] `server/tsconfig.json` with Node.js settings
- [ ] `client/tsconfig.json` with React settings
- [ ] Strict mode enabled
- [ ] Path aliases configured for imports
- [ ] All TypeScript files compile without errors
- [ ] Source maps enabled for debugging

**Technical Notes**:
- Use TypeScript 5.0+
- Enable `strict`, `noImplicitAny`, `strictNullChecks`
- Configure path aliases: `@/` for src directory

---

#### E1-S3: Set Up Vite for Client
**Story Points**: 2
**Priority**: P0
**Status**: Not Started

**As a** developer
**I want** Vite configured as the frontend build tool
**So that** I have fast development and optimized production builds

**Acceptance Criteria**:
- [ ] Vite installed and configured
- [ ] `vite.config.ts` with React plugin
- [ ] Hot module replacement (HMR) working
- [ ] Development server runs on port 5173
- [ ] Production build creates optimized output
- [ ] Source maps configured
- [ ] Environment variables support

**Technical Notes**:
- Configure proxy for API calls during development
- Use `@vitejs/plugin-react` for React support

---

#### E1-S4: Configure ESLint and Prettier
**Story Points**: 2
**Priority**: P0
**Status**: Not Started

**As a** developer
**I want** ESLint and Prettier configured
**So that** code quality and formatting are consistent

**Acceptance Criteria**:
- [ ] ESLint installed with TypeScript support
- [ ] Prettier installed and configured
- [ ] ESLint and Prettier work together (no conflicts)
- [ ] React-specific linting rules enabled
- [ ] `npm run lint` command works
- [ ] Pre-commit hooks optional (document but don't enforce)
- [ ] VS Code settings for auto-format on save

**Technical Notes**:
- Use `@typescript-eslint/eslint-plugin`
- Use `eslint-config-prettier` to disable conflicting rules
- Provide `.vscode/settings.json` example

---

#### E1-S5: Set Up Build Scripts
**Story Points**: 3
**Priority**: P0
**Status**: Not Started

**As a** developer
**I want** npm scripts for common tasks
**So that** I can easily build, test, and run the application

**Acceptance Criteria**:
- [ ] `npm run dev` - Run both client and server in development
- [ ] `npm run build` - Build both client and server for production
- [ ] `npm run start` - Start production server
- [ ] `npm run lint` - Lint all code
- [ ] `npm run install:all` - Install all dependencies
- [ ] Scripts work from root directory
- [ ] Concurrently configured for parallel dev mode

**Technical Notes**:
- Install `concurrently` for running parallel commands
- Server dev mode with hot reload (nodemon/tsx)
- Client dev mode with Vite HMR

---

#### E1-S6: Initialize Git Repository
**Story Points**: 2
**Priority**: P0
**Status**: Not Started

**As a** developer
**I want** Git initialized with proper ignore patterns
**So that** version control is properly set up

**Acceptance Criteria**:
- [ ] Git repository initialized
- [ ] `.gitignore` includes node_modules, dist, .env
- [ ] Initial commit with project structure
- [ ] `.env.example` file created
- [ ] `README.md` with setup instructions
- [ ] `LICENSE` file added (if applicable)

**Technical Notes**:
- Use standard Node.js `.gitignore` template
- Document environment variables in `.env.example`

---

## Epic 2: Backend Core (E2)

**Goal**: Build server foundation with Express, Socket.io, and game engine

**Priority**: P0 - Must Have
**Story Points**: 21
**Status**: Not Started

### Stories

#### E2-S1: Create Shared Type Definitions
**Story Points**: 2
**Priority**: P0
**Status**: Not Started

**As a** developer
**I want** shared TypeScript types for game state and events
**So that** client and server have type-safe communication

**Acceptance Criteria**:
- [ ] `shared/types/game.types.ts` created
- [ ] `GameState` interface defined
- [ ] `GameHistory` interface defined
- [ ] `SocketEvents` interface defined
- [ ] Types exported and importable from both client and server
- [ ] JSDoc comments for all interfaces
- [ ] No circular dependencies

**Technical Notes**:
```typescript
export interface GameState {
  drawnNumbers: number[];
  remainingNumbers: number[];
  currentNumber: number | null;
  gameStarted: boolean;
  gameId: string;
  timestamp: number;
}
```

---

#### E2-S2: Implement Express Server Setup
**Story Points**: 3
**Priority**: P0
**Status**: Not Started

**As a** developer
**I want** Express server configured to serve the application
**So that** the app is accessible on the local network

**Acceptance Criteria**:
- [ ] Express server initialized
- [ ] Server listens on `0.0.0.0` (all interfaces)
- [ ] Port configurable via environment variable (default 3001)
- [ ] CORS configured for local network access
- [ ] Static file serving for client build
- [ ] Health check endpoint (`/health`)
- [ ] Server logs startup with local IP address
- [ ] Error handling middleware

**Technical Notes**:
- Use `os.networkInterfaces()` to detect local IP
- Display both localhost and network URLs on startup
- Serve client build from `../client/dist`

---

#### E2-S3: Implement Game Engine - Number Drawing
**Story Points**: 5
**Priority**: P0
**Status**: Not Started
**Dependencies**: E2-S1

**As a** developer
**I want** a game engine that manages bingo number drawing
**So that** numbers are randomly selected without duplicates

**Acceptance Criteria**:
- [ ] `BingoGameEngine` class created
- [ ] Initialize with numbers 1-75
- [ ] `drawNumber()` method returns random from remaining
- [ ] Numbers shuffled using Fisher-Yates algorithm
- [ ] No duplicate numbers in single game
- [ ] `getState()` returns current game state
- [ ] `reset()` clears and reshuffles numbers
- [ ] Generate unique game ID on init/reset
- [ ] Comprehensive unit tests (90% coverage)

**Technical Notes**:
```typescript
class BingoGameEngine {
  private drawnNumbers: Set<number>;
  private remainingNumbers: number[];
  private currentNumber: number | null;
  private gameId: string;

  constructor() { /* ... */ }
  drawNumber(): number | null { /* ... */ }
  reset(): void { /* ... */ }
  getState(): GameState { /* ... */ }
}
```

---

#### E2-S4: Implement Socket.io Server
**Story Points**: 3
**Priority**: P0
**Status**: Not Started
**Dependencies**: E2-S2

**As a** developer
**I want** Socket.io integrated with Express
**So that** real-time communication is enabled

**Acceptance Criteria**:
- [ ] Socket.io installed and configured
- [ ] CORS configured for WebSocket connections
- [ ] Connection event handlers implemented
- [ ] Disconnect event handlers implemented
- [ ] Connection count tracked
- [ ] Reconnection configured (10 attempts, 1s delay)
- [ ] Transport configuration (websocket + polling fallback)
- [ ] Error handling for socket events

**Technical Notes**:
- Use Socket.io v4.6+
- Configure CORS to allow all origins on local network
- Log all connection/disconnection events

---

#### E2-S5: Implement WebSocket Event Handlers
**Story Points**: 5
**Priority**: P0
**Status**: Not Started
**Dependencies**: E2-S3, E2-S4

**As a** developer
**I want** WebSocket event handlers for game actions
**So that** clients can interact with the game

**Acceptance Criteria**:
- [ ] `draw_number` event handler implemented
- [ ] `reset_game` event handler implemented
- [ ] `get_state` event handler implemented
- [ ] Events broadcast to all connected clients
- [ ] `number_drawn` event emitted on draw
- [ ] `game_state` event emitted on state change
- [ ] `game_reset` event emitted on reset
- [ ] `connection_count` event emitted on connect/disconnect
- [ ] Input validation on all incoming events
- [ ] Rate limiting (max 10 draws/second)

**Technical Notes**:
- Use `socket.broadcast.emit()` for broadcasting
- Validate event payloads before processing
- Log all game events for debugging

---

#### E2-S6: Implement JSON Persistence
**Story Points**: 2
**Priority**: P0
**Status**: Not Started
**Dependencies**: E2-S3

**As a** developer
**I want** game history persisted to JSON file
**So that** game data survives server restarts

**Acceptance Criteria**:
- [ ] Lowdb installed and configured
- [ ] `server/data/gameHistory.json` created
- [ ] Save game state on each draw
- [ ] Save game metadata (start/end time, ID)
- [ ] Load history on server startup
- [ ] Handle file corruption gracefully
- [ ] Async write operations (non-blocking)
- [ ] File size monitoring (warn if > 1MB)

**Technical Notes**:
- Use lowdb v6.0+ with async adapter
- Initialize with empty array if file doesn't exist
- Create `data/` directory if missing

---

#### E2-S7: Implement Server Configuration
**Story Points**: 1
**Priority**: P0
**Status**: Not Started

**As a** developer
**I want** centralized server configuration
**So that** settings are manageable and documented

**Acceptance Criteria**:
- [ ] `server/src/config/config.ts` created
- [ ] Environment variables loaded from `.env`
- [ ] Default values for all config options
- [ ] Port configuration
- [ ] CORS configuration
- [ ] Network IP detection function
- [ ] Config validation on startup
- [ ] TypeScript types for configuration

**Technical Notes**:
- Use `dotenv` for environment variables
- Validate required config on startup
- Export typed config object

---

## Epic 3: Frontend Foundation (E3)

**Goal**: Build React application foundation with routing and core components

**Priority**: P0 - Must Have
**Story Points**: 21
**Status**: Not Started

### Stories

#### E3-S1: Set Up React Application Structure
**Story Points**: 2
**Priority**: P0
**Status**: Not Started

**As a** developer
**I want** React application initialized with proper structure
**So that** I have a solid foundation for building features

**Acceptance Criteria**:
- [ ] React 18 installed
- [ ] `src/main.tsx` entry point created
- [ ] `src/App.tsx` root component created
- [ ] `index.html` configured
- [ ] Folder structure: pages, components, hooks, services
- [ ] Development server starts successfully
- [ ] Hot module replacement works

**Technical Notes**:
- Use `React.StrictMode` in development
- Configure Vite for React Fast Refresh

---

#### E3-S2: Configure React Router
**Story Points**: 2
**Priority**: P0
**Status**: Not Started
**Dependencies**: E3-S1

**As a** developer
**I want** React Router configured with /host and /display routes
**So that** users can access different views

**Acceptance Criteria**:
- [ ] React Router v6 installed
- [ ] `BrowserRouter` configured in `App.tsx`
- [ ] `/host` route points to HostView
- [ ] `/display` route points to DisplayView
- [ ] `/` redirects to `/host`
- [ ] 404 page for unknown routes
- [ ] Navigation works without page reload

**Technical Notes**:
- Use `createBrowserRouter` and `RouterProvider`
- Consider lazy loading for routes (optional)

---

#### E3-S3: Set Up Tailwind CSS
**Story Points**: 2
**Priority**: P0
**Status**: Not Started
**Dependencies**: E3-S1

**As a** developer
**I want** Tailwind CSS configured for styling
**So that** I can rapidly build responsive UIs

**Acceptance Criteria**:
- [ ] Tailwind CSS installed
- [ ] `tailwind.config.js` configured
- [ ] PostCSS configured
- [ ] Tailwind directives in `index.css`
- [ ] Custom colors defined (gold, dark bg)
- [ ] Responsive breakpoints configured
- [ ] JIT mode enabled
- [ ] Purge configured for production

**Technical Notes**:
- Add custom colors for bingo theme
- Configure dark mode strategy
- Use `@tailwind` directives in CSS

---

#### E3-S4: Create Socket Service Layer
**Story Points**: 3
**Priority**: P0
**Status**: Not Started
**Dependencies**: E2-S4

**As a** developer
**I want** a service layer for Socket.io client
**So that** WebSocket logic is encapsulated

**Acceptance Criteria**:
- [ ] `services/socketService.ts` created
- [ ] Socket.io-client installed
- [ ] Connection function implemented
- [ ] Disconnect function implemented
- [ ] Event emission helpers
- [ ] Event listener helpers
- [ ] TypeScript types for all methods
- [ ] Error handling for connection failures

**Technical Notes**:
```typescript
class SocketService {
  private socket: Socket | null = null;

  connect(url: string): void { /* ... */ }
  disconnect(): void { /* ... */ }
  emit(event: string, data: any): void { /* ... */ }
  on(event: string, callback: Function): void { /* ... */ }
}
```

---

#### E3-S5: Create useSocket Custom Hook
**Story Points**: 5
**Priority**: P0
**Status**: Not Started
**Dependencies**: E3-S4

**As a** developer
**I want** a custom React hook for WebSocket management
**So that** components can easily access real-time data

**Acceptance Criteria**:
- [ ] `hooks/useSocket.ts` created
- [ ] Manages socket connection lifecycle
- [ ] Returns connection status
- [ ] Returns current game state
- [ ] Provides `drawNumber` function
- [ ] Provides `resetGame` function
- [ ] Handles reconnection automatically
- [ ] Resyncs state on reconnect
- [ ] Cleans up on component unmount
- [ ] TypeScript types for return values

**Technical Notes**:
```typescript
function useSocket(serverUrl: string) {
  const [connected, setConnected] = useState(false);
  const [gameState, setGameState] = useState<GameState | null>(null);

  // ... implementation

  return { connected, gameState, drawNumber, resetGame };
}
```

---

#### E3-S6: Create BingoBoard Component
**Story Points**: 3
**Priority**: P0
**Status**: Not Started
**Dependencies**: E3-S1

**As a** developer
**I want** a component displaying all 75 bingo numbers
**So that** users can see which numbers have been called

**Acceptance Criteria**:
- [ ] `components/BingoBoard.tsx` created
- [ ] Displays numbers 1-75 in grid layout
- [ ] Highlights drawn numbers
- [ ] Responsive design (mobile to desktop)
- [ ] Proper spacing and alignment
- [ ] Accessible (ARIA labels)
- [ ] Accepts `drawnNumbers` prop
- [ ] Uses Tailwind for styling

**Technical Notes**:
- Grid: 5 columns on mobile, 10+ on desktop
- Visual distinction for called vs uncalled numbers
- Consider B-I-N-G-O column headers (optional)

---

#### E3-S7: Create NumberHistory Component
**Story Points**: 2
**Priority**: P0
**Status**: Not Started
**Dependencies**: E3-S1

**As a** developer
**I want** a component showing the history of called numbers
**So that** users can review which numbers have been drawn

**Acceptance Criteria**:
- [ ] `components/NumberHistory.tsx` created
- [ ] Displays numbers in draw order
- [ ] Scrollable container
- [ ] Most recent number highlighted
- [ ] Responsive layout
- [ ] Auto-scrolls to latest number
- [ ] Accepts `drawnNumbers` prop
- [ ] Empty state when no numbers drawn

**Technical Notes**:
- Use flexbox or grid for layout
- Auto-scroll with `scrollIntoView()` on new number
- Reverse order (latest first) vs chronological

---

#### E3-S8: Create ConnectionStatus Component
**Story Points**: 2
**Priority**: P0
**Status**: Not Started
**Dependencies**: E3-S5

**As a** developer
**I want** a component showing WebSocket connection status
**So that** users know if they're connected to the server

**Acceptance Criteria**:
- [ ] `components/ConnectionStatus.tsx` created
- [ ] Shows green indicator when connected
- [ ] Shows red indicator when disconnected
- [ ] Shows yellow indicator when reconnecting
- [ ] Tooltip with connection state
- [ ] Position: top-right corner
- [ ] Minimal, non-intrusive design
- [ ] Accepts `connected` prop

**Technical Notes**:
- Use colored dot or icon
- Optional text label (Connected/Disconnected)
- Consider pulse animation for reconnecting state

---

## Epic 4: Host Interface (E4)

**Goal**: Build the host control interface for Computer A

**Priority**: P0 - Must Have
**Story Points**: 13
**Status**: Not Started

### Stories

#### E4-S1: Create HostView Page Component
**Story Points**: 3
**Priority**: P0
**Status**: Not Started
**Dependencies**: E3-S2, E3-S5

**As a** game host
**I want** a control interface to manage the game
**So that** I can draw numbers and reset the game

**Acceptance Criteria**:
- [ ] `pages/HostView.tsx` created
- [ ] Uses `useSocket` hook
- [ ] Displays current number prominently
- [ ] Shows drawn and remaining counts
- [ ] Responsive layout
- [ ] Clean, professional design
- [ ] Imports and uses child components
- [ ] Handles loading state

**Technical Notes**:
- Center-aligned layout
- Large current number display (15vh)
- Control buttons below current number

---

#### E4-S2: Create DrawButton Component
**Story Points**: 2
**Priority**: P0
**Status**: Not Started
**Dependencies**: E3-S1

**As a** game host
**I want** a button to draw the next number
**So that** I can advance the game

**Acceptance Criteria**:
- [ ] `components/DrawButton.tsx` created
- [ ] Large, prominent button
- [ ] Calls `drawNumber` on click
- [ ] Disabled when no numbers remain
- [ ] Visual feedback on hover/click
- [ ] Accessible (keyboard navigation)
- [ ] Loading state during draw
- [ ] Accepts `onClick` and `disabled` props

**Technical Notes**:
- Button height: 3em minimum
- Primary color background
- Prevent double-clicks (debounce)

---

#### E4-S3: Implement Game Statistics Display
**Story Points**: 2
**Priority**: P0
**Status**: Not Started
**Dependencies**: E4-S1

**As a** game host
**I want** to see game statistics
**So that** I know how many numbers have been drawn

**Acceptance Criteria**:
- [ ] Display drawn count
- [ ] Display remaining count
- [ ] Display progress percentage
- [ ] Clear, readable typography
- [ ] Updates in real-time
- [ ] Positioned below controls
- [ ] Responsive design

**Technical Notes**:
- Format: "Drawn: 12 | Remaining: 63 | Progress: 16%"
- Consider progress bar visualization

---

#### E4-S4: Implement Reset Game Functionality
**Story Points**: 2
**Priority**: P0
**Status**: Not Started
**Dependencies**: E4-S1

**As a** game host
**I want** to reset the game
**So that** I can start a new bingo session

**Acceptance Criteria**:
- [ ] Reset button created
- [ ] Confirmation dialog before reset
- [ ] Calls `resetGame` on confirm
- [ ] Clears all state
- [ ] Visual feedback on reset
- [ ] Secondary button styling (less prominent than Draw)
- [ ] Keyboard shortcut (optional)

**Technical Notes**:
- Use browser confirm() or custom modal
- Position below Draw button
- Confirm message: "Reset game and clear all numbers?"

---

#### E4-S5: Integrate Number History in Host View
**Story Points**: 2
**Priority**: P0
**Status**: Not Started
**Dependencies**: E3-S7, E4-S1

**As a** game host
**I want** to see the history of drawn numbers
**So that** I can verify which numbers have been called

**Acceptance Criteria**:
- [ ] NumberHistory component integrated
- [ ] Positioned below statistics
- [ ] Scrollable container
- [ ] Max height: 30vh
- [ ] Shows all drawn numbers
- [ ] Responsive design

**Technical Notes**:
- Grid layout: 8-10 numbers per row
- Clear visual hierarchy

---

#### E4-S6: Add Keyboard Shortcuts for Host
**Story Points**: 2
**Priority**: P1
**Status**: Not Started
**Dependencies**: E4-S2, E4-S4

**As a** game host
**I want** keyboard shortcuts for common actions
**So that** I can operate the game efficiently

**Acceptance Criteria**:
- [ ] Spacebar draws next number
- [ ] Enter draws next number
- [ ] Escape key to show reset confirm
- [ ] Shortcuts documented on page
- [ ] Event listeners properly cleaned up
- [ ] Shortcuts don't interfere with input fields

**Technical Notes**:
- Use `useEffect` for event listeners
- Prevent default browser behavior
- Display shortcuts in help tooltip

---

## Epic 5: Display Interface (E5)

**Goal**: Build the large-screen display interface for Computer B

**Priority**: P0 - Must Have
**Story Points**: 13
**Status**: Not Started

### Stories

#### E5-S1: Create DisplayView Page Component
**Story Points**: 3
**Priority**: P0
**Status**: Not Started
**Dependencies**: E3-S2, E3-S5

**As a** player
**I want** a large display showing the current number
**So that** I can see which number was just called

**Acceptance Criteria**:
- [ ] `pages/DisplayView.tsx` created
- [ ] Uses `useSocket` hook
- [ ] Read-only interface (no controls)
- [ ] Fullscreen-optimized layout
- [ ] Dark background (#000)
- [ ] Extra-large current number (25vh)
- [ ] Responsive to screen size
- [ ] Connection status indicator

**Technical Notes**:
- Maximize screen real estate
- No margins/padding on outer container
- Gold (#FFD700) or white text on black background

---

#### E5-S2: Implement Large Current Number Display
**Story Points**: 2
**Priority**: P0
**Status**: Not Started
**Dependencies**: E5-S1

**As a** player
**I want** the current number displayed very large
**So that** I can see it from across the room

**Acceptance Criteria**:
- [ ] Font size: 25vh minimum
- [ ] Ultra-bold weight (800)
- [ ] Centered on screen
- [ ] Gold (#FFD700) color
- [ ] Readable from 20+ feet
- [ ] Smooth transition on number change
- [ ] No number shows "—" or "Ready"

**Technical Notes**:
- Use viewport units (vh) for responsiveness
- Consider glow effect for visibility
- Test on actual TV screen

---

#### E5-S3: Implement Number Change Animation
**Story Points**: 3
**Priority**: P0
**Status**: Not Started
**Dependencies**: E5-S2

**As a** player
**I want** smooth animations when numbers change
**So that** new numbers are eye-catching

**Acceptance Criteria**:
- [ ] Fade-in animation on new number
- [ ] Scale animation (zoom in slightly)
- [ ] Duration: 300-500ms
- [ ] GPU-accelerated (CSS transforms)
- [ ] No jank or stuttering
- [ ] Accessible (respects prefers-reduced-motion)

**Technical Notes**:
- Use CSS transitions or Framer Motion
- `transform: scale()` for zoom
- `opacity` for fade
- Test on lower-end devices

---

#### E5-S4: Integrate Number History in Display View
**Story Points**: 2
**Priority**: P0
**Status**: Not Started
**Dependencies**: E3-S7, E5-S1

**As a** player
**I want** to see the history of called numbers
**So that** I can verify if I missed any numbers

**Acceptance Criteria**:
- [ ] NumberHistory component integrated
- [ ] Positioned at bottom of screen
- [ ] Large font size (4vh)
- [ ] Horizontal scrolling or wrapping
- [ ] White or light text
- [ ] Shows last 20-30 numbers
- [ ] Auto-scrolls to latest

**Technical Notes**:
- Bottom 20% of screen
- Scrollable horizontally or grid wrap
- Latest number highlighted

---

#### E5-S5: Implement Fullscreen Mode Helper
**Story Points**: 3
**Priority**: P0
**Status**: Not Started
**Dependencies**: E5-S1

**As a** player
**I want** easy access to fullscreen mode
**So that** the display uses the entire TV screen

**Acceptance Criteria**:
- [ ] Fullscreen button visible on page load
- [ ] Button fades out after 5 seconds
- [ ] Clicking enters fullscreen mode
- [ ] F11 also enters fullscreen
- [ ] Exit fullscreen with Escape
- [ ] Instructions shown briefly
- [ ] Works on Chrome, Firefox, Edge

**Technical Notes**:
- Use Fullscreen API
- Show button/instructions for 5s, then fade
- Handle fullscreen API browser differences

---

## Epic 6: Real-time Communication (E6)

**Goal**: Implement robust WebSocket communication with reconnection

**Priority**: P0 - Must Have
**Story Points**: 21
**Status**: Not Started

### Stories

#### E6-S1: Implement draw_number Event Flow
**Story Points**: 3
**Priority**: P0
**Status**: Not Started
**Dependencies**: E2-S5, E3-S5

**As a** system
**I want** to handle draw_number events correctly
**So that** numbers are drawn and broadcast reliably

**Acceptance Criteria**:
- [ ] Client emits `draw_number` event
- [ ] Server validates request
- [ ] Server calls gameEngine.drawNumber()
- [ ] Server broadcasts `number_drawn` to all clients
- [ ] Server sends updated `game_state`
- [ ] All clients receive update within 100ms
- [ ] Error handling if no numbers remain
- [ ] Integration test for full flow

**Technical Notes**:
- Rate limiting on server side
- Validate gameEngine state before drawing
- Log all draw events

---

#### E6-S2: Implement reset_game Event Flow
**Story Points**: 2
**Priority**: P0
**Status**: Not Started
**Dependencies**: E2-S5, E3-S5

**As a** system
**I want** to handle reset_game events correctly
**So that** games can be restarted cleanly

**Acceptance Criteria**:
- [ ] Client emits `reset_game` event
- [ ] Server validates request
- [ ] Server calls gameEngine.reset()
- [ ] Server broadcasts `game_reset` to all clients
- [ ] Server sends fresh `game_state`
- [ ] All clients clear their state
- [ ] History persisted to storage
- [ ] Integration test for full flow

**Technical Notes**:
- Save completed game to history before reset
- Emit events in correct order

---

#### E6-S3: Implement get_state Event Flow
**Story Points**: 2
**Priority**: P0
**Status**: Not Started
**Dependencies**: E2-S5, E3-S5

**As a** system
**I want** to handle get_state requests
**So that** clients can resync after reconnection

**Acceptance Criteria**:
- [ ] Client emits `get_state` on reconnect
- [ ] Server retrieves current gameEngine state
- [ ] Server sends `game_state` to requesting client only
- [ ] State includes all drawn numbers
- [ ] State includes current number
- [ ] State includes game ID
- [ ] Integration test for flow

**Technical Notes**:
- Use `socket.emit()` not `io.emit()` (single client)
- Called automatically on reconnection

---

#### E6-S4: Implement Automatic Reconnection Logic
**Story Points**: 5
**Priority**: P0
**Status**: Not Started
**Dependencies**: E3-S5

**As a** user
**I want** automatic reconnection when network drops
**So that** I don't have to manually refresh

**Acceptance Criteria**:
- [ ] Socket.io reconnection enabled
- [ ] Max 10 reconnection attempts
- [ ] Exponential backoff (1s, 2s, 4s, ...)
- [ ] Visual indicator during reconnection
- [ ] Auto-request state on successful reconnect
- [ ] User notified if reconnection fails
- [ ] Works across network interruptions

**Technical Notes**:
- Configure in Socket.io client options
- Listen to `reconnect_attempt` event
- Listen to `reconnect_failed` event
- Test by disabling WiFi

---

#### E6-S5: Implement Connection Status Tracking
**Story Points**: 3
**Priority**: P0
**Status**: Not Started
**Dependencies**: E3-S8, E6-S4

**As a** user
**I want** to see real-time connection status
**So that** I know if I'm connected to the server

**Acceptance Criteria**:
- [ ] Track connected/disconnected/reconnecting states
- [ ] Update ConnectionStatus component
- [ ] Green indicator when connected
- [ ] Red indicator when disconnected
- [ ] Yellow indicator when reconnecting
- [ ] Tooltip shows state and attempt count
- [ ] Updates in real-time

**Technical Notes**:
- Listen to socket `connect`, `disconnect`, `reconnect_attempt`
- Use React state to track status
- Pass to ConnectionStatus component

---

#### E6-S6: Implement Connection Count Broadcasting
**Story Points**: 2
**Priority**: P1
**Status**: Not Started
**Dependencies**: E2-S5

**As a** host
**I want** to see how many displays are connected
**So that** I know if everyone is ready

**Acceptance Criteria**:
- [ ] Server tracks connected client count
- [ ] Server broadcasts count on connect/disconnect
- [ ] Host view displays connection count
- [ ] Display updates in real-time
- [ ] Shown in host view only (not display)

**Technical Notes**:
- Use `io.engine.clientsCount` or track manually
- Emit `connection_count` event
- Display in host view header

---

#### E6-S7: Implement Error Event Handling
**Story Points**: 4
**Priority**: P0
**Status**: Not Started
**Dependencies**: E2-S5, E3-S5

**As a** user
**I want** clear error messages when something goes wrong
**So that** I can understand and resolve issues

**Acceptance Criteria**:
- [ ] Server emits `error` events with messages
- [ ] Client listens for error events
- [ ] Errors displayed to user (toast/alert)
- [ ] Errors logged to console
- [ ] Common errors handled gracefully
- [ ] Errors auto-dismiss after 5s
- [ ] Critical errors require acknowledgment

**Technical Notes**:
- Use toast library (react-hot-toast)
- Different error types: info, warning, error
- Don't expose sensitive server details

---

## Epic 7: Audio System (E7)

**Goal**: Implement sound effects and audio controls

**Priority**: P1 - Should Have
**Story Points**: 8
**Status**: Not Started

### Stories

#### E7-S1: Integrate Howler.js Library
**Story Points**: 1
**Priority**: P1
**Status**: Not Started
**Dependencies**: E3-S1

**As a** developer
**I want** Howler.js integrated for audio playback
**So that** I have cross-browser audio support

**Acceptance Criteria**:
- [ ] Howler.js installed
- [ ] Audio utility file created
- [ ] Can play/pause/stop sounds
- [ ] Works on Chrome, Firefox, Edge
- [ ] No console errors

**Technical Notes**:
- Install `howler` package
- Create `utils/audioUtils.ts`

---

#### E7-S2: Add Sound Effect Assets
**Story Points**: 1
**Priority**: P1
**Status**: Not Started

**As a** developer
**I want** sound effect files in the project
**So that** I can play them on game events

**Acceptance Criteria**:
- [ ] `assets/sounds/draw.mp3` added (number draw sound)
- [ ] Sounds are optimized (< 100KB each)
- [ ] MP3 format for wide compatibility
- [ ] Sounds preloaded on app start
- [ ] License allows commercial use (if applicable)

**Technical Notes**:
- Find royalty-free sounds or create simple beep
- Use Audacity for optimization
- Consider OGG fallback for Firefox

---

#### E7-S3: Create AudioPlayer Component
**Story Points**: 3
**Priority**: P1
**Status**: Not Started
**Dependencies**: E7-S1, E7-S2

**As a** user
**I want** sound to play when a number is drawn
**So that** I have audio feedback for the event

**Acceptance Criteria**:
- [ ] `components/AudioPlayer.tsx` created
- [ ] Plays sound on number draw event
- [ ] Preloads sound files on mount
- [ ] Respects volume settings
- [ ] Respects mute setting
- [ ] No delay (< 50ms latency)
- [ ] Works after user interaction (browser requirement)

**Technical Notes**:
- Use `useEffect` to listen for gameState changes
- Play sound when `currentNumber` changes
- Handle browser autoplay restrictions

---

#### E7-S4: Implement Volume Controls
**Story Points**: 3
**Priority**: P1
**Status**: Not Started
**Dependencies**: E7-S3

**As a** user
**I want** to control audio volume
**So that** I can adjust sound to my preference

**Acceptance Criteria**:
- [ ] Volume slider in host view
- [ ] Volume range 0-100%
- [ ] Mute/unmute button
- [ ] Volume persisted to localStorage
- [ ] Updates take effect immediately
- [ ] Visual feedback (speaker icon changes)
- [ ] Keyboard shortcuts (optional)

**Technical Notes**:
- Use HTML range input or custom slider
- Store in localStorage: `bingoGameVolume`
- Speaker icons: muted, low, medium, high

---

## Epic 8: Polish & UX (E8)

**Goal**: Enhance user experience with polish and refinements

**Priority**: P1 - Should Have
**Story Points**: 13
**Status**: Not Started

### Stories

#### E8-S1: Implement Loading States
**Story Points**: 2
**Priority**: P1
**Status**: Not Started
**Dependencies**: E3-S5

**As a** user
**I want** loading indicators during async operations
**So that** I know the system is working

**Acceptance Criteria**:
- [ ] Loading spinner when connecting to server
- [ ] Loading state during number draw
- [ ] Skeleton loaders for components
- [ ] Disabled buttons during operations
- [ ] Loading overlay if appropriate
- [ ] Accessible (ARIA live regions)

**Technical Notes**:
- Use CSS spinners or react-loading library
- Show immediately, hide after operation complete

---

#### E8-S2: Add Error Boundary
**Story Points**: 2
**Priority**: P1
**Status**: Not Started
**Dependencies**: E3-S1

**As a** user
**I want** graceful error handling for crashes
**So that** the app doesn't break completely

**Acceptance Criteria**:
- [ ] React Error Boundary implemented
- [ ] Fallback UI shows friendly error
- [ ] Error logged to console
- [ ] Reset button to recover
- [ ] Doesn't affect server state
- [ ] Works in production build

**Technical Notes**:
- Use `ErrorBoundary` class component
- Provide "Something went wrong" message
- Log errors for debugging

---

#### E8-S3: Implement Empty States
**Story Points**: 1
**Priority**: P1
**Status**: Not Started
**Dependencies**: E3-S7, E4-S1

**As a** user
**I want** helpful messages when there's no data
**So that** I understand what to do next

**Acceptance Criteria**:
- [ ] Empty state for number history (no numbers drawn)
- [ ] Message: "No numbers drawn yet. Click Draw to start!"
- [ ] Empty state for display (game not started)
- [ ] Centered, clear messaging
- [ ] Icon or illustration (optional)

**Technical Notes**:
- Check if `drawnNumbers.length === 0`
- Display placeholder content

---

#### E8-S4: Add Visual Feedback for Actions
**Story Points**: 2
**Priority**: P1
**Status**: Not Started
**Dependencies**: E4-S2, E4-S4

**As a** user
**I want** visual feedback when I click buttons
**So that** I know my action was registered

**Acceptance Criteria**:
- [ ] Hover effects on buttons
- [ ] Active/pressed states
- [ ] Ripple effect on click (optional)
- [ ] Disabled state styling
- [ ] Cursor changes to pointer on hover
- [ ] Smooth transitions

**Technical Notes**:
- Use CSS transitions
- Tailwind hover: and active: variants
- Consider Framer Motion for advanced effects

---

#### E8-S5: Improve Accessibility
**Story Points**: 3
**Priority**: P1
**Status**: Not Started
**Dependencies**: E4-S1, E5-S1

**As a** user with disabilities
**I want** the app to be accessible
**So that** I can use it with assistive technologies

**Acceptance Criteria**:
- [ ] ARIA labels on all interactive elements
- [ ] Keyboard navigation works throughout
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG AA
- [ ] Screen reader announces state changes
- [ ] Semantic HTML elements
- [ ] Skip to main content link

**Technical Notes**:
- Use `aria-label`, `aria-describedby`
- Test with keyboard only
- Test with screen reader (NVDA/JAWS)
- Use axe DevTools for auditing

---

#### E8-S6: Optimize Performance
**Story Points**: 2
**Priority**: P1
**Status**: Not Started
**Dependencies**: E3-S1

**As a** user
**I want** the app to be fast and responsive
**So that** I have a smooth experience

**Acceptance Criteria**:
- [ ] Lighthouse score > 90
- [ ] Lazy load routes (code splitting)
- [ ] Memoize expensive computations
- [ ] Optimize re-renders
- [ ] Bundle size < 500KB gzipped
- [ ] First Contentful Paint < 1s

**Technical Notes**:
- Use React.memo for components
- Use useMemo and useCallback appropriately
- Analyze bundle with Vite rollup visualizer
- Tree-shake unused code

---

#### E8-S7: Add Favicon and App Metadata
**Story Points**: 1
**Priority**: P1
**Status**: Not Started

**As a** user
**I want** proper branding and metadata
**So that** the app looks professional

**Acceptance Criteria**:
- [ ] Favicon created and added
- [ ] Page title: "Bingo Game - Host" / "Bingo Game - Display"
- [ ] Meta description added
- [ ] Open Graph tags (optional)
- [ ] Proper viewport meta tag
- [ ] Theme color meta tag

**Technical Notes**:
- Generate favicon in multiple sizes
- Use React Helmet for dynamic titles
- Test on mobile devices

---

## Epic 9: Testing & QA (E9)

**Goal**: Ensure quality through comprehensive testing

**Priority**: P1 - Should Have
**Story Points**: 13
**Status**: Not Started

### Stories

#### E9-S1: Write Unit Tests for Game Engine
**Story Points**: 3
**Priority**: P1
**Status**: Not Started
**Dependencies**: E2-S3

**As a** developer
**I want** comprehensive tests for game engine
**So that** core logic is verified and regression-proof

**Acceptance Criteria**:
- [ ] Test number drawing randomness
- [ ] Test no duplicate numbers
- [ ] Test reset functionality
- [ ] Test getState returns correct data
- [ ] Test edge cases (all numbers drawn)
- [ ] 90%+ code coverage
- [ ] All tests pass

**Technical Notes**:
- Use Vitest
- Mock random number generation for deterministic tests
- Test file: `gameEngine.test.ts`

---

#### E9-S2: Write Unit Tests for Utilities
**Story Points**: 2
**Priority**: P1
**Status**: Not Started
**Dependencies**: E7-S1

**As a** developer
**I want** tests for utility functions
**So that** helpers are reliable

**Acceptance Criteria**:
- [ ] Test audio utility functions
- [ ] Test configuration utilities
- [ ] Test number formatting (if applicable)
- [ ] 90%+ code coverage
- [ ] All tests pass

**Technical Notes**:
- Mock Howler.js for audio tests
- Test edge cases and error conditions

---

#### E9-S3: Write Integration Tests for WebSocket Events
**Story Points**: 3
**Priority**: P1
**Status**: Not Started
**Dependencies**: E6-S1, E6-S2, E6-S3

**As a** developer
**I want** tests for WebSocket event flows
**So that** client-server communication is verified

**Acceptance Criteria**:
- [ ] Test draw_number event flow
- [ ] Test reset_game event flow
- [ ] Test get_state event flow
- [ ] Test broadcasting to multiple clients
- [ ] Mock Socket.io for tests
- [ ] All tests pass

**Technical Notes**:
- Use `socket.io-client` in test mode
- Mock server with Socket.io mock
- Test file: `socketEvents.test.ts`

---

#### E9-S4: Perform Manual Testing on Actual Devices
**Story Points**: 3
**Priority**: P1
**Status**: Not Started
**Dependencies**: E4-S1, E5-S1

**As a** QA tester
**I want** to test on real devices
**So that** I verify it works in production environment

**Acceptance Criteria**:
- [ ] Test on Computer A (host)
- [ ] Test on Computer B (display on TV)
- [ ] Test network connectivity
- [ ] Test reconnection scenarios
- [ ] Test audio playback
- [ ] Test fullscreen mode
- [ ] Document any issues found
- [ ] All critical issues resolved

**Technical Notes**:
- Test checklist in PRD section 7.3
- Test with real WiFi network
- Test disconnecting/reconnecting WiFi

---

#### E9-S5: Cross-Browser Testing
**Story Points**: 1
**Priority**: P1
**Status**: Not Started
**Dependencies**: E4-S1, E5-S1

**As a** QA tester
**I want** to test on multiple browsers
**So that** the app works for all users

**Acceptance Criteria**:
- [ ] Test on Chrome 90+
- [ ] Test on Firefox 88+
- [ ] Test on Edge 90+
- [ ] Test on Safari 14+ (if Mac available)
- [ ] All core features work
- [ ] No console errors
- [ ] Visual consistency across browsers

**Technical Notes**:
- Use BrowserStack or manual testing
- Focus on WebSocket and audio compatibility

---

#### E9-S6: Performance Testing
**Story Points**: 1
**Priority**: P1
**Status**: Not Started
**Dependencies**: E8-S6

**As a** developer
**I want** to verify performance metrics
**So that** the app meets performance requirements

**Acceptance Criteria**:
- [ ] Lighthouse audit score > 90
- [ ] Draw latency < 100ms (p95)
- [ ] Page load < 2s on local network
- [ ] No memory leaks during 4-hour session
- [ ] Bundle size < 500KB gzipped
- [ ] Performance budget enforced

**Technical Notes**:
- Use Lighthouse CI
- Use Chrome DevTools Performance tab
- Monitor memory with heap snapshots
- Test extended sessions

---

## Epic 10: Documentation & Deployment (E10)

**Goal**: Create comprehensive documentation and deployment guides

**Priority**: P1 - Should Have
**Story Points**: 8
**Status**: Not Started

### Stories

#### E10-S1: Write README with Setup Instructions
**Story Points**: 2
**Priority**: P1
**Status**: Not Started

**As a** new user
**I want** clear setup instructions
**So that** I can install and run the application

**Acceptance Criteria**:
- [ ] README.md created in root
- [ ] Prerequisites listed (Node.js version)
- [ ] Installation steps
- [ ] Development mode instructions
- [ ] Production mode instructions
- [ ] Troubleshooting section
- [ ] Screenshots (optional)
- [ ] License information

**Technical Notes**:
- Use markdown formatting
- Include code blocks for commands
- Test instructions on fresh machine

---

#### E10-S2: Document Network Configuration
**Story Points**: 2
**Priority**: P1
**Status**: Not Started

**As a** user
**I want** network configuration documentation
**So that** I can expose the server on my local network

**Acceptance Criteria**:
- [ ] Firewall configuration for Windows
- [ ] Firewall configuration for macOS
- [ ] Firewall configuration for Linux
- [ ] Router configuration (if needed)
- [ ] Static IP assignment guide
- [ ] Troubleshooting connectivity issues
- [ ] Port forwarding (if applicable)

**Technical Notes**:
- Include PowerShell commands for Windows
- Include iptables commands for Linux
- Warn about security implications

---

#### E10-S3: Create User Guide
**Story Points**: 2
**Priority**: P1
**Status**: Not Started

**As a** user
**I want** a guide on how to use the application
**So that** I can run bingo games successfully

**Acceptance Criteria**:
- [ ] How to start a new game
- [ ] How to draw numbers
- [ ] How to reset the game
- [ ] How to connect display screen
- [ ] How to adjust volume
- [ ] How to enter fullscreen
- [ ] Keyboard shortcuts reference
- [ ] FAQ section

**Technical Notes**:
- Create separate USER_GUIDE.md
- Use screenshots and diagrams
- Keep language simple and non-technical

---

#### E10-S4: Document Code and Architecture
**Story Points**: 1
**Priority**: P1
**Status**: Not Started

**As a** developer
**I want** code documentation
**So that** I can understand and maintain the codebase

**Acceptance Criteria**:
- [ ] JSDoc comments on all public functions
- [ ] Architecture diagram in README
- [ ] Technology stack documented
- [ ] Folder structure explained
- [ ] WebSocket event flow documented
- [ ] Contributing guidelines (if open source)

**Technical Notes**:
- Use JSDoc format
- Consider generating docs with TypeDoc
- Include data flow diagrams

---

#### E10-S5: Create Deployment Checklist
**Story Points**: 1
**Priority**: P1
**Status**: Not Started

**As a** user
**I want** a deployment checklist
**So that** I don't miss any steps when setting up

**Acceptance Criteria**:
- [ ] Pre-deployment checklist
- [ ] Installation checklist
- [ ] Configuration checklist
- [ ] Testing checklist
- [ ] Go-live checklist
- [ ] Rollback procedure

**Technical Notes**:
- Create DEPLOYMENT.md
- Checkbox format for easy tracking
- Include validation steps

---

## Prioritization Framework

### Priority Definitions

**P0 (Must Have)**
- Blocks core functionality
- Required for MVP
- Must be completed for v1.0

**P1 (Should Have)**
- Important for user experience
- Enhances core functionality
- Targets v1.0 but can slip to v1.1

**P2 (Nice to Have)**
- Optional enhancements
- Future improvements
- Post-v1.0 features

---

## Story Point Scale

**1 Point**: Trivial (< 2 hours)
- Configuration changes
- Simple UI adjustments
- Documentation updates

**2 Points**: Simple (2-4 hours)
- Single component creation
- Basic feature implementation
- Simple integrations

**3 Points**: Medium (4-8 hours)
- Multi-component features
- Moderate complexity
- Some integration work

**5 Points**: Complex (1-2 days)
- Core system components
- Complex logic
- Significant integration

**8 Points**: Very Complex (2-3 days)
- Major features
- High complexity
- Multiple dependencies

---

## Sprint Planning (Example)

### Sprint 1 (Week 1): Foundation
- Epic 1: Project Foundation (13 points)
- Epic 2: Backend Core (21 points)
- **Total**: 34 points

### Sprint 2 (Week 1-2): Frontend Core
- Epic 3: Frontend Foundation (21 points)
- Epic 6: Real-time Communication (partial, 10 points)
- **Total**: 31 points

### Sprint 3 (Week 2): Interfaces
- Epic 4: Host Interface (13 points)
- Epic 5: Display Interface (13 points)
- Epic 6: Real-time Communication (remaining, 11 points)
- **Total**: 37 points

### Sprint 4 (Week 2-3): Polish
- Epic 7: Audio System (8 points)
- Epic 8: Polish & UX (13 points)
- **Total**: 21 points

### Sprint 5 (Week 3): Testing & Release
- Epic 9: Testing & QA (13 points)
- Epic 10: Documentation & Deployment (8 points)
- **Total**: 21 points

---

## Dependencies Map

```
E1 (Foundation) → E2 (Backend) → E6 (WebSocket)
                → E3 (Frontend) → E4 (Host)
                                → E5 (Display)
                                → E6 (WebSocket)
                                → E7 (Audio)

E4, E5, E6, E7 → E8 (Polish) → E9 (Testing) → E10 (Deployment)
```

---

## Acceptance Criteria Guidelines

All stories follow this pattern:
- [ ] Functional requirement met
- [ ] Code follows TypeScript best practices
- [ ] No TypeScript errors or warnings
- [ ] ESLint passes with no errors
- [ ] Code is properly formatted (Prettier)
- [ ] Component is responsive (if UI)
- [ ] Accessibility considered (if UI)
- [ ] Unit tests written (if applicable)
- [ ] Manual testing completed
- [ ] Documentation updated (if applicable)

---

## Definition of Done

A story is considered "Done" when:

1. **Code Complete**
   - All acceptance criteria met
   - Code reviewed (if team > 1)
   - No known bugs

2. **Testing**
   - Unit tests written and passing
   - Manual testing completed
   - Cross-browser tested (if UI)

3. **Quality**
   - TypeScript compiles without errors
   - ESLint passes
   - Prettier formatted
   - No console errors

4. **Documentation**
   - Code comments added
   - README updated (if needed)
   - User docs updated (if needed)

5. **Integration**
   - Merged to main branch
   - Builds successfully
   - Deployed to dev environment

---

## Risk Assessment

### High Risk Stories
- **E2-S3**: Game engine - core logic, critical for app
- **E6-S1, E6-S2, E6-S3**: WebSocket events - synchronization critical
- **E6-S4**: Reconnection logic - complex, many edge cases
- **E9-S4**: Device testing - hardware dependent

### Medium Risk Stories
- **E7-S3**: Audio playback - browser compatibility issues
- **E5-S5**: Fullscreen API - browser differences
- **E8-S6**: Performance optimization - time-consuming

### Low Risk Stories
- All Epic 1 stories (standard setup)
- Documentation stories (Epic 10)
- Most UI component stories

---

## Velocity Tracking

Track actual vs estimated story points per sprint:

| Sprint | Planned Points | Completed Points | Velocity |
|--------|----------------|------------------|----------|
| 1 | 34 | TBD | TBD |
| 2 | 31 | TBD | TBD |
| 3 | 37 | TBD | TBD |
| 4 | 21 | TBD | TBD |
| 5 | 21 | TBD | TBD |

**Target Average Velocity**: 30 points/sprint

---

## Notes

- Story points are estimates, not commitments
- Adjust priorities based on user feedback
- Add new stories as requirements emerge
- Re-estimate if story grows in scope
- Break down 8-point stories if possible

---

**End of Story Tracker**
