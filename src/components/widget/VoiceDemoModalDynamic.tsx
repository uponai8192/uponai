'use client'
import dynamic from 'next/dynamic'

export const VoiceDemoModalDynamic = dynamic(
  () => import('./VoiceDemoModal').then(m => ({ default: m.VoiceDemoModal })),
  { ssr: false }
)
