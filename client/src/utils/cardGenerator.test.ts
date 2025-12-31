import { describe, it, expect } from 'vitest';
import { generateBingoCard, generateBingoCards, validateBingoCard, BingoCard } from './cardGenerator';

describe('cardGenerator', () => {
  describe('generateBingoCard', () => {
    it('should generate a card with correct structure', () => {
      const card = generateBingoCard();

      expect(card).toHaveProperty('id');
      expect(card).toHaveProperty('numbers');
      expect(card.numbers).toHaveLength(5);
      expect(card.numbers[0]).toHaveLength(5);
    });

    it('should have FREE space in center (row 2, col 2)', () => {
      const card = generateBingoCard();

      expect(card.numbers[2][2]).toBe('FREE');
    });

    it('should use custom ID if provided', () => {
      const card = generateBingoCard('test-123');

      expect(card.id).toBe('test-123');
    });

    it('should generate unique ID if not provided', () => {
      const card1 = generateBingoCard();
      const card2 = generateBingoCard();

      expect(card1.id).not.toBe(card2.id);
    });

    it('should have numbers in correct ranges for each column', () => {
      const card = generateBingoCard();

      // B column (column 0): 1-15
      for (let row = 0; row < 5; row++) {
        const value = card.numbers[row][0];
        expect(typeof value).toBe('number');
        expect(value as number).toBeGreaterThanOrEqual(1);
        expect(value as number).toBeLessThanOrEqual(15);
      }

      // I column (column 1): 16-30
      for (let row = 0; row < 5; row++) {
        const value = card.numbers[row][1];
        expect(typeof value).toBe('number');
        expect(value as number).toBeGreaterThanOrEqual(16);
        expect(value as number).toBeLessThanOrEqual(30);
      }

      // N column (column 2): 31-45 (except FREE space)
      for (let row = 0; row < 5; row++) {
        const value = card.numbers[row][2];
        if (row === 2) {
          expect(value).toBe('FREE');
        } else {
          expect(typeof value).toBe('number');
          expect(value as number).toBeGreaterThanOrEqual(31);
          expect(value as number).toBeLessThanOrEqual(45);
        }
      }

      // G column (column 3): 46-60
      for (let row = 0; row < 5; row++) {
        const value = card.numbers[row][3];
        expect(typeof value).toBe('number');
        expect(value as number).toBeGreaterThanOrEqual(46);
        expect(value as number).toBeLessThanOrEqual(60);
      }

      // O column (column 4): 61-75
      for (let row = 0; row < 5; row++) {
        const value = card.numbers[row][4];
        expect(typeof value).toBe('number');
        expect(value as number).toBeGreaterThanOrEqual(61);
        expect(value as number).toBeLessThanOrEqual(75);
      }
    });

    it('should have no duplicate numbers', () => {
      const card = generateBingoCard();
      const numbers = new Set<number>();

      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
          const value = card.numbers[row][col];
          if (value !== 'FREE') {
            expect(numbers.has(value as number)).toBe(false);
            numbers.add(value as number);
          }
        }
      }

      // Should have 24 unique numbers (25 cells - 1 FREE space)
      expect(numbers.size).toBe(24);
    });

    it('should generate different cards each time', () => {
      const card1 = generateBingoCard();
      const card2 = generateBingoCard();

      // Convert to strings for comparison
      const card1Str = JSON.stringify(card1.numbers);
      const card2Str = JSON.stringify(card2.numbers);

      expect(card1Str).not.toBe(card2Str);
    });
  });

  describe('generateBingoCards', () => {
    it('should generate requested number of cards', () => {
      const cards = generateBingoCards(5);

      expect(cards).toHaveLength(5);
    });

    it('should generate cards with sequential IDs', () => {
      const cards = generateBingoCards(3);

      expect(cards[0].id).toBe('card-1');
      expect(cards[1].id).toBe('card-2');
      expect(cards[2].id).toBe('card-3');
    });

    it('should generate unique cards', () => {
      const cards = generateBingoCards(10);

      // Check that all cards are different
      const cardStrings = cards.map((card) => JSON.stringify(card.numbers));
      const uniqueCards = new Set(cardStrings);

      expect(uniqueCards.size).toBe(10);
    });

    it('should handle generating 1 card', () => {
      const cards = generateBingoCards(1);

      expect(cards).toHaveLength(1);
      expect(cards[0].id).toBe('card-1');
    });

    it('should handle generating many cards', () => {
      const cards = generateBingoCards(50);

      expect(cards).toHaveLength(50);
      // All should be valid
      cards.forEach((card) => {
        expect(validateBingoCard(card)).toBe(true);
      });
    });
  });

  describe('validateBingoCard', () => {
    it('should validate a correctly generated card', () => {
      const card = generateBingoCard();

      expect(validateBingoCard(card)).toBe(true);
    });

    it('should reject card with FREE space in wrong position', () => {
      const card: BingoCard = {
        id: 'test',
        numbers: [
          [1, 16, 31, 46, 61],
          [2, 17, 'FREE', 47, 62], // FREE in wrong row (row 1 instead of row 2)
          [3, 18, 33, 48, 63],
          [4, 19, 34, 49, 64],
          [5, 20, 35, 50, 65],
        ],
      };

      expect(validateBingoCard(card)).toBe(false);
    });

    it('should reject card with duplicate numbers', () => {
      const card: BingoCard = {
        id: 'test',
        numbers: [
          [1, 16, 31, 46, 61],
          [2, 17, 32, 47, 62],
          [3, 18, 'FREE', 48, 63],
          [4, 19, 34, 49, 64],
          [5, 20, 35, 50, 61], // 61 is duplicate
        ],
      };

      expect(validateBingoCard(card)).toBe(false);
    });

    it('should reject card with number in wrong range', () => {
      const card: BingoCard = {
        id: 'test',
        numbers: [
          [1, 16, 31, 46, 61],
          [2, 17, 32, 47, 62],
          [3, 18, 'FREE', 48, 63],
          [4, 19, 34, 49, 64],
          [16, 20, 35, 50, 65], // 16 in B column (should be 1-15)
        ],
      };

      expect(validateBingoCard(card)).toBe(false);
    });

    it('should validate multiple generated cards', () => {
      const cards = generateBingoCards(20);

      cards.forEach((card) => {
        expect(validateBingoCard(card)).toBe(true);
      });
    });

    it('should reject card with missing FREE space', () => {
      const card: BingoCard = {
        id: 'test',
        numbers: [
          [1, 16, 31, 46, 61],
          [2, 17, 32, 47, 62],
          [3, 18, 33, 48, 63], // No FREE space
          [4, 19, 34, 49, 64],
          [5, 20, 35, 50, 65],
        ],
      };

      expect(validateBingoCard(card)).toBe(false);
    });

    it('should handle edge case numbers (1, 15, 16, 30, etc.)', () => {
      const card: BingoCard = {
        id: 'test',
        numbers: [
          [1, 16, 31, 46, 61],
          [15, 30, 45, 60, 75],
          [2, 17, 'FREE', 47, 62],
          [14, 29, 44, 59, 74],
          [3, 18, 32, 48, 63],
        ],
      };

      expect(validateBingoCard(card)).toBe(true);
    });
  });

  describe('Statistical Properties', () => {
    it('should generate cards with good distribution of numbers', () => {
      const cards = generateBingoCards(100);

      // Count frequency of each number appearing
      const frequency = new Map<number, number>();

      cards.forEach((card) => {
        card.numbers.forEach((row) => {
          row.forEach((cell) => {
            if (typeof cell === 'number') {
              frequency.set(cell, (frequency.get(cell) || 0) + 1);
            }
          });
        });
      });

      // With 100 cards, we should use a good variety of numbers
      expect(frequency.size).toBeGreaterThan(60); // At least 60 different numbers used

      // No number should appear in more than 50% of cards (too strict at 20%)
      // With 100 cards and 5 slots per column, average is ~33 occurrences per number
      frequency.forEach((count) => {
        expect(count).toBeLessThanOrEqual(50);
      });
    });
  });
});
