"use client"

import type React from "react"

import { View, Text, Modal as RNModal, TouchableOpacity, Pressable, StyleSheet } from "react-native"
import { X } from "lucide-react-native"
import { useTheme } from "@/context/theme-context"

interface ModalProps {
  visible: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export function Modal({ visible, onClose, title, children }: ModalProps) {
  const { colors } = useTheme()

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      padding: 16,
    },
    container: {
      width: "100%",
      maxWidth: 400,
      backgroundColor: colors.cardBackground,
      borderRadius: 8,
      overflow: "hidden",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    title: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text,
    },
    closeButton: {
      padding: 4,
    },
  })

  return (
    <RNModal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.container} onPress={(e) => e.stopPropagation()}>
          {title && (
            <View style={styles.header}>
              <Text style={styles.title}>{title}</Text>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <X size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
          )}
          {children}
        </Pressable>
      </Pressable>
    </RNModal>
  )
}
