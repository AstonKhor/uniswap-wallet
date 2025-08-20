import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1">
        <View className="p-6">
          <Text className="text-text-primary text-3xl font-bold mb-2">Settings</Text>
          <Text className="text-text-secondary mb-6">Manage your wallet and app preferences</Text>

          {/* Account Section */}
          <Text className="text-text-primary text-lg font-semibold mb-3">Account</Text>
          <View className="bg-surface rounded-xl mb-6">
            <View className="p-4 border-b border-surface-light">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-surface-light rounded-full items-center justify-center mr-4">
                  <Text className="text-xl">👤</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-text-primary font-semibold">Wallet Type</Text>
                  <Text className="text-text-secondary text-sm">Address Only</Text>
                </View>
              </View>
            </View>

            <View className="p-4 border-b border-surface-light">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-surface-light rounded-full items-center justify-center mr-4">
                  <Text className="text-xl">🔗</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-text-primary font-semibold">Connected Networks</Text>
                  <Text className="text-text-secondary text-sm">4 networks active</Text>
                </View>
              </View>
            </View>

            <View className="p-4">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-surface-light rounded-full items-center justify-center mr-4">
                  <Text className="text-xl">📊</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-text-primary font-semibold">Portfolio Refresh</Text>
                  <Text className="text-text-secondary text-sm">Auto-refresh every 5 minutes</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Security Section */}
          <Text className="text-text-primary text-lg font-semibold mb-3">Security</Text>
          <View className="bg-surface rounded-xl mb-6">
            <View className="p-4 border-b border-surface-light">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-surface-light rounded-full items-center justify-center mr-4">
                  <Text className="text-xl">🔐</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-text-primary font-semibold">Import Seed Phrase</Text>
                  <Text className="text-text-secondary text-sm">Enable sending transactions</Text>
                </View>
              </View>
            </View>

            <View className="p-4 border-b border-surface-light opacity-50">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-surface-light rounded-full items-center justify-center mr-4">
                  <Text className="text-xl">👆</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-text-primary font-semibold">Biometric Lock</Text>
                  <Text className="text-text-secondary text-sm">Requires seed phrase import</Text>
                </View>
              </View>
            </View>

            <View className="p-4 opacity-50">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-surface-light rounded-full items-center justify-center mr-4">
                  <Text className="text-xl">💾</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-text-primary font-semibold">Backup Wallet</Text>
                  <Text className="text-text-secondary text-sm">Requires seed phrase import</Text>
                </View>
              </View>
            </View>
          </View>

          {/* App Section */}
          <Text className="text-text-primary text-lg font-semibold mb-3">App</Text>
          <View className="bg-surface rounded-xl mb-6">
            <View className="p-4 border-b border-surface-light">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-surface-light rounded-full items-center justify-center mr-4">
                  <Text className="text-xl">🌙</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-text-primary font-semibold">Theme</Text>
                  <Text className="text-text-secondary text-sm">Dark mode</Text>
                </View>
              </View>
            </View>

            <View className="p-4 border-b border-surface-light">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-surface-light rounded-full items-center justify-center mr-4">
                  <Text className="text-xl">💱</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-text-primary font-semibold">Currency</Text>
                  <Text className="text-text-secondary text-sm">USD ($)</Text>
                </View>
              </View>
            </View>

            <View className="p-4">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-surface-light rounded-full items-center justify-center mr-4">
                  <Text className="text-xl">ℹ️</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-text-primary font-semibold">About</Text>
                  <Text className="text-text-secondary text-sm">Version 1.0.0</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
