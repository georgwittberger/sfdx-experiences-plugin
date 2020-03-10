import { isAbsolute, resolve } from 'path';

export default function getAbsolutePath(path: string): string {
  if (typeof path === 'undefined') throw new Error('Path is undefined');
  return isAbsolute(path) ? path : resolve(process.cwd(), path);
}
