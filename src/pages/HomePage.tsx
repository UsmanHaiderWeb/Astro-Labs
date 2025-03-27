import { Button } from "@/components/ui/button"
import * as React from "react"
import { Link, useOutletContext } from "react-router-dom"

const HomePage = () => {
    const [text, setText] = React.useState("")
    const fullText = "Where AI Meets Musical Imagination. Compose songs, write lyrics, create covers, clone voices, and transform audio with Astra Labs—your complete AI music studio. From inspiration to creation, turn every musical dream into reality."

    const { okToGo } = useOutletContext<{okToGo: boolean}>();

    React.useEffect(() => {
        if(!okToGo) return;
        
        let currentIndex = 0
        const intervalId = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setText(fullText.slice(0, currentIndex))
                currentIndex++
            } else {
                clearInterval(intervalId)
            }
        }, 50)

        return () => clearInterval(intervalId)
    }, [okToGo])

    return (
        <div className="flex-1 flex items-center justify-center space-y-4 px-4">
            <div className="flex flex-col items-center justify-center">
                {/* Center Logo */}
                <div className="h-[100px] flex items-center justify-center">
                    <img
                        src="/logo.png"
                        alt="Astra Labs Logo"
                        width={100}
                        height={100}
                        className="brightness-200"
                    />
                </div>

                {/* Animated Text */}
                <div className="typewriter w-[600px] max-w-[90vw]">
                    <p className="text-sm font-normal text-white leading-relaxed">
                        {text}
                        <span className="cursor"></span>
                    </p>
                </div>
                <div className="group-data-[authenticated=notauthorized]:opacity-0 group-data-[authenticated=notauthorized]:pointer-events-none w-full flex justify-center">
                    <Link to='/explore' className='group-data-[authenticated=false]:hidden'>
                        <Button variant="secondary" size="sm" className="rounded-full px-7 h-11">Get Started For Free</Button>
                    </Link>
                    <Link to='/sign-up' className='group-data-[authenticated=true]:hidden group-data-[authenticated=notauthorized]:opacity-0 group-data-[authenticated=notauthorized]:pointer-events-none group-data-[authenticated=notauthorized]:flex'>
                        <Button variant="secondary" size="sm" className="rounded-full px-7 h-11">Get Started For Free</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default React.memo(HomePage)
// Get Started for Free