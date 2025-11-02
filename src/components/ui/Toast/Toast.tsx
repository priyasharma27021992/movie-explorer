'use client';

import { cn } from '@/utils/common';
import React, { useEffect, useState } from 'react';

const Toast = (props) => {
	const {
		toastList,
		position = 'top-0 right-0',
		autoDelete = false,
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

	const deleteToast = (id) => {
		setList((prev) => prev.filter((ele) => ele.id !== id));
	};
	return (
		<div className={cn('absolute z-20 flex flex-col gap-2', position)}>
			{list?.map((toastItem) => (
				<div
					key={toastItem.id}
					className='w-[300px] h-[100px] bg-amber-300 p-2 border-2 border-gray-400 shadow-lg rounded-lg'>
					<button
						className=''
						onClick={() => deleteToast(toastItem.id)}>
						X
					</button>
					<div>
						<p>{toastItem.title}</p>
						<p>{toastItem.description}</p>
					</div>
				</div>
			))}
		</div>
	);
};

export { Toast };
