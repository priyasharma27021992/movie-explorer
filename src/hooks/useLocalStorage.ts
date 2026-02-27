import { clearFromLocalStorage, getFromLocalStorage, setToLocalStorage } from "@/types/localStorage";
import { useCallback, useEffect, useState } from "react"

export const useLocalStorage = <P>(key: string, fallback?: P): [P | null | undefined, (newValue: P) => void, () => void] => {
    const [value, setValue] = useState<P| null | undefined>();

    useEffect(() => {
        setValue(getFromLocalStorage<P>(key, fallback))
    }, [fallback, key]);

    const set = useCallback((value:P) => {
        setToLocalStorage(key, JSON.stringify(value));
        setValue(value);
    }, [key])

    const clear = useCallback(() => {
        clearFromLocalStorage(key);
        setValue(null)
    }, [key])
    
    return [value, set, clear]
}