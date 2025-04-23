import * as React from 'react'
import PlanTemplate from '@/components/PlanTemplate'
import { PlanInterface } from '@/lib/interfaces&types'

const plans: PlanInterface[] = [
    {
        id: 'free',
        name: "Free",
        price: 0,
        features: [
            "Max 100 Creations per day",
            "Max 1 Concurrent Generation",
            "Song Generation (Coming Soon)",
            "Training (Coming Soon)",
        ],
    },
    {
        id: 'premium',
        name: "Basic",
        price: 9.99,
        features: [
            "Max Unlimited Creations per day",
            "Max 2 Concurrent Generations (Coming Soon)",
            "Song Generation (Coming Soon)",
            "Training (Coming Soon)",
        ]
    },
    // {
    //     id: 'pro',
    //     name: "Pro",
    //     price: 30,
    //     features: [
    //         "Unlimited creations per day & 1500 max per month",
    //         "Cover Generation",
    //         "Audio Enhancer & Audio Looping",
    //         "Audio Input for Inpainting",
    //         "Custom Model Training",
    //         "Max 4 concurrent generations",
    //         "All features from Basic Plan"
    //     ]
    // }
]

const Pricing = () => {
    return (
        <div className="flex-1 container mx-auto px-4 pt-6 pb-1">
            <div className="flex justify-center gap-6 max-w-6xl mx-auto">
                {plans.map(plan => (
                    <PlanTemplate key={plan.name} plan={plan} />
                ))}
            </div>
        </div>
    )
}

export default React.memo(Pricing)