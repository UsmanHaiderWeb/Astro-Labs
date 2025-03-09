"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

interface AdvancedSettingsProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AdvancedSettings({ open, onOpenChange }: AdvancedSettingsProps) {
  const [pitchMethod, setPitchMethod] = React.useState("rmvpe")
  const [applyAIOnBackground, setApplyAIOnBackground] = React.useState("false")
  const [pitchBackgroundInstrumental, setPitchBackgroundInstrumental] = React.useState(0)
  const [mainVocalsVolume, setMainVocalsVolume] = React.useState(0)
  const [backgroundVocalsVolume, setBackgroundVocalsVolume] = React.useState(0)
  const [instrumentalsVolume, setInstrumentalsVolume] = React.useState(0)
  const [indexRate, setIndexRate] = React.useState(0.5)
  const [filterRadius, setFilterRadius] = React.useState(3)
  const [rmsMixRate, setRmsMixRate] = React.useState(0.25)
  const [protectRate, setProtectRate] = React.useState(0.33)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1A1A1A] border-white/10 text-white max-w-3xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">ADVANCED SETTINGS</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 py-4">
          <div className="space-y-4">
            <div className="space-y-1">
              <Label className="text-white text-sm">Pitch Method:</Label>
              <Select value={pitchMethod} onValueChange={setPitchMethod}>
                <SelectTrigger className="bg-black border-white/10 h-8 text-sm">
                  <SelectValue placeholder="rmvpe (default)" />
                </SelectTrigger>
                <SelectContent className="bg-black border-white/10">
                  <SelectItem value="rmvpe">rmvpe (default)</SelectItem>
                  <SelectItem value="mangio-crepe">mangio-crepe</SelectItem>
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
                  value={[pitchBackgroundInstrumental]}
                  onValueChange={([value]) => setPitchBackgroundInstrumental(value)}
                  min={-12}
                  max={12}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm min-w-[2ch]">{pitchBackgroundInstrumental}</span>
              </div>
              <p className="text-xs text-gray-400">Changing pitch can lead to alteration in quality.</p>
            </div>

            <div className="space-y-1">
              <Label className="text-white text-sm">Main Vocals Volume:</Label>
              <div className="flex items-center space-x-2">
                <Slider
                  value={[mainVocalsVolume]}
                  onValueChange={([value]) => setMainVocalsVolume(value)}
                  min={0}
                  max={10}
                  step={0.1}
                  className="flex-1"
                />
                <span className="text-sm min-w-[2ch]">{mainVocalsVolume.toFixed(1)}</span>
              </div>
              <p className="text-xs text-gray-400">Control volume of the Main Vocals.</p>
            </div>

            <div className="space-y-1">
              <Label className="text-white text-sm">Background Vocals Volume:</Label>
              <div className="flex items-center space-x-2">
                <Slider
                  value={[backgroundVocalsVolume]}
                  onValueChange={([value]) => setBackgroundVocalsVolume(value)}
                  min={0}
                  max={10}
                  step={0.1}
                  className="flex-1"
                />
                <span className="text-sm min-w-[2ch]">{backgroundVocalsVolume.toFixed(1)}</span>
              </div>
              <p className="text-xs text-gray-400">Control volume of the Background Vocals.</p>
            </div>

            <div className="space-y-1">
              <Label className="text-white text-sm">Instrumentals Volume:</Label>
              <div className="flex items-center space-x-2">
                <Slider
                  value={[instrumentalsVolume]}
                  onValueChange={([value]) => setInstrumentalsVolume(value)}
                  min={0}
                  max={10}
                  step={0.1}
                  className="flex-1"
                />
                <span className="text-sm min-w-[2ch]">{instrumentalsVolume.toFixed(1)}</span>
              </div>
              <p className="text-xs text-gray-400">Control volume of the Instrumentals.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <Label className="text-white text-sm">Apply AI on Background Vocals:</Label>
              <Select value={applyAIOnBackground} onValueChange={setApplyAIOnBackground}>
                <SelectTrigger className="bg-black border-white/10 h-8 text-sm">
                  <SelectValue placeholder="False (default)" />
                </SelectTrigger>
                <SelectContent className="bg-black border-white/10">
                  <SelectItem value="false">False (default)</SelectItem>
                  <SelectItem value="true">True</SelectItem>
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
                  value={[indexRate]}
                  onValueChange={([value]) => setIndexRate(value)}
                  min={0}
                  max={1}
                  step={0.01}
                  className="flex-1"
                />
                <span className="text-sm min-w-[2ch]">{indexRate.toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-400">Control how much of AI voice's accent to keep in vocals.</p>
            </div>

            <div className="space-y-1">
              <Label className="text-white text-sm">Filter Radius:</Label>
              <div className="flex items-center space-x-2">
                <Slider
                  value={[filterRadius]}
                  onValueChange={([value]) => setFilterRadius(value)}
                  min={1}
                  max={5}
                  step={0.1}
                  className="flex-1"
                />
                <span className="text-sm min-w-[2ch]">{filterRadius.toFixed(1)}</span>
              </div>
              <p className="text-xs text-gray-400">Reduce Breathiness</p>
            </div>

            <div className="space-y-1">
              <Label className="text-white text-sm">RMS Mix Rate:</Label>
              <div className="flex items-center space-x-2">
                <Slider
                  value={[rmsMixRate]}
                  onValueChange={([value]) => setRmsMixRate(value)}
                  min={0}
                  max={1}
                  step={0.01}
                  className="flex-1"
                />
                <span className="text-sm min-w-[2ch]">{rmsMixRate.toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-400">Control how much to mimic original vocal's loudness.</p>
            </div>

            <div className="space-y-1">
              <Label className="text-white text-sm">Protect Rate:</Label>
              <div className="flex items-center space-x-2">
                <Slider
                  value={[protectRate]}
                  onValueChange={([value]) => setProtectRate(value)}
                  min={0}
                  max={1}
                  step={0.01}
                  className="flex-1"
                />
                <span className="text-sm min-w-[2ch]">{protectRate.toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-400">
                Protect voiceless consonants and breath sounds. Set to 0.5 to disable it.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

