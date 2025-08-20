import { BaseComponentProps } from '@/types';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

type SpinnerSize = 'sm' | 'md' | 'lg';
type SpinnerColor = 'primary' | 'secondary' | 'white' | 'muted';

interface LoadingSpinnerProps extends BaseComponentProps {
  size?: SpinnerSize;
  color?: SpinnerColor;
  centered?: boolean;
}

const getSizeValue = (size: SpinnerSize): 'small' | 'large' => {
  switch (size) {
    case 'sm':
      return 'small';
    case 'lg':
      return 'large';
    default:
      return 'small';
  }
};

const getColorValue = (color: SpinnerColor): string => {
  switch (color) {
    case 'primary':
      return '#6366f1';
    case 'secondary':
      return '#8b5cf6';
    case 'white':
      return '#ffffff';
    case 'muted':
      return '#737373';
    default:
      return '#6366f1';
  }
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  centered = false,
  className = '',
}) => {
  const containerClass = centered 
    ? `flex-1 justify-center items-center ${className}` 
    : className;

  return (
    <View className={containerClass}>
      <ActivityIndicator 
        color={getColorValue(color)} 
        size={getSizeValue(size)} 
      />
    </View>
  );
};
