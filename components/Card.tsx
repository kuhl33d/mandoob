"use client"

import type React from "react"

import { View, StyleSheet } from "react-native"
import { useTheme } from "@/context/theme-context"

interface CardProps {
  children: React.ReactNode
  style?: any
}

export function Card({ children, style }: CardProps) {
  const { colors } = useTheme()

  const styles = StyleSheet.create({
    card: {
      borderRadius: 8,
      backgroundColor: colors.cardBackground,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
      overflow: "hidden",
    },
  })

  return <View style={[styles.card, style]}>{children}</View>
}
