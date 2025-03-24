import { getQueueSizeCall } from '@/lib/AxiosCalls'
import { useQuery } from '@tanstack/react-query'
import * as React from 'react'

const QueueSize = () => {
    const token = localStorage.getItem('astraToken');

    const { data: queueData } = useQuery({
        queryKey: ['queue-size'],
        queryFn: () => getQueueSizeCall({ token }),
        refetchInterval: 30000,
        refetchOnWindowFocus: false
    })

    return (
        <div className="mt-3 text-right">
            <p className="text-white/60 text-xs">Queue Size: {queueData?.queue_size || 0}</p>
        </div>

    )
}

export default React.memo(QueueSize)