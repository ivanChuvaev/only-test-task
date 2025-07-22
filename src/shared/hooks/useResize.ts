import { useEffect } from 'react'

export default function useResize(callback: () => void): void {
  useEffect(() => {
    callback()
    window.addEventListener('resize', callback)
    return () => window.removeEventListener('resize', callback)
  }, [])
}
