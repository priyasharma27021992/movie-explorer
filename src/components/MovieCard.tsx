import Link from 'next/link';
import { Image } from '../components/ui/Image';
import { cn } from '@/utils/common';
import { Movie } from '@/types';
import StarIcon from '@/assets/icons/star.svg';
import StarIconOutline from '@/assets/icons/outline/star.svg';
import { useAddToWatch } from '@/hooks/useAddToWatch';
import { Tooltip } from './ui/ToolTip/ToolTip';

interface MovieCardProps {
    movie: Movie;
    className?: string;
    index?: number;
    toggleToWatchMovie: (movie: Movie) => void;
}

const MovieCard = ({
    movie,
    className,
    toggleToWatchMovie,
}: MovieCardProps) => {
    const { isMovieInWatchList } = useAddToWatch();

    const isWatchListedMovie = isMovieInWatchList(movie.title);
    return (
        <div className="flex flex-col gap-2">
            <Link
                href={`/movie/${movie.id}`}
                className="group hover:-translate-y-1 focus-within:-translate-y-1 focus-within:shadow-lg overflow-hidden transition-all duration-300 ease-in"
            >
                <div className="relative max-w-[200px] aspect-[2/3] mx-auto md:mx-0">
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
            <div className="flex gap-2 max-w-[200px]">
                <button
                    className="flex items-center gap-1 text-left text-sm cursor-pointer mx-auto md:mx-0"
                    onClick={() => toggleToWatchMovie(movie)}
                >
                    {isWatchListedMovie ? (
                        <Tooltip text="Remove from Watchlist">
                            <StarIcon
                                className="text-yellow-300 relative"
                                width={15}
                                height={15}
                            />
                        </Tooltip>
                    ) : (
                        <Tooltip text="Add To Watchlist">
                            <StarIconOutline
                                width={15}
                                height={15}
                                className="relative"
                            />
                        </Tooltip>
                    )}
                </button>
                <p className="text-sm">{movie.title}</p>
            </div>
        </div>
    );
};

export { MovieCard };
