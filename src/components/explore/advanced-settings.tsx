/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { AdvanceSettingsInterface } from "@/lib/interfaces&types"
import { ScrollArea } from "../ui/scroll-area"

interface AdvancedSettingsProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    advanceSettings: AdvanceSettingsInterface;
    updateAdvanceSetting: any
}

export function AdvancedSettings({ open, onOpenChange, advanceSettings, updateAdvanceSetting }: AdvancedSettingsProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-[#1A1A1A] border-white/10 text-white sm:max-w-4xl px-0 border-none outline-none">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-center">ADVANCED SETTINGS</DialogTitle>
                    <DialogDescription className="hidden">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque, facilis. Dolor, omnis eveniet debitis earum, amet eum, provident consectetur magnam consequatur praesentium eos commodi repellendus fugit ducimus molestias similique sapiente?</DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-[80vh] px-7">
                    <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 items-start py-6">
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <Label className="text-white text-sm">Pitch Method:</Label>
                                <Select defaultValue="rmvpe" value={advanceSettings?.pitchMethod} onValueChange={val => updateAdvanceSetting('pitchMethod', val)}>
                                    <SelectTrigger className="bg-black border-white/10 h-8 text-sm">
                                        <SelectValue placeholder="rmvpe" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-black border-white/10">
                                        <SelectItem value="rmvpe" className="text-white">rmvpe (default)</SelectItem>
                                        <SelectItem value="mangio-crepe" className="text-white">mangio-crepe</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-xs text-gray-400">
                                    The method rmvpe ensures clarity in the vocals whereas mangio-crepe provides the output with smoother
                                    vocals.
                                </p>
                            </div>

                            <div className="space-y-1">
                                <Label className="text-white text-sm">Pitch for Background & Instrumental:</Label>
                                <div className="flex items-center space-x-2">
                                    <Slider
                                        value={[advanceSettings?.pitchBackgroundInstrumental]}
                                        onValueChange={([value]) => updateAdvanceSetting('pitchBackgroundInstrumental', value)}
                                        min={-12}
                                        max={12}
                                        step={1}
                                        className="flex-1"
                                    />
                                    <span className="text-sm min-w-[2ch]">{advanceSettings?.pitchBackgroundInstrumental}</span>
                                </div>
                                <p className="text-xs text-gray-400">Changing pitch can lead to alteration in quality.</p>
                            </div>

                            <div className="space-y-1">
                                <Label className="text-white text-sm">Main Vocals Volume:</Label>
                                <div className="flex items-center space-x-2">
                                    <Slider
                                        value={[advanceSettings?.mainVocalsVolume]}
                                        onValueChange={([value]) => updateAdvanceSetting('mainVocalsVolume', value)}
                                        min={0}
                                        max={10}
                                        step={0.1}
                                        className="flex-1"
                                    />
                                    <span className="text-sm min-w-[2ch]">{advanceSettings?.mainVocalsVolume.toFixed(1)}</span>
                                </div>
                                <p className="text-xs text-gray-400">Control volume of the Main Vocals.</p>
                            </div>

                            <div className="space-y-1">
                                <Label className="text-white text-sm">Background Vocals Volume:</Label>
                                <div className="flex items-center space-x-2">
                                    <Slider
                                        value={[advanceSettings?.backgroundVocalsVolume]}
                                        onValueChange={([value]) => updateAdvanceSetting('backgroundVocalsVolume', value)}
                                        min={0}
                                        max={10}
                                        step={0.1}
                                        className="flex-1"
                                    />
                                    <span className="text-sm min-w-[2ch]">{advanceSettings?.backgroundVocalsVolume.toFixed(1)}</span>
                                </div>
                                <p className="text-xs text-gray-400">Control volume of the Background Vocals.</p>
                            </div>

                            <div className="space-y-1">
                                <Label className="text-white text-sm">Instrumentals Volume:</Label>
                                <div className="flex items-center space-x-2">
                                    <Slider
                                        value={[advanceSettings?.instrumentalsVolume]}
                                        onValueChange={([value]) => updateAdvanceSetting('instrumentalsVolume', value)}
                                        min={0}
                                        max={10}
                                        step={0.1}
                                        className="flex-1"
                                    />
                                    <span className="text-sm min-w-[2ch]">{advanceSettings?.instrumentalsVolume.toFixed(1)}</span>
                                </div>
                                <p className="text-xs text-gray-400">Control volume of the Instrumentals.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <Label className="text-white text-sm">Apply AI on Background Vocals:</Label>
                                <Select value={advanceSettings?.applyAIOnBackground} onValueChange={val => updateAdvanceSetting('applyAIOnBackground', val)}>
                                    <SelectTrigger className="bg-black border-white/10 h-8 text-sm">
                                        <SelectValue placeholder="false" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-black border-white/10">
                                        <SelectItem value="false" className="text-white">False (default)</SelectItem>
                                        <SelectItem value="true" className="text-white">True</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-xs text-gray-400">
                                    Set to "True" if you want to apply AI Vocals on the Background Vocals otherwise set it to "False".
                                </p>
                            </div>

                            <div className="space-y-1">
                                <Label className="text-white text-sm">Index Rate:</Label>
                                <div className="flex items-center space-x-2">
                                    <Slider
                                        value={[advanceSettings?.indexRate]}
                                        onValueChange={([value]) => updateAdvanceSetting('indexRate', value)}
                                        min={0}
                                        max={1}
                                        step={0.01}
                                        className="flex-1"
                                    />
                                    <span className="text-sm min-w-[2ch]">{advanceSettings?.indexRate.toFixed(2)}</span>
                                </div>
                                <p className="text-xs text-gray-400">Control how much of AI voice's accent to keep in vocals.</p>
                            </div>

                            <div className="space-y-1">
                                <Label className="text-white text-sm">Filter Radius:</Label>
                                <div className="flex items-center space-x-2">
                                    <Slider
                                        value={[advanceSettings?.filterRadius]}
                                        onValueChange={([value]) => updateAdvanceSetting('filterRadius', value)}
                                        min={1}
                                        max={5}
                                        step={0.1}
                                        className="flex-1"
                                    />
                                    <span className="text-sm min-w-[2ch]">{advanceSettings?.filterRadius.toFixed(1)}</span>
                                </div>
                                <p className="text-xs text-gray-400">Reduce Breathiness</p>
                            </div>

                            <div className="space-y-1">
                                <Label className="text-white text-sm">RMS Mix Rate:</Label>
                                <div className="flex items-center space-x-2">
                                    <Slider
                                        value={[advanceSettings?.rmsMixRate]}
                                        onValueChange={([value]) => updateAdvanceSetting('rmsMixRate', value)}
                                        min={0}
                                        max={1}
                                        step={0.01}
                                        className="flex-1"
                                    />
                                    <span className="text-sm min-w-[2ch]">{advanceSettings?.rmsMixRate.toFixed(2)}</span>
                                </div>
                                <p className="text-xs text-gray-400">Control how much to mimic original vocal's loudness.</p>
                            </div>

                            <div className="space-y-1">
                                <Label className="text-white text-sm">Protect Rate:</Label>
                                <div className="flex items-center space-x-2">
                                    <Slider
                                        value={[advanceSettings?.protectRate]}
                                        onValueChange={([value]) => updateAdvanceSetting('ProtectRate', value)}
                                        min={0}
                                        max={1}
                                        step={0.01}
                                        className="flex-1"
                                    />
                                    <span className="text-sm min-w-[2ch]">{advanceSettings?.protectRate.toFixed(2)}</span>
                                </div>
                                <p className="text-xs text-gray-400">
                                    Protect voiceless consonants and breath sounds. Set to 0.5 to disable it.
                                </p>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

