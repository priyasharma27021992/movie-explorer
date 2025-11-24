'use client';

import { cn } from '@/utils/common';
import React from 'react';
import { TOAST_TYPE, ToastPosition, ToastProps, ToastInterface } from './types';
import { useToast } from '@/hooks/useToast';

const Toast = (props: ToastProps) => {
    const {
        autoDelete,
        autoDeleteTime,
        position = ToastPosition.TOP_RIGHT,
    } = props;
    const { deleteToast, toastList } = useToast({ autoDelete, autoDeleteTime });

    if (!toastList?.length) return null;

    return (
        <div className={cn('absolute z-20 flex flex-col gap-2', position)}>
            {toastList?.map((toastItem: ToastInterface, index) => (
                <div
                    key={toastItem.title}
                    className={cn(
                        'w-[300px] h-[100px] p-2 border-2 border-gray-400 shadow-lg rounded-lg',
                        toastItem.type === TOAST_TYPE.INFO && 'bg-sky-400',
                        toastItem.type === TOAST_TYPE.ERROR && 'bg-red-400',
                        toastItem.type === TOAST_TYPE.SUCCESS && 'bg-green-400',
                        toastItem.type === TOAST_TYPE.WARNING &&
                            'bg-amber-300 ',
                    )}
                >
                    <button
                        className="cursor-pointer"
                        onClick={() => deleteToast(toastItem?.id || -1)}
                        disabled={!toastItem?.id}
                    >
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
