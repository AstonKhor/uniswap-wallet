import { Stack } from 'expo-router';
import App from '../App';

export default function RootLayout() {
  return (
    <App>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#ffffff' },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="wallet-address" />
        <Stack.Screen name="import-wallet" />
        <Stack.Screen name="(main)" />
      </Stack>
    </App>
  );
}
