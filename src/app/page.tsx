import Link from 'next/link';

export default async function Home() {
	const res = await fetch(
		`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_KEY}`,
		{ cache: 'no-store' }
	);
	const data = await res.json();

	return (
		<main>
			<h1>Trending Movies(SSR)</h1>
			<ul>
				{data.results?.map((movie: { id: string; title: string }) => (
					<li key={movie.id}>
						{movie.title}
						<Link href={`/movie/${movie.id}`}>Check More</Link>
					</li>
				))}
			</ul>
		</main>
	);
}
