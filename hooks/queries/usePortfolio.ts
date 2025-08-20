import { NetworkType, Portfolio, TokenBalance } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from './queryKeys';

// Mock data for development - will be replaced with actual API calls
const mockPortfolioData: Portfolio = {
  address: '0x1234...5678',
  totalUsdValue: 0,
  tokens: [],
  networks: ['ethereum', 'polygon', 'arbitrum', 'optimism'],
  lastUpdated: new Date(),
};

// Mock function to fetch portfolio data
const fetchPortfolio = async (address: string): Promise<Portfolio> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // TODO: Replace with actual blockchain API calls
  return {
    ...mockPortfolioData,
    address,
  };
};

// Mock function to fetch token balances
const fetchTokenBalances = async (
  address: string,
  networks: NetworkType[]
): Promise<TokenBalance[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // TODO: Replace with actual blockchain API calls
  return [];
};

// Hook to fetch complete portfolio data
export const usePortfolio = (address?: string) => {
  return useQuery({
    queryKey: queryKeys.portfolio.byAddress(address || ''),
    queryFn: () => fetchPortfolio(address!),
    enabled: !!address, // Only run query if address is provided
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });
};

// Hook to fetch token balances across networks
export const useTokenBalances = (address?: string, networks: NetworkType[] = []) => {
  return useQuery({
    queryKey: queryKeys.portfolio.balance(address || '', networks),
    queryFn: () => fetchTokenBalances(address!, networks),
    enabled: !!address && networks.length > 0,
    staleTime: 2 * 60 * 1000, // Consider data fresh for 2 minutes
  });
};

// Hook to get portfolio loading state
export const usePortfolioLoading = (address?: string) => {
  const portfolioQuery = usePortfolio(address);
  const tokenBalancesQuery = useTokenBalances(address, [
    'ethereum',
    'polygon',
    'arbitrum',
    'optimism',
  ]);

  return {
    isLoading: portfolioQuery.isLoading || tokenBalancesQuery.isLoading,
    isError: portfolioQuery.isError || tokenBalancesQuery.isError,
    error: portfolioQuery.error || tokenBalancesQuery.error,
    isSuccess: portfolioQuery.isSuccess && tokenBalancesQuery.isSuccess,
  };
};
