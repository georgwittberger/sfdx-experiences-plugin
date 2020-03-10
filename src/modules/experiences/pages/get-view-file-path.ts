import { resolve } from 'path';
import getViewsPath from './get-views-path';

export default function getViewFilePath(bundlePath: string, viewFileName: string): string {
  return resolve(getViewsPath(bundlePath), viewFileName);
}
