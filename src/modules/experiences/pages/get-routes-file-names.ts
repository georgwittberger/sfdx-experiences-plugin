import { existsSync, readdirSync } from 'fs';
import { getRoutesPath } from './core';

/**
 * Returns the names of all route files in the given bundle path.
 *
 * @param {string} bundlePath Path to the bundle.
 * @returns {string[]} Names of all route files in the bundle path.
 */
export default function getRoutesFileNames(bundlePath: string): string[] {
  const routesPath = getRoutesPath(bundlePath);
  if (!existsSync(routesPath)) {
    throw new Error(`Routes directory does not exist: ${routesPath}`);
  }

  return readdirSync(routesPath).filter(file => file.toLowerCase().endsWith('.json'));
}
