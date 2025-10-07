import type React from "react"
import { View, Text, Modal as RNModal, TouchableOpacity, Pressable } from "react-native"
import { X } from "lucide-react-native"

interface ModalProps {
  visible: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export function Modal({ visible, onClose, title, children }: ModalProps) {
  return (
    <RNModal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable className="flex-1 justify-center items-center bg-black/50 px-4" onPress={onClose}>
        <Pressable className="w-full max-w-md bg-card rounded-lg overflow-hidden" onPress={(e) => e.stopPropagation()}>
          {title && (
            <View className="flex-row items-center justify-between p-4 border-b border-border">
              <Text className="text-lg font-semibold text-foreground">{title}</Text>
              <TouchableOpacity onPress={onClose}>
                <X size={20} className="text-muted-foreground" />
              </TouchableOpacity>
            </View>
          )}
          {children}
        </Pressable>
      </Pressable>
    </RNModal>
  )
}
