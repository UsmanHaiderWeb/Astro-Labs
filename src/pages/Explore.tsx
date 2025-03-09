/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { YouTubeSection } from "@/components/explore/youtube-section"
import { AudioSection } from "@/components/explore/audio-section"
import { DAWSection } from "@/components/explore/daw-section"
import ResultSection from "@/components/explore/result-section"
import { AdvancedSettingsDefaultData, AdvanceSettingsInterface, VoiceSelection } from '@/lib/interfaces&types'
import { Button } from '@/components/ui/button'
import { AdvancedSettings } from '@/components/explore/advanced-settings'
import axios from 'axios'

const Explore = () => {
    const [audioSelectedVoices, setAudioSelectedVoices] = React.useState<string[]>([])
    const [youtubeSelectedVoices, setYoutubeSelectedVoices] = React.useState<string[]>([])
    const [tab, setTab] = React.useState<'youtube' | 'audio'>('youtube')
    const [audioPitch, setAudioPitch] = React.useState(0)
    const [youtubePitch, setYoutubePitch] = React.useState(0)
    const [youtubeUrl, setYoutubeUrl] = React.useState("")
    const [audioTimeRange, setAudioTimeRange] = React.useState<[number, number]>([0, 0])
    const [youtubeTimeRange, setYoutubeTimeRange] = React.useState<[number, number]>([0, 0])
    const [audioFile, setAudioFile] = React.useState<File | null>(null)
    const [voiceSelections, setVoiceSelections] = React.useState<VoiceSelection[]>([])
    const [showAdvanced, setShowAdvanced] = React.useState(false)
    const [advanceSettings, setAdvanceSettings] = React.useState<AdvanceSettingsInterface>(AdvancedSettingsDefaultData)
    const [duration, setDuration] = React.useState(0) // Update 1: Initial duration set to 0
    const [audioBuffer, setAudioBuffer] = React.useState<AudioBuffer | null>(null)

    const updateAdvanceSetting = (key: keyof AdvanceSettingsInterface, value: any) => {
        setAdvanceSettings(prev => ({ ...prev, [key]: value }))
    }

    const handleFileUpload = (file: File) => {
        setAudioFile(file)
    }

    React.useEffect(() => {
        if (audioFile) {
            const reader = new FileReader()
            reader.onload = async (e) => {
                const arrayBuffer = e.target?.result as ArrayBuffer
                const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
                const decodedBuffer = await audioContext.decodeAudioData(arrayBuffer)
                setAudioBuffer(decodedBuffer)
                setDuration(decodedBuffer.duration)
                setAudioTimeRange([0, decodedBuffer.duration])
            }
            reader.readAsArrayBuffer(audioFile)
        }
    }, [audioFile, tab])

    React.useEffect(() => {
        (async () => {
            if (youtubeUrl && youtubeUrl.includes("https://www.youtube.com/watch?v=")) {
                const videoId = youtubeUrl.split("watch?v=")[1];
                const videoDetails = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails,snippet&key=AIzaSyBEt1oYb9Hv6GOGVqeJUdZpzhmWDYQnsGE`)
                console.log("videoDetails: ", videoDetails.data?.items?.[0]?.contentDetails?.duration);
                const durationString = videoDetails.data?.items?.[0]?.contentDetails?.duration;
                const match = durationString.match(/PT(\d+M)?(\d+S)?/);
                const minutes = match[1] ? parseInt(match[1].slice(0, -1)) : 0;
                const seconds = match[2] ? parseInt(match[2].slice(0, -1)) : 0;
                const totalSeconds = minutes * 60 + seconds;
                setYoutubeTimeRange([0, totalSeconds]);
                setDuration(totalSeconds);
            }
        })();
    }, [youtubeUrl, tab])

    return (
        <div className="flex-1 container mx-auto px-4 py-6 max-w-[1400px]">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 h-full">
                {/* Left Panel */}
                <div className="lg:col-span-2 bg-[#1a1a1a] rounded-xl overflow-hidden">
                    <Tabs defaultValue={tab} onValueChange={(val: 'youtube' | 'audio') => setTab(val)} className="w-full">
                        <div className="px-4 pt-4">
                            <TabsList className="w-full bg-transparent grid grid-cols-2 gap-2">
                                <TabsTrigger
                                    value="youtube"
                                    className="py-3 data-[state=active]:bg-[#292929] bg-transparent text-white border-0"
                                >
                                    YouTube
                                </TabsTrigger>
                                <TabsTrigger
                                    value="audio"
                                    className="py-3 data-[state=active]:bg-[#292929] bg-transparent text-white border-0"
                                >
                                    Audio File
                                </TabsTrigger>
                            </TabsList>
                        </div>
                        <div className="p-4">
                            <TabsContent value="youtube" className="m-0">
                                <YouTubeSection
                                    url={youtubeUrl}
                                    setUrl={setYoutubeUrl}
                                    selectedVoices={youtubeSelectedVoices}
                                    setSelectedVoices={setYoutubeSelectedVoices}
                                    pitch={youtubePitch}
                                    setPitch={setYoutubePitch}
                                />
                            </TabsContent>
                            <TabsContent value="audio" className="m-0">
                                <AudioSection
                                    selectedVoices={audioSelectedVoices}
                                    setSelectedVoices={setAudioSelectedVoices}
                                    pitch={audioPitch}
                                    setPitch={setAudioPitch}
                                    onFileUpload={handleFileUpload}
                                />
                            </TabsContent>
                            <div className='mt-3'>
                                <Button
                                    variant="link"
                                    className="text-white/60 p-0 h-auto text-xs uppercase hover:text-white"
                                    onClick={() => setShowAdvanced(true)}
                                >
                                    Advanced Settings
                                </Button>
                                <div className="pt-2">
                                    <Button className="w-full bg-black hover:bg-black/80 text-white" onClick={() => console.log("advanceSettings: ", advanceSettings)}>Convert</Button>
                                </div>
                            </div>
                        </div>
                    </Tabs>
                    <AdvancedSettings open={showAdvanced} onOpenChange={setShowAdvanced} advanceSettings={advanceSettings} updateAdvanceSetting={updateAdvanceSetting} />
                </div>

                {/* Right Panel */}
                <div className="lg:col-span-3 space-y-4">
                    <DAWSection
                        selectedVoices={tab == 'youtube' ? youtubeSelectedVoices : audioSelectedVoices}
                        timeRange={tab == 'youtube' ? youtubeTimeRange : audioTimeRange}
                        audioFile={audioFile}
                        voiceSelections={voiceSelections}
                        setVoiceSelections={setVoiceSelections}
                        duration={duration}
                        audioBuffer={audioBuffer}
                    />
                    <ResultSection />
                </div>
            </div>
        </div>
    )
}

export default React.memo(Explore)