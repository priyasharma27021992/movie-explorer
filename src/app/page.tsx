'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		fetch('/api/trending') // browser makes this request
			.then((res) => {
				console.log(res.status, res.headers.get('ETag'));
				return res.json();
			})
			.then((data) => setMovies(data));
	}, []);

	return (
		<main>
			<h1>Trending Movies(SSR)</h1>
			<ul>
				{movies.results?.map((movie: { id: string; title: string }) => (
					<li key={movie.id}>
						{movie.title}
						<Link href={`/movie/${movie.id}`}>Check More</Link>
					</li>
				))}
			</ul>
		</main>
	);
}
