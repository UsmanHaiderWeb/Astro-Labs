/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import * as React from "react"
import { Slider } from "@/components/ui/slider"
import { VoiceSelection } from "@/lib/interfaces&types"

interface DAWSectionProps {
  selectedVoices: string[]
  timeRange: [number, number]
  audioFile: File | null
  voiceSelections: VoiceSelection[];
  setVoiceSelections: React.Dispatch<React.SetStateAction<VoiceSelection[]>>
  duration: number
  audioBuffer: ArrayBuffer | any
}

// Voice colors with better contrast
const VOICE_COLORS = [
  "#1DB954", // Spotify green
  "#FF6B6B", // Coral red
  "#4A90E2", // Blue
  "#FFD93D", // Yellow
  "#9B59B6", // Purple
]

export function DAWSection({ selectedVoices, timeRange, voiceSelections, setVoiceSelections, duration, audioBuffer }: DAWSectionProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const [isDragging, setIsDragging] = React.useState<{ voice: string; handle: "start" | "end" } | null>(null)
  const [currentTime, setCurrentTime] = React.useState(0)
  // const [dragTime, setDragTime] = React.useState<number | null>(null)
  // const [dragPosition, setDragPosition] = React.useState<{ x: number; y: number } | null>(null)
  const [dragInfo, setDragInfo] = React.useState<{ time: number; x: number; handle: "start" | "end" } | null>(null)

  React.useEffect(() => {}, [dragInfo, isDragging, voiceSelections])
  
  // Initialize or update voice selections when selectedVoices changes
  React.useEffect(() => {
    setVoiceSelections((prev) => {
      const newSelections = selectedVoices.map((voice, index) => {
        const existingSelection = prev.find((s) => s.voice === voice)
        return {
          voice,
          range: existingSelection ? existingSelection.range : timeRange,
          color: VOICE_COLORS[index % VOICE_COLORS.length],
        }
      })
      return newSelections
    })
  }, [selectedVoices, timeRange])

  const drawWaveform = React.useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Clear canvas
    ctx.fillStyle = "#000"
    ctx.fillRect(0, 0, rect.width, rect.height)

    if (audioBuffer) {
      // Update 2: Conditional rendering of time markers and waveform
      // Draw time markers
      ctx.fillStyle = "#333333"
      ctx.font = "10px Arial"
      const timeIntervals = [0, 30, 60, 90, 120, 150, 180]
      timeIntervals.forEach((time) => {
        const x = (time / duration) * rect.width
        ctx.fillText(formatTime(time), x, 10)
      })

      // Draw waveform
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 1
      ctx.beginPath()

      for (let x = 0; x < rect.width; x++) {
        const startSample = Math.floor(x * Math.ceil(audioBuffer.length / rect.width))
        const endSample = Math.min(startSample + Math.ceil(audioBuffer.length / rect.width), audioBuffer.length)

        let maxAmplitude = 0
        for (let i = startSample; i < endSample; i++) {
          const amplitude = Math.abs(audioBuffer.getChannelData(0)[i])
          if (amplitude > maxAmplitude) maxAmplitude = amplitude
        }

        const scaledAmplitude = maxAmplitude * (rect.height / 2 - 20)
        ctx.moveTo(x, rect.height / 2 - scaledAmplitude)
        ctx.lineTo(x, rect.height / 2 + scaledAmplitude)
      }
      ctx.stroke()

      // Draw selections for each voice
      voiceSelections.forEach((selection, index) => {
        const startX = (selection.range[0] / duration) * rect.width
        const endX = (selection.range[1] / duration) * rect.width
        const yOffset = 20 + index * 20 // Stack voice labels

        // Draw selection background
        ctx.fillStyle = `${selection.color}33` // 20% opacity
        ctx.fillRect(startX, 0, endX - startX, rect.height)

        // Draw voice label
        ctx.fillStyle = selection.color
        ctx.font = "12px Arial"
        ctx.fillText(selection.voice, startX + 5, yOffset)

        // Draw handles
        drawHandle(ctx, startX, selection.color, "start")
        drawHandle(ctx, endX, selection.color, "end")

        // Draw time indicators if dragging
        if (dragInfo && isDragging?.voice === selection.voice) {
          const timeX = (dragInfo.time / duration) * rect.width
          const timeY = 15 // Position above the handle
          const timeText = formatTime(dragInfo.time)

          ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
          ctx.fillRect(timeX - 20, timeY - 12, 40, 16)

          ctx.fillStyle = "#ffffff"
          ctx.font = "10px Arial"
          ctx.textAlign = "center"
          ctx.fillText(timeText, timeX, timeY)
        }
      })

      // Draw playhead
      const playheadX = (currentTime / duration) * rect.width
      ctx.strokeStyle = "#FFFFFF"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(playheadX, 0)
      ctx.lineTo(playheadX, rect.height)
      ctx.stroke()
    }
  }, [audioBuffer, duration, voiceSelections, isDragging, dragInfo, currentTime])

  const drawHandle = (ctx: CanvasRenderingContext2D, x: number, color: string, type: "start" | "end") => {
    const handleHeight = 15
    const handleWidth = 10

    // Draw handle triangle
    ctx.fillStyle = color
    ctx.beginPath()
    if (type === "start") {
      ctx.moveTo(x, 0)
      ctx.lineTo(x + handleWidth, handleHeight)
      ctx.lineTo(x - handleWidth, handleHeight)
    } else {
      ctx.moveTo(x, 0)
      ctx.lineTo(x + handleWidth, handleHeight)
      ctx.lineTo(x - handleWidth, handleHeight)
    }
    ctx.closePath()
    ctx.fill()

    // Draw handle line
    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, ctx.canvas.height)
    ctx.stroke()
  }

  const handleMouseMove = React.useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return

      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
      const time = (x / rect.width) * duration

      setDragInfo({ time, x, handle: isDragging.handle })

      setVoiceSelections((prev) =>
        prev.map((selection) => {
          if (selection.voice === isDragging.voice) {
            const newRange = [...selection.range] as [number, number]
            if (isDragging.handle === "start") {
              newRange[0] = Math.min(time, selection.range[1] - 0.1)
            } else {
              newRange[1] = Math.max(time, selection.range[0] + 0.1)
            }
            return { ...selection, range: newRange }
          }
          return selection
        }),
      )

      drawWaveform()
    },
    [isDragging, duration, drawWaveform],
  )

  const handleMouseUp = React.useCallback(() => {
    setIsDragging(null)
    setDragInfo(null)
  }, [])

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const time = (x / rect.width) * duration

      voiceSelections.forEach((selection) => {
        const startX = (selection.range[0] / duration) * rect.width
        const endX = (selection.range[1] / duration) * rect.width

        if (Math.abs(x - startX) < 10) {
          setIsDragging({ voice: selection.voice, handle: "start" })
          setDragInfo({ time, x, handle: "start" })
        } else if (Math.abs(x - endX) < 10) {
          setIsDragging({ voice: selection.voice, handle: "end" })
          setDragInfo({ time, x, handle: "end" })
        }
      })
    }

    canvas.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [duration, voiceSelections, handleMouseMove, handleMouseUp])

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleResize = () => drawWaveform()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [drawWaveform])

  drawWaveform()

  return (
    <div className="bg-[#1a1a1a] rounded-xl p-4">
      <h2 className="text-white/60 uppercase text-xs mb-2">DAW</h2>
      <div className="relative">
        <canvas ref={canvasRef} className="w-full h-40 rounded-lg cursor-pointer" />
        <div className="absolute bottom-2 left-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
          {audioBuffer ? `${formatTime(currentTime)} / ${formatTime(duration)}` : "0:00 / 0:00"}{" "}
          {/* Update 3: Conditional rendering of time display */}
        </div>
      </div>
      {audioBuffer && ( // Update 3: Conditional rendering of slider
        <Slider
          value={[currentTime]}
          min={0}
          max={duration}
          step={0.1}
          onValueChange={([value]) => setCurrentTime(value)}
          className="mt-4"
        />
      )}
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

