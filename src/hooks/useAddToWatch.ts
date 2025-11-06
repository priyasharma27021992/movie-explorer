import { useState } from "react";
import { TOAST_TYPE } from "@/components/ui/Toast/types";
import { useToastContext } from "./useToastContext";
import { Movie } from "@/types";

export const useAddToWatch = () => {
    const [addToWatchMovies, setAddToWatchMovies] = useState<Array<Movie>>([]);
    const { addToToastList } = useToastContext();


	const toggleToWatchMovie = (movie: Movie) => {
        if(addToWatchMovies.some((mov: Movie) => mov.title === movie.title)){
            setAddToWatchMovies((prev) => prev.filter((ele: Movie) => ele.title !== movie.title));
            addToToastList({
			type: TOAST_TYPE.ERROR,
			title: `Movie ${movie.title} is removed to your watch list!`,
		});
            return;
        }
		setAddToWatchMovies((prev) => [...prev, movie]);
		addToToastList({
			type: TOAST_TYPE.INFO,
			title: `Movie ${movie.title} is added to your watch list!`,
		});
	};

        return {
            addToWatchMovies,
            toggleToWatchMovie
        }
}