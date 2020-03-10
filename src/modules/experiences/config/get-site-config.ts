import { existsSync, readdirSync } from 'fs';
import { readJsonSync } from 'fs-extra';
import { resolve } from 'path';
import getConfigPath from './get-config-path';
import SiteConfig from './site-config';

export default function getSiteConfig(bundlePath: string): SiteConfig {
  const configPath = getConfigPath(bundlePath);
  if (!existsSync(configPath)) {
    throw new Error(`Config directory does not exist: ${configPath}`);
  }

  const configFiles = readdirSync(configPath).filter(file => file.toLowerCase().endsWith('.json'));
  for (const configFile of configFiles) {
    const configContent = readJsonSync(resolve(configPath, configFile));
    if (configContent.type === 'site') {
      return configContent;
    }
  }

  throw new Error(`Site config file not found in bundle directory: ${bundlePath}`);
}
