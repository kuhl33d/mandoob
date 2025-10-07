import type React from "react"
import { View, Text, TextInput, type TextInputProps } from "react-native"
import { cn } from "@/utils/cn"
import { forwardRef } from "react"

interface InputProps extends TextInputProps {
  label?: string
  error?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ label, error, leftIcon, rightIcon, className, ...props }, ref) => {
    return (
      <View className="mb-1">
        {label && <Text className="text-foreground font-medium mb-1.5">{label}</Text>}
        <View className="relative">
          {leftIcon && <View className="absolute left-3 top-0 bottom-0 justify-center z-10">{leftIcon}</View>}
          <TextInput
            ref={ref}
            className={cn(
              "h-12 px-4 rounded-md bg-input text-foreground border border-input",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "border-destructive",
              className,
            )}
            placeholderTextColor="#9ca3af"
            {...props}
          />
          {rightIcon && <View className="absolute right-3 top-0 bottom-0 justify-center">{rightIcon}</View>}
        </View>
        {error && <Text className="text-destructive text-sm mt-1">{error}</Text>}
      </View>
    )
  },
)
