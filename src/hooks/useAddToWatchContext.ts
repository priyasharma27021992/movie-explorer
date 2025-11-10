import { AddToWatchContext } from "@/providers/AddToWatchProvider"
import { useContext } from "react"

export const useAddToWatchContext=() => {
    const context = useContext(AddToWatchContext);
    if(!context)
        throw new Error('Please use under AddToWatch Provider!');

    return context
}