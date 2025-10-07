"use client"

import type React from "react"

import { View, SafeAreaView, StatusBar, useColorScheme } from "react-native"
import { useTheme } from "@/context/theme-context"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { theme } = useTheme()
  const systemColorScheme = useColorScheme()

  const isDark = theme === "dark" || (theme === "system" && systemColorScheme === "dark")

  return (
    <SafeAreaView className={`flex-1 ${isDark ? "bg-background dark" : "bg-background"}`}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? "#1f2937" : "#ffffff"}
      />
      <View className="flex-1">{children}</View>
    </SafeAreaView>
  )
}
