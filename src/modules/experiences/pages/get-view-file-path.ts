import { resolve } from 'path';
import { getViewsPath } from './core';

/**
 * Returns the path to the given view file in the given bundle path.
 *
 * @param {string} bundlePath Path to the bundle.
 * @param {string} viewFileName Name of the view file.
 * @returns {string} Path to the view file in the bundle path.
 */
export default function getViewFilePath(bundlePath: string, viewFileName: string): string {
  return resolve(getViewsPath(bundlePath), viewFileName);
}
