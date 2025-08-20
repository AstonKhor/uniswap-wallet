// Network Types
export type NetworkType = 'ethereum' | 'polygon' | 'arbitrum' | 'optimism';

export interface Network {
  id: string;
  name: string;
  type: NetworkType;
  chainId: number;
  rpcUrl: string;
  blockExplorerUrl: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  color: string;
  icon: string;
}

// Token Types
export interface Token {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI?: string;
  networkType: NetworkType;
}

export interface TokenBalance {
  token: Token;
  balance: string;
  balanceFormatted: string;
  usdValue: number;
  network: Network;
}

// Wallet Types
export type WalletType = 'address-only' | 'seed-phrase';

export interface WalletConfig {
  type: WalletType;
  address?: string;
  seedPhrase?: string; // This should only be stored in secure storage
}

// Portfolio Types
export interface Portfolio {
  address: string;
  totalUsdValue: number;
  tokens: TokenBalance[];
  networks: NetworkType[];
  lastUpdated: Date;
}

// Transaction Types
export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  token: Token;
  network: Network;
  timestamp: Date;
  status: 'pending' | 'confirmed' | 'failed';
  gasUsed?: string;
  gasPrice?: string;
}

// App State Types
export interface AppState {
  isOnboarded: boolean;
  walletType: WalletType | null;
  currentAddress: string | null;
  selectedNetworks: NetworkType[];
  theme: 'light' | 'dark' | 'system';
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Input Types
export type InputMethod = 'address' | 'seed-phrase';

// Component Props
export interface BaseComponentProps {
  className?: string;
}

export * from './navigation';
