import { useContext } from 'react'
import { ToastContext } from '../context/toast-context'

export function useToast() {
  const showToast = useContext(ToastContext)
  if (!showToast) throw new Error('useToast harus digunakan di dalam ToastProvider')
  return showToast
}
