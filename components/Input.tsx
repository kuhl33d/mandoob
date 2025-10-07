"use client"

import type React from "react"

import { View, Text, TextInput, StyleSheet } from "react-native"
import { useTheme } from "@/context/theme-context"

interface InputProps {
  label?: string
  error?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  style?: any
  [x: string]: any
}

export function Input({ label, error, leftIcon, rightIcon, style, ...props }: InputProps) {
  const { colors } = useTheme()

  const styles = StyleSheet.create({
    container: {
      marginBottom: 4,
    },
    label: {
      color: colors.text,
      fontWeight: "500",
      marginBottom: 6,
    },
    inputContainer: {
      position: "relative",
    },
    input: {
      height: 48,
      paddingHorizontal: 16,
      borderRadius: 8,
      backgroundColor: colors.inputBackground,
      color: colors.text,
      borderWidth: 1,
      borderColor: error ? colors.error : colors.border,
      paddingLeft: leftIcon ? 40 : 16,
      paddingRight: rightIcon ? 40 : 16,
    },
    leftIconContainer: {
      position: "absolute",
      left: 12,
      top: 0,
      bottom: 0,
      justifyContent: "center",
      zIndex: 10,
    },
    rightIconContainer: {
      position: "absolute",
      right: 12,
      top: 0,
      bottom: 0,
      justifyContent: "center",
    },
    error: {
      color: colors.error,
      fontSize: 14,
      marginTop: 4,
    },
  })

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}
        <TextInput style={styles.input} placeholderTextColor={colors.textSecondary} {...props} />
        {rightIcon && <View style={styles.rightIconContainer}>{rightIcon}</View>}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}
