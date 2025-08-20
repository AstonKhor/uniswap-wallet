import { NetworkType } from '@/types';

// Query Keys Factory - helps organize and prevent typos in query keys
export const queryKeys = {
  // Portfolio queries
  portfolio: {
    all: ['portfolio'] as const,
    byAddress: (address: string) => ['portfolio', address] as const,
    balance: (address: string, networks: NetworkType[]) =>
      ['portfolio', address, 'balance', ...networks] as const,
  },

  // Token queries
  tokens: {
    all: ['tokens'] as const,
    byNetwork: (network: NetworkType) => ['tokens', network] as const,
    balance: (address: string, tokenAddress: string, network: NetworkType) =>
      ['tokens', 'balance', address, tokenAddress, network] as const,
    metadata: (tokenAddress: string, network: NetworkType) =>
      ['tokens', 'metadata', tokenAddress, network] as const,
  },

  // Price queries
  prices: {
    all: ['prices'] as const,
    byTokens: (tokenAddresses: string[]) => ['prices', ...tokenAddresses.sort()] as const,
    historical: (tokenAddress: string, timeRange: string) =>
      ['prices', 'historical', tokenAddress, timeRange] as const,
  },

  // Transaction queries
  transactions: {
    all: ['transactions'] as const,
    byAddress: (address: string) => ['transactions', address] as const,
    byNetwork: (address: string, network: NetworkType) =>
      ['transactions', address, network] as const,
    pending: (address: string) => ['transactions', address, 'pending'] as const,
  },

  // Network queries
  networks: {
    all: ['networks'] as const,
    status: (network: NetworkType) => ['networks', 'status', network] as const,
    gasPrice: (network: NetworkType) => ['networks', 'gas-price', network] as const,
  },
} as const;

export type QueryKeys = typeof queryKeys;
