import * as React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { YouTubeSection } from "@/components/explore/youtube-section"
import { AudioSection } from "@/components/explore/audio-section"
import { DAWSection } from "@/components/explore/daw-section"
import ResultSection from "@/components/explore/result-section"

const Explore = () => {
    const [selectedVoices, setSelectedVoices] = React.useState<string[]>([])
    const [pitch, setPitch] = React.useState(0)
    const [youtubeUrl, setYoutubeUrl] = React.useState("")
    const [timeRange, setTimeRange] = React.useState<[number, number]>([0, 0])
    const [audioFile, setAudioFile] = React.useState<File | null>(null)

    const handleFileUpload = (file: File) => {
        setAudioFile(file)
    }

    return (
        <div className="flex-1 container mx-auto px-4 py-6 max-w-[1400px]">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 h-full">
                {/* Left Panel */}
                <div className="lg:col-span-2 bg-[#1a1a1a] rounded-xl overflow-hidden">
                    <Tabs defaultValue="youtube" className="w-full">
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
                                    selectedVoices={selectedVoices}
                                    setSelectedVoices={setSelectedVoices}
                                    pitch={pitch}
                                    setPitch={setPitch}
                                />
                            </TabsContent>
                            <TabsContent value="audio" className="m-0">
                                <AudioSection
                                    selectedVoices={selectedVoices}
                                    setSelectedVoices={setSelectedVoices}
                                    pitch={pitch}
                                    setPitch={setPitch}
                                    onFileUpload={handleFileUpload}
                                />
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>

                {/* Right Panel */}
                <div className="lg:col-span-3 space-y-4">
                    <DAWSection
                        selectedVoices={selectedVoices}
                        timeRange={timeRange}
                        setTimeRange={setTimeRange}
                        audioFile={audioFile}
                    />
                    <ResultSection />
                </div>
            </div>
        </div>
    )
}

export default React.memo(Explore)