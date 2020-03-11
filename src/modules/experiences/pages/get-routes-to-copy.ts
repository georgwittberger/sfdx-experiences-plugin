import { getRoutesFileNames } from './core';

/**
 * Returns the names of the route files to copy from the source bundle to the target bundle.
 *
 * @param {string} sourceBundlePath Path to the source bundle.
 * @param {string} targetBundlePath Path to the target bundle.
 * @param {boolean} [overwrite=false] Copy files that already exist in the target bundle.
 * @param {string[]} [includeFiles] Copy only files with the given names.
 * @returns {string[]} Names of the route files to copy from source to target.
 */
export default function getRoutesToCopy(
  sourceBundlePath: string,
  targetBundlePath: string,
  overwrite: boolean = false,
  includeFiles?: string[]
): string[] {
  let routesToCopy = getRoutesFileNames(sourceBundlePath);

  if (includeFiles) {
    routesToCopy = routesToCopy.filter(sourceRouteFile => includeFiles.includes(sourceRouteFile));
  }

  if (overwrite) return routesToCopy;

  const targetRoutes = getRoutesFileNames(targetBundlePath);
  return routesToCopy.filter(sourceRouteFile => !targetRoutes.includes(sourceRouteFile));
}
