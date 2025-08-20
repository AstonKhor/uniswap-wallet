// Environment Configuration
// Make sure to set up your .env file with the required variables

export const ENV = {
  // Blockchain API Keys
  ALCHEMY_API_KEY: process.env.EXPO_PUBLIC_ALCHEMY_API_KEY || '',
  INFURA_API_KEY: process.env.EXPO_PUBLIC_INFURA_API_KEY || '',

  // Price API Keys
  COINMARKETCAP_API_KEY: process.env.EXPO_PUBLIC_COINMARKETCAP_API_KEY || '',
  COINGECKO_API_KEY: process.env.EXPO_PUBLIC_COINGECKO_API_KEY || '',

  // App Configuration
  API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL || 'https://api.uniswapwallet.com',
  ENVIRONMENT: process.env.EXPO_PUBLIC_ENVIRONMENT || 'development',

  // Feature Flags
  ENABLE_DEVTOOLS: process.env.EXPO_PUBLIC_ENABLE_DEVTOOLS === 'true',
  ENABLE_LOGGING: process.env.EXPO_PUBLIC_ENABLE_LOGGING === 'true',

  // Network URLs
  ETHEREUM_RPC_URL: process.env.EXPO_PUBLIC_ETHEREUM_RPC_URL || 'https://mainnet.infura.io/v3/',
  POLYGON_RPC_URL:
    process.env.EXPO_PUBLIC_POLYGON_RPC_URL || 'https://polygon-mainnet.infura.io/v3/',
  ARBITRUM_RPC_URL:
    process.env.EXPO_PUBLIC_ARBITRUM_RPC_URL || 'https://arbitrum-mainnet.infura.io/v3/',
  OPTIMISM_RPC_URL:
    process.env.EXPO_PUBLIC_OPTIMISM_RPC_URL || 'https://optimism-mainnet.infura.io/v3/',
} as const;

// Environment validation
export const validateEnvironment = () => {
  const warnings: string[] = [];

  if (!ENV.ALCHEMY_API_KEY && !ENV.INFURA_API_KEY) {
    warnings.push(
      'No blockchain API key configured. Set EXPO_PUBLIC_ALCHEMY_API_KEY or EXPO_PUBLIC_INFURA_API_KEY'
    );
  }

  if (!ENV.COINMARKETCAP_API_KEY && !ENV.COINGECKO_API_KEY) {
    warnings.push(
      'No price API key configured. Set EXPO_PUBLIC_COINMARKETCAP_API_KEY or EXPO_PUBLIC_COINGECKO_API_KEY'
    );
  }

  if (warnings.length > 0 && ENV.ENABLE_LOGGING) {
    console.warn('Environment Configuration Warnings:');
    warnings.forEach(warning => console.warn(`- ${warning}`));
  }

  return warnings;
};

// Development helpers
export const isDevelopment = ENV.ENVIRONMENT === 'development';
export const isProduction = ENV.ENVIRONMENT === 'production';
export const isTesting = ENV.ENVIRONMENT === 'testing';

// API endpoints builder
export const getApiEndpoint = (path: string) => {
  return `${ENV.API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
};

// RPC URL builder with API key
export const getRpcUrl = (baseUrl: string, apiKey: string) => {
  return `${baseUrl}${apiKey}`;
};
