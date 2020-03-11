import { writeJsonSync } from 'fs-extra';
import { AppPageType } from './app-page-type';
import { getAppPageConfig, getSiteConfig } from './core';

const supportedSiteConfig = [
  'isAvailableToGuests',
  'isFilteredComponentsView',
  'isProgressiveRenderingEnabled',
  'preferredDomain',
  'trustedSitesForScript'
];
const supportedMainAppPageConfig = ['cmsSettings', 'headMarkup', 'isRelaxedCSPLevel'];
const supportedLoginAppPageConfig = ['cmsSettings', 'isRelaxedCSPLevel'];

/**
 * Copies the given site or app page configuration values from the source bundle to the target bundle.
 *
 * @param {string} sourceBundlePath Path to the source bundle.
 * @param {string} targetBundlePath Path to the target bundle.
 * @param {string[]} config Configuration names to copy.
 */
export default function copyConfig(sourceBundlePath: string, targetBundlePath: string, config: string[]): void {
  const siteConfigToCopy = config.filter(givenConfig => supportedSiteConfig.includes(givenConfig));
  const mainAppPageConfigToCopy = config.filter(givenConfig => supportedMainAppPageConfig.includes(givenConfig));
  const loginAppPageConfigToCopy = config.filter(givenConfig => supportedLoginAppPageConfig.includes(givenConfig));

  // Copy site configuration
  if (siteConfigToCopy.length > 0) {
    const sourceSiteConfig = getSiteConfig(sourceBundlePath);
    const targetSiteConfig = getSiteConfig(targetBundlePath);

    siteConfigToCopy.forEach(configKey => {
      if (typeof sourceSiteConfig.content[configKey] !== 'undefined') {
        targetSiteConfig.content[configKey] = sourceSiteConfig.content[configKey];
      } else {
        delete targetSiteConfig.content[configKey];
      }
    });

    writeJsonSync(targetSiteConfig.filePath, targetSiteConfig.content, { spaces: 2 });
  }

  // Copy main app page configuration
  if (mainAppPageConfigToCopy.length > 0) {
    const sourceMainAppPageConfig = getAppPageConfig(sourceBundlePath, AppPageType.Main);
    const targetMainAppPageConfig = getAppPageConfig(targetBundlePath, AppPageType.Main);

    mainAppPageConfigToCopy.forEach(configKey => {
      if (typeof sourceMainAppPageConfig.content[configKey] !== 'undefined') {
        targetMainAppPageConfig.content[configKey] = sourceMainAppPageConfig.content[configKey];
      } else {
        delete targetMainAppPageConfig.content[configKey];
      }
    });

    writeJsonSync(targetMainAppPageConfig.filePath, targetMainAppPageConfig.content, { spaces: 2 });
  }

  // Copy login app page configuration
  if (loginAppPageConfigToCopy.length > 0) {
    const sourceLoginAppPageConfig = getAppPageConfig(sourceBundlePath, AppPageType.Login);
    const targetLoginAppPageConfig = getAppPageConfig(targetBundlePath, AppPageType.Login);

    loginAppPageConfigToCopy.forEach(configKey => {
      if (typeof sourceLoginAppPageConfig.content[configKey] !== 'undefined') {
        targetLoginAppPageConfig.content[configKey] = sourceLoginAppPageConfig.content[configKey];
      } else {
        delete targetLoginAppPageConfig.content[configKey];
      }
    });

    writeJsonSync(targetLoginAppPageConfig.filePath, targetLoginAppPageConfig.content, { spaces: 2 });
  }
}
