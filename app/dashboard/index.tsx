import { View, ScrollView, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Text } from '@/components/ui/text';

export default function DashboardScreen() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4 gap-4">
        <Link href="/dashboard/orders" asChild>
          <Pressable className="bg-card p-4 rounded-lg">
            <Text className="text-lg font-semibold">Orders</Text>
            <Text className="text-muted-foreground">Manage your orders</Text>
          </Pressable>
        </Link>

        <Link href="/dashboard/pharmacies" asChild>
          <Pressable className="bg-card p-4 rounded-lg">
            <Text className="text-lg font-semibold">Pharmacies</Text>
            <Text className="text-muted-foreground">Manage pharmacies</Text>
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  );
}