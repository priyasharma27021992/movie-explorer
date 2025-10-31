import Link from 'next/link';
import { Image } from '../components/ui/Image';
import { cn } from '@/utils/common';
import { Movie } from '@/types';

interface MovieCardProps {
	movie: Movie;
	className?: string;
}

const MovieCard = ({ movie, className }: MovieCardProps) => {
	return (
		<Link href={`/movie/${movie.id}`}>
			<div className='relative w-auto max-w-[200px] aspect-[2/3]'>
				<Image
					src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
					alt={movie.title}
					fill
					className={cn('absolute inset-0 object-cover', className)}
				/>
			</div>
		</Link>
	);
};

export { MovieCard };
