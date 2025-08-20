import { Network, NetworkType } from '../types';
import { ENV, getRpcUrl } from './environment';

export const SUPPORTED_NETWORKS: Record<NetworkType, Network> = {
  ethereum: {
    id: 'ethereum',
    name: 'Ethereum',
    type: 'ethereum',
    chainId: 1,
    rpcUrl: getRpcUrl(ENV.ETHEREUM_RPC_URL, ENV.INFURA_API_KEY || ENV.ALCHEMY_API_KEY),
    blockExplorerUrl: 'https://etherscan.io',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    color: '#627EEA',
    icon: '⧫',
  },
  polygon: {
    id: 'polygon',
    name: 'Polygon',
    type: 'polygon',
    chainId: 137,
    rpcUrl: getRpcUrl(ENV.POLYGON_RPC_URL, ENV.INFURA_API_KEY || ENV.ALCHEMY_API_KEY),
    blockExplorerUrl: 'https://polygonscan.com',
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
    },
    color: '#8247E5',
    icon: '⬟',
  },
  arbitrum: {
    id: 'arbitrum',
    name: 'Arbitrum One',
    type: 'arbitrum',
    chainId: 42161,
    rpcUrl: getRpcUrl(ENV.ARBITRUM_RPC_URL, ENV.INFURA_API_KEY || ENV.ALCHEMY_API_KEY),
    blockExplorerUrl: 'https://arbiscan.io',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    color: '#28A0F0',
    icon: '🔵',
  },
  optimism: {
    id: 'optimism',
    name: 'Optimism',
    type: 'optimism',
    chainId: 10,
    rpcUrl: getRpcUrl(ENV.OPTIMISM_RPC_URL, ENV.INFURA_API_KEY || ENV.ALCHEMY_API_KEY),
    blockExplorerUrl: 'https://optimistic.etherscan.io',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    color: '#FF0420',
    icon: '🔴',
  },
};

export const DEFAULT_NETWORKS: NetworkType[] = ['ethereum', 'polygon', 'arbitrum', 'optimism'];

export const NETWORK_ORDER: NetworkType[] = ['ethereum', 'polygon', 'arbitrum', 'optimism'];
