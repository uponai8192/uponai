import { unstable_cache } from 'next/cache';
import { defaultHomePageContent, type HomePageContent } from '@/lib/home-content';
import { CMS_TAG_HOME, sanityQuery } from '@/lib/cms/sanity';

// Homepage copy from the Sanity homePage singleton. Falls back to the in-repo
// defaults section by section, so an unconfigured environment or a partially
// filled document can never render an empty homepage.
export const getHomePageContent = unstable_cache(
  async (): Promise<HomePageContent> => {
    // Customer story avatars are uploaded assets, so they are resolved to CDN
    // URLs here; everything else on the document is already plain copy.
    const doc = await sanityQuery<Partial<HomePageContent>>(
      `*[_id == "homePage"][0]{
        ...,
        customerStories{
          ...,
          stories[]{..., "avatarUrl": avatar.asset->url}
        }
      }`
    );
    return {
      hero: doc?.hero ?? defaultHomePageContent.hero,
      socialProof: doc?.socialProof ?? defaultHomePageContent.socialProof,
      oldWay: doc?.oldWay ?? defaultHomePageContent.oldWay,
      intro: doc?.intro ?? defaultHomePageContent.intro,
      capabilities: doc?.capabilities ?? defaultHomePageContent.capabilities,
      allFeatures: doc?.allFeatures ?? defaultHomePageContent.allFeatures,
      howItWorks: doc?.howItWorks ?? defaultHomePageContent.howItWorks,
      customerStories: doc?.customerStories ?? defaultHomePageContent.customerStories,
      finalCta: doc?.finalCta ?? defaultHomePageContent.finalCta,
    };
  },
  ['cms-home'],
  { tags: [CMS_TAG_HOME] }
);
