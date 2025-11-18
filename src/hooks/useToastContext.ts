import { ToastsContext } from '@/providers/ToastsProvider'
import { useContext } from 'react'

export const useToastContext = () => {
    const context = useContext(ToastsContext)

    if (!context)
        throw new Error('useToasts must be used inside ToastsProvider')

    return context
}
