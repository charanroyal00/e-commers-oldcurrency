import React, { createContext, useContext, useState, useEffect } from 'react'
import { authService, type User } from '../services'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already authenticated on app load
    const token = localStorage.getItem('access_token')
    if (token) {
      // You could decode JWT or call user info API here
      // For now, we'll just set a basic authenticated state
      setUser({
        id: 1,
        username: 'admin',
        email: 'admin@example.com',
        role: 'admin'
      })
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    await authService.login({ email, password })

    // Set user state after successful login
    // JWT decoding or a /api/me/ call can fill in real role/id later
    const userData: User = {
      id: 1,
      username: email,
      email: email,
      role: 'admin'
    }

    setUser(userData)
  }

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}