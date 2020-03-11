import { resolve } from 'path';
import { getRoutesPath } from './core';

/**
 * Returns the path to the given route file in the given bundle path.
 *
 * @param {string} bundlePath Path to the bundle.
 * @param {string} routeFileName Name of the route file.
 * @returns {string} Path to the route file in the bundle path.
 */
export default function getRouteFilePath(bundlePath: string, routeFileName: string): string {
  return resolve(getRoutesPath(bundlePath), routeFileName);
}
