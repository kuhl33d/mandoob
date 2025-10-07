import { View, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Text } from '@/components/ui/text';

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams();

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        <Text className="text-2xl font-bold mb-4">Order #{id}</Text>
        
        <View className="bg-card p-4 rounded-lg mb-4">
          <Text className="text-lg font-semibold mb-2">Order Details</Text>
          <Text className="text-muted-foreground">Status: Processing</Text>
          <Text className="text-muted-foreground">Date: {new Date().toLocaleDateString()}</Text>
        </View>

        <View className="bg-card p-4 rounded-lg">
          <Text className="text-lg font-semibold mb-2">Items</Text>
          <View className="gap-2">
            <Text className="text-muted-foreground">• Sample Item 1</Text>
            <Text className="text-muted-foreground">• Sample Item 2</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}