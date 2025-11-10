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

	return (
		<main>
			<div className='flex flex-col md:flex-row gap-4 items-start justify-between mx-auto rounded-lg max-w-6xl m-4'>
				<div className='flex-1 gap-2'>
					<h1 className='font-bold text-2xl'>{movie.title}</h1>
					<p className='italic font-semibold'>{movie.overview}</p>

					<Suspense fallback={<p>Loading reviews...</p>}>
						<Reviews id={movie.id} />
					</Suspense>
				</div>

				<div className='relative aspect-[2/3] max-w-[200px] lg:max-w-[300px] flex-1'>
					<Image
						src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
						alt={movie.title}
						fill
						className='absolute object-contain rounded-2xl'
					/>
				</div>
			</div>
		</main>
	);
}
