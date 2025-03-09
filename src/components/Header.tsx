import * as React from 'react'
import { Link } from "react-router-dom"

function Header() {
    return (
        <header className="w-full py-4 px-6 pointer-events-none">
            <nav className="max-w-[1920px] mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="bg-white/10 px-4 py-2 rounded-md">
                    <span className="text-lg font-bold text-white">ASTRA LABS</span>
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center space-x-8">
                    <Link to="/explore" className="text-[15px] text-white hover:text-gray-300">
                        EXPLORE
                    </Link>
                    <Link to="/about" className="text-[15px] text-white hover:text-gray-300">
                        ABOUT US
                    </Link>
                    <Link to="/pricing" className="text-[15px] text-white hover:text-gray-300">
                        PRICING
                    </Link>
                    <Link to="/faqs" className="text-[15px] text-white hover:text-gray-300">
                        FAQ
                    </Link>
                </div>

                {/* Auth Buttons */}
                <div className="flex items-center space-x-2">
                    <Link to="/login" className="px-4 inline-block text-[15px] text-white hover:text-gray-300">
                        LOG IN
                    </Link>

                    <Link to="/sign-up" className="px-4 inline-block text-[15px] text-white hover:text-gray-300">
                        SIGN UP
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default React.memo(Header);