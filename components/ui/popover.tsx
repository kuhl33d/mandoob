import { Modal, View, Pressable } from 'react-native';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface PopoverProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

const Popover = ({ open, onOpenChange, children }: PopoverProps) => {
  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => onOpenChange?.(false)}>
      {children}
    </Modal>
  );
};

const PopoverTrigger = forwardRef<View, React.ComponentPropsWithoutRef<typeof Pressable>>(
  ({ children, onPress, ...props }, ref) => (
    <Pressable
      ref={ref}
      onPress={(e) => {
        onPress?.(e);
      }}
      {...props}>
      {children}
    </Pressable>
  )
);

const PopoverContent = forwardRef<View, React.ComponentPropsWithoutRef<typeof View>>(
  ({ className, children, ...props }, ref) => {
    return (
      <View className="flex-1 justify-center items-center bg-transparent">
        <Pressable className="absolute inset-0" onPress={() => props.onClose?.()}>
          <View className="flex-1" />
        </Pressable>
        <View
          ref={ref}
          className={cn(
            'relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-4 text-popover-foreground shadow-md',
            className
          )}
          {...props}>
          {children}
        </View>
      </View>
    );
  }
);

Popover.displayName = 'Popover';
PopoverTrigger.displayName = 'PopoverTrigger';
PopoverContent.displayName = 'PopoverContent';

export { Popover, PopoverTrigger, PopoverContent };
