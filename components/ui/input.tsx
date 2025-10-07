import { TextInput, TextInputProps, View } from 'react-native';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Text } from './text';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<TextInput, InputProps>(
  ({ className, label, error, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <View className="space-y-1.5">
        {label && (
          <Text variant="caption" className="text-foreground">
            {label}
          </Text>
        )}
        <View
          className={cn(
            'flex-row items-center rounded-md border border-input bg-transparent',
            error && 'border-destructive',
            className
          )}>
          {leftIcon && (
            <View className="pl-3 justify-center">{leftIcon}</View>
          )}
          <TextInput
            ref={ref}
            className={cn(
              'flex-1 h-10 px-3 text-base text-foreground',
              leftIcon && 'pl-0',
              rightIcon && 'pr-0'
            )}
            placeholderTextColor="#64748b"
            {...props}
          />
          {rightIcon && (
            <View className="pr-3 justify-center">{rightIcon}</View>
          )}
        </View>
        {error && (
          <Text variant="caption" className="text-destructive">
            {error}
          </Text>
        )}
      </View>
    );
  }
);

Input.displayName = 'Input';

export { Input };
