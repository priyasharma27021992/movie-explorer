'use client';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Movie } from '@/types';
import {
    createContext,
    useState,
    ReactNode,
    useEffect,
    useCallback,
} from 'react';

interface AddToWatchContextType {
    addToWatchMovies: Array<Movie>;
    removeFromWatchlist: (mov: Movie) => void;
    addToWatchList: (mov: Movie) => void;
}
export const AddToWatchContext = createContext<AddToWatchContextType>({
    addToWatchMovies: [],
    removeFromWatchlist: () => {},
    addToWatchList: () => {},
});

export const AddToWatchProvider = ({ children }: { children: ReactNode }) => {
    const [addToWatchMovies, setAddToWatchMovies] = useState<Array<Movie>>([]);
    const [value, setLS, clearLS] = useLocalStorage<Movie[]>('watchList');

    useEffect(() => {
        if (value) setAddToWatchMovies(value);
    }, [value]);

    const addToWatchList = useCallback(
        (movie: Movie) => {
            setAddToWatchMovies((prev) => {
                const updated = [...prev, movie];
                setLS(updated);
                return updated;
            });
        },
        [setLS],
    );

    const removeFromWatchlist = useCallback(
        (movie: Movie) => {
            setAddToWatchMovies((prev) => {
                const newArray = prev.filter(
                    (prevMovie) => prevMovie.title !== movie.title,
                );
                if (newArray.length === 0) clearLS();
                else setLS(newArray);
                return newArray;
            });
        },
        [clearLS, setLS],
    );

    return (
        <AddToWatchContext
            value={{
                addToWatchMovies,
                removeFromWatchlist,
                addToWatchList,
            }}
        >
            {children}
        </AddToWatchContext>
    );
};
