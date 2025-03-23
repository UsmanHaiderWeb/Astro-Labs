/* eslint-disable react-hooks/exhaustive-deps */
import { Pause, Play } from 'lucide-react'
import * as React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const audiosArray = ['/Bones.mp4', '/audio.mp3', '/audio.mp3', '/Bones.mp4']

const FooterPlayBtn = () => {
    const [hovering, setHovering] = React.useState<boolean>(false);
    const [playMusic, setPlayMusic] = React.useState<boolean>(false);
    const audio = React.useRef<HTMLAudioElement>(null);
    const [currentAudio, setCurrentAudio] = React.useState<number>(0);

    return (
        <div className="fixed bottom-1 right-5 z-[101] group-data-[authenticated=notauthorized]:hidden flex">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <div data-footerplay={hovering ? 'true' : 'false'} className="relative w-11 h-11 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-200 group"
                            onMouseEnter={() => setHovering(true)}
                            onMouseLeave={() => setHovering(false)}
                            onClick={() => {
                                if (playMusic) {
                                    audio.current?.pause()
                                    setPlayMusic(false);
                                } else {
                                    audio.current?.play()
                                }
                            }}
                        >
                            <div className="absolute inset-0 flex items-center justify-center">
                                <img
                                    src="/logo.png"
                                    alt="Music Player"
                                    width={24}
                                    height={24}
                                    className="brightness-200 transition-opacity duration-200 group-data-[footerplay=true]:opacity-0"
                                />
                                {playMusic ?
                                    <Pause className="w-6 h-6 text-white absolute transition-opacity duration-200 opacity-0 group-data-[footerplay=true]:opacity-100" />
                                    :
                                    <Play className="w-6 h-6 text-white absolute transition-opacity duration-200 opacity-0 group-data-[footerplay=true]:opacity-100" />
                                }
                                <audio ref={audio} id='footerAudioPlayer' src='/Bones.mp4' className='hidden'
                                    onEnded={() => {
                                        audio.current.src = audiosArray[currentAudio == audiosArray.length - 1 ? 0 : currentAudio + 1];
                                        setCurrentAudio(prev => (prev == audiosArray.length - 1 ? 0 : prev + 1));
                                        audio.current?.play();
                                    }}
                                    onPlay={() => {
                                        for (let i = 0; i < 4; i++) {
                                            const audio = document.getElementById(`resultantAudio${i}`) as HTMLAudioElement;
                                            audio?.pause();
                                        }
                                        const audio = document.getElementById("selectedAudio") as HTMLAudioElement;
                                        audio?.pause();

                                        setPlayMusic(true);
                                    }}
                                    onPause={() => {
                                        setPlayMusic(false);
                                    }}
                                ></audio>
                            </div>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent className='bg-black font-normal tracking-wide'>
                        <p>{playMusic ? 'Pause the music' : 'Play music'}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}

export default React.memo(FooterPlayBtn)