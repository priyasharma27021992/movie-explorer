import { Suspense } from 'react';
import Reviews from './reviews';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export async function generateStaticParams() {
	const res = await fetch(
		`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_KEY}`
	);
	const data = await res.json();
	return data?.results?.map((movie: { id?: number }) => ({
		id: movie?.id?.toString() || '',
	}));
}

export default async function MovieDetails({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const res = await fetch(
		`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}`
	);
	if (!res.ok) {
		notFound();
	}
	const movie = await res.json();
	return (
		<main>
			<h1>{movie.title}</h1>
			<p>{movie.overview}</p>

			<h2>Reviews</h2>
			<p>Generated at: {new Date().toISOString()}</p>
			<Suspense fallback={<p>Loading reviews...</p>}>
				<Reviews id={movie.id} />
			</Suspense>
		</main>
	);
}
