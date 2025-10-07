import { View, ScrollView } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { TextInput } from '@/components/ui/text-input';
import { useState } from 'react';
import { router } from 'expo-router';

export default function AddPharmacyScreen() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = () => {
    // Handle form submission
    console.log({ name, address, phone });
    router.back();
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4 gap-4">
        <View>
          <Text className="mb-2">Pharmacy Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter pharmacy name"
            className="bg-input"
          />
        </View>

        <View>
          <Text className="mb-2">Address</Text>
          <TextInput
            value={address}
            onChangeText={setAddress}
            placeholder="Enter address"
            className="bg-input"
            multiline
          />
        </View>

        <View>
          <Text className="mb-2">Phone</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter phone number"
            className="bg-input"
            keyboardType="phone-pad"
          />
        </View>

        <Button onPress={handleSubmit} className="mt-4">
          <Text className="text-primary-foreground">Add Pharmacy</Text>
        </Button>
      </View>
    </ScrollView>
  );
}