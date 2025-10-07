import { View, Animated, Pressable } from 'react-native';
import { forwardRef, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Text } from './text';

export interface ToastProps {
  variant?: 'default' | 'destructive' | 'success';
  title?: string;
  description?: string;
  action?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  duration?: number;
  className?: string;
}

const Toast = forwardRef<View, ToastProps>(
  (
    {
      className,
      variant = 'default',
      title,
      description,
      action,
      open,
      onOpenChange,
      duration = 3000,
      ...props
    },
    ref
  ) => {
    const translateY = useRef(new Animated.Value(100)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      if (open) {
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();

        const timer = setTimeout(() => {
          onOpenChange?.(false);
        }, duration);

        return () => clearTimeout(timer);
      } else {
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: 100,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
      }
    }, [open, duration, onOpenChange]);

    if (!open) return null;

    return (
      <Animated.View
        style={{
          transform: [{ translateY }],
          opacity,
          position: 'absolute',
          bottom: 16,
          left: 16,
          right: 16,
        }}>
        <View
          ref={ref}
          className={cn(
            'w-full rounded-lg border bg-background p-4 shadow-lg',
            variant === 'destructive' &&
              'border-destructive bg-destructive text-destructive-foreground',
            variant === 'success' && 'border-success bg-success text-success-foreground',
            className
          )}
          {...props}>
          <View className="flex-row items-start justify-between gap-4">
            <View className="flex-1 space-y-1">
              {title && (
                <Text className="font-medium leading-none tracking-tight">
                  {title}
                </Text>
              )}
              {description && (
                <Text variant="caption" className="leading-none">
                  {description}
                </Text>
              )}
            </View>
            {action && (
              <Pressable onPress={() => onOpenChange?.(false)}>
                {action}
              </Pressable>
            )}
          </View>
        </View>
      </Animated.View>
    );
  }
);

Toast.displayName = 'Toast';

export { Toast };
