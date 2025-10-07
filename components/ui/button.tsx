import { Pressable, type PressableProps } from 'react-native';
import { Text } from './text';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export interface ButtonProps extends PressableProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children?: React.ReactNode;
}

const Button = forwardRef<Pressable, ButtonProps>(
  ({ className, variant = 'default', size = 'default', children, ...props }, ref) => {
    return (
      <Pressable
        ref={ref}
        className={cn(
          'items-center justify-center rounded-md',
          // Variants
          variant === 'default' && 'bg-primary',
          variant === 'destructive' && 'bg-destructive',
          variant === 'outline' && 'border border-input bg-background',
          variant === 'secondary' && 'bg-secondary',
          variant === 'ghost' && 'hover:bg-accent',
          variant === 'link' && 'underline-offset-4',
          // Sizes
          size === 'default' && 'h-10 px-4 py-2',
          size === 'sm' && 'h-9 px-3',
          size === 'lg' && 'h-11 px-8',
          size === 'icon' && 'h-10 w-10',
          className
        )}
        {...props}>
        {typeof children === 'string' ? (
          <Text
            className={cn(
              'font-medium',
              variant === 'default' && 'text-primary-foreground',
              variant === 'destructive' && 'text-destructive-foreground',
              variant === 'outline' && 'text-foreground',
              variant === 'secondary' && 'text-secondary-foreground',
              variant === 'ghost' && 'text-foreground',
              variant === 'link' && 'text-primary underline'
            )}>
            {children}
          </Text>
        ) : (
          children
        )}
      </Pressable>
    );
  }
);

Button.displayName = 'Button';

export { Button };
