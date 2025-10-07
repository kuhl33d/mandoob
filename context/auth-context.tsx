"use client"

import type React from "react"

import { authService } from "@/api/services/auth-service"
import type { User } from "@/types"
import * as SecureStore from "expo-secure-store"
import { createContext, useContext, useEffect, useState } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  user: User | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (name: string, email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    loadUserFromStorage()
  }, [])

  const loadUserFromStorage = async () => {
    try {
      const token = await SecureStore.getItemAsync("auth_token")
      if (token) {
        const userData = await SecureStore.getItemAsync("user_data")
        if (userData) {
          setUser(JSON.parse(userData))
          setIsAuthenticated(true)
        }
      }
    } catch (error) {
      console.error("Error loading user from storage:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    const { token, user } = await authService.login(email, password)
    await SecureStore.setItemAsync("auth_token", token)
    await SecureStore.setItemAsync("user_data", JSON.stringify(user))
    setUser(user)
    setIsAuthenticated(true)
  }

  const signUp = async (name: string, email: string, password: string) => {
    const { token, user } = await authService.register(name, email, password)
    await SecureStore.setItemAsync("auth_token", token)
    await SecureStore.setItemAsync("user_data", JSON.stringify(user))
    setUser(user)
    setIsAuthenticated(true)
  }

  const signOut = async () => {
    await SecureStore.deleteItemAsync("auth_token")
    await SecureStore.deleteItemAsync("user_data")
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
