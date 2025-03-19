import * as React from 'react'
import { Link } from "react-router-dom"

function Header() {
    return (
        <header className="w-full py-4 px-6">
            <nav className="max-w-[1920px] mx-auto flex items-center justify-between">
                <div className='w-48 flex items-center gap-5'>
                    {/* <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Menu onClick={() => setOpenSidebar(true)} className='group-data-[sidebaropen=true]:hidden group-data-[sidebaropen=false]:inline' />
                            </TooltipTrigger>
                            <TooltipContent className='bg-black z-[201]'>Open Sidebar</TooltipContent>
                        </Tooltip>
                    </TooltipProvider> */}
                    <Link to="/" className='group-data-[sidebaropen=true]:hidden flex justify-center items-center'>
                        {/* <img src="/logo.png" alt="logo" width={35} height={38} className='h-auto' /> */}
                        <span className="text-white text-[20px]">ASTRA LABS</span>
                    </Link>
                    {/* Logo */}
                    {/* <Link to="/" className="bg-white/10 px-4 py-2 rounded-md">
                        <span className="text-lg font-bold text-white">ASTRA LABS</span>
                    </Link> */}
                </div>

                {/* Navigation Links */}
                <div className="flex items-center space-x-8">
                    <Link to="/explore" className="text-[15px] text-white hover:text-gray-300">
                        EXPLORE
                    </Link>
                    <Link to="/about" className="text-[15px] text-white hover:text-gray-300">
                        ABOUT US
                    </Link>
                    <Link to="/contact-us" className="text-[15px] text-white hover:text-gray-300">
                        CONTACT
                    </Link>
                    <Link to="/pricing" className="text-[15px] text-white hover:text-gray-300">
                        PRICING
                    </Link>
                    {/* <Link to="/faqs" className="text-[15px] text-white hover:text-gray-300">
                        FAQ
                    </Link> */}
                </div>

                {/* Auth Buttons */}
                <div className="flex items-center space-x-2 w-48 justify-end">
                    <img src="/dummy.jpg" alt="user image" height={35} width={35} className='rounded-full' />

                    {/* <Link to="/login" className="px-4 inline-block text-[15px] text-white hover:text-gray-300">
                        LOG IN
                    </Link>

                    <Link to="/sign-up" className="px-4 inline-block text-[15px] text-white hover:text-gray-300">
                        SIGN UP
                    </Link> */}
                </div>
            </nav>
        </header>
    )
}

export default React.memo(Header);