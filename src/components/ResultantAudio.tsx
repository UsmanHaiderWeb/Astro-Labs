/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'
import { Button } from './ui/button'
import { Download, Pause, Play } from 'lucide-react'
import { Slider } from './ui/slider'
import { formatTime } from '@/lib/formatTime'

const ResultantAudio = ({ id, name, src }: { id: number, name: string, src: string }) => {
    const [playAudio, setPlayAudio] = React.useState<boolean>(false);
    const [audioTrackValue, setAudioTrackValue] = React.useState<{ max: number; value: number }>(null);
    const audio = React.useRef<HTMLAudioElement>(null);
    const slider = React.useRef<HTMLInputElement>(null);

    return (
        <div className="bg-black/50 rounded-lg p-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <Button size="icon" variant="ghost" className="text-white h-8 w-8" onClick={() => {
                        if(audio.current?.readyState < 2) return;
                        if (playAudio) {
                            audio.current?.pause()
                            setPlayAudio(false);
                        } else {
                            audio.current?.play()
                        }
                    }}>
                        {playAudio ?
                            <Pause className="h-4 w-4" />
                            :
                            <Play className="h-4 w-4" />
                        }
                    </Button>
                    <div>
                        <h3 className="text-white text-sm">{name}</h3>
                        <p className="text-white/60 text-xs">{audio.current?.currentTime && formatTime(audio.current?.currentTime)} / {audio.current?.duration && formatTime(audio.current?.duration)}</p>
                    </div>
                </div>
                <Button size="icon" variant="ghost" className="text-white h-8 w-8">
                    <Download className="h-4 w-4" />
                </Button>
            </div>
            <div className='px-3 mt-3 mb-2'>
                <Slider
                    ref={slider}
                    min={0}
                    max={audioTrackValue?.max}
                    step={1}
                    value={[audioTrackValue?.value || 0]}
                    onClick={() => console.log('clicking')}
                    onValueChange={([val]) => {
                        audio.current.currentTime = val;
                    }}
                />
            </div>
            <audio ref={audio} id={`resultantAudio${id}`} src={src || "/Bones.mp4"} preload='metadata' className='hidden'
                onPlay={() => {
                    for (let i = 0; i < 5; i++) {
                        if(i != id){
                            const audioElement = document.getElementById(`resultantAudio${i}`) as HTMLAudioElement;
                            if(audioElement){
                                audioElement?.pause()
                            }
                        }
                    }
                    const footerAudioPlayer = document.getElementById("footerAudioPlayer") as HTMLAudioElement;
                    footerAudioPlayer?.pause();
                    const selectedAudio = document.getElementById("selectedAudio") as HTMLAudioElement;
                    selectedAudio?.pause();
                    
                    setPlayAudio(true);
                }}
                onPause={() => {
                    setPlayAudio(false);
                }}
                onVolumeChange={() => {
                    console.log('volume')
                }}
                onLoadedMetadata={(e: any) => {
                    setAudioTrackValue(prev => ({ ...prev, max: Math.floor(e.target?.duration) }))
                }}
                onTimeUpdate={(e: React.ChangeEvent<HTMLAudioElement>) => {
                    setAudioTrackValue(prev => ({ ...prev, value: Math.floor(e.target?.currentTime) }))
                }}
            ></audio>
        </div>
    )
}

export default React.memo(ResultantAudio)