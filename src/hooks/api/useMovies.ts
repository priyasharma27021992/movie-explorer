import { useSWRQuery } from '@/components/useSWRQuery'

const fetchMovies = async (page: number = 1) => {
    console.log('FETCHING MOVIES FOR PAGE:', page)
    const res = await fetch(`/api/trending?page=${page}`)
    const data = await res.json()
    return data
}

export const useMovies = (page: number) =>
    useSWRQuery(`movies/trending?page=${page}`, () => fetchMovies(page))
