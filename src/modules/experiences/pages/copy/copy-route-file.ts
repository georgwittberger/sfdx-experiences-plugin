import { existsSync } from 'fs';
import { readJsonSync, writeJsonSync } from 'fs-extra';

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
