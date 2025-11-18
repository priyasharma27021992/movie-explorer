import { fetcher } from '@/lib/fetcher'
import { Review } from '@/types'
import useSWR from 'swr'

export function useReviews(id: string) {
    const { data, error, isLoading } = useSWR<{ results?: Review[] }>(
        id ? `/api/reviews?id=${id}` : null,
        fetcher
    )

    return {
        reviews: data?.results ?? [],
        isLoading,
        isError: error,
    }
}
