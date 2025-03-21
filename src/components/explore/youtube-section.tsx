/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const voiceModels = [
    { id: "1", name: "Voice Model 1" },
    { id: "2", name: "Voice Model 2" },
    { id: "3", name: "Voice Model 3" },
    { id: "4", name: "Voice Model 4" },
    { id: "5", name: "Voice Model 5" },
]

interface YouTubeSectionProps {
    url: string
    setUrl: (url: string) => void
    selectedVoices: string[]
    setSelectedVoices: (voices: string[]) => void
    pitch: number
    setPitch: (pitch: number) => void
    duration: number
}

export function YouTubeSection({
    url,
    setUrl,
    selectedVoices,
    setSelectedVoices,
    pitch,
    setPitch,
    duration,
}: YouTubeSectionProps) {
    const [open, setOpen] = React.useState(false)
    const [showErrorAboutUrl, setShowErrorAboutUrl] = React.useState<string>(null)

    return (
        <div className="space-y-4">
            <div className="space-y-1">
                <Label className="text-white/60 uppercase text-xs">Youtube Video Link</Label>
                <Input
                    placeholder="Paste YouTube link here"
                    onChange={(e) => e.target?.value?.includes("https://www.youtube.com/watch?v=") && setUrl(e.target.value)}
                    className="bg-black/50 border-0 text-white placeholder:text-white/40 text-sm h-8"
                />
            </div>

            <div className="space-y-1">
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
                    <PopoverContent className="w-[var(--radix-popper-anchor-width)] p-0 bg-[#1a1a1a] border-white/10 z-[203]">
                        <Command className="bg-transparent w-full text-secondary">
                            <CommandInput placeholder="Search voice models..." className="text-white w-full" />
                            <CommandList>
                                <CommandEmpty>No voice model found.</CommandEmpty>
                                <CommandGroup>
                                    {voiceModels.map((voice) => (
                                        <CommandItem
                                            key={voice.id}
                                            onSelect={(value: string) => {
                                                if (!url || !duration) {
                                                    setOpen(false)
                                                    setShowErrorAboutUrl('Please first enter a valid YouTube link.')
                                                    return
                                                }
                                                if(selectedVoices.length == 2 && !selectedVoices.includes(value)) {
                                                    setOpen(false)
                                                    setShowErrorAboutUrl('You can only choose two models.')
                                                    return
                                                } else {
                                                    const newSelected = selectedVoices.includes(voice.id)
                                                        ? selectedVoices.filter((id) => id !== voice.id)
                                                        : selectedVoices.length < 5
                                                            ? [...selectedVoices, voice.id]
                                                            : selectedVoices
                                                    setSelectedVoices(newSelected)
                                                }
                                            }}
                                            className="text-white cursor-pointer"
                                        >
                                            <Check
                                                className={cn("mr-2 h-4 w-4", selectedVoices.includes(voice.id) ? "opacity-100" : "opacity-0")}
                                            />
                                            {voice.name}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
                {showErrorAboutUrl &&
                    <p className="text-sm text-destructive/70 mt-1">{showErrorAboutUrl}</p>
                }
            </div>

            <div className="space-y-1">
                <Label className="text-white/60 uppercase text-xs">Pitch</Label>
                <div className="flex items-center space-x-2">
                    <Slider
                        value={[pitch]}
                        onValueChange={([value]) => setPitch(value)}
                        min={-12}
                        max={12}
                        step={1}
                        className="flex-1"
                    />
                    <span className="text-white min-w-[2ch] text-center text-sm">{pitch}</span>
                </div>
            </div>
        </div>
    )
}