/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { YouTubeSection } from "@/components/explore/youtube-section"
import AudioSection from "@/components/explore/audio-section"
import ResultSection from "@/components/explore/result-section"
import { AdvancedSettingsDefaultData, AdvanceSettingsInterface, VoiceSelection } from '@/lib/interfaces&types'
import { Button } from '@/components/ui/button'
import { AdvancedSettings } from '@/components/explore/advanced-settings'
import axios, { AxiosError } from 'axios'
import DawSection from '@/components/explore/daw-section'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { generateAudioCall, uploadAudioCall } from '@/lib/AxiosCalls'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { showToast } from '@/lib/ShowToast'

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
    const [isAdvanceSettingsUpdate, setIsAdvanceSettingsUpdate] = React.useState<boolean>(false)
    const [advanceSettings, setAdvanceSettings] = React.useState<AdvanceSettingsInterface>(AdvancedSettingsDefaultData)
    const [audioDuration, setAudioDuration] = React.useState(0) // Update 1: Initial duration set to 0
    const [youtubeDuration, setYoutubeDuration] = React.useState(0) // Update 1: Initial duration set to 0
    // const [audioUrl, setAudioUrl] = React.useState<string | null>(null)

    const queryClient = useQueryClient();
    const [isGenerating, setIsGenerating] = React.useState<'pending' | 'failed' | 'done'>(null); // Update 1: Initial duration set to 0
    const isGeneratingLocal = localStorage.getItem('isGenerating') as 'pending' | 'failed' | 'done';

    React.useEffect(() => {
        if (isGeneratingLocal) setIsGenerating(isGeneratingLocal);
    }, [])

    React.useEffect(() => {
        if (audioFile) {
            setAudioSelectedVoices([]);
            setVoiceSelections([]);

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

    const { mutate, isPending } = useMutation({
        mutationKey: ['generate audios', (tab ? audioFile : youtubeUrl)],
        mutationFn: generateAudioCall,
        onError: (error: AxiosError<{ detail: string }>) => {
            console.log("generateAudio error: ", error);
            localStorage.setItem('isGenerating', 'failed');
            if (error.status == 401) return showToast("Please login to generate audio.");
            showToast("Something went wrong. Please try again.");
            setIsGenerating('failed');
        },
        onSuccess: (data: { job_id: string, status: 'queued' | 'failed' }) => {
            console.log("generateAudio success: ", data);
            localStorage.setItem('job_id', data.job_id);
            if (data.status == 'queued') {
                localStorage.setItem('isGenerating', 'pending');
                setIsGenerating('pending');
            }

            const queueSize = queryClient.getQueryData<{ queue_size: number }>(['queue-size']);
            if (queueSize?.queue_size > 0) {
                showToast("Please wait for the generation to complete until queue size becomes zero.")
            }
        }
    });

    const handleFileStoringOnCloud = useMutation({
        mutationKey: ['handleFileStoringOnCloud', audioUrl],
        mutationFn: uploadAudioCall,
        onError: (error: AxiosError<{ detail: string }>) => {
            console.log("handleFileStoringOnCloud error: ", error);
            localStorage.setItem('isGenerating', 'failed');
            if (error.status == 401) return showToast("Please login to generate audio.");
            showToast("Something went wrong. Please try again.");
            setIsGenerating('failed');        },
        onSuccess: (data: { audio_url: string }) => {
            const task_type: 'regular' | 'file' | 'advanced' | 'advanced-file' | 'multiple' = (
                tab == 'audio' ?
                    (isAdvanceSettingsUpdate ?
                        (audioSelectedVoices?.length == 0 ? 'advanced-file' : 'multiple') :
                        (audioSelectedVoices?.length == 0 ? 'file' : 'multiple'))
                    : (isAdvanceSettingsUpdate ? 'advanced' : 'regular')
            )

            const formData: any = new FormData();
            formData.append('task_type', task_type);
            formData.append('audio_url', data?.audio_url);

            if (isAdvanceSettingsUpdate) {
                Object.keys(advanceSettings)?.forEach((key, idx) => {
                    formData.append(key, Object.values(advanceSettings)?.[idx]);
                })
            };

            if (voiceSelections.length > 0) {
                formData.append('voice_one', voiceSelections[0].voice);
                formData.append('pitch_one', audioPitch.toString());
                formData.append('singer1_start', new Date(voiceSelections[0].range[0] * 1000).toISOString().substring(11, 19));
                formData.append('singer1_end', new Date(voiceSelections[0].range[1] * 1000).toISOString().substring(11, 19));

                if (voiceSelections.length == 2){
                    formData.append('voice_two', voiceSelections[1].voice);
                    formData.append('pitch_two', audioPitch.toString());
                    formData.append('singer2_start', new Date(voiceSelections[1].range[0] * 1000).toISOString().substring(11, 19));
                    formData.append('singer2_end', new Date(voiceSelections[1].range[1] * 1000).toISOString().substring(11, 19));
                }
            } else {
                const voices: string | string[] = (
                    audioSelectedVoices?.length == 0 ? "Morgan Freeman RVC v2" : audioSelectedVoices
                )

                formData.append('voice', voices.toString());
                formData.append('pitch', audioPitch.toString());
            }

            mutate({
                token: localStorage.getItem('astraToken'),
                formData
            });
        }
    });

    const updateAdvanceSetting = (key: keyof AdvanceSettingsInterface, value: any) => {
        setIsAdvanceSettingsUpdate(true);
        setAdvanceSettings(prev => ({ ...prev, [key]: value }))
    }

    const handleFileUpload = (file: File) => {
        if (file) {
            if (file.size <= 15 * 1024 * 1024 && (file.type === "audio/mpeg" || file.type === "audio/wav")) {
                // setFileName(file.name)
                setAudioFile(file)
                const url = URL.createObjectURL(file);
                setAudioUrl(url);
            } else {
                alert("Please upload an MP3 or WAV file under 15MB.")
            }
        }
    }

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

    function handleGeneration(): any {
        const token = localStorage.getItem('astraToken');
        if (!token) return showToast("Please login to generate audio.");

        if ((tab === 'audio' ? !audioFile : !youtubeUrl) || isGenerating?.toLocaleLowerCase() == 'pending') return;

        localStorage.removeItem('job_id');
        localStorage.removeItem('audioLinks');
        localStorage.setItem('isGenerating', 'pending');
        setIsGenerating('pending');

        if (tab == 'audio' && audioFile) {
            const formData: any = new FormData();
            formData.append('file', audioFile);
            handleFileStoringOnCloud.mutate({ token, formData })
        }
    }

    return (
        <div className="flex-1 container mx-auto px-4 pt-4 pb-1.5 max-w-[1200px]">
            <h1 className='text-3xl mb-3.5 text-center'>AI Cover</h1>
            <div className="grid grid-cols-1 lg:grid-cols-6 group-data-[sidebaropen=true]:lg:grid-cols-6 gap-4">
                {/* Left Panel */}
                <div className="lg:col-span-3 group-data-[sidebaropen=true]:lg:col-span-3 bg-[#1a1a1a] rounded-xl overflow-hidden flex items-start flex-col">
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
                                        disabled
                                        value="youtube"
                                        className="py-3 data-[state=active]:bg-[#292929] bg-transparent text-white border-0 data-[state=active]:text-white rounded-sm cursor-pointer"
                                    >
                                        YouTube (Coming Soon)
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
                                        // isPending={isPending}
                                        />
                                    </div>
                                    <div data-selectedtabaicover={tab} className="data-[selectedtabaicover=audio]:block data-[selectedtabaicover=youtube]:hidden m-0">
                                        <AudioSection
                                            selectedVoices={audioSelectedVoices}
                                            setSelectedVoices={setAudioSelectedVoices}
                                            pitch={audioPitch}
                                            setPitch={setAudioPitch}
                                            onFileUpload={handleFileUpload}
                                            isPending={isPending}
                                            audioFile={audioFile}
                                            handleClearAudio={() => {
                                                setAudioFile(null);
                                                setAudioSelectedVoices([]);
                                                setAudioPitch(0);
                                                setAudioBuffer(null);
                                                const existingAudio = document.getElementById('selectedAudio') as HTMLAudioElement;
                                                existingAudio?.pause();
                                                for (let i = 0; i < 4; i++) {
                                                    const audio = document.getElementById(`resultantAudio${i}`) as HTMLAudioElement;
                                                    audio?.pause();
                                                }
                                                setAdvanceSettings(AdvancedSettingsDefaultData);
                                                setIsAdvanceSettingsUpdate(false);
                                                setIsGenerating(null);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className='mt-3 w-full'>
                                    <Button
                                        variant="link"
                                        className="text-white/60 p-0 h-auto text-xs uppercase hover:text-white cursor-pointer"
                                        onClick={() => setShowAdvanced(true)}
                                        disabled={isGenerating?.toLocaleLowerCase() == 'pending' || isPending}
                                    >
                                        Advanced Settings
                                    </Button>
                                    <div className="pt-2">
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    className="w-full bg-black hover:bg-black/80 text-white cursor-pointer disabled:pointer-events-auto disabled:opacity-30"
                                                    disabled={(tab === 'audio' ? !audioFile : !youtubeUrl) || isGenerating?.toLocaleLowerCase() == 'pending' || isPending}
                                                    onClick={() => handleGeneration()}
                                                >
                                                    {(isPending || isGenerating?.toLocaleLowerCase() == 'pending') ? 'Converting' : 'Convert'}
                                                </Button>
                                            </TooltipTrigger>
                                            {(() => {
                                                if (isGenerating?.toLowerCase() === 'pending') {
                                                    return (
                                                        <TooltipContent className='bg-black text-white'>
                                                            Please wait for the previous convertion to complete
                                                        </TooltipContent>
                                                    );
                                                }

                                                if (!((tab === 'audio' ? audioFile : youtubeUrl))) {
                                                    return (
                                                        <TooltipContent className='bg-black text-white'>
                                                            {tab === 'audio'
                                                                ? "Please select an audio file"
                                                                : "Please enter a YouTube URL"
                                                            }
                                                        </TooltipContent>
                                                    );
                                                }

                                                return null;
                                            })()}
                                        </Tooltip>
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
                    <ResultSection isPending={isPending} setIsGenerating={setIsGenerating} isGenerating={isGenerating} />
                </div>
            </div>
        </div>
    )
}

export default React.memo(Explore)

// build a full fledge image editing web application using react, tailwind css, react router dom and shadcn ui