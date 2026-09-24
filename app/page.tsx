'use client'

import { useEffect, useState } from 'react'
import { Monitor, Smartphone, Radio } from 'lucide-react'

interface HostInfo {
  ip: string
  port: number
  wsUrl: string
  remoteUrl: string
  displayUrl: string
}

export default function Page() {
  const [host, setHost] = useState<HostInfo | null>(null)
  const [qrSrc, setQrSrc] = useState('')

  useEffect(() => {
    fetch('/api/host-info')
      .then((r) => r.json())
      .then(async (d: HostInfo) => {
        setHost(d)
        const QRCode = (await import('qrcode')).default
        setQrSrc(await QRCode.toDataURL(d.remoteUrl, {
          width: 180, margin: 2,
          color: { dark: '#090a0f', light: '#a5f3fc' },
        }))
      })
  }, [])

  return (
    <main className="min-h-screen bg-[#090a0f] text-white flex flex-col items-center justify-center px-6">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_70%_10%,rgba(81,64,174,0.15),transparent_40%),radial-gradient(circle_at_10%_80%,rgba(0,190,214,0.08),transparent_35%)]" />

      {/* logo */}
      <div className="relative mb-12 flex items-center gap-3">
        <div className="grid size-10 place-items-center rounded-xl bg-cyan-300 text-slate-950 shadow-[0_0_24px_rgba(103,232,249,0.35)]">
          <Radio className="size-5" />
        </div>
        <div>
          <div className="text-lg font-semibold tracking-tight">stage<span className="text-cyan-300">link</span></div>
          <div className="font-mono text-[9px] tracking-[0.22em] text-slate-600">LOCAL CONTROL SYSTEM</div>
        </div>
      </div>

      <div className="relative grid w-full max-w-2xl gap-4 md:grid-cols-2">

        {/* Display */}
        <a
          href="/display"
          target="_blank"
          rel="noreferrer"
          className="group flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-cyan-300/30 hover:bg-white/[0.07]"
        >
          <div className="flex items-center justify-between">
            <div className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-cyan-300">
              <Monitor className="size-5" />
            </div>
            <span className="font-mono text-[10px] tracking-[0.2em] text-slate-600">LAPTOP</span>
          </div>
          <div>
            <div className="text-base font-semibold text-slate-100">Display</div>
            <div className="mt-1 text-xs text-slate-500">Open this on your laptop — fullscreen presentation</div>
          </div>
          <div className="font-mono text-[10px] text-cyan-300/60 break-all">
            {host ? host.displayUrl : 'localhost:3000/display'}
          </div>
        </a>

        {/* Remote */}
        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <div className="flex items-center justify-between">
            <div className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-violet-300">
              <Smartphone className="size-5" />
            </div>
            <span className="font-mono text-[10px] tracking-[0.2em] text-slate-600">PHONE</span>
          </div>
          <div>
            <div className="text-base font-semibold text-slate-100">Remote</div>
            <div className="mt-1 text-xs text-slate-500">Scan on your phone to control the display</div>
          </div>

          {/* QR */}
          <div className="flex items-center gap-4">
            {qrSrc
              ? <img src={qrSrc} alt="Remote QR" className="size-[72px] rounded-lg flex-shrink-0" />
              : <div className="size-[72px] animate-pulse rounded-lg bg-white/5 flex-shrink-0" />
            }
            <div className="font-mono text-[10px] text-violet-300/70 break-all leading-relaxed">
              {host ? host.remoteUrl : '…'}
            </div>
          </div>
        </div>

        {/* WS status */}
        <div className="md:col-span-2 flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            <span className="font-mono text-[10px] text-slate-500">WebSocket server</span>
          </div>
          <span className="font-mono text-[10px] text-slate-600">{host ? host.wsUrl : '…'}</span>
        </div>

      </div>

      <p className="relative mt-10 font-mono text-[10px] tracking-[0.2em] text-slate-700">
        NO CLOUD · NO LOGIN · YOUR WIFI
      </p>
    </main>
  )
}
