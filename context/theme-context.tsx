"use client"

import type React from "react"

import * as SecureStore from "expo-secure-store"
import { createContext, useContext, useEffect, useState } from "react"
import { useColorScheme } from "react-native"

type Theme = "light" | "dark" | "system"

interface ThemeColors {
  background: string
  cardBackground: string
  text: string
  textSecondary: string
  primary: string
  secondary: string
  border: string
  inputBackground: string
  error: string
  success: string
}

interface ThemeContextType {
  theme: Theme
  colors: ThemeColors
  setTheme: (theme: Theme) => void
}

const lightColors: ThemeColors = {
  background: "#ffffff",
  cardBackground: "#ffffff",
  text: "#0f172a",
  textSecondary: "#64748b",
  primary: "#2563eb",
  secondary: "#f1f5f9",
  border: "#e2e8f0",
  inputBackground: "#f8fafc",
  error: "#ef4444",
  success: "#22c55e",
}

const darkColors: ThemeColors = {
  background: "#0f172a",
  cardBackground: "#1e293b",
  text: "#f8fafc",
  textSecondary: "#94a3b8",
  primary: "#3b82f6",
  secondary: "#1e293b",
  border: "#334155",
  inputBackground: "#1e293b",
  error: "#ef4444",
  success: "#22c55e",
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({
  children,
  defaultTheme = "system",
}: {
  children: React.ReactNode
  defaultTheme?: Theme
}): React.ReactNode {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const colorScheme = useColorScheme()

  const isDark = theme === "dark" || (theme === "system" && colorScheme === "dark")
  const colors = isDark ? darkColors : lightColors

  useEffect(() => {
    loadThemeFromStorage()
  }, [])

  useEffect(() => {
    persistTheme(theme)
  }, [theme])

  const loadThemeFromStorage = async () => {
    try {
      const storedTheme = await SecureStore.getItemAsync("app_theme")
      if (storedTheme) {
        setTheme(storedTheme as Theme)
      }
    } catch (error) {
      console.error("Error loading theme from storage:", error)
    }
  }

  const persistTheme = async (newTheme: Theme) => {
    try {
      await SecureStore.setItemAsync("app_theme", newTheme)
    } catch (error) {
      console.error("Error saving theme to storage:", error)
    }
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colors,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}