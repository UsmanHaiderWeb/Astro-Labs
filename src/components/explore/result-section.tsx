import * as React from 'react'
import ResultantAudio from '../ResultantAudio'

const results = [
    { id: 1, name: "Cover", src: '/Bones.mp4' },
    { id: 2, name: "Main Vocals", src: '/audio.mp3' },
    { id: 3, name: "Background Vocals", src: '/audio.mp3' },
    { id: 4, name: "Instrumentals", src: '/Bones.mp4' },
]

function ResultSection() {
    return (
        <div className="bg-[#1a1a1a] rounded-xl p-4">
            <h2 className="text-white/60 uppercase text-xs mb-2">Result</h2>
            {/* <div className="grid grid-cols-2 gap-3">
                {results.map((result, idx) => (
                    <ResultantAudio key={idx.toString()} id={idx} name={result.name} src={result.src} />
                ))}
            </div> */}
            <div className='w-full h-24 flex justify-center items-center'>
                <h3 className="text-white/60 uppercase text-xs mb-2">Nothing to Show. Please try generating something.</h3>
            </div>
            <div className="mt-3 text-right">
                <p className="text-white/60 text-xs">Queue Size: 0</p>
            </div>
        </div>
    )
}

export default React.memo(ResultSection)