"use client"

import { ActivityIndicator, View, Text, StyleSheet } from "react-native"
import { useTheme } from "@/context/theme-context"

interface LoaderProps {
  size?: "small" | "large"
  text?: string
}

export function Loader({ size = "small", text }: LoaderProps) {
  const { colors } = useTheme()

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
    },
    text: {
      color: colors.textSecondary,
      marginTop: 8,
    },
  })

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={colors.primary} />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  )
}
