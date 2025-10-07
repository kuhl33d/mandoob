import { View } from 'react-native';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Text } from './text';

export interface AlertProps {
  variant?: 'default' | 'destructive' | 'warning' | 'success';
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

const Alert = forwardRef<View, AlertProps>(
  (
    { className, variant = 'default', title, description, icon, ...props },
    ref
  ) => {
    return (
      <View
        ref={ref}
        role="alert"
        className={cn(
          'relative w-full rounded-lg border p-4',
          variant === 'default' && 'bg-background text-foreground',
          variant === 'destructive' &&
            'border-destructive/50 text-destructive dark:border-destructive',
          variant === 'warning' && 'border-warning/50 text-warning dark:border-warning',
          variant === 'success' && 'border-success/50 text-success dark:border-success',
          className
        )}
        {...props}>
        {icon && <View className="absolute left-4 top-4">{icon}</View>}
        <View className={cn('space-y-1', icon && 'pl-7')}>
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
      </View>
    );
  }
);

Alert.displayName = 'Alert';

export { Alert };
