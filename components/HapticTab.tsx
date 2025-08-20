import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Pressable } from 'react-native';

export const HapticTab = ({
  onPress,
  children,
  style,
  accessible,
  accessibilityLabel,
  accessibilityRole,
  accessibilityState,
}: BottomTabBarButtonProps) => {
  const handlePress = (e: any) => {
    // Provide haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.(e);
  };

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      accessibilityState={accessibilityState}
      accessible={accessible}
      style={style}
      onPress={handlePress}
    >
      {children}
    </Pressable>
  );
};
