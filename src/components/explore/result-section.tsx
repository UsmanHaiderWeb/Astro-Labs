import * as React from 'react'
import { Download, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

const results = [
  { id: 1, name: "Cover", duration: "3:45" },
  { id: 2, name: "Main Vocals", duration: "3:45" },
  { id: 3, name: "Background Vocals", duration: "3:45" },
  { id: 4, name: "Instrumentals", duration: "3:45" },
]

function ResultSection() {
  return (
    <div className="bg-[#1a1a1a] rounded-xl p-4">
      <h2 className="text-white/60 uppercase text-xs mb-2">Result</h2>
      <div className="grid grid-cols-2 gap-3">
        {results.map((result) => (
          <div key={result.id} className="bg-black/50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button size="icon" variant="ghost" className="text-white h-8 w-8">
                  <Play className="h-4 w-4" />
                </Button>
                <div>
                  <h3 className="text-white text-sm">{result.name}</h3>
                  <p className="text-white/60 text-xs">{result.duration}</p>
                </div>
              </div>
              <Button size="icon" variant="ghost" className="text-white h-8 w-8">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 text-right">
        <p className="text-white/60 text-xs">Queue Size: 0</p>
      </div>
    </div>
  )
}

export default React.memo(ResultSection)