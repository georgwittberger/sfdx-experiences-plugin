import { resolve } from 'path';

export default function getViewsPath(bundlePath: string): string {
  return resolve(bundlePath, 'views');
}
