/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DiscordVerificationCallBackCall } from '@/lib/AxiosCalls';
import useSearchParamsObject from '@/lib/GetSearchParams'
import { setToken } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import * as React from 'react'
import { useNavigate } from 'react-router-dom';

const DiscordRedirect = () => {
	const navigate = useNavigate();
	const searchParams: {code?: string} = useSearchParamsObject();
	console.log("searchParams: ", searchParams)

	const { data, isError }: any = useQuery({
		queryKey: ['send discord code to backend', searchParams?.code],
		queryFn: () => DiscordVerificationCallBackCall({code: searchParams?.code}),
		enabled: !!searchParams?.code,
		retry: 0,
        refetchOnWindowFocus: false
	});

	React.useEffect(() => {
		console.log('data: ', data);
		if(data?.access_token){
            setToken(data?.access_token)
            navigate('/', { replace: true });
		} else if(isError){
            navigate('/login?error=true', { replace: true });
		}
	}, [data, isError])

	return (
		<div></div>
	)
}

export default React.memo(DiscordRedirect);