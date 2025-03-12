import * as React from 'react'
import { Button } from './ui/button'
import { X } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { useLocation, useNavigate } from 'react-router-dom'

const NavigateBack = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    return (
        <div className='absolute top-10 right-10'>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <Button size='sm' variant='secondary' className='rounded-full overflow-hidden h-9 w-9 hover:bg-transparent border-white border-solid border-[1px] hover:text-white cursor-pointer' onClick={() => navigate(-1)}><X size={28} /></Button>
                    </TooltipTrigger>
                    <TooltipContent className='bg-black'>Cancel {pathname == '/login' ? 'Login' : (pathname == '/sign-up' && 'Signup')}</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}

export default React.memo(NavigateBack)