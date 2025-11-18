import { useEffect } from 'react'
import { useToastContext } from './useToastContext'
import { ToastInterface } from '@/components/ui/Toast/types'

interface useToastProps {
    autoDelete?: boolean
    autoDeleteTime?: number
}

export const useToast = ({
    autoDelete = false,
    autoDeleteTime = 1000,
}: useToastProps) => {
    const { toastList, addToToastList, removeFromToastList } = useToastContext()

    useEffect(() => {
        if (!autoDelete || !toastList?.length) return
        const interval = setInterval(() => {
            removeFromToastList?.(toastList?.[0].id || -1)
        }, autoDeleteTime)
        return () => clearInterval(interval)
    }, [
        autoDelete,
        autoDeleteTime,
        removeFromToastList,
        toastList,
        toastList?.length,
    ])

    const deleteToast = (id: number) => {
        removeFromToastList?.(id)
    }

    return { toastList, addToToastList, deleteToast }
}
