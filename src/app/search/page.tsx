'use client';

import { useState } from 'react';

export default function SearchPage() {
	const [query, setQuery] = useState('');
	const [results, setResults] = useState([]);

	async function handleSearch() {
		const res = await fetch(`/api/search?query=${query}`);
		const data = await res.json();
		console.log('baby', data);
		setResults(data.results || []);
	}

	return (
		<main>
			<h1>Search Movies(CSR)</h1>
			<input
				type='text'
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder='Search...'
				className='border x-2'
			/>
			<button onClick={handleSearch}>Search</button>

			<ul>
				{results?.map((movie: { id: string; title: string }) => (
					<li key={movie.id}>{movie.title}</li>
				))}
			</ul>
		</main>
	);
}
