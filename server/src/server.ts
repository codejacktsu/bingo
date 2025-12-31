import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { config, getLocalIpAddress } from './config/config.js';
import { BingoGameEngine } from './gameEngine.js';
import { GameStorage } from './storage.js';
import type { GameHistory } from '../../shared/types/game.types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();
const httpServer = createServer(app);

// Initialize Socket.io with CORS
const io = new Server(httpServer, {
  cors: {
    origin: config.corsOrigin,
    methods: ['GET', 'POST'],
  },
});

// Initialize game engine and storage
const gameEngine = new BingoGameEngine();
const storage = new GameStorage();

// Initialize storage
await storage.initialize();

// Middleware
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());

// Serve static files from client build (in production)
const clientBuildPath = path.join(__dirname, '../../client/dist');
app.use(express.static(clientBuildPath));

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    gameId: gameEngine.getGameId(),
    drawnCount: gameEngine.getDrawnCount(),
    remainingCount: gameEngine.getRemainingCount(),
  });
});

// API endpoint to get game state (REST alternative to WebSocket)
app.get('/api/state', (_req, res) => {
  res.json(gameEngine.getState());
});

// API endpoint to get game history
app.get('/api/history', async (_req, res) => {
  const games = await storage.getRecentGames(20);
  res.json(games);
});

// Serve React app for all other routes (SPA)
app.get('*', (_req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log(`🔌 Client connected: ${socket.id}`);

  // Send current connection count to all clients
  const connectionCount = io.engine.clientsCount;
  io.emit('connection_count', connectionCount);

  // Send current game state to the newly connected client
  socket.emit('game_state', gameEngine.getState());

  /**
   * Event: draw_number
   * Client requests to draw the next number
   */
  socket.on('draw_number', () => {
    try {
      const drawnNumber = gameEngine.drawNumber();

      if (drawnNumber === null) {
        // No more numbers to draw
        socket.emit('error', 'All numbers have been drawn. Please reset the game.');
        return;
      }

      const remaining = gameEngine.getRemainingCount();

      // Broadcast the drawn number to all connected clients
      io.emit('number_drawn', {
        number: drawnNumber,
        remaining,
      });

      // Send updated game state
      io.emit('game_state', gameEngine.getState());

      console.log(`🎱 Number drawn: ${drawnNumber} (${remaining} remaining)`);

      // Save game state periodically (every 5 numbers or on completion)
      if (gameEngine.isComplete() || gameEngine.getDrawnCount() % 5 === 0) {
        saveCurrentGame().catch((err) => console.error('Failed to save game:', err));
      }
    } catch (error) {
      console.error('Error drawing number:', error);
      socket.emit('error', 'Failed to draw number');
    }
  });

  /**
   * Event: reset_game
   * Client requests to reset the game
   */
  socket.on('reset_game', async () => {
    try {
      // Save the current game before resetting (if any numbers were drawn)
      if (gameEngine.getDrawnCount() > 0) {
        await saveCurrentGame();
      }

      // Reset the game engine
      gameEngine.reset();

      // Notify all clients of the reset
      io.emit('game_reset');
      io.emit('game_state', gameEngine.getState());

      console.log(`🔄 Game reset: ${gameEngine.getGameId()}`);
    } catch (error) {
      console.error('Error resetting game:', error);
      socket.emit('error', 'Failed to reset game');
    }
  });

  /**
   * Event: get_state
   * Client requests current game state (typically after reconnection)
   */
  socket.on('get_state', () => {
    socket.emit('game_state', gameEngine.getState());
  });

  /**
   * Handle client disconnection
   */
  socket.on('disconnect', () => {
    console.log(`🔌 Client disconnected: ${socket.id}`);

    // Send updated connection count
    const connectionCount = io.engine.clientsCount;
    io.emit('connection_count', connectionCount);
  });
});

/**
 * Helper function to save the current game to storage
 */
async function saveCurrentGame(): Promise<void> {
  const gameHistory: GameHistory = {
    gameId: gameEngine.getGameId(),
    startTime: gameEngine.getStartTime(),
    endTime: gameEngine.isComplete() ? Date.now() : null,
    drawnNumbers: gameEngine.getDrawnNumbers(),
    completed: gameEngine.isComplete(),
  };

  await storage.saveGame(gameHistory);

  if (gameEngine.isComplete()) {
    console.log(`✅ Game completed and saved: ${gameEngine.getGameId()}`);
  }
}

// Start the server
httpServer.listen(config.port, config.host, () => {
  const localIp = getLocalIpAddress();

  console.log('\n🎯 Bingo Game Server Running\n');
  console.log(`📡 Local access:   http://localhost:${config.port}`);
  console.log(`🌐 Network access: http://${localIp}:${config.port}`);
  console.log('\n📍 Interfaces:');
  console.log(`   Host Control:  http://${localIp}:${config.port}/host`);
  console.log(`   Display View:  http://${localIp}:${config.port}/display`);
  console.log(`\n⚙️  Environment: ${config.nodeEnv}`);
  console.log(`🔧 CORS Origins: ${config.corsOrigin.join(', ')}\n`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('\n🛑 SIGTERM received, shutting down gracefully...');

  // Save current game state before shutdown
  if (gameEngine.getDrawnCount() > 0) {
    await saveCurrentGame();
  }

  httpServer.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  console.log('\n🛑 SIGINT received, shutting down gracefully...');

  // Save current game state before shutdown
  if (gameEngine.getDrawnCount() > 0) {
    await saveCurrentGame();
  }

  httpServer.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
