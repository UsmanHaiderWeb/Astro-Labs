import * as React from 'react'
import { X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const NavigateBack = () => {
    const navigate = useNavigate();

    return (
        <div className='absolute top-10 right-10'>
            <div className='rounded-full overflow-hidden h-9 w-9 hover:bg-transparent border-white border-solid border-[1px] bg-secondary text-secondary-foreground hover:text-white cursor-pointer flex justify-center items-center' onClick={() => navigate('/')}><X size={23} /></div>
        </div>
    )
}

export default React.memo(NavigateBack)