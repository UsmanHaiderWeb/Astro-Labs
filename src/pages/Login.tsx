/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from 'react-router-dom'
import ContinueWithGoogle from '@/components/ContinueWithGoogle'
import ContinueWithDiscord from '@/components/ContinueWithDiscord'
import { LoginCall } from '@/lib/AxiosCalls'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema } from '@/lib/ZodSchemas'
import { Controller, useForm } from 'react-hook-form'
import { AxiosError } from 'axios'
import FormFieldError from '@/components/FormFieldError'
import { RefreshCcw } from 'lucide-react'

function Login() {
    const navigate = useNavigate();

    const { control, formState: { errors }, handleSubmit, setError } = useForm({
        defaultValues: {
            email: "",
            password: ""
        },
        resolver: zodResolver(LoginSchema),
    })

    const { mutate, isPending } = useMutation({
        mutationKey: ['Login'],
        mutationFn: LoginCall,
        onError: (error: AxiosError<{ detail: string }>) => {
            setError('root', { message: 'Email or password is invalid.' })
            console.log("signup error: ", error);
        },
        onSuccess: (data: { access_token: string }) => {
            localStorage.setItem("astraToken", data.access_token)
            navigate('/', { replace: true });
        }
    })

    const loginToAccount = (data: { email: string, password: string }) => {
        if (!isPending) {
            mutate(data);
        }
    }

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
            <div className="w-full max-w-[420px]">
                <div className="flex flex-col gap-2">
                    <form onSubmit={handleSubmit(loginToAccount)}>
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
                                    Log in to your account
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Controller
                                        control={control}
                                        name='email'
                                        render={({ field }) => (
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="m@example.com"
                                                required
                                                disabled={isPending}
                                                value={field.value}
                                                onChange={(e: any) => field.onChange(typeof e == 'string' ? e : e.target.value)}
                                            />
                                        )}
                                    />
                                    <FormFieldError message={errors?.email?.message} />
                                </div>
                                <div className="grid gap-2 mb-0">
                                    <Label htmlFor="password">Password</Label>
                                    <Controller
                                        control={control}
                                        name='password'
                                        render={({ field }) => (<>
                                            <Input
                                                id="password"
                                                type="password"
                                                placeholder="Enter password"
                                                required
                                                disabled={isPending}
                                                value={field.value}
                                                onChange={(e: any) => field.onChange(typeof e == 'string' ? e : e.target.value)}
                                            />
                                            {errors?.password?.message &&
                                                <FormFieldError message={field.value?.length == 0 ? errors?.password?.message : "Password is incorrect."} />
                                            }
                                        </>)}
                                    />
                                </div>
                                <FormFieldError message={errors?.root?.message || ' '} />
                                {isPending ?
                                    <Button type="button" variant='secondary' disabled className="w-full cursor-pointer">
                                        Logging <RefreshCcw className='animate-spin duration-150' />
                                    </Button>
                                    :
                                    <Button type="submit" variant='secondary' className="w-full cursor-pointer">
                                        Login
                                    </Button>
                                }
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