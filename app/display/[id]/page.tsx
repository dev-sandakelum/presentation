import { PRESENTATIONS } from '@/lib/state'
import { notFound } from 'next/navigation'
import ReactDisplayPage from './ReactDisplayPage'
import HtmlDisplayPage from './HtmlDisplayPage'

export function generateStaticParams() {
  return PRESENTATIONS.map((p) => ({ id: p.id }))
}

export default async function DisplayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const pres = PRESENTATIONS.find((p) => p.id === id)
  if (!pres) notFound()

  if (pres.kind === 'html') {
    return <HtmlDisplayPage pres={pres} />
  }
  return <ReactDisplayPage pres={pres} />
}
