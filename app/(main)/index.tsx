import { Icon } from '@/components';
import { getWalletData } from '@/utils/storage';
import { formatWalletAddress } from '@/utils/validation';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type NetworkFilter = 'all' | 'ethereum' | 'arbitrum' | 'optimism' | 'polygon';

// Mock token data for the design
const mockTokens = [
  { id: '1', name: 'Ethereum', symbol: 'ETH', balance: '0.138', network: 'ethereum', icon: <Image className="w-5 h-5" source={require('@/assets/images/ethereum.png')} />, color: '#627EEA' },
  { id: '2', name: 'Ethereum', symbol: 'ETH', balance: '0.138', network: 'arbitrum', icon: <Image className="w-5 h-5" source={require('@/assets/images/ethereum.png')} />, color: '#627EEA', networkBadge: <Image className="w-5 h-5" source={require('@/assets/images/arbitrum.png')} /> },
  { id: '3', name: 'Ethereum', symbol: 'ETH', balance: '0.138', network: 'optimism', icon: <Image className="w-5 h-5" source={require('@/assets/images/ethereum.png')} />, color: '#627EEA', networkBadge: <Image className="w-5 h-5" source={require('@/assets/images/optimism.png')} /> },
  { id: '4', name: 'Polygon Matic', symbol: 'MATIC', balance: '123', network: 'polygon', icon: <Image className="w-5 h-5" source={require('@/assets/images/polygon.png')} />, color: '#8247E5' },
  { id: '5', name: 'A Token name', symbol: 'XYZ', balance: '123.12M', network: 'ethereum', icon: null, color: '#6366f1' },
  { id: '6', name: 'B Token name', symbol: 'XYZ', balance: '123.12M', network: 'ethereum', icon: null, color: '#8b5cf6' },
];

export default function PortfolioScreen() {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [walletType, setWalletType] = useState<string>('');
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkFilter>('all');

  useEffect(() => {
    const loadWalletData = async () => {
      try {
        const { address, type } = await getWalletData();
        setWalletAddress(address || '');
        setWalletType(type || '');
      } catch (error) {
        console.error('Failed to load wallet data:', error);
      }
    };

    loadWalletData();
  }, []);

  const filteredTokens = selectedNetwork === 'all' 
    ? mockTokens 
    : mockTokens.filter(token => token.network === selectedNetwork);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="px-6 pt-4">
          <View className="items-center mb-8">
            <View className="w-16 h-16 bg-pink-100 rounded-full items-center justify-center mb-3">
              {/* TODO: change to use theming */}
              <Icon color="#FC74FE" name="card" size={24} />
            </View>
            <Text className="text-gray-900 text-xl font-medium">
              {walletAddress ? formatWalletAddress(walletAddress) : '0x123...8e0a'}
            </Text>
          </View>

          <ScrollView horizontal className="mb-6" showsHorizontalScrollIndicator={false}>
            <View className="flex-row space-x-3 px-1 flex gap-2">
              {[
                { key: 'all', label: 'All', icon: 
                  <View className="w-5 h-5">
                    <View className="flex-row gap-0.5 mb-0.5">
                      <Image className="w-2 h-2" source={require('@/assets/images/ethereum.png')} />
                      <Image className="w-2 h-2" source={require('@/assets/images/optimism.png')} />
                    </View>
                    <View className="flex-row gap-0.5">
                      <Image className="w-2 h-2" source={require('@/assets/images/arbitrum.png')} />
                      <Image className="w-2 h-2" source={require('@/assets/images/polygon.png')} />
                    </View>
                  </View>
                },
                { key: 'ethereum', label: 'Ethereum', icon: <Image className="w-5 h-5" source={require('@/assets/images/ethereum.png')} /> },
                { key: 'arbitrum', label: 'Arbitrum', icon: <Image className="w-5 h-5" source={require('@/assets/images/arbitrum.png')} /> },
                { key: 'optimism', label: 'Optimism', icon: <Image className="w-5 h-5" source={require('@/assets/images/optimism.png')} /> },
                { key: 'polygon', label: 'Polygon', icon: <Image className="w-5 h-5" source={require('@/assets/images/polygon.png')} /> },
              ].map((network) => (
                <Pressable
                  key={network.key}
                  className={`flex-row items-center px-2 py-2 pr-4 rounded-2xl ${
                    selectedNetwork === network.key
                      ? 'bg-gray-200 border border-gray-300'
                      : 'bg-gray-100'
                  }`}
                  onPress={() => setSelectedNetwork(network.key as NetworkFilter)}
                >
                  <View className="mr-2">{network.icon}</View>
                  <Text className={`font-bold ${
                    selectedNetwork === network.key ? 'text-gray-900' : 'text-gray-700'
                  }`}>
                    {network.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>

          <View className="space-y-3">
            {filteredTokens.map((token) => (
              <View key={token.id} className="p-4">
                <View className="flex-row items-center">
                  <View className="relative mr-4">
                    <View 
                      className="w-12 h-12 rounded-full items-center justify-center"
                      style={{ backgroundColor: token.color }}
                    >
                      {token.icon ? (
                        <Text className="text-white text-xl font-bold">
                          {token.icon}
                        </Text>
                      ) : (
                        <Text className="text-white text-xl font-bold">
                          {token.name.charAt(0).toUpperCase()}
                        </Text>
                      )}
                    </View>
                    
                    {token.networkBadge && (
                      <View className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full border border-gray-200 items-center justify-center">
                        <Text className="text-xs">{token.networkBadge}</Text>
                      </View>
                    )}
                  </View>

                  <View className="flex-1">
                    <Text className="text-gray-900 text-lg font-medium">
                      {token.name}
                    </Text>
                  </View>

                  <View className="items-end">
                    <Text className="text-gray-900 text-lg font-semibold">
                      {token.balance} {token.symbol}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
