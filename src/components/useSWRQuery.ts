import useSWR from 'swr'

export function useSWRQuery<T>(key: string | null, fetcher: () => Promise<T>) {
    const { data, error, isLoading, mutate } = useSWR(key, fetcher)

    return {
        data,
        error,
        isLoading,
        refetch: mutate,
    }
}
