import * as React from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchUserDetails } from '@/lib/AxiosCalls'

const UserPlanInfo = () => {
    const token = localStorage.getItem('astraToken')

    const { data: userData, isLoading } = useQuery({
        queryKey: ['userData'],
        queryFn: async () => fetchUserDetails(token),
        enabled: !!token,
        refetchOnWindowFocus: false
    })

    if (isLoading) {
        return (
            <div className="w-full p-4">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-center gap-2">
                        <span className="text-sm font-medium w-16 text-right">Plan: </span>
                        <span className="text-sm text-muted-foreground w-16"></span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <span className="text-sm font-medium w-16 text-right">Credits: </span>
                        <span className="text-sm text-muted-foreground w-16"></span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full p-4">
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-medium w-16 text-right">Plan: </span>
                    <span className="text-sm text-muted-foreground w-16">{userData?.plan || 'Free'}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-medium w-16 text-right">Credits: </span>
                    <span className="text-sm text-muted-foreground w-16">{userData?.x || 0}/{userData?.maxCredits || 80}</span>
                </div>
            </div>
        </div>
    )
}

export default UserPlanInfo 