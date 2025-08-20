# Technical Architecture

## 🏗️ Application Structure

### Folder Structure
```
src/
├── components/           # Reusable UI components
│   ├── common/          # Basic components (Button, Input, Card)
│   ├── portfolio/       # Portfolio-specific components
│   ├── wallet/          # Wallet-specific components
│   └── charts/          # Data visualization components
├── screens/             # Screen components
│   ├── onboarding/     # Welcome, setup screens
│   ├── portfolio/      # Portfolio views
│   ├── wallet/         # Wallet operations
│   └── settings/       # App settings
├── services/           # External integrations
│   ├── blockchain/     # Blockchain API clients
│   ├── storage/        # Local storage utilities
│   └── notifications/ # Push notifications
├── hooks/              # Custom React hooks
├── utils/              # Helper functions
├── types/              # TypeScript type definitions
├── constants/          # App constants
└── navigation/         # Navigation configuration
```

## 🔗 Blockchain Integration

### Supported Networks
```typescript
interface NetworkConfig {
  id: number;
  name: string;
  rpcUrl: string;
  explorerUrl: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

const NETWORKS: Record<string, NetworkConfig> = {
  ethereum: {
    id: 1,
    name: 'Ethereum Mainnet',
    rpcUrl: 'https://eth-mainnet.alchemyapi.io/v2/your-api-key',
    explorerUrl: 'https://etherscan.io',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 }
  },
  polygon: {
    id: 137,
    name: 'Polygon',
    rpcUrl: 'https://polygon-mainnet.alchemyapi.io/v2/your-api-key',
    explorerUrl: 'https://polygonscan.com',
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 }
  },
  optimism: {
    id: 10,
    name: 'Optimism',
    rpcUrl: 'https://opt-mainnet.alchemyapi.io/v2/your-api-key',
    explorerUrl: 'https://optimistic.etherscan.io',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 }
  },
  arbitrum: {
    id: 42161,
    name: 'Arbitrum One',
    rpcUrl: 'https://arb-mainnet.alchemyapi.io/v2/your-api-key',
    explorerUrl: 'https://arbiscan.io',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 }
  }
};
```

### Data Sources

#### Primary APIs
1. **Alchemy**: Primary blockchain data provider
   - Account balances
   - Transaction history
   - Token metadata
   - Gas price estimation

2. **CoinGecko**: Price data and market information
   - Real-time token prices
   - Historical price data
   - Market cap and volume data

3. **TokenLists**: Token information
   - Uniswap default token list
   - Custom curated token lists
   - Token logos and metadata

#### API Rate Limiting Strategy
- Implement exponential backoff
- Queue non-critical requests
- Cache responses aggressively
- Use multiple API keys for redundancy

## 🎨 UI/UX Architecture

### Design System with NativeWind

#### Color Palette
```typescript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#fdf4ff',
          500: '#a855f7',
          900: '#581c87',
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
      }
    }
  }
}
```

#### Component Hierarchy
```typescript
// Base Components
- Button (primary, secondary, ghost variants)
- Input (text, number, password variants)  
- Card (with shadows and borders)
- Badge (status indicators)
- Avatar (for token logos)

// Composite Components
- TokenCard (displays token with balance and value)
- AssetChart (interactive charts)
- TransactionItem (for transaction history)
- NetworkSelector (multi-chain selector)
- PortfolioSummary (overview stats)
```

### Navigation Structure
```typescript
// Navigation types
type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
  InputMethod: undefined;
  AddressInput: undefined;
  SeedPhraseInput: undefined;
  Portfolio: { address: string; inputType: 'address' | 'seed' };
  AssetDetail: { tokenAddress: string; networkId: number };
  Send: { tokenAddress: string; networkId: number };
  TransactionHistory: undefined;
  Settings: undefined;
};

// Bottom tab navigation for main app
type MainTabParamList = {
  Portfolio: undefined;
  Transactions: undefined;
  Send: undefined;
  Settings: undefined;
};
```

## 🔐 Security Architecture

### Seed Phrase Management
```typescript
import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';

class SecureWalletManager {
  private static readonly SEED_PHRASE_KEY = 'encrypted_seed_phrase';
  
  // Store seed phrase with device encryption
  async storeSeedPhrase(seedPhrase: string): Promise<void> {
    await SecureStore.setItemAsync(this.SEED_PHRASE_KEY, seedPhrase, {
      requireAuthentication: true,
      authenticationPrompt: 'Authenticate to store your seed phrase'
    });
  }
  
  // Retrieve seed phrase with biometric authentication
  async retrieveSeedPhrase(): Promise<string | null> {
    const hasAuth = await LocalAuthentication.hasHardwareAsync();
    if (hasAuth) {
      return await SecureStore.getItemAsync(this.SEED_PHRASE_KEY, {
        requireAuthentication: true,
        authenticationPrompt: 'Authenticate to access your wallet'
      });
    }
    return null;
  }
}
```

### Input Validation
```typescript
// Address validation
const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

// Seed phrase validation
const isValidSeedPhrase = (phrase: string): boolean => {
  const words = phrase.trim().split(/\s+/);
  return [12, 15, 18, 21, 24].includes(words.length) && 
         words.every(word => BIP39_WORDLIST.includes(word.toLowerCase()));
};
```

## 📊 State Management

### React Query Configuration
```typescript
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

// Query keys factory
export const queryKeys = {
  portfolio: (address: string) => ['portfolio', address],
  balances: (address: string, networkId: number) => ['balances', address, networkId],
  transactions: (address: string, networkId: number) => ['transactions', address, networkId],
  tokenPrice: (tokenAddress: string) => ['tokenPrice', tokenAddress],
  gasPrice: (networkId: number) => ['gasPrice', networkId],
};
```

### Custom Hooks Pattern
```typescript
// usePortfolio hook
export const usePortfolio = (address: string) => {
  return useQuery({
    queryKey: queryKeys.portfolio(address),
    queryFn: () => portfolioService.getPortfolio(address),
    enabled: !!address && isValidAddress(address),
  });
};

// useTokenBalances hook
export const useTokenBalances = (address: string, networkId: number) => {
  return useQuery({
    queryKey: queryKeys.balances(address, networkId),
    queryFn: () => blockchainService.getBalances(address, networkId),
    enabled: !!address && !!networkId,
    refetchInterval: 30000, // Refresh every 30 seconds
  });
};
```

## 🚀 Performance Optimization

### Image Loading Strategy
```typescript
// Lazy loading for token logos
const TokenLogo = ({ tokenAddress }: { tokenAddress: string }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  
  return (
    <View className="relative">
      {imageLoading && (
        <View className="absolute inset-0 bg-gray-200 animate-pulse rounded-full" />
      )}
      <Image
        source={{ uri: getTokenLogoUrl(tokenAddress) }}
        className="w-8 h-8 rounded-full"
        onLoad={() => setImageLoading(false)}
        onError={() => {
          setImageError(true);
          setImageLoading(false);
        }}
      />
      {imageError && (
        <View className="w-8 h-8 rounded-full bg-gray-300 items-center justify-center">
          <Text className="text-gray-600 text-xs">?</Text>
        </View>
      )}
    </View>
  );
};
```

### Memory Management
- Implement proper cleanup for subscriptions
- Use React.memo for expensive components
- Implement virtualized lists for large datasets
- Cache computed values with useMemo

## 📱 Platform Considerations

### iOS Specific
- Implement iOS design patterns
- Handle safe area insets properly
- Use iOS-appropriate haptic feedback
- Optimize for different screen sizes

### Android Specific  
- Follow Material Design principles
- Handle Android back button behavior
- Implement proper permission handling
- Optimize for various screen densities

## 🔧 Development Tools

### Code Quality
- ESLint with TypeScript rules
- Prettier for code formatting
- Husky for pre-commit hooks
- Conventional commits

### Testing Strategy
- Jest for unit testing
- React Native Testing Library for component testing
- Detox for E2E testing
- MSW for API mocking

### Monitoring
- Expo Analytics for usage tracking
- Sentry for error monitoring
- Performance monitoring with Flipper
- Custom logging for debugging
