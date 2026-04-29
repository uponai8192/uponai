import type { City } from '@/lib/data';
import { cities, formatCityState } from '@/lib/data';
import { brandPhotos } from '@/lib/brand-photos';
import { getUponAIPage } from '@/lib/uponai-pages';

type VoiceAIStat = {
  value: string;
  label: string;
};

type VoiceAISection = {
  title: string;
  body: string;
};

type VoiceAIFAQ = {
  question: string;
  answer: string;
};

type VoiceAICityPageOverride = {
  heroTitle: string;
  heroDescription: string;
  marketHeadline: string;
  marketBody: string;
  regionTitle: string;
  regionBody: string;
  localUseCases: string[];
  customHighlights: VoiceAISection[];
  ctaHeading?: string;
  ctaSubheading?: string;
};

type VoiceAIIntegrations = {
  title: string;
  body: string;
  examples: string[];
  href?: string;
  hrefLabel?: string;
};

export type VoiceAIIndustryPage = {
  slug: string;
  label: string;
  eyebrow: string;
  heroTitle: string;
  heroDescription: string;
  image: string;
  imageAlt: string;
  stats: VoiceAIStat[];
  workflowMoments: VoiceAISection[];
  capabilityCards: VoiceAISection[];
  outcomes: string[];
  faqs: VoiceAIFAQ[];
  localUseCaseTemplates: string[];
  cityLead: string;
  citySupport: string;
  ctaHeading: string;
  ctaSubheading: string;
  integrations?: VoiceAIIntegrations;
};

export type VoiceAILegacyContent = {
  highlights: string[];
  sections: VoiceAISection[];
};

export const promotedVoiceAICityRoutes = [
  '/voice-ai-for-healthcare-page/phoenix-az',
  '/voice-ai-for-healthcare-page/charlotte-nc',
  '/voice-ai-for-healthcare-page/boston-ma',
  '/voice-ai-for-healthcare-page/baltimore-md',
  '/voice-ai-for-healthcare-page/raleigh-nc',
  '/voice-ai-for-healthcare-page/washington-dc',
  '/voice-ai-for-healthcare-page/newark-nj',
  '/voice-ai-for-healthcare-page/pittsburgh-pa',
  '/voice-ai-for-healthcare-page/virginia-beach-va',
  '/voice-ai-for-healthcare-page/memphis-tn',
  '/voice-ai-for-healthcare-page/cleveland-oh',
  '/voice-ai-for-healthcare-page/portland-or',
  '/voice-ai-for-healthcare-page/minneapolis-mn',
  '/voice-ai-for-healthcare-page/san-jose-ca',
  '/voice-ai-for-healthcare-page/las-vegas-nv',
  '/voice-ai-for-insurance-page/denver-co',
  '/voice-ai-for-insurance-page/detroit-mi',
  '/voice-ai-for-home-services-page/san-antonio-tx',
  '/voice-ai-for-home-services-page/tampa-fl',
  '/voice-ai-real-estate/seattle-wa',
  '/voice-ai-real-estate/austin-tx',
  '/voice-ai-for-dental-offices/san-diego-ca',
  '/voice-ai-for-legal-services/nashville-tn',
  '/voice-ai-veterinary-clinics/jacksonville-fl',
  '/voice-ai-for-healthcare-page/sacramento-ca',
  '/voice-ai-for-healthcare-page/columbus-oh',
  '/voice-ai-for-healthcare-page/richmond-va',
  '/voice-ai-for-insurance-page/kansas-city-mo',
  '/voice-ai-for-insurance-page/omaha-ne',
  '/voice-ai-for-insurance-page/st-louis-mo',
  '/voice-ai-for-home-services-page/fresno-ca',
  '/voice-ai-for-home-services-page/orlando-fl',
  '/voice-ai-for-home-services-page/cincinnati-oh',
  '/voice-ai-real-estate/miami-fl',
  '/voice-ai-real-estate/salt-lake-city-ut',
  '/voice-ai-for-dental-offices/phoenix-az',
  '/voice-ai-for-dental-offices/charlotte-nc',
  '/voice-ai-for-legal-services/tampa-fl',
  '/voice-ai-for-legal-services/birmingham-al',
  '/voice-ai-veterinary-clinics/milwaukee-wi',
  '/voice-ai-veterinary-clinics/new-orleans-la',
  '/voice-ai-for-telecommunication/indianapolis-in',
  '/voice-ai-for-healthcare-page/louisville-ky',
  '/voice-ai-for-healthcare-page/kansas-city-mo',
  '/voice-ai-for-insurance-page/sacramento-ca',
  '/voice-ai-for-insurance-page/richmond-va',
  '/voice-ai-for-home-services-page/miami-fl',
  '/voice-ai-for-home-services-page/phoenix-az',
  '/voice-ai-real-estate/nashville-tn',
  '/voice-ai-real-estate/orlando-fl',
  '/voice-ai-for-dental-offices/tampa-fl',
  '/voice-ai-for-dental-offices/sacramento-ca',
  '/voice-ai-for-legal-services/columbus-oh',
  '/voice-ai-for-legal-services/salt-lake-city-ut',
  '/voice-ai-veterinary-clinics/kansas-city-mo',
  '/voice-ai-veterinary-clinics/birmingham-al',
  '/voice-ai-for-telecommunication/new-orleans-la',
  '/voice-ai-for-telecommunication/louisville-ky',
  '/voice-ai-for-insurance-page/cincinnati-oh',
  '/voice-ai-for-home-services-page/charlotte-nc',
] as const;

const seoFocusCitySlugs = [
  'new-york-ny',
  'philadelphia-pa',
  'allentown-pa',
  'atlanta-ga',
  'miami-fl',
  'orlando-fl',
  'west-palm-beach-fl',
  'houston-tx',
  'dallas-tx',
  'chicago-il',
  'san-francisco-ca',
  'los-angeles-ca',
] as const;

const voiceAICityPageOverrides: Record<string, VoiceAICityPageOverride> = {
  'voice-ai-for-healthcare-page/phoenix-az': {
    heroTitle: 'Voice AI for Phoenix healthcare teams that need steadier patient access.',
    heroDescription:
      'Phoenix practices often cover broad service areas and heavy phone demand across multiple neighborhoods. This page focuses on faster scheduling, cleaner front-desk relief, and stronger after-hours patient response for Valley clinics.',
    marketHeadline: 'Wide service areas create more appointment and routing pressure.',
    marketBody:
      'Healthcare teams in Phoenix often balance large coverage footprints, high inbound appointment demand, and a front desk that cannot absorb every repetitive call without delays.',
    regionTitle: 'Desert-metro healthcare teams need consistent first-contact handling.',
    regionBody:
      'In Phoenix, voice AI is valuable when patient access depends on answering quickly, moving callers into the right scheduling path, and reducing voicemail backlogs across a busy metro.',
    localUseCases: [
      'Handle new-patient scheduling calls across Phoenix without forcing every request into a manual callback queue.',
      'Answer recurring insurance, prep, and office-info questions before they interrupt live front-desk staff.',
      'Keep after-hours appointment demand active for Phoenix practices that do not want late calls falling into voicemail.',
      'Route urgent or specialty-specific calls with cleaner intake context before staff step in.',
    ],
    customHighlights: [
      {
        title: 'Metro Scheduling Relief',
        body: 'Phoenix clinics benefit when repetitive scheduling and rescheduling calls stop competing with in-office patient needs.',
      },
      {
        title: 'After-Hours Patient Capture',
        body: 'A stronger first response helps practices avoid losing next-day appointments when patients call outside normal staffing windows.',
      },
      {
        title: 'Multi-Location Consistency',
        body: 'Voice AI gives teams a more dependable intake flow when callers need the right office, provider type, or next step quickly.',
      },
    ],
  },
  'voice-ai-for-healthcare-page/charlotte-nc': {
    heroTitle: 'Voice AI for Charlotte healthcare teams focused on faster front-desk response.',
    heroDescription:
      'Charlotte healthcare organizations need a cleaner way to handle appointment demand, patient FAQs, and live routing without adding more manual call pressure to the front desk.',
    marketHeadline: 'Growing markets punish slow callback workflows.',
    marketBody:
      'Charlotte practices win more often when patients hear a clear next step immediately instead of waiting on a voicemail return from a busy office team.',
    regionTitle: 'Fast-growing Southeastern markets need steadier phone coverage.',
    regionBody:
      'For Charlotte healthcare teams, voice AI helps standardize how patient calls are answered, qualified, and routed even when demand is uneven across the day.',
    localUseCases: [
      'Capture appointment calls for Charlotte patients before they abandon the call or try another provider.',
      'Reduce repetitive front-desk interruptions tied to provider availability, office hours, and routine prep questions.',
      'Support after-hours patient communication with a more useful first response than generic voicemail.',
      'Gather intake context before escalations so live staff enter the conversation with more clarity.',
    ],
    customHighlights: [
      {
        title: 'Quicker Access',
        body: 'Charlotte patients expect a fast answer, especially when they are comparing providers or trying to book quickly.',
      },
      {
        title: 'Less Call Congestion',
        body: 'Voice AI helps clinics absorb repeat questions and repetitive scheduling calls without turning the front desk into a bottleneck.',
      },
      {
        title: 'More Structured Handoffs',
        body: 'Urgent or higher-touch conversations can still move to staff, but with more useful patient context already collected.',
      },
    ],
  },
  'voice-ai-for-healthcare-page/boston-ma': {
    heroTitle: 'Voice AI for Boston healthcare teams that need cleaner patient routing.',
    heroDescription:
      'Boston-area healthcare calls move fast and often involve more routing, scheduling, and repeat office questions than a small live team can manage cleanly during peak hours.',
    marketHeadline: 'Dense healthcare markets reward the offices that answer clearly.',
    marketBody:
      'Boston practices compete in a market where patients expect a polished first response, better scheduling coverage, and fewer dead ends when they call in.',
    regionTitle: 'Northeast healthcare callers expect structure immediately.',
    regionBody:
      'For Boston teams, voice AI helps create a more organized patient-access experience by reducing wait time, routing confusion, and repeated front-desk interruptions.',
    localUseCases: [
      'Handle appointment and office-info calls for Boston patients with a more structured first-contact workflow.',
      'Reduce front-desk interruptions caused by repetitive provider, prep, and scheduling questions.',
      'Support multi-provider routing with cleaner call qualification before a staff handoff.',
      'Keep after-hours patient access active without treating every missed call as tomorrow’s problem.',
    ],
    customHighlights: [
      {
        title: 'Patient Access Clarity',
        body: 'In Boston, a strong first response helps reduce friction for patients trying to reach the right office, provider, or scheduling path.',
      },
      {
        title: 'Lower Front-Desk Load',
        body: 'Automating repeat questions gives live staff more room to focus on active patients and higher-value calls.',
      },
      {
        title: 'Better Call Organization',
        body: 'Voice AI helps practices move away from ad hoc phone handling toward a more consistent patient-access workflow.',
      },
    ],
  },
  'voice-ai-for-healthcare-page/baltimore-md': {
    heroTitle: 'Voice AI for Baltimore healthcare teams that need cleaner patient access.',
    heroDescription:
      'Baltimore healthcare organizations can use voice AI to handle appointment demand, office questions, and after-hours patient communication without turning the front desk into the bottleneck.',
    marketHeadline: 'Dense provider competition makes first-call clarity matter.',
    marketBody:
      'Baltimore practices usually need a faster, more organized first response because patients expect the right routing path immediately and do not wait long on manual callbacks.',
    regionTitle: 'Mid-Atlantic healthcare teams benefit from steadier phone coverage.',
    regionBody:
      'For Baltimore clinics, voice AI helps standardize patient access by reducing voicemail dependence, smoothing scheduling intake, and keeping live staff focused on higher-touch conversations.',
    localUseCases: [
      'Capture Baltimore appointment calls before they turn into callback backlog.',
      'Answer routine provider, office, and prep questions without interrupting staff constantly.',
      'Support after-hours patient communication with a more useful first-contact workflow.',
      'Gather intake context before routing more urgent or specialty-specific calls to staff.',
    ],
    customHighlights: [
      {
        title: 'Stronger Patient Access',
        body: 'Baltimore teams can reduce patient friction when scheduling and office-info calls are answered with a clearer first step.',
      },
      {
        title: 'Front-Desk Relief',
        body: 'Voice AI helps practices absorb repeat questions without forcing the live team to restart the same call flow all day.',
      },
      {
        title: 'Better Call Routing',
        body: 'Patients get to the right workflow faster when intake is structured before the handoff happens.',
      },
    ],
  },
  'voice-ai-for-healthcare-page/raleigh-nc': {
    heroTitle: 'Voice AI for Raleigh healthcare teams that need faster front-desk response.',
    heroDescription:
      'Raleigh healthcare teams can use voice AI to manage scheduling calls, patient FAQs, and after-hours demand while protecting live staff time during busy clinic hours.',
    marketHeadline: 'Growing healthcare markets expose slow callback workflows fast.',
    marketBody:
      'Raleigh practices often need a better first-contact layer because inbound appointment demand and routine patient questions can overwhelm a small front-desk team quickly.',
    regionTitle: 'Fast-growing Southeast markets need better patient-call consistency.',
    regionBody:
      'For Raleigh healthcare teams, voice AI helps create a steadier access experience by answering faster, qualifying better, and keeping appointment demand active outside standard staffing windows.',
    localUseCases: [
      'Handle Raleigh scheduling calls before they disappear into voicemail or delayed callback.',
      'Answer recurring patient questions around office hours, providers, prep, and insurance basics.',
      'Support after-hours appointment capture when the front desk is offline.',
      'Collect intake details before escalations so live staff step into the call with context.',
    ],
    customHighlights: [
      {
        title: 'Quicker Scheduling Capture',
        body: 'Raleigh practices can keep more appointment demand alive when callers get an immediate next step.',
      },
      {
        title: 'Lower Call Friction',
        body: 'Voice AI reduces the repetitive interruptions that make front-desk workflows harder to manage.',
      },
      {
        title: 'Better After-Hours Coverage',
        body: 'Patient access stays active even when staff are not available to answer every evening call live.',
      },
    ],
  },
  'voice-ai-for-healthcare-page/washington-dc': {
    heroTitle: 'Voice AI for Washington healthcare teams that need a more polished first response.',
    heroDescription:
      'Washington-area healthcare calls often demand cleaner routing, better scheduling coverage, and fewer dead ends than a purely manual front desk can provide during peak periods.',
    marketHeadline: 'High-expectation markets punish confusing phone workflows.',
    marketBody:
      'In Washington, patients usually expect fast answers, organized routing, and clearer appointment handling because there are many provider options and little tolerance for phone friction.',
    regionTitle: 'Capital-region healthcare calls need stronger structure.',
    regionBody:
      'For Washington teams, voice AI helps reduce routing confusion, improve patient access, and preserve staff capacity by keeping the first-contact workflow more organized.',
    localUseCases: [
      'Handle Washington appointment and office-info calls with a cleaner first-contact workflow.',
      'Reduce front-desk pressure caused by repetitive routing, provider, and prep questions.',
      'Support after-hours patient access without defaulting every missed call to voicemail.',
      'Gather intake context before transferring more urgent or complex patient conversations.',
    ],
    customHighlights: [
      {
        title: 'Polished First Contact',
        body: 'Washington practices benefit when the first phone interaction feels clear, organized, and immediately helpful.',
      },
      {
        title: 'Less Routing Confusion',
        body: 'Voice AI helps move patients into the right provider or scheduling path without unnecessary manual transfer steps.',
      },
      {
        title: 'More Protected Staff Time',
        body: 'Automating repetitive phone tasks gives live teams more room for the conversations that need human judgment.',
      },
    ],
  },
  'voice-ai-for-healthcare-page/newark-nj': {
    heroTitle: 'Voice AI for Newark healthcare teams that need better patient-call coverage.',
    heroDescription:
      'Newark healthcare organizations can use voice AI to capture scheduling demand, answer routine patient questions, and create cleaner front-desk workflows across busy service hours.',
    marketHeadline: 'Busy urban markets need more dependable phone handling.',
    marketBody:
      'Newark practices often need a stronger first-contact layer because appointment requests, office questions, and repeat patient calls can pile up quickly during live clinic hours.',
    regionTitle: 'Northeast callers expect a fast and structured answer.',
    regionBody:
      'For Newark teams, voice AI helps reduce missed opportunities by keeping patient access active, reducing voicemail dependence, and improving how routine calls get triaged.',
    localUseCases: [
      'Capture Newark appointment requests before they turn into manual callback cleanup.',
      'Answer routine office, provider, and insurance questions with a more consistent first response.',
      'Support after-hours patient communication without making the next morning harder for staff.',
      'Route higher-touch calls with intake context before the live handoff happens.',
    ],
    customHighlights: [
      {
        title: 'More Reliable Phone Coverage',
        body: 'Newark practices can keep scheduling and patient access moving even when the front desk is already overloaded.',
      },
      {
        title: 'Reduced Voicemail Dependence',
        body: 'Voice AI helps keep the first interaction active instead of forcing routine patient demand into a callback queue.',
      },
      {
        title: 'Cleaner Front-Desk Flow',
        body: 'Routine calls get absorbed earlier so live staff can focus on in-office and higher-touch work.',
      },
    ],
  },
  'voice-ai-for-healthcare-page/pittsburgh-pa': {
    heroTitle: 'Voice AI for Pittsburgh healthcare teams that need steadier patient access.',
    heroDescription:
      'Pittsburgh healthcare calls often revolve around scheduling, routing, office questions, and repeat patient needs that can overwhelm live staff when everything starts on the same front-desk line.',
    marketHeadline: 'Consistent phone handling matters in regional healthcare markets.',
    marketBody:
      'Pittsburgh practices usually benefit from a cleaner first-contact workflow because missed calls and slow callbacks can quickly turn into lost appointments or patient frustration.',
    regionTitle: 'Regional healthcare markets reward dependable first response.',
    regionBody:
      'For Pittsburgh teams, voice AI helps create more dependable scheduling coverage, stronger intake discipline, and less pressure on front-desk staff during busy periods.',
    localUseCases: [
      'Handle Pittsburgh appointment demand before it turns into missed-call follow-up.',
      'Answer common office, provider, and prep questions without interrupting staff constantly.',
      'Support after-hours patient access with a more useful first-contact experience.',
      'Collect intake context before escalating more complex patient needs to live staff.',
    ],
    customHighlights: [
      {
        title: 'Dependable Scheduling Intake',
        body: 'Pittsburgh practices can keep more patient demand moving when the first response is immediate and structured.',
      },
      {
        title: 'Less Front-Desk Drag',
        body: 'Voice AI reduces repetitive interruptions that make live staff less efficient during active clinic hours.',
      },
      {
        title: 'Stronger Patient Experience',
        body: 'A clearer first response helps practices sound more organized and easier to reach.',
      },
    ],
  },
  'voice-ai-for-healthcare-page/virginia-beach-va': {
    heroTitle: 'Voice AI for Virginia Beach healthcare teams that need better call consistency.',
    heroDescription:
      'Virginia Beach healthcare organizations can use voice AI to support patient scheduling, routine office questions, and after-hours access without overwhelming the live front desk.',
    marketHeadline: 'Regional service footprints create more patient-call complexity.',
    marketBody:
      'Virginia Beach practices often support calls from nearby communities too, which makes consistent intake, routing, and scheduling coverage more important on the first interaction.',
    regionTitle: 'Coastal regional markets need stronger phone coverage.',
    regionBody:
      'For Virginia Beach healthcare teams, voice AI helps standardize how patient calls are answered, triaged, and routed so the live team does not carry every repetitive phone step alone.',
    localUseCases: [
      'Capture Virginia Beach scheduling calls before they turn into next-day callback work.',
      'Answer routine patient questions without forcing office staff to restart the same workflow repeatedly.',
      'Support after-hours access for patients who call outside normal clinic coverage.',
      'Collect first-layer intake context before routing more urgent conversations to live staff.',
    ],
    customHighlights: [
      {
        title: 'Regional Call Coverage',
        body: 'Virginia Beach teams benefit when one voice workflow can support both local and nearby-area patient demand more consistently.',
      },
      {
        title: 'Cleaner First-Touch Intake',
        body: 'Voice AI helps reduce confusion by giving patients a more structured first-contact experience.',
      },
      {
        title: 'After-Hours Relief',
        body: 'Practices keep patient access active without treating every missed call as tomorrow’s manual cleanup.',
      },
    ],
  },
  'voice-ai-for-healthcare-page/memphis-tn': {
    heroTitle: 'Voice AI for Memphis healthcare teams that need stronger front-desk relief.',
    heroDescription:
      'Memphis healthcare practices can use voice AI to manage scheduling requests, answer routine patient questions, and keep after-hours communication active without adding more phone pressure to staff.',
    marketHeadline: 'Busy clinics lose ground when routine calls overwhelm the desk.',
    marketBody:
      'Memphis teams often need a better first-contact workflow because repetitive scheduling and office-info calls can distract live staff from patients and higher-value work.',
    regionTitle: 'Southeastern clinics need a more dependable patient-access layer.',
    regionBody:
      'For Memphis healthcare organizations, voice AI helps create steadier scheduling intake, better routing, and less voicemail dependence across the day.',
    localUseCases: [
      'Handle Memphis scheduling calls before they stack into a callback queue.',
      'Answer routine office, prep, and provider questions without constant live interruption.',
      'Support after-hours patient communication when the front desk is offline.',
      'Gather intake context before routing more urgent or specialty-specific patient calls.',
    ],
    customHighlights: [
      {
        title: 'Better Front-Desk Relief',
        body: 'Voice AI helps Memphis teams absorb repetitive calls so live staff can focus on in-clinic priorities.',
      },
      {
        title: 'Less Missed Appointment Demand',
        body: 'A stronger first response helps practices protect patient scheduling opportunities that would otherwise drift into voicemail.',
      },
      {
        title: 'More Useful Call Handoffs',
        body: 'Escalations reach staff with more context already captured, which reduces repeat questioning and call friction.',
      },
    ],
  },
  'voice-ai-for-healthcare-page/cleveland-oh': {
    heroTitle: 'Voice AI for Cleveland healthcare teams that need a steadier first response.',
    heroDescription:
      'Cleveland healthcare teams can use voice AI to improve appointment capture, answer routine patient questions, and route calls more cleanly without forcing the front desk to carry every repetitive interaction.',
    marketHeadline: 'Regional healthcare demand still punishes slow callbacks.',
    marketBody:
      'Cleveland practices often need a more dependable first-contact path because missed calls and unstructured intake can quickly turn into lost appointments or more front-desk backlog.',
    regionTitle: 'Midwest healthcare teams benefit from dependable phone structure.',
    regionBody:
      'For Cleveland teams, voice AI helps deliver a clearer first response by standardizing how scheduling, office questions, and routine triage get handled.',
    localUseCases: [
      'Capture Cleveland appointment requests before they drop into voicemail or delayed callback.',
      'Answer common patient questions around office info, providers, prep, and scheduling.',
      'Support after-hours patient access with a more responsive first-contact workflow.',
      'Gather intake details before routing higher-touch or urgent calls to live staff.',
    ],
    customHighlights: [
      {
        title: 'More Dependable Scheduling Intake',
        body: 'Cleveland practices can keep appointment demand moving when the first response is active instead of delayed.',
      },
      {
        title: 'Reduced Front-Desk Repetition',
        body: 'Voice AI takes repetitive questions off the live team so staff time is used more effectively.',
      },
      {
        title: 'Cleaner Triage',
        body: 'Patients get a more organized path into the right office workflow before a staff handoff is needed.',
      },
    ],
  },
  'voice-ai-for-healthcare-page/portland-or': {
    heroTitle: 'Voice AI for Portland healthcare teams that need better patient-call flow.',
    heroDescription:
      'Portland healthcare organizations can use voice AI to handle scheduling demand, answer recurring patient questions, and keep after-hours communication active without relying on voicemail-first workflows.',
    marketHeadline: 'Phone expectations rise when patients are used to digital speed.',
    marketBody:
      'Portland practices often need a better first-contact layer because patients expect fast, clear answers on the phone just like they do online.',
    regionTitle: 'West Coast markets expect a smoother patient-access experience.',
    regionBody:
      'For Portland teams, voice AI helps tighten patient access by improving response speed, reducing routing friction, and protecting front-desk capacity during busy hours.',
    localUseCases: [
      'Capture Portland appointment calls before they become next-day callback work.',
      'Answer routine office, provider, and prep questions without tying up live staff.',
      'Support after-hours patient access without defaulting every missed call into voicemail.',
      'Collect intake context before transferring more urgent or complex conversations.',
    ],
    customHighlights: [
      {
        title: 'Smoother Patient Access',
        body: 'Portland practices can give callers a cleaner first-contact experience when routine phone work is structured earlier.',
      },
      {
        title: 'Less Call Friction',
        body: 'Voice AI reduces repeated interruptions that make front-desk work slower and less consistent.',
      },
      {
        title: 'Better After-Hours Coverage',
        body: 'Patient communication stays active outside standard staffing windows instead of stalling at voicemail.',
      },
    ],
  },
  'voice-ai-for-healthcare-page/minneapolis-mn': {
    heroTitle: 'Voice AI for Minneapolis healthcare teams that need cleaner patient routing.',
    heroDescription:
      'Minneapolis healthcare teams can use voice AI to support scheduling, routine office questions, and better patient-call triage while keeping live front-desk staff focused on higher-touch work.',
    marketHeadline: 'Organized phone intake creates a better patient experience.',
    marketBody:
      'Minneapolis practices often benefit from a more structured first-contact workflow because repetitive patient calls can quickly crowd out live staff capacity.',
    regionTitle: 'Upper Midwest healthcare teams win with dependable call handling.',
    regionBody:
      'For Minneapolis teams, voice AI helps standardize how scheduling and office questions are answered so patients hear a clearer next step and staff face less manual phone repetition.',
    localUseCases: [
      'Handle Minneapolis scheduling demand before it becomes a callback bottleneck.',
      'Answer routine patient questions around office info, providers, prep, and availability.',
      'Support after-hours patient communication with a more responsive intake layer.',
      'Collect first-contact context before routing urgent or specialty-specific conversations.',
    ],
    customHighlights: [
      {
        title: 'Clearer Patient Routing',
        body: 'Minneapolis practices can improve the first response by moving patients into the right workflow sooner.',
      },
      {
        title: 'More Protected Staff Time',
        body: 'Voice AI removes repetitive front-desk phone work that otherwise competes with live patient needs.',
      },
      {
        title: 'Steadier Scheduling Flow',
        body: 'Appointment demand is easier to keep organized when the first-contact process is consistent.',
      },
    ],
  },
  'voice-ai-for-healthcare-page/san-jose-ca': {
    heroTitle: 'Voice AI for San Jose healthcare teams that need faster patient access.',
    heroDescription:
      'San Jose healthcare teams can use voice AI to answer scheduling calls, support patient FAQs, and create a more polished first-contact experience without turning the front desk into a constant bottleneck.',
    marketHeadline: 'High-expectation patients do not wait for disorganized call handling.',
    marketBody:
      'In San Jose, a slow or unclear first response can create unnecessary patient drop-off because callers expect a faster, more structured path into scheduling and office support.',
    regionTitle: 'Bay Area healthcare calls need speed and clarity.',
    regionBody:
      'For San Jose teams, voice AI helps create a stronger patient-access layer by reducing voicemail dependence, improving call triage, and keeping routine front-desk demand under control.',
    localUseCases: [
      'Capture San Jose appointment requests before they turn into lost demand or delayed callbacks.',
      'Answer recurring office, provider, prep, and insurance questions without constant live interruption.',
      'Support after-hours patient communication with a more useful first-contact workflow.',
      'Gather intake context before routing higher-touch patient calls to live staff.',
    ],
    customHighlights: [
      {
        title: 'Faster First Response',
        body: 'San Jose practices benefit when patient access feels immediate rather than delayed by a crowded front desk.',
      },
      {
        title: 'Less Voicemail Dependence',
        body: 'Voice AI keeps the call experience active instead of relying on manual callback cleanup for routine demand.',
      },
      {
        title: 'More Polished Patient Access',
        body: 'A better first-contact workflow helps practices sound more responsive in a high-expectation market.',
      },
    ],
  },
  'voice-ai-for-healthcare-page/las-vegas-nv': {
    heroTitle: 'Voice AI for Las Vegas healthcare teams that need more reliable call coverage.',
    heroDescription:
      'Las Vegas healthcare organizations can use voice AI to support appointment scheduling, answer routine patient questions, and keep after-hours demand active without relying on voicemail-first workflows.',
    marketHeadline: 'High-volume metros expose weak phone workflows quickly.',
    marketBody:
      'Las Vegas practices often need stronger first-contact handling because heavy inbound volume and after-hours demand can overwhelm a small live staff fast.',
    regionTitle: 'High-traffic service markets need steadier patient-call handling.',
    regionBody:
      'For Las Vegas healthcare teams, voice AI helps protect patient access by answering faster, reducing routing confusion, and keeping routine demand from piling onto the front desk.',
    localUseCases: [
      'Capture Las Vegas appointment demand before it turns into voicemail or missed-call follow-up.',
      'Answer routine office, provider, prep, and insurance questions without slowing down live staff.',
      'Support after-hours patient communication with a more consistent first-contact workflow.',
      'Collect intake details before routing urgent or more complex conversations to staff.',
    ],
    customHighlights: [
      {
        title: 'More Reliable Call Coverage',
        body: 'Las Vegas practices can protect patient access better when the first response stays active through higher call volume.',
      },
      {
        title: 'Stronger Front-Desk Support',
        body: 'Voice AI absorbs repetitive demand so staff can stay focused on active patients and live operational needs.',
      },
      {
        title: 'Better After-Hours Capture',
        body: 'Appointment and office-question demand stays in motion even when the clinic is no longer fully staffed.',
      },
    ],
  },
  'voice-ai-for-insurance-page/denver-co': {
    heroTitle: 'Voice AI for Denver insurance teams that need faster lead intake.',
    heroDescription:
      'Denver insurance offices can use voice AI to answer quote inquiries, route service calls, and qualify new conversations before a producer or account manager takes over.',
    marketHeadline: 'Lead response speed matters when inbound demand is uneven.',
    marketBody:
      'Insurance teams in Denver often need a more consistent intake workflow so quote requests, renewals, and policy-service calls do not sit in a callback queue too long.',
    regionTitle: 'Mountain-region teams benefit from steadier inbound coverage.',
    regionBody:
      'In Denver, voice AI gives insurance teams a cleaner way to capture lead intent, route account questions, and protect live staff time without missing first-contact opportunities.',
    localUseCases: [
      'Capture quote requests for Denver agencies before a prospect moves to the next provider.',
      'Screen policy-service calls and route them into the right service path instead of a generic front desk queue.',
      'Collect first-contact details for commercial or personal lines conversations before a producer joins.',
      'Keep renewal and inbound service demand moving even when licensed staff are tied up on live calls.',
    ],
    customHighlights: [
      {
        title: 'Quote Intake Discipline',
        body: 'Denver agencies can respond faster when voice AI captures the first layer of quote information before a producer steps in.',
      },
      {
        title: 'Cleaner Service Routing',
        body: 'Policyholders get a clearer path for billing, service, and account questions without overwhelming a single inbound line.',
      },
      {
        title: 'Protected Producer Time',
        body: 'Live sales capacity stays focused on the opportunities that need human judgment rather than every first-contact screening step.',
      },
    ],
  },
  'voice-ai-for-insurance-page/detroit-mi': {
    heroTitle: 'Voice AI for Detroit insurance teams that need better call qualification.',
    heroDescription:
      'Detroit agencies and broker teams can use voice AI to qualify quote demand, capture account context, and route policy-service calls with more consistency.',
    marketHeadline: 'Insurance teams lose ground when inbound calls start unstructured.',
    marketBody:
      'In Detroit, a slower or less organized first response can turn quote demand into missed opportunities and create unnecessary friction for existing policyholders.',
    regionTitle: 'Midwest markets reward dependable inbound handling.',
    regionBody:
      'Detroit insurance teams often win by sounding organized, routing calls correctly, and moving new or existing customers into the right workflow on the first interaction.',
    localUseCases: [
      'Qualify Detroit quote calls before they hit the live producer queue.',
      'Separate account-service questions from new-business demand with cleaner initial routing.',
      'Capture renewal and policy-change details before staff take over the conversation.',
      'Reduce missed opportunities created by voicemail, overflow, or inconsistent first-contact handling.',
    ],
    customHighlights: [
      {
        title: 'More Organized Intake',
        body: 'Voice AI helps Detroit insurance teams standardize what gets captured on the first call instead of relying on ad hoc phone notes.',
      },
      {
        title: 'Better Policy-Service Paths',
        body: 'Existing customers can reach the right workflow faster, which reduces handoff friction and callback delays.',
      },
      {
        title: 'Stronger New-Business Capture',
        body: 'A more consistent first response gives producers cleaner handoffs and fewer missed inbound sales chances.',
      },
    ],
  },
  'voice-ai-for-home-services-page/san-antonio-tx': {
    heroTitle: 'Voice AI for San Antonio home service teams that need faster booking coverage.',
    heroDescription:
      'San Antonio home service businesses can use voice AI to capture service requests, qualify callers, and keep scheduling active during busy dispatch windows and after hours.',
    marketHeadline: 'Wide service territories create more intake pressure.',
    marketBody:
      'Home service teams in San Antonio often handle broad coverage areas, urgent inbound calls, and uneven peak demand that can overwhelm a purely manual phone process.',
    regionTitle: 'Southwest home service demand needs better first-call triage.',
    regionBody:
      'For San Antonio teams, voice AI helps separate urgent jobs from routine inquiries, protect dispatcher time, and keep inbound booking demand from slipping into missed-call follow-up.',
    localUseCases: [
      'Capture inbound service requests for San Antonio calls before they turn into after-hours lead loss.',
      'Qualify callers by service area, issue type, and urgency before a dispatcher or CSR joins.',
      'Keep booking active when technicians are busy and office staff cannot answer every ring.',
      'Route emergency-style calls differently from routine quotes, inspections, or scheduling updates.',
    ],
    customHighlights: [
      {
        title: 'Dispatcher Relief',
        body: 'Voice AI gives San Antonio teams a stronger intake layer so dispatchers spend less time repeating the same screening questions.',
      },
      {
        title: 'Better Service-Area Screening',
        body: 'A clearer first-call workflow helps teams qualify whether the caller is in range and what kind of job they actually need.',
      },
      {
        title: 'More Captured Demand',
        body: 'After-hours and overflow calls are less likely to disappear when the booking path still feels active and responsive.',
      },
    ],
  },
  'voice-ai-for-home-services-page/tampa-fl': {
    heroTitle: 'Voice AI for Tampa home service companies that need stronger inbound response.',
    heroDescription:
      'Tampa home service teams can use voice AI to answer faster, qualify jobs more cleanly, and keep booking active when live staff are overloaded or offline.',
    marketHeadline: 'Busy service calendars need a more reliable first response.',
    marketBody:
      'Tampa contractors and service businesses often deal with unpredictable peaks in call volume, which makes manual intake a weak point when every missed call can become lost revenue.',
    regionTitle: 'Southeastern service markets create uneven call spikes.',
    regionBody:
      'For Tampa teams, voice AI works well when the goal is to catch more inbound jobs, separate urgent from routine work, and keep the office from becoming a phone bottleneck.',
    localUseCases: [
      'Answer Tampa service calls during peak inbound periods without dumping demand into voicemail.',
      'Qualify inbound jobs by urgency, location, and service type before live staff take over.',
      'Reduce missed-call leakage during nights, weekends, and schedule crunches.',
      'Create a cleaner booking path for estimates, repairs, and repeat customer service requests.',
    ],
    customHighlights: [
      {
        title: 'Faster Job Capture',
        body: 'Tampa teams can convert more inbound demand when the first response is immediate and structured.',
      },
      {
        title: 'Less Office Friction',
        body: 'Voice AI takes repetitive intake off the live team so dispatch and scheduling stay focused on active work.',
      },
      {
        title: 'Better Call Prioritization',
        body: 'Urgent or high-value jobs can move into the right path faster instead of waiting behind routine inbound calls.',
      },
    ],
  },
  'voice-ai-real-estate/seattle-wa': {
    heroTitle: 'Voice AI for Seattle real estate teams that need faster lead response.',
    heroDescription:
      'Seattle real estate calls often require a quick answer, cleaner qualification, and a clear next step for buyers, sellers, renters, or property inquiries before a live agent responds.',
    marketHeadline: 'Lead conversion suffers when first-contact speed slips.',
    marketBody:
      'In Seattle, a missed or delayed real estate callback can send a prospect to the next listing agent, brokerage, or management team before your staff gets back to them.',
    regionTitle: 'West Coast prospects expect digital speed on the phone too.',
    regionBody:
      'Voice AI helps Seattle real estate teams deliver a faster first response, pre-qualify lead intent, and keep inbound demand moving even outside normal live coverage.',
    localUseCases: [
      'Capture Seattle buyer and seller inquiries before they cool off or move to another agent.',
      'Screen lead intent around showings, listing questions, or property management calls before live handoff.',
      'Keep inbound real estate demand active after hours when agents are unavailable.',
      'Route renters, owners, leads, and vendor inquiries into more consistent workflows.',
    ],
    customHighlights: [
      {
        title: 'Faster Lead Qualification',
        body: 'Seattle real estate teams can use voice AI to separate active prospects from low-intent inquiries before spending live agent time.',
      },
      {
        title: 'After-Hours Capture',
        body: 'Listing and showing calls do not stop when agents are offline, so a responsive first-contact layer matters.',
      },
      {
        title: 'Cleaner Routing',
        body: 'Voice AI helps direct buyers, sellers, renters, and management requests into the right queue instead of a generic voicemail path.',
      },
    ],
  },
  'voice-ai-real-estate/austin-tx': {
    heroTitle: 'Voice AI for Austin real estate teams that need cleaner inbound lead handling.',
    heroDescription:
      'Austin real estate teams can use voice AI to capture property inquiries, route listing questions, and qualify inbound leads before an agent joins the conversation.',
    marketHeadline: 'Faster-moving markets create more missed-call risk.',
    marketBody:
      'In Austin, real estate teams usually need a cleaner first response because prospects expect speed, clear routing, and a booking path that does not stall when agents are busy.',
    regionTitle: 'Southwest markets reward quicker qualification.',
    regionBody:
      'For Austin teams, voice AI helps protect inbound opportunities by keeping the first conversation active while live agents focus on negotiations, showings, and active deals.',
    localUseCases: [
      'Capture Austin listing and showing inquiries before they turn into missed-call follow-up.',
      'Pre-qualify real estate leads around property type, intent, and timing before live agent handoff.',
      'Keep property-management, buyer, and seller calls from colliding in one unstructured queue.',
      'Support after-hours lead capture when prospects call outside an agent’s availability window.',
    ],
    customHighlights: [
      {
        title: 'More Lead Coverage',
        body: 'Voice AI helps Austin teams respond faster when prospects call during showings, travel, or after-hours windows.',
      },
      {
        title: 'Better Prospect Sorting',
        body: 'Buyer, seller, tenant, and owner requests can move into clearer workflows before an agent gets involved.',
      },
      {
        title: 'Stronger First Impressions',
        body: 'A fast, organized first response helps real estate brands sound more responsive in a competitive market.',
      },
    ],
  },
  'voice-ai-for-dental-offices/san-diego-ca': {
    heroTitle: 'Voice AI for San Diego dental offices that need better phone coverage.',
    heroDescription:
      'San Diego dental teams can use voice AI to handle appointment calls, answer routine patient questions, and reduce front-desk phone pressure without losing scheduling demand.',
    marketHeadline: 'Appointment demand is easy to lose when calls stack up.',
    marketBody:
      'Dental offices in San Diego often need a better first response for scheduling, rescheduling, insurance basics, and routine office questions when the front desk is already busy.',
    regionTitle: 'West Coast patients expect immediate booking paths.',
    regionBody:
      'For San Diego dental teams, voice AI helps create a smoother patient-access experience by reducing voicemail, improving scheduling response, and preserving live staff time.',
    localUseCases: [
      'Capture San Diego dental appointment requests before they drop into voicemail or callback delay.',
      'Answer routine insurance, hours, and office-info questions without pulling staff off patient-facing work.',
      'Support hygiene, specialty, and new-patient scheduling with cleaner intake before live handoff.',
      'Keep after-hours patient communication active when the office is closed.',
    ],
    customHighlights: [
      {
        title: 'Scheduling Relief',
        body: 'Voice AI helps San Diego dental offices absorb repetitive booking calls without overwhelming the front desk.',
      },
      {
        title: 'Better New-Patient Intake',
        body: 'A structured first response makes it easier to capture the right patient context before a coordinator joins.',
      },
      {
        title: 'Less Voicemail Dependence',
        body: 'Offices can keep patient communication active after hours instead of treating missed calls as tomorrow’s cleanup.',
      },
    ],
  },
  'voice-ai-for-legal-services/nashville-tn': {
    heroTitle: 'Voice AI for Nashville law firms that need cleaner intake and consultation routing.',
    heroDescription:
      'Nashville legal teams can use voice AI to screen inbound consultations, capture first-contact details, and route callers without forcing every intake conversation onto a live staff member immediately.',
    marketHeadline: 'Legal intake loses value when the first call starts messy.',
    marketBody:
      'Law firms in Nashville often need a more organized first-contact process so consultation calls, practice-area questions, and follow-up requests do not create avoidable intake friction.',
    regionTitle: 'Growing Southeast markets raise the bar for responsiveness.',
    regionBody:
      'For Nashville firms, voice AI helps create a more consistent intake layer by answering faster, screening better, and moving qualified callers into the right next step.',
    localUseCases: [
      'Capture Nashville consultation requests before they fall into voicemail or delayed callback.',
      'Screen inbound callers by matter type, urgency, and contact information before staff handoff.',
      'Reduce intake friction for firms that need a more consistent first step across practice-area calls.',
      'Protect live legal staff time by automating repetitive intake and routing questions first.',
    ],
    customHighlights: [
      {
        title: 'Structured Intake',
        body: 'Voice AI helps Nashville firms gather basic caller context before an intake specialist or attorney gets involved.',
      },
      {
        title: 'Faster Consultation Capture',
        body: 'A prompt, organized response keeps more consultation opportunities alive instead of letting them cool off.',
      },
      {
        title: 'Better Routing Discipline',
        body: 'Practice-area calls can move into clearer paths instead of relying on whoever happens to pick up first.',
      },
    ],
  },
  'voice-ai-veterinary-clinics/jacksonville-fl': {
    heroTitle: 'Voice AI for Jacksonville veterinary clinics that need better call coverage.',
    heroDescription:
      'Jacksonville veterinary teams can use voice AI to handle appointment requests, routine pet-owner questions, and after-hours call coverage without leaving the front desk buried in repetitive calls.',
    marketHeadline: 'Pet-owner calls do not slow down when the desk gets busy.',
    marketBody:
      'Veterinary clinics in Jacksonville often need a cleaner first response for scheduling, office questions, medication follow-up, and general intake without overwhelming a small live team.',
    regionTitle: 'Busy regional clinics need steadier phone support.',
    regionBody:
      'For Jacksonville veterinary practices, voice AI helps keep routine pet-owner communication active while preserving staff time for in-clinic care and higher-touch conversations.',
    localUseCases: [
      'Capture Jacksonville appointment requests before they turn into missed calls and manual callbacks.',
      'Answer routine office, scheduling, and care-prep questions without interrupting the live desk repeatedly.',
      'Support after-hours pet-owner communication with a more useful first-contact workflow.',
      'Gather the first layer of intake context before transferring urgent or staff-needed calls.',
    ],
    customHighlights: [
      {
        title: 'Front-Desk Relief',
        body: 'Voice AI helps Jacksonville clinics absorb repetitive scheduling and office questions without derailing in-clinic operations.',
      },
      {
        title: 'Better Pet-Owner Response',
        body: 'A stronger first-contact path helps practices sound more responsive even when live staff are tied up.',
      },
      {
        title: 'Cleaner Urgent Routing',
        body: 'Teams can separate routine appointment demand from higher-priority calls more consistently.',
      },
    ],
  },
  'voice-ai-for-healthcare-page/sacramento-ca': {
    heroTitle: 'Voice AI for Sacramento healthcare teams that need steadier patient scheduling coverage.',
    heroDescription:
      'Sacramento practices can use voice AI to handle patient scheduling, office questions, and after-hours demand without forcing every call into a delayed callback queue.',
    marketHeadline: 'Regional healthcare growth makes scheduling friction more expensive.',
    marketBody:
      'Sacramento providers usually feel the pressure when inbound appointment demand, insurance questions, and provider-routing calls all hit the same front-desk team at once.',
    regionTitle: 'Northern California offices need cleaner first-contact handling.',
    regionBody:
      'For Sacramento healthcare teams, voice AI helps reduce voicemail dependence, answer repetitive patient questions faster, and move callers into the right workflow with less friction.',
    localUseCases: [
      'Handle Sacramento appointment requests before they stall in voicemail or manual callback lists.',
      'Answer repeat questions about office hours, prep, providers, and visit logistics without pulling staff off live work.',
      'Support after-hours patient communication with a more useful first response than generic voicemail.',
      'Route specialty or urgent calls with better intake context before staff take over.',
    ],
    customHighlights: [
      {
        title: 'Faster Appointment Capture',
        body: 'Sacramento clinics can protect more inbound demand when patients hear a clear next step immediately.',
      },
      {
        title: 'Lower Front-Desk Drag',
        body: 'Voice AI reduces the repetitive calls that slow down live staff during busy clinic hours.',
      },
      {
        title: 'Cleaner Patient Routing',
        body: 'Structured intake makes it easier to move callers toward the right provider, office, or scheduling path.',
      },
    ],
  },
  'voice-ai-for-healthcare-page/columbus-oh': {
    heroTitle: 'Voice AI for Columbus healthcare teams that need quicker patient call handling.',
    heroDescription:
      'Columbus healthcare organizations can use voice AI to absorb scheduling demand, answer routine patient questions, and keep after-hours communication active without expanding front-desk headcount.',
    marketHeadline: 'High-volume patient access work exposes manual bottlenecks quickly.',
    marketBody:
      'Columbus practices often need a better first-contact layer because appointment requests, repeat office questions, and provider-routing calls stack up faster than a small team can manage cleanly.',
    regionTitle: 'Midwestern healthcare teams benefit from more structured intake.',
    regionBody:
      'For Columbus clinics, voice AI helps standardize how patient calls are answered, qualified, and routed so the office spends less time restarting the same conversations.',
    localUseCases: [
      'Capture Columbus scheduling calls before patients leave the queue or try another provider.',
      'Answer recurring provider, office, and visit-prep questions without pulling staff into the same call flow all day.',
      'Keep after-hours patient communication active with a more responsive first-contact workflow.',
      'Collect intake details before sending higher-touch or urgent conversations to staff.',
    ],
    customHighlights: [
      {
        title: 'Stronger Patient Access',
        body: 'Columbus teams can reduce missed opportunities when scheduling demand gets a faster response.',
      },
      {
        title: 'Less Repetitive Call Load',
        body: 'Voice AI helps absorb routine patient questions so live staff can focus on more complex interactions.',
      },
      {
        title: 'Better Escalation Context',
        body: 'Staff get cleaner caller details before they step into the conversation.',
      },
    ],
  },
  'voice-ai-for-healthcare-page/richmond-va': {
    heroTitle: 'Voice AI for Richmond healthcare teams focused on cleaner patient access.',
    heroDescription:
      'Richmond-area providers can use voice AI to improve scheduling response, reduce repetitive front-desk interruptions, and keep more patient demand active after hours.',
    marketHeadline: 'Patients notice when phone workflows feel disorganized.',
    marketBody:
      'Richmond practices often need a better first response because delays around scheduling, office questions, and routing create friction long before a patient ever reaches the right person.',
    regionTitle: 'Virginia healthcare offices need dependable first-call structure.',
    regionBody:
      'For Richmond clinics, voice AI helps create a steadier patient-access experience by reducing wait time, qualifying faster, and supporting better routing during peak hours.',
    localUseCases: [
      'Handle Richmond appointment demand before it becomes tomorrow’s callback list.',
      'Answer routine provider, office, and insurance questions before they interrupt live staff repeatedly.',
      'Support evening and after-hours patient communication with a more useful first step.',
      'Move higher-touch calls into the right staff queue with better intake notes already captured.',
    ],
    customHighlights: [
      {
        title: 'Better Scheduling Flow',
        body: 'Richmond healthcare teams can keep more inbound demand active when appointment calls are handled immediately.',
      },
      {
        title: 'Reduced Front-Desk Congestion',
        body: 'Voice AI lowers the constant call pressure created by routine questions and repetitive scheduling requests.',
      },
      {
        title: 'Clearer Patient Handoffs',
        body: 'Structured intake gives staff more context before they join the conversation.',
      },
    ],
  },
  'voice-ai-for-insurance-page/kansas-city-mo': {
    heroTitle: 'Voice AI for Kansas City insurance teams that need faster policyholder response.',
    heroDescription:
      'Kansas City agencies can use voice AI to handle inbound quote requests, policyholder questions, and claims-related first contact without forcing every caller into manual follow-up.',
    marketHeadline: 'Policyholder expectations rise when every missed call feels like lost trust.',
    marketBody:
      'Kansas City insurance teams usually need quicker first-contact coverage because billing questions, quote requests, and claim-status calls all compete for the same staff time.',
    regionTitle: 'Midwestern agencies need steadier inbound call handling.',
    regionBody:
      'For Kansas City agencies, voice AI helps answer faster, qualify callers better, and keep routine requests moving without turning live staff into a constant phone triage desk.',
    localUseCases: [
      'Capture Kansas City quote and coverage inquiries before they turn into missed opportunities.',
      'Answer routine billing, office, and policy questions without stopping every live workflow.',
      'Support first-line claims intake with more structured caller details.',
      'Keep after-hours inbound demand active instead of sending every caller to voicemail.',
    ],
    customHighlights: [
      {
        title: 'Quote Capture',
        body: 'Kansas City agencies can protect more new-business demand when inbound interest gets an immediate response.',
      },
      {
        title: 'Policyholder Coverage',
        body: 'Voice AI helps agencies answer routine account questions faster without adding another service seat.',
      },
      {
        title: 'Claims Intake Support',
        body: 'Structured first-contact handling creates cleaner information before a live agent steps in.',
      },
    ],
  },
  'voice-ai-for-insurance-page/omaha-ne': {
    heroTitle: 'Voice AI for Omaha insurance teams that need cleaner inbound coverage.',
    heroDescription:
      'Omaha agencies can use voice AI to manage quote inquiries, policyholder questions, and after-hours service calls without adding more manual phone pressure to the office.',
    marketHeadline: 'Inbound service work slows growth when staff are trapped on repetitive calls.',
    marketBody:
      'Omaha insurance teams often need a better first-contact layer because service questions, claim-related calls, and new-business requests all compete for live attention at once.',
    regionTitle: 'Regional agencies benefit from a more structured phone workflow.',
    regionBody:
      'For Omaha agencies, voice AI helps keep inbound service active, reduce missed opportunities, and create more useful handoff context for live agents.',
    localUseCases: [
      'Capture Omaha quote and policy inquiries before callers drop or defer.',
      'Answer repetitive billing, office, and service questions without interrupting licensed staff constantly.',
      'Support claim-first-contact workflows with clearer intake detail.',
      'Handle after-hours calls with something more useful than voicemail.',
    ],
    customHighlights: [
      {
        title: 'Faster New-Business Response',
        body: 'Omaha agencies can keep more quote opportunities active when callers get a clear next step immediately.',
      },
      {
        title: 'Less Service Drag',
        body: 'Voice AI reduces the repetitive policyholder calls that eat up office time every day.',
      },
      {
        title: 'Better Intake Context',
        body: 'Live teams receive cleaner information before they jump into coverage or claim conversations.',
      },
    ],
  },
  'voice-ai-for-insurance-page/st-louis-mo': {
    heroTitle: 'Voice AI for St. Louis insurance agencies that want steadier policyholder response.',
    heroDescription:
      'St. Louis insurance teams can use voice AI to handle quote requests, routine service questions, and claims intake more consistently without expanding manual call handling.',
    marketHeadline: 'Service-heavy insurance workflows need a stronger first-contact layer.',
    marketBody:
      'St. Louis agencies usually feel the pressure when policyholder support, billing questions, and new-business demand all pile onto the same live team.',
    regionTitle: 'Agencies need inbound coverage that works beyond office hours.',
    regionBody:
      'For St. Louis teams, voice AI helps reduce voicemail reliance, answer common service questions faster, and keep quote demand active across the day.',
    localUseCases: [
      'Capture St. Louis quote requests before they become missed revenue.',
      'Answer recurring service and billing questions with a more responsive first-contact workflow.',
      'Support claims intake by gathering structured caller details earlier.',
      'Keep after-hours policyholder contact active without another answering layer.',
    ],
    customHighlights: [
      {
        title: 'Quote Conversion Support',
        body: 'St. Louis agencies can respond faster when voice AI handles the first layer of new-business intake.',
      },
      {
        title: 'Policyholder Continuity',
        body: 'Routine account and billing calls can move faster without overwhelming the office team.',
      },
      {
        title: 'Claims Readiness',
        body: 'Structured first-contact handling gives agents a cleaner place to start.',
      },
    ],
  },
  'voice-ai-for-home-services-page/fresno-ca': {
    heroTitle: 'Voice AI for Fresno home service teams that need stronger call capture.',
    heroDescription:
      'Fresno HVAC, plumbing, electrical, and field-service teams can use voice AI to protect inbound jobs, answer routine questions, and keep after-hours demand from slipping into voicemail.',
    marketHeadline: 'Every missed service call can become lost booked work.',
    marketBody:
      'Fresno contractors often need better first-contact coverage because dispatch pressure, in-field work, and small office teams make it easy for good calls to become missed opportunities.',
    regionTitle: 'Central Valley service teams need a more reliable first response.',
    regionBody:
      'For Fresno home service businesses, voice AI helps keep the phone working even when the office is busy, the field team is overloaded, or the best lead calls after hours.',
    localUseCases: [
      'Capture Fresno service calls before they disappear into voicemail or delayed callback.',
      'Answer repeat questions about service areas, hours, and next steps without stopping the office constantly.',
      'Support after-hours emergency or urgent-service intake with a more useful first-contact workflow.',
      'Gather cleaner dispatch context before live staff or on-call teams take over.',
    ],
    customHighlights: [
      {
        title: 'Job Capture',
        body: 'Fresno contractors can protect more booked work when inbound calls get answered immediately.',
      },
      {
        title: 'Dispatch Relief',
        body: 'Voice AI helps absorb repetitive service questions so the team can focus on active jobs.',
      },
      {
        title: 'After-Hours Coverage',
        body: 'Urgent callers get a clearer first step instead of a dead-end voicemail path.',
      },
    ],
  },
  'voice-ai-for-home-services-page/orlando-fl': {
    heroTitle: 'Voice AI for Orlando home service teams that need cleaner scheduling coverage.',
    heroDescription:
      'Orlando contractors can use voice AI to handle service inquiries, booking requests, and urgent after-hours calls without forcing every lead through a manual callback loop.',
    marketHeadline: 'Fast-moving service markets punish slow phone response.',
    marketBody:
      'Orlando home service teams usually need a stronger first-contact layer because inbound demand, dispatch changes, and after-hours calls often hit when the office is already stretched.',
    regionTitle: 'Florida contractors need a better way to keep the phone active.',
    regionBody:
      'For Orlando field-service businesses, voice AI helps answer faster, qualify requests better, and keep more inbound jobs moving toward the schedule.',
    localUseCases: [
      'Capture Orlando service calls before they become missed appointments or lost jobs.',
      'Answer routine service-area, scheduling, and office questions without interrupting dispatch all day.',
      'Support after-hours and urgent service intake with more structured first-call handling.',
      'Collect caller details before live teams step in for booking or escalation.',
    ],
    customHighlights: [
      {
        title: 'More Booked Calls',
        body: 'Orlando contractors can recover more inbound demand when calls are answered with a clear next step.',
      },
      {
        title: 'Less Office Drag',
        body: 'Voice AI reduces the repetitive questions that slow scheduling and dispatch workflows.',
      },
      {
        title: 'Better Urgent Intake',
        body: 'High-priority callers can be identified earlier and sent into the right path faster.',
      },
    ],
  },
  'voice-ai-for-home-services-page/cincinnati-oh': {
    heroTitle: 'Voice AI for Cincinnati home service teams that need better inbound job coverage.',
    heroDescription:
      'Cincinnati HVAC, plumbing, and field-service businesses can use voice AI to answer faster, protect more booked work, and reduce the office strain caused by repetitive call handling.',
    marketHeadline: 'Small teams lose jobs when every call depends on live availability.',
    marketBody:
      'Cincinnati contractors usually need a stronger first-response workflow because dispatch, booking, and service-area questions all compete for the same office attention.',
    regionTitle: 'Midwestern field-service teams need more dependable call handling.',
    regionBody:
      'For Cincinnati service businesses, voice AI helps keep the phone productive across busy days, after-hours periods, and times when the office cannot answer every call live.',
    localUseCases: [
      'Capture Cincinnati inbound service demand before it becomes tomorrow’s callback list.',
      'Answer repeat office and service questions without turning every call into a live interruption.',
      'Support urgent and after-hours job intake with a more useful first-call workflow.',
      'Collect dispatch-ready information before staff or field teams take over.',
    ],
    customHighlights: [
      {
        title: 'Fewer Missed Jobs',
        body: 'Cincinnati contractors can protect more inbound demand when the phone is covered consistently.',
      },
      {
        title: 'Cleaner Scheduling Flow',
        body: 'Voice AI helps separate routine questions from real booking conversations more efficiently.',
      },
      {
        title: 'Dispatch-Ready Intake',
        body: 'Staff receive more structured service information before they step into the job workflow.',
      },
    ],
  },
  'voice-ai-real-estate/miami-fl': {
    heroTitle: 'Voice AI for Miami real estate teams that need faster lead response.',
    heroDescription:
      'Miami real estate groups can use voice AI to qualify inbound leads, answer listing questions, and keep agent response moving without losing high-intent callers to delay.',
    marketHeadline: 'Competitive property markets reward whoever responds first.',
    marketBody:
      'Miami brokerages and real estate teams usually need a stronger first-contact workflow because listing inquiries, showing requests, and agent handoffs happen too fast for manual response alone.',
    regionTitle: 'South Florida real estate teams need more reliable lead capture.',
    regionBody:
      'For Miami teams, voice AI helps answer faster, route leads better, and keep buyer or seller intent active long enough for agents to step in with context.',
    localUseCases: [
      'Capture Miami listing inquiries before they move to another brokerage.',
      'Answer routine property, office, and process questions without slowing agent response.',
      'Support showing and callback qualification with cleaner lead detail upfront.',
      'Keep after-hours lead capture active when agents are not immediately available.',
    ],
    customHighlights: [
      {
        title: 'Lead Response Speed',
        body: 'Miami teams can protect more opportunities when inbound interest gets an immediate answer.',
      },
      {
        title: 'Cleaner Qualification',
        body: 'Voice AI helps sort listing questions, showing requests, and agent handoffs more efficiently.',
      },
      {
        title: 'After-Hours Lead Continuity',
        body: 'High-intent callers stay in motion instead of disappearing after one missed call.',
      },
    ],
  },
  'voice-ai-real-estate/salt-lake-city-ut': {
    heroTitle: 'Voice AI for Salt Lake City real estate teams that want cleaner inbound lead handling.',
    heroDescription:
      'Salt Lake City brokerages can use voice AI to answer listing calls, qualify inbound interest, and keep showing requests active without forcing every lead into manual callback.',
    marketHeadline: 'Lead speed matters when inbound buyers expect answers immediately.',
    marketBody:
      'Salt Lake City real estate teams often need a stronger first-contact layer because listing inquiries, office questions, and showing coordination all happen faster than a live team can always cover.',
    regionTitle: 'Regional brokerages benefit from steadier lead capture.',
    regionBody:
      'For Salt Lake City teams, voice AI helps move inbound calls toward the right agent or next step while preserving more useful lead context.',
    localUseCases: [
      'Capture Salt Lake City listing calls before interested buyers move on.',
      'Answer common property and office questions without slowing down live agent workflows.',
      'Support showing-request intake with more structured caller detail.',
      'Keep evening and after-hours lead capture active with a clearer first response.',
    ],
    customHighlights: [
      {
        title: 'More Responsive Lead Coverage',
        body: 'Salt Lake City teams can keep more inbound interest alive when voice AI answers first.',
      },
      {
        title: 'Less Agent Interrupt Load',
        body: 'Routine office and listing questions can be handled earlier without constant live interruption.',
      },
      {
        title: 'Better Lead Routing',
        body: 'Structured first-contact handling helps agents enter the conversation with more context.',
      },
    ],
  },
  'voice-ai-for-dental-offices/phoenix-az': {
    heroTitle: 'Voice AI for Phoenix dental offices that need stronger scheduling coverage.',
    heroDescription:
      'Phoenix dental teams can use voice AI to handle appointment requests, insurance questions, and recall communication without forcing every patient call into live front-desk overflow.',
    marketHeadline: 'Busy chair-side offices lose time when every call needs a live answer.',
    marketBody:
      'Phoenix dental practices usually need better first-contact support because scheduling calls, insurance questions, and office-info requests arrive faster than a small team can absorb cleanly.',
    regionTitle: 'Valley dental teams need steadier phone workflows.',
    regionBody:
      'For Phoenix dental offices, voice AI helps keep scheduling active, reduce missed calls, and support more organized patient communication across busy treatment hours.',
    localUseCases: [
      'Capture Phoenix appointment requests before they turn into missed patients.',
      'Answer repeat office, prep, and insurance questions without constant front-desk interruption.',
      'Support hygiene recall and follow-up scheduling with steadier phone coverage.',
      'Keep after-hours patient communication active without another full-time scheduling seat.',
    ],
    customHighlights: [
      {
        title: 'More Scheduling Continuity',
        body: 'Phoenix dental practices can keep more appointments moving when calls are answered immediately.',
      },
      {
        title: 'Lower Front-Desk Pressure',
        body: 'Voice AI reduces repetitive patient questions that compete with in-office work.',
      },
      {
        title: 'Better Recall Support',
        body: 'Routine hygiene and follow-up communication can stay active without another manual phone layer.',
      },
    ],
  },
  'voice-ai-for-dental-offices/charlotte-nc': {
    heroTitle: 'Voice AI for Charlotte dental offices that need faster patient call response.',
    heroDescription:
      'Charlotte dental teams can use voice AI to manage new-patient calls, scheduling demand, and routine office questions without letting the front desk become the bottleneck.',
    marketHeadline: 'Growing dental markets expose weak phone coverage quickly.',
    marketBody:
      'Charlotte dental practices often need a better first-contact workflow because new-patient interest, recall scheduling, and insurance questions all pile onto the same staff team.',
    regionTitle: 'Southeast dental teams need steadier intake and scheduling support.',
    regionBody:
      'For Charlotte offices, voice AI helps reduce missed patient calls, answer common questions faster, and keep scheduling workflows moving during busy treatment hours.',
    localUseCases: [
      'Capture Charlotte new-patient and appointment calls before they go cold.',
      'Answer repetitive prep, office, and insurance questions without constant live interruption.',
      'Support recall and hygiene scheduling with better front-end coverage.',
      'Keep after-hours patient contact active with a more useful first response.',
    ],
    customHighlights: [
      {
        title: 'New-Patient Capture',
        body: 'Charlotte practices can respond faster when inbound interest does not wait on a callback list.',
      },
      {
        title: 'Scheduling Relief',
        body: 'Voice AI handles repeat booking pressure so the front desk can focus on active patients.',
      },
      {
        title: 'Clearer Patient Communication',
        body: 'Routine questions get answered faster and escalations arrive with better context.',
      },
    ],
  },
  'voice-ai-for-legal-services/tampa-fl': {
    heroTitle: 'Voice AI for Tampa legal teams that need cleaner intake coverage.',
    heroDescription:
      'Tampa law firms can use voice AI to capture inbound inquiries, answer routine office questions, and keep legal intake active when staff cannot answer every call live.',
    marketHeadline: 'Legal intake loses value fast when callers hit voicemail.',
    marketBody:
      'Tampa firms usually need a better first-contact layer because consultation requests, case-type questions, and office logistics all compete for the same intake bandwidth.',
    regionTitle: 'Florida legal teams benefit from steadier first-call handling.',
    regionBody:
      'For Tampa firms, voice AI helps preserve inbound opportunity, gather cleaner intake details, and create a more organized first response before staff step in.',
    localUseCases: [
      'Capture Tampa legal inquiries before prospective clients abandon the call.',
      'Answer routine office and consultation questions without interrupting intake staff constantly.',
      'Support after-hours first-contact handling for firms that cannot leave every new inquiry to voicemail.',
      'Gather structured intake context before live staff continue the conversation.',
    ],
    customHighlights: [
      {
        title: 'Consultation Capture',
        body: 'Tampa firms can keep more inbound legal opportunity active when callers hear a clear next step immediately.',
      },
      {
        title: 'Lower Intake Drag',
        body: 'Voice AI reduces the repetitive office questions that slow intake teams down.',
      },
      {
        title: 'Better First-Call Context',
        body: 'Staff receive cleaner case-type and caller information before the handoff.',
      },
    ],
  },
  'voice-ai-for-legal-services/birmingham-al': {
    heroTitle: 'Voice AI for Birmingham legal teams that want more dependable intake response.',
    heroDescription:
      'Birmingham law firms can use voice AI to handle initial inquiries, office questions, and after-hours call coverage without forcing every lead into a next-day callback.',
    marketHeadline: 'Firms lose intake momentum when every new caller waits on manual follow-up.',
    marketBody:
      'Birmingham legal teams often need stronger first-contact handling because office staff cannot absorb every consultation request, routine question, and repeat follow-up call in real time.',
    regionTitle: 'Regional firms benefit from a more structured intake workflow.',
    regionBody:
      'For Birmingham law firms, voice AI helps standardize how new inquiries are answered, qualified, and routed before the live team steps in.',
    localUseCases: [
      'Capture Birmingham legal inquiries before they slip into voicemail or delayed response.',
      'Answer routine office and scheduling questions without turning intake into constant interruption.',
      'Support after-hours inquiry handling with more useful first-contact coverage.',
      'Collect caller and case-type details before escalation to staff.',
    ],
    customHighlights: [
      {
        title: 'Steadier Intake Flow',
        body: 'Birmingham firms can protect more opportunity when new callers get an immediate response path.',
      },
      {
        title: 'Less Office Interruption',
        body: 'Voice AI helps absorb repetitive questions while preserving live staff time.',
      },
      {
        title: 'Cleaner Handoffs',
        body: 'Legal teams start with more useful intake context instead of a blank callback note.',
      },
    ],
  },
  'voice-ai-veterinary-clinics/milwaukee-wi': {
    heroTitle: 'Voice AI for Milwaukee veterinary clinics that need better appointment and call coverage.',
    heroDescription:
      'Milwaukee veterinary teams can use voice AI to support appointment scheduling, answer routine pet-owner questions, and reduce missed calls without adding another front-desk seat.',
    marketHeadline: 'Pet-owner calls come with urgency and repetition at the same time.',
    marketBody:
      'Milwaukee clinics usually need a better first-contact layer because appointment requests, vaccine questions, medication follow-up, and office logistics all stack up quickly on a small team.',
    regionTitle: 'Veterinary clinics need calmer, more structured phone handling.',
    regionBody:
      'For Milwaukee clinics, voice AI helps answer faster, keep scheduling active, and route more urgent conversations with better context.',
    localUseCases: [
      'Capture Milwaukee appointment and follow-up calls before they become missed demand.',
      'Answer routine office, prep, and service questions without constant live interruption.',
      'Support medication, vaccine, and scheduling workflows with better first-contact coverage.',
      'Identify urgent pet-owner calls earlier and route them into the right path faster.',
    ],
    customHighlights: [
      {
        title: 'More Scheduling Continuity',
        body: 'Milwaukee veterinary teams can keep more appointments active when calls are answered consistently.',
      },
      {
        title: 'Less Front-Desk Pressure',
        body: 'Voice AI handles repeat office questions so staff can stay focused on in-clinic work.',
      },
      {
        title: 'Better Urgent Routing',
        body: 'High-priority calls can be separated from routine requests more efficiently.',
      },
    ],
  },
  'voice-ai-veterinary-clinics/new-orleans-la': {
    heroTitle: 'Voice AI for New Orleans veterinary clinics that need stronger pet-owner response.',
    heroDescription:
      'New Orleans veterinary clinics can use voice AI to handle scheduling calls, routine owner questions, and urgent first-contact workflows without pushing everything into voicemail.',
    marketHeadline: 'Clinic teams lose capacity fast when the phone never stops ringing.',
    marketBody:
      'New Orleans clinics often need steadier first-contact coverage because a small staff has to balance appointments, office questions, and urgent pet-owner calls all at once.',
    regionTitle: 'Veterinary teams need reliable inbound coverage across busy clinic days.',
    regionBody:
      'For New Orleans clinics, voice AI helps keep appointment demand active, reduce missed calls, and bring more structure to the pet-owner experience.',
    localUseCases: [
      'Capture New Orleans appointment calls before they become missed patients.',
      'Answer repetitive office, service, and prep questions without interrupting the team constantly.',
      'Support urgent first-contact handling with a cleaner routing workflow.',
      'Keep after-hours or overflow communication more useful than voicemail alone.',
    ],
    customHighlights: [
      {
        title: 'Better Appointment Capture',
        body: 'New Orleans clinics can keep more inbound demand alive when pet owners get an immediate response path.',
      },
      {
        title: 'Reduced Call Overload',
        body: 'Voice AI lowers the repetitive phone burden that strains smaller front-desk teams.',
      },
      {
        title: 'Clearer Intake and Escalation',
        body: 'Urgent pet-owner conversations can move into the right live path with better context.',
      },
    ],
  },
  'voice-ai-for-telecommunication/indianapolis-in': {
    heroTitle: 'Voice AI for Indianapolis telecom teams that need stronger partner-ready workflows.',
    heroDescription:
      'Indianapolis telecom providers, MSPs, and channel teams can use voice AI to support inbound coverage, improve customer-call handling, and give partners a more production-ready automation story.',
    marketHeadline: 'Providers need more than a checkbox AI feature to stand out.',
    marketBody:
      'Indianapolis telecom teams usually need a stronger operational story because partners and end customers care about reliability, routing quality, and live production performance, not just demo polish.',
    regionTitle: 'Midwestern providers need AI voice that fits telecom operations.',
    regionBody:
      'For Indianapolis telecom and UCaaS teams, voice AI helps answer faster, reduce call congestion, and support partner conversations with workflows that actually hold up under load.',
    localUseCases: [
      'Support Indianapolis providers that want a better inbound voice-AI layer for live customer conversations.',
      'Reduce repetitive call load while improving routing and first-contact handling for telecom customers.',
      'Give MSP and channel teams a more credible production-ready AI voice offer.',
      'Keep overflow and after-hours call handling active without relying on weak demo-only tooling.',
    ],
    customHighlights: [
      {
        title: 'Provider-Grade Call Handling',
        body: 'Indianapolis telecom teams can show a stronger AI story when routing and first-contact workflows hold up in production.',
      },
      {
        title: 'Partner Enablement',
        body: 'Voice AI becomes easier to sell when MSP and channel teams can tie it directly to call relief and customer-response outcomes.',
      },
      {
        title: 'Operational Fit',
        body: 'The workflow supports telecom realities like overflow, escalation, and high-volume inbound service needs.',
      },
    ],
  },
  'voice-ai-for-healthcare-page/louisville-ky': {
    heroTitle: 'Voice AI for Louisville healthcare teams that need steadier patient access.',
    heroDescription:
      'Louisville practices can use voice AI to handle scheduling demand, office questions, and after-hours patient communication without forcing every call into tomorrow’s callback list.',
    marketHeadline: 'Patient access breaks down fast when every call depends on a live front desk.',
    marketBody:
      'Louisville healthcare teams often need a better first-contact workflow because appointment requests, provider routing, and routine questions all stack up on the same staff.',
    regionTitle: 'Regional healthcare teams benefit from more structured intake.',
    regionBody:
      'For Louisville clinics, voice AI helps reduce voicemail dependence, answer repetitive patient questions faster, and move callers into the right path with less friction.',
    localUseCases: [
      'Capture Louisville scheduling calls before they stall in voicemail or delayed follow-up.',
      'Answer recurring office, provider, and prep questions without restarting the same conversation all day.',
      'Support after-hours patient response with a more useful first-contact workflow.',
      'Route urgent or specialty-specific calls with cleaner intake notes before staff step in.',
    ],
    customHighlights: [
      { title: 'Scheduling Continuity', body: 'Louisville clinics can protect more inbound demand when appointment calls get an immediate next step.' },
      { title: 'Lower Front-Desk Load', body: 'Voice AI absorbs repetitive patient questions so live staff can focus on higher-touch work.' },
      { title: 'Cleaner Routing', body: 'Structured intake gives teams a better place to start before live escalation.' },
    ],
  },
  'voice-ai-for-healthcare-page/kansas-city-mo': {
    heroTitle: 'Voice AI for Kansas City healthcare teams that want cleaner patient routing.',
    heroDescription:
      'Kansas City providers can use voice AI to reduce scheduling bottlenecks, answer routine patient questions, and improve first-call response across busy office hours.',
    marketHeadline: 'Healthcare growth makes weak phone workflows more visible.',
    marketBody:
      'Kansas City clinics usually need a stronger first-contact layer because appointment demand, office logistics, and provider questions all compete for the same front-desk attention.',
    regionTitle: 'Midwestern patient-access workflows need more consistency.',
    regionBody:
      'For Kansas City healthcare teams, voice AI helps standardize call handling so patients get a clearer next step and staff spend less time untangling repetitive calls.',
    localUseCases: [
      'Handle Kansas City appointment requests before they become missed opportunities.',
      'Answer office, insurance, and provider questions without constant live interruption.',
      'Keep after-hours patient communication active with something better than generic voicemail.',
      'Gather useful intake context before routing more urgent calls to staff.',
    ],
    customHighlights: [
      { title: 'More Reliable First Response', body: 'Kansas City clinics can reduce patient friction when calls are answered quickly and consistently.' },
      { title: 'Front-Desk Relief', body: 'Voice AI lowers the repetitive call burden that slows busy offices down.' },
      { title: 'Better Escalation Context', body: 'Staff receive cleaner caller details before they join the conversation.' },
    ],
  },
  'voice-ai-for-insurance-page/sacramento-ca': {
    heroTitle: 'Voice AI for Sacramento insurance teams that need faster policyholder response.',
    heroDescription:
      'Sacramento agencies can use voice AI to capture quote requests, answer service questions, and support claims-first-contact workflows without expanding manual call handling.',
    marketHeadline: 'Service-heavy agencies lose momentum when every caller waits for a callback.',
    marketBody:
      'Sacramento insurance teams often need a better first-contact layer because quote demand, billing questions, and claim-related calls all compete for the same live bandwidth.',
    regionTitle: 'Agencies need steadier inbound coverage across the day.',
    regionBody:
      'For Sacramento agencies, voice AI helps answer routine questions faster, keep new-business calls active, and create better handoff context for live agents.',
    localUseCases: [
      'Capture Sacramento quote calls before they become missed revenue.',
      'Answer recurring policy, billing, and office questions without stopping every live workflow.',
      'Support claims-first-contact intake with more structured caller detail.',
      'Handle after-hours inbound demand with a better response path than voicemail.',
    ],
    customHighlights: [
      { title: 'Quote Capture', body: 'Sacramento agencies can protect more new-business demand when callers hear a clear next step immediately.' },
      { title: 'Policyholder Service Relief', body: 'Voice AI reduces repetitive service questions that eat up office capacity.' },
      { title: 'Claims Intake Support', body: 'Structured first-contact handling gives agents more useful context before they step in.' },
    ],
  },
  'voice-ai-for-insurance-page/richmond-va': {
    heroTitle: 'Voice AI for Richmond insurance agencies that need steadier inbound coverage.',
    heroDescription:
      'Richmond agencies can use voice AI to handle quote requests, policyholder questions, and after-hours service calls without relying entirely on manual follow-up.',
    marketHeadline: 'Insurance workflows slow down when repetitive calls trap the live team.',
    marketBody:
      'Richmond insurance teams usually need a stronger first-contact workflow because routine policy questions, billing support, and new-business demand arrive together.',
    regionTitle: 'Regional agencies need clearer first-call handling.',
    regionBody:
      'For Richmond agencies, voice AI helps keep inbound service moving, protect new-business opportunities, and route more complex situations with better intake notes.',
    localUseCases: [
      'Capture Richmond quote inquiries before they disappear into voicemail or delay.',
      'Answer recurring billing and service questions without constant interruption.',
      'Support structured claims-first-contact coverage for inbound callers.',
      'Keep after-hours policyholder contact active without another live service layer.',
    ],
    customHighlights: [
      { title: 'Faster New-Business Response', body: 'Richmond agencies can improve quote response time without adding another manual phone seat.' },
      { title: 'Less Service Drag', body: 'Voice AI handles repetitive account questions so staff can focus on more valuable work.' },
      { title: 'Better Handoffs', body: 'Live agents step into calls with cleaner information already captured.' },
    ],
  },
  'voice-ai-for-insurance-page/cincinnati-oh': {
    heroTitle: 'Voice AI for Cincinnati insurance teams that want cleaner policyholder response.',
    heroDescription:
      'Cincinnati agencies can use voice AI to capture new-business calls, answer routine service questions, and support claims intake without turning every caller into a callback task.',
    marketHeadline: 'Agencies lose speed when every inbound call needs live intervention.',
    marketBody:
      'Cincinnati insurance teams often need a better first-contact workflow because quote requests, billing questions, and policyholder support all hit during the same peak windows.',
    regionTitle: 'Midwestern service teams need steadier coverage.',
    regionBody:
      'For Cincinnati agencies, voice AI helps keep inbound policyholder communication active while preserving staff time for higher-touch conversations.',
    localUseCases: [
      'Capture Cincinnati quote opportunities before they go cold.',
      'Answer repetitive policy and office questions with a more responsive first step.',
      'Support first-line claims intake with cleaner caller context.',
      'Handle after-hours inbound demand more consistently than voicemail alone.',
    ],
    customHighlights: [
      { title: 'Better Quote Capture', body: 'Cincinnati agencies can protect more inbound demand when first response happens immediately.' },
      { title: 'Lower Service Load', body: 'Voice AI reduces routine call volume that slows the office down.' },
      { title: 'Cleaner Claims Intake', body: 'Structured call handling makes live follow-up easier once agents step in.' },
    ],
  },
  'voice-ai-for-home-services-page/miami-fl': {
    heroTitle: 'Voice AI for Miami home service teams that need stronger job capture.',
    heroDescription:
      'Miami contractors can use voice AI to answer service calls faster, protect more booked work, and keep after-hours demand from slipping into voicemail.',
    marketHeadline: 'Fast-moving service markets punish slow phone response immediately.',
    marketBody:
      'Miami field-service teams often need a better first-contact layer because dispatch pressure, in-field work, and urgent service calls all compete for the same office attention.',
    regionTitle: 'South Florida contractors need steadier inbound coverage.',
    regionBody:
      'For Miami home service businesses, voice AI helps keep the phone productive during busy days, after-hours periods, and times when the office cannot answer every call live.',
    localUseCases: [
      'Capture Miami service calls before they become lost jobs or delayed callbacks.',
      'Answer repetitive service-area, booking, and office questions without derailing dispatch.',
      'Support urgent and after-hours job intake with a more useful first-call workflow.',
      'Gather dispatch-ready details before staff or field teams take over.',
    ],
    customHighlights: [
      { title: 'More Booked Work', body: 'Miami contractors can recover more inbound demand when calls are answered immediately.' },
      { title: 'Dispatch Relief', body: 'Voice AI lowers the repetitive call load that slows office teams down.' },
      { title: 'Better Urgent Intake', body: 'High-priority callers get a clearer first step instead of a dead-end voicemail path.' },
    ],
  },
  'voice-ai-for-home-services-page/phoenix-az': {
    heroTitle: 'Voice AI for Phoenix home service teams that need cleaner inbound coverage.',
    heroDescription:
      'Phoenix HVAC, plumbing, and field-service teams can use voice AI to protect more jobs, answer routine questions, and improve after-hours call handling without adding office headcount.',
    marketHeadline: 'Wide service areas make missed calls more expensive.',
    marketBody:
      'Phoenix contractors often need stronger first-call coverage because service inquiries, dispatch changes, and urgent requests all arrive faster than a small office can absorb.',
    regionTitle: 'Valley contractors need more dependable first response.',
    regionBody:
      'For Phoenix service businesses, voice AI helps answer faster, qualify better, and keep more job opportunities active while the live team handles the work already in motion.',
    localUseCases: [
      'Capture Phoenix inbound service demand before it becomes tomorrow’s callback list.',
      'Answer repeat office and service questions without constant live interruption.',
      'Support urgent and after-hours intake with a more useful first-contact workflow.',
      'Collect cleaner dispatch details before a live team member takes over.',
    ],
    customHighlights: [
      { title: 'Better Job Capture', body: 'Phoenix contractors can protect more booked work when calls are answered consistently.' },
      { title: 'Lower Office Drag', body: 'Voice AI reduces repetitive questions that slow scheduling and dispatch down.' },
      { title: 'Cleaner Dispatch Handoffs', body: 'Staff step into the call with more useful information already captured.' },
    ],
  },
  'voice-ai-for-home-services-page/charlotte-nc': {
    heroTitle: 'Voice AI for Charlotte home service teams that want steadier call coverage.',
    heroDescription:
      'Charlotte contractors can use voice AI to capture more service calls, reduce missed opportunities, and keep after-hours demand active without relying on constant manual follow-up.',
    marketHeadline: 'Growing service markets expose phone bottlenecks quickly.',
    marketBody:
      'Charlotte home service teams usually need a better first-contact workflow because booking requests, service questions, and urgent calls hit when office staff are already stretched thin.',
    regionTitle: 'Southeast field-service teams need a stronger first response.',
    regionBody:
      'For Charlotte contractors, voice AI helps protect more inbound demand by qualifying callers earlier and keeping the phone useful across the full day.',
    localUseCases: [
      'Capture Charlotte booking calls before they become missed jobs.',
      'Answer repeat scheduling and service-area questions without dragging the office into the same conversation all day.',
      'Support after-hours and urgent intake with a more structured first step.',
      'Collect better caller details before dispatch or live escalation begins.',
    ],
    customHighlights: [
      { title: 'Stronger Booking Flow', body: 'Charlotte contractors can keep more inbound work active when calls get answered immediately.' },
      { title: 'Less Repetitive Call Load', body: 'Voice AI absorbs routine service questions so the office can stay focused on live work.' },
      { title: 'Better Overflow Coverage', body: 'After-hours callers get a more useful response than generic voicemail alone.' },
    ],
  },
  'voice-ai-real-estate/nashville-tn': {
    heroTitle: 'Voice AI for Nashville real estate teams that need faster lead response.',
    heroDescription:
      'Nashville brokerages can use voice AI to answer listing calls, qualify buyer and seller interest, and keep lead capture active when agents are tied up.',
    marketHeadline: 'Real estate opportunities fade fast when response time slips.',
    marketBody:
      'Nashville teams often need a stronger first-contact layer because listing questions, showing requests, and agent handoffs move faster than manual callbacks can support.',
    regionTitle: 'Brokerages need more reliable lead capture across the day.',
    regionBody:
      'For Nashville real estate teams, voice AI helps keep inbound interest alive, route leads better, and give agents more context before they step into the conversation.',
    localUseCases: [
      'Capture Nashville listing inquiries before they move to another brokerage.',
      'Answer routine property and office questions without constant agent interruption.',
      'Support showing-request intake with cleaner lead qualification up front.',
      'Keep after-hours lead capture active when agents are not immediately available.',
    ],
    customHighlights: [
      { title: 'Faster Lead Response', body: 'Nashville teams can protect more inbound opportunity when calls get an immediate answer.' },
      { title: 'Cleaner Qualification', body: 'Voice AI helps separate listing questions from higher-intent showings and agent handoffs.' },
      { title: 'After-Hours Continuity', body: 'Lead capture stays active even when the live team is offline.' },
    ],
  },
  'voice-ai-real-estate/orlando-fl': {
    heroTitle: 'Voice AI for Orlando real estate teams that need steadier inbound lead handling.',
    heroDescription:
      'Orlando brokerages can use voice AI to capture listing inquiries, answer common questions, and keep showing-request workflows moving without turning every caller into a delayed callback.',
    marketHeadline: 'Listing-driven markets reward whoever answers first.',
    marketBody:
      'Orlando real estate teams usually need a better first-contact workflow because buyers, sellers, and showing requests all compete for the same agent availability.',
    regionTitle: 'Florida teams need a stronger first-contact layer for property leads.',
    regionBody:
      'For Orlando brokerages, voice AI helps answer faster, route leads better, and preserve more useful caller context before the live team steps in.',
    localUseCases: [
      'Capture Orlando property inquiries before they move to another agent or brokerage.',
      'Answer routine listing and office questions without disrupting active deal work.',
      'Support showing-request intake with clearer qualification details.',
      'Keep evening and weekend lead capture active when agents are unavailable.',
    ],
    customHighlights: [
      { title: 'More Responsive Lead Capture', body: 'Orlando teams can keep more inbound interest alive when the first response happens immediately.' },
      { title: 'Lower Agent Interrupt Load', body: 'Voice AI handles repeat property questions so agents can stay focused on active clients.' },
      { title: 'Better Lead Routing', body: 'Qualified callers reach the right next step with more structure and less guesswork.' },
    ],
  },
  'voice-ai-for-dental-offices/tampa-fl': {
    heroTitle: 'Voice AI for Tampa dental offices that need steadier scheduling support.',
    heroDescription:
      'Tampa dental teams can use voice AI to capture appointment requests, answer insurance questions, and support recall workflows without overwhelming the front desk.',
    marketHeadline: 'Treatment-hour call pressure makes scheduling consistency harder.',
    marketBody:
      'Tampa practices often need stronger first-contact coverage because new-patient interest, hygiene scheduling, and routine office questions all compete for the same staff attention.',
    regionTitle: 'Florida dental offices need more dependable phone coverage.',
    regionBody:
      'For Tampa dental teams, voice AI helps reduce missed calls, keep scheduling active, and answer routine patient questions faster while staff focus on in-office care.',
    localUseCases: [
      'Capture Tampa appointment requests before they become missed patients.',
      'Answer repetitive office, prep, and insurance questions without constant live interruption.',
      'Support hygiene recall and follow-up scheduling with steadier first-contact coverage.',
      'Keep after-hours patient communication more useful than voicemail alone.',
    ],
    customHighlights: [
      { title: 'More Scheduling Continuity', body: 'Tampa dental practices can keep more appointment demand active when the phone is covered consistently.' },
      { title: 'Lower Front-Desk Pressure', body: 'Voice AI absorbs repetitive patient questions that would otherwise slow the office down.' },
      { title: 'Better Recall Support', body: 'Recall and follow-up communication stays active without another full-time phone seat.' },
    ],
  },
  'voice-ai-for-dental-offices/sacramento-ca': {
    heroTitle: 'Voice AI for Sacramento dental offices that want cleaner patient-call handling.',
    heroDescription:
      'Sacramento dental teams can use voice AI to manage new-patient calls, scheduling demand, and routine office questions without letting the front desk become the bottleneck.',
    marketHeadline: 'Dental growth makes weak scheduling workflows more obvious.',
    marketBody:
      'Sacramento practices usually need a better first-contact layer because appointment requests, insurance questions, and recall scheduling all hit the same team repeatedly.',
    regionTitle: 'Northern California dental teams need steadier intake support.',
    regionBody:
      'For Sacramento offices, voice AI helps answer faster, reduce missed calls, and keep patient communication moving while live staff focus on active care.',
    localUseCases: [
      'Capture Sacramento appointment and new-patient calls before they fall into callback backlog.',
      'Answer repeat prep, office, and insurance questions without restarting the same workflow all day.',
      'Support hygiene recall and follow-up communication with more consistent coverage.',
      'Keep after-hours patient contact active without another scheduling seat.',
    ],
    customHighlights: [
      { title: 'Cleaner Appointment Capture', body: 'Sacramento dental practices can protect more scheduling demand when callers hear a clear next step immediately.' },
      { title: 'Front-Desk Relief', body: 'Voice AI reduces the repetitive phone burden that competes with in-office care.' },
      { title: 'More Organized Patient Response', body: 'Patients get a steadier experience before the live team joins the call.' },
    ],
  },
  'voice-ai-for-legal-services/columbus-oh': {
    heroTitle: 'Voice AI for Columbus legal teams that need cleaner consultation intake.',
    heroDescription:
      'Columbus law firms can use voice AI to capture inbound inquiries, answer routine office questions, and keep legal intake active even when staff cannot answer every call live.',
    marketHeadline: 'Legal opportunities disappear when intake relies on voicemail.',
    marketBody:
      'Columbus firms often need a stronger first-contact layer because consultation requests, office logistics, and repeat follow-up calls all compete for limited intake bandwidth.',
    regionTitle: 'Midwestern firms need steadier intake coverage.',
    regionBody:
      'For Columbus legal teams, voice AI helps preserve inbound opportunity, gather better first-call context, and create more organized handoffs to live staff.',
    localUseCases: [
      'Capture Columbus consultation inquiries before callers abandon the process.',
      'Answer routine office and scheduling questions without dragging intake staff into repetitive calls.',
      'Support after-hours inquiry handling with a clearer first-contact workflow.',
      'Collect caller and case-type context before a live legal intake handoff.',
    ],
    customHighlights: [
      { title: 'Consultation Capture', body: 'Columbus firms can protect more inbound opportunity when callers get an immediate next step.' },
      { title: 'Lower Intake Drag', body: 'Voice AI absorbs repetitive office questions so live staff can focus on qualified inquiries.' },
      { title: 'Better First-Call Context', body: 'Staff enter the conversation with more useful intake information already captured.' },
    ],
  },
  'voice-ai-for-legal-services/salt-lake-city-ut': {
    heroTitle: 'Voice AI for Salt Lake City legal teams that want more dependable first response.',
    heroDescription:
      'Salt Lake City firms can use voice AI to handle consultation requests, routine office questions, and after-hours intake without forcing every caller into manual follow-up.',
    marketHeadline: 'Law firms lose momentum when every new inquiry waits on a callback.',
    marketBody:
      'Salt Lake City legal teams usually need a better first-contact workflow because office staff cannot absorb every consultation request, case-type question, and repeat caller live.',
    regionTitle: 'Regional firms benefit from more structured intake.',
    regionBody:
      'For Salt Lake City firms, voice AI helps standardize new-inquiry handling, preserve more opportunity, and route higher-touch conversations with better context.',
    localUseCases: [
      'Capture Salt Lake City legal inquiries before they slip into voicemail.',
      'Answer routine office and consultation questions without constant live interruption.',
      'Support after-hours first-contact handling with a more useful response path.',
      'Gather caller and case-type details before escalation to staff.',
    ],
    customHighlights: [
      { title: 'Steadier Intake Flow', body: 'Salt Lake City firms can keep more inbound opportunity alive when callers get a clear response immediately.' },
      { title: 'Less Office Interruption', body: 'Voice AI reduces the repetitive questions that bog down intake teams.' },
      { title: 'Cleaner Escalations', body: 'Legal staff receive better intake context before they continue the conversation.' },
    ],
  },
  'voice-ai-veterinary-clinics/kansas-city-mo': {
    heroTitle: 'Voice AI for Kansas City veterinary clinics that need stronger appointment coverage.',
    heroDescription:
      'Kansas City veterinary teams can use voice AI to handle appointment calls, routine pet-owner questions, and after-hours overflow without overwhelming the front desk.',
    marketHeadline: 'Pet-owner communication gets messy when every call needs a live answer.',
    marketBody:
      'Kansas City clinics usually need a better first-contact layer because appointment demand, medication questions, and office logistics all arrive faster than a small team can absorb cleanly.',
    regionTitle: 'Veterinary teams need calmer, more structured phone handling.',
    regionBody:
      'For Kansas City clinics, voice AI helps keep scheduling active, reduce missed calls, and route more urgent conversations with better context.',
    localUseCases: [
      'Capture Kansas City appointment and follow-up calls before they become missed demand.',
      'Answer routine office, prep, and service questions without constant live interruption.',
      'Support medication and vaccine question workflows with steadier first-contact coverage.',
      'Identify more urgent pet-owner calls earlier and route them faster.',
    ],
    customHighlights: [
      { title: 'Better Scheduling Continuity', body: 'Kansas City clinics can keep more appointments moving when calls are answered consistently.' },
      { title: 'Lower Front-Desk Pressure', body: 'Voice AI handles repeat pet-owner questions so staff can stay focused on in-clinic care.' },
      { title: 'Cleaner Urgent Routing', body: 'High-priority calls can move into the right path with better intake details already captured.' },
    ],
  },
  'voice-ai-veterinary-clinics/birmingham-al': {
    heroTitle: 'Voice AI for Birmingham veterinary clinics that want steadier pet-owner response.',
    heroDescription:
      'Birmingham veterinary clinics can use voice AI to capture appointment calls, answer routine owner questions, and improve first-contact handling when live staff are busy.',
    marketHeadline: 'Small clinic teams feel phone pressure immediately.',
    marketBody:
      'Birmingham clinics often need a stronger first-contact workflow because scheduling calls, office questions, and more urgent pet-owner needs all compete for the same desk coverage.',
    regionTitle: 'Regional clinics benefit from more reliable inbound support.',
    regionBody:
      'For Birmingham veterinary teams, voice AI helps reduce missed calls, keep appointment demand active, and give live staff better call context before escalation.',
    localUseCases: [
      'Capture Birmingham appointment requests before they become missed patients.',
      'Answer repetitive office and service questions without interrupting the team constantly.',
      'Support after-hours first-contact handling with something more useful than voicemail.',
      'Separate routine questions from more urgent pet-owner calls more efficiently.',
    ],
    customHighlights: [
      { title: 'More Appointment Capture', body: 'Birmingham clinics can keep more inbound demand active when the phone is covered consistently.' },
      { title: 'Less Desk Congestion', body: 'Voice AI reduces the repetitive call load that strains smaller clinic teams.' },
      { title: 'Better Intake Structure', body: 'Staff receive clearer caller context before they join the conversation.' },
    ],
  },
  'voice-ai-for-telecommunication/new-orleans-la': {
    heroTitle: 'Voice AI for New Orleans telecom teams that need a stronger production story.',
    heroDescription:
      'New Orleans telecom providers and MSPs can use voice AI to improve inbound call handling, reduce overflow pressure, and give partners a more credible automation workflow to sell.',
    marketHeadline: 'Providers need more than demo-friendly AI to stand out.',
    marketBody:
      'New Orleans telecom teams usually need a stronger operational voice-AI story because partners care about routing quality, overflow handling, and how the workflow behaves under live load.',
    regionTitle: 'Provider teams need AI voice that fits telecom reality.',
    regionBody:
      'For New Orleans telecom organizations, voice AI helps answer faster, manage inbound volume better, and give MSP or channel teams a more production-ready offer.',
    localUseCases: [
      'Support New Orleans providers that want a better inbound voice-AI workflow for live customer calls.',
      'Reduce repetitive call volume while improving routing and first-contact handling.',
      'Give MSP and channel teams a more credible production-ready AI voice offer.',
      'Keep overflow and after-hours call handling active without relying on weak bolt-on tooling.',
    ],
    customHighlights: [
      { title: 'Provider-Grade Call Handling', body: 'New Orleans telecom teams can show a stronger AI story when routing and first-contact workflows hold up in production.' },
      { title: 'Partner Enablement', body: 'Voice AI is easier to sell when MSPs can tie it directly to call relief and customer-response outcomes.' },
      { title: 'Operational Fit', body: 'The workflow supports telecom realities like overflow, escalation, and high-volume inbound service needs.' },
    ],
  },
  'voice-ai-for-telecommunication/louisville-ky': {
    heroTitle: 'Voice AI for Louisville telecom teams that want stronger partner-ready automation.',
    heroDescription:
      'Louisville telecom providers, MSPs, and channel teams can use voice AI to improve inbound coverage, support overflow call handling, and position a more telecom-ready AI workflow.',
    marketHeadline: 'Telecom buyers notice the gap between checkbox AI and real operations fast.',
    marketBody:
      'Louisville telecom teams often need a stronger production story because partners and customers care about reliability, routing quality, and how the system performs at scale.',
    regionTitle: 'Regional providers need AI voice that fits the stack they already run.',
    regionBody:
      'For Louisville telecom organizations, voice AI helps reduce call congestion, improve first-contact handling, and support partner conversations with workflows that feel production-ready.',
    localUseCases: [
      'Support Louisville providers that want a better inbound AI voice workflow for live customer traffic.',
      'Reduce repetitive call volume while improving routing and overflow handling.',
      'Give MSP and channel teams a more credible telecom-ready automation story.',
      'Keep after-hours and overflow call handling active without weak demo-only features.',
    ],
    customHighlights: [
      { title: 'Telecom-Ready Operations', body: 'Louisville providers can differentiate with workflows built around real call handling instead of a feature checkbox.' },
      { title: 'Channel Support', body: 'Voice AI becomes easier to sell when partners can map it to concrete operational outcomes.' },
      { title: 'Stack Compatibility', body: 'The workflow fits telecom realities like high inbound volume, routing, and escalation.' },
    ],
  },
};

export function getVoiceAICityPageOverride(pageSlug: string, citySlug: string) {
  return voiceAICityPageOverrides[`${pageSlug}/${citySlug}`] ?? null;
}

function parsePopulation(population?: string): number | null {
  if (!population) return null;
  const normalized = population.trim().toUpperCase();
  const value = Number.parseFloat(normalized);
  if (Number.isNaN(value)) return null;
  if (normalized.endsWith('M')) return value * 1_000_000;
  if (normalized.endsWith('K')) return value * 1_000;
  return value;
}

function getCityTier(city: City): 'mega' | 'major' | 'regional' | 'local' {
  const population = parsePopulation(city.population);
  if (!population) return 'local';
  if (population >= 1_000_000) return 'mega';
  if (population >= 500_000) return 'major';
  if (population >= 250_000) return 'regional';
  return 'local';
}

const tierCopy = {
  mega: {
    headline: 'Large-market call volume needs better automation coverage.',
    body: 'Bigger metros create more simultaneous inbound demand, more routing pressure, and more after-hours lead leakage if the phones still depend on a small live team.',
    seo: 'Competing in a dense metro usually comes down to answering faster, sounding organized, and moving callers into the right workflow before they try the next provider.',
  },
  major: {
    headline: 'Response speed matters in fast-growing markets.',
    body: 'When local demand is spread across multiple neighborhoods and service areas, teams need a cleaner first response than voicemail or manual call screening can provide.',
    seo: 'Voice AI helps keep booking, qualification, and routing consistent even when inbound demand spikes during busy periods.',
  },
  regional: {
    headline: 'Mid-size markets reward the businesses that answer first.',
    body: 'In regional markets, missed calls usually turn into lost appointments or quote requests because customers expect a quick answer and a clear next step.',
    seo: 'A reliable AI front line helps smaller teams sound polished without adding receptionist headcount to every schedule gap.',
  },
  local: {
    headline: 'Local trust starts with how quickly you answer.',
    body: 'In smaller markets, one missed call can send a prospect to the next nearby option, so consistent call handling matters more than a perfect staffing model.',
    seo: 'Voice AI gives local teams a dependable first response without forcing owners or office staff to cover every ring themselves.',
  },
} as const;

const regionCopy = {
  northeast: {
    title: 'Dense markets reward the teams that answer with structure.',
    body: 'In the Northeast, callers often expect immediate answers, clear routing, and a more polished first response because there are usually multiple providers competing in the same market.',
  },
  southeast: {
    title: 'Fast-growing service areas create uneven call pressure.',
    body: 'Across the Southeast, businesses often manage expanding service footprints, higher after-hours demand, and lean teams that cannot keep every phone workflow perfectly staffed.',
  },
  midwest: {
    title: 'Operational consistency matters more than flashy call flows.',
    body: 'Midwestern teams often win by sounding dependable, routing calls correctly, and making sure customers get a clear next step without unnecessary transfers or callback delays.',
  },
  southwest: {
    title: 'Wide coverage areas create more intake complexity.',
    body: 'In the Southwest, businesses often serve broader territories, which makes initial qualification, service-area screening, and cleaner routing more important on the first call.',
  },
  west: {
    title: 'Digital-first expectations raise the bar for phone response.',
    body: 'On the West Coast, customers usually expect the same speed and clarity on the phone that they expect from online booking and digital support workflows.',
  },
  mountain: {
    title: 'Distributed markets need steadier call coverage.',
    body: 'Mountain-region businesses often support multiple nearby communities with smaller teams, so voice AI helps keep the first response active without overstaffing every location.',
  },
} as const;

function getRegionKey(city: City): keyof typeof regionCopy {
  const northeast = new Set(['NY', 'NJ', 'PA', 'MA', 'CT', 'RI', 'NH', 'VT', 'ME']);
  const southeast = new Set(['VA', 'NC', 'SC', 'GA', 'FL', 'TN', 'AL', 'MS', 'LA', 'KY', 'WV', 'MD', 'DC']);
  const midwest = new Set(['OH', 'MI', 'IN', 'IL', 'WI', 'MN', 'IA', 'MO', 'KS', 'NE', 'SD', 'ND']);
  const southwest = new Set(['TX', 'AZ', 'NM', 'OK']);
  const west = new Set(['CA', 'WA', 'OR', 'NV']);
  const mountain = new Set(['CO', 'UT', 'ID', 'MT', 'WY']);

  if (northeast.has(city.stateAbbr)) return 'northeast';
  if (southeast.has(city.stateAbbr)) return 'southeast';
  if (midwest.has(city.stateAbbr)) return 'midwest';
  if (southwest.has(city.stateAbbr)) return 'southwest';
  if (west.has(city.stateAbbr)) return 'west';
  if (mountain.has(city.stateAbbr)) return 'mountain';
  return 'west';
}

export const voiceAIIndustryPages: VoiceAIIndustryPage[] = [
  {
    slug: 'voice-ai-for-healthcare-page',
    label: 'Healthcare',
    eyebrow: 'Healthcare',
    heroTitle: 'Voice AI for healthcare teams that need better patient access.',
    heroDescription:
      'Help patients book, reschedule, ask routine questions, and reach the right office workflow without keeping the front desk pinned to the phone all day.',
    image: brandPhotos.voiceSearch,
    imageAlt: 'UponAI healthcare voice workflow support',
    stats: [
      { value: '24/7', label: 'Patient call coverage' },
      { value: '0', label: 'Voicemail-first workflows' },
      { value: 'Live', label: 'Scheduling and routing' },
      { value: 'HIPAA', label: 'Ready operational design' },
    ],
    workflowMoments: [
      {
        title: 'Patient Access',
        body: 'Capture appointment requests, office questions, and new-patient calls before they turn into missed opportunities.',
      },
      {
        title: 'Front-Desk Relief',
        body: 'Absorb repetitive scheduling and information requests so staff can stay focused on check-ins, paperwork, and in-office care.',
      },
      {
        title: 'Clear Escalation',
        body: 'Urgent calls and higher-touch scenarios can be routed to the right person with collected context instead of forcing patients to repeat themselves.',
      },
    ],
    capabilityCards: [
      {
        title: 'Scheduling and Rescheduling',
        body: 'Book, move, or cancel appointments while collecting the details staff usually have to gather manually.',
      },
      {
        title: 'Routine Patient Questions',
        body: 'Handle hours, providers, prep instructions, office info, and insurance basics without adding more front-desk pressure.',
      },
      {
        title: 'Insurance and Intake Capture',
        body: 'Collect the first layer of intake information so the live team starts with context instead of starting from zero.',
      },
      {
        title: 'After-Hours Coverage',
        body: 'Keep patient communication active outside office hours instead of forcing every late call into voicemail.',
      },
    ],
    outcomes: [
      'Reduce front-desk interruptions during peak clinic hours',
      'Answer patient questions without adding another receptionist seat',
      'Capture appointment demand after hours and during lunch breaks',
      'Route urgent scenarios with context instead of a blind transfer',
      'Standardize how new-patient and returning-patient calls get handled',
      'Create a more professional patient experience across every call',
    ],
    faqs: [
      {
        question: 'What healthcare calls should voice AI handle first?',
        answer:
          'The best starting point is usually repetitive front-desk volume: appointments, hours, provider availability, office directions, and routine intake questions.',
      },
      {
        question: 'Can the system transfer callers to live staff?',
        answer:
          'Yes. Workflows can escalate urgent, sensitive, or higher-complexity conversations to a live person with the collected context attached.',
      },
      {
        question: 'Is this meant to replace the front desk?',
        answer:
          'No. The goal is to remove repetitive phone pressure so staff can focus on care delivery, in-person patients, and conversations that need human judgment.',
      },
      {
        question: 'Can healthcare teams keep integrations in scope?',
        answer:
          'Yes. UponAI can support healthcare workflow integrations where needed, but most deployments start with patient access, scheduling, and front-desk relief first.',
      },
    ],
    localUseCaseTemplates: [
      'Handle appointment calls for {location} patients without forcing everything into voicemail.',
      'Answer routine office and insurance questions before they interrupt your staff.',
      'Collect intake details for {state} practices that want cleaner handoffs to schedulers or coordinators.',
      'Keep after-hours patient communication active when the front desk is offline.',
    ],
    cityLead: 'UponAI helps healthcare teams in',
    citySupport:
      'manage patient access, scheduling, routing, and after-hours coverage with a more responsive voice workflow.',
    ctaHeading: 'Ready to improve patient access?',
    ctaSubheading:
      'Book a demo to see how voice AI can support scheduling, office questions, patient routing, and healthcare call coverage.',
    integrations: {
      title: 'Explore healthcare integrations when you are ready.',
      body:
        'Healthcare teams often start with patient access and front-desk relief, then expand into integrations for intake, scheduling, follow-up, and records workflows.',
      examples: [
        'EHR and EMR systems',
        'Scheduling platforms',
        'Patient intake tools',
        'Insurance verification workflows',
        'HIPAA-ready messaging flows',
        'Analytics and reporting layers',
      ],
      href: 'https://main.d2ern4ztpaq5h2.amplifyapp.com',
      hrefLabel: 'Open Integration Catalog',
    },
  },
  {
    slug: 'voice-ai-for-insurance-page',
    label: 'Insurance',
    eyebrow: 'Insurance',
    heroTitle: 'Voice AI for insurance teams that need faster intake and cleaner handoffs.',
    heroDescription:
      'Answer quote requests, route policy service calls, and capture first-contact details before a live producer or account manager steps in.',
    image: brandPhotos.analyticsWorld,
    imageAlt: 'UponAI voice AI for insurance teams',
    stats: [
      { value: '< 1 min', label: 'Faster first response' },
      { value: '24/7', label: 'Lead capture coverage' },
      { value: 'Policy', label: 'Service call routing' },
      { value: 'Live', label: 'Producer handoff' },
    ],
    workflowMoments: [
      {
        title: 'Quote Intake',
        body: 'Capture new quote requests immediately, collect the basics, and move qualified callers into the right sales workflow.',
      },
      {
        title: 'Policy Service',
        body: 'Separate billing, coverage, policy update, and claims-related calls before they hit the wrong desk.',
      },
      {
        title: 'Renewal Support',
        body: 'Use voice AI to schedule callbacks, follow-up conversations, and renewal outreach without missed inbound demand.',
      },
    ],
    capabilityCards: [
      {
        title: 'New Quote Qualification',
        body: 'Capture policy type, urgency, and contact details so producers spend time on better-qualified opportunities.',
      },
      {
        title: 'Claims and Service Routing',
        body: 'Move callers into the right claims, billing, or service flow instead of bouncing them between team members.',
      },
      {
        title: 'After-Hours Lead Capture',
        body: 'Keep quote requests active after the office closes so speed-to-lead does not depend on business hours.',
      },
      {
        title: 'Callback Scheduling',
        body: 'Set clear next steps when a licensed agent or account manager needs to take over the conversation.',
      },
    ],
    outcomes: [
      'Respond to inbound quote demand before leads cool off',
      'Reduce time spent on repetitive policy service questions',
      'Route claims, billing, and sales conversations more cleanly',
      'Give producers better context before every callback',
      'Support smaller agencies without expanding front-desk staffing',
      'Create more consistent intake across carriers and product lines',
    ],
    faqs: [
      {
        question: 'Can voice AI separate service calls from sales calls?',
        answer:
          'Yes. Insurance teams usually start by separating quote requests, policy service, claims-related calls, and billing questions into cleaner workflows.',
      },
      {
        question: 'Is this useful for small agencies?',
        answer:
          'Yes. Smaller agencies often benefit the most because AI keeps first-response coverage active without forcing owners or producers to answer every inbound call.',
      },
      {
        question: 'Can callers still reach a licensed agent?',
        answer:
          'Absolutely. The system can qualify, collect context, and then transfer or schedule the right next step with a live licensed team member.',
      },
      {
        question: 'Where do agencies usually start?',
        answer:
          'Most agencies start with new quote intake, after-hours coverage, and policy service routing before expanding into more complex workflows.',
      },
    ],
    localUseCaseTemplates: [
      'Capture quote requests for {location} prospects before they reach another agency.',
      'Separate claims, billing, and policy service calls before they hit the wrong desk.',
      'Schedule callbacks for {state} producers and account managers with cleaner context.',
      'Keep insurance lead response active after hours, during lunch, and during busy renewal windows.',
    ],
    cityLead: 'UponAI helps insurance agencies in',
    citySupport:
      'capture quote requests faster, route policy service conversations more cleanly, and reduce missed opportunities.',
    ctaHeading: 'Want a faster insurance first response?',
    ctaSubheading:
      'Book a demo to see how voice AI can qualify quote requests, route service calls, and keep policy conversations moving.',
  },
  {
    slug: 'voice-ai-for-home-services-page',
    label: 'Home Services',
    eyebrow: 'Home Services',
    heroTitle: 'Voice AI for home services teams that cannot afford missed calls.',
    heroDescription:
      'Answer emergency requests, screen job types, and schedule the next step while your dispatchers and field crews stay focused on the work in front of them.',
    image: brandPhotos.chatbotPhone,
    imageAlt: 'UponAI voice AI for home services call handling',
    stats: [
      { value: '24/7', label: 'Job intake coverage' },
      { value: 'Field', label: 'Dispatcher relief' },
      { value: 'Same-day', label: 'Booking support' },
      { value: 'Live', label: 'Emergency escalation' },
    ],
    workflowMoments: [
      {
        title: 'After-Hours Job Capture',
        body: 'Keep emergency and next-day service demand active when the office is closed and your team is already in the field.',
      },
      {
        title: 'Dispatch Support',
        body: 'Collect the job type, urgency, and location details before a dispatcher or CSR needs to take the call.',
      },
      {
        title: 'Booking and Routing',
        body: 'Move routine service inquiries into the right trade or schedule path instead of relying on a generic voicemail box.',
      },
    ],
    capabilityCards: [
      {
        title: 'Trade-Specific Intake',
        body: 'Separate plumbing, HVAC, electrical, roofing, and general service demand with cleaner intake logic.',
      },
      {
        title: 'Urgency Detection',
        body: 'Spot emergency situations and trigger the right on-call or live escalation path immediately.',
      },
      {
        title: 'Service Area Screening',
        body: 'Confirm coverage area, job type, and caller intent before the request reaches your dispatch workflow.',
      },
      {
        title: 'Appointment Scheduling',
        body: 'Book estimate calls, maintenance visits, and service windows without forcing every lead into manual callback.',
      },
    ],
    outcomes: [
      'Capture more inbound jobs when crews are busy',
      'Reduce dispatcher interruptions on repetitive questions',
      'Filter service requests before they hit the scheduling board',
      'Improve after-hours response for emergency and urgent calls',
      'Give office staff cleaner details before they call back',
      'Create a more professional intake experience for every trade',
    ],
    faqs: [
      {
        question: 'Does this work for multiple trades?',
        answer:
          'Yes. Home services teams can route by trade, urgency, service area, and booking type so HVAC, plumbing, electrical, and related workflows stay organized.',
      },
      {
        question: 'Can urgent jobs escalate to a live person?',
        answer:
          'Yes. Urgent or emergency scenarios can trigger the right on-call or dispatcher path instead of waiting in voicemail.',
      },
      {
        question: 'Is voice AI only for large call centers?',
        answer:
          'No. Smaller home services teams often get the biggest benefit because AI keeps intake moving while a limited office staff handles active jobs.',
      },
      {
        question: 'Where should contractors start?',
        answer:
          'Most teams start with after-hours call capture, basic job screening, and appointment or callback scheduling.',
      },
    ],
    localUseCaseTemplates: [
      'Capture emergency and same-day service calls in {location} before they roll to voicemail.',
      'Screen job type, urgency, and address details before dispatch takes over.',
      'Support {state} service teams with cleaner callback scheduling and booking intake.',
      'Keep inbound demand active when technicians are on site and office staff is stretched thin.',
    ],
    cityLead: 'UponAI helps home services teams in',
    citySupport:
      'answer more inbound job requests, support dispatch, and keep after-hours opportunities from slipping away.',
    ctaHeading: 'Need fewer missed service calls?',
    ctaSubheading:
      'Book a demo to see how voice AI can support dispatch, booking, emergency intake, and after-hours call coverage.',
  },
  {
    slug: 'voice-ai-real-estate',
    label: 'Real Estate',
    eyebrow: 'Real Estate',
    heroTitle: 'Voice AI for real estate teams that need faster lead response.',
    heroDescription:
      'Qualify listing inquiries, capture buying intent, and route prospects to the right agent before the opportunity cools off.',
    image: brandPhotos.connectedGlobe,
    imageAlt: 'UponAI voice AI for real estate teams',
    stats: [
      { value: 'Instant', label: 'Listing response' },
      { value: 'Buyer', label: 'Qualification intake' },
      { value: 'Seller', label: 'Lead routing' },
      { value: '24/7', label: 'Inquiry coverage' },
    ],
    workflowMoments: [
      {
        title: 'Listing Inquiry Response',
        body: 'Respond immediately when a prospect calls about a property, community, or showing request.',
      },
      {
        title: 'Buyer and Seller Qualification',
        body: 'Collect budget, timeline, property interest, and motivation before an agent steps into the conversation.',
      },
      {
        title: 'Agent Handoff',
        body: 'Route the caller to the right agent, team, or next step instead of forcing every inquiry through the same office line.',
      },
    ],
    capabilityCards: [
      {
        title: 'Showing Request Capture',
        body: 'Handle showing requests, callback scheduling, and listing questions without slow lead follow-up.',
      },
      {
        title: 'Buyer Qualification',
        body: 'Surface budget, neighborhoods, and timing details that help agents prioritize the right conversations.',
      },
      {
        title: 'Seller Lead Intake',
        body: 'Collect the basics from homeowner inquiries before routing them into valuation or listing workflows.',
      },
      {
        title: 'After-Hours Coverage',
        body: 'Keep listing and buyer demand active on evenings and weekends when many real estate calls actually happen.',
      },
    ],
    outcomes: [
      'Reduce the lag between inquiry and first response',
      'Give agents more context before every callback',
      'Qualify buyers and sellers more consistently',
      'Support teams, brokerages, and solo agents with a cleaner intake layer',
      'Capture weekend and after-hours demand without extra staffing',
      'Route listing inquiries to the right market expert faster',
    ],
    faqs: [
      {
        question: 'Can voice AI help with showing requests?',
        answer:
          'Yes. Real estate teams often start with listing inquiries, showing requests, buyer qualification, and after-hours capture.',
      },
      {
        question: 'Does this replace agents?',
        answer:
          'No. The goal is to create a faster, cleaner first response so agents spend more time on active opportunities and less time reconstructing basic lead context.',
      },
      {
        question: 'Can it route leads to different agents or teams?',
        answer:
          'Yes. Routing can be based on market, team, lead type, or any handoff logic that fits the brokerage or agency structure.',
      },
      {
        question: 'Why is after-hours useful in real estate?',
        answer:
          'Because many buyer and seller inquiries happen outside office hours, and speed-to-lead often determines which agent gets the opportunity.',
      },
    ],
    localUseCaseTemplates: [
      'Capture property inquiries from {location} buyers before they cool off.',
      'Screen budget, timing, and property intent before a live agent takes over.',
      'Route seller and valuation calls for {state} teams into the right follow-up path.',
      'Keep weekend and evening real estate demand active without another receptionist layer.',
    ],
    cityLead: 'UponAI helps real estate teams in',
    citySupport:
      'respond faster to buyer and seller inquiries, qualify leads more cleanly, and route prospects to the right agent.',
    ctaHeading: 'Want faster listing lead response?',
    ctaSubheading:
      'Book a demo to see how voice AI can support buyer qualification, seller intake, showing requests, and real estate lead routing.',
  },
  {
    slug: 'voice-ai-for-legal-services',
    label: 'Legal Services',
    eyebrow: 'Legal Services',
    heroTitle: 'Voice AI for legal teams that need a stronger intake experience.',
    heroDescription:
      'Capture new matter inquiries, route current-client calls, and organize first-contact information before your staff spends time on the phone.',
    image: brandPhotos.neuralCore,
    imageAlt: 'UponAI voice AI for legal services',
    stats: [
      { value: '24/7', label: 'Intake coverage' },
      { value: 'Current', label: 'Client call routing' },
      { value: 'Matter', label: 'Lead qualification' },
      { value: 'Live', label: 'Attorney escalation' },
    ],
    workflowMoments: [
      {
        title: 'New Client Intake',
        body: 'Capture matter type, urgency, and contact details before the intake coordinator or attorney has to take the call.',
      },
      {
        title: 'Current Client Routing',
        body: 'Separate existing-client updates from new matter inquiries so calls reach the right workflow faster.',
      },
      {
        title: 'After-Hours Coverage',
        body: 'Keep inbound intake active when the office is closed so urgent legal matters do not disappear into voicemail.',
      },
    ],
    capabilityCards: [
      {
        title: 'Practice Area Screening',
        body: 'Route family law, personal injury, estate, business, immigration, or criminal defense inquiries more accurately.',
      },
      {
        title: 'Urgency Triage',
        body: 'Flag time-sensitive matters and route them into the right escalation path instead of treating every call the same.',
      },
      {
        title: 'Client Status Routing',
        body: 'Separate current-client, opposing-party, referral, and new-intake conversations before staff picks up.',
      },
      {
        title: 'Consult Scheduling',
        body: 'Set consultations or callbacks with better context so legal teams can prioritize the right next step.',
      },
    ],
    outcomes: [
      'Make new client intake more consistent',
      'Reduce staff time spent on repetitive screening questions',
      'Capture more viable legal matters after hours',
      'Improve routing between current clients and new inquiries',
      'Give attorneys and intake staff clearer first-call context',
      'Create a more polished intake experience across practice areas',
    ],
    faqs: [
      {
        question: 'Can legal teams separate current clients from new prospects?',
        answer:
          'Yes. That is one of the most common starting points because it improves routing and prevents the intake team from losing time on the wrong calls.',
      },
      {
        question: 'Can time-sensitive matters escalate?',
        answer:
          'Yes. Urgent scenarios can be routed into a live escalation or priority callback path instead of waiting like a standard inquiry.',
      },
      {
        question: 'Is this only for large firms?',
        answer:
          'No. Smaller firms and boutique practices often benefit because AI keeps intake organized without requiring a larger receptionist team.',
      },
      {
        question: 'Where should a legal workflow start?',
        answer:
          'Most firms start with new client intake, consultation scheduling, and after-hours coverage for the practice areas with the most inbound demand.',
      },
    ],
    localUseCaseTemplates: [
      'Capture new matter inquiries in {location} before they get lost in voicemail or email.',
      'Separate current-client calls from new intake before staff takes over.',
      'Support {state} firms with cleaner consultation scheduling and callback workflows.',
      'Keep urgent legal inquiries active outside office hours without expanding front-desk staffing.',
    ],
    cityLead: 'UponAI helps legal teams in',
    citySupport:
      'create cleaner intake, route current-client calls more efficiently, and capture more new matter opportunities.',
    ctaHeading: 'Need a better legal intake workflow?',
    ctaSubheading:
      'Book a demo to see how voice AI can support legal intake, consultation scheduling, after-hours coverage, and client routing.',
  },
  {
    slug: 'voice-ai-veterinary-clinics',
    label: 'Veterinary Clinics',
    eyebrow: 'Veterinary',
    heroTitle: 'Voice AI for veterinary clinics that need calmer phones and cleaner intake.',
    heroDescription:
      'Handle appointment requests, prescription questions, routine pet-owner calls, and urgent routing without forcing the front desk to absorb every interruption.',
    image: brandPhotos.humanRobotBlue,
    imageAlt: 'UponAI voice AI for veterinary clinics',
    stats: [
      { value: '24/7', label: 'Pet owner call coverage' },
      { value: 'Clinic', label: 'Front-desk relief' },
      { value: 'Urgent', label: 'Call prioritization' },
      { value: 'Live', label: 'Staff handoff' },
    ],
    workflowMoments: [
      {
        title: 'Scheduling and Rescheduling',
        body: 'Handle routine appointment demand, cancellations, and callback requests without pulling staff off active care and check-ins.',
      },
      {
        title: 'Routine Pet Owner Questions',
        body: 'Answer hours, directions, basic service questions, refill-request guidance, and other repetitive calls faster.',
      },
      {
        title: 'Urgent Call Routing',
        body: 'Identify higher-priority concerns and move them into the right escalation path instead of letting every call sit in the same queue.',
      },
    ],
    capabilityCards: [
      {
        title: 'Appointment Intake',
        body: 'Capture the pet name, visit type, urgency, and caller details before reception or tech staff takes over.',
      },
      {
        title: 'Medication and Refill Guidance',
        body: 'Handle the first layer of refill and prescription-related questions so routine requests do not overwhelm the clinic line.',
      },
      {
        title: 'Urgency Screening',
        body: 'Separate routine questions from urgent concerns that need a live staff member right away.',
      },
      {
        title: 'After-Hours Coverage',
        body: 'Keep owner communication active outside clinic hours instead of relying entirely on voicemail and callbacks.',
      },
    ],
    outcomes: [
      'Reduce front-desk interruption during busy clinic hours',
      'Capture appointment demand more consistently',
      'Answer repetitive pet-owner questions faster',
      'Route urgent concerns with cleaner context',
      'Improve the phone experience without adding another receptionist seat',
      'Give staff more room to focus on patients already in the clinic',
    ],
    faqs: [
      {
        question: 'Can veterinary clinics use voice AI for routine scheduling?',
        answer:
          'Yes. Many clinics start with appointment calls, routine questions, refill guidance, and after-hours coverage because that is where repetitive call pressure builds fastest.',
      },
      {
        question: 'Can urgent pet concerns still reach a person?',
        answer:
          'Yes. The workflow can identify urgent scenarios and route them to the right live escalation path instead of treating every call the same way.',
      },
      {
        question: 'Is this useful for smaller clinics?',
        answer:
          'Yes. Smaller clinics often benefit the most because voice AI gives them steadier phone coverage without expanding front-desk staffing.',
      },
      {
        question: 'Does this replace the reception team?',
        answer:
          'No. The goal is to remove repetitive phone pressure so the clinic team can focus on care, in-person visits, and higher-touch conversations.',
      },
    ],
    localUseCaseTemplates: [
      'Handle routine appointment requests from {location} pet owners without overwhelming the front desk.',
      'Answer common clinic questions and refill-related calls before staff has to step in.',
      'Route urgent concerns for {state} veterinary teams into the right live escalation path.',
      'Keep pet-owner communication active after hours and during busy appointment blocks.',
    ],
    cityLead: 'UponAI helps veterinary clinics in',
    citySupport:
      'support scheduling, reduce front-desk interruptions, and route urgent pet-owner calls more cleanly.',
    ctaHeading: 'Want calmer clinic phones?',
    ctaSubheading:
      'Book a demo to see how voice AI can support appointment intake, routine pet-owner questions, and veterinary call routing.',
  },
  {
    slug: 'for-restaurant-page',
    label: 'Restaurants',
    eyebrow: 'Restaurants',
    heroTitle: 'Voice AI for restaurants that cannot keep losing calls during the rush.',
    heroDescription:
      'Handle reservation requests, hours and menu questions, and private-event inquiries without pulling staff off the floor or the front counter.',
    image: brandPhotos.chatHand,
    imageAlt: 'UponAI voice AI for restaurants',
    stats: [
      { value: 'Rush-hour', label: 'Call overflow relief' },
      { value: 'Reservation', label: 'Request capture' },
      { value: '24/7', label: 'Guest question coverage' },
      { value: 'Live', label: 'Manager escalation' },
    ],
    workflowMoments: [
      {
        title: 'Reservation Capture',
        body: 'Keep reservation requests, callback requests, and party inquiries moving when the dining room is busy.',
      },
      {
        title: 'Guest Question Handling',
        body: 'Answer routine questions about hours, menus, parking, delivery, catering, and location details immediately.',
      },
      {
        title: 'Private Dining and Events',
        body: 'Route larger catering or event conversations into the right manager or sales follow-up workflow.',
      },
    ],
    capabilityCards: [
      {
        title: 'Reservation and Waitlist Support',
        body: 'Capture reservation requests and next-step information without forcing every call to a host stand under pressure.',
      },
      {
        title: 'Menu and Hours Questions',
        body: 'Handle common guest questions instantly so staff can stay focused on service.',
      },
      {
        title: 'Catering and Event Intake',
        body: 'Collect event size, timing, and contact details before management follows up.',
      },
      {
        title: 'After-Hours Call Coverage',
        body: 'Keep guest communication active even after close or before open when customers still call with questions and booking requests.',
      },
    ],
    outcomes: [
      'Reduce missed calls during peak service windows',
      'Keep front-of-house staff focused on guests instead of repetitive phone work',
      'Capture reservation and private event demand more consistently',
      'Answer routine guest questions without another host or receptionist seat',
      'Support multi-location teams with a cleaner first response',
      'Create a more polished guest experience from the first call onward',
    ],
    faqs: [
      {
        question: 'Can voice AI handle reservations?',
        answer:
          'Yes. Restaurants often start with reservation capture, routine guest questions, and overflow coverage during peak service windows.',
      },
      {
        question: 'Can it help with private dining or catering inquiries?',
        answer:
          'Yes. Voice AI can collect event basics and route the opportunity to the right manager or sales contact for follow-up.',
      },
      {
        question: 'Does this replace the host stand?',
        answer:
          'No. The goal is to keep the host stand focused on in-person guests while AI covers repetitive call volume and overflow.',
      },
      {
        question: 'Why does after-hours coverage matter for restaurants?',
        answer:
          'Because people still call before opening, after closing, and outside rush windows with reservation, event, or location questions that can turn into lost revenue.',
      },
    ],
    localUseCaseTemplates: [
      'Capture reservations and guest questions from {location} callers during the lunch and dinner rush.',
      'Answer routine menu, hours, parking, and location questions without tying up the host stand.',
      'Route catering and private-event leads for {state} restaurant teams into a cleaner follow-up workflow.',
      'Keep guest communication active before open, after close, and during peak service windows.',
    ],
    cityLead: 'UponAI helps restaurants in',
    citySupport:
      'reduce missed calls, support reservations, and handle guest questions without pulling staff away from service.',
    ctaHeading: 'Need fewer missed guest calls?',
    ctaSubheading:
      'Book a demo to see how voice AI can support reservations, guest questions, private events, and restaurant call overflow.',
  },
  {
    slug: 'voice-ai-for-telecommunication',
    label: 'Telecommunications',
    eyebrow: 'Telecommunications',
    heroTitle: 'Voice AI for telecom teams that manage large call volumes and repetitive front-line demand.',
    heroDescription:
      'Support sales inquiries, provisioning questions, billing calls, and service routing with a voice workflow built for high-volume communications businesses.',
    image: brandPhotos.mobileBrain,
    imageAlt: 'UponAI voice AI for telecommunications teams',
    stats: [
      { value: 'High-volume', label: 'Inbound handling' },
      { value: 'Multi-team', label: 'Routing support' },
      { value: '24/7', label: 'Front-line coverage' },
      { value: 'Live', label: 'Escalation paths' },
    ],
    workflowMoments: [
      {
        title: 'Sales and Provisioning Intake',
        body: 'Separate new-customer questions, quoting, provisioning requests, and account updates before they reach the wrong queue.',
      },
      {
        title: 'Billing and Support Routing',
        body: 'Sort repetitive support and billing conversations by intent so callers get to the right team faster.',
      },
      {
        title: 'Overflow and After-Hours Coverage',
        body: 'Keep inbound communication active during spikes, service events, and after-hours windows when traditional front-line staffing falls behind.',
      },
    ],
    capabilityCards: [
      {
        title: 'Intent-Based Call Sorting',
        body: 'Route provisioning, support, sales, billing, and account-management calls into cleaner telecom workflows.',
      },
      {
        title: 'Carrier and Service Question Handling',
        body: 'Answer the first layer of repetitive service, feature, and plan questions without tying up live teams.',
      },
      {
        title: 'Escalation by Priority',
        body: 'Move outages, urgent escalations, or high-value account requests into the right live support path immediately.',
      },
      {
        title: 'Operational Overflow Relief',
        body: 'Keep large inbound waves from overwhelming your agents during peak periods, launches, or issue spikes.',
      },
    ],
    outcomes: [
      'Reduce repetitive front-line telecom call handling',
      'Route sales, support, billing, and provisioning calls more accurately',
      'Improve responsiveness during high-volume periods',
      'Capture account intent before live teams step in',
      'Support growing telecom operations without expanding every queue at once',
      'Create a cleaner first-contact experience across service lines',
    ],
    faqs: [
      {
        question: 'Is voice AI useful for telecom businesses with existing support teams?',
        answer:
          'Yes. It works well as a front-line layer that sorts intent, handles repetitive questions, and routes calls more intelligently before a live team takes over.',
      },
      {
        question: 'Can telecom teams use it for both sales and support?',
        answer:
          'Yes. Most teams start by separating sales, provisioning, billing, and support into clearer workflows so callers do not bounce between queues.',
      },
      {
        question: 'What about outage or urgent service calls?',
        answer:
          'Urgent or high-priority calls can be routed into dedicated escalation paths instead of waiting behind routine inquiries.',
      },
      {
        question: 'Where should a telecom workflow start?',
        answer:
          'Most telecom teams start with front-line intent detection, queue reduction, and overflow handling before expanding deeper into more specialized workflows.',
      },
    ],
    localUseCaseTemplates: [
      'Sort support, billing, provisioning, and sales calls for {location} telecom operations before they hit the wrong queue.',
      'Handle repetitive service questions without forcing every inbound call to a live agent.',
      'Support high-volume {state} telecom teams with cleaner overflow and escalation routing.',
      'Keep customer communication active during spikes, launches, and after-hours periods.',
    ],
    cityLead: 'UponAI helps telecommunications teams in',
    citySupport:
      'route inbound demand more accurately, reduce repetitive call pressure, and support high-volume front-line communication.',
    ctaHeading: 'Need cleaner telecom call routing?',
    ctaSubheading:
      'Book a demo to see how voice AI can support telecom sales, support, provisioning, and overflow handling.',
  },
  {
    slug: 'voice-ai-for-dental-offices',
    label: 'Dental Offices',
    eyebrow: 'Dental',
    heroTitle: 'Voice AI for dental offices that need stronger scheduling and fewer missed calls.',
    heroDescription:
      'Handle appointment requests, insurance questions, recall workflows, and after-hours patient calls without turning every front-desk gap into voicemail.',
    image: brandPhotos.brainTouch,
    imageAlt: 'UponAI voice AI for dental offices',
    stats: [
      { value: '24/7', label: 'Patient call coverage' },
      { value: 'Chair-side', label: 'Front-desk relief' },
      { value: 'Recall', label: 'Scheduling support' },
      { value: 'Live', label: 'Insurance handoff' },
    ],
    workflowMoments: [
      {
        title: 'Appointment Scheduling',
        body: 'Capture new patient, hygiene, emergency, and reschedule calls before they create gaps in the schedule.',
      },
      {
        title: 'Insurance and Office Questions',
        body: 'Handle routine coverage questions, office info, and next-step guidance without pulling staff away from patients already in the office.',
      },
      {
        title: 'After-Hours and Recall Support',
        body: 'Keep patient communication active after hours and support recall or follow-up workflows without another full-time front-desk seat.',
      },
    ],
    capabilityCards: [
      {
        title: 'New Patient Intake',
        body: 'Collect visit type, availability, and caller details so the team starts with context instead of a blank callback list.',
      },
      {
        title: 'Hygiene and Recall Booking',
        body: 'Support routine cleaning and recall scheduling so the office can keep the calendar moving more consistently.',
      },
      {
        title: 'Insurance and Prep Questions',
        body: 'Answer the first layer of insurance, paperwork, and appointment-prep questions before a staff handoff.',
      },
      {
        title: 'Urgent Dental Routing',
        body: 'Move urgent tooth pain or same-day needs into the right live escalation or callback path faster.',
      },
    ],
    outcomes: [
      'Reduce missed calls during busy treatment hours',
      'Support scheduling without expanding front-desk headcount',
      'Handle repetitive insurance and office questions faster',
      'Improve recall and follow-up communication coverage',
      'Give staff cleaner details before every callback',
      'Create a smoother first phone experience for new and returning patients',
    ],
    faqs: [
      {
        question: 'Can dental offices use voice AI mainly for scheduling?',
        answer:
          'Yes. Most dental teams start with appointment booking, routine insurance questions, and after-hours patient calls because those create the biggest front-desk pressure.',
      },
      {
        question: 'Can urgent dental calls still reach staff quickly?',
        answer:
          'Yes. The workflow can separate urgent needs from routine scheduling and route those situations into the right live path.',
      },
      {
        question: 'Is this useful for smaller practices?',
        answer:
          'Yes. Smaller dental offices often benefit because AI gives them steadier phone coverage without another full-time scheduling seat.',
      },
      {
        question: 'Does it replace the office team?',
        answer:
          'No. It supports the office team by handling repetitive call pressure and gathering context before a live person takes over.',
      },
    ],
    localUseCaseTemplates: [
      'Capture appointment requests from {location} patients before they become missed calls.',
      'Handle routine insurance and office questions without interrupting the front desk all day.',
      'Support recall, hygiene, and follow-up scheduling for {state} dental teams.',
      'Keep patient communication active after hours and during busy chair-side periods.',
    ],
    cityLead: 'UponAI helps dental offices in',
    citySupport:
      'reduce missed calls, support scheduling, and answer routine patient questions with a more responsive voice workflow.',
    ctaHeading: 'Need better dental scheduling coverage?',
    ctaSubheading:
      'Book a demo to see how voice AI can support appointment booking, recall workflows, insurance questions, and dental call routing.',
  },
];

export function getVoiceAIIndustryPage(slug: string): VoiceAIIndustryPage | undefined {
  return voiceAIIndustryPages.find((page) => page.slug === slug);
}

export function requireVoiceAIIndustryPage(slug: string): VoiceAIIndustryPage {
  const page = getVoiceAIIndustryPage(slug);
  if (!page) {
    throw new Error(`Unknown voice AI industry page: ${slug}`);
  }
  return page;
}

export function getFeaturedCities(limit = 18): City[] {
  const focusSet = new Set(seoFocusCitySlugs);
  const focusCities = seoFocusCitySlugs
    .map((slug) => cities.find((city) => city.slug === slug))
    .filter((city): city is City => Boolean(city));
  const remainingCities = [...cities]
    .filter((city) => !focusSet.has(city.slug as (typeof seoFocusCitySlugs)[number]))
    .sort((left, right) => (parsePopulation(right.population) ?? 0) - (parsePopulation(left.population) ?? 0));

  return [...focusCities, ...remainingCities].slice(0, limit);
}

export function getNearbyCities(city: City, limit = 8): City[] {
  return cities.filter((item) => item.stateAbbr === city.stateAbbr && item.slug !== city.slug).slice(0, limit);
}

export function formatVoiceAITemplate(template: string, city: City): string {
  return template
    .replaceAll('{city}', city.name)
    .replaceAll('{state}', city.state)
    .replaceAll('{location}', formatCityState(city));
}

export function getCityMarketNarrative(city: City): { headline: string; body: string; seo: string } {
  return tierCopy[getCityTier(city)];
}

export function getCityRegionNarrative(city: City): { title: string; body: string } {
  return regionCopy[getRegionKey(city)];
}

export function getLegacyVoiceAIContent(slug: string): VoiceAILegacyContent | null {
  const page = getUponAIPage(slug);
  if (!page) return null;

  const hasLegacyContent = page.highlights.length > 0 || page.sections.length > 0;
  if (!hasLegacyContent) return null;

  return {
    highlights: page.highlights,
    sections: page.sections,
  };
}
