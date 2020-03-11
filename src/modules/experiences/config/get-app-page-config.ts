import { existsSync } from 'fs';
import { readJsonSync } from 'fs-extra';
import { resolve } from 'path';
import AppPageConfig from './app-page-config';
import { AppPageType } from './app-page-type';
import { getConfigPath } from './core';

/**
 * Returns the app page configuration of the given type from the given bundle path.
 *
 * @param {string} bundlePath Path to the bundle.
 * @param {AppPageType} type Type of the app page.
 * @returns {AppPageConfig} App page configuration from the bundle.
 */
export default function getAppPageConfig(bundlePath: string, type: AppPageType): AppPageConfig {
  const configPath = getConfigPath(bundlePath);
  if (!existsSync(configPath)) {
    throw new Error(`Config directory does not exist: ${configPath}`);
  }

  const appPageFile =
    type === AppPageType.Login ? resolve(configPath, 'loginAppPage.json') : resolve(configPath, 'mainAppPage.json');
  if (!existsSync(appPageFile)) {
    throw new Error(`App page config file does not exist: ${appPageFile}`);
  }

  const appPageContent = readJsonSync(appPageFile);
  return { filePath: appPageFile, content: appPageContent };
}
