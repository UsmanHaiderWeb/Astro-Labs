import * as React from 'react'
import { MapPin, Phone, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

function ContactUs() {
    return (
        <div className="max-w-[1200px] md:w-full sm:w-[80%] mx-auto px-4 pt-5 pb-24">
            <div className="flex justify-center md:flex-row flex-col gap-8">
                {/* <div className="bg-grayBackground p-8 rounded-lg shadow-lg md:order-2 order-1 md:w-[53%]">
                    <h2 className="text-3xl font-heading mb-4">Get in Touch</h2>
                    <p className="text-muted-foreground mb-4">
                        Fill out the form below and we&apos;ll get back to you as soon as possible.
                    </p>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Enter your name" className='border-input' />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="Enter your email" className='border-input' />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input id="subject" placeholder="Enter subject" className='border-input' />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" placeholder="Enter your message" className="min-h-[150px] resize-none" />
                        </div>
                        <Button className="w-full bg-purple/80 hover:bg-purple/100 hoveringBtn overflow-hidden">
                            Send Message
                            <Send className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div> */}
                <div className="space-y-7 md:order-1 order-2 md:w[47%] w-full">
                    <div>
                        <h2 className="text-3xl leading-8 font-heading mt-8 text-center">Contact Information</h2>
                        <p className="text-muted-foreground w-[80%] mx-auto min-w-[300px] mt-3 text-center">
                            We&apos;re here to help and answer any questions you might have.
                        </p>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-4">
                        <Card className='bg-grayBackground border-none outline-none text-foreground flex-grow'>
                            <CardContent className="flex items-center space-x-4">
                                <Mail className="h-6 w-6" />
                                <div>
                                    <h3 className="font-heading text-lg">Email Us</h3>
                                    <a href='info@astralabs.ai' className="text-muted-foreground cursor-pointer">info@astralabs.ai</a>
                                    <p className="text-muted-foreground text-sm mt-0.5">
                                        For any inquiries
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className='bg-grayBackground border-none outline-none text-foreground flex-grow'>
                            <CardContent className="flex items-center space-x-4">
                                <Phone className="h-6 w-6" />
                                <div>
                                    <h3 className="font-heading text-lg">Call Us</h3>
                                    <p className="text-muted-foreground cursor-pointer">+1 (302) 405-6369</p>
                                    <p className="text-muted-foreground text-sm mt-0.5">Mon-Fri 10am-3pm</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className='bg-grayBackground border-none outline-none text-foreground flex-grow'>
                            <CardContent className="flex items-center space-x-4">
                                <MapPin className="h-6 w-6" />
                                <div>
                                    <h3 className="font-heading text-lg">Location</h3>
                                    <p className="text-muted-foreground">131 Continental Dr, Suite 305</p>
                                    <p className="text-muted-foreground text-sm mt-0.5">Newark, DE 19713</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    {/* <div className="mt-8">
                        <img
                            src="/images/placeholder.png"
                            alt="Office Location"
                            width={500}
                            height={300}
                            className="rounded-lg"
                        />
                    </div> */}
                </div>
            </div>
        </div>
    );
}
export default React.memo(ContactUs);