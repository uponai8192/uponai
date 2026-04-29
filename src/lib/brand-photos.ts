export const brandPhotos = {
  patternRecognition: '/brand-photos/ai-pattern-recognition.jpeg',
  mobileBrain: '/brand-photos/mobile-ai-brain.jpeg',
  humanRobotBlue: '/brand-photos/ai-human-robot-blue.jpeg',
  brainTouch: '/brand-photos/ai-brain-touch.jpeg',
  analyticsWorld: '/brand-photos/ai-analytics-world.jpeg',
  connectedGlobe: '/brand-photos/connected-globe.jpeg',
  chatbotPhone: '/brand-photos/chatbot-phone.jpeg',
  voiceMic: '/brand-photos/ai-voice-mic.jpeg',
  neuralCore: '/brand-photos/neural-core.jpeg',
  voiceSearch: '/brand-photos/voice-search-phone.jpeg',
  chatHand: '/brand-photos/chat-ai-hand.jpeg',
  humanRobotPurple: '/brand-photos/ai-human-robot-purple.jpeg',
} as const;

export const rotatingBrandPhotos = [
  brandPhotos.voiceMic,
  brandPhotos.chatbotPhone,
  brandPhotos.voiceSearch,
  brandPhotos.mobileBrain,
  brandPhotos.connectedGlobe,
  brandPhotos.analyticsWorld,
  brandPhotos.chatHand,
  brandPhotos.humanRobotBlue,
  brandPhotos.brainTouch,
  brandPhotos.patternRecognition,
];

export const offsetBrandPhotos = [
  brandPhotos.analyticsWorld,
  brandPhotos.connectedGlobe,
  brandPhotos.mobileBrain,
  brandPhotos.voiceMic,
  brandPhotos.chatbotPhone,
  brandPhotos.voiceSearch,
  brandPhotos.chatHand,
  brandPhotos.humanRobotPurple,
  brandPhotos.brainTouch,
  brandPhotos.patternRecognition,
];

export const servicePhotoMap: Record<string, string> = {
  'business-voip': brandPhotos.voiceSearch,
  'contact-centers': brandPhotos.analyticsWorld,
  'sip-trunks': brandPhotos.connectedGlobe,
  'hosted-fax': brandPhotos.mobileBrain,
  'mobile-voip-sms': brandPhotos.mobileBrain,
  'web-video-conferencing': brandPhotos.connectedGlobe,
  'voip-integration': brandPhotos.analyticsWorld,
  'ai-voice-agents': brandPhotos.voiceMic,
  'ai-chatbots': brandPhotos.chatbotPhone,
};
