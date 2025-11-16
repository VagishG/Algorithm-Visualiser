"use client"

import { Copy, Check } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface CodeDisplayProps {
  code: string
  language: string
}

export function CodeDisplay({ code, language }: CodeDisplayProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = code.split("\n")

  return (
    <div className="relative rounded-lg overflow-hidden bg-slate-900 text-slate-50 border border-slate-700">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
        <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">{language}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="gap-2 text-slate-400 hover:text-slate-200 text-xs"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy
            </>
          )}
        </Button>
      </div>
      <div className="overflow-x-auto">
        <pre className="p-4 text-xs leading-relaxed font-mono">
          {lines.map((line, i) => (
            <div key={i} className="flex">
              <span className="inline-block w-8 pr-4 text-right text-slate-600 select-none">{i + 1}</span>
              <code>{line}</code>
            </div>
          ))}
        </pre>
      </div>
    </div>
  )
}
