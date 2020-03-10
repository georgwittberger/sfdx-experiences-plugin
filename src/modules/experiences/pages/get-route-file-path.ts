import { resolve } from 'path';
import getRoutesPath from './get-routes-path';

export default function getRouteFilePath(bundlePath: string, routeFileName: string): string {
  return resolve(getRoutesPath(bundlePath), routeFileName);
}
