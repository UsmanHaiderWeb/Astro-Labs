"use client"

import * as React from 'react'
import { useState, useRef } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const voiceModels = [
    { id: "1", name: "Cover" },
    { id: "2", name: "Main Vocals" },
    { id: "3", name: "Background Vocals" },
    { id: "4", name: "Instrumentals" },
    { id: "5", name: "Harmony" },
]

interface AudioSectionProps {
    selectedVoices: string[]
    setSelectedVoices: (voices: string[]) => void
    pitch: number
    setPitch: (pitch: number) => void
    onFileUpload: (file: File) => void
}

function AudioSection({ selectedVoices, setSelectedVoices, pitch, setPitch, onFileUpload }: AudioSectionProps) {
    const [open, setOpen] = useState(false)
    const [fileName, setFileName] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const dropRef = React.useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = React.useState(false);
    const [showErrorAboutAudio, setShowErrorAboutAudio] = React.useState<string>(null)


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        const existingAudio = document.getElementById('selectedAudio') as HTMLAudioElement
        console.log("existingAudio: ", existingAudio)
        existingAudio?.pause();

        if (file) {
            if (file.size <= 10 * 1024 * 1024 && (file.type === "audio/mpeg" || file.type === "audio/wav")) {
                setFileName(file.name)
                onFileUpload(file)
            } else {
                alert("Please upload an MP3 or WAV file under 10MB.")
            }
        }
    }

    const handleChooseFile = () => {
        fileInputRef.current?.click()
    }

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
        setIsDragging(true); // Set dragging state
    };

    const handleDragLeave = () => {
        setIsDragging(false); // Reset when leaving the drop zone
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);

        const file = event.dataTransfer.files?.[0]
        if (file) {
            if (file.size <= 10 * 1024 * 1024 && (file.type === "audio/mpeg" || file.type === "audio/wav")) {
                setFileName(file.name)
                onFileUpload(file)
            } else {
                alert("Please upload an MP3 or WAV file under 10MB.")
            }
        }
    }

    return (
        <div className="space-y-4">
            <div className="space-y-1">
                <Label className="text-white/60 uppercase text-xs">Upload Audio</Label>
                <div
                    ref={dropRef}
                    className={cn(
                        "border border-dashed rounded-lg p-3 text-center transition-colors cursor-pointer",
                        isDragging ? "border-white/40" : "border-white/10"
                    )}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleChooseFile}
                >
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".mp3,.wav" className="hidden" />
                    <Button variant="ghost" className="text-white text-xs h-6 cursor-pointer">
                        <Upload className="h-3 w-3 mr-1" />
                        {fileName || "Choose File"}
                    </Button>
                    <p className="text-xs text-gray-400 mt-1">Supported formats: MP3, WAV (max 10MB)</p>
                </div>
            </div>

            <div className="space-y-2 w-full">
                <Label className="text-white/60 uppercase text-xs">Voice</Label>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between bg-black/50 border-none text-white hover:bg-black/50 hover:text-white h-8 cursor-pointer"
                        >
                            {selectedVoices.length === 0 ? "Select Voice Models" : `${selectedVoices.length} selected`}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="max-w-full p-0 bg-[#1a1a1a] border-white/10">
                        <Command className="bg-transparent max-w-full text-secondary">
                            <CommandInput placeholder="Search voice models..." className="text-white w-full" />
                            <CommandList>
                                <CommandEmpty>No voice model found.</CommandEmpty>
                                <CommandGroup>
                                    {voiceModels.map((voice) => (
                                        <CommandItem
                                            key={voice.id}
                                            onSelect={() => {
                                                if (!fileName) {
                                                    setOpen(false)
                                                    setShowErrorAboutAudio('Please first choose a valid Audio file.')
                                                    return
                                                }
                                                const newSelected = selectedVoices.includes(voice.name)
                                                    ? selectedVoices.filter((name) => name !== voice.name)
                                                    : [...selectedVoices, voice.name]
                                                setSelectedVoices(newSelected)
                                            }}
                                            className="text-white cursor-pointer"
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    selectedVoices.includes(voice.name) ? "opacity-100" : "opacity-0",
                                                )}
                                            />
                                            {voice.name}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
                {(fileName) ? null :
                    <p className="text-sm text-destructive/70 mt-1">{showErrorAboutAudio}</p>
                }
            </div>

            <div className="space-y-2">
                <Label className="text-white/60 uppercase text-xs">Pitch</Label>
                <div className="flex items-center space-x-4">
                    <Slider
                        value={[pitch]}
                        onValueChange={([value]) => setPitch(value)}
                        min={-12}
                        max={12}
                        step={1}
                        className="flex-1"
                    />
                    <span className="text-white min-w-[2ch] text-center">{pitch}</span>
                </div>
            </div>
        </div>
    )
}

export default React.memo(AudioSection)