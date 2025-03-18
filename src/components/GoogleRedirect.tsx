/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleVerificationCallBackCall } from '@/lib/AxiosCalls';
import useSearchParamsObject from '@/lib/GetSearchParams'
import { useQuery } from '@tanstack/react-query';
import * as React from 'react'
import { useNavigate } from 'react-router-dom';

const GoogleRedirect = () => {
	const navigate = useNavigate();
	const searchParams: {code?: string} = useSearchParamsObject();
	console.log("searchParams: ", searchParams)

	const { data }: any = useQuery({
		queryKey: ['send google code to backend', searchParams?.code],
		queryFn: () => GoogleVerificationCallBackCall({code: searchParams?.code}),
		enabled: !!searchParams?.code,
		retry: 0
	});

	React.useEffect(() => {
		console.log('data: ', data);
		if(data?.access_token){
            localStorage.setItem("astraToken", data?.access_token)
            navigate('/', { replace: true });
		}
	}, [data])

	return (
		<div></div>
	)
}

export default React.memo(GoogleRedirect);
