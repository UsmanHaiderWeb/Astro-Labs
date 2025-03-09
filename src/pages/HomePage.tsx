import * as React from "react"

const HomePage = () => {
    const [text, setText] = React.useState("")
    const fullText = "Where AI Meets Musical Imagination. Compose songs, write lyrics, create covers, clone voices, and transform audio with Astra Labs—your complete AI music studio. From inspiration to creation, turn every musical dream into reality."

    React.useEffect(() => {
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
    }, [])

    return (
        <div className="flex-1 flex flex-col items-center justify-center space-y-6 px-4 pointer-events-none">
            {/* Center Logo */}
            <div className="h-[100px] flex items-center justify-center">
                <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/astralabs-removebg-preview-6RK1Ms2xC2cJ7Oygo8HzJpSXi2RqFQ.png"
                    alt="Astra Labs Logo"
                    width={100}
                    height={100}
                    className="brightness-200"
                />
            </div>

            {/* Animated Text */}
            <div className="typewriter">
                <p className="text-sm font-normal text-white leading-relaxed">
                    {text}
                    <span className="cursor"></span>
                </p>
            </div>
        </div>
    )
}

export default React.memo(HomePage)