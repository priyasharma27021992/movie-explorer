'use client';

import { MovieCard } from '@/components/MovieCard';
import { SearchBox } from '@/components/SearchBox';
import { useAddToWatch } from '@/hooks/useAddToWatch';
import { Movie } from '@/types';
import { debounce } from '@/utils/common';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export default function Home() {
	const [movies, setMovies] = useState<Array<Movie>>([]);
	const [filteredMovies, setFilteredMovies] = useState<Array<Movie>>([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [searchStr, setSearchStr] = useState('');
	const loadingRef = useRef(null);
	const { toggleToWatchMovie } = useAddToWatch();

	useEffect(() => {
		const intersectionObserver = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					setPage((prev) => prev + 1);
				}
			},
			{ threshold: 0, rootMargin: '200px' }
		);
		if (loadingRef.current) {
			intersectionObserver.observe(loadingRef.current);
		}
		return () => intersectionObserver.disconnect();
	}, []);

	const searchByMovieName = useCallback(
		(searchText?: string) => {
			if (!searchText) {
				setFilteredMovies(movies);
				return;
			}

			const text = searchText.toLowerCase();
			const filtered = movies.filter((mov) =>
				mov.title.toLowerCase().includes(text)
			);
			setFilteredMovies(filtered);
		},
		[movies]
	);

	const debouncedSearch = useMemo(() => debounce(searchByMovieName), [movies]);

	const handleSearch = (searchText: string) => {
		setSearchStr(searchText);
		debouncedSearch(searchText);
	};

	const fetchMovies = async <T,>(page: number): Promise<T> => {
		const res = await fetch(`/api/trending?page=${page}`);
		const data = await res.json();
		return data as T;
	};

	type MoviesType<T> = T extends Promise<infer R> ? R : T;

	type Result = MoviesType<
		ReturnType<typeof fetchMovies<{ results: Movie[] }>>
	>;

	useEffect(() => {
		const run = async () => {
			setLoading(true);
			try {
				const data: Result = await fetchMovies(page);
				setMovies((prev) => [...prev, ...data.results]);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		run();
	}, [page]);

	useEffect(() => {
		if (!searchStr) setFilteredMovies(movies);
		else searchByMovieName(searchStr);
	}, [movies]);

	return (
		<main className='max-w-[1280px] mx-auto my-2'>
			<h1 className='font-bold text-center my-2 text-2xl'>Trending Movies</h1>
			<SearchBox
				searchStr={searchStr}
				setSearchStr={handleSearch}
			/>
			<div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 md:grid-cols-4 md:gap-4 gap-2 max-w-full md:max-w-[90%] lg:max-w-[95%] mx-auto'>
				{filteredMovies?.map((movie: { id: string; title: string }, index) => (
					<MovieCard
						key={`${movie.id}-${index}`}
						movie={movie}
						className='rounded-lg'
						index={index}
						toggleToWatchMovie={toggleToWatchMovie}
					/>
				))}
			</div>
			<div
				className='h-10 flex justify-center items-center'
				ref={loadingRef}>
				{loading && <span>loading more...</span>}
			</div>
		</main>
	);
}
