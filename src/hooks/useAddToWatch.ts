import { useState } from "react";
import { useToast } from "./useToasts";
import { TOAST_TYPE } from "@/components/ui/Toast/types";

export const useAddToWatch = () => {
    const [addToWatchMovies, setAddToWatchMovies] = useState([]);
    const { setToastList } = useToast();


	const toggleToWatchMovie = (movie) => {
        if(addToWatchMovies.some(mov => mov.title === movie.title)){
            setAddToWatchMovies((prev) => prev.filter(ele => ele.title !== movie.title));
            setToastList({
			id: crypto.randomUUID(),
			type: TOAST_TYPE.ERROR,
			title: `Movie ${movie.title} is removed to your watch list!`,
		});
            return;
        }
		setAddToWatchMovies((prev) => [...prev, movie]);
		setToastList({
			id: crypto.randomUUID(),
			type: TOAST_TYPE.INFO,
			title: `Movie ${movie.title} added to your watch list!`,
		});
	};

        return {
            addToWatchMovies,
            toggleToWatchMovie
        }
}