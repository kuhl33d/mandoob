import { Modal, View, Pressable } from 'react-native';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Text } from './text';

export interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
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

const DialogTrigger = forwardRef<View, React.ComponentPropsWithoutRef<typeof Pressable>>(
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

const DialogOverlay = forwardRef<View, React.ComponentPropsWithoutRef<typeof View>>(
  ({ className, ...props }, ref) => (
    <View
      ref={ref}
      className={cn(
        'fixed inset-0 z-50 bg-black/80',
        className
      )}
      {...props}
    />
  )
);

const DialogContent = forwardRef<View, React.ComponentPropsWithoutRef<typeof View>>(
  ({ className, children, ...props }, ref) => (
    <View className="flex-1 justify-center items-center bg-black/25">
      <Pressable className="absolute inset-0" onPress={() => props.onClose?.()}>
        <View className="flex-1" />
      </Pressable>
      <View
        ref={ref}
        className={cn(
          'relative z-50 w-[90%] max-w-lg rounded-lg bg-background p-4 shadow-lg',
          className
        )}
        {...props}>
        {children}
      </View>
    </View>
  )
);

const DialogHeader = forwardRef<View, React.ComponentPropsWithoutRef<typeof View>>(
  ({ className, ...props }, ref) => (
    <View
      ref={ref}
      className={cn('flex flex-col space-y-1.5 text-center', className)}
      {...props}
    />
  )
);

const DialogFooter = forwardRef<View, React.ComponentPropsWithoutRef<typeof View>>(
  ({ className, ...props }, ref) => (
    <View
      ref={ref}
      className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
      {...props}
    />
  )
);

const DialogTitle = forwardRef<Text, React.ComponentPropsWithoutRef<typeof Text>>(
  ({ className, ...props }, ref) => (
    <Text
      ref={ref}
      variant="heading"
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
);

const DialogDescription = forwardRef<Text, React.ComponentPropsWithoutRef<typeof Text>>(
  ({ className, ...props }, ref) => (
    <Text
      ref={ref}
      variant="caption"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
);

Dialog.displayName = 'Dialog';
DialogTrigger.displayName = 'DialogTrigger';
DialogOverlay.displayName = 'DialogOverlay';
DialogContent.displayName = 'DialogContent';
DialogHeader.displayName = 'DialogHeader';
DialogFooter.displayName = 'DialogFooter';
DialogTitle.displayName = 'DialogTitle';
DialogDescription.displayName = 'DialogDescription';

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
