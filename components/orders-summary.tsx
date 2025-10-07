import { View, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Text } from './ui/text';

interface OrderSummaryProps {
  orders: {
    id: string;
    pharmacyName: string;
    status: 'pending' | 'in_progress' | 'completed';
    items: number;
    total: string;
    date: string;
  }[];
}

export function OrdersSummary({ orders }: OrderSummaryProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-orange-500';
      case 'in_progress':
        return 'text-blue-500';
      case 'completed':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <ScrollView className="flex-1">
      <View className="space-y-4 p-4">
        {orders.map((order) => (
          <Pressable
            key={order.id}
            onPress={() => router.push(`/dashboard/orders/${order.id}`)}
            className="bg-card border border-border rounded-lg p-4 space-y-2">
            <View className="flex-row justify-between items-center">
              <Text variant="subheading">{order.pharmacyName}</Text>
              <Text className={getStatusColor(order.status)}>
                {order.status.replace('_', ' ')}
              </Text>
            </View>

            <View className="flex-row justify-between items-center">
              <Text variant="caption">
                {order.items} {order.items === 1 ? 'item' : 'items'}
              </Text>
              <Text variant="caption">{order.date}</Text>
            </View>

            <View className="flex-row justify-between items-center mt-2">
              <Text variant="caption">Total</Text>
              <Text className="font-semibold">{order.total}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
