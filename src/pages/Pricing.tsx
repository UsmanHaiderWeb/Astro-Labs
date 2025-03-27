import * as React from 'react'
import PlanTemplate from '@/components/PlanTemplate'
import { PlanInterface } from '@/lib/interfaces&types'

const plans: PlanInterface[] = [
    {
        id: 'free',
        name: "Free",
        price: 0,
        features: [
            "Max 5 creations per day and 150 per month",
            "15-30 sec song generation",
            "Lyrics generation",
            "Remixing",
            "Max 1 concurrent generation"
        ],
    },
    {
        id: 'premium',
        name: "Basic",
        price: 10,
        features: [
            "Max 10 creations per day and 300 per month",
            "Lyrics Transcription",
            "Stem Splitter",
            "Max 2 concurrent generations",
            "All features from Free Plan"
        ]
    },
    {
        id: 'pro',
        name: "Pro",
        price: 30,
        features: [
            "Unlimited creations per day & 1500 max per month",
            "Cover Generation",
            "Audio Enhancer & Audio Looping",
            "Audio Input for Inpainting",
            "Custom Model Training",
            "Max 4 concurrent generations",
            "All features from Basic Plan"
        ]
    }
]

const Pricing = () => {
    return (
        <div className="flex-1 container mx-auto px-4 pt-6 pb-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {plans.map(plan => (
                    <PlanTemplate key={plan.name} plan={plan} />
                ))}
            </div>
        </div>
    )
}

export default React.memo(Pricing)