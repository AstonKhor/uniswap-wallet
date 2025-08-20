# Environment Setup Guide

This document explains how to set up environment variables for the Uniswap Wallet application.

## Required Environment Variables

Create a `.env` file in the project root with the following variables:

### Blockchain API Keys (Required for full functionality)

```env
# Alchemy API Key (recommended)
EXPO_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key_here

# OR Infura API Key (alternative)
EXPO_PUBLIC_INFURA_API_KEY=your_infura_api_key_here
```

**Getting API Keys:**
- **Alchemy**: Sign up at [alchemy.com](https://www.alchemy.com) and create a new app
- **Infura**: Sign up at [infura.io](https://infura.io) and create a new project

### Price Data API Keys (Required for portfolio value calculation)

```env
# CoinMarketCap API Key (recommended)
EXPO_PUBLIC_COINMARKETCAP_API_KEY=your_coinmarketcap_api_key_here

# OR CoinGecko API Key (alternative)
EXPO_PUBLIC_COINGECKO_API_KEY=your_coingecko_api_key_here
```

**Getting API Keys:**
- **CoinMarketCap**: Sign up at [coinmarketcap.com/api](https://coinmarketcap.com/api)
- **CoinGecko**: Sign up at [coingecko.com/api](https://www.coingecko.com/api)

### Optional Configuration

```env
# App Configuration
EXPO_PUBLIC_API_BASE_URL=https://api.uniswapwallet.com
EXPO_PUBLIC_ENVIRONMENT=development

# Development Features
EXPO_PUBLIC_ENABLE_DEVTOOLS=true
EXPO_PUBLIC_ENABLE_LOGGING=true

# Custom RPC URLs (optional)
EXPO_PUBLIC_ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/
EXPO_PUBLIC_POLYGON_RPC_URL=https://polygon-mainnet.infura.io/v3/
EXPO_PUBLIC_ARBITRUM_RPC_URL=https://arbitrum-mainnet.infura.io/v3/
EXPO_PUBLIC_OPTIMISM_RPC_URL=https://optimism-mainnet.infura.io/v3/
```

## Environment Validation

The app automatically validates your environment configuration on startup:

- ✅ **Green**: All required keys are configured
- ⚠️ **Yellow**: Missing optional keys (limited functionality)
- ❌ **Red**: Missing required keys (app may not work properly)

## Development vs Production

### Development
- Enable debug logging with `EXPO_PUBLIC_ENABLE_LOGGING=true`
- Enable React Query DevTools with `EXPO_PUBLIC_ENABLE_DEVTOOLS=true`
- Use test API keys if available

### Production
- Set `EXPO_PUBLIC_ENVIRONMENT=production`
- Use production API keys
- Disable debugging features

## Security Notes

- ⚠️ Never commit your `.env` file to version control
- ⚠️ Use `EXPO_PUBLIC_` prefix for client-side variables only
- ⚠️ Sensitive server-side keys should not use the `EXPO_PUBLIC_` prefix
- ⚠️ API keys will be visible in the built app bundle

## Troubleshooting

### "No blockchain API key configured" warning
- Add either `EXPO_PUBLIC_ALCHEMY_API_KEY` or `EXPO_PUBLIC_INFURA_API_KEY` to your `.env` file

### "No price API key configured" warning
- Add either `EXPO_PUBLIC_COINMARKETCAP_API_KEY` or `EXPO_PUBLIC_COINGECKO_API_KEY` to your `.env` file

### Network requests failing
- Verify your API keys are valid and have the correct permissions
- Check that your API keys haven't exceeded their rate limits
- Ensure your `.env` file is in the project root directory

## Example .env File

```env
# Blockchain API
EXPO_PUBLIC_ALCHEMY_API_KEY=your_actual_alchemy_key

# Price API
EXPO_PUBLIC_COINMARKETCAP_API_KEY=your_actual_cmc_key

# App Config
EXPO_PUBLIC_ENVIRONMENT=development
EXPO_PUBLIC_ENABLE_DEVTOOLS=true
EXPO_PUBLIC_ENABLE_LOGGING=true
```

After creating your `.env` file, restart the Expo development server for changes to take effect.
