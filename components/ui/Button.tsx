import { BaseComponentProps } from '@/types';
import React from 'react';
import { ActivityIndicator, Pressable, PressableProps, Text } from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends PressableProps, BaseComponentProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  title: string;
}

const getButtonStyles = (variant: ButtonVariant, size: ButtonSize, disabled: boolean) => {
  const baseClass = 'items-center justify-center rounded-xl';
  
  // Size variants
  const sizeClasses = {
    sm: 'px-3 py-2',
    md: 'px-4 py-3',
    lg: 'px-6 py-4',
  };

  // Variant classes
  const variantClasses = {
    primary: disabled 
      ? 'bg-gray-400' 
      : 'bg-primary active:opacity-80',
    secondary: disabled
      ? 'bg-gray-400'
      : 'bg-secondary active:opacity-80',
    outline: disabled
      ? 'border border-gray-400'
      : 'border border-primary active:bg-primary/10',
    ghost: disabled
      ? ''
      : 'active:bg-surface-light',
    danger: disabled
      ? 'bg-gray-400'
      : 'bg-error active:opacity-80',
  };

  return `${baseClass} ${sizeClasses[size]} ${variantClasses[variant]}`;
};

const getTextStyles = (variant: ButtonVariant, size: ButtonSize, disabled: boolean) => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const variantClasses = {
    primary: disabled ? 'text-gray-600' : 'text-white font-semibold',
    secondary: disabled ? 'text-gray-600' : 'text-white font-semibold',
    outline: disabled ? 'text-gray-400' : 'text-primary font-semibold',
    ghost: disabled ? 'text-gray-400' : 'text-text-primary font-medium',
    danger: disabled ? 'text-gray-600' : 'text-white font-semibold',
  };

  return `${sizeClasses[size]} ${variantClasses[variant]} text-center`;
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  title,
  className = '',
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      className={`${getButtonStyles(variant, size, isDisabled)} ${className}`}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' || variant === 'ghost' ? '#6366f1' : 'white'}
          size="small"
        />
      ) : (
        <Text className={getTextStyles(variant, size, isDisabled)}>
          {title}
        </Text>
      )}
    </Pressable>
  );
};
