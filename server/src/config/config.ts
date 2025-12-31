import os from 'os';
import dotenv from 'dotenv';
import type { ServerConfig } from '../../../shared/types/game.types.js';

// Load environment variables
dotenv.config();

/**
 * Detects and returns the local IP address of the server
 * Used to display the network access URL on startup
 * Prioritizes WiFi and Ethernet adapters, skips virtual adapters
 */
export function getLocalIpAddress(): string {
  const interfaces = os.networkInterfaces();
  const addresses: { name: string; address: string; priority: number }[] = [];

  for (const name of Object.keys(interfaces)) {
    const networkInterface = interfaces[name];
    if (!networkInterface) continue;

    for (const iface of networkInterface) {
      // Skip internal (loopback) and non-IPv4 addresses
      if (iface.family === 'IPv4' && !iface.internal) {
        // Determine priority based on interface name
        let priority = 0;
        const nameLower = name.toLowerCase();

        // Skip virtual adapters (VirtualBox, VMware, Docker, WSL)
        if (
          nameLower.includes('virtualbox') ||
          nameLower.includes('vmware') ||
          nameLower.includes('vboxnet') ||
          nameLower.includes('vethernet') ||
          nameLower.includes('docker') ||
          nameLower.includes('wsl') ||
          nameLower.includes('host-only')
        ) {
          continue; // Skip virtual adapters
        }

        // Prioritize WiFi and Ethernet adapters
        if (nameLower.includes('wi-fi') || nameLower.includes('wireless')) {
          priority = 10; // Highest priority for WiFi
        } else if (nameLower.includes('ethernet') || nameLower.includes('local area connection')) {
          priority = 9; // Second priority for Ethernet
        } else {
          priority = 5; // Lower priority for other interfaces
        }

        addresses.push({ name, address: iface.address, priority });
      }
    }
  }

  // Sort by priority (highest first) and return the best address
  if (addresses.length > 0) {
    addresses.sort((a, b) => b.priority - a.priority);
    return addresses[0].address;
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
