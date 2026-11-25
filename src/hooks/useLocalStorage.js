import { useCallback, useEffect, useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key)
      return raw === null ? initialValue : JSON.parse(raw)
    } catch {
      return initialValue
    }
  })

  const update = useCallback(
    (next) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? next(prev) : next
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved))
        } catch {
          /* storage unavailable — keep in-memory state */
        }
        return resolved
      })
    },
    [key],
  )

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== key || e.newValue === null) return
      try {
        setValue(JSON.parse(e.newValue))
      } catch {
        /* ignore malformed cross-tab payloads */
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [key])

  return [value, update]
}