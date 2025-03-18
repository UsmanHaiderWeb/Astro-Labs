import * as React from 'react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { X } from 'lucide-react'
import { Link } from 'react-router-dom'

const playlists = [
    "Recently Added",
    "Recently Played",
    "Top Songs",
    "Top Albums",
    "Top Artists",
    "Logic Discography",
    "Bedtime Beats",
    "Feeling Happy",
    "I miss Y2K Pop",
    "Runtober",
    "Mellow Days",
    "Eminem Essentials",
]

interface SideBarProps extends React.HTMLAttributes<HTMLDivElement> {
    setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

function Sidebar({ className, setOpenSidebar }: SideBarProps) {
    return (
        <div className={cn("bg-grayBackground h-full min-h-screen", className)}>
            <div className="relative">
                <div className='flex justify-between items-center pb-2 pt-6 px-4 sticky z-[10] top-0 left-0 bg-grayBackground'>
                    <Link to="/" className='flex justify-center items-center'>
                        {/* <img src="/logo.png" alt="logo" width={35} height={38} className='h-auto' /> */}
                        <span className="text-white">ASTRA LABS</span>
                    </Link>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <X onClick={() => setOpenSidebar(false)} className='cursor-pointer md:hidden' />
                            </TooltipTrigger>
                            <TooltipContent className='bg-black z-[201]'>Close Sidebar</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div className="pl-2 pr-4 pb-3">
                    <div className="space-y-1">
                        <Button variant="secondary" className="sideBtn">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-2 h-4 w-4"
                            >
                                <rect width="7" height="7" x="3" y="3" rx="1" />
                                <rect width="7" height="7" x="14" y="3" rx="1" />
                                <rect width="7" height="7" x="14" y="14" rx="1" />
                                <rect width="7" height="7" x="3" y="14" rx="1" />
                            </svg>
                            Explore
                        </Button>
                        {/* <Button variant="secondary" className="sideBtn">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-2 h-4 w-4"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <polygon points="10 8 16 12 10 16 10 8" />
                            </svg>
                            Youtube
                        </Button>
                        <Button variant="secondary" className="sideBtn">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-2 h-4 w-4"
                            >
                                <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
                                <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
                                <circle cx="12" cy="12" r="2" />
                                <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
                                <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
                            </svg>
                            Radio
                        </Button> */}
                    </div>
                </div>
                <div className="pl-2 pr-4 py-3">
                    <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Tools</h2>
                    <div className="space-y-1">
                        {/* <Button variant="secondary" className="sideBtn">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-2 h-4 w-4"
                            >
                                <path d="M21 15V6" />
                                <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                <path d="M12 12H3" />
                                <path d="M16 6H3" />
                                <path d="M12 18H3" />
                            </svg>
                            Playlists
                        </Button>
                        <Button variant="secondary" className="sideBtn">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-2 h-4 w-4"
                            >
                                <circle cx="8" cy="18" r="4" />
                                <path d="M12 18V2l7 4" />
                            </svg>
                            Songs
                        </Button>
                        <Button variant="secondary" className="sideBtn">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-2 h-4 w-4"
                            >
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                            Made for You
                        </Button> */}
                        <Button variant="secondary" className="sideBtn">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-2 h-4 w-4"
                            >
                                <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12" />
                                <circle cx="17" cy="7" r="5" />
                            </svg>
                            AI Cover
                        </Button>
                        {/* <Button variant="secondary" className="sideBtn">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-2 h-4 w-4"
                            >
                                <path d="m16 6 4 14" />
                                <path d="M12 6v14" />
                                <path d="M8 8v12" />
                                <path d="M4 4v16" />
                            </svg>
                            Albums
                        </Button> */}
                    </div>
                </div>
                {/* <div className="py-3">
                    <h2 className="relative px-4 text-lg font-semibold tracking-tight">
                        Playlists
                    </h2>
                    <div className="space-y-1 py-2">
                        {playlists?.map((playlist, i) => (
                            <Button
                                key={`${playlist}-${i}`}
                                variant="ghost"
                                className="sideBtn font-normal"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mr-2 h-4 w-4"
                                >
                                    <path d="M21 15V6" />
                                    <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                    <path d="M12 12H3" />
                                    <path d="M16 6H3" />
                                    <path d="M12 18H3" />
                                </svg>
                                {playlist}
                            </Button>
                        ))}
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default React.memo(Sidebar);