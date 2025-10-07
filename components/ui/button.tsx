import type React from "react"
import { TouchableOpacity, Text, ActivityIndicator, type TouchableOpacityProps, View } from "react-native"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utils/cn"

const buttonVariants = cva("flex-row items-center justify-center rounded-md", {
  variants: {
    variant: {
      default: "bg-primary",
      destructive: "bg-destructive",
      outline: "border border-border bg-background",
      secondary: "bg-secondary",
      ghost: "bg-transparent",
      link: "bg-transparent underline-offset-4",
    },
    size: {
      default: "h-12 px-4 py-2",
      sm: "h-9 px-3",
      lg: "h-14 px-8",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

const buttonTextVariants = cva("font-medium text-center", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      destructive: "text-destructive-foreground",
      outline: "text-foreground",
      secondary: "text-secondary-foreground",
      ghost: "text-foreground",
      link: "text-primary underline",
    },
    size: {
      default: "text-base",
      sm: "text-sm",
      lg: "text-lg",
      icon: "text-base",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

interface ButtonProps extends TouchableOpacityProps, VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  loadingText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export function Button({
  children,
  className,
  variant,
  size,
  isLoading,
  loadingText,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      className={cn(buttonVariants({ variant, size, className }), disabled || isLoading ? "opacity-50" : "")}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <View className="flex-row items-center">
          <ActivityIndicator
            size="small"
            color={variant === "outline" || variant === "ghost" || variant === "link" ? "#2563eb" : "#ffffff"}
            className="mr-2"
          />
          {loadingText && <Text className={cn(buttonTextVariants({ variant, size }))}>{loadingText}</Text>}
        </View>
      ) : (
        <>
          {leftIcon && <View className="mr-2">{leftIcon}</View>}
          {typeof children === "string" ? (
            <Text className={cn(buttonTextVariants({ variant, size }))}>{children}</Text>
          ) : (
            children
          )}
          {rightIcon && <View className="ml-2">{rightIcon}</View>}
        </>
      )}
    </TouchableOpacity>
  )
}
