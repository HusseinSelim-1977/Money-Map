"use client"

import dynamic from "next/dynamic"

const Spline = dynamic(() => import("@splinetool/react-spline/next"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-950" />,
})

export function SplineBackground({ scene }: { scene: string }) {
  return <Spline scene={scene} />
}
