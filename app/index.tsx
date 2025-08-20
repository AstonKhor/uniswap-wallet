import { router } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  const handleImportWallet = () => {
    router.push('/import-wallet');
  };

  const handleWatchAddress = () => {
    router.push('/wallet-address');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center px-8">
        {/* Unicorn Logo */}
        <View className="items-center mb-20">
          <View className="w-32 h-32 bg-pink-50 rounded-3xl items-center justify-center mb-8">
            <Image 
              className="w-28 h-28" 
              resizeMode="contain" 
              source={require('../assets/images/uniswap-logo.png')}
            />
          </View>
        </View>

        {/* Action Buttons */}
        <View className="w-full space-y-4 absolute bottom-20 flex flex-col items-center gap-3">
          {/* Import Wallet Button */}
          <Pressable
            className="w-[300px] bg-pink-500 rounded-[16px] h-14 px-6 active:opacity-80 justify-center"
            onPress={handleImportWallet}
          >
            <Text className="text-white text-center text-xl font-semibold">
              Import a wallet
            </Text>
          </Pressable>

          {/* Watch Address Button */}
          <Pressable
            className="w-[300px] bg-gray-100 rounded-[16px] h-14 px-6 active:opacity-80 justify-center"
            onPress={handleWatchAddress}
          >
            <Text className="text-gray-900 text-center text-xl font-semibold">
              Watch an address
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
