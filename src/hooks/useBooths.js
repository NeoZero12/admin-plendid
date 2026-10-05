import { useContext } from 'react'
import { BoothContext } from '../context/booth-context'

export function useBooths() {
  const context = useContext(BoothContext)
  if (!context) throw new Error('useBooths harus digunakan di dalam BoothProvider')
  return context
}
