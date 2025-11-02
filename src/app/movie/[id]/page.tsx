import { Suspense } from 'react';
import Reviews from './reviews';
import { notFound } from 'next/navigation';
import { Image } from '../../../components/ui/Image';
import '../../styles/global.css';

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

	console.log('movie baby', movie);
	return (
		<main
			className={`
    flex flex-col md:flex-row gap-1 justify-center rounded-lg
  `}>
			<div className='flex-1'>
				<h1>{movie.title}</h1>
				<p>{movie.overview}</p>

				<h2>Reviews</h2>
				<p>Generated at: {new Date().toISOString()}</p>
				<Suspense fallback={<p>Loading reviews...</p>}>
					{/* <div
						className={`
    flex flex-col md:flex-row gap-1 justify-center rounded-lg border-8 border-transparent p-3
    [background:padding-box_linear-gradient(#FFF),border-box_conic-gradient(from_var(--angle),#070707,#687aff,#ff5f6d,#ffc371)]
    animate-[rotate_5s_linear_infinite]
  `}></div> */}
					<Reviews id={movie.id} />
				</Suspense>
			</div>

			<div className='relative aspect-[2/3] max-w-[200px] flex-1'>
				<Image
					src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
					alt={movie.title}
					fill
					className='absolute object-cover'
				/>
			</div>
		</main>
	);
}
