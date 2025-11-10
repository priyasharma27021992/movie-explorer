'use client';

import { Movie } from '@/types';
import { createContext, useState, ReactNode } from 'react';

interface AddToWatchContextType {
	addToWatchMovies: Array<Movie>;
	removeFromWatchlist: (mov: Movie) => void;
	addToWatchList: (mov: Movie) => void;
}
export const AddToWatchContext = createContext<AddToWatchContextType>({});

export const AddToWatchProvider = ({ children }: { children: ReactNode }) => {
	const [addToWatchMovies, setAddToWatchMovies] = useState<Array<Movie>>([]);

	const addToWatchList = (movie: Movie) => {
		setAddToWatchMovies((prev) => [...prev, movie]);
	};

	const removeFromWatchlist = (movie: Movie) => {
		setAddToWatchMovies((prev) => [
			...prev.filter((prevMovie) => prevMovie.title !== movie.title),
		]);
	};

	return (
		<AddToWatchContext
			value={{
				addToWatchMovies,
				removeFromWatchlist,
				addToWatchList,
			}}>
			{children}
		</AddToWatchContext>
	);
};
