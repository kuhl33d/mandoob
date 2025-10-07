import { View, Pressable, Modal } from 'react-native';
import { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Text } from './text';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  label?: string;
  error?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
}

const Select = forwardRef<View, SelectProps>(
  ({ className, label, error, value, onValueChange, options, placeholder }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedOption = options.find((option) => option.value === value);

    return (
      <View ref={ref} className="space-y-1.5">
        {label && (
          <Text variant="caption" className="text-foreground">
            {label}
          </Text>
        )}
        <Pressable
          onPress={() => setIsOpen(true)}
          className={cn(
            'h-10 px-3 rounded-md border border-input bg-transparent justify-center',
            error && 'border-destructive',
            className
          )}>
          <Text
            className={cn(
              'text-base',
              selectedOption ? 'text-foreground' : 'text-muted-foreground'
            )}>
            {selectedOption?.label || placeholder || 'Select an option'}
          </Text>
        </Pressable>
        {error && (
          <Text variant="caption" className="text-destructive">
            {error}
          </Text>
        )}

        <Modal
          visible={isOpen}
          transparent
          animationType="slide"
          onRequestClose={() => setIsOpen(false)}>
          <Pressable
            className="flex-1 bg-black/20"
            onPress={() => setIsOpen(false)}
          />
          <View className="bg-background border-t border-border">
            {options.map((option) => (
              <Pressable
                key={option.value}
                onPress={() => {
                  onValueChange?.(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  'p-4 border-b border-border active:bg-muted',
                  option.value === value && 'bg-primary/10'
                )}>
                <Text
                  className={cn(
                    'text-base',
                    option.value === value
                      ? 'text-primary font-medium'
                      : 'text-foreground'
                  )}>
                  {option.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </Modal>
      </View>
    );
  }
);

Select.displayName = 'Select';

export { Select };
