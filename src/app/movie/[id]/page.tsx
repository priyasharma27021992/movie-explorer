export const revalidate = 60; // ISR every 60s
import { Suspense } from 'react';
import Reviews from './reviews';

export default async function MovieDetails({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const res = await fetch(
		`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}`
	);
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
