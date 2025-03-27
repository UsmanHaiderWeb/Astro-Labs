import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { Check, RefreshCcw } from 'lucide-react'
import { Badge } from './ui/badge'
import { PlanInterface } from '@/lib/interfaces&types'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { FetchStripeUrlCall } from '@/lib/AxiosCalls'

const PlanTemplate = ({ plan }: { plan: PlanInterface }) => {
    const token = localStorage.getItem("astraToken");
    const navigate = useNavigate();

    const { mutate, isPending } = useMutation({
        mutationKey: ['fetch stripe url'],
        mutationFn: FetchStripeUrlCall,
        onError: (error: AxiosError<{ detail: string }>) => {
            console.log("signup error: ", error);
        },
        onSuccess: (data: { checkout_url: string }) => {
            window.location.href = data?.checkout_url;
        }
    })

    const purchasePlanFunc = (planId) => {
        if (!isPending && token) {
            mutate({ token, planId });
        } else if (!token) {
            navigate('/login');
            // showToast('Please login to continue');
        }
    }


    return (
        <div key={plan?.name} className="bg-[#1a1a1a] rounded-xl overflow-hidden relative flex flex-col">
            {plan?.name === "Basic" && <Badge className="absolute top-0 right-0 bg-white/90 text-black hover:bg-white/80">Most Popular</Badge>}
            {plan?.name === "Pro" && <Badge className="absolute top-0 right-0 bg-white/90 text-black hover:bg-white/80">Best Value</Badge>}
            <div className="relative px-6 py-5 flex flex-col items-center text-center border-b border-white/10">
                {(plan?.name === "Basic" || plan?.name === "Pro") &&
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 opacity-20" />
                }
                <h2 className="text-[19px] font-bold text-white mb-2">{plan?.name}</h2>
                <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-white">${plan.price}</span>
                    <span className="text-sm text-white/60 ml-1">/month</span>
                </div>
            </div>
            <div className="p-6 space-y-4 bg-[#1a1a1a] flex-1 flex flex-col">
                <ul className="space-y-3 flex-1">
                    {plan?.features?.map(feature => (
                        <li key={feature} className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-white mt-0.5" />
                            <span className="text-white text-sm">{feature}</span>
                        </li>
                    ))}
                </ul>
                {plan?.name === "Free" ?
                    <Link to='/sign-up'>
                        <Button className="w-full bg-white/10 hover:bg-white/20 text-white" size="lg">
                            Get Started
                        </Button>
                    </Link>
                    : <>
                        {isPending ?
                            <div className='w-full cursor-not-allowed'>
                                <Button size="lg" disabled className="w-full text-white cursor-not-allowed" style={{ background: "linear-gradient(to right, #4F46E5, #7C3AED, #DB2777)" }}>
                                    <RefreshCcw className='animate-spin duration-300' />
                                </Button>
                            </div>
                            :
                            <div onClick={() => purchasePlanFunc(plan?.id)}>
                                <Button
                                    className="w-full text-white"
                                    size="lg"
                                    style={{
                                        background: "linear-gradient(to right, #4F46E5, #7C3AED, #DB2777)",
                                    }}
                                >
                                    Subscribe
                                </Button>
                            </div>
                        }
                    </>}
            </div>
        </div>
    )
}

export default React.memo(PlanTemplate)