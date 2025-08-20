import { Icon } from '@/components/ui/Icon';
import { getAddressValidationError, sanitizeWalletAddress, storeViewOnlyWallet } from '@/utils';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WalletAddressScreen() {
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const inputRef = useRef<TextInput>(null);

  // Auto-focus the input when screen loads
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Handle address input changes with real-time validation
  const handleAddressChange = (text: string) => {
    setAddress(text);
    
    // Only show validation errors if user has typed something substantial
    if (text.trim().length > 5) {
      const error = getAddressValidationError(text);
      setValidationError(error);
    } else {
      setValidationError(null);
    }
  };

  const handleContinue = async () => {
    const sanitizedAddress = sanitizeWalletAddress(address);
    const error = getAddressValidationError(sanitizedAddress);
    
    if (error) {
      Alert.alert('Invalid Address', error);
      return;
    }

    setIsLoading(true);
    
    try {
      // Store as view-only wallet using the sanitized/checksummed address
      await storeViewOnlyWallet(sanitizedAddress);
      
      // Navigate to main app
      router.navigate('/(main)' as any);
    } catch (error) {
      Alert.alert('Error', 'Failed to save wallet address. Please try again.');
      console.error('Storage error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        className="flex-1"
      >
        <View className="flex-1 px-6">
        {/* Header */}
        <View className="flex-row items-center justify-between pt-4 pb-8">
          <Pressable 
            className="w-10 h-10 items-center justify-center"
            onPress={handleBack}
          >
            <Text className="text-2xl">←</Text>
          </Pressable>
        </View>

        {/* Person Icon */}
        <View className="items-center mb-8">
          <View className="w-12 h-12 bg-gray-200 rounded-xl items-center justify-center">
            <Icon color="#6B7280" name="wallet-outline" size={24} />
          </View>
        </View>

        {/* Title */}
        <View className="items-center mb-12">
          <Text className="text-gray-900 text-2xl font-medium">
            Enter a wallet address
          </Text>
        </View>

        {/* Input */}
        <View className="mb-8">
          <TextInput
            ref={inputRef}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            className={`text-gray-900 text-2xl p-5 border bg-white rounded-xl ${
              validationError ? 'border-red-400' : 'border-gray-300'
            }`}
            keyboardType="default"
            multiline={false}
            placeholder="Type or paste wallet address"
            placeholderTextColor="#9CA3AF"
            returnKeyType="done"
            value={address}
            onChangeText={handleAddressChange}
            onSubmitEditing={handleContinue}
          />
          
          {validationError && (
            <Text className="text-red-500 text-sm mt-2 px-2">
              {validationError}
            </Text>
          )}
          
          {address.trim().length > 5 && !validationError && (
            <Text className="text-green-600 text-sm mt-2 px-2">
              ✓ Valid EVM address
            </Text>
          )}
        </View>

        {/* Continue Button */}
        <View className="mt-auto mb-8 mx-6">
          <Pressable
            className={`w-full rounded-2xl py-5 px-6 ${
              isLoading || !address.trim() || validationError
                ? 'bg-pink-300'
                : 'bg-pink-500 active:opacity-80'
            }`}
            disabled={isLoading || !address.trim() || !!validationError}
            onPress={handleContinue}
          >
            <Text className="text-white text-center text-lg font-semibold">
              {isLoading ? 'Saving...' : 'Continue'}
            </Text>
          </Pressable>
        </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
