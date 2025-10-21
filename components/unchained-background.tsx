"use client"

import { useRef } from "react"

export function UnchainedBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  return <div ref={containerRef} className="absolute inset-0 bg-black" />
}
