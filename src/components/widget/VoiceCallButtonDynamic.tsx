'use client'
import dynamic from 'next/dynamic'

export const VoiceCallButtonDynamic = dynamic(
  () => import('./VoiceCallButton').then(m => ({ default: m.VoiceCallButton })),
  { ssr: false }
)
