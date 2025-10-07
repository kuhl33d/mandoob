import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { THEME } from '@/lib/theme';

export default function DashboardLayout() {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme ?? 'light';

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: THEME[theme].background,
        },
        headerTintColor: THEME[theme].foreground,
        headerShadowVisible: true,
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Dashboard',
        }}
      />
      <Stack.Screen
        name="orders/index"
        options={{
          title: 'Orders',
        }}
      />
      <Stack.Screen
        name="pharmacies/index"
        options={{
          title: 'Pharmacies',
        }}
      />
    </Stack>
  );
}