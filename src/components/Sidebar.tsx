import * as React from 'react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Separator } from './ui/separator'

// const playlists = [
//     "Recently Added",
//     "Recently Played",
//     "Top Songs",
//     "Top Albums",
//     "Top Artists",
//     "Logic Discography",
//     "Bedtime Beats",
//     "Feeling Happy",
//     "I miss Y2K Pop",
//     "Runtober",
//     "Mellow Days",
//     "Eminem Essentials",
// ]

// interface SideBarProps extends React.HTMLAttributes<HTMLDivElement> {
//     setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
// }

function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("bg-grayBackground h-full min-h-screen", className)}>
            <div className="relative">
                <div className='flex justify-center items-center pt-[21px] pb-4 px-4 sticky z-[10] top-0 left-0 bg-grayBackground'>
                    <Link to="/" className='flex justify-center items-center'>
                        {/* <img src="/logo.png" alt="logo" width={35} height={38} className='h-auto' /> */}
                        <span className="text-white text-[16px]">ASTRA LABS</span>
                    </Link>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <X className='cursor-pointer md:hidden' />
                            </TooltipTrigger>
                            <TooltipContent className='bg-black z-[201]'>Close Sidebar</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div className='w-[98%] mx-auto opacity-35'>
                    <Separator />
                </div>
                <div className="pl-2.5 pr-2.5 py-3">
                    <h2 className="text-[17px] font-semibold tracking-tight">Tools</h2>
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