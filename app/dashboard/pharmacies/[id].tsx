import { View, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Text } from '@/components/ui/text';

export default function PharmacyDetailScreen() {
  const { id } = useLocalSearchParams();

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        <Text className="text-2xl font-bold mb-4">Pharmacy #{id}</Text>
        
        <View className="bg-card p-4 rounded-lg mb-4">
          <Text className="text-lg font-semibold mb-2">Pharmacy Details</Text>
          <Text className="text-muted-foreground">Name: Sample Pharmacy</Text>
          <Text className="text-muted-foreground">Address: 123 Main St</Text>
          <Text className="text-muted-foreground">Phone: (555) 123-4567</Text>
        </View>

        <View className="bg-card p-4 rounded-lg">
          <Text className="text-lg font-semibold mb-2">Recent Orders</Text>
          <View className="gap-2">
            <Text className="text-muted-foreground">• Order #123</Text>
            <Text className="text-muted-foreground">• Order #124</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}