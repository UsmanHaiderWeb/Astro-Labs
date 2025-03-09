import * as React from 'react'
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link } from 'react-router-dom'

const plans = [
    {
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
        name: "Pro",
        price: 30,
        features: [
            "Unlimited creations per day & 1500 max per month",
            "Cover Generation",
            "Audio Enhancer",
            "Audio Looping",
            "Audio Input for Inpainting",
            "Custom Model Training",
            "Max 4 concurrent generations",
            "All features from Basic Plan"
        ]
    }
]

const Pricing = () => {
    return (
        <div className="flex-1 container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {plans.map(plan => (
                    <div key={plan.name} className="bg-[#1a1a1a] rounded-xl overflow-hidden relative flex flex-col">
                        {plan.name === "Basic" && <Badge className="absolute top-0 right-0 bg-white/90 text-black hover:bg-white/80">Most Popular</Badge>}
                        {plan.name === "Pro" && <Badge className="absolute top-0 right-0 bg-white/90 text-black hover:bg-white/80">Best Value</Badge>}
                        <div className="relative p-6 flex flex-col items-center text-center border-b border-white/10">
                            {(plan.name === "Basic" || plan.name === "Pro") &&
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 opacity-20" />
                            }
                            <h2 className="text-2xl font-bold text-white mb-2">{plan.name}</h2>
                            <div className="flex items-baseline">
                                <span className="text-4xl font-bold text-white">${plan.price}</span>
                                <span className="text-sm text-white/60 ml-1">/month</span>
                            </div>
                        </div>
                        <div className="p-6 space-y-4 bg-[#1a1a1a] flex-1 flex flex-col">
                            <ul className="space-y-3 flex-1">
                                {plan.features.map(feature => (
                                    <li key={feature} className="flex items-start gap-2">
                                        <Check className="w-5 h-5 text-white mt-0.5" />
                                        <span className="text-white">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            {plan.name === "Free" ?
                                <Link to='/sign-up'>
                                    <Button className="w-full bg-white/10 hover:bg-white/20 text-white" size="lg">
                                        Get Started
                                    </Button>
                                </Link>
                                :
                                <Link to='/purchase'>
                                    <Button
                                        className="w-full text-white"
                                        size="lg"
                                        style={{
                                            background: "linear-gradient(to right, #4F46E5, #7C3AED, #DB2777)",
                                        }}
                                    >
                                        Subscribe
                                    </Button>
                                </Link>
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default React.memo(Pricing)