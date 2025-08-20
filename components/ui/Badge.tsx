import { BaseComponentProps } from '@/types';
import React from 'react';
import { Text, View } from 'react-native';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps extends BaseComponentProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  label: string;
  dot?: boolean;
}

const getBadgeStyles = (variant: BadgeVariant, size: BadgeSize, dot: boolean) => {
  const baseClass = 'rounded-full items-center justify-center';
  
  // Size variants
  const sizeClasses = dot ? {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  } : {
    sm: 'px-2 py-1 min-w-5 h-5',
    md: 'px-3 py-1.5 min-w-6 h-6',
    lg: 'px-4 py-2 min-w-8 h-8',
  };

  // Variant classes
  const variantClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary', 
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
    neutral: 'bg-surface-light',
  };

  return `${baseClass} ${sizeClasses[size]} ${variantClasses[variant]}`;
};

const getTextStyles = (variant: BadgeVariant, size: BadgeSize) => {
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-xs',
    lg: 'text-sm',
  };

  const variantClasses = {
    primary: 'text-white',
    secondary: 'text-white',
    success: 'text-white',
    warning: 'text-white',
    error: 'text-white',
    neutral: 'text-text-primary',
  };

  return `font-semibold ${sizeClasses[size]} ${variantClasses[variant]}`;
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  size = 'md',
  label,
  dot = false,
  className = '',
}) => {
  return (
    <View className={`${getBadgeStyles(variant, size, dot)} ${className}`}>
      {!dot && (
        <Text className={getTextStyles(variant, size)}>
          {label}
        </Text>
      )}
    </View>
  );
};
