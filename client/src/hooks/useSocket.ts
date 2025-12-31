import { useEffect, useState, useCallback } from 'react';
import { socketService } from '../services/socketService';
import type { GameState, ConnectionStatus } from '@shared/types/game.types';

/**
 * Custom React hook for WebSocket connection management
 *
 * Handles:
 * - Socket connection lifecycle
 * - Automatic reconnection
 * - Game state synchronization
 * - Connection status tracking
 *
 * @param serverUrl Optional server URL (defaults to current origin)
 * @returns Socket connection state and control functions
 */
export function useSocket(serverUrl?: string) {
  const [connected, setConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('connecting');
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [connectionCount, setConnectionCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [reconnectAttempt, setReconnectAttempt] = useState(0);

  useEffect(() => {
    // Set connecting status
    setConnectionStatus('connecting');

    // Connect to server
    socketService.connect({
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      timeout: 20000,
    });

    // Connection event handlers
    const handleConnect = () => {
      setConnected(true);
      setConnectionStatus('connected');
      setReconnectAttempt(0);
      setError(null);

      // Request current state on connection
      socketService.getState();
    };

    const handleDisconnect = () => {
      setConnected(false);
      setConnectionStatus('disconnected');
    };

    const handleReconnectAttempt = (attemptNumber: number) => {
      setConnectionStatus('reconnecting');
      setReconnectAttempt(attemptNumber);
    };

    // Game event handlers
    const handleGameState = (state: GameState) => {
      setGameState(state);
    };

    const handleNumberDrawn = (data: { number: number; remaining: number }) => {
      // Number drawn event received - state update will come via game_state event
      console.log(`Number drawn: ${data.number}, ${data.remaining} remaining`);
    };

    const handleGameReset = () => {
      // Game reset - state update will come via game_state event
      console.log('Game reset');
    };

    const handleConnectionCount = (count: number) => {
      setConnectionCount(count);
    };

    const handleError = (message: string) => {
      setError(message);
      console.error('Socket error:', message);

      // Clear error after 5 seconds
      setTimeout(() => setError(null), 5000);
    };

    // Subscribe to events
    socketService.onConnect(handleConnect);
    socketService.onDisconnect(handleDisconnect);
    socketService.onReconnectAttempt(handleReconnectAttempt);
    socketService.onGameState(handleGameState);
    socketService.onNumberDrawn(handleNumberDrawn);
    socketService.onGameReset(handleGameReset);
    socketService.onConnectionCount(handleConnectionCount);
    socketService.onError(handleError);

    // Cleanup on unmount
    return () => {
      socketService.off('connect', handleConnect);
      socketService.off('disconnect', handleDisconnect);
      socketService.off('reconnect_attempt', handleReconnectAttempt);
      socketService.off('game_state', handleGameState);
      socketService.off('number_drawn', handleNumberDrawn);
      socketService.off('game_reset', handleGameReset);
      socketService.off('connection_count', handleConnectionCount);
      socketService.off('error', handleError);
      socketService.disconnect();
    };
  }, [serverUrl]);

  // Control functions
  const drawNumber = useCallback(() => {
    socketService.drawNumber();
  }, []);

  const resetGame = useCallback(() => {
    socketService.resetGame();
  }, []);

  const refreshState = useCallback(() => {
    socketService.getState();
  }, []);

  return {
    connected,
    connectionStatus,
    gameState,
    connectionCount,
    error,
    reconnectAttempt,
    drawNumber,
    resetGame,
    refreshState,
  };
}
