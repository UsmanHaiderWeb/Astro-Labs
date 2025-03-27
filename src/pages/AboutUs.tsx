import * as React from 'react'
import MusicalNotes from "@/components/MusicalNotes"
import { Card, CardContent } from '@/components/ui/card'

const AboutUs = () => {
    return (
        <div className="flex-1 flex items-center justify-center px-4 pb-6 relative">
            <MusicalNotes />
            <div className="container rounded-xl px-8 grid gap-8">
                <Card className='bg-transparent text-foreground border-none outline-none'>
                    <CardContent>
                        <div className='pb-6 grid gap-5'>
                            <h1 className="text-4xl font-bold text-white">About Us</h1>
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
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default React.memo(AboutUs)