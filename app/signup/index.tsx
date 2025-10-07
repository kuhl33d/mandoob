import { View, ScrollView } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { TextInput } from '@/components/ui/text-input';
import { useState } from 'react';
import { router } from 'expo-router';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSignup = () => {
    // Handle signup logic
    console.log({ email, password, name });
    router.replace('/dashboard');
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4 gap-4">
        <Text className="text-2xl font-bold mb-4">Create Account</Text>

        <View>
          <Text className="mb-2">Full Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            className="bg-input"
          />
        </View>

        <View>
          <Text className="mb-2">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            className="bg-input"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View>
          <Text className="mb-2">Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            className="bg-input"
            secureTextEntry
          />
        </View>

        <Button onPress={handleSignup} className="mt-4">
          <Text className="text-primary-foreground">Sign Up</Text>
        </Button>

        <Button variant="ghost" onPress={() => router.back()}>
          <Text>Already have an account? Sign In</Text>
        </Button>
      </View>
    </ScrollView>
  );
}