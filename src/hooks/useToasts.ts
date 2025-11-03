import { ToastType } from "@/components/ui/Toast/types";
import { useState } from "react";


export const useToast = () => {
    const [list, setList] = useState<Array<ToastType>>([]);

    const setToastList = (toastData: ToastType) => {
        console.log('came here', toastData);
        setList(prev => ([...prev, toastData]));
    }

    return {
        list,
        setToastList,
    }
}