"use client"

import { Redirect } from "expo-router"
import { useAuth } from "@/context/auth-context"
import { Loader } from "@/components/Loader"
import { View } from "react-native"

export default function Index() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" }}>
        <Loader size="large" />
      </View>
    )
  }

  if (isAuthenticated) {
    return <Redirect href="/(tabs)/dashboard" />
  }

  return <Redirect href="/auth/login" />
}
