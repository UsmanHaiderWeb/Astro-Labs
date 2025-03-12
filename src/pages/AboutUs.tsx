import * as React from 'react'
import MusicalNotes from "@/components/MusicalNotes"

const AboutUs = () => {
    return (
        <div className="flex-1 flex items-center justify-center px-4 pb-16 relative">
            <MusicalNotes />
            <div className="max-w-5xl rounded-xl p-8 grid gap-8">
                <div className='pb-6 grid gap-2 border-transparent border-b-secondary/40 border-[3px]'>
                    <h1 className="text-4xl font-bold text-white">Who we are</h1>
                    <p className='opacity-70'>
                        We're a team of music enthusiasts, developers, and designers who are passionate about breaking down the
                        technical barriers that stand between your musical imagination and reality. Our mission is to create an
                        All-In-One Music Toolkit that empowers anyone to express themselves through music, regardless of their
                        background or experience.
                    </p>
                </div>
                <div className='pb-6 grid gap-2 border-transparent border-b-secondary/40 border-[3px]'>
                    <h1 className="text-4xl font-bold text-white">What Astra Lab is all About</h1>
                    <p className='opacity-70'>
                        We believe music lives within everyone, waiting to be unleashed. Our mission is to break down the
                        technical barriers that stand between your musical imagination and reality. With our All-In-One Music
                        Toolkit, we're revolutionizing how people create music – whether you're a seasoned producer or someone
                        who's never touched an instrument.
                    </p>
                    <p className='opacity-70'>
                        From generating original songs and crafting covers to separating vocals from instrumentals, our suite of
                        tools empowers you to bring your musical vision to life. We're not just building software; we're creating
                        a platform where creativity knows no bounds, where technical limitations fade away, and where anyone can
                        transform their musical ideas into reality.
                    </p>
                    <p className='opacity-70'>
                        Our toolkit puts professional-grade music creation capabilities at your fingertips, making the complex
                        simple and the impossible possible. Whether you're looking to write lyrics, create melodies, or experiment
                        with different sounds, we've got you covered.
                    </p>
                    <p className='opacity-70'>
                        Join us in democratizing music creation. Because we believe the next great song could come from anyone,
                        anywhere – and we're here to help you make it happen.
                    </p>
                </div>
                <div className='pb-6 grid gap-2 border-transparent border-b-secondary/40 border-[3px]'>
                    <h1 className="text-4xl font-bold text-white">Our Vision for the Future</h1>
                    <p className='opacity-70'>
                        We aim to equip creators with cutting-edge tools that transform their musical ideas into reality
                        effortlessly. Our platform simplifies complex processes, empowering you to compose lyrics, craft melodies,
                        and explore new sonic landscapes with ease.
                    </p>
                </div>
                <div className='pb-6 grid gap-2 border-transparent border-[3px]'>
                    <h1 className="text-4xl font-bold text-white">Our Commitment</h1>
                    <p className='opacity-70'>
                        We are dedicated to making music creation accessible to everyone. We believe that the next groundbreaking
                        track can emerge from any corner of the globe, and we are committed to supporting your journey in bringing
                        it to life.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default React.memo(AboutUs)