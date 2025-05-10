/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react'
import ResultantAudio from '../ResultantAudio'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAudioLinksCall } from '@/lib/AxiosCalls';
import QueueSize from '../QueueSize';
import { RefreshCcw } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';

// const results = [
//     { id: 1, name: "Cover", src: '/Bones.mp4' },
//     { id: 2, name: "Main Vocals", src: '/audio.mp3' },
//     { id: 3, name: "Background Vocals", src: '/audio.mp3' },
//     { id: 4, name: "Instrumentals", src: '/Bones.mp4' },
// ]

type audioLinksType = {
    main_vocals_url: string;
    cover_url: string;
    background_vocals_url: string;
    instrumentals_url: string;
}

function ResultSection({ isPending, setIsGenerating, isGenerating }: { isPending: boolean, setIsGenerating: React.Dispatch<React.SetStateAction<'pending' | 'failed' | 'done'>>, isGenerating: 'pending' | 'failed' | 'done' }) {
    const job_id = localStorage.getItem('job_id');
    const audioLinksLocal = JSON.parse(localStorage.getItem('audioLinks') || '[]');
    const [audioLinks, setAudioLinks] = React.useState<string | audioLinksType>(null);
    const token = localStorage.getItem('astraToken');
    const queryClient = useQueryClient();

    React.useEffect(() => {
        if (audioLinksLocal) setAudioLinks(audioLinksLocal);
    }, []);

    const { data: generatedAudiosData } = useQuery({
        queryKey: ['generatedAudiosData'],
        queryFn: () => getAudioLinksCall({ token, job_id }),
        refetchInterval: 3000,
        refetchOnWindowFocus: false,
        enabled: !!job_id && Object.values(audioLinksLocal)?.length == 0 && isGenerating == 'pending'
    });

    React.useEffect(() => {
        if (generatedAudiosData?.error || generatedAudiosData?.job_status?.status == 'failed' || generatedAudiosData?.result?.error) {
            localStorage.setItem('isGenerating', 'failed');
            setIsGenerating('failed');
            return;
        }


        if (generatedAudiosData?.job_status?.status == 'done') {
            queryClient.setQueryData(['userData'], (oldData: { quota_used: string }) => {
                if (oldData && generatedAudiosData?.user?.quota_used) {
                    console.log("oldData:", oldData)
                    return { ...oldData, quota_used: generatedAudiosData?.user?.quota_used }
                }
                return oldData
            })
            localStorage.setItem('isGenerating', 'done');
            setIsGenerating('done');
        }

        if (generatedAudiosData?.job_status?.status == 'in-progress') {
            localStorage.setItem('isGenerating', 'pending');
            setIsGenerating('pending');
        }

        if (generatedAudiosData?.job_status?.result && Object.keys(generatedAudiosData?.job_status?.result).length > 0) {
            localStorage.setItem('audioLinks', JSON.stringify(generatedAudiosData?.job_status?.result));
            setAudioLinks(generatedAudiosData?.job_status?.result);
        }

    }, [generatedAudiosData, generatedAudiosData?.job_status])

    return (
        <div className="bg-[#1a1a1a] rounded-xl py-3">
            <h2 className="text-white/60 uppercase text-xs mb-2 px-4">Result</h2>
            <div className='h-[134px]'>
                {/* <ScrollArea className='scrollbarAudioResultSection px-5 h-full'>
                    <div className="grid grid-cols-2 gap-3">
                        {['1','2','3', '4']?.map((result: string, idx) => {
                            return <ResultantAudio key={idx.toString()} id={idx} name={
                                idx == 0 ? 'Cover' :
                                idx == 1 ? 'Main Vocals' :
                                idx == 2 ? 'Background Vocals' :
                                idx == 3 ? 'Instrumentals' :
                                ''
                            } src={result} />
                        })}
                    </div>
                </ScrollArea> */}

                {(audioLinks && Object.values(audioLinks)?.length > 0 && isGenerating?.toLocaleLowerCase() == 'done') ? (
                    <ScrollArea className='scrollbarAudioResultSection px-5 h-full'>
                        <div className="grid grid-cols-2 gap-3">
                            {(
                                (audioLinks as audioLinksType)?.main_vocals_url &&
                                (audioLinks as audioLinksType)?.cover_url &&
                                (audioLinks as audioLinksType)?.background_vocals_url &&
                                (audioLinks as audioLinksType)?.instrumentals_url
                            ) ?
                                Object.keys(audioLinks)?.slice(0, 4)?.map((key: string, idx) => {
                                    return <ResultantAudio key={idx.toString()} id={idx} name={
                                        key == "main_vocals_url" ? `Main Vocals` :
                                            key == 'cover_url' ? `Cover` :
                                                key == 'background_vocals_url' ? `Background Vocals` :
                                                    key == 'instrumentals_url' ? `Instrumentals` : ''
                                    } src={audioLinks?.[key]} />
                                })
                                :
                                <h6 className="text-white/60 uppercase text-xs mb-2 text-center">
                                    Nothing to Show.<br />Please try Converting.
                                </h6>
                            }
                        </div>
                    </ScrollArea>
                ) : (
                    <div className='w-full h-full flex justify-center items-center'>
                        <h6 className="text-white/60 uppercase text-xs mb-2 text-center">
                            {(isPending || isGenerating?.toLocaleLowerCase() == 'pending') ? <span className='flex items-center gap-2'>Converting <RefreshCcw size={18} className='animate-spin duration-300' /></span> : <>Nothing to Show.<br />Please try converting something.</>}
                        </h6>
                    </div>
                )}
            </div>
            <div className='w-full relative px-4'>
                <QueueSize />
            </div>
        </div>
    )
}

export default React.memo(ResultSection)