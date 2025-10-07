import { ActivityIndicator, View, Text } from "react-native"

interface LoaderProps {
  size?: "small" | "large"
  text?: string
}

export function Loader({ size = "small", text }: LoaderProps) {
  return (
    <View className="items-center">
      <ActivityIndicator size={size} color="#2563eb" />
      {text && <Text className="text-muted-foreground mt-2">{text}</Text>}
    </View>
  )
}
