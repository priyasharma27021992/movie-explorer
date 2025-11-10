import { TOAST_TYPE } from "@/components/ui/Toast/types";
import { useToastContext } from "./useToastContext";
import { Movie } from "@/types";
import { useAddToWatchContext } from "./useAddToWatchContext";

export const useAddToWatch = () => {
    const { addToToastList } = useToastContext();
    const { addToWatchMovies, removeFromWatchlist, addToWatchList } = useAddToWatchContext()

    const isMovieInWatchList = (title?: string) => {
      return addToWatchMovies?.some(mov => mov.title === title);
    }


	const toggleToWatchMovie = (movie: Movie) => {
        if(isMovieInWatchList(movie.title)){
            removeFromWatchlist(movie);
            addToToastList({
			type: TOAST_TYPE.ERROR,
			title: `Movie ${movie.title} is removed to your watch list!`,
		});
            return;
        }
		addToWatchList(movie);
		addToToastList({
			type: TOAST_TYPE.INFO,
			title: `Movie ${movie.title} is added to your watch list!`,
		});
	};

        return {
            addToWatchMovies,
            toggleToWatchMovie,
            isMovieInWatchList
        }
}