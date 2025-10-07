"use client"

import type React from "react"

import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, View } from "react-native"
import { useTheme } from "@/context/theme-context"

interface ButtonProps {
  title?: string
  onPress?: () => void
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  isLoading?: boolean
  loadingText?: string
  icon?: React.ReactNode
  style?: any
  disabled?: boolean
  children?: React.ReactNode
}

export function Button({
  title,
  onPress,
  variant = "default",
  size = "default",
  isLoading,
  loadingText,
  icon,
  style,
  disabled,
  children,
}: ButtonProps) {
  const { colors } = useTheme()

  const getBackgroundColor = () => {
    switch (variant) {
      case "default":
        return colors.primary
      case "destructive":
        return colors.error
      case "outline":
      case "ghost":
        return "transparent"
      case "secondary":
        return colors.secondary
      default:
        return colors.primary
    }
  }

  const getTextColor = () => {
    switch (variant) {
      case "default":
      case "destructive":
        return "#ffffff"
      case "outline":
      case "ghost":
      case "secondary":
        return colors.text
      default:
        return "#ffffff"
    }
  }

  const getBorderColor = () => {
    switch (variant) {
      case "outline":
        return colors.border
      default:
        return "transparent"
    }
  }

  const getHeight = () => {
    switch (size) {
      case "sm":
        return 36
      case "lg":
        return 56
      case "icon":
        return 40
      default:
        return 48
    }
  }

  const styles = StyleSheet.create({
    button: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
      backgroundColor: getBackgroundColor(),
      height: getHeight(),
      paddingHorizontal: size === "icon" ? 0 : 16,
      borderWidth: variant === "outline" ? 1 : 0,
      borderColor: getBorderColor(),
      width: size === "icon" ? getHeight() : undefined,
      opacity: disabled || isLoading ? 0.5 : 1,
    },
    text: {
      color: getTextColor(),
      fontWeight: "500",
      fontSize: size === "sm" ? 14 : 16,
      textAlign: "center",
    },
    loadingContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
  })

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.7}
    >
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="small"
            color={variant === "outline" || variant === "ghost" ? colors.primary : "#ffffff"}
            style={{ marginRight: loadingText ? 8 : 0 }}
          />
          {loadingText && <Text style={styles.text}>{loadingText}</Text>}
        </View>
      ) : (
        <>
          {icon}
          {title && <Text style={styles.text}>{title}</Text>}
          {children}
        </>
      )}
    </TouchableOpacity>
  )
}
