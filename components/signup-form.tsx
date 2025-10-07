import { View } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { Text } from './ui/text';
import { TextInput } from './ui/text-input';
import { Button } from './ui/button';

export function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      // Add your signup logic here
      console.log('Signing up with:', { name, email, password });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to dashboard on success
      router.replace('/dashboard');
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="space-y-4">
      <View>
        <Text className="mb-2">Full Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter your full name"
          autoCapitalize="words"
          className="bg-input"
        />
      </View>

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

      <Button
        onPress={handleSubmit}
        disabled={isLoading}
        className={isLoading ? 'opacity-50' : ''}>
        {isLoading ? 'Creating account...' : 'Create Account'}
      </Button>
    </View>
  );
}
