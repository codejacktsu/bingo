/**
 * WebSocket Server Integration Tests
 *
 * These are integration tests that require the server to be running.
 * Run the server in one terminal: npm run dev
 * Run tests in another terminal: npm test
 *
 * If the server is not running, tests will be skipped.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { io as ioClient, Socket as ClientSocket } from 'socket.io-client';
import type { GameState } from '../../shared/types/game.types.js';

describe('WebSocket Server Integration Tests', () => {
  let clientSocket: ClientSocket;
  const SERVER_URL = 'http://localhost:3001';
  const CONNECTION_TIMEOUT = 2000;
  const EVENT_TIMEOUT = 3000;

  beforeEach(async (context) => {
    // Try to connect to server
    try {
      await new Promise<void>((resolve, reject) => {
        clientSocket = ioClient(SERVER_URL, {
          transports: ['websocket'],
          reconnection: false,
          timeout: CONNECTION_TIMEOUT,
        });

        const timeout = setTimeout(() => {
          reject(new Error('Connection timeout - is server running?'));
        }, CONNECTION_TIMEOUT);

        clientSocket.on('connect', () => {
          clearTimeout(timeout);
          resolve();
        });

        clientSocket.on('connect_error', (error) => {
          clearTimeout(timeout);
          reject(error);
        });
      });
    } catch (error) {
      // Skip all tests if server not available
      console.warn('Server not available, skipping tests:', error);
      context.skip();
    }
  });

  afterEach(() => {
    if (clientSocket?.connected) {
      clientSocket.disconnect();
    }
  });

  describe('Connection', () => {
    it('should connect to the server', () => {
      expect(clientSocket.connected).toBe(true);
    });

    it('should receive initial game state on connection', async () => {
      const state = await new Promise<GameState>((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('Timeout')), EVENT_TIMEOUT);

        clientSocket.once('game_state', (state: GameState) => {
          clearTimeout(timeout);
          resolve(state);
        });
      });

      expect(state).toBeDefined();
      expect(state).toHaveProperty('drawnNumbers');
      expect(state).toHaveProperty('remainingNumbers');
      expect(state).toHaveProperty('currentNumber');
      expect(state).toHaveProperty('gameStarted');
      expect(state).toHaveProperty('gameId');
      expect(state).toHaveProperty('timestamp');
    });

    it('should receive connection count', async () => {
      const count = await new Promise<number>((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('Timeout')), EVENT_TIMEOUT);

        clientSocket.once('connection_count', (count: number) => {
          clearTimeout(timeout);
          resolve(count);
        });
      });

      expect(typeof count).toBe('number');
      expect(count).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Game State', () => {
    it('should get current state on request', async () => {
      clientSocket.emit('get_state');

      const state = await new Promise<GameState>((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('Timeout')), EVENT_TIMEOUT);

        clientSocket.once('game_state', (state: GameState) => {
          clearTimeout(timeout);
          resolve(state);
        });
      });

      expect(state).toBeDefined();
      expect(Array.isArray(state.drawnNumbers)).toBe(true);
      expect(Array.isArray(state.remainingNumbers)).toBe(true);
    });
  });

  describe('Number Drawing', () => {
    beforeEach(async () => {
      // Reset game before each test
      clientSocket.emit('reset_game');

      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('Timeout')), EVENT_TIMEOUT);

        clientSocket.once('game_reset', () => {
          clearTimeout(timeout);
          resolve();
        });
      });
    });

    it('should draw a valid number', async () => {
      clientSocket.emit('draw_number');

      const data = await new Promise<{ number: number; remaining: number }>((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('Timeout')), EVENT_TIMEOUT);

        clientSocket.once('number_drawn', (data: { number: number; remaining: number }) => {
          clearTimeout(timeout);
          resolve(data);
        });
      });

      expect(data.number).toBeGreaterThanOrEqual(1);
      expect(data.number).toBeLessThanOrEqual(75);
      expect(data.remaining).toBe(74);
    });

    it('should update state after drawing', async () => {
      clientSocket.emit('draw_number');

      // Wait for number drawn event first
      await new Promise<void>((resolve) => {
        clientSocket.once('number_drawn', () => resolve());
      });

      // Then wait for state update
      const state = await new Promise<GameState>((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('Timeout')), EVENT_TIMEOUT);

        clientSocket.once('game_state', (state: GameState) => {
          clearTimeout(timeout);
          resolve(state);
        });
      });

      expect(state.drawnNumbers.length).toBe(1);
      expect(state.gameStarted).toBe(true);
    });

    it('should draw unique numbers', async () => {
      const drawnNumbers = new Set<number>();

      for (let i = 0; i < 5; i++) {
        clientSocket.emit('draw_number');

        const data = await new Promise<{ number: number }>((resolve, reject) => {
          const timeout = setTimeout(() => reject(new Error('Timeout')), EVENT_TIMEOUT);

          clientSocket.once('number_drawn', (data: { number: number }) => {
            clearTimeout(timeout);
            resolve(data);
          });
        });

        expect(drawnNumbers.has(data.number)).toBe(false);
        drawnNumbers.add(data.number);
      }

      expect(drawnNumbers.size).toBe(5);
    }, 20000); // Longer timeout for multiple draws
  });

  describe('Game Reset', () => {
    it('should reset the game', async () => {
      // Draw a number first
      clientSocket.emit('draw_number');
      await new Promise<void>((resolve) => {
        clientSocket.once('number_drawn', () => resolve());
      });

      // Reset
      clientSocket.emit('reset_game');
      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('Timeout')), EVENT_TIMEOUT);

        clientSocket.once('game_reset', () => {
          clearTimeout(timeout);
          resolve();
        });
      });

      // Get state
      clientSocket.emit('get_state');
      const state = await new Promise<GameState>((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('Timeout')), EVENT_TIMEOUT);

        clientSocket.once('game_state', (state: GameState) => {
          clearTimeout(timeout);
          resolve(state);
        });
      });

      expect(state.drawnNumbers.length).toBe(0);
      expect(state.gameStarted).toBe(false);
      expect(state.currentNumber).toBeNull();
    });

    it('should generate new game ID after reset', async () => {
      // Get initial ID
      clientSocket.emit('get_state');
      const state1 = await new Promise<GameState>((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('Timeout')), EVENT_TIMEOUT);

        clientSocket.once('game_state', (state: GameState) => {
          clearTimeout(timeout);
          resolve(state);
        });
      });

      // Reset
      clientSocket.emit('reset_game');
      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('Timeout')), EVENT_TIMEOUT);

        clientSocket.once('game_reset', () => {
          clearTimeout(timeout);
          resolve();
        });
      });

      // Get new ID
      clientSocket.emit('get_state');
      const state2 = await new Promise<GameState>((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('Timeout')), EVENT_TIMEOUT);

        clientSocket.once('game_state', (state: GameState) => {
          clearTimeout(timeout);
          resolve(state);
        });
      });

      expect(state1.gameId).not.toBe(state2.gameId);
    });
  });

  describe('REST API Endpoints', () => {
    it('should return health status', async () => {
      const response = await fetch(`${SERVER_URL}/health`);
      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data.status).toBe('ok');
      expect(data).toHaveProperty('timestamp');
      expect(data).toHaveProperty('gameId');
      expect(data).toHaveProperty('drawnCount');
      expect(data).toHaveProperty('remainingCount');
    });

    it('should return current game state via REST', async () => {
      const response = await fetch(`${SERVER_URL}/api/state`);
      const state: GameState = await response.json();

      expect(response.ok).toBe(true);
      expect(state).toHaveProperty('drawnNumbers');
      expect(state).toHaveProperty('remainingNumbers');
      expect(state).toHaveProperty('gameId');
    });

    it('should return game history via REST', async () => {
      const response = await fetch(`${SERVER_URL}/api/history`);
      const history = await response.json();

      expect(response.ok).toBe(true);
      expect(Array.isArray(history)).toBe(true);
    });
  });
});
