/**
 * Site configuration in the ExperienceBundle
 */
export default interface SiteConfig {
  /**
   * Path of the config file.
   *
   * @type {string}
   * @memberof SiteConfig
   */
  filePath: string;
  /**
   * Content of the config file.
   *
   * @type {{
   *     forgotPasswordRouteId: string;
   *     isAvailableToGuests: boolean;
   *     isFilteredComponentsView: boolean;
   *     isProgressiveRenderingEnabled: boolean;
   *     loginAppPageId: string;
   *     mainAppPageId: string;
   *     preferredDomain: string;
   *     selfRegistrationRouteId: string;
   *     type: 'site';
   *   }}
   * @memberof SiteConfig
   * @see https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_experiencebundle.htm
   */
  content: {
    forgotPasswordRouteId: string;
    isAvailableToGuests: boolean;
    isFilteredComponentsView: boolean;
    isProgressiveRenderingEnabled: boolean;
    loginAppPageId: string;
    mainAppPageId: string;
    preferredDomain: string;
    selfRegistrationRouteId: string;
    type: 'site';
  };
}
