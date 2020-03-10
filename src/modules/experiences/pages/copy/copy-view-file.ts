import { existsSync } from 'fs';
import { readJsonSync, writeJsonSync } from 'fs-extra';

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
