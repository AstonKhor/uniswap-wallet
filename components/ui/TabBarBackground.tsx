import { BlurView } from 'expo-blur';
import React from 'react';
import { Platform, View } from 'react-native';

const TabBarBackground = () => {
  // On iOS, use blur effect for a modern look
  if (Platform.OS === 'ios') {
    return (
      <BlurView
        intensity={80}
        style={{
          flex: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
        }}
        tint="light"
      />
    );
  }

  // On Android, use solid background
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
      }}
    />
  );
};

export default TabBarBackground;
