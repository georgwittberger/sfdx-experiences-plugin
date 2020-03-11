import { existsSync, readdirSync } from 'fs';
import { readJsonSync } from 'fs-extra';
import { resolve } from 'path';
import getConfigPath from './get-config-path';
import SiteConfig from './site-config';

/**
 * Returns the site configuration from the given bundle path.
 *
 * @param {string} bundlePath Path to the bundle.
 * @returns {SiteConfig} Site configuration from the bundle.
 */
export default function getSiteConfig(bundlePath: string): SiteConfig {
  const configPath = getConfigPath(bundlePath);
  if (!existsSync(configPath)) {
    throw new Error(`Config directory does not exist: ${configPath}`);
  }

  const configFiles = readdirSync(configPath).filter(file => file.toLowerCase().endsWith('.json'));
  for (const configFile of configFiles) {
    const filePath = resolve(configPath, configFile);
    const fileContent = readJsonSync(filePath);
    if (fileContent.type === 'site') {
      return { filePath, content: fileContent };
    }
  }

  throw new Error(`Site config file not found in bundle directory: ${bundlePath}`);
}
