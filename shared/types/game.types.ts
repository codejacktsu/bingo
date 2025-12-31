/**
 * Shared TypeScript type definitions for the Bingo Game application
 * These types are used by both the client and server to ensure type safety
 */

/**
 * Represents the complete state of an active bingo game
 */
export interface GameState {
  /** Array of numbers that have been drawn, in the order they were drawn */
  drawnNumbers: number[];

  /** Array of numbers that haven't been drawn yet (shuffled) */
  remainingNumbers: number[];

  /** The most recently drawn number, or null if no numbers have been drawn */
  currentNumber: number | null;

  /** Whether the game has started (at least one number drawn) */
  gameStarted: boolean;

  /** Unique identifier for this game session */
  gameId: string;

  /** Unix timestamp of the last state update */
  timestamp: number;
}

/**
 * Represents a completed or ongoing game session for historical tracking
 */
export interface GameHistory {
  /** Unique identifier for this game session */
  gameId: string;

  /** Unix timestamp when the game started */
  startTime: number;

  /** Unix timestamp when the game ended, or null if still ongoing */
  endTime: number | null;

  /** Complete array of all numbers drawn in this game, in order */
  drawnNumbers: number[];

  /** Whether all 75 numbers have been drawn */
  completed: boolean;
}

/**
 * Type definitions for Socket.io events
 * Defines the contract between client and server for WebSocket communication
 */
export interface SocketEvents {
  // Client → Server events
  draw_number: () => void;
  reset_game: () => void;
  get_state: () => void;

  // Server → Client events
  number_drawn: (data: { number: number; remaining: number }) => void;
  game_state: (state: GameState) => void;
  game_reset: () => void;
  connection_count: (count: number) => void;
  error: (message: string) => void;
}

/**
 * Server configuration options
 */
export interface ServerConfig {
  /** Port number the server listens on */
  port: number;

  /** Host address (0.0.0.0 for all interfaces) */
  host: string;

  /** Allowed CORS origins */
  corsOrigin: string[];

  /** Node environment (development, production, test) */
  nodeEnv: string;
}

/**
 * Client configuration options
 */
export interface ClientConfig {
  /** WebSocket server URL */
  serverUrl: string;

  /** Maximum number of reconnection attempts */
  reconnectionAttempts: number;

  /** Delay between reconnection attempts (ms) */
  reconnectionDelay: number;

  /** Connection timeout (ms) */
  timeout: number;
}

/**
 * Data payload when a number is drawn
 */
export interface NumberDrawnPayload {
  /** The number that was drawn */
  number: number;

  /** Count of remaining numbers */
  remaining: number;

  /** Unix timestamp when the number was drawn */
  timestamp: number;
}

/**
 * Connection status states
 */
export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'reconnecting';

/**
 * Audio settings
 */
export interface AudioSettings {
  /** Whether audio is enabled */
  enabled: boolean;

  /** Volume level (0-1) */
  volume: number;

  /** Whether audio is muted */
  muted: boolean;
}
