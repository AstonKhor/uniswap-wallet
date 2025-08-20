import { STORAGE_KEYS } from '@/constants';
import { WalletType } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Store wallet address as view-only wallet
 */
export const storeViewOnlyWallet = async (address: string): Promise<void> => {
  await AsyncStorage.multiSet([
    [STORAGE_KEYS.WALLET_TYPE, 'address-only'],
    [STORAGE_KEYS.CURRENT_ADDRESS, address],
    [STORAGE_KEYS.ONBOARDING_COMPLETED, 'true'],
  ]);
};

/**
 * Get current wallet data from storage
 */
export const getWalletData = async (): Promise<{
  address: string | null;
  type: WalletType | null;
  isOnboarded: boolean;
}> => {
  try {
    const [addressResult, typeResult, onboardedResult] = await AsyncStorage.multiGet([
      STORAGE_KEYS.CURRENT_ADDRESS,
      STORAGE_KEYS.WALLET_TYPE,
      STORAGE_KEYS.ONBOARDING_COMPLETED,
    ]);

    return {
      address: addressResult[1],
      type: typeResult[1] as WalletType,
      isOnboarded: onboardedResult[1] === 'true',
    };
  } catch (error) {
    console.error('Failed to load wallet data:', error);
    return {
      address: null,
      type: null,
      isOnboarded: false,
    };
  }
};

/**
 * Clear all wallet data from storage
 */
export const clearWalletData = async (): Promise<void> => {
  await AsyncStorage.multiRemove([
    STORAGE_KEYS.WALLET_TYPE,
    STORAGE_KEYS.CURRENT_ADDRESS,
    STORAGE_KEYS.ONBOARDING_COMPLETED,
  ]);
};

/**
 * Check if user has completed onboarding
 */
export const isOnboardingCompleted = async (): Promise<boolean> => {
  try {
    const completed = await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETED);
    return completed === 'true';
  } catch {
    return false;
  }
};
