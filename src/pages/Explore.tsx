/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { YouTubeSection } from "@/components/explore/youtube-section"
import AudioSection from "@/components/explore/audio-section"
import ResultSection from "@/components/explore/result-section"
import { AdvancedSettingsDefaultData, AdvanceSettingsInterface, VoiceSelection } from '@/lib/interfaces&types'
import { Button } from '@/components/ui/button'
import { AdvancedSettings } from '@/components/explore/advanced-settings'
import axios, { AxiosError } from 'axios'
import DawSection from '@/components/explore/daw-section'
import { useMutation } from '@tanstack/react-query'
import { generateAudioCall } from '@/lib/AxiosCalls'

const Explore = () => {
    const [audioSelectedVoices, setAudioSelectedVoices] = React.useState<string[]>([])
    const [youtubeSelectedVoices, setYoutubeSelectedVoices] = React.useState<string[]>([])
    const [tab, setTab] = React.useState<'youtube' | 'audio'>('audio')
    const [audioPitch, setAudioPitch] = React.useState(0)
    const [youtubePitch, setYoutubePitch] = React.useState(0)
    const [audioUrl, setAudioUrl] = React.useState("")
    const [youtubeUrl, setYoutubeUrl] = React.useState("")
    const [youtubeAudioUrl, setYoutubeAudioUrl] = React.useState("")
    const [audioTimeRange, setAudioTimeRange] = React.useState<[number, number]>([0, 0])
    const [youtubeTimeRange, setYoutubeTimeRange] = React.useState<[number, number]>([0, 0])
    const [audioBuffer, setAudioBuffer] = React.useState<AudioBuffer>(null)
    const [audioFile, setAudioFile] = React.useState<File | null>(null)
    const [voiceSelections, setVoiceSelections] = React.useState<VoiceSelection[]>([])
    const [showAdvanced, setShowAdvanced] = React.useState(false)
    const [advanceSettings, setAdvanceSettings] = React.useState<AdvanceSettingsInterface>(AdvancedSettingsDefaultData)
    const [audioDuration, setAudioDuration] = React.useState(0) // Update 1: Initial duration set to 0
    const [youtubeDuration, setYoutubeDuration] = React.useState(0) // Update 1: Initial duration set to 0
    // const [audioUrl, setAudioUrl] = React.useState<string | null>(null)

    React.useEffect(() => {
        if (audioFile) {
            const reader = new FileReader()
            reader.onload = async (e) => {
                const arrayBuffer = e.target?.result as ArrayBuffer
                const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
                const decodedBuffer = await audioContext.decodeAudioData(arrayBuffer)
                setAudioBuffer(decodedBuffer)
                setAudioDuration(decodedBuffer.duration)
                setAudioTimeRange([0, decodedBuffer.duration])
            }
            reader.readAsArrayBuffer(audioFile)
        }
    }, [audioFile])

    const { mutate, data, isPending } = useMutation({
        mutationKey: ['generate audios', (tab ? audioFile : youtubeUrl)],
        mutationFn: generateAudioCall,
        onError: (error: AxiosError<{ detail: string }>) => {
            console.log("generateAudio error: ", error);
        },
        onSuccess: () => {}
    });

    const updateAdvanceSetting = (key: keyof AdvanceSettingsInterface, value: any) => {
        setAdvanceSettings(prev => ({ ...prev, [key]: value }))
    }

    const handleFileUpload = (file: File) => {
        if (file) {
            if (file.size <= 10 * 1024 * 1024 && (file.type === "audio/mpeg" || file.type === "audio/wav")) {
                // setFileName(file.name)
                setAudioFile(file)
                const url = URL.createObjectURL(file);
                setAudioUrl(url);
            } else {
                alert("Please upload an MP3 or WAV file under 10MB.")
            }
        }
    }

    // const handleFileUpload = (file: File) => {
    // }

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
                console.log("totalSeconds: ", totalSeconds)
                setYoutubeDuration(totalSeconds);
            }
        })();
    }, [youtubeUrl])

    return (
        <div className="flex-1 container mx-auto px-4 pt-6 pb-20 max-w-[1200px]">
            <h1 className='text-3xl mb-5 text-center'>AI Cover</h1>
            <div className="grid grid-cols-1 lg:grid-cols-5 group-data-[sidebaropen=true]:lg:grid-cols-6 gap-4">
                {/* Left Panel */}
                <div className="lg:col-span-2 group-data-[sidebaropen=true]:lg:col-span-3 bg-[#1a1a1a] rounded-xl overflow-hidden flex items-start flex-col">
                    <div className='flex flex-grow justify-between w-full max-h-[420x] h-full'>
                        <Tabs defaultValue={tab} onValueChange={(val: 'youtube' | 'audio') => setTab(val)} className="w-full flex-grow group">
                            <div className="px-4 pt-4 flex-shrink-0">
                                <TabsList className="w-full bg-transparent grid grid-cols-2 gap-2">
                                    <TabsTrigger
                                        value="audio"
                                        className="py-3 data-[state=active]:bg-[#292929] bg-transparent text-white border-0 data-[state=active]:text-white rounded-sm cursor-pointer"
                                    >
                                        Audio File
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="youtube"
                                        className="py-3 data-[state=active]:bg-[#292929] bg-transparent text-white border-0 data-[state=active]:text-white rounded-sm cursor-pointer"
                                    >
                                        YouTube
                                    </TabsTrigger>
                                </TabsList>
                            </div>
                            <div className="p-4 flex-grow flex items-center flex-col justify-between">
                                <div className='w-full'>
                                    <div data-selectedtabaicover={tab} className="data-[selectedtabaicover=youtube]:block data-[selectedtabaicover=audio]:hidden m-0">
                                        <YouTubeSection
                                            url={youtubeUrl}
                                            setUrl={setYoutubeUrl}
                                            selectedVoices={youtubeSelectedVoices}
                                            setSelectedVoices={setYoutubeSelectedVoices}
                                            pitch={youtubePitch}
                                            setPitch={setYoutubePitch}
                                            duration={youtubeDuration}
                                        />
                                    </div>
                                    <div data-selectedtabaicover={tab} className="data-[selectedtabaicover=audio]:block data-[selectedtabaicover=youtube]:hidden m-0">
                                        <AudioSection
                                            selectedVoices={audioSelectedVoices}
                                            setSelectedVoices={setAudioSelectedVoices}
                                            pitch={audioPitch}
                                            setPitch={setAudioPitch}
                                            onFileUpload={handleFileUpload}
                                        />
                                    </div>
                                </div>
                                <div className='mt-3 w-full'>
                                    <Button
                                        variant="link"
                                        className="text-white/60 p-0 h-auto text-xs uppercase hover:text-white cursor-pointer"
                                        onClick={() => setShowAdvanced(true)}
                                    >
                                        Advanced Settings
                                    </Button>
                                    <div className="pt-2">
                                        <Button className="w-full bg-black hover:bg-black/80 text-white cursor-pointer" onClick={() => console.log("advanceSettings: ", advanceSettings)}>Convert</Button>
                                    </div>
                                </div>
                            </div>
                        </Tabs>
                    </div>
                    <AdvancedSettings open={showAdvanced} onOpenChange={setShowAdvanced} advanceSettings={advanceSettings} updateAdvanceSetting={updateAdvanceSetting} />
                </div>

                {/* Right Panel */}
                <div className="lg:col-span-3 space-y-4">
                    <DawSection
                        selectedVoices={tab == 'youtube' ? youtubeSelectedVoices : audioSelectedVoices}
                        timeRange={tab == 'youtube' ? youtubeTimeRange : audioTimeRange}
                        voiceSelections={voiceSelections}
                        setVoiceSelections={setVoiceSelections}
                        duration={tab == 'youtube' ? youtubeDuration : audioDuration}
                        audioUrl={audioUrl}
                        tab={tab}
                        url={youtubeAudioUrl}
                        audioBuffer={audioBuffer}
                        audioFile={audioFile}
                    />
                    <ResultSection />
                </div>
            </div>
        </div>
    )
}

export default React.memo(Explore)

// build a full fledge image editing web application using react, tailwind css, react router dom and shadcn ui