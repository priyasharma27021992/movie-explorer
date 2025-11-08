import Link from 'next/link';
import { Image } from '../components/ui/Image';
import { cn } from '@/utils/common';
import { Movie } from '@/types';
import StarIcon from '@/assets/icons/star.svg';
import StarIconOutline from '@/assets/icons/outline/star.svg';
import { useAddToWatch } from '@/hooks/useAddToWatch';

interface MovieCardProps {
	movie: Movie;
	className?: string;
	index?: number;
}

const MovieCard = ({
	movie,
	className,
	toggleToWatchMovie,
}: MovieCardProps) => {
	const { addToWatchMovies } = useAddToWatch();

	const isAddedToWatch = addToWatchMovies?.some(
		(addedMovie: Movie) => addedMovie.title === movie.title
	);

	return (
		<>
			<div className='flex flex-col gap-2'>
				<Link
					href={`/movie/${movie.id}`}
					className='group hover:-translate-y-1 focus-within:-translate-y-1 focus-within:shadow-lg overflow-hidden transition-all duration-300 ease-in'>
					<div className='relative w-auto max-w-[200px] aspect-[2/3]'>
						<Image
							src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
							alt={movie.title}
							fill
							className={cn(
								'absolute inset-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in',
								className
							)}
						/>
					</div>
				</Link>
				<button
					className='flex items-center gap-1 text-left text-sm cursor-pointer'
					onClick={() => toggleToWatchMovie(movie)}>
					{isAddedToWatch ? (
						<span>Remove from Add To Watch</span>
					) : (
						<span>Add To Watch</span>
					)}
					{isAddedToWatch ? (
						<StarIcon
							className='text-yellow-300'
							width={15}
							height={15}
						/>
					) : (
						<StarIconOutline
							width={15}
							height={15}
						/>
					)}
				</button>
			</div>
		</>
	);
};

export { MovieCard };
