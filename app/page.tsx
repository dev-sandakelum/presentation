'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { PRESENTATIONS, type PresentationMeta } from '@/lib/state'

interface HostInfo {
  remoteUrl: string
  displayUrl: string
}

function PresentationCard({ pres }: { pres: PresentationMeta }) {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null)
  const [remoteUrl, setRemoteUrl] = useState<string>('')
  const [showQr, setShowQr] = useState(false)

  useEffect(() => {
    fetch(`/api/host-info?presId=${pres.id}`)
      .then(r => r.json())
      .then(async (d: HostInfo) => {
        setRemoteUrl(d.remoteUrl)
        const QRCode = (await import('qrcode')).default
        const url = await QRCode.toDataURL(d.remoteUrl, {
          width: 200,
          margin: 2,
          color: { dark: '#07080d', light: pres.color + 'ee' },
        })
        setQrDataUrl(url)
      })
      .catch(() => {})
  }, [pres.id, pres.color])

  return (
    <div
      className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 flex flex-col gap-5"
      style={{ boxShadow: `0 0 0 1px ${pres.color}11, inset 0 1px 0 ${pres.color}0a` }}
    >
      {/* meta */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="font-mono text-[9px] tracking-[0.22em] uppercase px-2 py-0.5 rounded-full border"
              style={{ color: pres.color, borderColor: `${pres.color}40`, background: `${pres.color}12` }}
            >
              {pres.kind === 'html' ? 'HTML' : 'React'}
            </span>
            <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-white/20">
              {pres.slideCount} slides
            </span>
          </div>
          <h2 className="text-xl font-bold tracking-tight leading-snug">{pres.title}</h2>
          <p className="mt-1 text-sm text-slate-500 leading-snug">{pres.subtitle}</p>
        </div>
      </div>

      {/* QR panel */}
      <div
        className="rounded-xl border overflow-hidden transition-all duration-300"
        style={{ borderColor: `${pres.color}30`, background: `${pres.color}08` }}
      >
        {/* header row — always visible */}
        <button
          onClick={() => setShowQr(v => !v)}
          className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left transition hover:bg-white/[0.03]"
        >
          <div className="flex items-center gap-2.5">
            {/* radio icon */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: pres.color }}>
              <circle cx="12" cy="12" r="2"/>
              <path d="M16.24 7.76a6 6 0 0 1 0 8.49M7.76 16.24a6 6 0 0 1 0-8.49M20.07 4a11 11 0 0 1 0 16M3.93 20a11 11 0 0 1 0-16"/>
            </svg>
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase" style={{ color: pres.color }}>
              Remote QR
            </span>
          </div>
          <svg
            width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
            className="text-slate-600 transition-transform duration-200"
            style={{ transform: showQr ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </button>

        {/* collapsible QR body */}
        {showQr && (
          <div className="flex flex-col items-center gap-3 pb-5 pt-1 px-4">
            {qrDataUrl
              ? <img src={qrDataUrl} alt={`Remote QR for ${pres.title}`} className="rounded-xl" style={{ width: 160, height: 160 }} />
              : <div className="rounded-xl bg-white/5 animate-pulse" style={{ width: 160, height: 160 }} />
            }
            <p className="font-mono text-[10px] text-slate-500 text-center break-all">{remoteUrl}</p>
          </div>
        )}
      </div>

      {/* actions */}
      <div className="grid grid-cols-2 gap-3">
        <Link
          href={`/display/${pres.id}`}
          className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 font-mono text-[11px] tracking-[0.1em] uppercase text-slate-300 transition hover:bg-white/[0.08] hover:text-white hover:border-white/20 active:scale-95"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2.5" y="3.5" width="19" height="13" rx="2"/><path d="M8 21h8m-4-4.5V21"/>
          </svg>
          Display
        </Link>
        <Link
          href={`/remote/${pres.id}`}
          className="flex items-center justify-center gap-2 rounded-xl border px-4 py-3 font-mono text-[11px] tracking-[0.1em] uppercase font-semibold transition active:scale-95"
          style={{ borderColor: `${pres.color}50`, background: `${pres.color}18`, color: pres.color }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="2"/>
            <path d="M16.24 7.76a6 6 0 0 1 0 8.49M7.76 16.24a6 6 0 0 1 0-8.49M20.07 4a11 11 0 0 1 0 16M3.93 20a11 11 0 0 1 0-16"/>
          </svg>
          Remote
        </Link>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#04070f] text-white flex flex-col items-center justify-center px-6 py-16">
      {/* grid bg */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      {/* header */}
      <div className="relative z-10 mb-14 text-center">
        <div className="inline-flex items-center gap-2.5 mb-6">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white/60">
            <path d="M12 3 22 20H2Z"/>
          </svg>
          <span className="font-mono text-[11px] tracking-[0.26em] uppercase text-white/40">Stage</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">Presentations</h1>
        <p className="text-slate-500 font-mono text-sm">Choose a presentation to display or control</p>
      </div>

      {/* cards */}
      <div className="relative z-10 grid gap-5 w-full max-w-2xl">
        {PRESENTATIONS.map((p) => (
          <PresentationCard key={p.id} pres={p} />
        ))}
      </div>

      <p className="relative z-10 mt-10 font-mono text-[10px] tracking-[0.18em] uppercase text-white/15">
        LOCAL WIFI · NO CLOUD
      </p>
    </main>
  )
}
