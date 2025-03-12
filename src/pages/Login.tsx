import * as React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from 'react-router-dom'
import ContinueWithGoogle from '@/components/ContinueWithGoogle'

function Login() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
            <div className="w-full max-w-[420px]">
                <div className="flex flex-col gap-2">
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center gap-2">
                                <div className="flex flex-col items-center gap-2 font-medium">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-md">
                                        <img src='/logo.png' width={40} height={40} className="size-10" />
                                    </div>
                                    <span className="sr-only"></span>
                                </div>
                                <h1 className="text-xl font-bold">Welcome to Astra Labs</h1>
                                <div className="text-center text-sm">
                                    Login to your Astra Labs account to continue
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2 mb-3">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Enter password"
                                        required
                                    />
                                </div>
                                <Button type="submit" variant='secondary' className="w-full">
                                    Login
                                </Button>
                            </div>
                            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                <span className="relative z-10 px-2 text-muted-foreground bg-[#272322]">
                                    OR
                                </span>
                            </div>
                            <div className="grid gap-2 sm:grid-cols-2">
                                <Button variant="outline" className="w-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className='scale-125'>
                                        <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612"></path>
                                    </svg>
                                    Login With Discord
                                </Button>
                                <ContinueWithGoogle />
                            </div>
                        </div>
                    </form>
                    <div className="text-center text-sm mt-6 mb-1">
                        Don&apos;t have an account?{" "}
                        <Link to="/sign-up" className="underline underline-offset-4 ml-2 border-none outline-none">
                            Sign up
                        </Link>
                    </div>
                    <div className="max-w-sm mx-auto text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                        and <a href="#">Privacy Policy</a>.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Login)