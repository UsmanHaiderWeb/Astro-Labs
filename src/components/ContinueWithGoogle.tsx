/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { ContinueWithGoogleCall } from "@/lib/AxiosCalls";
import { RefreshCcw } from "lucide-react";
import { showToast } from "@/lib/ShowToast";

const ContinueWithGoogle = () => {
    const { mutate, isPending } = useMutation({
        mutationKey: ['Google Login'],
        mutationFn: ContinueWithGoogleCall,
        onError: () => {
            showToast('Something went wrong. Please try again later.')
        },
        onSuccess: (data: { oauth_url: string }) => {
            window.location.href = data.oauth_url;
            // localStorage.setItem("astraToken", data.oauth_url)
            // navigate('/', { replace: true });
        }
    })

    return (<>
        {isPending ?
            <Button variant="outline" disabled type="button" className="w-full text-white cursor-not-allowed">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                    />
                </svg>
                Google <RefreshCcw className='animate-spin duration-300' />
            </Button>
            :
            <Button variant="outline" type="button" className="w-full cursor-pointer" onClick={() => {
                mutate();
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                    />
                </svg>
                Login with Google
            </Button>
        }
    </>);
};

export default React.memo(ContinueWithGoogle);