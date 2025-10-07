import { View, Pressable } from 'react-native';
import { usePathname, router } from 'expo-router';
import { Text } from './ui/text';
import { cn } from '@/lib/utils';

const routes = [
  {
    name: 'Orders',
    path: '/dashboard/orders',
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
  },
  {
    name: 'Pharmacies',
    path: '/dashboard/pharmacies',
  },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <View className="flex-row items-center justify-around bg-background border-t border-border h-16">
      {routes.map((route) => (
        <Pressable
          key={route.path}
          onPress={() => router.push(route.path)}
          className={cn(
            'flex-1 items-center justify-center h-full',
            pathname === route.path && 'border-t-2 border-primary'
          )}>
          <Text
            className={cn(
              'text-sm',
              pathname === route.path
                ? 'text-primary font-medium'
                : 'text-muted-foreground'
            )}>
            {route.name}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
