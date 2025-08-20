import { ENV } from '@/constants/environment';
import { NetworkType } from '@/types';

export interface BlockchainConfig {
  networkType: NetworkType;
  chainId: number;
  rpcUrl: string;
  blockExplorerUrl: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

export const BLOCKCHAIN_CONFIGS: Record<NetworkType, BlockchainConfig> = {
  ethereum: {
    networkType: 'ethereum',
    chainId: 1,
    rpcUrl: `${ENV.ETHEREUM_RPC_URL}${ENV.INFURA_API_KEY || ENV.ALCHEMY_API_KEY}`,
    blockExplorerUrl: 'https://etherscan.io',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  },
  polygon: {
    networkType: 'polygon',
    chainId: 137,
    rpcUrl: `${ENV.POLYGON_RPC_URL}${ENV.INFURA_API_KEY || ENV.ALCHEMY_API_KEY}`,
    blockExplorerUrl: 'https://polygonscan.com',
    nativeCurrency: { name: 'Matic', symbol: 'MATIC', decimals: 18 },
  },
  arbitrum: {
    networkType: 'arbitrum',
    chainId: 42161,
    rpcUrl: `${ENV.ARBITRUM_RPC_URL}${ENV.INFURA_API_KEY || ENV.ALCHEMY_API_KEY}`,
    blockExplorerUrl: 'https://arbiscan.io',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  },
  optimism: {
    networkType: 'optimism',
    chainId: 10,
    rpcUrl: `${ENV.OPTIMISM_RPC_URL}${ENV.INFURA_API_KEY || ENV.ALCHEMY_API_KEY}`,
    blockExplorerUrl: 'https://optimistic.etherscan.io',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  },
};

export const getBlockchainConfig = (networkType: NetworkType): BlockchainConfig => {
  return BLOCKCHAIN_CONFIGS[networkType];
};

export const getAllSupportedChainIds = (): number[] => {
  return Object.values(BLOCKCHAIN_CONFIGS).map(config => config.chainId);
};
