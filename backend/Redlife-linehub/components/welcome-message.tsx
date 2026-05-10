'use client'

import { useEffect, useState } from 'react'

export function WelcomeMessage() {
  const [username, setUsername] = useState<string>('Guest')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const storedUsername = localStorage.getItem('username')
    if (storedUsername) {
      setUsername(storedUsername)
    }
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return null
  }

  return (
    <span className="text-sm text-muted-foreground">
      Welcome, {username}
    </span>
  )
}
