// Custom Error Types for different categories
export class WalletError extends Error {
  constructor(
    message: string,
    public code: string,
    public category: 'validation' | 'storage' | 'network' | 'security' | 'unknown' = 'unknown'
  ) {
    super(message);
    this.name = 'WalletError';
  }
}

export class BlockchainError extends Error {
  constructor(
    message: string,
    public code: string,
    public networkType?: string,
    public txHash?: string
  ) {
    super(message);
    this.name = 'BlockchainError';
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public field: string,
    public value?: string,
    public code: string = 'VALIDATION_ERROR'
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Error Codes
export const ERROR_CODES = {
  // Validation Errors
  INVALID_ADDRESS: 'INVALID_ADDRESS',
  INVALID_SEED_PHRASE: 'INVALID_SEED_PHRASE',
  INVALID_AMOUNT: 'INVALID_AMOUNT',
  
  // Storage Errors
  STORAGE_FAILED: 'STORAGE_FAILED',
  STORAGE_UNAVAILABLE: 'STORAGE_UNAVAILABLE',
  
  // Network Errors
  NETWORK_UNAVAILABLE: 'NETWORK_UNAVAILABLE',
  RPC_ERROR: 'RPC_ERROR',
  TIMEOUT: 'TIMEOUT',
  
  // Blockchain Errors
  INSUFFICIENT_BALANCE: 'INSUFFICIENT_BALANCE',
  TRANSACTION_FAILED: 'TRANSACTION_FAILED',
  GAS_ESTIMATION_FAILED: 'GAS_ESTIMATION_FAILED',
  
  // Security Errors
  UNAUTHORIZED: 'UNAUTHORIZED',
  BIOMETRIC_FAILED: 'BIOMETRIC_FAILED',
  SECURE_STORE_FAILED: 'SECURE_STORE_FAILED',
} as const;

// User-friendly error messages
export const ERROR_MESSAGES: Record<string, string> = {
  [ERROR_CODES.INVALID_ADDRESS]: 'Please enter a valid wallet address',
  [ERROR_CODES.INVALID_SEED_PHRASE]: 'Invalid seed phrase format',
  [ERROR_CODES.INVALID_AMOUNT]: 'Please enter a valid amount',
  [ERROR_CODES.STORAGE_FAILED]: 'Failed to save data. Please try again.',
  [ERROR_CODES.NETWORK_UNAVAILABLE]: 'Network connection unavailable. Please check your internet.',
  [ERROR_CODES.RPC_ERROR]: 'Blockchain network error. Please try again.',
  [ERROR_CODES.INSUFFICIENT_BALANCE]: 'Insufficient balance for this transaction',
  [ERROR_CODES.TRANSACTION_FAILED]: 'Transaction failed. Please try again.',
  [ERROR_CODES.UNAUTHORIZED]: 'Authentication required',
  [ERROR_CODES.BIOMETRIC_FAILED]: 'Biometric authentication failed',
};

// Error Handler Utility
export const handleError = (error: unknown): { message: string; code: string } => {
  console.error('Error occurred:', error);

  if (error instanceof WalletError || error instanceof BlockchainError || error instanceof ValidationError) {
    return {
      message: ERROR_MESSAGES[error.code] || error.message,
      code: error.code,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message || 'An unexpected error occurred',
      code: 'UNKNOWN_ERROR',
    };
  }

  return {
    message: 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR',
  };
};

// Error Reporting (for production monitoring)
export const reportError = (error: Error, context?: Record<string, any>) => {
  if (__DEV__) {
    console.error('Error Report:', error, context);
    return;
  }

  // TODO: Send to crash reporting service
  // Example: Sentry.captureException(error, { extra: context });
};
