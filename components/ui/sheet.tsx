import { Modal, View, Pressable, Animated } from 'react-native';
import { forwardRef, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Text } from './text';

export interface SheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: 'top' | 'bottom' | 'left' | 'right';
  children?: React.ReactNode;
}

const Sheet = ({ open, onOpenChange, side = 'bottom', children }: SheetProps) => {
  return (
    <Modal
      visible={open}
      transparent
      animationType="none"
      onRequestClose={() => onOpenChange?.(false)}>
      {children}
    </Modal>
  );
};

const SheetTrigger = forwardRef<View, React.ComponentPropsWithoutRef<typeof Pressable>>(
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

const SheetContent = forwardRef<View, React.ComponentPropsWithoutRef<typeof View> & { side?: 'top' | 'bottom' | 'left' | 'right' }>(
  ({ className, children, side = 'bottom', ...props }, ref) => {
    const translateValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.spring(translateValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }, []);

    const getTransform = () => {
      switch (side) {
        case 'top':
          return [{ translateY: translateValue.interpolate({
            inputRange: [0, 1],
            outputRange: [-300, 0]
          })}];
        case 'bottom':
          return [{ translateY: translateValue.interpolate({
            inputRange: [0, 1],
            outputRange: [300, 0]
          })}];
        case 'left':
          return [{ translateX: translateValue.interpolate({
            inputRange: [0, 1],
            outputRange: [-300, 0]
          })}];
        case 'right':
          return [{ translateX: translateValue.interpolate({
            inputRange: [0, 1],
            outputRange: [300, 0]
          })}];
      }
    };

    return (
      <View className="flex-1 justify-end bg-black/25">
        <Pressable className="absolute inset-0" onPress={() => props.onClose?.()}>
          <View className="flex-1" />
        </Pressable>
        <Animated.View
          style={{
            transform: getTransform(),
          }}
          className={cn(
            'bg-background',
            side === 'bottom' && 'h-[400px] rounded-t-[10px]',
            side === 'top' && 'h-[400px] rounded-b-[10px]',
            side === 'left' && 'w-[300px] h-full',
            side === 'right' && 'w-[300px] h-full ml-auto',
            className
          )}>
          <View ref={ref} className="p-4" {...props}>
            {children}
          </View>
        </Animated.View>
      </View>
    );
  }
);

const SheetHeader = forwardRef<View, React.ComponentPropsWithoutRef<typeof View>>(
  ({ className, ...props }, ref) => (
    <View
      ref={ref}
      className={cn('flex flex-col space-y-2', className)}
      {...props}
    />
  )
);

const SheetFooter = forwardRef<View, React.ComponentPropsWithoutRef<typeof View>>(
  ({ className, ...props }, ref) => (
    <View
      ref={ref}
      className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
      {...props}
    />
  )
);

const SheetTitle = forwardRef<Text, React.ComponentPropsWithoutRef<typeof Text>>(
  ({ className, ...props }, ref) => (
    <Text
      ref={ref}
      variant="heading"
      className={cn('text-lg font-semibold', className)}
      {...props}
    />
  )
);

const SheetDescription = forwardRef<Text, React.ComponentPropsWithoutRef<typeof Text>>(
  ({ className, ...props }, ref) => (
    <Text
      ref={ref}
      variant="caption"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
);

Sheet.displayName = 'Sheet';
SheetTrigger.displayName = 'SheetTrigger';
SheetContent.displayName = 'SheetContent';
SheetHeader.displayName = 'SheetHeader';
SheetFooter.displayName = 'SheetFooter';
SheetTitle.displayName = 'SheetTitle';
SheetDescription.displayName = 'SheetDescription';

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
