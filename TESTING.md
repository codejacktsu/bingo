# Bingo Game - Testing Guide

## Automated Tests

### Running Tests

#### Server Tests
```bash
cd server
npm test                    # Run all tests in watch mode
npm test -- --run          # Run once without watch
npm test gameEngine.test   # Run specific test file
```

#### Client Tests
```bash
cd client
npm test                    # Run all tests in watch mode
npm test -- --run          # Run once without watch
npm test audioUtils.test   # Run specific test file
```

### Test Coverage

#### Game Engine Tests (34 tests)
- ✅ Initialization (game ID, state, numbers 1-75)
- ✅ Number drawing (uniqueness, range validation, order)
- ✅ Game reset functionality
- ✅ State management
- ✅ Completion detection
- ✅ Edge cases (rapid draws, all 75 numbers)
- ✅ Randomness verification

#### Audio Utils Tests (23 tests)
- ✅ Web Audio API integration
- ✅ Sound generation (beep, ding, success)
- ✅ Audio file checking
- ✅ Volume control
- ✅ Error handling
- ✅ Browser compatibility (webkit fallback)

#### WebSocket Integration Tests (12 tests)
**Note:** These tests require a live server running.

```bash
# Terminal 1 - Start server
cd server
npm run dev

# Terminal 2 - Run tests
cd server
npm test server.test
```

Tests cover:
- ✅ Connection establishment
- ✅ Game state synchronization
- ✅ Number drawing via WebSocket
- ✅ Game reset via WebSocket
- ✅ Multi-client synchronization
- ✅ REST API endpoints

---

## Manual Testing Checklist

### Pre-Testing Setup

- [ ] Install dependencies: `npm install` in both `/server` and `/client`
- [ ] Note your local IP address (server will display this on startup)
- [ ] Have at least 2 devices ready for network testing

### 1. Server Startup

#### Development Mode
```bash
cd server
npm run dev
```

**Verify:**
- [ ] Server starts without errors
- [ ] Console shows local and network URLs
- [ ] Port 3001 is being used
- [ ] CORS origins are configured

#### Production Mode
```bash
# Build client
cd client
npm run build

# Build server
cd server
npm run build

# Start production server
npm start
```

**Verify:**
- [ ] Server starts and serves static files
- [ ] Can access `http://localhost:3001` in browser
- [ ] Client app loads correctly

### 2. Host Control Interface

Navigate to: `http://[your-ip]:3001/host`

#### Initial State
- [ ] Host view loads correctly
- [ ] "Draw Number" button is visible and enabled
- [ ] "Reset Game" button is visible
- [ ] Connection count shows 1
- [ ] Recent numbers section is empty
- [ ] Statistics show 0 drawn, 75 remaining

#### Drawing Numbers
- [ ] Click "Draw Number" button
- [ ] Number appears in main display (large, centered)
- [ ] Number is between 1-75
- [ ] Audio plays (ding sound or Web Audio fallback)
- [ ] Number appears in "Recent Numbers" list
- [ ] Statistics update (1 drawn, 74 remaining)
- [ ] Draw 5 more numbers, verify all unique
- [ ] Draw 10 more numbers rapidly, verify no duplicates
- [ ] Verify drawn numbers are removed from available pool

#### Audio Controls
- [ ] Click mute button, verify audio is muted
- [ ] Draw a number, confirm no sound plays
- [ ] Unmute, verify audio returns
- [ ] Adjust volume slider, verify volume changes
- [ ] Test volume at 0%, 50%, 100%

#### Game Reset
- [ ] After drawing some numbers, click "Reset Game"
- [ ] Confirm reset in modal dialog
- [ ] Verify statistics return to 0 drawn, 75 remaining
- [ ] Verify recent numbers list clears
- [ ] Verify current number display clears
- [ ] Draw a new number, verify it works

#### Complete Game
- [ ] Note the game ID
- [ ] Keep clicking "Draw Number" until all 75 drawn
- [ ] Verify game completes correctly
- [ ] Verify "All numbers drawn" message appears
- [ ] Try to draw again, verify appropriate message
- [ ] Reset and verify new game ID is different

### 3. Display Interface

Navigate to: `http://[your-ip]:3001/display`

#### Initial Display
- [ ] Display view loads correctly
- [ ] Large number display is visible
- [ ] Shows "Waiting for first number..."
- [ ] Connection indicator shows green/connected
- [ ] Statistics visible at bottom

#### Real-Time Updates
- [ ] Open host control in another tab/window
- [ ] Draw a number from host
- [ ] Verify display updates immediately
- [ ] Verify number appears large and centered
- [ ] Draw several more numbers
- [ ] Verify display always shows latest number
- [ ] Verify statistics update in real-time

#### Reset Synchronization
- [ ] From host, reset the game
- [ ] Verify display clears immediately
- [ ] Verify statistics reset to 0/75

### 4. Network Multi-Device Testing

#### Setup
- [ ] Get your computer's local IP from server console
- [ ] Connect 2+ devices to same WiFi network
- [ ] Note: Some networks block device-to-device communication

#### Device 1: Host Control
Navigate to: `http://[server-ip]:3001/host`
- [ ] Page loads correctly
- [ ] Can draw numbers
- [ ] Connection count shows correct number of clients

#### Device 2: Display View
Navigate to: `http://[server-ip]:3001/display`
- [ ] Page loads correctly
- [ ] Shows "Waiting for first number..."

#### Device 3: Another Display (Optional)
Navigate to: `http://[server-ip]:3001/display`
- [ ] Page loads correctly
- [ ] Connection count increases

#### Cross-Device Synchronization
- [ ] From Device 1 (host), draw a number
- [ ] Verify number appears on ALL displays immediately
- [ ] Draw 5 more numbers from host
- [ ] Verify all displays stay synchronized
- [ ] Reset game from host
- [ ] Verify all displays clear simultaneously
- [ ] Verify connection count updates when devices connect/disconnect

### 5. Connection Reliability

#### Reconnection
- [ ] Start with host and display connected
- [ ] Disconnect network on one device
- [ ] Verify connection indicator shows disconnected
- [ ] Reconnect network
- [ ] Verify device reconnects automatically
- [ ] Verify state synchronizes correctly

#### Refresh Behavior
- [ ] With game in progress, refresh browser
- [ ] Verify current game state loads correctly
- [ ] Verify drawn numbers are preserved
- [ ] Verify statistics are accurate

#### Multiple Tabs
- [ ] Open host in 2 browser tabs
- [ ] Draw from tab 1
- [ ] Verify tab 2 updates
- [ ] Draw from tab 2
- [ ] Verify tab 1 updates

### 6. REST API Endpoints

#### Health Check
```bash
curl http://localhost:3001/health
```
- [ ] Returns 200 OK
- [ ] Shows status: "ok"
- [ ] Shows current game ID
- [ ] Shows drawn/remaining counts

#### Game State
```bash
curl http://localhost:3001/api/state
```
- [ ] Returns current game state JSON
- [ ] Includes drawnNumbers array
- [ ] Includes remainingNumbers array
- [ ] Includes gameId and timestamp

#### Game History
```bash
curl http://localhost:3001/api/history
```
- [ ] Returns array of game histories
- [ ] Each game has gameId, startTime, drawnNumbers
- [ ] Completed games have endTime

### 7. Browser Compatibility

Test on:
- [ ] **Chrome** (Desktop)
- [ ] **Firefox** (Desktop)
- [ ] **Safari** (Desktop/Mac)
- [ ] **Edge** (Desktop)
- [ ] **Mobile Safari** (iOS)
- [ ] **Chrome** (Android)

For each browser:
- [ ] UI renders correctly
- [ ] Numbers draw successfully
- [ ] Audio works (or fallback works)
- [ ] Reset functions properly
- [ ] WebSocket connection stable

### 8. Mobile Responsiveness

On mobile devices:
- [ ] Host view is usable (buttons not too small)
- [ ] Display view number is large and readable
- [ ] Volume controls are touch-friendly
- [ ] No horizontal scrolling
- [ ] Works in portrait and landscape

### 9. Performance

#### Memory Leaks
- [ ] Complete a full game (75 numbers)
- [ ] Reset and repeat 3 times
- [ ] Check browser DevTools for memory growth
- [ ] Verify no significant memory leaks

#### Network Load
- [ ] Monitor Network tab in DevTools
- [ ] Verify WebSocket connection stays open
- [ ] Verify no excessive polling
- [ ] Verify reasonable payload sizes

#### Drawing Speed
- [ ] Rapidly click "Draw Number" 20 times
- [ ] Verify all draws complete
- [ ] Verify UI remains responsive
- [ ] Verify no errors in console

### 10. Error Handling

#### Network Errors
- [ ] Start game, disconnect server
- [ ] Verify graceful error message
- [ ] Reconnect server
- [ ] Verify recovery

#### Invalid Actions
- [ ] Try to draw after all 75 numbers drawn
- [ ] Verify appropriate error message
- [ ] Verify no console errors

#### Edge Cases
- [ ] Reset immediately after starting
- [ ] Draw, reset, draw again rapidly
- [ ] Connect/disconnect multiple devices rapidly
- [ ] Verify system remains stable

---

## Common Issues & Solutions

### Server Won't Start
- **Port already in use**: Kill process on port 3001 or change port in config
- **Dependencies missing**: Run `npm install`
- **TypeScript errors**: Run `npm run build` to check for compilation errors

### Can't Connect from Other Devices
- **Firewall**: Check Windows Firewall or macOS firewall settings
- **Network isolation**: Some WiFi networks (guest networks, corporate) block device-to-device
- **Wrong IP**: Verify you're using the correct local IP (not localhost)
- **Port blocked**: Try different port in server config

### Audio Not Working
- **Browser policy**: Chrome requires user interaction before playing audio
- **File missing**: Fallback to Web Audio API should work automatically
- **Volume**: Check both app volume and system volume
- **Muted**: Verify mute button is not activated

### Numbers Not Updating
- **WebSocket disconnected**: Check connection indicator
- **Browser cache**: Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- **Server error**: Check server console for errors
- **CORS issue**: Verify CORS origins in server config

### Tests Failing
- **Server not running**: Integration tests need live server
- **Port conflict**: Ensure test server port is available
- **Timeout**: Increase timeout values for slower machines
- **Dependencies**: Run `npm install` in both client and server

---

## Test Result Sign-Off

### Automated Tests
- [ ] All game engine tests pass (34/34)
- [ ] All audio util tests pass (23/23)
- [ ] All integration tests pass with live server (12/12)

### Manual Tests
- [ ] Single device testing complete
- [ ] Multi-device testing complete
- [ ] Mobile device testing complete
- [ ] Browser compatibility confirmed
- [ ] Performance verified
- [ ] Error handling verified

**Tested by:** _________________
**Date:** _________________
**Notes:**

---

## Reporting Issues

When reporting bugs, please include:
1. Steps to reproduce
2. Expected behavior
3. Actual behavior
4. Browser/device information
5. Console errors (if any)
6. Network tab screenshot (if relevant)
