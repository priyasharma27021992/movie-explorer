import { useEffect } from "react";
import { useToastContext } from "./useToastContext";
import { ToastInterface } from "@/components/ui/Toast/types";

interface useToastProps {
    autoDelete?: boolean,
    autoDeleteTime?: number
}

export const useToast = ({ autoDelete = false, autoDeleteTime = 1000}: useToastProps) => {
    const { toastList, addToToastList, setToastList} = useToastContext();
    console.log('autoDelete', autoDelete, 'autoDeleteTime',autoDeleteTime)

	useEffect(() => {
		if (!autoDelete || !toastList?.length) return;
		const interval = setInterval(() => {
			setToastList((prev) => {
                console.log('changed', prev.slice(1));
                return prev.slice(1)
        });
		}, autoDeleteTime);
		return () => clearInterval(interval);
	}, [autoDelete, autoDeleteTime, setToastList, toastList?.length]);

    const deleteToast = (index) => {
        setToastList((prev) => prev.filter((_, indx) => index !== indx));
    }

    console.log('toastList',toastList);
    return {toastList, addToToastList, deleteToast}
}