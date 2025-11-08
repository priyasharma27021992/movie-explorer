import { useEffect } from "react";
import { useToastContext } from "./useToastContext";
import { ToastInterface } from "@/components/ui/Toast/types";

interface useToastProps {
    autoDelete?: boolean,
    autoDeleteTime?: number
}

export const useToast = ({ autoDelete = false, autoDeleteTime = 2000}: useToastProps) => {
    const { toastList, addToToastList, setToastList} = useToastContext();
    console.log('autoDelete', autoDelete, 'autoDeleteTime',autoDeleteTime)

	useEffect(() => {
		if (!autoDelete || !toastList?.length) return;
		const interval = setInterval(() => {
			setToastList((prev) => prev.slice(1));
		}, autoDeleteTime);
		return () => clearInterval(interval);
	}, [autoDelete, autoDeleteTime]);

    const deleteToast = (index) => {
        setToastList((prev) => prev.filter((_, indx) => index !== indx));
    }

    return {toastList, addToToastList, deleteToast}
}