import { io, Socket } from 'socket.io-client';
import type { GameState } from '@shared/types/game.types';

/**
 * SocketService - Wrapper around Socket.io client
 * Provides a clean interface for WebSocket communication with the server
 */
export class SocketService {
  private socket: Socket | null = null;
  private serverUrl: string;

  constructor(serverUrl: string = '') {
    // Default to current host if no URL provided
    this.serverUrl = serverUrl || window.location.origin;
  }

  /**
   * Connects to the WebSocket server
   * @param options Optional Socket.io connection options
   */
  public connect(options?: {
    reconnectionAttempts?: number;
    reconnectionDelay?: number;
    timeout?: number;
  }): Socket {
    if (this.socket?.connected) {
      return this.socket;
    }

    const defaultOptions = {
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      timeout: 20000,
      ...options,
    };

    this.socket = io(this.serverUrl, defaultOptions);

    return this.socket;
  }

  /**
   * Disconnects from the WebSocket server
   */
  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  /**
   * Gets the current socket instance
   */
  public getSocket(): Socket | null {
    return this.socket;
  }

  /**
   * Emits a draw_number event to the server
   */
  public drawNumber(): void {
    this.socket?.emit('draw_number');
  }

  /**
   * Emits a reset_game event to the server
   */
  public resetGame(): void {
    this.socket?.emit('reset_game');
  }

  /**
   * Requests current game state from the server
   */
  public getState(): void {
    this.socket?.emit('get_state');
  }

  /**
   * Subscribes to game_state events
   */
  public onGameState(callback: (state: GameState) => void): void {
    this.socket?.on('game_state', callback);
  }

  /**
   * Subscribes to number_drawn events
   */
  public onNumberDrawn(callback: (data: { number: number; remaining: number }) => void): void {
    this.socket?.on('number_drawn', callback);
  }

  /**
   * Subscribes to game_reset events
   */
  public onGameReset(callback: () => void): void {
    this.socket?.on('game_reset', callback);
  }

  /**
   * Subscribes to connection_count events
   */
  public onConnectionCount(callback: (count: number) => void): void {
    this.socket?.on('connection_count', callback);
  }

  /**
   * Subscribes to error events
   */
  public onError(callback: (message: string) => void): void {
    this.socket?.on('error', callback);
  }

  /**
   * Subscribes to connect event
   */
  public onConnect(callback: () => void): void {
    this.socket?.on('connect', callback);
  }

  /**
   * Subscribes to disconnect event
   */
  public onDisconnect(callback: () => void): void {
    this.socket?.on('disconnect', callback);
  }

  /**
   * Subscribes to reconnect_attempt event
   */
  public onReconnectAttempt(callback: (attemptNumber: number) => void): void {
    this.socket?.on('reconnect_attempt', callback);
  }

  /**
   * Unsubscribes from an event
   */
  public off(event: string, callback?: (...args: any[]) => void): void {
    this.socket?.off(event, callback);
  }

  /**
   * Checks if socket is connected
   */
  public isConnected(): boolean {
    return this.socket?.connected ?? false;
  }
}

// Export singleton instance
export const socketService = new SocketService();
