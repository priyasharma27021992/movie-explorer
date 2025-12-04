import { useSWRQuery } from "@/components/useSWRQuery";
import { getMovieByQuery } from "@/lib/getMovieByQuery";


export const useSearchMovie = (query?: string) => useSWRQuery(query ? `/search/movie?query=${query}`: null, 
    () => getMovieByQuery(query), {
        revalidateOnFocus: false,
        dedupingInterval: 5*60*1000
    });