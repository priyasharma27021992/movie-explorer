import Link from 'next/link';
import { Image } from '../components/ui/Image';
import { cn } from '@/utils/common';
import { Movie } from '@/types';
import { useState } from 'react';
import { Toast } from './ui/Toast/Toast';
import { useToast } from '@/hooks/useToasts';

interface MovieCardProps {
	movie: Movie;
	className?: string;
	index?: number;
}

const MovieCard = ({ movie, index, className }: MovieCardProps) => {
	const [addToWatchMovies, setAddToWatchMovies] = useState([]);
	const { list, setToastList } = useToast();

	const addToWatch = () => {
		setAddToWatchMovies((prev) => [...prev]);
		setToastList({
			position: 'top-right',
			type: 'info',
			title: `Movie ${movie.title} added to your watch list!`,
		});
	};

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
					className='text-left text-sm cursor-pointer'
					onClick={addToWatch}>
					Add To Watch
				</button>
			</div>
			{list.length > 0 && (
				<Toast
					toastList={list}
					position='top-0 right-0'
				/>
			)}
		</>
	);
};

export { MovieCard };
