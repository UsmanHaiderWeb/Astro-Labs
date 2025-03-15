import * as React from 'react'
import { Send, MapPin, Phone, Mail } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function ContactUs() {
    return (
        <div className="max-w-[1000px] md:w-full sm:w-[80%] mx-auto px-4 pt-5 pb-24">
            <div className="flex justify-center md:flex-row flex-col gap-8">
                <div className="bg-grayBackground p-8 rounded-lg shadow-lg md:order-2 order-1 md:w-[53%]">
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
                </div>
                <div className="space-y-5 md:order-1 order-2 md:w-[47%]">
                    <div>
                        <h2 className="text-3xl leading-8 font-heading mt-8">Contact Information</h2>
                        <p className="text-muted-foreground w-[80%] min-w-[300px] mt-3">
                            We&apos;re here to help and answer any questions you might have.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <Card className='bg-grayBackground border-none outline-none text-foreground'>
                            <CardContent className="flex items-center space-x-4">
                                <Mail className="h-6 w-6 text-purple" />
                                <div>
                                    <h3 className="font-heading text-lg">Email Us</h3>
                                    <p className="text-muted-foreground">info@company.com</p>
                                    <p className="text-muted-foreground text-sm mt-0.5">support@company.com</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className='bg-grayBackground border-none outline-none text-foreground'>
                            <CardContent className="flex items-center space-x-4">
                                <Phone className="h-6 w-6 text-purple" />
                                <div>
                                    <h3 className="font-heading text-lg">Call Us</h3>
                                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                                    <p className="text-muted-foreground text-sm mt-0.5">Mon-Fri 9am-6pm</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className='bg-grayBackground border-none outline-none text-foreground'>
                            <CardContent className="flex items-center space-x-4">
                                <MapPin className="h-6 w-6 text-purple" />
                                <div>
                                    <h3 className="font-heading text-lg">Visit Us</h3>
                                    <p className="text-muted-foreground">123 Business Street</p>
                                    <p className="text-muted-foreground text-sm mt-0.5">New York, NY 10001</p>
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