export interface ToastInterface {
    title: string;
    description?: string;
    type: typeof TOAST_TYPE[keyof typeof TOAST_TYPE]
}

export const TOAST_TYPE = {
    INFO: 'info',
    ERROR: 'error',
    WARNING: 'warning',
    SUCCESS: 'success'
} as const;

export interface ToastProps {
    position: typeof ToastPosition[keyof typeof ToastPosition];
    autoDelete?: boolean;
    autoDeleteTime?: number;
}

export const ToastPosition = {
    TOP_RIGHT: 'top-0 right-0',
    TOP_LEFT: 'top-0 left-0',
    BOTTOM_RIGHT: 'bottom-0 right-0',
    BOTTOM_LEFT: 'bottom-0 left-0',
} as const;
