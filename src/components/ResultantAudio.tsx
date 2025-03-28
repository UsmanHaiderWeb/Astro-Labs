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
    const slider = React.useRef<HTMLDivElement>(null);

    return (
        <div className="bg-black/50 rounded-lg p-3">
            <div className="w-full flex items-center justify-between overflow-hidden">
                <div className="w-full flex-shrink flex items-center space-x-3">
                    <Button size="icon" variant="ghost" className="flex-shrink-0 text-white h-8 w-8" onClick={() => {
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
                    <div className='flex-grow'>
                        <h3 className="text-white text-sm line-clamp-1">{name.replace('Download Link', '')}</h3>
                        <p className="text-white/60 text-xs">{audio.current?.currentTime ? formatTime(audio.current?.currentTime) : '0.00'} / {audio.current?.duration ? formatTime(audio.current?.duration) : '0.00'}</p>
                    </div>
                </div>
                <Button size="icon" variant="ghost" className="flex-grow text-white h-8 w-8" onClick={() => {
                    const link = document.createElement('a');
                    link.href = src;
                    link.download = name;
                    link.click();
                }}>
                    <Download className="h-4 w-4" />
                </Button>
            </div>
            <div className='px-3 mt-3 mb-2'>
                <Slider
                    className='resultAudioSlider'
                    ref={slider}
                    min={0}
                    max={audioTrackValue?.max}
                    step={1}
                    value={[audioTrackValue?.value || 0]}
                    onClick={() => {}}
                    onValueChange={([val]) => {
                        audio.current.currentTime = val;
                    }}
                />
            </div>
            <audio ref={audio} id={`resultantAudio${id}`} src={src || "/audio.mp3"} preload='metadata' className='hidden'
                onPlay={() => {
                    for (let i = 0; i < 5; i++) {
                        if (i != id) {
                            const audioElement = document.getElementById(`resultantAudio${i}`) as HTMLAudioElement;
                            if (audioElement) {
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

//     < div className = "w-9 h-9 rounded-full bg-grayBackground border border-white/20 transition-all duration-200 flex justify-center items-center"
// onClick = {() => {
//     if (playAudio) {
//         audio.current?.pause();
//     } else {
//         audio.current?.play();
//         if (waveformRef.current) {
//             // setShowWaveForm(true)
//             wavesurfer.current = WaveSurfer.create({
//                 container: waveformRef.current,
//                 // waveColor: "white",
//                 // progressColor: "purple",
//                 cursorColor: "transparent",
//                 barWidth: 3,
//                 height: 'auto',
//                 width: '100%',
//                 barRadius: 50,
//             });

//             (async () => {
//                 await wavesurfer.current.load('https://cdn.pixabay.com/audio/2023/09/19/audio_31acfa1a19.mp3');
//                 // setShowWaveForm(false)
//             })()
//         } else {
//             wavesurfer.current?.destroy();
//         }
//     }
// }}
// >
//     {
//         playAudio?
//             <Pause size = { 16 } />
//     :
// <Play size={16} />
// }
// </div >
// <div ref={waveformRef} className="flex-grow h-10 rounded-lg pointer-events-none" />
// <div className='flex-grow'>
// <p className="text-white/60 text-xs">{audio.current?.currentTime ? formatTime(audio.current?.currentTime) : '0.00'} / {audio.current?.duration ? formatTime(audio.current?.duration) : '0.00'}</p>
// </div>