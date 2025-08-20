import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SendScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1">
        <View className="p-6">
          <Text className="text-text-primary text-3xl font-bold mb-2">Send</Text>
          <Text className="text-text-secondary mb-6">Send crypto to any address</Text>

          {/* Disabled State for Address-Only Users */}
          <View className="bg-surface rounded-2xl p-6 mb-6">
            <View className="items-center py-8">
              <View className="w-20 h-20 bg-surface-light rounded-full items-center justify-center mb-4">
                <Text className="text-3xl">🔒</Text>
              </View>
              <Text className="text-text-primary text-xl font-semibold mb-2">Wallet Required</Text>
              <Text className="text-text-secondary text-center mb-6">
                To send transactions, you need to import your wallet with a seed phrase
              </Text>
              <View className="bg-primary/20 rounded-xl p-4 w-full">
                <Text className="text-primary text-center font-semibold">Import Seed Phrase</Text>
              </View>
            </View>
          </View>

          {/* Feature Preview */}
          <Text className="text-text-primary text-lg font-semibold mb-4">Send Features</Text>
          <View className="space-y-3">
            <View className="bg-surface rounded-xl p-4 flex-row items-center opacity-50">
              <View className="w-10 h-10 bg-surface-light rounded-full items-center justify-center mr-4">
                <Text className="text-xl">💸</Text>
              </View>
              <View className="flex-1">
                <Text className="text-text-primary font-semibold">Multi-Chain Support</Text>
                <Text className="text-text-secondary text-sm">
                  Send on Ethereum, Polygon, Arbitrum, and Optimism
                </Text>
              </View>
            </View>

            <View className="bg-surface rounded-xl p-4 flex-row items-center opacity-50">
              <View className="w-10 h-10 bg-surface-light rounded-full items-center justify-center mr-4">
                <Text className="text-xl">⚡</Text>
              </View>
              <View className="flex-1">
                <Text className="text-text-primary font-semibold">Gas Optimization</Text>
                <Text className="text-text-secondary text-sm">
                  Automatic gas fee estimation and optimization
                </Text>
              </View>
            </View>

            <View className="bg-surface rounded-xl p-4 flex-row items-center opacity-50">
              <View className="w-10 h-10 bg-surface-light rounded-full items-center justify-center mr-4">
                <Text className="text-xl">🔍</Text>
              </View>
              <View className="flex-1">
                <Text className="text-text-primary font-semibold">Address Validation</Text>
                <Text className="text-text-secondary text-sm">
                  Automatic validation and ENS name resolution
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
