import { readJsonSync, writeJsonSync } from 'fs-extra';

export default function copyViewFile(sourceFile: string, targetFile: string, appPageIdMap?: Map<string, string>): void {
  const viewContent = readJsonSync(sourceFile);

  if (appPageIdMap) {
    if (!appPageIdMap.has(viewContent.appPageId)) {
      throw new Error(`Unable to map appPageId of source file ${sourceFile}`);
    }
    viewContent.appPageId = appPageIdMap.get(viewContent.appPageId);
  }

  writeJsonSync(targetFile, viewContent, { spaces: 2 });
}
