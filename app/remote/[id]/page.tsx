import { PRESENTATIONS } from '@/lib/state'
import { notFound } from 'next/navigation'
import RemotePageClient from './RemotePageClient'

export function generateStaticParams() {
  return PRESENTATIONS.map((p) => ({ id: p.id }))
}

export default async function RemotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const pres = PRESENTATIONS.find((p) => p.id === id)
  if (!pres) notFound()
  return <RemotePageClient pres={pres} />
}
