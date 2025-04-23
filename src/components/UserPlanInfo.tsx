import * as React from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchUserDetails } from '@/lib/AxiosCalls'

const UserPlanInfo = () => {
    const token = localStorage.getItem('astraToken')

    const { data: userData, isPending } = useQuery({
        queryKey: ['userData'],
        queryFn: async () => fetchUserDetails(token),
        enabled: !!token,
        refetchOnWindowFocus: false
    })

    if (isPending) {
        return (
            <div></div>
        )
    }

    return (
        <div className="w-full p-4 flex justify-center">
            <div className="flex flex-col">
                <div className="flex items-center">
                    <span className="text-sm font-medium flex">Plan: {userData?.role || 'Free'}</span>
                </div>
                <div className="flex items-center">
                    <span className="text-sm font-medium flex items-center">Credits:&nbsp;{(userData?.role == 'free' || !userData?.role) ? `${userData?.quota_used || 0} / 100` : "Unlimited"}</span>
                </div>
            </div>
        </div>
    )
}

export default UserPlanInfo 