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
            <DialogContent className="bg-[#1A1A1A] border-white/10 text-white sm:max-w-4xl px-0 border-none outline-none z-[300]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-center">ADVANCED SETTINGS</DialogTitle>
                    <DialogDescription className="hidden">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque, facilis. Dolor, omnis eveniet debitis earum, amet eum, provident consectetur magnam consequatur praesentium eos commodi repellendus fugit ducimus molestias similique sapiente?</DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-max px-7">
                    <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 items-start py-6">
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <Label className="text-white text-sm flex justify-between items-center pr-10">Pitch Method:</Label>
                                <Select defaultValue={advanceSettings?.f0_method} onValueChange={val => updateAdvanceSetting('f0_method', val)}>
                                    <SelectTrigger className="bg-black border-white/10 h-8 text-sm text-white w-[160px]">
                                        <SelectValue placeholder="rmvpe" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-black border-white/10 text-white z-[301]">
                                        <SelectItem value="rmvpe" className="text-white text-sm">rmvpe (default)</SelectItem>
                                        {/* <SelectItem value="mangio-crepe" className="text-white text-sm">mangio-crepe</SelectItem> */}
                                    </SelectContent>
                                </Select>
                                <p className="text-xs text-gray-400">
                                    The method rmvpe ensures clarity in the vocals
                                </p>
                            </div>

                            <div className="space-y-1">
                                <Label className="text-white text-sm flex justify-between items-center pr-7">
                                    Pitch for Background & Instrumental :
                                    <span>(Default: 0)</span>
                                </Label>
                                <div className="flex items-center space-x-2">
                                    <Slider
                                        value={[advanceSettings?.overall_pitch]}
                                        onValueChange={([value]) => updateAdvanceSetting('overall_pitch', value)}
                                        min={-12}
                                        max={12}
                                        step={1}
                                        className="flex-1"
                                    />
                                    <span className="text-sm min-w-[2ch]">{advanceSettings?.overall_pitch}</span>
                                </div>
                                <p className="text-xs text-gray-400">Changing pitch can lead to alteration in quality.</p>
                            </div>

                            <div className="space-y-1">
                                <Label className="text-white text-sm flex justify-between items-center pr-8">
                                    Main Vocals Volume:
                                    <span>(Default: 0.0)</span>
                                </Label>
                                <div className="flex items-center space-x-2">
                                    <Slider
                                        value={[advanceSettings?.main_vocals_volume]}
                                        onValueChange={([value]) => updateAdvanceSetting('main_vocals_volume', value)}
                                        min={0}
                                        max={10}
                                        step={1}
                                        className="flex-1"
                                    />
                                    <span className="text-sm min-w-[2ch]">{advanceSettings?.main_vocals_volume.toFixed(1)}</span>
                                </div>
                                <p className="text-xs text-gray-400">Control volume of the Main Vocals.</p>
                            </div>

                            <div className="space-y-1">
                                <Label className="text-white text-sm flex justify-between items-center pr-8">
                                    Background Vocals Volume:
                                    <span>(Default: 0.0)</span>
                                </Label>
                                <div className="flex items-center space-x-2">
                                    <Slider
                                        value={[advanceSettings?.backup_vocals_volume]}
                                        onValueChange={([value]) => updateAdvanceSetting('backup_vocals_volume', value)}
                                        min={0}
                                        max={10}
                                        step={1}
                                        className="flex-1"
                                    />
                                    <span className="text-sm min-w-[2ch]">{advanceSettings?.backup_vocals_volume.toFixed(1)}</span>
                                </div>
                                <p className="text-xs text-gray-400">Control volume of the Background Vocals.</p>
                            </div>

                            <div className="space-y-1">
                                <Label className="text-white text-sm flex justify-between items-center pr-8">
                                    Instrumentals Volume:
                                    <span>(Default: 0.0)</span>
                                    </Label>
                                <div className="flex items-center space-x-2">
                                    <Slider
                                        value={[advanceSettings?.inst_volume]}
                                        onValueChange={([value]) => updateAdvanceSetting('inst_volume', value)}
                                        min={0}
                                        max={10}
                                        step={1}
                                        className="flex-1"
                                    />
                                    <span className="text-sm min-w-[2ch]">{advanceSettings?.inst_volume.toFixed(1)}</span>
                                </div>
                                <p className="text-xs text-gray-400">Control volume of the Instrumentals.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <Label className="text-white text-sm flex justify-between items-center pr-10">Apply AI on Background Vocals:</Label>
                                <Select value={advanceSettings?.cover_background_vocals} onValueChange={val => updateAdvanceSetting('cover_background_vocals', val)}>
                                    <SelectTrigger className="bg-black border-white/10 h-8 text-sm text-white w-[150px]">
                                        <SelectValue placeholder="false" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-black border-white/10 text-white z-[301]">
                                        <SelectItem value="false" className="text-white text-sm">False (default)</SelectItem>
                                        <SelectItem value="true" className="text-white text-sm">True</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-xs text-gray-400">
                                    Set to "True" if you want to apply AI Vocals on the Background Vocals otherwise set it to "False".
                                </p>
                            </div>

                            <div className="space-y-1">
                                <Label className="text-white text-sm flex justify-between items-center pr-10">
                                    Index Rate:
                                    <span>(Default: 0.50)</span>
                                    </Label>
                                <div className="flex items-center space-x-2">
                                    <Slider
                                        value={[advanceSettings?.index_rate]}
                                        onValueChange={([value]) => updateAdvanceSetting('index_rate', value)}
                                        min={0}
                                        max={1}
                                        step={0.01}
                                        className="flex-1"
                                    />
                                    <span className="text-sm min-w-[2ch]">{advanceSettings?.index_rate.toFixed(2)}</span>
                                </div>
                                <p className="text-xs text-gray-400">Control how much of AI voice's accent to keep in vocals.</p>
                            </div>

                            <div className="space-y-1">
                                <Label className="text-white text-sm flex justify-between items-center pr-10">
                                    Filter Radius:
                                    <span>(Default: 3.0)</span>
                                    </Label>
                                <div className="flex items-center space-x-2">
                                    <Slider
                                        value={[advanceSettings?.filter_radius]}
                                        onValueChange={([value]) => updateAdvanceSetting('filter_radius', value)}
                                        min={1}
                                        max={5}
                                        step={1}
                                        className="flex-1"
                                    />
                                    <span className="text-sm min-w-[2ch]">{advanceSettings?.filter_radius.toFixed(1)}</span>
                                </div>
                                <p className="text-xs text-gray-400">Reduce Breathiness</p>
                            </div>

                            <div className="space-y-1">
                                <Label className="text-white text-sm flex justify-between items-center pr-10">
                                    RMS Mix Rate:
                                    <span>(Default: 0.25)</span>
                                    </Label>
                                <div className="flex items-center space-x-2">
                                    <Slider
                                        value={[advanceSettings?.rms_mix_rate]}
                                        onValueChange={([value]) => updateAdvanceSetting('rms_mix_rate', value)}
                                        min={0}
                                        max={1}
                                        step={0.01}
                                        className="flex-1"
                                    />
                                    <span className="text-sm min-w-[2ch]">{advanceSettings?.rms_mix_rate.toFixed(2)}</span>
                                </div>
                                <p className="text-xs text-gray-400">Control how much to mimic original vocal's loudness.</p>
                            </div>

                            <div className="space-y-1">
                                <Label className="text-white text-sm flex justify-between items-center pr-10">
                                    Protect Rate:
                                    <span>(Default: 0.33)</span>
                                    </Label>
                                <div className="flex items-center space-x-2">
                                    <Slider
                                        value={[advanceSettings?.protect_rate]}
                                        onValueChange={([value]) => updateAdvanceSetting('protect_rate', value)}
                                        min={0}
                                        max={1}
                                        step={0.01}
                                        className="flex-1"
                                    />
                                    <span className="text-sm min-w-[2ch]">{advanceSettings?.protect_rate.toFixed(2)}</span>
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

