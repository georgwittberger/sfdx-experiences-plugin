import { resolve } from 'path';

export default function getRoutesPath(bundlePath: string): string {
  return resolve(bundlePath, 'routes');
}
