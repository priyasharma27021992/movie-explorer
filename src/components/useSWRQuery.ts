import useSWR from 'swr';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useState } from 'react';

type Fetcher<T, O extends AxiosRequestConfig, R> = (data: T, options?: O) => Promise<AxiosResponse<R>>;

export const useSWRQuery = <T, O extends AxiosRequestConfig , R>(
    key: string | [string, unknown],
    fetcher: Fetcher<T, O, R>,
    authenticated?: boolean,
    config?: {},
    active: boolean | (() => boolean) = true
) => {
    const [isLoading, setIsLoading] = useState(false);

    const query = async (data) => {
        setIsLoading(true);
        try{
            const result = await fetcher(data as T);
            setIsLoading(false);
            return result;
        }catch(error){
            setIsLoading(false)
            throw error
        }
    }

  const currentlyActive = typeof active === 'function' ? active() : active;
  const { isLoading: isLoadingQuery, ...queryHook } = useSWR<R | null, AxiosError>(
    currentlyActive ? key : null,
    query,
    config,
  );

    return {
        isLoading: isLoading || isLoadingQuery,
        revalidate: query,
        ...queryHook,
    }
}