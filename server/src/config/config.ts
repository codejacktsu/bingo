import os from 'os';
import dotenv from 'dotenv';
import type { ServerConfig } from '../../../shared/types/game.types.js';

// Load environment variables
dotenv.config();

/**
 * Detects and returns the local IP address of the server
 * Used to display the network access URL on startup
 */
export function getLocalIpAddress(): string {
  const interfaces = os.networkInterfaces();

  for (const name of Object.keys(interfaces)) {
    const networkInterface = interfaces[name];
    if (!networkInterface) continue;

    for (const iface of networkInterface) {
      // Skip internal (loopback) and non-IPv4 addresses
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }

  return 'localhost';
}

/**
 * Server configuration loaded from environment variables
 */
export const config: ServerConfig = {
  port: parseInt(process.env.PORT || '3001', 10),
  host: process.env.HOST || '0.0.0.0',
  corsOrigin: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',')
    : ['*'], // Allow all origins on local network
  nodeEnv: process.env.NODE_ENV || 'development',
};

/**
 * Validates the server configuration
 * Throws an error if configuration is invalid
 */
export function validateConfig(cfg: ServerConfig): void {
  if (cfg.port < 1 || cfg.port > 65535) {
    throw new Error(`Invalid port number: ${cfg.port}. Must be between 1 and 65535.`);
  }

  if (!cfg.host) {
    throw new Error('Host address is required');
  }

  if (!cfg.corsOrigin || cfg.corsOrigin.length === 0) {
    throw new Error('CORS origin is required');
  }
}

// Validate configuration on module load
validateConfig(config);
