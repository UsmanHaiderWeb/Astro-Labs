import { removeToken } from '@/lib/utils';
import { LogOut } from 'lucide-react';
import { Mail } from 'lucide-react';
import * as React from 'react'
import { Link } from "react-router-dom"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';

function Header() {
    return (
        <header className="w-full py-2 px-6">
            <nav className="max-w-[1920px] min-h-[40px] mx-auto flex items-center justify-between">
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
                        <span className="text-white text-[16px]">ASTRA LABS</span>
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
                <div className="group-data-[authenticated=notauthorized]:opacity-0 group-data-[authenticated=notauthorized]:pointer-events-none w-48 flex justify-end h-[35px]">
                    <div className='hidden group-data-[authenticated=true]:block'>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <img
                                    src="/dummy.jpg"
                                    alt="user image"
                                    height={35}
                                    width={35}
                                    className='rounded-full cursor-pointer hover:opacity-80 transition-opacity'
                                />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 bg-grayBackground border-white/30 border-solid border-[1px] text-white" align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator className='bg-white/10' />
                                <DropdownMenuItem>
                                    <Mail className="mr-2 h-4 w-4" />
                                    <span>info@example.com</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className='bg-white/10' />
                                <DropdownMenuItem className="text-red-600" onClick={() => {
                                    removeToken();
                                    localStorage.removeItem('job_id');
                                    localStorage.removeItem('audioLinks');
                                    localStorage.removeItem('isGenerating');
                                    window.location.href = '/login';
                                }}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className='group-data-[authenticated=true]:hidden group-data-[authenticated=notauthorized]:opacity-0 group-data-[authenticated=notauthorized]:pointer-events-none group-data-[authenticated=notauthorized]:flex flex items-center space-x-2 justify-end'>
                        <Link to="/login" className="px-4 inline-block text-[15px] text-white hover:text-gray-300">
                            LOG IN
                        </Link>

                        <Link to="/sign-up" className="px-4 inline-block text-[15px] text-white hover:text-gray-300">
                            SIGN UP
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default React.memo(Header);