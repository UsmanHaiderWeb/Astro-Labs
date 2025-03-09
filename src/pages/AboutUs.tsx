import * as React from 'react'
import MusicalNotes from "@/components/MusicalNotes"

const AboutUs = () => {
    return (
        <div className="flex-1 flex items-center justify-center px-4 py-12 relative">
            <MusicalNotes />
            <div className="max-w-3xl bg-[#1a1a1a] rounded-xl p-8">
                <h1 className="text-3xl font-bold text-white mb-6 text-center">About Us</h1>
                <div className="space-y-4 text-white/80">
                    <p>
                        We believe music lives within everyone, waiting to be unleashed. Our mission is to break down the
                        technical barriers that stand between your musical imagination and reality. With our All-In-One Music
                        Toolkit, we're revolutionizing how people create music – whether you're a seasoned producer or someone
                        who's never touched an instrument.
                    </p>
                    <p>
                        From generating original songs and crafting covers to separating vocals from instrumentals, our suite of
                        tools empowers you to bring your musical vision to life. We're not just building software; we're creating
                        a platform where creativity knows no bounds, where technical limitations fade away, and where anyone can
                        transform their musical ideas into reality.
                    </p>
                    <p>
                        Our toolkit puts professional-grade music creation capabilities at your fingertips, making the complex
                        simple and the impossible possible. Whether you're looking to write lyrics, create melodies, or experiment
                        with different sounds, we've got you covered.
                    </p>
                    <p>
                        Join us in democratizing music creation. Because we believe the next great song could come from anyone,
                        anywhere – and we're here to help you make it happen.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default React.memo(AboutUs)