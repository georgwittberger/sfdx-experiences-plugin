import { existsSync } from 'fs';
import { readJsonSync, writeJsonSync } from 'fs-extra';

/**
 * Copies the given source route file to the given target route file. Transforms app page IDs if given.
 *
 * @param {string} sourceFile Path to the source route file.
 * @param {string} targetFile Path to the target route file.
 * @param {Map<string, string>} [appPageIdMap] Optional mapping of app page IDs.
 */
export default function copyRouteFile(
  sourceFile: string,
  targetFile: string,
  appPageIdMap?: Map<string, string>
): void {
  if (!existsSync(sourceFile)) {
    throw new Error(`Source route file does not exist: ${sourceFile}`);
  }

  const routeContent = readJsonSync(sourceFile);

  if (appPageIdMap) {
    if (!appPageIdMap.has(routeContent.appPageId)) {
      throw new Error(`Unable to map appPageId of source route file: ${sourceFile}`);
    }
    routeContent.appPageId = appPageIdMap.get(routeContent.appPageId);
  }

  writeJsonSync(targetFile, routeContent, { spaces: 2 });
}
