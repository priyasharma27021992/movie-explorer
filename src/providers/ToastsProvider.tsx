'use client';

import { ToastInterface } from '@/components/ui/Toast/types';
import { createContext, ReactNode, useState } from 'react';

interface ToastContextType {
	toastList?: Array<ToastInterface>;
	addToToastList: (toastData: ToastInterface) => void;
	setToastList: (toastList: Array<ToastInterface>) => void;
}

export const ToastsContext = createContext<ToastContextType>({});

export const ToastsProvider = ({ children }: { children: ReactNode }) => {
	const [toastList, setToastList] = useState<Array<ToastInterface>>([]);

	const addToToastList = (toastData: ToastInterface) => {
		setToastList((prev) => [
			...prev,
			{
				...toastData,
				id: prev.length + 1,
			},
		]);
	};

	return (
		<ToastsContext value={{ toastList, addToToastList, setToastList }}>
			{children}
		</ToastsContext>
	);
};
