"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface AuthContextType {
  isLoggedIn: boolean
  userType: string
  userEmail: string
  userName: string
  userData: any
  login: (email: string, password: string, userType: string, userName?: string) => Promise<void>
  logout: () => void
  register: (data: any) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userType, setUserType] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser)
        setIsLoggedIn(true)
        setUserType(user.type)
        setUserEmail(user.email)
        setUserName(user.userName || user.email.split("@")[0])
        setUserData(user)
      } catch (error) {
        console.error("[v0] Failed to parse stored user:", error)
      }
    }
  }, [])

  const login = async (email: string, password: string, type: string, userName?: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const displayName = userName || email.split("@")[0]
    const user = {
      email,
      type,
      userName: displayName,
    }
    setIsLoggedIn(true)
    setUserType(type)
    setUserEmail(email)
    setUserName(displayName)
    setUserData(user)
    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("username", displayName)
  }

  const logout = () => {
    setIsLoggedIn(false)
    setUserType("")
    setUserEmail("")
    setUserName("")
    setUserData(null)
    localStorage.removeItem("user")
    localStorage.removeItem("username")
  }

  const register = async (data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    const displayName = data.fullName || data.name || data.email.split("@")[0]
    const user = {
      email: data.email,
      type: "donor",
      userName: displayName,
      ...data,
    }
    setIsLoggedIn(true)
    setUserType("donor")
    setUserEmail(data.email)
    setUserName(displayName)
    setUserData(user)
    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("username", displayName)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, userType, userEmail, userName, userData, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
