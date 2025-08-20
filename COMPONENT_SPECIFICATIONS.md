# Component Specifications & UI Flow

## 📱 Screen Components & User Flow

Based on the wireframes provided, here are the detailed component specifications:

### 1. Onboarding Flow

#### Welcome Screen (`/screens/onboarding/WelcomeScreen.tsx`)
```typescript
interface WelcomeScreenProps {
  navigation: NavigationProp<RootStackParamList, 'Welcome'>;
}

// Features:
- App logo and branding
- Brief description of app capabilities
- "Get Started" CTA button
- Terms of service and privacy policy links
- Smooth animations and transitions
```

#### Input Method Selection (`/screens/onboarding/InputMethodScreen.tsx`)
```typescript
interface InputMethodScreenProps {
  navigation: NavigationProp<RootStackParamList, 'InputMethod'>;
}

// Two main options with visual icons:
1. "Watch an Address" - for portfolio tracking only
   - Icon: Eye or magnifying glass
   - Description: "View portfolio without sending capability"
   
2. "Import a Wallet" - for full wallet functionality  
   - Icon: Wallet or key
   - Description: "Full access including sending transactions"
   
// UI Elements:
- Large, tappable card components
- Clear visual distinction between options
- Back navigation to welcome screen
- Forward navigation based on selection
```

### 2. Input Screens

#### Address Input Screen (`/screens/input/AddressInputScreen.tsx`)
```typescript
interface AddressInputScreenProps {
  navigation: NavigationProp<RootStackParamList, 'AddressInput'>;
}

// Components needed:
- AddressInput component with validation
- QR code scanner button
- Paste from clipboard functionality
- Real-time address validation feedback
- "Continue" button (disabled until valid address)
- Example address format helper text

// Validation states:
- Empty state
- Invalid format (visual feedback)
- Valid address (green checkmark)
- Loading state while validating
```

#### Seed Phrase Input Screen (`/screens/input/SeedPhraseInputScreen.tsx`)
```typescript
interface SeedPhraseInputScreenProps {
  navigation: NavigationProp<RootStackParamList, 'SeedPhraseInput'>;
}

// Security-focused design:
- Multi-line text input with word suggestions
- Word count indicator (12, 15, 18, 21, or 24 words)
- BIP39 wordlist validation
- Paste functionality with auto-formatting
- Clear security warnings and disclaimers
- Biometric authentication setup option
- "Import Wallet" button (enabled when valid)

// Security features:
- Screen recording prevention
- Screenshot prevention
- Secure text entry
- Clear warnings about seed phrase security
```

### 3. Portfolio Screens

#### Portfolio Overview (`/screens/portfolio/PortfolioOverviewScreen.tsx`)
```typescript
interface PortfolioOverviewScreenProps {
  route: RouteProp<RootStackParamList, 'Portfolio'>;
  navigation: NavigationProp<RootStackParamList, 'Portfolio'>;
}

// Layout structure:
1. Header Section:
   - Wallet address (truncated with copy functionality)
   - Total portfolio value (large, prominent)
   - 24h change (with color coding)
   
2. Network Tabs:
   - Ethereum, Polygon, Optimism, Arbitrum
   - Each showing network-specific balance
   - Active tab highlighting
   
3. Asset List:
   - TokenCard components for each asset
   - Native tokens listed first
   - Sorted by value (highest first)
   - Infinite scroll for large portfolios
   
4. Quick Actions (if seed phrase user):
   - Send button
   - Receive button (QR code)
   - Refresh portfolio button
```

#### Network Specific View (`/screens/portfolio/NetworkPortfolioScreen.tsx`)
```typescript
interface NetworkPortfolioScreenProps {
  route: RouteProp<RootStackParamList, 'NetworkPortfolio'>;
}

// Focused view for single network:
- Network header with logo and name
- Native token balance prominently displayed  
- ERC-20 tokens list
- Network-specific transaction history
- Network explorer links
- Gas price information
```

### 4. Asset Components

#### TokenCard (`/components/portfolio/TokenCard.tsx`)
```typescript
interface TokenCardProps {
  token: TokenBalance;
  networkId: number;
  onPress?: () => void;
  showNetwork?: boolean;
}

// Visual layout:
┌─────────────────────────────────────────┐
│ [🟡] ETH                        0.5 ETH │
│      Ethereum               $1,234.56   │
│                                ↗ +2.3%  │
└─────────────────────────────────────────┘

// Interactive elements:
- Tap to view asset details
- Token logo with fallback
- Balance and USD value
- 24h price change indicator
- Network indicator (if multi-network view)
- Loading skeleton while data loads
```

#### AssetDetailSheet (`/components/portfolio/AssetDetailSheet.tsx`)
```typescript
interface AssetDetailSheetProps {
  token: TokenBalance;
  networkId: number;
  isVisible: boolean;
  onClose: () => void;
}

// Bottom sheet content:
1. Token Information:
   - Large token logo
   - Token name and symbol
   - Contract address (with copy)
   - Network information
   
2. Balance & Value:
   - Token balance
   - USD value
   - Price per token
   - 24h change
   
3. Price Chart:
   - 7-day price history
   - Interactive chart with data points
   - Time period selector (24h, 7d, 30d)
   
4. Actions (if wallet user):
   - Send token button
   - Add to watchlist
   - View on explorer
```

### 5. Creative Visualization Components

#### PortfolioChart (`/components/charts/PortfolioChart.tsx`)
```typescript
interface PortfolioChartProps {
  portfolio: AggregatedPortfolio;
  timeframe: '24h' | '7d' | '30d' | '1y';
}

// Chart types to implement:
1. Pie Chart - Asset allocation
2. Donut Chart - Network distribution  
3. Line Chart - Portfolio value over time
4. Bar Chart - Top tokens by value
5. Treemap - Asset allocation with hierarchical view

// Interactive features:
- Tap segments to highlight
- Drill-down capabilities
- Animation on data changes
- Responsive design for different screen sizes
```

#### NetworkDistributionCard (`/components/portfolio/NetworkDistributionCard.tsx`)
```typescript
// Visual representation of portfolio across networks:
┌─────────────────────────────────────────┐
│ Network Distribution                     │
│                                         │
│ ████████ Ethereum (45%)      $2,340     │
│ ████     Polygon (23%)       $1,150     │  
│ ██       Arbitrum (18%)      $890       │
│ █        Optimism (14%)      $720       │
│                                         │
│ Total across 4 networks      $5,100     │
└─────────────────────────────────────────┘
```

### 6. Transaction Components

#### TransactionHistory (`/components/transactions/TransactionHistory.tsx`)
```typescript
interface TransactionHistoryProps {
  address: string;
  networkId?: number;
}

// Features:
- Infinite scroll loading
- Transaction grouping by date
- Filter by transaction type
- Search functionality
- Pull-to-refresh
- Empty state handling
```

#### TransactionItem (`/components/transactions/TransactionItem.tsx`)
```typescript
interface TransactionItemProps {
  transaction: Transaction;
  onPress?: () => void;
}

// Layout:
┌─────────────────────────────────────────┐
│ [↗] Sent ETH                    2h ago   │
│     To: 0x742d...9C4A          -0.1 ETH │
│     Fee: 0.003 ETH            -$156.30   │
└─────────────────────────────────────────┘

// Status indicators:
- Success: Green checkmark
- Pending: Orange clock
- Failed: Red X
- Confirmed: Blue checkmark
```

### 7. Send Flow Components

#### SendScreen (`/screens/wallet/SendScreen.tsx`)
```typescript
interface SendScreenProps {
  route: RouteProp<RootStackParamList, 'Send'>;
}

// Multi-step process:
1. Asset Selection
2. Recipient Input  
3. Amount Input
4. Review & Confirm
5. Transaction Status

// Form validation:
- Real-time balance checking
- Address validation
- Amount validation (insufficient funds, etc.)
- Gas estimation
```

#### RecipientInput (`/components/wallet/RecipientInput.tsx`)
```typescript
interface RecipientInputProps {
  onAddressChange: (address: string) => void;
  value: string;
}

// Features:
- Address input with validation
- QR code scanner integration
- Address book integration (future feature)
- ENS resolution (future feature)
- Paste from clipboard
- Recent addresses suggestions
```

#### AmountInput (`/components/wallet/AmountInput.tsx`)
```typescript
interface AmountInputProps {
  token: TokenBalance;
  onAmountChange: (amount: string) => void;
  value: string;
}

// Features:
- Numeric keypad integration
- Max balance button
- USD value conversion
- Balance validation
- Percentage quick selection (25%, 50%, 75%, Max)
```

### 8. Loading & Error States

#### SkeletonComponents
```typescript
// PortfolioSkeleton
- Animated placeholder cards
- Shimmer effects
- Proper aspect ratios

// TokenCardSkeleton  
- Placeholder for token logo
- Animated text placeholders
- Consistent with actual component layout

// ChartSkeleton
- Placeholder chart shapes
- Loading animation
```

#### ErrorComponents
```typescript
// EmptyPortfolio
- Illustration or icon
- Helpful message
- Action buttons (refresh, change address)

// NetworkError
- Connection error illustration
- Retry functionality
- Offline mode indicator

// TransactionError
- Clear error messaging
- Retry options
- Support contact information
```

### 9. Conditional Rendering Logic

#### Address vs Seed Phrase User Experience
```typescript
// Different UI based on input type:
interface UserCapabilities {
  canSend: boolean;
  canSign: boolean;
  inputType: 'address' | 'seed';
}

// Address-only users see:
- Portfolio view (read-only)
- Transaction history
- Asset details
- Network information

// Seed phrase users additionally see:
- Send functionality
- Transaction signing
- Wallet management
- Security settings
```

#### Loading State Hierarchy
```typescript
// Progressive loading strategy:
1. Show skeleton screens immediately
2. Load basic portfolio structure
3. Fetch token balances in parallel
4. Load price data and enrichment
5. Fetch transaction history
6. Load additional metadata (logos, etc.)

// Error handling per data layer:
- Critical: Address validation, basic balances
- Important: Price data, transaction history
- Nice-to-have: Token logos, detailed metadata
```

### 10. Responsive Design Considerations

#### Screen Size Adaptations
```typescript
// Phone portrait (default)
- Single column layout
- Bottom sheet modals
- Tab navigation

// Phone landscape
- Adjusted component spacing
- Horizontal scrolling where appropriate
- Optimized input layouts

// Tablet support (future)
- Multi-column layouts
- Sidebar navigation
- Modal presentations
```

This component specification provides a comprehensive guide for implementing the UI components based on modern React Native best practices and the user flow indicated in your wireframes.
