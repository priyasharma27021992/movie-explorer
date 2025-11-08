'use client';

import { MovieCard } from '@/components/MovieCard';
import { useAddToWatch } from '@/hooks/useAddToWatch';
import { Movie } from '@/types';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
	const [movies, setMovies] = useState<Array<Movie>>([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const loadingRef = useRef(null);
	const { toggleToWatchMovie } = useAddToWatch();

	useEffect(() => {
		const intersectionObserver = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					setPage((prev) => prev + 1);
				}
			},
			{ threshold: 1 }
		);
		if (loadingRef.current) {
			intersectionObserver.observe(loadingRef.current);
		}
		return () => intersectionObserver.disconnect();
	}, []);

	useEffect(() => {
		setLoading(true);
		fetch(`/api/trending?page=${page}`) // browser makes this request
			.then((res) => {
				console.log(res.status, res.headers.get('ETag'));
				return res.json();
			})
			.then((data) => {
				setLoading(false);
				setMovies((prev) => [...prev, ...data.results]);
			});
	}, [page]);

	return (
		<main className='max-w-[1280px] mx-auto my-2'>
			<h1 className='font-bold text-center my-2 text-2xl'>
				Trending Movies(SSR)
			</h1>
			<div className='grid grid-cols-1 lg:grid-cols-5 md:grid-cols-3 gap-4'>
				{movies?.map((movie: { id: string; title: string }, index) => (
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
