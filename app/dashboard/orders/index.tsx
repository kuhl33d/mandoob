import { View, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import { Text } from '@/components/ui/text';
import { useState } from 'react';

export default function OrdersScreen() {
  const [loading, setLoading] = useState(true);

  // Simulate loading state
  setTimeout(() => setLoading(false), 1000);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4 gap-4">
        {/* Sample order items */}
        {[1, 2, 3].map((id) => (
          <Link key={id} href={`/dashboard/orders/${id}`} asChild>
            <Pressable className="bg-card p-4 rounded-lg">
              <Text className="text-lg font-semibold">Order #{id}</Text>
              <Text className="text-muted-foreground">View order details</Text>
            </Pressable>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
}