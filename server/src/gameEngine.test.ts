import { describe, it, expect, beforeEach } from 'vitest';
import { BingoGameEngine } from './gameEngine.js';

describe('BingoGameEngine', () => {
  let engine: BingoGameEngine;

  beforeEach(() => {
    engine = new BingoGameEngine();
  });

  describe('initialization', () => {
    it('should initialize with 75 remaining numbers', () => {
      expect(engine.getRemainingCount()).toBe(75);
    });

    it('should initialize with 0 drawn numbers', () => {
      expect(engine.getDrawnCount()).toBe(0);
    });

    it('should initialize with null current number', () => {
      const state = engine.getState();
      expect(state.currentNumber).toBeNull();
    });

    it('should generate a unique game ID', () => {
      const id1 = engine.getGameId();
      const engine2 = new BingoGameEngine();
      const id2 = engine2.getGameId();

      expect(id1).toBeTruthy();
      expect(id2).toBeTruthy();
      expect(id1).not.toBe(id2);
    });

    it('should set gameStarted to false initially', () => {
      const state = engine.getState();
      expect(state.gameStarted).toBe(false);
    });
  });

  describe('drawNumber', () => {
    it('should draw a number between 1 and 75', () => {
      const number = engine.drawNumber();
      expect(number).toBeGreaterThanOrEqual(1);
      expect(number).toBeLessThanOrEqual(75);
    });

    it('should reduce remaining count by 1', () => {
      const initialCount = engine.getRemainingCount();
      engine.drawNumber();
      expect(engine.getRemainingCount()).toBe(initialCount - 1);
    });

    it('should increase drawn count by 1', () => {
      const initialCount = engine.getDrawnCount();
      engine.drawNumber();
      expect(engine.getDrawnCount()).toBe(initialCount + 1);
    });

    it('should set currentNumber to the drawn number', () => {
      const number = engine.drawNumber();
      const state = engine.getState();
      expect(state.currentNumber).toBe(number);
    });

    it('should set gameStarted to true after first draw', () => {
      engine.drawNumber();
      const state = engine.getState();
      expect(state.gameStarted).toBe(true);
    });

    it('should not draw duplicate numbers', () => {
      const drawnNumbers = new Set<number>();

      // Draw all 75 numbers
      for (let i = 0; i < 75; i++) {
        const number = engine.drawNumber();
        expect(drawnNumbers.has(number!)).toBe(false);
        drawnNumbers.add(number!);
      }

      expect(drawnNumbers.size).toBe(75);
    });

    it('should return null when all numbers are drawn', () => {
      // Draw all 75 numbers
      for (let i = 0; i < 75; i++) {
        engine.drawNumber();
      }

      // Try to draw one more
      const number = engine.drawNumber();
      expect(number).toBeNull();
    });

    it('should add drawn numbers to drawnNumbers array', () => {
      const number = engine.drawNumber();
      const state = engine.getState();

      expect(state.drawnNumbers).toContain(number);
      expect(state.drawnNumbers.length).toBe(1);
    });

    it('should maintain order of drawn numbers', () => {
      const numbers: number[] = [];

      for (let i = 0; i < 5; i++) {
        const number = engine.drawNumber();
        numbers.push(number!);
      }

      const state = engine.getState();
      expect(state.drawnNumbers).toEqual(numbers);
    });
  });

  describe('reset', () => {
    it('should reset drawn count to 0', () => {
      engine.drawNumber();
      engine.drawNumber();
      engine.reset();

      expect(engine.getDrawnCount()).toBe(0);
    });

    it('should reset remaining count to 75', () => {
      engine.drawNumber();
      engine.drawNumber();
      engine.reset();

      expect(engine.getRemainingCount()).toBe(75);
    });

    it('should clear drawnNumbers array', () => {
      engine.drawNumber();
      engine.drawNumber();
      engine.reset();

      const state = engine.getState();
      expect(state.drawnNumbers.length).toBe(0);
    });

    it('should reset currentNumber to null', () => {
      engine.drawNumber();
      engine.reset();

      const state = engine.getState();
      expect(state.currentNumber).toBeNull();
    });

    it('should generate a new game ID', () => {
      const id1 = engine.getGameId();
      engine.reset();
      const id2 = engine.getGameId();

      expect(id1).not.toBe(id2);
    });

    it('should set gameStarted to false', () => {
      engine.drawNumber();
      engine.reset();

      const state = engine.getState();
      expect(state.gameStarted).toBe(false);
    });

    it('should allow drawing numbers after reset', () => {
      // Draw all numbers
      for (let i = 0; i < 75; i++) {
        engine.drawNumber();
      }

      // Reset
      engine.reset();

      // Should be able to draw again
      const number = engine.drawNumber();
      expect(number).not.toBeNull();
      expect(number).toBeGreaterThanOrEqual(1);
      expect(number).toBeLessThanOrEqual(75);
    });
  });

  describe('getState', () => {
    it('should return complete game state', () => {
      const state = engine.getState();

      expect(state).toHaveProperty('drawnNumbers');
      expect(state).toHaveProperty('remainingNumbers');
      expect(state).toHaveProperty('currentNumber');
      expect(state).toHaveProperty('gameStarted');
      expect(state).toHaveProperty('gameId');
      expect(state).toHaveProperty('timestamp');
    });

    it('should return arrays with correct lengths', () => {
      engine.drawNumber();
      engine.drawNumber();
      const state = engine.getState();

      expect(state.drawnNumbers.length).toBe(2);
      expect(state.remainingNumbers.length).toBe(73);
    });

    it('should include timestamp', () => {
      const before = Date.now();
      const state = engine.getState();
      const after = Date.now();

      expect(state.timestamp).toBeGreaterThanOrEqual(before);
      expect(state.timestamp).toBeLessThanOrEqual(after);
    });
  });

  describe('isComplete', () => {
    it('should return false when game just started', () => {
      expect(engine.isComplete()).toBe(false);
    });

    it('should return false when some numbers drawn', () => {
      engine.drawNumber();
      engine.drawNumber();
      expect(engine.isComplete()).toBe(false);
    });

    it('should return true when all 75 numbers drawn', () => {
      for (let i = 0; i < 75; i++) {
        engine.drawNumber();
      }
      expect(engine.isComplete()).toBe(true);
    });
  });

  describe('getDrawnNumbers', () => {
    it('should return empty array initially', () => {
      const numbers = engine.getDrawnNumbers();
      expect(numbers).toEqual([]);
    });

    it('should return all drawn numbers in order', () => {
      const drawn: number[] = [];
      for (let i = 0; i < 5; i++) {
        const num = engine.drawNumber();
        drawn.push(num!);
      }

      const numbers = engine.getDrawnNumbers();
      expect(numbers).toEqual(drawn);
    });
  });

  describe('edge cases', () => {
    it('should handle rapid successive draws', () => {
      const numbers: number[] = [];

      for (let i = 0; i < 10; i++) {
        const num = engine.drawNumber();
        numbers.push(num!);
      }

      // All should be unique
      const uniqueNumbers = new Set(numbers);
      expect(uniqueNumbers.size).toBe(10);
    });

    it('should handle drawing exactly 75 numbers', () => {
      for (let i = 0; i < 75; i++) {
        const num = engine.drawNumber();
        expect(num).not.toBeNull();
      }

      expect(engine.isComplete()).toBe(true);
      expect(engine.getRemainingCount()).toBe(0);
      expect(engine.getDrawnCount()).toBe(75);
    });

    it('should handle multiple resets', () => {
      engine.drawNumber();
      engine.reset();
      engine.drawNumber();
      engine.reset();
      engine.drawNumber();

      expect(engine.getDrawnCount()).toBe(1);
      expect(engine.getRemainingCount()).toBe(74);
    });
  });

  describe('randomness', () => {
    it('should produce different sequences on different instances', () => {
      const engine1 = new BingoGameEngine();
      const engine2 = new BingoGameEngine();

      const sequence1: number[] = [];
      const sequence2: number[] = [];

      for (let i = 0; i < 10; i++) {
        sequence1.push(engine1.drawNumber()!);
        sequence2.push(engine2.drawNumber()!);
      }

      // Sequences should be different (very unlikely to be the same)
      expect(sequence1).not.toEqual(sequence2);
    });

    it('should eventually draw all numbers from 1 to 75', () => {
      const drawnNumbers: number[] = [];

      for (let i = 0; i < 75; i++) {
        drawnNumbers.push(engine.drawNumber()!);
      }

      drawnNumbers.sort((a, b) => a - b);
      const expected = Array.from({ length: 75 }, (_, i) => i + 1);

      expect(drawnNumbers).toEqual(expected);
    });
  });
});
