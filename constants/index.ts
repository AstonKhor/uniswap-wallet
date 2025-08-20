import { ENV, validateEnvironment } from './environment';

// Validate environment on module load
if (ENV.ENABLE_LOGGING) {
  validateEnvironment();
}

// App Configuration
export const APP_CONFIG = {
  name: 'Uniswap Wallet',
  version: '1.0.0',
  description: 'Multi-chain crypto portfolio and wallet',
  supportEmail: 'support@uniswapwallet.com',
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  WALLET_TYPE: 'wallet_type',
  CURRENT_ADDRESS: 'current_address',
  ONBOARDING_COMPLETED: 'onboarding_completed',
  SELECTED_NETWORKS: 'selected_networks',
  THEME: 'theme',
  SEED_PHRASE: 'seed_phrase', // Stored in SecureStore only
  BIOMETRIC_ENABLED: 'biometric_enabled',
  PORTFOLIO_CACHE: 'portfolio_cache',
} as const;

// API Configuration
export const API_CONFIG = {
  ALCHEMY_API_KEY: ENV.ALCHEMY_API_KEY,
  INFURA_API_KEY: ENV.INFURA_API_KEY,
  COINMARKETCAP_API_KEY: ENV.COINMARKETCAP_API_KEY,
  COINGECKO_API_KEY: ENV.COINGECKO_API_KEY,
  REQUEST_TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
} as const;

// Query Keys for React Query
export const QUERY_KEYS = {
  PORTFOLIO: 'portfolio',
  TOKEN_BALANCES: 'token-balances',
  TRANSACTIONS: 'transactions',
  TOKEN_PRICES: 'token-prices',
  NETWORK_STATUS: 'network-status',
} as const;

// Validation Rules
export const VALIDATION = {
  ADDRESS_LENGTH: {
    ETHEREUM: 42, // 0x + 40 hex chars
  },
  SEED_PHRASE_WORDS: [12, 15, 18, 21, 24],
  MAX_RETRIES: 3,
  MIN_SEND_AMOUNT: '0.000001',
} as const;

// UI Constants
export const UI = {
  HEADER_HEIGHT: 100,
  TAB_BAR_HEIGHT: 80,
  CARD_BORDER_RADIUS: 16,
  BUTTON_BORDER_RADIUS: 12,
  SKELETON_ANIMATION_DURATION: 1500,
  TOAST_DURATION: 3000,
} as const;

// Animation Durations (in ms)
export const ANIMATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  PAGE_TRANSITION: 250,
} as const;

export * from './environment';
export * from './networks';

