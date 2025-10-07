import { TextInput, TextInputProps, View } from 'react-native';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Text } from './text';

export interface TextareaProps extends TextInputProps {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<TextInput, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <View className="space-y-1.5">
        {label && (
          <Text variant="caption" className="text-foreground">
            {label}
          </Text>
        )}
        <TextInput
          ref={ref}
          multiline
          textAlignVertical="top"
          className={cn(
            'min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base text-foreground',
            error && 'border-destructive',
            className
          )}
          placeholderTextColor="#64748b"
          {...props}
        />
        {error && (
          <Text variant="caption" className="text-destructive">
            {error}
          </Text>
        )}
      </View>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
