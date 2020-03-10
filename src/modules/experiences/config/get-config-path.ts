import { resolve } from 'path';

export default function getConfigPath(bundlePath: string): string {
  return resolve(bundlePath, 'config');
}
