'use client';

import { MovieCard } from '@/components/MovieCard';
import { SearchBox } from '@/components/SearchBox';
import { useSearchMovie } from '@/hooks/api/searchMovie';
import { useMovies } from '@/hooks/api/useMovies';
import { useAddToWatch } from '@/hooks/useAddToWatch';
import { useDebounceValue } from '@/hooks/useDebounceValue';
import { Movie } from '@/types';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
    const [movies, setMovies] = useState<Array<Movie>>([]);
    const [page, setPage] = useState(1);
    const [searchStr, setSearchStr] = useState('');
    const loadingRef = useRef(null);
    const { toggleToWatchMovie } = useAddToWatch();
    const { data, isLoading } = useMovies(page);
    const searchQuery = searchStr.trim();
    const debouncedValue = useDebounceValue(searchQuery);
    const { data: searchResults, isLoading: searchLoading } =
        useSearchMovie(debouncedValue);

    const moviesToShow = searchQuery ? (searchResults?.results ?? []) : movies;
    useEffect(() => {
        if (data?.results) setMovies((prev) => [...prev, ...data.results]);
    }, [data]);

    useEffect(() => {
        if (!loadingRef.current) return;

        const intersectionObserver = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setPage((prev) => prev + 1);
                }
            },
            { threshold: 0, rootMargin: '200px' },
        );
        if (loadingRef.current) {
            intersectionObserver.observe(loadingRef.current);
        }
        return () => intersectionObserver.disconnect();
    }, []);

    const handleSearch = (searchText: string) => {
        setSearchStr(searchText);
    };

    return (
        <main className="max-w-[1280px] mx-auto my-2">
            <h1 className="font-bold text-center my-2 text-2xl">
                Trending Movies
            </h1>
            <SearchBox searchStr={searchStr} setSearchStr={handleSearch} />
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 md:grid-cols-4 md:gap-4 gap-2 max-w-full md:max-w-[90%] lg:max-w-[95%] mx-auto">
                {moviesToShow?.map(
                    (
                        movie: { id: string; title: string },
                        index: number | undefined,
                    ) => (
                        <MovieCard
                            key={`${movie.id}-${index}`}
                            movie={movie}
                            className="rounded-lg"
                            index={index}
                            toggleToWatchMovie={toggleToWatchMovie}
                        />
                    ),
                )}
            </div>
            <div
                className="h-10 flex justify-center items-center"
                ref={loadingRef}
            >
                {isLoading && <span>loading more...</span>}
            </div>
        </main>
    );
}
