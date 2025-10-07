import { View } from 'react-native';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Text } from './text';

export interface EmptyStateProps extends React.ComponentPropsWithoutRef<typeof View> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

const EmptyState = forwardRef<View, EmptyStateProps>(
  ({ className, icon, title, description, action, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn(
          'flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed',
          className
        )}
        {...props}>
        <View className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
          {icon && <View className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            {icon}
          </View>}
          <View className="space-y-2">
            <Text variant="heading" className="mt-6 text-xl font-semibold">
              {title}
            </Text>
            {description && (
              <Text variant="caption" className="text-sm text-muted-foreground">
                {description}
              </Text>
            )}
          </View>
          {action && <View className="mt-6">{action}</View>}
        </View>
      </View>
    );
  }
);

EmptyState.displayName = 'EmptyState';

export { EmptyState };