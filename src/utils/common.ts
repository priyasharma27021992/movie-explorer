import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...args: ClassValue[]) {
    return twMerge(clsx(args));
}

export function debounce<A extends unknown[]>(
    callbackFunc: (...args: A) => void,
    delay = 1000,
) {
    let timer: ReturnType<typeof setTimeout> | null = null;
    return function (...args: A) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            callbackFunc(...args);
        }, delay);
    };
}