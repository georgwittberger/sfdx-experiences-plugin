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
