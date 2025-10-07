import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { THEME } from '@/lib/theme';

export default function OrdersLayout() {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme ?? 'light';

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: THEME[theme].background,
        },
        headerTintColor: THEME[theme].foreground,
      }}>
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Order Details',
        }}
      />
    </Stack>
  );
}