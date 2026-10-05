import { useCallback, useEffect, useRef, useState } from 'react'
import { Check } from 'lucide-react'
import { ToastContext } from './toast-context'

export function ToastProvider({ children }) {
  const [message, setMessage] = useState('')
  const timerRef = useRef(null)

  const showToast = useCallback((nextMessage) => {
    window.clearTimeout(timerRef.current)
    setMessage(nextMessage)
    timerRef.current = window.setTimeout(() => setMessage(''), 2800)
  }, [])

  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {message && <div className="toast-message" role="status"><span><Check size={15} /></span>{message}</div>}
    </ToastContext.Provider>
  )
}
