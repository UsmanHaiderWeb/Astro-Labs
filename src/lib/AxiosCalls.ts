import axios from "axios";

const api = axios.create({
    baseURL: 'https://c4fd-116-90-118-31.ngrok-free.app'
})

export const SignupCall = async ({username, email, password}: {username: string, email: string, password: string}) => {
    const { data } = await api.post('/auth/signup',
        {username, email, password},
        {
            withCredentials: true
        },
    )

    return data;
}

export const LoginCall = async ({email, password}: {email: string, password: string}) => {
    const { data } = await api.post('/auth/login',
        {email, password},
        {
            withCredentials: true
        },
    )

    return data;
}

// google

export const ContinueWithGoogleCall = async () => {
    const { data } = await api.get('/auth/google/login',
        {
            withCredentials: true
        },
    )

    return data;
}

export const GoogleVerificationCallBackCall = async ({code}: {code: string}) => {
    const { data } = await api.get(`/auth/google/callback?code=${code}`,
        {
            withCredentials: true
        },
    )

    return data;
}

// discord

export const ContinueWithDiscordCall = async () => {
    const { data } = await api.get('/auth/discord/login',
        {
            withCredentials: true
        },
    )

    return data;
}

export const DiscordVerificationCallBackCall = async ({code}: {code: string}) => {
    const { data } = await api.get(`/auth/discord/callback?code=${code}`,
        {
            withCredentials: true
        },
    )

    return data;
}

// stripe

export const FetchStripeUrlCall = async ({token, planId}: {token: string, planId: 'pro' | 'premium'}) => {
    const { data } = await api.post(`/payments/create-checkout-session`,
        {role: planId},
        {
            headers: {
                Authorization: `bearer ${token}`
            },
            withCredentials: true
        },
    )

    return data;
}

// generate audios

export const generateAudioCall = async ({token, planId}: {token: string, planId: 'pro' | 'premium'}) => {
    const { data } = await api.post(`/payments/create-checkout-session`,
        {role: planId},
        {
            headers: {
                Authorization: `bearer ${token}`
            },
            withCredentials: true
        },
    )

    return data;
}
