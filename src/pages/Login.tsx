import * as React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from 'react-router-dom'
import ContinueWithGoogle from '@/components/ContinueWithGoogle'
import ContinueWithDiscord from '@/components/ContinueWithDiscord'

function Login() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
            <div className="w-full max-w-[420px]">
                <div className="flex flex-col gap-2">
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center gap-2">
                                <div className="flex flex-col items-center gap-2 font-medium">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-md">
                                        <img src='/logo.png' width={80} height={80} className="size-20" />
                                    </div>
                                    <span className="sr-only"></span>
                                </div>
                                <h1 className="text-[18px] font-bold">Welcome Back to Astra Labs</h1>
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
                                <Button type="submit" variant='secondary' className="w-full cursor-pointer">
                                    Login
                                </Button>
                            </div>
                            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                <span className="relative z-10 px-2 text-muted-foreground bg-[#272322]">
                                    OR
                                </span>
                            </div>
                            <div className="grid gap-2 sm:grid-cols-2">
                                <ContinueWithDiscord />
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