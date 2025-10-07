import { View, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Text } from '@/components/ui/text';
import { TextInput } from '@/components/ui/text-input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here
    console.log({ email, password });
    router.replace('/dashboard');
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center p-4 min-h-screen">
        <View className="w-full max-w-md">
          <View className="items-center mb-8">
            <Text className="text-2xl font-bold">PharmaConnect</Text>
          </View>

          <View className="bg-card rounded-lg shadow-sm p-8">
            <View className="items-center mb-8">
              <Text className="text-3xl font-bold mb-2">Welcome Back</Text>
              <Text className="text-muted-foreground text-sm">
                Login to manage your deliveries.
              </Text>
            </View>

            <View className="gap-4">
              <View>
                <Text className="mb-2">Email</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="bg-input"
                />
              </View>

              <View>
                <Text className="mb-2">Password</Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  secureTextEntry
                  className="bg-input"
                />
              </View>

              <Button onPress={handleLogin} className="mt-4">
                <Text className="text-primary-foreground">Login</Text>
              </Button>
            </View>

            <View className="mt-6 items-center">
              <Text className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link href="/signup" className="text-primary">
                  <Text className="text-primary font-medium">Sign Up</Text>
                </Link>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
