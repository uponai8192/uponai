import {
  uponaiFooterInfo,
  uponaiIndustriesMenu,
  uponaiOfficeLocations,
  uponaiResourcesMenu,
  uponaiServicesMenu,
  uponaiUseCasesMenu,
  type UponAIMenuLink,
} from '@/lib/uponai-pages';

// Client-safe half of the site settings: the shape and the in-repo defaults.
// The Sanity fetch lives in src/lib/cms/settings.ts, which pulls in next/cache
// and therefore cannot be imported by a client component such as Nav.

export type SiteSettings = {
  servicesMenu: UponAIMenuLink[];
  industriesMenu: UponAIMenuLink[];
  useCasesMenu: UponAIMenuLink[];
  resourcesMenu: UponAIMenuLink[];
  footerInfo: UponAIMenuLink[];
  officeLocations: string[];
};

export const defaultSiteSettings: SiteSettings = {
  servicesMenu: uponaiServicesMenu,
  industriesMenu: uponaiIndustriesMenu,
  useCasesMenu: uponaiUseCasesMenu,
  resourcesMenu: uponaiResourcesMenu,
  footerInfo: uponaiFooterInfo,
  officeLocations: uponaiOfficeLocations,
};
