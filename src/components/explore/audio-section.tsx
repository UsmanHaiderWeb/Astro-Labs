/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import * as React from 'react'
import { useState, useRef } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Trash2, Upload } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import voicesData from "@/lib/voices.json"

const voiceModels = voicesData.voices.map((voice, index) => ({
    id: (index + 1).toString(),
    name: voice.name
}))

interface AudioSectionProps {
    selectedVoices: string[]
    setSelectedVoices: (voices: string[]) => void
    pitch: number
    setPitch: (pitch: number) => void
    onFileUpload: (file: File) => void
    isPending: boolean
    audioFile: File | null
    handleClearAudio: () => void;
}

function AudioSection({ selectedVoices, setSelectedVoices, pitch, setPitch, onFileUpload, isPending, audioFile, handleClearAudio }: AudioSectionProps) {
    const [open, setOpen] = useState(false)
    const [fileName, setFileName] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const dropRef = React.useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = React.useState(false);
    const [showErrorAboutAudio, setShowErrorAboutAudio] = React.useState<string>(null)

    const isGenerating = localStorage.getItem('isGenerating');

    // React.useEffect(() => {
    //     const storedFilename = localStorage.getItem('fileName');
    //     if(storedFilename) setFileName(storedFilename);
    //     const storedAudioFile = localStorage.getItem('audioFile');
    //     // if(storedAudioFile) onFileUpload(JSON.parse(storedAudioFile));
    // }, [])

    // React.useEffect(() => {
    //     if (fileName) localStorage.setItem('fileName', fileName);
    //     if (audioFile) {
    //         localStorage.setItem('audioFile', `${audioFile}`);
    //     };
    // }, [fileName, audioFile])


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        const existingAudio = document.getElementById('selectedAudio') as HTMLAudioElement
        existingAudio?.pause();

        if (file) {
            if (file.size <= 15 * 1024 * 1024 && (file.type === "audio/mpeg" || file.type === "audio/wav")) {
                setFileName(file.name)
                onFileUpload(file)
                setShowErrorAboutAudio('')
            } else {
                alert("Please upload an MP3 or WAV file under 15MB.")
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
            if (file.size <= 15 * 1024 * 1024 && (file.type === "audio/mpeg" || file.type === "audio/wav")) {
                setFileName(file.name)
                onFileUpload(file)
                setShowErrorAboutAudio('')
            } else {
                alert("Please upload an MP3 or WAV file under 15MB.")
            }
        }
    }

    return (
        <div className="space-y-4 w-full">
            <div className="space-y-1 w-full">
                <div className='flex items-center justify-between mb-2'>
                    <Label className="text-white/60 uppercase text-xs">Upload Audio</Label>
                    {audioFile &&
                        <div
                            data-disabled={isGenerating?.toLocaleLowerCase() == 'pending' || isPending}
                            className="flex justify-center gap-2 uppercase text-xs items-center text-destructive/60 hover:text-destructive/80 cursor-pointer data-[disabled=true]:opacity-50 data-[disabled=true]:pointer-events-none"
                            onClick={() => {
                                setFileName(null);
                                localStorage.removeItem('job_id');
                                localStorage.removeItem('audioLinks');
                                localStorage.removeItem('isGenerating');
                                fileInputRef.current.value = '';
                                handleClearAudio()
                            }}
                        >
                            Clear
                            <Trash2 className="h-4 w-4 mr-1" />
                        </div>
                    }
                </div>
                <div
                    ref={dropRef}
                    data-disabled={isGenerating?.toLocaleLowerCase() == 'pending' || isPending}
                    className={cn(
                        "border border-dashed rounded-lg p-3 text-center transition-colors cursor-pointer data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
                        isDragging ? "border-white/40" : "border-white/10"
                    )}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleChooseFile}
                >
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".mp3,.wav" className="hidden" />
                    <Button variant="ghost" className="w-full text-white text-xs h-6 cursor-pointer">
                        <Upload className="h-3 w-3 mr-1" />
                        <span className="max-w-[80%] truncate">
                            {fileName || "Choose File"}
                        </span>
                    </Button>
                    <p className="text-xs text-gray-400 mt-1">Supported formats: MP3, WAV (max 15MB)</p>
                </div>
            </div>

            <div className="space-y-0.5 w-full">
                <Label className="text-white/60 uppercase text-xs">Voice</Label>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild className='w-full overflow-hidden'>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-[100%] block text-left bg-black/50 border-none text-white hover:bg-black/50 hover:text-white h-8 cursor-pointer text-ellipsis whitespace-nowrap overflow-hidden"
                            disabled={isGenerating?.toLocaleLowerCase() == 'pending' || isPending}
                        >
                            {selectedVoices.length === 0 ? "Select Voice Models" : (selectedVoices.length === 1 ? selectedVoices[0] : `${selectedVoices.length} selected`)}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[var(--radix-popper-anchor-width)] p-0 bg-[#1a1a1a] border-white/10 z-[202]">
                        <Command className="bg-transparent max-w-full text-secondary">
                            <CommandInput placeholder="Search voice models..." className="text-white w-full" />
                            <CommandList>
                                <CommandEmpty>No voice model found.</CommandEmpty>
                                <CommandGroup>
                                    {voiceModels.map((voice) => (
                                        <CommandItem
                                            key={voice.id}
                                            onSelect={(value: string) => {
                                                if (!fileName) {
                                                    setOpen(false)
                                                    setShowErrorAboutAudio('Please first choose a valid Audio file.')
                                                    return
                                                }
                                                if (selectedVoices.length == 1 && !selectedVoices.includes(value)) {
                                                    setOpen(false)
                                                    setShowErrorAboutAudio('You can only choose one model.')
                                                    return
                                                } else {
                                                    const newSelected = selectedVoices.includes(voice.name)
                                                        ? selectedVoices.filter((name) => name !== voice.name)
                                                        : [...selectedVoices, voice.name]
                                                    setSelectedVoices(newSelected)
                                                    setShowErrorAboutAudio('')
                                                }
                                            }}
                                            className="text-white cursor-pointer flex"
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    selectedVoices.includes(voice.name) ? "opacity-100" : "opacity-0",
                                                )}
                                            />
                                            <span className="text-ellipsis whitespace-nowrap overflow-hidden">
                                                {voice.name}
                                            </span>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
                {(showErrorAboutAudio) &&
                    <p className="text-sm text-destructive/70 mt-1">{showErrorAboutAudio}</p>
                }
            </div>

            <div>
                <Label className="text-white/60 uppercase text-xs">Pitch</Label>
                <div className="flex items-center space-x-4 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50"
                    data-disabled={isGenerating?.toLocaleLowerCase() == 'pending' || isPending}
                >
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