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
import { AdvancedSettings } from "./advanced-settings"

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
}

export function YouTubeSection({
  url,
  setUrl,
  selectedVoices,
  setSelectedVoices,
  pitch,
  setPitch,
}: YouTubeSectionProps) {
  const [open, setOpen] = React.useState(false)
  const [showAdvanced, setShowAdvanced] = React.useState(false)

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label className="text-white/60 uppercase text-xs">Audio</Label>
        <Input
          placeholder="Paste YouTube link here"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
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
              className="w-full justify-between bg-black/50 border-none text-white hover:bg-black/50 hover:text-white h-8"
            >
              {selectedVoices.length === 0 ? "Select Voice Models" : `${selectedVoices.length} selected`}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0 bg-[#1a1a1a] border-white/10">
            <Command className="bg-transparent">
              <CommandInput placeholder="Search voice models..." className="text-white" />
              <CommandList>
                <CommandEmpty>No voice model found.</CommandEmpty>
                <CommandGroup>
                  {voiceModels.map((voice) => (
                    <CommandItem
                      key={voice.id}
                      onSelect={() => {
                        const newSelected = selectedVoices.includes(voice.id)
                          ? selectedVoices.filter((id) => id !== voice.id)
                          : selectedVoices.length < 5
                            ? [...selectedVoices, voice.id]
                            : selectedVoices
                        setSelectedVoices(newSelected)
                      }}
                      className="text-white"
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

      <Button
        variant="link"
        className="text-white/60 p-0 h-auto text-xs uppercase hover:text-white"
        onClick={() => setShowAdvanced(true)}
      >
        Advanced Settings
      </Button>

      <div className="pt-4">
        <Button className="w-full bg-black hover:bg-black/80 text-white">Convert</Button>
      </div>

      <AdvancedSettings open={showAdvanced} onOpenChange={setShowAdvanced} />
    </div>
  )
}

