import * as React from 'react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

const faqs = [
    {
        question: "What is Astra Labs?",
        answer: "Astra Labs is your complete AI music studio. Compose songs, write lyrics, create covers, clone voices, and transform audio with our tools."
    },
    {
        question: "What are the pricing plans?",
        answer: "We offer three plans: Free, Basic ($10/month), and Pro ($30/month). Each plan comes with different features and limits."
    },
    {
        question: "How can I upgrade my plan?",
        answer: "You can upgrade your plan by visiting the Pricing page and selecting the plan that best fits your needs."
    },
    {
        question: "What features are included in the Pro plan?",
        answer: "The Pro plan includes unlimited creations per day, cover generation, audio enhancer, audio looping, audio input for inpainting, custom model training, and more."
    },
    {
        question: "How do I get started?",
        answer: "You can get started by signing up for a free account and exploring our tools. Visit the HomePage for more information."
    },
    {
        question: "Is there a free trial available?",
        answer: "Yes, we offer a 7-day free trial for the Basic and Pro plans. You can sign up for the trial on the Pricing page."
    },
    {
        question: "Can I cancel my subscription?",
        answer: "Yes, you can cancel your subscription at any time from your account settings. Your subscription will remain active until the end of the billing period."
    },
    {
        question: "Do you offer customer support?",
        answer: "Yes, we offer 24/7 customer support through our support portal. You can also reach us via email or live chat."
    }
]

const FAQs = () => {
    return (
        <div className="flex-1 max-w-4xl w-full mx-auto px-4 pt-12 pb-20">
            <h1 className="text-3xl font-bold text-white mb-6 text-center">Frequently Asked Questions</h1>
            <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`} className='transition-all duration-300 ease-in-out'>
                        <AccordionTrigger className="text-lg font-medium text-white transition-all duration-300 ease-in-out">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-white/80 transition-all duration-300 ease-in-out">{faq.answer}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}

export default React.memo(FAQs)