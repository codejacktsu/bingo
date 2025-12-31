import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import type { GameHistory } from '../../shared/types/game.types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Database schema for game history storage
 */
interface Database {
  games: GameHistory[];
}

/**
 * Default database structure
 */
const defaultData: Database = {
  games: [],
};

/**
 * Storage class for persisting game history to JSON file
 * Uses lowdb for simple, lightweight JSON-based storage
 */
export class GameStorage {
  private db: Low<Database>;
  private filePath: string;

  constructor(dataDir?: string) {
    // Default to server/data directory
    const dir = dataDir || path.join(__dirname, '../data');
    this.filePath = path.join(dir, 'gameHistory.json');

    const adapter = new JSONFile<Database>(this.filePath);
    this.db = new Low(adapter, defaultData);
  }

  /**
   * Initializes the database
   * Creates the data directory and file if they don't exist
   */
  public async initialize(): Promise<void> {
    try {
      // Ensure data directory exists
      const dir = path.dirname(this.filePath);
      await fs.mkdir(dir, { recursive: true });

      // Read the database
      await this.db.read();

      // Initialize with default data if file is empty
      if (!this.db.data) {
        this.db.data = defaultData;
        await this.db.write();
      }

      console.log(`📁 Game history storage initialized at: ${this.filePath}`);
    } catch (error) {
      console.error('Failed to initialize storage:', error);
      throw error;
    }
  }

  /**
   * Saves a game session to history
   * @param game The game history to save
   */
  public async saveGame(game: GameHistory): Promise<void> {
    try {
      await this.db.read();

      // Check if game already exists (update scenario)
      const existingIndex = this.db.data.games.findIndex((g) => g.gameId === game.gameId);

      if (existingIndex >= 0) {
        // Update existing game
        this.db.data.games[existingIndex] = game;
      } else {
        // Add new game
        this.db.data.games.push(game);
      }

      await this.db.write();
    } catch (error) {
      console.error('Failed to save game:', error);
      throw error;
    }
  }

  /**
   * Retrieves all game history
   * @returns Array of all saved games
   */
  public async getAllGames(): Promise<GameHistory[]> {
    try {
      await this.db.read();
      return this.db.data.games;
    } catch (error) {
      console.error('Failed to retrieve games:', error);
      return [];
    }
  }

  /**
   * Retrieves a specific game by ID
   * @param gameId The game ID to retrieve
   * @returns The game history, or undefined if not found
   */
  public async getGame(gameId: string): Promise<GameHistory | undefined> {
    try {
      await this.db.read();
      return this.db.data.games.find((g) => g.gameId === gameId);
    } catch (error) {
      console.error('Failed to retrieve game:', error);
      return undefined;
    }
  }

  /**
   * Retrieves the most recent N games
   * @param count Number of games to retrieve
   * @returns Array of recent games
   */
  public async getRecentGames(count: number = 10): Promise<GameHistory[]> {
    try {
      await this.db.read();
      return this.db.data.games.slice(-count).reverse();
    } catch (error) {
      console.error('Failed to retrieve recent games:', error);
      return [];
    }
  }

  /**
   * Deletes old games, keeping only the most recent N
   * @param keepCount Number of games to keep
   */
  public async pruneOldGames(keepCount: number = 100): Promise<void> {
    try {
      await this.db.read();

      if (this.db.data.games.length > keepCount) {
        this.db.data.games = this.db.data.games.slice(-keepCount);
        await this.db.write();
        console.log(`🗑️  Pruned game history, keeping last ${keepCount} games`);
      }
    } catch (error) {
      console.error('Failed to prune games:', error);
    }
  }

  /**
   * Gets the total number of games stored
   */
  public async getGameCount(): Promise<number> {
    try {
      await this.db.read();
      return this.db.data.games.length;
    } catch (error) {
      console.error('Failed to get game count:', error);
      return 0;
    }
  }

  /**
   * Clears all game history (use with caution)
   */
  public async clearAll(): Promise<void> {
    try {
      this.db.data = defaultData;
      await this.db.write();
      console.log('🗑️  All game history cleared');
    } catch (error) {
      console.error('Failed to clear games:', error);
      throw error;
    }
  }
}
