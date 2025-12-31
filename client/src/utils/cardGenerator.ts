/**
 * Bingo Card Generator
 * Generates random bingo cards following standard bingo rules:
 * - B column: 1-15
 * - I column: 16-30
 * - N column: 31-45 (with FREE space in center)
 * - G column: 46-60
 * - O column: 61-75
 */

export interface BingoCard {
  id: string;
  numbers: (number | 'FREE')[][];
}

/**
 * Generates a random number within a range (inclusive)
 */
function randomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates unique random numbers for a bingo column
 */
function generateColumnNumbers(min: number, max: number, count: number): number[] {
  const numbers = new Set<number>();

  while (numbers.size < count) {
    numbers.add(randomInRange(min, max));
  }

  return Array.from(numbers);
}

/**
 * Generates a single bingo card
 */
export function generateBingoCard(id?: string): BingoCard {
  const cardId = id || `card-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Generate numbers for each column
  const bColumn = generateColumnNumbers(1, 15, 5);
  const iColumn = generateColumnNumbers(16, 30, 5);
  const nColumn = generateColumnNumbers(31, 45, 5);
  const gColumn = generateColumnNumbers(46, 60, 5);
  const oColumn = generateColumnNumbers(61, 75, 5);

  // Create 5x5 grid
  const numbers: (number | 'FREE')[][] = [];

  for (let row = 0; row < 5; row++) {
    numbers.push([
      bColumn[row],
      iColumn[row],
      row === 2 ? 'FREE' : nColumn[row], // Center space is FREE
      gColumn[row],
      oColumn[row],
    ]);
  }

  return {
    id: cardId,
    numbers,
  };
}

/**
 * Generates multiple unique bingo cards
 */
export function generateBingoCards(count: number): BingoCard[] {
  const cards: BingoCard[] = [];

  for (let i = 0; i < count; i++) {
    cards.push(generateBingoCard(`card-${i + 1}`));
  }

  return cards;
}

/**
 * Checks if a card is valid (no duplicate numbers, correct ranges)
 */
export function validateBingoCard(card: BingoCard): boolean {
  const allNumbers = new Set<number>();
  let hasFreeSpace = false;

  for (let col = 0; col < 5; col++) {
    const columnMin = col * 15 + 1;
    const columnMax = col * 15 + 15;

    for (let row = 0; row < 5; row++) {
      const value = card.numbers[row][col];

      // Check FREE space
      if (value === 'FREE') {
        if (col !== 2 || row !== 2) {
          return false; // FREE space in wrong position
        }
        hasFreeSpace = true;
        continue;
      }

      // Center position must be FREE
      if (col === 2 && row === 2) {
        return false; // Center should be FREE but isn't
      }

      // Check for duplicates
      if (allNumbers.has(value)) {
        return false;
      }
      allNumbers.add(value);

      // Check range
      if (value < columnMin || value > columnMax) {
        return false;
      }
    }
  }

  // Must have FREE space in center
  return hasFreeSpace;
}
