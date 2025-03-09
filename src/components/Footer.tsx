import * as React from 'react'
import { Link } from "react-router-dom"
import { Twitter, Instagram, Mail, DiscIcon as Discord } from "lucide-react"
import { Play } from "lucide-react" // Import Play icon

function Footer() {
    return (
        <>
            {/* Social Links */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-8">
                <Link to="https://x.com/astralabs" className="text-white hover:text-gray-300">
                    <Twitter className="w-6 h-6" />
                    <span className="sr-only">Twitter</span>
                </Link>
                <Link to="https://instagram.com/astralabsai" className="text-white hover:text-gray-300">
                    <Instagram className="w-6 h-6" />
                    <span className="sr-only">Instagram</span>
                </Link>
                <Link to="mailto:info@astralabs.ai" className="text-white hover:text-gray-300">
                    <Mail className="w-6 h-6" />
                    <span className="sr-only">Email</span>
                </Link>
                <Link to="https://discord.gg/astralabs" className="text-white hover:text-gray-300">
                    <Discord className="w-6 h-6" />
                    <span className="sr-only">Discord</span>
                </Link>
            </div>

            {/* Music Player */}
            <div className="fixed bottom-8 right-8">
                <button className="relative w-12 h-12 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-200 group">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <img
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20(11)-3Ns8vjph0z3m2rYBOGiftW70XtXlla.png"
                            alt="Music Player"
                            width={24}
                            height={24}
                            className="brightness-200 transition-opacity duration-200 group-hover:opacity-0"
                        />
                        <Play className="w-6 h-6 text-white absolute transition-opacity duration-200 opacity-0 group-hover:opacity-100" />
                    </div>
                </button>
            </div>
        </>
    )
}

export default React.memo(Footer);