import { View } from 'react-native';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface SeparatorProps extends React.ComponentPropsWithoutRef<typeof View> {
  orientation?: 'horizontal' | 'vertical';
}

const Separator = forwardRef<View, SeparatorProps>(
  ({ className, orientation = 'horizontal', ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn(
          'shrink-0 bg-border',
          orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
          className
        )}
        {...props}
      />
    );
  }
);

Separator.displayName = 'Separator';

export { Separator };
