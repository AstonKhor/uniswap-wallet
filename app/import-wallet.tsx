import { Icon } from '@/components/ui/Icon';
import { STORAGE_KEYS } from '@/constants';
import { securelyStore, SecureStorageKeys } from '@/core/security/secureStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HDNodeWallet, Mnemonic } from 'ethers';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ImportWalletScreen() {
  const [seedPhrase, setSeedPhrase] = useState('');
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

  // Validate seed phrase using ethers.js
  const validateSeedPhrase = (phrase: string): string | null => {
    const trimmed = phrase.trim();
    
    if (!trimmed) {
      return 'Please enter your recovery phrase';
    }

    const words = trimmed.split(/\s+/);
    
    if (words.length < 12) {
      return `Recovery phrase must be at least 12 words (currently ${words.length})`;
    }

    if (![12, 15, 18, 21, 24].includes(words.length)) {
      return `Invalid recovery phrase length. Must be 12, 15, 18, 21, or 24 words (currently ${words.length})`;
    }

    try {
      // Use ethers.js to validate the mnemonic
      Mnemonic.fromPhrase(trimmed);
      return null; // Valid
    } catch {
      return 'Invalid recovery phrase. Please check your words and try again.';
    }
  };

  // Handle seed phrase input with real-time validation
  const handleSeedPhraseChange = (text: string) => {
    setSeedPhrase(text);
    
    // Only show validation errors if user has typed substantial content
    if (text.trim().split(/\s+/).length > 6) {
      const error = validateSeedPhrase(text);
      setValidationError(error);
    } else {
      setValidationError(null);
    }
  };

  const handleContinue = async () => {
    const trimmedPhrase = seedPhrase.trim();
    const error = validateSeedPhrase(trimmedPhrase);
    
    if (error) {
      Alert.alert('Invalid Recovery Phrase', error);
      return;
    }

    setIsLoading(true);
    
    try {
      // Generate wallet from seed phrase
      const mnemonic = Mnemonic.fromPhrase(trimmedPhrase);
      const hdWallet = HDNodeWallet.fromMnemonic(mnemonic);
      const address = hdWallet.address;

      // Store securely
      await securelyStore(SecureStorageKeys.SEED_PHRASE, trimmedPhrase);
      
      // Store wallet info in regular storage
      await AsyncStorage.multiSet([
        [STORAGE_KEYS.WALLET_TYPE, 'seed-phrase'],
        [STORAGE_KEYS.CURRENT_ADDRESS, address],
        [STORAGE_KEYS.ONBOARDING_COMPLETED, 'true'],
      ]);

      // Navigate to main app
      router.navigate('/(main)' as any);
    } catch (error) {
      Alert.alert('Error', 'Failed to import wallet. Please try again.');
      console.error('Import wallet error:', error);
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
          <View className="flex-row items-center justify-between pt-4">
            <Pressable 
              className="w-10 h-10 items-center justify-center"
              onPress={handleBack}
            >
              <Text className="text-2xl">←</Text>
            </Pressable>
          </View>

          {/* Document Icon */}
          <View className="items-center mb-8">
            <View className="w-10 h-10 bg-gray-200 rounded-xl items-center justify-center p-2">
              <Icon name="document" size={20} />
            </View>
          </View>

          {/* Title and Description */}
          <View className="items-center mb-12">
            <Text className="text-gray-900 text-2xl font-medium mb-4">
              Enter your recovery phrase
            </Text>
            <Text className="text-gray-500 text-center text-xl leading-relaxed px-4">
              Your recovery phrase will only be stored locally on your device.
            </Text>
          </View>

          {/* Input */}
          <View className="mb-8">
            <TextInput
              ref={inputRef}
              multiline
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect={false}
              className={`text-gray-900 text-lg p-5 border bg-white rounded-2xl min-h-24 ${
                validationError ? 'border-red-400' : 'border-gray-300'
              }`}
              keyboardType="default"
              placeholder="Type or paste your recovery phrase"
              placeholderTextColor="#9CA3AF"
              returnKeyType="done"
              textAlignVertical="top"
              value={seedPhrase}
              onChangeText={handleSeedPhraseChange}
              onSubmitEditing={handleContinue}
            />
            
            {/* Validation Error */}
            {validationError && (
              <Text className="text-red-500 text-sm mt-2 px-2">
                {validationError}
              </Text>
            )}
            
            {/* Success Indicator */}
            {seedPhrase.trim().split(/\s+/).length >= 12 && !validationError && (
              <Text className="text-green-600 text-sm mt-2 px-2">
                ✓ Valid recovery phrase ({seedPhrase.trim().split(/\s+/).length} words)
              </Text>
            )}
          </View>

          {/* Spacer to push button to bottom */}
          <View className="flex-1" />
          
          {/* Continue Button */}
          <View className="mt-auto mb-8">
            <Pressable
              className={`w-full rounded-2xl py-5 px-6 ${
                isLoading || !seedPhrase.trim() || validationError
                  ? 'bg-pink-300'
                  : 'bg-pink-500 active:opacity-80'
              }`}
              disabled={isLoading || !seedPhrase.trim() || !!validationError}
              onPress={handleContinue}
            >
              <Text className="text-white text-center text-lg font-semibold">
                {isLoading ? 'Importing...' : 'Continue'}
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
