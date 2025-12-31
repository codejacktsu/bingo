# Product Requirements Document (PRD)
## Local Network Bingo Game Application

**Version:** 1.0
**Date:** December 30, 2025
**Status:** Draft
**Owner:** Development Team

---

## 1. Executive Summary

### 1.1 Product Overview
A real-time bingo number drawing application designed for local home network deployment. The system enables a game host to control number drawing from one computer while displaying results on a separate large screen display, with real-time synchronization across devices.

### 1.2 Problem Statement
Traditional bingo games require physical equipment for drawing numbers and manual tracking of called numbers. Players with paper cards need a clear, visible display of current and historical numbers. Current digital solutions require cloud deployment, internet connectivity, or expensive proprietary systems.

### 1.3 Solution
A lightweight, self-hosted web application running on a local home network that provides:
- Host control interface for drawing bingo numbers
- Large-screen display optimized for TV viewing
- Real-time synchronization via WebSockets
- Audio feedback for number draws
- Complete number history tracking
- No cloud dependency or internet requirement

### 1.4 Success Metrics
- **Performance**: Number draw appears on display within 100ms
- **Reliability**: 99.9% uptime during game sessions
- **Usability**: Zero training required for host operation
- **Accessibility**: Display readable from 15+ feet away
- **Network**: Automatic reconnection within 3 seconds of network recovery

---

## 2. Product Vision & Strategy

### 2.1 Vision Statement
"Provide a simple, reliable, and professional bingo game management system that anyone can host on their home network without technical expertise or cloud dependencies."

### 2.2 Target Users

#### Primary User: Game Host
- **Role**: Controls the game from office computer
- **Technical Level**: Basic computer literacy
- **Needs**: Simple interface, reliable operation, clear controls
- **Goals**: Run smooth bingo games without technical issues

#### Secondary User: Players
- **Role**: Watch the display screen while playing with paper cards
- **Technical Level**: No technical interaction required
- **Needs**: Large, clear number display, complete history visibility
- **Goals**: Never miss a called number, easily verify history

### 2.3 Use Cases

#### UC-1: Start New Game
**Actor**: Host
**Preconditions**: Application is running
**Flow**:
1. Host navigates to host view
2. Host clicks "Start New Game" or "Reset Game"
3. System clears all previous numbers
4. System displays ready state on both screens

#### UC-2: Draw Number
**Actor**: Host
**Preconditions**: Game is active
**Flow**:
1. Host clicks "Draw Number" button
2. System randomly selects from remaining numbers
3. System plays sound effect
4. System displays number on host screen
5. System broadcasts to display screen
6. System adds number to history

#### UC-3: View Number History
**Actor**: Players
**Preconditions**: Numbers have been drawn
**Flow**:
1. Players look at display screen
2. System shows current number prominently
3. System shows complete history list
4. Players verify their cards

#### UC-4: Reconnect After Network Issue
**Actor**: System
**Preconditions**: Network connection lost
**Flow**:
1. System detects disconnection
2. System displays connection status
3. Network recovers
4. System auto-reconnects
5. System resyncs game state
6. System displays current state

---

## 3. Functional Requirements

### 3.1 Core Features

#### F-1: Number Drawing Engine
**Priority**: P0 (Must Have)
**Description**: Core bingo number management system

**Requirements**:
- FR-1.1: System SHALL generate random numbers from 1-75
- FR-1.2: System SHALL NOT repeat previously drawn numbers
- FR-1.3: System SHALL maintain list of remaining numbers
- FR-1.4: System SHALL track order of drawn numbers
- FR-1.5: System SHALL support drawing until all 75 numbers exhausted
- FR-1.6: Draw SHALL complete within 100ms

**Acceptance Criteria**:
- All numbers 1-75 can be drawn exactly once per game
- No duplicate numbers in a single game
- Random distribution verified over 100+ games
- History preserves exact draw order

#### F-2: Host Control Interface
**Priority**: P0 (Must Have)
**Description**: Web-based interface for game control

**Requirements**:
- FR-2.1: Interface SHALL provide "Draw Number" button
- FR-2.2: Interface SHALL provide "Reset Game" button
- FR-2.3: Interface SHALL display current number prominently
- FR-2.4: Interface SHALL show count of remaining numbers
- FR-2.5: Interface SHALL show count of drawn numbers
- FR-2.6: Interface SHALL display complete number history
- FR-2.7: Interface SHALL show connection status
- FR-2.8: Interface SHALL be responsive for desktop/laptop screens
- FR-2.9: Button SHALL be disabled when no numbers remain

**Acceptance Criteria**:
- All controls accessible with mouse or keyboard
- Current number visible in < 2 seconds after draw
- Statistics update in real-time
- Interface usable on 1366x768 minimum resolution

#### F-3: Large Display View
**Priority**: P0 (Must Have)
**Description**: TV-optimized display for players

**Requirements**:
- FR-3.1: Display SHALL show current number in extra-large font (20vh+)
- FR-3.2: Display SHALL use high-contrast color scheme
- FR-3.3: Display SHALL show complete number history
- FR-3.4: Display SHALL be readable from 15+ feet
- FR-3.5: Display SHALL animate number transitions
- FR-3.6: Display SHALL show connection status indicator
- FR-3.7: Display SHALL be read-only (no controls)
- FR-3.8: Display SHALL support fullscreen mode

**Acceptance Criteria**:
- Current number readable from 20 feet in normal lighting
- Dark background (#000 or #111) with bright text (#FFF or #FFD700)
- Smooth animations without jank
- No interactive elements that could be accidentally triggered

#### F-4: Real-Time Synchronization
**Priority**: P0 (Must Have)
**Description**: WebSocket-based state sync across devices

**Requirements**:
- FR-4.1: System SHALL use WebSocket connection
- FR-4.2: Updates SHALL appear within 100ms on all clients
- FR-4.3: System SHALL broadcast number draws to all connected clients
- FR-4.4: System SHALL broadcast game resets to all connected clients
- FR-4.5: System SHALL maintain game state on server
- FR-4.6: Server SHALL be single source of truth

**Acceptance Criteria**:
- 95th percentile latency < 100ms for updates
- All connected clients show identical state
- No state desynchronization after network events

#### F-5: Audio Feedback
**Priority**: P1 (Should Have)
**Description**: Sound effects for game events

**Requirements**:
- FR-5.1: System SHALL play sound when number is drawn
- FR-5.2: System SHALL support volume control
- FR-5.3: System SHALL support mute/unmute
- FR-5.4: System SHALL preload audio files
- FR-5.5: Audio SHALL work in Chrome, Firefox, Edge
- FR-5.6: Volume settings SHALL persist across sessions

**Acceptance Criteria**:
- Sound plays within 50ms of number draw
- Volume adjustable from 0-100%
- Mute button instantly silences audio
- Settings saved to localStorage

#### F-6: Automatic Reconnection
**Priority**: P1 (Should Have)
**Description**: Handle network interruptions gracefully

**Requirements**:
- FR-6.1: System SHALL detect connection loss within 3 seconds
- FR-6.2: System SHALL attempt reconnection automatically
- FR-6.3: System SHALL retry up to 10 times with exponential backoff
- FR-6.4: System SHALL resync state upon reconnection
- FR-6.5: System SHALL display connection status to user
- FR-6.6: System SHALL show reconnecting indicator

**Acceptance Criteria**:
- Reconnection succeeds within 5 seconds of network recovery
- State fully synchronized after reconnection
- Visual indicator shows disconnected/connecting/connected states
- No user intervention required

#### F-7: Game State Persistence
**Priority**: P2 (Nice to Have)
**Description**: Save game history to disk

**Requirements**:
- FR-7.1: System SHALL save game state to JSON file
- FR-7.2: System SHALL persist game history across server restarts
- FR-7.3: System SHALL record game start/end times
- FR-7.4: System SHALL record all drawn numbers per game
- FR-7.5: System SHALL generate unique game IDs

**Acceptance Criteria**:
- Game state survives server restart
- History file is valid JSON
- Storage footprint < 1MB for 100 games

---

### 3.2 Non-Functional Requirements

#### NFR-1: Performance
- Page load time < 2 seconds on local network
- Number draw latency < 100ms
- UI interactions respond within 16ms (60fps)
- Memory usage < 200MB for server
- Memory usage < 100MB per client
- Support for 10+ concurrent connections

#### NFR-2: Reliability
- 99.9% uptime during game sessions
- Graceful degradation on network issues
- No data loss on server crash
- Automatic recovery from connection failures

#### NFR-3: Usability
- Zero-click deployment after initial setup
- No training required for basic operation
- Clear visual feedback for all actions
- Accessible color contrast (WCAG AA minimum)
- Keyboard navigation support

#### NFR-4: Compatibility
- **Browsers**: Chrome 90+, Firefox 88+, Edge 90+
- **OS**: Windows 10+, macOS 11+, Linux (Ubuntu 20.04+)
- **Node.js**: v18.0.0 or higher
- **Screen Resolutions**: 1366x768 to 4K
- **Network**: IPv4 local network (192.168.x.x, 10.x.x.x)

#### NFR-5: Security
- Input validation on all WebSocket events
- Rate limiting to prevent DOS (max 10 draws/second)
- No authentication required (home network only)
- No sensitive data collection
- CORS configured for local network only

#### NFR-6: Maintainability
- TypeScript for type safety
- ESLint + Prettier for code quality
- Modular architecture with clear separation of concerns
- Comprehensive inline documentation
- Unit test coverage for business logic

#### NFR-7: Scalability
- Support up to 10 simultaneous display clients
- Handle 1000+ game sessions in history
- Efficient WebSocket broadcasting
- Minimal memory footprint growth over time

---

## 4. Technical Architecture

### 4.1 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Local Home Network                      │
│                                                               │
│  ┌──────────────────┐              ┌──────────────────┐     │
│  │  Computer A      │              │  Computer B      │     │
│  │  (Office)        │              │  (Living Room)   │     │
│  │                  │              │                  │     │
│  │  ┌────────────┐  │              │  ┌────────────┐  │     │
│  │  │   Server   │  │  WebSocket   │  │   Browser  │  │     │
│  │  │  Node.js   │◄─┼──────────────┼─►│  /display  │  │     │
│  │  │  Express   │  │              │  │            │  │     │
│  │  │  Socket.io │  │              │  └────────────┘  │     │
│  │  └─────┬──────┘  │              │                  │     │
│  │        │         │              │  Large Screen    │     │
│  │        │ HTTP    │              │  (TV/Projector)  │     │
│  │        ▼         │              └──────────────────┘     │
│  │  ┌────────────┐  │                                       │
│  │  │   Browser  │  │                                       │
│  │  │   /host    │  │                                       │
│  │  └────────────┘  │                                       │
│  │                  │                                       │
│  │  Laptop/Desktop  │                                       │
│  └──────────────────┘                                       │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

**Project Directory**: `c:\Users\Ploy\Jacks Projects\bingo`

### 4.2 Technology Stack

**Backend:**
- Runtime: Node.js v18+
- Framework: Express.js v4.18+
- WebSocket: Socket.io v4.6+
- Language: TypeScript 5.0+
- Storage: Lowdb v6.0+ (JSON-based)

**Frontend:**
- Framework: React 18.2+
- Language: TypeScript 5.0+
- Build Tool: Vite 5.0+
- Routing: React Router v6.20+
- Styling: Tailwind CSS v3.4+
- Audio: Howler.js v2.2+
- WebSocket Client: Socket.io-client v4.6+

**Development:**
- Code Quality: ESLint, Prettier
- Testing: Vitest
- Build: npm workspaces (monorepo)
- Dev Server: Vite + Concurrently

### 4.3 Data Models

```typescript
interface GameState {
  drawnNumbers: number[];        // [5, 12, 33, ...] in draw order
  remainingNumbers: number[];    // [1, 2, 3, ..., 75] shuffled
  currentNumber: number | null;  // Last drawn number
  gameStarted: boolean;          // Has any number been drawn
  gameId: string;                // Unique game identifier
  timestamp: number;             // Last update timestamp
}

interface GameHistory {
  gameId: string;                // Unique identifier
  startTime: number;             // Unix timestamp
  endTime: number | null;        // Unix timestamp or null
  drawnNumbers: number[];        // Complete history
  completed: boolean;            // All 75 drawn?
}

interface SocketEvents {
  // Client → Server
  'draw_number': () => void;
  'reset_game': () => void;
  'get_state': () => void;

  // Server → Client
  'number_drawn': (data: { number: number; remaining: number }) => void;
  'game_state': (state: GameState) => void;
  'game_reset': () => void;
  'connection_count': (count: number) => void;
  'error': (message: string) => void;
}
```

### 4.4 Network Configuration

**Server:**
- Listen Address: `0.0.0.0` (all interfaces)
- Port: `3001` (configurable via environment)
- CORS: Allow all origins on local network
- WebSocket Transport: WebSocket with polling fallback

**Client:**
- Server URL: `http://{host-ip}:3001`
- Reconnection Attempts: 10
- Reconnection Delay: 1000ms (exponential backoff)
- Timeout: 20000ms

---

## 5. User Interface Design

### 5.1 Host View (/host)

**Layout:**
```
┌─────────────────────────────────────────────────┐
│  Bingo Game Host Control      [●] Connected     │
├─────────────────────────────────────────────────┤
│                                                  │
│              Current Number                      │
│                    42                            │
│                                                  │
│         ┌─────────────────────┐                 │
│         │   DRAW NUMBER       │                 │
│         └─────────────────────┘                 │
│         ┌─────────────────────┐                 │
│         │   RESET GAME        │                 │
│         └─────────────────────┘                 │
│                                                  │
│  Drawn: 12    Remaining: 63                     │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │  Number History                          │   │
│  │  1  5  12  18  23  27  31  33  42 ...    │   │
│  └──────────────────────────────────────────┘   │
│                                                  │
│  [🔊] Volume: ████████░░ 80%                    │
└─────────────────────────────────────────────────┘
```

**Design Specifications:**
- Current number: 15vh font, bold, centered
- Buttons: 3em height, high contrast, hover effects
- History: Grid layout, 5em per number, scrollable
- Connection status: Top-right, green/red indicator
- Volume control: Slider with mute toggle

### 5.2 Display View (/display)

**Layout:**
```
┌─────────────────────────────────────────────────┐
│                                                  │
│                                                  │
│                     42                           │
│               (Current Number)                   │
│                                                  │
│                                                  │
├─────────────────────────────────────────────────┤
│  Called Numbers:                                 │
│                                                  │
│  1  5  12  18  23  27  31  33  42  45  51 ...   │
│                                                  │
└─────────────────────────────────────────────────┘
```

**Design Specifications:**
- Current number: 25vh font, ultra-bold, centered
- Background: #000000 or #0a0a0a
- Number color: #FFD700 (gold) or #FFFFFF
- History: 4vh font, grid layout, auto-scroll
- Connection status: Small indicator, top-right corner
- Fullscreen optimized: No margins, maximize space
- Animation: Fade-in + scale for new numbers

### 5.3 Color Palette

**Host View:**
- Background: #f3f4f6 (light gray)
- Primary: #3b82f6 (blue)
- Secondary: #8b5cf6 (purple)
- Success: #10b981 (green)
- Danger: #ef4444 (red)
- Text: #111827 (near black)

**Display View:**
- Background: #000000 (black)
- Current Number: #FFD700 (gold)
- History Numbers: #FFFFFF (white)
- Called Numbers (in history): #10b981 (green highlight)
- Connection: #10b981 (connected) / #ef4444 (disconnected)

### 5.4 Typography

**Host View:**
- Font Family: system-ui, -apple-system, sans-serif
- Current Number: 15vh, 700 weight
- Buttons: 1.25rem, 600 weight
- Body: 1rem, 400 weight

**Display View:**
- Font Family: system-ui, -apple-system, sans-serif
- Current Number: 25vh, 800 weight
- History: 4vh, 600 weight

---

## 6. Deployment & Operations

### 6.1 Installation Requirements

**Hardware:**
- Computer A (Server Host): Any device with Node.js support
- Computer B (Display): Device with web browser
- Network: Local WiFi or Ethernet (100Mbps+)

**Software:**
- Node.js v18.0.0 or higher
- npm v9.0.0 or higher
- Modern web browser (Chrome/Firefox/Edge)

### 6.2 Deployment Process

1. **Initial Setup:**
   ```bash
   git clone <repository-url>
   cd bingo
   npm install
   npm run install:all
   npm run build
   ```

2. **Configuration:**
   ```bash
   cp .env.example .env
   # Edit .env if custom port needed
   ```

3. **Start Server:**
   ```bash
   npm run start
   # Note displayed IP address
   ```

4. **Access Interfaces:**
   - Host: Navigate to `http://localhost:3001/host`
   - Display: Navigate to `http://{server-ip}:3001/display` on Computer B

### 6.3 Network Configuration

**Firewall Rules (Windows):**
```powershell
New-NetFirewallRule -DisplayName "Bingo Server" `
  -Direction Inbound `
  -Program "C:\Program Files\nodejs\node.exe" `
  -Action Allow
```

**Firewall Rules (macOS):**
- System Preferences → Security & Privacy → Firewall
- Add Node.js to allowed applications

### 6.4 Monitoring & Logging

**Server Logs:**
- Connection events
- Number draw events
- Error conditions
- Client count changes

**Log Format:**
```
[2025-12-30 10:15:32] INFO: Server started on 0.0.0.0:3001
[2025-12-30 10:15:45] INFO: Client connected (ID: abc123)
[2025-12-30 10:16:02] INFO: Number drawn: 42
[2025-12-30 10:16:05] ERROR: Connection lost (ID: abc123)
```

### 6.5 Backup & Recovery

**Game History Backup:**
- Location: `server/data/gameHistory.json`
- Frequency: Automatic on each state change
- Retention: Unlimited (manual cleanup)

**Recovery Process:**
1. Stop server
2. Replace `gameHistory.json` with backup
3. Restart server
4. State restored automatically

---

## 7. Testing Strategy

### 7.1 Unit Testing

**Coverage Targets:**
- Game engine logic: 90%+
- WebSocket event handlers: 80%+
- Utility functions: 90%+

**Test Frameworks:**
- Vitest for unit tests
- React Testing Library for components

**Key Test Cases:**
- Number drawing randomness
- No duplicate numbers
- State management correctness
- History tracking accuracy

### 7.2 Integration Testing

**Scenarios:**
- Server startup and shutdown
- Client connection lifecycle
- WebSocket message flow
- State synchronization
- Reconnection logic

### 7.3 User Acceptance Testing

**Test Checklist:**
- [ ] Host can draw numbers successfully
- [ ] Display updates within 100ms
- [ ] Audio plays on number draw
- [ ] History displays correctly
- [ ] Reset clears all state
- [ ] Reconnection works after network drop
- [ ] Fullscreen mode works on display
- [ ] Readable from 15+ feet
- [ ] No lag during extended sessions
- [ ] Works on both Chrome and Firefox

### 7.4 Performance Testing

**Benchmarks:**
- Load test: 10 concurrent clients
- Stress test: 100 rapid number draws
- Endurance test: 4-hour session
- Network test: 50ms latency injection

**Metrics:**
- Draw latency p50, p95, p99
- Memory usage over time
- CPU usage patterns
- WebSocket message throughput

---

## 8. Release Plan

### 8.1 Milestones

**Milestone 1: MVP (Week 1)**
- Core number drawing
- Basic host interface
- Basic display view
- WebSocket sync
- Local network deployment

**Milestone 2: Polish (Week 2)**
- Audio integration
- Improved UI/UX
- Auto-reconnection
- Error handling
- Testing completion

**Milestone 3: Production Ready (Week 3)**
- Performance optimization
- Documentation
- Deployment guides
- User acceptance testing
- Bug fixes

### 8.2 Version History

**v1.0.0** (Target: Week 3)
- Initial release
- All P0 and P1 features
- Production-ready quality

**v1.1.0** (Future)
- Voice announcements
- Multiple game modes
- Mobile host view

**v2.0.0** (Future)
- Advanced features (TBD)

---

## 9. Risk Management

### 9.1 Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| WebSocket connection instability | Medium | High | Implement robust reconnection logic with exponential backoff |
| Audio playback browser compatibility | Medium | Medium | Use Howler.js for cross-browser support, provide fallback |
| Network firewall blocking | High | High | Provide detailed firewall configuration instructions |
| Display lag on large screens | Low | Medium | Optimize rendering, use GPU-accelerated CSS transforms |
| State desynchronization | Low | High | Server as single source of truth, resync on reconnect |

### 9.2 User Experience Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| User confusion on setup | Medium | Medium | Clear README with screenshots, auto-IP detection |
| Accidental number draws | Low | Medium | Add confirmation for reset, disable double-click |
| Missing called numbers | Low | High | Prominent display, persistent history, audio feedback |
| Connection drops during game | Medium | High | Auto-reconnection, clear status indicators |

### 9.3 Operational Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Server crash during game | Low | High | Persist state to disk, auto-restart capability |
| IP address changes | Medium | Low | Display current IP on startup, use hostname option |
| Port conflicts | Low | Medium | Configurable port via environment variable |
| Insufficient WiFi coverage | Medium | High | Recommend Ethernet for display, WiFi strength indicator |

---

## 10. Future Enhancements

### 10.1 Phase 2 Features

**Voice Announcements:**
- Text-to-speech for called numbers
- Configurable voice and speed
- Multi-language support

**Game Modes:**
- Traditional bingo (1 line)
- Blackout (full card)
- Patterns (X, L, T, etc.)
- Speed bingo (faster draws)

**Statistics Dashboard:**
- Most/least frequently called numbers
- Average game duration
- Number distribution analysis
- Export to CSV/PDF

### 10.2 Phase 3 Features

**Mobile Host View:**
- Responsive design for tablets/phones
- Touch-optimized controls
- Native app wrapper (optional)

**Multiple Display Support:**
- Broadcast to 5+ display screens
- Per-display configuration
- Display identification/naming

**Customization:**
- Theme selection (dark/light/custom)
- Custom number ranges (1-90, 1-30)
- Configurable animations
- Brand/logo upload

### 10.3 Advanced Features

**Player Management:**
- Player registration
- Card validation
- Winner verification
- Leaderboards

**Replay Mode:**
- Review past games
- Step through number history
- Export game logs

**Integration:**
- REST API for external systems
- Webhook notifications
- Calendar integration
- Email notifications

---

## 11. Appendices

### 11.1 Glossary

- **Bingo Card**: Physical card with 5x5 grid of numbers
- **Draw**: Random selection of next number
- **Host**: Person controlling the game
- **Display**: Large screen showing game state
- **WebSocket**: Persistent bidirectional connection
- **Local Network**: Private home network (LAN)

### 11.2 References

- Socket.io Documentation: https://socket.io/docs/
- React Documentation: https://react.dev/
- Vite Documentation: https://vitejs.dev/
- Tailwind CSS: https://tailwindcss.com/
- WebSocket Protocol: RFC 6455

### 11.3 Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-12-30 | Dev Team | Initial PRD creation |

---

**End of PRD**
