import { View } from 'react-native';
import { Text } from './ui/text';
import { Button } from './ui/button';
import { useColorScheme } from 'nativewind';

export function DashboardHeader() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View className="flex-row items-center justify-between p-4 bg-background border-b border-border">
      <View>
        <Text variant="heading" className="text-foreground">
          Dashboard
        </Text>
        <Text variant="caption" className="mt-1">
          Welcome back to Mandoob
        </Text>
      </View>
      
      <Button
        variant="outline"
        onPress={toggleColorScheme}
        className="px-4">
        {colorScheme === 'dark' ? '🌞' : '🌙'}
      </Button>
    </View>
  );
}
