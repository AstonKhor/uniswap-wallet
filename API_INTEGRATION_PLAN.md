# API Integration & Data Flow Plan

## 🌐 Blockchain Data Sources

### Primary Provider: Alchemy
**Base URLs:**
- Ethereum: `https://eth-mainnet.g.alchemy.com/v2/{API_KEY}`
- Polygon: `https://polygon-mainnet.g.alchemy.com/v2/{API_KEY}`
- Optimism: `https://opt-mainnet.g.alchemy.com/v2/{API_KEY}`  
- Arbitrum: `https://arb-mainnet.g.alchemy.com/v2/{API_KEY}`

### Key Endpoints

#### Account Balance & Assets
```typescript
// Native balance
GET /v2/{API_KEY}
{
  "jsonrpc": "2.0",
  "method": "eth_getBalance",
  "params": ["{address}", "latest"],
  "id": 1
}

// ERC-20 token balances
GET /v2/{API_KEY}
{
  "jsonrpc": "2.0",
  "method": "alchemy_getTokenBalances",
  "params": ["{address}"],
  "id": 1
}

// Token metadata
GET /v2/{API_KEY}
{
  "jsonrpc": "2.0",
  "method": "alchemy_getTokenMetadata",
  "params": ["{contractAddress}"],
  "id": 1
}
```

#### Transaction History
```typescript
// Get transaction history
GET /v2/{API_KEY}
{
  "jsonrpc": "2.0",
  "method": "alchemy_getAssetTransfers",
  "params": [{
    "fromBlock": "0x0",
    "toBlock": "latest",
    "fromAddress": "{address}",
    "category": ["external", "internal", "erc20", "erc721", "erc1155"]
  }],
  "id": 1
}
```

### Secondary Provider: CoinGecko (Price Data)
```typescript
// Token prices
GET https://api.coingecko.com/api/v3/simple/price
?ids=ethereum,matic-network,optimism,arbitrum
&vs_currencies=usd
&include_24hr_change=true

// Historical prices
GET https://api.coingecko.com/api/v3/coins/{id}/market_chart
?vs_currency=usd
&days=30
```

## 🔄 Data Flow Architecture

### Service Layer Implementation

#### BlockchainService
```typescript
interface TokenBalance {
  contractAddress: string;
  tokenBalance: string;
  decimals: number;
  symbol: string;
  name: string;
  logo?: string;
  price?: number;
  value?: number;
}

interface Portfolio {
  address: string;
  totalValue: number;
  networks: {
    [networkId: number]: {
      nativeBalance: string;
      nativeValue: number;
      tokens: TokenBalance[];
      totalValue: number;
    }
  };
}

class BlockchainService {
  private alchemyClients: Map<number, AlchemyProvider> = new Map();
  
  async getPortfolio(address: string): Promise<Portfolio> {
    const networks = await Promise.all([
      this.getNetworkPortfolio(address, 1),    // Ethereum
      this.getNetworkPortfolio(address, 137),  // Polygon  
      this.getNetworkPortfolio(address, 10),   // Optimism
      this.getNetworkPortfolio(address, 42161) // Arbitrum
    ]);
    
    return this.aggregatePortfolio(address, networks);
  }
  
  private async getNetworkPortfolio(address: string, networkId: number) {
    const [nativeBalance, tokenBalances] = await Promise.all([
      this.getNativeBalance(address, networkId),
      this.getTokenBalances(address, networkId)
    ]);
    
    // Enrich with price data
    const enrichedTokens = await this.enrichWithPrices(tokenBalances);
    
    return {
      networkId,
      nativeBalance,
      tokens: enrichedTokens,
      totalValue: this.calculateNetworkValue(nativeBalance, enrichedTokens)
    };
  }
}
```

#### PriceService
```typescript
interface PriceData {
  usd: number;
  usd_24h_change: number;
}

class PriceService {
  private cache = new Map<string, { data: PriceData; timestamp: number }>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  
  async getTokenPrice(tokenId: string): Promise<PriceData | null> {
    // Check cache first
    const cached = this.cache.get(tokenId);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }
    
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=usd&include_24hr_change=true`
      );
      const data = await response.json();
      
      const priceData = data[tokenId];
      if (priceData) {
        this.cache.set(tokenId, { data: priceData, timestamp: Date.now() });
        return priceData;
      }
    } catch (error) {
      console.error('Failed to fetch price:', error);
    }
    
    return null;
  }
  
  async getBatchPrices(tokenIds: string[]): Promise<Map<string, PriceData>> {
    const uncachedIds = tokenIds.filter(id => !this.isCached(id));
    
    if (uncachedIds.length === 0) {
      return this.getCachedPrices(tokenIds);
    }
    
    const batchResponse = await this.fetchBatchPrices(uncachedIds);
    this.cacheBatchPrices(batchResponse);
    
    return this.getCachedPrices(tokenIds);
  }
}
```

### React Query Integration

#### Portfolio Queries
```typescript
// Custom hooks for data fetching
export const usePortfolio = (address: string) => {
  return useQuery({
    queryKey: ['portfolio', address],
    queryFn: () => blockchainService.getPortfolio(address),
    enabled: !!address && isValidAddress(address),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 5 * 60 * 1000, // 5 minutes
    select: (data) => {
      // Transform data for UI consumption
      return {
        ...data,
        sortedNetworks: Object.entries(data.networks)
          .sort(([,a], [,b]) => b.totalValue - a.totalValue),
        topTokens: getAllTokens(data).sort((a, b) => (b.value || 0) - (a.value || 0)).slice(0, 10)
      };
    }
  });
};

export const useTokenBalances = (address: string, networkId: number) => {
  return useQuery({
    queryKey: ['balances', address, networkId],
    queryFn: () => blockchainService.getNetworkPortfolio(address, networkId),
    enabled: !!address && !!networkId,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

export const useTransactionHistory = (address: string, networkId?: number) => {
  return useQuery({
    queryKey: ['transactions', address, networkId],
    queryFn: () => blockchainService.getTransactions(address, networkId),
    enabled: !!address,
    staleTime: 30 * 1000, // 30 seconds
  });
};
```

#### Infinite Queries for Large Data
```typescript
export const useInfiniteTransactions = (address: string) => {
  return useInfiniteQuery({
    queryKey: ['transactions-infinite', address],
    queryFn: ({ pageParam = 0 }) => 
      blockchainService.getTransactionsPaginated(address, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled: !!address,
  });
};
```

## 🔐 Wallet Operations (Seed Phrase Users)

### Transaction Service
```typescript
interface SendTransactionParams {
  to: string;
  tokenAddress?: string; // undefined for native tokens
  amount: string;
  networkId: number;
  gasLimit?: string;
  gasPrice?: string;
}

interface TransactionResult {
  hash: string;
  status: 'pending' | 'confirmed' | 'failed';
  gasUsed?: string;
  effectiveGasPrice?: string;
}

class WalletService {
  private walletCache = new Map<string, ethers.Wallet>();
  
  async createWalletFromSeed(seedPhrase: string): Promise<ethers.Wallet> {
    const wallet = ethers.Wallet.fromMnemonic(seedPhrase);
    this.walletCache.set(wallet.address, wallet);
    return wallet;
  }
  
  async estimateGas(params: SendTransactionParams): Promise<string> {
    const wallet = this.getWallet(params.networkId);
    
    if (params.tokenAddress) {
      // ERC-20 transfer
      const contract = new ethers.Contract(
        params.tokenAddress,
        ERC20_ABI,
        wallet
      );
      
      const gasEstimate = await contract.estimateGas.transfer(
        params.to,
        ethers.utils.parseUnits(params.amount, await contract.decimals())
      );
      
      return gasEstimate.toString();
    } else {
      // Native token transfer
      const gasEstimate = await wallet.estimateGas({
        to: params.to,
        value: ethers.utils.parseEther(params.amount)
      });
      
      return gasEstimate.toString();
    }
  }
  
  async sendTransaction(params: SendTransactionParams): Promise<TransactionResult> {
    const wallet = this.getWallet(params.networkId);
    
    try {
      let txResponse: ethers.TransactionResponse;
      
      if (params.tokenAddress) {
        // ERC-20 transfer
        const contract = new ethers.Contract(
          params.tokenAddress,
          ERC20_ABI,
          wallet
        );
        
        txResponse = await contract.transfer(
          params.to,
          ethers.utils.parseUnits(params.amount, await contract.decimals()),
          {
            gasLimit: params.gasLimit,
            gasPrice: params.gasPrice
          }
        );
      } else {
        // Native token transfer
        txResponse = await wallet.sendTransaction({
          to: params.to,
          value: ethers.utils.parseEther(params.amount),
          gasLimit: params.gasLimit,
          gasPrice: params.gasPrice
        });
      }
      
      return {
        hash: txResponse.hash,
        status: 'pending'
      };
      
    } catch (error) {
      throw new Error(`Transaction failed: ${error.message}`);
    }
  }
}
```

### Transaction Mutations
```typescript
export const useSendTransaction = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (params: SendTransactionParams) => 
      walletService.sendTransaction(params),
    onSuccess: (result, variables) => {
      // Invalidate relevant queries to refresh balances
      queryClient.invalidateQueries(['portfolio', variables.from]);
      queryClient.invalidateQueries(['balances', variables.from]);
      queryClient.invalidateQueries(['transactions', variables.from]);
      
      // Add optimistic update for pending transaction
      queryClient.setQueryData(
        ['transactions', variables.from],
        (old: any) => ({
          ...old,
          transactions: [
            {
              hash: result.hash,
              status: 'pending',
              timestamp: Date.now(),
              ...variables
            },
            ...old.transactions
          ]
        })
      );
    },
    onError: (error) => {
      // Handle transaction errors
      console.error('Transaction failed:', error);
    }
  });
};

export const useGasEstimation = () => {
  return useMutation({
    mutationFn: (params: SendTransactionParams) => 
      walletService.estimateGas(params),
  });
};
```

## 📊 Data Transformation & Aggregation

### Portfolio Aggregation
```typescript
interface AggregatedPortfolio {
  totalValue: number;
  totalChange24h: number;
  networkBreakdown: NetworkBreakdown[];
  topTokens: TokenBalance[];
  allocation: {
    native: number;
    erc20: number;
  };
}

class PortfolioAggregator {
  static aggregate(rawPortfolio: Portfolio): AggregatedPortfolio {
    const networks = Object.values(rawPortfolio.networks);
    
    const totalValue = networks.reduce((sum, network) => sum + network.totalValue, 0);
    
    const allTokens = networks.flatMap(network => [
      {
        ...network.nativeBalance,
        networkId: network.networkId,
        isNative: true
      },
      ...network.tokens.map(token => ({
        ...token,
        networkId: network.networkId,
        isNative: false
      }))
    ]);
    
    const topTokens = allTokens
      .sort((a, b) => (b.value || 0) - (a.value || 0))
      .slice(0, 10);
      
    const allocation = this.calculateAllocation(allTokens);
    
    return {
      totalValue,
      totalChange24h: this.calculate24hChange(allTokens),
      networkBreakdown: this.calculateNetworkBreakdown(networks),
      topTokens,
      allocation
    };
  }
}
```

## 🔧 Error Handling Strategy

### API Error Handling
```typescript
class APIErrorHandler {
  static handle(error: any, context: string) {
    if (error.code === 'NETWORK_ERROR') {
      return {
        type: 'NETWORK_ERROR',
        message: 'Please check your internet connection',
        retry: true
      };
    }
    
    if (error.code === 'RATE_LIMITED') {
      return {
        type: 'RATE_LIMITED', 
        message: 'Too many requests. Please wait a moment.',
        retry: true,
        retryAfter: error.retryAfter
      };
    }
    
    if (error.code === 'INVALID_ADDRESS') {
      return {
        type: 'INVALID_ADDRESS',
        message: 'Please enter a valid blockchain address',
        retry: false
      };
    }
    
    return {
      type: 'UNKNOWN_ERROR',
      message: 'Something went wrong. Please try again.',
      retry: true
    };
  }
}
```

### Query Error Boundaries
```typescript
export const PortfolioErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ErrorBoundary
      fallback={({ error, reset }) => (
        <View className="p-4 bg-red-50 rounded-lg">
          <Text className="text-red-800 font-medium">
            Failed to load portfolio data
          </Text>
          <Text className="text-red-600 text-sm mt-1">
            {APIErrorHandler.handle(error, 'portfolio').message}
          </Text>
          <Button
            onPress={reset}
            className="mt-3 bg-red-600"
            title="Try Again"
          />
        </View>
      )}
    >
      {children}
    </ErrorBoundary>
  );
};
```

This API integration plan provides a robust foundation for fetching, caching, and managing blockchain data across multiple networks while maintaining good performance and user experience.
