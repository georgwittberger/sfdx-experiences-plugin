/**
 * Site configuration in the ExperienceBundle
 *
 * @see https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_experiencebundle.htm
 */
export default interface SiteConfig {
  forgotPasswordRouteId: string;
  isAvailableToGuests: boolean;
  isFilteredComponentsView: boolean;
  isProgressiveRenderingEnabled: boolean;
  loginAppPageId: string;
  mainAppPageId: string;
  preferredDomain: string;
  selfRegistrationRouteId: string;
  type: 'site';
}
