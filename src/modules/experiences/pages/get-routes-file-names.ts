import { existsSync, readdirSync } from 'fs';
import getRoutesPath from './get-routes-path';

export default function getRoutesFileNames(bundlePath: string): string[] {
  const routesPath = getRoutesPath(bundlePath);
  if (!existsSync(routesPath)) {
    throw new Error(`Routes directory does not exist: ${routesPath}`);
  }

  return readdirSync(routesPath).filter(file => file.toLowerCase().endsWith('.json'));
}
