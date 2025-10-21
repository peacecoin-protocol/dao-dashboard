import { useEffect, useState } from 'react'

interface LocalStorageProps<T> {
  key: string
  defaultValue: T
}

export default function useLocalStorage<T>({
  key,
  defaultValue,
}: LocalStorageProps<T>) {
  const [value, setValue] = useState<T>(defaultValue)
  const [isClient, setIsClient] = useState(false)

  // Initialize from localStorage on client side
  useEffect(() => {
    setIsClient(true)
    try {
      const storedValue = localStorage.getItem(key)
      if (storedValue !== null) {
        setValue(JSON.parse(storedValue) as T)
      }
    } catch (error) {
      console.error('Error reading from localStorage:', error)
    }
  }, [key])

  // Save to localStorage when value changes
  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem(key, JSON.stringify(value))
      } catch (error) {
        console.error('Error saving to localStorage:', error)
      }
    }
  }, [value, key, isClient])

  return [value, setValue] as const
}
