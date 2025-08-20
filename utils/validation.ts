import { getAddress, isAddress } from 'ethers';

/**
 * Validates if a string is a valid Ethereum wallet address using ethers.js
 */
export const isValidEthereumAddress = (address: string): boolean => {
  try {
    return isAddress(address.trim());
  } catch {
    return false;
  }
};

/**
 * Formats a wallet address for display (e.g., "0x1234...5678")
 */
export const formatWalletAddress = (address: string, startChars = 6, endChars = 4): string => {
  if (!address) return '';
  if (address.length <= startChars + endChars) return address;
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
};

/**
 * Validates and normalizes user input for wallet addresses
 * Returns the checksummed address if valid, or trimmed input if invalid
 */
export const sanitizeWalletAddress = (input: string): string => {
  const trimmed = input.trim();
  try {
    if (isAddress(trimmed)) {
      return getAddress(trimmed); // Returns checksummed address
    }
  } catch {
    // Fall through to return trimmed input
  }
  return trimmed;
};

/**
 * Common wallet address validation errors with detailed feedback
 */
export const getAddressValidationError = (address: string): string | null => {
  const trimmed = address.trim();
  
  if (!trimmed) {
    return 'Please enter a wallet address';
  }
  
  if (!trimmed.startsWith('0x')) {
    return 'Address must start with 0x';
  }
  
  if (trimmed.length !== 42) {
    return `Address must be 42 characters long (currently ${trimmed.length})`;
  }
  
  // Use ethers.js for comprehensive validation
  if (!isValidEthereumAddress(trimmed)) {
    // Check if it's close to valid format
    const hexPattern = /^0x[0-9a-fA-F]*$/;
    if (!hexPattern.test(trimmed)) {
      return 'Address contains invalid characters (only 0-9, a-f, A-F allowed)';
    }
    return 'Invalid EVM address format';
  }
  
  return null;
};

/**
 * Validate seed phrase using ethers.js
 */
export const validateSeedPhrase = (phrase: string): { isValid: boolean; error?: string; wordCount?: number } => {
  const trimmed = phrase.trim();
  
  if (!trimmed) {
    return { isValid: false, error: 'Please enter your recovery phrase' };
  }

  const words = trimmed.split(/\s+/);
  const wordCount = words.length;
  
  if (wordCount < 12) {
    return { 
      isValid: false, 
      error: `Recovery phrase must be at least 12 words (currently ${wordCount})`,
      wordCount 
    };
  }

  if (![12, 15, 18, 21, 24].includes(wordCount)) {
    return { 
      isValid: false, 
      error: `Invalid recovery phrase length. Must be 12, 15, 18, 21, or 24 words (currently ${wordCount})`,
      wordCount 
    };
  }

  try {
    // Use ethers.js to validate the mnemonic
    const { Mnemonic } = require('ethers');
    Mnemonic.fromPhrase(trimmed);
    return { isValid: true, wordCount };
  } catch (error) {
    return { 
      isValid: false, 
      error: 'Invalid recovery phrase. Please check your words and try again.',
      wordCount 
    };
  }
};

/**
 * Generate wallet address from seed phrase
 */
export const getAddressFromSeedPhrase = (seedPhrase: string): string => {
  try {
    const { Mnemonic, HDNodeWallet } = require('ethers');
    const mnemonic = Mnemonic.fromPhrase(seedPhrase.trim());
    const hdWallet = HDNodeWallet.fromMnemonic(mnemonic);
    return hdWallet.address;
  } catch (error) {
    throw new Error('Failed to generate address from seed phrase');
  }
};
