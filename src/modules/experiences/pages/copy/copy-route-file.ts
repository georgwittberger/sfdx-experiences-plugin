import { readJsonSync, writeJsonSync } from 'fs-extra';

export default function copyRouteFile(
  sourceFile: string,
  targetFile: string,
  appPageIdMap?: Map<string, string>
): void {
  const routeContent = readJsonSync(sourceFile);

  if (appPageIdMap) {
    if (!appPageIdMap.has(routeContent.appPageId)) {
      throw new Error(`Unable to map appPageId of source file ${sourceFile}`);
    }
    routeContent.appPageId = appPageIdMap.get(routeContent.appPageId);
  }

  writeJsonSync(targetFile, routeContent, { spaces: 2 });
}
