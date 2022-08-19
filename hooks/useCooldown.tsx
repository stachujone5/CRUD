import { useEffect, useRef, useState } from 'react'

export const useCooldown = (ms = 1500) => {
  const [isCooldown, setIsCooldown] = useState(false)

  const timeoutRef = useRef<NodeJS.Timeout>()

  const setCoolDown = () => {
    setIsCooldown(true)
    timeoutRef.current = setTimeout(() => setIsCooldown(false), ms)
  }

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  return [isCooldown, setCoolDown] as const
}
