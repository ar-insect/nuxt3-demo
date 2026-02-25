export interface ToastOptions {
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

export interface ToastState extends ToastOptions {
  id: string
  visible: boolean
}

export const useToast = () => {
  const toasts = useState<ToastState[]>('toasts', () => [])

  const show = (options: ToastOptions | string) => {
    const opts = typeof options === 'string' ? { message: options } : options
    // Generate a unique ID
    const id = Date.now().toString(36) + Math.random().toString(36).substring(2)
    
    const toast: ToastState = {
      id,
      visible: true,
      type: opts.type || 'info',
      duration: opts.duration ?? 3000,
      message: opts.message
    }

    toasts.value.push(toast)

    if (toast.duration! > 0) {
      setTimeout(() => {
        remove(id)
      }, toast.duration)
    }
    
    return id
  }

  const remove = (id: string) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }
  
  const clear = () => {
    toasts.value = []
  }

  const success = (message: string, duration?: number) => show({ message, type: 'success', duration })
  const error = (message: string, duration?: number) => show({ message, type: 'error', duration })
  const warning = (message: string, duration?: number) => show({ message, type: 'warning', duration })
  const info = (message: string, duration?: number) => show({ message, type: 'info', duration })

  return {
    toasts,
    show,
    remove,
    clear,
    success,
    error,
    warning,
    info
  }
}
