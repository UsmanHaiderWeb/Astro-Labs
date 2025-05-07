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


type modelType = { name: string, model_url: string }

interface YouTubeSectionProps {
    url: string
    setUrl: (url: string) => void
    selectedVoices: string[]
    setSelectedVoices: (voices: string[]) => void
    pitch: number
    setPitch: (pitch: number) => void
    duration: number
}

const voiceModels: modelType[] = [
    {
        name: "Morgan Freeman RVC v2",
        model_url: "https://huggingface.co/CxronaBxndit/Morgan-Freeman/resolve/main/Morgan-Freeman.zip"
    },
    {
        name: "Ai Hoshino_(U)(Oshi No Ko)|RVC v2| 5000 Epochs| rmvpe| Jp, En, Ru",
        model_url: "https://huggingface.co/MUSTAR/Hoshino_Ai_U/resolve/main/Hoshino_Ai_U.zip"
    },
    {
        name: "Bella Poarch (RVC V2 300 Epochs MangioCrepe)",
        model_url: "https://huggingface.co/datasets/sleepyboyeyes/Bella/resolve/main/Bella.zip"
    },
    {
        name: "DavidK - RVC V2 - 100 Epochs",
        model_url: "https://huggingface.co/rayzox57/DavidK_RVC/resolve/main/DavidK_v2_100e.zip"
    },
    {
        name: "Taylor Swift - RVC V2 - 525 EPOCHS",
        model_url: "https://huggingface.co/damnedraxx/TaylorSwift/resolve/main/TaylorSwift.zip"
    },
    {
        name: "Adventure Time - Jake the Dog - Original/English (RVC V2) (450 Epochs)",
        model_url: "https://huggingface.co/DieseKartoffel/jake-the-dog-voice-rvc/resolve/main/model.zip"
    },
    {
        name: "Sarah (Ed, Edd n Eddy) RVC v2 - 200 Epochs (Beta)",
        model_url: "https://huggingface.co/KennyFromPH/SarahEENE/resolve/main/SarahEENE200Epochs.zip"
    },
    {
        name: "Buddy Holly (RVC v2) (500 Epochs)",
        model_url: "https://huggingface.co/SUP3RMASS1VE/Buddy-Holly/resolve/main/Buddy-Holly.zip"
    },
    {
        name: "Minecraft Villager [Retrained | Villager News] [RVC v2 | 300 Epochs]",
        model_url: "https://huggingface.co/SyberGen/Minecraft-VModels/resolve/main/VillagerElemAnim-v2.zip"
    },
    {
        name: "Hololive Model Collection (RVC v2)",
        model_url: "https://huggingface.co/yeey5/TokinoSoraRVCV2/resolve/main/TokinoSora.zip"
    },
    {
        name: "Squidward Tentacles, 1500 Epochs, RVC v2, rmvpe (Spongebob)",
        model_url: "https://huggingface.co/lepifort/squidwardRVC/resolve/main/squidward.zip"
    }
]


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
                                    {voiceModels.map((voice: modelType) => (
                                        <CommandItem
                                            key={voice.name}
                                            value={voice.name}
                                            onSelect={(value: string) => {
                                                if (!url || !duration) {
                                                    setOpen(false)
                                                    setShowErrorAboutUrl('Please first enter a valid YouTube link.')
                                                    return
                                                }
                                                if(selectedVoices.length == 1 && !selectedVoices.includes(value)) {
                                                    setOpen(false)
                                                    setShowErrorAboutUrl('You can only choose one model.')
                                                    return
                                                } else {
                                                    const newSelected = selectedVoices.includes(voice?.name)
                                                        ? selectedVoices.filter((id) => id !== voice?.name)
                                                        : selectedVoices.length < 5
                                                            ? [...selectedVoices, voice?.name]
                                                            : selectedVoices
                                                    setSelectedVoices(newSelected)
                                                }
                                            }}
                                            className="w-full text-white cursor-pointer flex"
                                        >
                                            <Check
                                                className={cn("mr-2 h-4 w-4", selectedVoices.includes(voice?.name) ? "opacity-100" : "opacity-0")}
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