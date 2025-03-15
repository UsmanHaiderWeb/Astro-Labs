/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import * as React from 'react';
import { useRef, useEffect, useState, useCallback } from "react"
import { Slider } from "@/components/ui/slider"
import { BeatLoader } from 'react-spinners'
import { formatTime } from "@/lib/formatTime"
import { VoiceSelection } from '@/lib/interfaces&types';
import WaveSurfer from 'wavesurfer.js';
import { Pause, Play, RotateCcw } from 'lucide-react';

interface DAWSectionProps {
    selectedVoices: string[]
    timeRange: [number, number]
    // setTimeRange: (range: [number, number]) => void
    audioFile: File | null
    audioUrl: string
    duration: number
    tab: 'audio' | 'youtube'
    url: string
    audioBuffer: AudioBuffer | any
    voiceSelections: VoiceSelection[]
    setVoiceSelections: React.Dispatch<React.SetStateAction<VoiceSelection[]>>
}

// Voice colors with better contrast
const VOICE_COLORS = [
    "#1DB954", // Spotify green
    "#FF6B6B", // Coral red
    "#4A90E2", // Blue
    "#FFD93D", // Yellow
    "#9B59B6", // Purple
]

function DAWSection({ selectedVoices, timeRange, audioBuffer, duration, tab, url, voiceSelections, setVoiceSelections, audioUrl }: DAWSectionProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const youtubeWaveformRef = useRef<HTMLDivElement>(null)
    const audioWaveformRef = useRef<HTMLDivElement>(null)
    const wavesurfer = useRef<WaveSurfer>(null)
    const [isDragging, setIsDragging] = useState<{ voice: string; handle: "start" | "end" } | null>(null)
    const [audioCurrentTime, setAudioCurrentTime] = useState(0)
    const [youtubeCurrentTime, setYoutubeCurrentTime] = useState(0)
    const [showWaveForm, setShowWaveForm] = useState<boolean>(false)
    // const [dragTime, setDragTime] = useState<number | null>(null)
    // const [dragPosition, setDragPosition] = useState<{ x: number; y: number } | null>(null)
    const [dragInfo, setDragInfo] = useState<{ time: number; x: number; handle: "start" | "end" } | null>(null)

    const [playMusic, setPlayMusic] = React.useState<boolean>(false);
    const [audioTrackValue, setAudioTrackValue] = React.useState<{ max: number; value: number }>(null);
    const audio = React.useRef<HTMLAudioElement>(null);
    const slider = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        audio.current?.pause();
        setPlayMusic(false);
        if(audio.current) {
            audio.current.currentTime = 0;
            setAudioTrackValue(prev => ({...prev, value: 0}))
        }
    }, [audioUrl, tab])

    // Initialize or update voice selections when selectedVoices changes
    useEffect(() => {
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

    const drawWaveform = useCallback(() => {
        if (!audioBuffer && !url) return
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const dpr = window.devicePixelRatio || 1
        const rect = canvas.getBoundingClientRect()

        canvas.width = rect.width * dpr
        canvas.height = rect.height * dpr
        ctx.scale(dpr, dpr)

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
            // ctx.fillStyle = `white`
            // ctx.fillRect(0, 0, rect.width, rect.height)

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
        } else if (url && tab == 'youtube') {
            console.log('working');
            ctx.fillStyle = "#333333"
            ctx.font = "10px Arial"
            const timeIntervals = [];
            const increaseBy = duration / 15;
            for (let i = 0; i < duration; i += increaseBy) {
                timeIntervals.push(i);
            }
            if (Array.isArray(timeIntervals)) {
                timeIntervals.forEach((time) => {
                    const x = (time / duration) * rect.width
                    ctx.fillText(formatTime(time), x, 10)
                })
            }

            if (Array.isArray(voiceSelections)) {
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
            }
        }

        // Draw playhead
        const playheadX = (audio.current?.currentTime / duration) * rect.width
        ctx.strokeStyle = "#FFFFFF"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(playheadX, 0)
        ctx.lineTo(playheadX, rect.height)
        ctx.stroke()
    }, [url, tab, duration, voiceSelections, isDragging, dragInfo, audio.current?.currentTime])

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

    const handleMouseMove = useCallback(
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

    const handleMouseUp = useCallback(() => {
        setIsDragging(null)
        setDragInfo(null)
    }, [])

    useEffect(() => {
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

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const handleResize = () => drawWaveform()
        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [drawWaveform])

    React.useEffect(() => {
        if (audioWaveformRef.current && audioUrl && tab == 'audio') {
            setShowWaveForm(true)
            wavesurfer.current = WaveSurfer.create({
                container: audioWaveformRef.current,
                // waveColor: "white",
                // progressColor: "purple",
                cursorColor: "transparent",
                barWidth: 6,
                height: 'auto',
                width: '100%',
                barRadius: 50,
            });

            (async () => {
                await wavesurfer.current.load(audioUrl);
                setShowWaveForm(false)
            })()
        } else {
            wavesurfer.current?.destroy();
        }

        return () => wavesurfer.current?.destroy();
    }, [audioUrl, tab]);

    drawWaveform()

    return (
        <div className="bg-[#1a1a1a] rounded-xl p-4">
            <h2 className="text-white/60 uppercase text-xs mb-2">DAW</h2>
            <div className="relative overflow-hidden">
                {tab == 'audio' ?
                    <div ref={audioWaveformRef} className={`w-full h-40 rounded-lg pointer-events-none top-1/2 -translate-y-1/2 left-0 absolute z-[8] overflow-hidden bg-[#292929] ${tab == 'audio' ? 'block' : 'hidden'}`} />
                    :
                    <div ref={youtubeWaveformRef} className={`w-full h-40 rounded-lg pointer-events-none top-1/2 -translate-y-1/2 left-0 absolute z-[9] overflow-hidden bg-[#292929] ${tab == 'youtube' ? 'block' : 'hidden'}`} />
                }
                {(tab == 'audio' && showWaveForm) &&
                    <div className='w-full h-40 rounded-lg pointer-events-none top-1/2 -translate-y-1/2 left-0 absolute z-[10] bg-transparent flex justify-center items-center'>
                        <BeatLoader />
                    </div>
                }
                <canvas ref={canvasRef} className="w-full h-40 rounded-lg cursor-pointer relative z-[11]" />
                <div className="absolute bottom-2 left-2 bg-black/80 text-white text-xs px-2 py-1 rounded z-[12]">
                    {(audioBuffer || url) ? `${formatTime(tab == 'youtube' ? youtubeCurrentTime : audio.current?.currentTime)} / ${formatTime(duration)}` : "0:00 / 0:00"}{" "}
                    {/* Update 3: Conditional rendering of time display */}
                </div>
            </div>
            <div>
                {/* Update 3: Conditional rendering of slider */}
                {((audioBuffer && tab == 'audio') || (tab == 'youtube' && url))  && (<>
                    <Slider
                        ref={slider}
                        value={[tab == 'audio' ? audioTrackValue?.value || 0 : youtubeCurrentTime || 0]}
                        min={0}
                        max={duration}
                        step={0.1}
                        onValueChange={([value]) => {
                            if(audio.current) audio.current.currentTime = value;
                            if(tab == 'youtube') {
                                setYoutubeCurrentTime(value)
                            } else {
                                setAudioCurrentTime(value)
                            }
                        }}
                        className="my-4"
                    />
                    <div className='flex justify-center items-center gap-5'>
                        <audio ref={audio} src={audioUrl} id='selectedAudio' controls
                            className='hidden'
                            onPlay={() => {
                                for (let i = 0; i < 4; i++) {
                                    const audio = document.getElementById(`resultantAudio${i}`) as HTMLAudioElement;
                                    audio?.pause();
                                }
                                const audio = document.getElementById("footerAudioPlayer") as HTMLAudioElement;
                                audio?.pause();
                                
                                setPlayMusic(true);
                            }}
                            onPause={() => {
                                console.log('hello')
                                setPlayMusic(false);
                            }}
                            onVolumeChange={() => {
                                console.log('volume')
                            }}
                            onLoadedMetadata={(e: any) => {
                                console.log("e.target?.duration: ", e.target?.duration)
                                setAudioTrackValue(prev => ({ ...prev, max: Math.floor(e.target?.duration) }))
                            }}
                            onTimeUpdate={(e: React.ChangeEvent<HTMLAudioElement>) => {
                                setAudioTrackValue(prev => ({ ...prev, value: Math.floor(e.target?.currentTime) }))
                            }}
                        ></audio>
                        <div className='relative cursor-pointer'
                            onClick={() => {
                                audio.current.currentTime -= 10;
                            }}
                        >
                            <RotateCcw />
                            <span style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                fontSize: '0.35em',
                            }}>
                                10
                            </span>
                        </div>
                        <div>
                            {playMusic ?
                                <Pause size={28} onClick={() => audio.current?.pause()} />
                                :
                                <Play size={28} onClick={() => audio.current?.play()} />
                            }
                        </div>
                        <div className='relative cursor-pointer'
                            onClick={() => {
                                audio.current.currentTime += 10;
                            }}
                        >
                            <RotateCcw className='rotate-y-180' />
                            <span style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                fontSize: '0.35em',
                            }}>
                                10
                            </span>
                        </div>
                    </div>
                </>)}
            </div>
        </div>
    )
}


export default React.memo(DAWSection);