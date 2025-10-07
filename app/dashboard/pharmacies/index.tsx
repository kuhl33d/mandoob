import { View, ScrollView, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';

export default function PharmaciesScreen() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        <Link href="/dashboard/pharmacies/add" asChild>
          <Button className="mb-4">
            <Text className="text-primary-foreground">Add New Pharmacy</Text>
          </Button>
        </Link>

        <View className="gap-4">
          {[1, 2, 3].map((id) => (
            <Link key={id} href={`/dashboard/pharmacies/${id}`} asChild>
              <Pressable className="bg-card p-4 rounded-lg">
                <Text className="text-lg font-semibold">Pharmacy #{id}</Text>
                <Text className="text-muted-foreground">View pharmacy details</Text>
              </Pressable>
            </Link>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}