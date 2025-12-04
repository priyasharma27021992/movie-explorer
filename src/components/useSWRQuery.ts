import useSWR, { SWRConfiguration } from 'swr';

export function useSWRQuery<T>(key: string | null, fetcher: () => Promise<T>, config?: SWRConfiguration) {
    const { data, error, isLoading, mutate } = useSWR(key, fetcher, config);

    return {
        data,
        error,
        isLoading,
        refetch: mutate,
    };
}
