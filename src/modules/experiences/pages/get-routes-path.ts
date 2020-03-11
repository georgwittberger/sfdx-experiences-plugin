import { resolve } from 'path';

/**
 * Returns the path to the routes directory for the given bundle path.
 *
 * @param {string} bundlePath Path to the bundle.
 * @returns {string} Path to the routes directory of the bundle.
 */
export default function getRoutesPath(bundlePath: string): string {
  return resolve(bundlePath, 'routes');
}
