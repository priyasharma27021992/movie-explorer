'use client';

import { ToastType } from '@/components/ui/Toast/types';
import { createContext, useState } from 'react';

export const ToastsContext = createContext([]);

export const ToastsProvider = ({ children }) => {
	const [list, setList] = useState<Array<ToastType>>([]);

	const setToastList = (toastData: ToastType) => {
		setList((prev) => [...prev, toastData]);
	};

	return (
		<ToastsContext value={{ list, setToastList }}>{children}</ToastsContext>
	);
};
