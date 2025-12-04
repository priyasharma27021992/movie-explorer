import { useEffect, useRef, useState } from "react"

export const useDebounceValue= <T>(value: T, delay=500) => {
    const [debounceValue, setDebounceValue] = useState<T>();
    const timer = useRef<ReturnType<typeof setTimeout>>(null);

    useEffect(()=> {
        if(timer.current){
            clearTimeout(timer.current)
        }
        timer.current = setTimeout(() => {
            setDebounceValue(value)
        }, delay);
        return () => {
            if(timer.current)
                clearTimeout(timer.current)
        };
    },[delay, value]);

    return debounceValue;
}