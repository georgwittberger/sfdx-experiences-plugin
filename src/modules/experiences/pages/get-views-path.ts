import { resolve } from 'path';

/**
 * Returns the path to the views directory for the given bundle path.
 *
 * @param {string} bundlePath Path to the bundle.
 * @returns {string} Path to the views directory of the bundle.
 */
export default function getViewsPath(bundlePath: string): string {
  return resolve(bundlePath, 'views');
}
