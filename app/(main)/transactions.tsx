import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TransactionsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1">
        <View className="p-6">
          <Text className="text-text-primary text-3xl font-bold mb-2">Transactions</Text>
          <Text className="text-text-secondary mb-6">
            Your transaction history across all networks
          </Text>

          {/* Empty State */}
          <View className="flex-1 items-center justify-center py-20">
            <View className="w-24 h-24 bg-surface-light rounded-full items-center justify-center mb-6">
              <Text className="text-4xl">📝</Text>
            </View>
            <Text className="text-text-primary text-xl font-semibold mb-2">
              No Transactions Yet
            </Text>
            <Text className="text-text-secondary text-center px-8">
              Your transaction history will appear here once you start using your wallet
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
