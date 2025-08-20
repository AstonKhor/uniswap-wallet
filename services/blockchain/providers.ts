import { BlockchainError, ERROR_CODES } from '@/core/error-handling/errors';
import { NetworkType } from '@/types';
import { JsonRpcProvider } from 'ethers';
import { BLOCKCHAIN_CONFIGS } from './config';

// Provider instances cache
const providers: Map<NetworkType, JsonRpcProvider> = new Map();

/**
 * Get or create a blockchain provider for the specified network
 */
export const getProvider = (networkType: NetworkType): JsonRpcProvider => {
  // Return cached provider if exists
  if (providers.has(networkType)) {
    return providers.get(networkType)!;
  }

  // Create new provider
  const config = BLOCKCHAIN_CONFIGS[networkType];
  
  if (!config.rpcUrl || config.rpcUrl.endsWith('/')) {
    throw new BlockchainError(
      `RPC URL not configured for ${networkType}`,
      ERROR_CODES.RPC_ERROR,
      networkType
    );
  }

  try {
    const provider = new JsonRpcProvider(config.rpcUrl, {
      chainId: config.chainId,
      name: config.networkType,
    });

    // Cache the provider
    providers.set(networkType, provider);
    
    return provider;
  } catch (error) {
    throw new BlockchainError(
      `Failed to create provider for ${networkType}`,
      ERROR_CODES.RPC_ERROR,
      networkType
    );
  }
};

/**
 * Get multiple providers for batch operations
 */
export const getProviders = (networkTypes: NetworkType[]): Record<NetworkType, JsonRpcProvider> => {
  const result = {} as Record<NetworkType, JsonRpcProvider>;
  
  for (const networkType of networkTypes) {
    result[networkType] = getProvider(networkType);
  }
  
  return result;
};

/**
 * Test network connectivity
 */
export const testNetworkConnectivity = async (networkType: NetworkType): Promise<boolean> => {
  try {
    const provider = getProvider(networkType);
    const blockNumber = await provider.getBlockNumber();
    return blockNumber > 0;
  } catch (error) {
    console.warn(`Network connectivity test failed for ${networkType}:`, error);
    return false;
  }
};

/**
 * Get network status for all supported networks
 */
export const getAllNetworkStatus = async (): Promise<Record<NetworkType, boolean>> => {
  const networkTypes: NetworkType[] = ['ethereum', 'polygon', 'arbitrum', 'optimism'];
  
  const statusPromises = networkTypes.map(async (networkType) => {
    const isConnected = await testNetworkConnectivity(networkType);
    return [networkType, isConnected] as const;
  });

  const results = await Promise.allSettled(statusPromises);
  const status = {} as Record<NetworkType, boolean>;

  results.forEach((result, index) => {
    const networkType = networkTypes[index];
    status[networkType] = result.status === 'fulfilled' ? result.value[1] : false;
  });

  return status;
};

/**
 * Clear provider cache (useful for testing or network switching)
 */
export const clearProviderCache = (): void => {
  providers.clear();
};
