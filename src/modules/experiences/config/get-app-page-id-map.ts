import getSiteConfig from './get-site-config';

export default function getAppPageIdMap(sourceBundlePath: string, targetBundlePath: string): Map<string, string> {
  const sourceSiteConfig = getSiteConfig(sourceBundlePath);
  const targetSiteConfig = getSiteConfig(targetBundlePath);

  const appPageIdMap = new Map<string, string>();
  appPageIdMap.set(sourceSiteConfig.mainAppPageId, targetSiteConfig.mainAppPageId);
  appPageIdMap.set(sourceSiteConfig.loginAppPageId, targetSiteConfig.loginAppPageId);
  return appPageIdMap;
}
