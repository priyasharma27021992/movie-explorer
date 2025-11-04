'use client';

import { cn } from '@/utils/common';
import React, { useEffect, useState } from 'react';
import { TOAST_TYPE, ToastPosition, ToastProps } from './types';

const Toast = (props: ToastProps) => {
	const {
		toastList,
		position = ToastPosition.TOP_RIGHT,
		autoDelete = true,
		autoDeleteTime = 10000,
	} = props;
	const [list, setList] = useState(toastList);

	useEffect(() => {
		setList(toastList);
	}, [toastList]);

	useEffect(() => {
		if (!autoDelete) return;
		const interval = setInterval(() => {
			setList((prev) => prev.slice(1));
		}, autoDeleteTime);
		return () => clearInterval(interval);
	}, [autoDelete, autoDeleteTime]);

	const deleteToast = (id: string) => {
		setList((prev) => prev.filter((ele) => ele.id !== id));
	};

	return (
		<div className={cn('absolute z-20 flex flex-col gap-2', position)}>
			{list?.map((toastItem) => (
				<div
					key={toastItem.id}
					className={cn(
						'w-[300px] h-[100px] p-2 border-2 border-gray-400 shadow-lg rounded-lg',
						toastItem.type === TOAST_TYPE.INFO && 'bg-sky-400',
						toastItem.type === TOAST_TYPE.ERROR && 'bg-red-400',
						toastItem.type === TOAST_TYPE.SUCCESS && 'bg-green-400',
						toastItem.type === TOAST_TYPE.WARNING && 'bg-amber-300 '
					)}>
					<button
						className='cursor-pointer'
						onClick={() => deleteToast(toastItem.id)}>
						X
					</button>
					<div>
						<p>{toastItem?.title}</p>
						<p>{toastItem?.description}</p>
					</div>
				</div>
			))}
		</div>
	);
};

export { Toast };
