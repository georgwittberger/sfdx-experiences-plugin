import { readdirSync } from 'fs';
import getRoutesPath from './get-routes-path';

export default function getRoutesFileNames(bundlePath: string): string[] {
  return readdirSync(getRoutesPath(bundlePath)).filter(file => file.toLowerCase().endsWith('.json'));
}
