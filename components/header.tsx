"use client"

import { View, Text, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"
import { ChevronLeft, Bell } from "lucide-react-native"

interface HeaderProps {
  title: string
  showBack?: boolean
  showNotification?: boolean
  onNotificationPress?: () => void
}

export function Header({ title, showBack = false, showNotification = true, onNotificationPress }: HeaderProps) {
  const router = useRouter()

  return (
    <View className="flex-row items-center justify-between px-4 py-3 border-b border-border">
      <View className="flex-row items-center">
        {showBack && (
          <TouchableOpacity onPress={() => router.back()} className="mr-2">
            <ChevronLeft size={24} className="text-foreground" />
          </TouchableOpacity>
        )}
        <Text className="text-xl font-semibold text-foreground">{title}</Text>
      </View>

      {showNotification && (
        <TouchableOpacity
          onPress={onNotificationPress}
          className="w-10 h-10 rounded-full items-center justify-center bg-background"
        >
          <Bell size={20} className="text-foreground" />
        </TouchableOpacity>
      )}
    </View>
  )
}
