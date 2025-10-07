import { View, ScrollView } from 'react-native';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Text } from './text';

const Table = forwardRef<View, React.ComponentPropsWithoutRef<typeof View>>(
  ({ className, ...props }, ref) => (
    <View className="w-full overflow-auto">
      <ScrollView horizontal>
        <View
          ref={ref}
          className={cn('w-full caption-bottom text-sm', className)}
          {...props}
        />
      </ScrollView>
    </View>
  )
);
Table.displayName = 'Table';

const TableHeader = forwardRef<View, React.ComponentPropsWithoutRef<typeof View>>(
  ({ className, ...props }, ref) => (
    <View
      ref={ref}
      className={cn('[&_tr]:border-b', className)}
      {...props}
    />
  )
);
TableHeader.displayName = 'TableHeader';

const TableBody = forwardRef<View, React.ComponentPropsWithoutRef<typeof View>>(
  ({ className, ...props }, ref) => (
    <View
      ref={ref}
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  )
);
TableBody.displayName = 'TableBody';

const TableFooter = forwardRef<View, React.ComponentPropsWithoutRef<typeof View>>(
  ({ className, ...props }, ref) => (
    <View
      ref={ref}
      className={cn('bg-muted/50 border-t font-medium [&>tr]:last:border-b-0', className)}
      {...props}
    />
  )
);
TableFooter.displayName = 'TableFooter';

const TableRow = forwardRef<View, React.ComponentPropsWithoutRef<typeof View>>(
  ({ className, ...props }, ref) => (
    <View
      ref={ref}
      className={cn(
        'flex flex-row border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
        className
      )}
      {...props}
    />
  )
);
TableRow.displayName = 'TableRow';

const TableHead = forwardRef<Text, React.ComponentPropsWithoutRef<typeof Text>>(
  ({ className, ...props }, ref) => (
    <Text
      ref={ref}
      variant="caption"
      className={cn(
        'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
        className
      )}
      {...props}
    />
  )
);
TableHead.displayName = 'TableHead';

const TableCell = forwardRef<Text, React.ComponentPropsWithoutRef<typeof Text>>(
  ({ className, ...props }, ref) => (
    <Text
      ref={ref}
      className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)}
      {...props}
    />
  )
);
TableCell.displayName = 'TableCell';

const TableCaption = forwardRef<Text, React.ComponentPropsWithoutRef<typeof Text>>(
  ({ className, ...props }, ref) => (
    <Text
      ref={ref}
      variant="caption"
      className={cn('mt-4 text-sm text-muted-foreground', className)}
      {...props}
    />
  )
);
TableCaption.displayName = 'TableCaption';

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
