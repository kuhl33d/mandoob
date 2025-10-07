import { ActivityIndicator, View } from 'react-native';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Text } from './text';

export interface SpinnerProps {
  size?: 'small' | 'large';
  label?: string;
  className?: string;
}

const Spinner = forwardRef<View, SpinnerProps>(
  ({ className, size = 'small', label, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn('flex items-center justify-center', className)}
        {...props}>
        <ActivityIndicator
          size={size}
          className="text-primary"
        />
        {label && (
          <Text variant="caption" className="mt-2 text-muted-foreground">
            {label}
          </Text>
        )}
      </View>
    );
  }
);

Spinner.displayName = 'Spinner';

export { Spinner };
