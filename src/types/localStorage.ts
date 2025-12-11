const localStorageExists = (): boolean => typeof localStorage !== 'undefined';

export const getFromLocalStorage = <T>(key: string, fallback?: T) => {
    if(localStorageExists()){
        const data = localStorage.getItem(key);
        return data === null ? (fallback ?? null): JSON.parse(data);
    }

    if(fallback)
        return fallback;

    return null;
}

export const setToLocalStorage = <T>(key: string, value: T) => {
    if(localStorageExists()){
        localStorage.setItem(key, JSON.stringify(value));
    }
}

export const clearFromLocalStorage = (key: string): void => {
    if(localStorageExists()){
        localStorage.removeItem(key)
    }
}