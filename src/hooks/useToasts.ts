import { useState } from "react";

export const useToast = () => {
    const [list, setList] = useState([]);

    const setToastList = (toastData) => {
        setList(prev => ([...prev, toastData]));
    }

    console.log('list', list);

    return {
        list,
        setToastList,
    }
}