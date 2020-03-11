import { isAbsolute, resolve } from 'path';

/**
 * Returns the absolute path for the given (relative) path. Resolves from the current working directory.
 *
 * @param {string} path Path to resolve to absolute path.
 * @returns {string} Absolute path resolved from the current working directory.
 */
export default function getAbsolutePath(path: string): string {
  if (typeof path === 'undefined') throw new Error('Path is undefined');
  return isAbsolute(path) ? path : resolve(process.cwd(), path);
}
