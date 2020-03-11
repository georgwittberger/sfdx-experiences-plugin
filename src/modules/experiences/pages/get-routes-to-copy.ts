import { getRoutesFileNames } from './core';

/**
 * Returns the names of the route files to copy from the source bundle to the target bundle.
 *
 * @param {string} sourceBundlePath Path to the source bundle.
 * @param {string} targetBundlePath Path to the target bundle.
 * @param {boolean} [overwrite=false] Copy files that already exist in the target bundle.
 * @returns {string[]} Names of the route files to copy from source to target.
 */
export default function getRoutesToCopy(
  sourceBundlePath: string,
  targetBundlePath: string,
  overwrite: boolean = false
): string[] {
  const sourceRoutes = getRoutesFileNames(sourceBundlePath);
  if (overwrite) return sourceRoutes;

  const targetRoutes = getRoutesFileNames(targetBundlePath);
  return sourceRoutes.filter(sourceRoute => !targetRoutes.includes(sourceRoute));
}
