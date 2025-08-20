import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
    
    // Log error for monitoring/debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // TODO: Send to crash reporting service (Sentry, Bugsnag, etc.)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <SafeAreaView className="flex-1 bg-white">
          <View className="flex-1 justify-center items-center px-8">
            <View className="items-center mb-8">
              <Text className="text-6xl mb-4">⚠️</Text>
              <Text className="text-gray-900 text-2xl font-bold text-center mb-2">
                Something went wrong
              </Text>
              <Text className="text-gray-600 text-center leading-relaxed">
                We encountered an unexpected error. Please try again or restart the app.
              </Text>
            </View>

            {__DEV__ && this.state.error && (
              <View className="bg-gray-100 p-4 rounded-lg mb-6 w-full">
                <Text className="text-red-600 text-sm font-mono">
                  {this.state.error.toString()}
                </Text>
              </View>
            )}

            <View className="w-full space-y-3">
              <Pressable
                className="w-full bg-pink-500 rounded-xl py-4 px-6 active:opacity-80"
                onPress={this.handleRetry}
              >
                <Text className="text-white text-center font-semibold">
                  Try Again
                </Text>
              </Pressable>

              <Pressable
                className="w-full bg-gray-100 rounded-xl py-4 px-6 active:opacity-80"
                onPress={() => {
                  // TODO: Add restart app functionality
                  console.log('Restart app requested');
                }}
              >
                <Text className="text-gray-900 text-center font-semibold">
                  Restart App
                </Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      );
    }

    return this.props.children;
  }
}
