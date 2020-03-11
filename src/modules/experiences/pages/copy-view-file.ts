import { existsSync } from 'fs';
import { readJsonSync, writeJsonSync } from 'fs-extra';

/**
 * Copies the given source view file to the given target view file. Transforms app page IDs if given.
 *
 * @param {string} sourceFile Path to the source view file.
 * @param {string} targetFile Path to the target view file.
 * @param {Map<string, string>} [appPageIdMap] Optional mapping of app page IDs.
 */
export default function copyViewFile(sourceFile: string, targetFile: string, appPageIdMap?: Map<string, string>): void {
  if (!existsSync(sourceFile)) {
    throw new Error(`Source view file does not exist: ${sourceFile}`);
  }

  const viewContent = readJsonSync(sourceFile);

  if (appPageIdMap) {
    if (!appPageIdMap.has(viewContent.appPageId)) {
      throw new Error(`Unable to map appPageId of source view file: ${sourceFile}`);
    }
    viewContent.appPageId = appPageIdMap.get(viewContent.appPageId);
  }

  writeJsonSync(targetFile, viewContent, { spaces: 2 });
}
