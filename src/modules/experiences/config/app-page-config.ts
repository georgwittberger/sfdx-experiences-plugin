/**
 * App page configuration in the ExperienceBundle
 */
export default interface AppPageConfig {
  /**
   * Path of the config file.
   *
   * @type {string}
   * @memberof AppPageConfig
   */
  filePath: string;
  /**
   * Content of the config file.
   *
   * @type {({
   *     cmsSettings: unknown;
   *     currentThemeId: string;
   *     headMarkup: string | null;
   *     id: string;
   *     isRelaxedCSPLevel: boolean;
   *     label: string;
   *     templateName: string;
   *     type: 'appPage';
   *   })}
   * @memberof AppPageConfig
   * @see https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_experiencebundle.htm
   */
  content: {
    cmsSettings: unknown;
    currentThemeId: string;
    headMarkup: string | null;
    id: string;
    isRelaxedCSPLevel: boolean;
    label: string;
    templateName: string;
    type: 'appPage';
  };
}
