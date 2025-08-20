import { BaseComponentProps } from '@/types';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, TextInputProps, View } from 'react-native';

type InputVariant = 'default' | 'filled' | 'ghost';
type InputSize = 'sm' | 'md' | 'lg';

interface InputProps extends Omit<TextInputProps, 'className'>, BaseComponentProps {
  variant?: InputVariant;
  size?: InputSize;
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
}

const getInputContainerStyles = (variant: InputVariant, size: InputSize, hasError: boolean, isFocused: boolean) => {
  const baseClass = 'flex-row items-center rounded-xl border';
  
  // Size variants
  const sizeClasses = {
    sm: 'px-3 py-2',
    md: 'px-4 py-3',
    lg: 'px-5 py-4',
  };

  // Variant and state classes
  let variantClass = '';
  if (hasError) {
    variantClass = 'border-error bg-error/5';
  } else if (isFocused) {
    variantClass = variant === 'filled'
      ? 'border-primary bg-surface-light'
      : variant === 'ghost'
      ? 'border-surface-light bg-transparent'
      : 'border-primary bg-background';
  } else {
    variantClass = variant === 'filled'
      ? 'border-surface-light bg-surface'
      : variant === 'ghost'
      ? 'border-transparent bg-transparent'
      : 'border-surface-light bg-background';
  }

  return `${baseClass} ${sizeClasses[size]} ${variantClass}`;
};

const getInputStyles = (size: InputSize) => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return `flex-1 text-text-primary ${sizeClasses[size]}`;
};

export const Input: React.FC<InputProps> = ({
  variant = 'default',
  size = 'md',
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  onRightIconPress,
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={`${className}`}>
      {label && (
        <Text className="text-text-primary font-medium mb-2">
          {label}
        </Text>
      )}
      
      <View className={getInputContainerStyles(variant, size, !!error, isFocused)}>
        {leftIcon && (
          <View className="mr-3">
            {leftIcon}
          </View>
        )}
        
        <TextInput
          className={getInputStyles(size)}
          placeholderTextColor="#737373"
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          {...props}
        />
        
        {rightIcon && (
          <Pressable
            className="ml-3"
            onPress={onRightIconPress}
          >
            {rightIcon}
          </Pressable>
        )}
      </View>
      
      {(error || helperText) && (
        <Text className={`text-sm mt-2 ${error ? 'text-error' : 'text-text-muted'}`}>
          {error || helperText}
        </Text>
      )}
    </View>
  );
};
