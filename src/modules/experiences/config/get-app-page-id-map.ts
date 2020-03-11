import getSiteConfig from './get-site-config';

/**
 * Returns a mapping of the app page IDs in the source bundle to the corresponding IDs in the target bundle.
 *
 * @param {string} sourceBundlePath Path to the source bundle.
 * @param {string} targetBundlePath Path to the target bundle.
 * @returns {Map<string, string>} Mapping of app page IDs with keys from the source bundle assigned to values from the
 *   target bundle.
 */
export default function getAppPageIdMap(sourceBundlePath: string, targetBundlePath: string): Map<string, string> {
  const sourceSiteConfig = getSiteConfig(sourceBundlePath);
  const targetSiteConfig = getSiteConfig(targetBundlePath);

  const appPageIdMap = new Map<string, string>();
  appPageIdMap.set(sourceSiteConfig.mainAppPageId, targetSiteConfig.mainAppPageId);
  appPageIdMap.set(sourceSiteConfig.loginAppPageId, targetSiteConfig.loginAppPageId);
  return appPageIdMap;
}
