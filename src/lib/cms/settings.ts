import { unstable_cache } from 'next/cache';
import type { UponAIMenuLink } from '@/lib/uponai-pages';
import { defaultSiteSettings, type SiteSettings } from '@/lib/site-settings';
import { CMS_TAG_SETTINGS, sanityQuery } from '@/lib/cms/sanity';

// Navigation, footer links and office list from the Sanity siteSettings
// singleton, falling back per field to the in-repo menus. These render on
// every page, so an empty or missing field must never blank out the nav.

export { defaultSiteSettings, type SiteSettings } from '@/lib/site-settings';

// A menu that came back as an empty array is treated as absent: an editor
// clearing every row should not silently remove a whole nav dropdown.
const menuOr = (value: UponAIMenuLink[] | undefined, fallback: UponAIMenuLink[]) =>
  value?.length ? value : fallback;

export const getSiteSettings = unstable_cache(
  async (): Promise<SiteSettings> => {
    const doc = await sanityQuery<Partial<SiteSettings>>(
      `*[_id == "siteSettings"][0]{
        servicesMenu[]{label, href, external},
        industriesMenu[]{label, href, external},
        useCasesMenu[]{label, href, external},
        resourcesMenu[]{label, href, external},
        footerInfo[]{label, href, external},
        officeLocations
      }`
    );

    return {
      servicesMenu: menuOr(doc?.servicesMenu, defaultSiteSettings.servicesMenu),
      industriesMenu: menuOr(doc?.industriesMenu, defaultSiteSettings.industriesMenu),
      useCasesMenu: menuOr(doc?.useCasesMenu, defaultSiteSettings.useCasesMenu),
      resourcesMenu: menuOr(doc?.resourcesMenu, defaultSiteSettings.resourcesMenu),
      footerInfo: menuOr(doc?.footerInfo, defaultSiteSettings.footerInfo),
      officeLocations: doc?.officeLocations?.length
        ? doc.officeLocations
        : defaultSiteSettings.officeLocations,
    };
  },
  ['cms-settings'],
  { tags: [CMS_TAG_SETTINGS] }
);
