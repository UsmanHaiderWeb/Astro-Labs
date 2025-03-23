/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react'
import ResultantAudio from '../ResultantAudio'
import { useQuery } from '@tanstack/react-query';
import { getAudioLinksCall } from '@/lib/AxiosCalls';
import QueueSize from '../QueueSize';
import { RefreshCcw } from 'lucide-react';

// const results = [
//     { id: 1, name: "Cover", src: '/Bones.mp4' },
//     { id: 2, name: "Main Vocals", src: '/audio.mp3' },
//     { id: 3, name: "Background Vocals", src: '/audio.mp3' },
//     { id: 4, name: "Instrumentals", src: '/Bones.mp4' },
// ]

function ResultSection({isPending, setIsGenerating}: {isPending: boolean, setIsGenerating: React.Dispatch<React.SetStateAction<'pending' | 'failed' | 'done'>>}) {
    const job_id = localStorage.getItem('job_id');
    const audioLinksLocal = JSON.parse(localStorage.getItem('audioLinks') || '[]');
    const [audioLinks, setAudioLinks] = React.useState<string>(null);
    const isGenerating = localStorage.getItem('isGenerating');
    const token = localStorage.getItem('astraToken');

    React.useEffect(() => {
        if(audioLinksLocal) setAudioLinks(audioLinksLocal);
    }, []);

    const { data: generatedAudiosData } = useQuery({
        queryKey: ['generatedAudiosData'],
        queryFn: () => getAudioLinksCall({ token, job_id }),
        refetchInterval: 30000,
        enabled: !!job_id && !!token && Object.values(audioLinksLocal)?.length == 0 && localStorage.getItem('isGenerating')?.toLocaleLowerCase() == 'pending'
    });

    React.useEffect(() => {
        if(generatedAudiosData?.status == 'failed') {
            localStorage.setItem('isGenerating', 'failed');
            setIsGenerating('failed');
        }

        if(generatedAudiosData?.status == 'done') {
            localStorage.setItem('isGenerating', 'done');
            setIsGenerating('done');
        }

        if (generatedAudiosData?.status == 'in-progress') {
            localStorage.setItem('isGenerating', 'pending');
            setIsGenerating('pending');
        }

        if (generatedAudiosData?.result && Object.keys(generatedAudiosData?.result).length > 0) {
            localStorage.setItem('audioLinks', JSON.stringify(generatedAudiosData?.result));
            setAudioLinks(JSON.stringify(generatedAudiosData?.result));
        }
    }, [generatedAudiosData])

    return (
        <div className="bg-[#1a1a1a] rounded-xl p-4">
            <h2 className="text-white/60 uppercase text-xs mb-2">Result</h2>
            {(audioLinks && Object.values(audioLinks)?.length > 0 && isGenerating?.toLocaleLowerCase() == 'done') ? (
                <div className="grid grid-cols-2 gap-3">
                    {Object.values(audioLinks)?.slice(0, 4)?.map((result: string, idx) => (
                        <ResultantAudio key={idx.toString()} id={idx} name={Object.keys(audioLinks)?.[idx]} src={result} />
                    ))}
                </div>
            ) : (
                <div className='w-full h-24 flex justify-center items-center'>
                    <h3 className="text-white/60 uppercase text-xs mb-2">{(isPending || isGenerating?.toLocaleLowerCase() == 'pending') ? <span className='flex items-center gap-2'>Generating <RefreshCcw size={18} className='animate-spin duration-150' /></span> : 'Nothing to Show. Please try generating something.'}</h3>
                </div>
            )}
            <QueueSize />
        </div>
    )
}

export default React.memo(ResultSection)