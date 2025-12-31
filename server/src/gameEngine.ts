import type { GameState } from '../../shared/types/game.types.js';

/**
 * BingoGameEngine - Core game logic for bingo number drawing
 *
 * Manages the state of a bingo game including:
 * - Drawing random numbers from 1-75
 * - Tracking drawn and remaining numbers
 * - Preventing duplicate draws
 * - Resetting game state
 */
export class BingoGameEngine {
  private drawnNumbers: Set<number>;
  private remainingNumbers: number[];
  private currentNumber: number | null;
  private gameId: string;
  private startTime: number;

  constructor() {
    this.drawnNumbers = new Set();
    this.remainingNumbers = [];
    this.currentNumber = null;
    this.gameId = this.generateGameId();
    this.startTime = Date.now();
    this.reset();
  }

  /**
   * Generates a unique game ID using timestamp and random string
   */
  private generateGameId(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 11);
    return `game-${timestamp}-${random}`;
  }

  /**
   * Shuffles an array in place using Fisher-Yates algorithm
   * Ensures true randomness for number drawing
   */
  private shuffleArray<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  /**
   * Draws the next random number from the remaining pool
   * @returns The drawn number, or null if all numbers have been drawn
   */
  public drawNumber(): number | null {
    if (this.remainingNumbers.length === 0) {
      return null; // Game complete - all numbers drawn
    }

    // Pop the next number from the shuffled array
    const number = this.remainingNumbers.pop()!;
    this.drawnNumbers.add(number);
    this.currentNumber = number;

    return number;
  }

  /**
   * Resets the game to initial state
   * - Clears all drawn numbers
   * - Reinitializes numbers 1-75
   * - Shuffles the number pool
   * - Generates new game ID
   */
  public reset(): void {
    this.drawnNumbers.clear();
    this.currentNumber = null;
    this.gameId = this.generateGameId();
    this.startTime = Date.now();

    // Initialize array with numbers 1-75
    this.remainingNumbers = Array.from({ length: 75 }, (_, i) => i + 1);

    // Shuffle for random drawing
    this.shuffleArray(this.remainingNumbers);
  }

  /**
   * Returns the current game state
   * @returns Complete game state including all drawn numbers and metadata
   */
  public getState(): GameState {
    return {
      drawnNumbers: Array.from(this.drawnNumbers).sort((a, b) => a - b),
      remainingNumbers: [...this.remainingNumbers], // Create copy to prevent external modification
      currentNumber: this.currentNumber,
      gameStarted: this.drawnNumbers.size > 0,
      gameId: this.gameId,
      timestamp: Date.now(),
    };
  }

  /**
   * Gets the game ID
   */
  public getGameId(): string {
    return this.gameId;
  }

  /**
   * Gets the game start time
   */
  public getStartTime(): number {
    return this.startTime;
  }

  /**
   * Checks if the game is complete (all 75 numbers drawn)
   */
  public isComplete(): boolean {
    return this.drawnNumbers.size === 75;
  }

  /**
   * Gets the count of drawn numbers
   */
  public getDrawnCount(): number {
    return this.drawnNumbers.size;
  }

  /**
   * Gets the count of remaining numbers
   */
  public getRemainingCount(): number {
    return this.remainingNumbers.length;
  }

  /**
   * Gets the current number (last drawn)
   */
  public getCurrentNumber(): number | null {
    return this.currentNumber;
  }

  /**
   * Gets all drawn numbers in sorted order
   */
  public getDrawnNumbers(): number[] {
    return Array.from(this.drawnNumbers).sort((a, b) => a - b);
  }
}
