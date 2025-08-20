import { ERROR_CODES, WalletError } from '@/core/error-handling/errors';
import * as SecureStore from 'expo-secure-store';

export enum SecureStorageKeys {
  SEED_PHRASE = 'seed_phrase',
  PRIVATE_KEY = 'private_key',
  BIOMETRIC_SETTINGS = 'biometric_settings',
  PIN_HASH = 'pin_hash',
}

/**
 * Securely store sensitive data with encryption
 */
export const securelyStore = async (key: SecureStorageKeys, value: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync(key, value, {
      requireAuthentication: true,
      authenticationPrompt: 'Authenticate to save secure data',
    });
  } catch (error) {
    throw new WalletError(
      'Failed to store sensitive data securely',
      ERROR_CODES.SECURE_STORE_FAILED,
      'security'
    );
  }
};

/**
 * Retrieve sensitive data from secure storage
 */
export const securelyRetrieve = async (key: SecureStorageKeys): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(key, {
      requireAuthentication: true,
      authenticationPrompt: 'Authenticate to access secure data',
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes('UserCancel')) {
      return null; // User cancelled authentication
    }
    throw new WalletError(
      'Failed to retrieve sensitive data',
      ERROR_CODES.SECURE_STORE_FAILED,
      'security'
    );
  }
};

/**
 * Delete sensitive data from secure storage
 */
export const securelyDelete = async (key: SecureStorageKeys): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    throw new WalletError(
      'Failed to delete sensitive data',
      ERROR_CODES.SECURE_STORE_FAILED,
      'security'
    );
  }
};

/**
 * Check if sensitive data exists
 */
export const hasSecureData = async (key: SecureStorageKeys): Promise<boolean> => {
  try {
    const value = await SecureStore.getItemAsync(key);
    return value !== null;
  } catch {
    return false;
  }
};

/**
 * Clear all sensitive data (for logout/reset)
 */
export const clearAllSecureData = async (): Promise<void> => {
  const keys = Object.values(SecureStorageKeys);
  
  for (const key of keys) {
    try {
      await securelyDelete(key);
    } catch (error) {
      console.warn(`Failed to delete ${key}:`, error);
    }
  }
};
