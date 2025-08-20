import { BaseComponentProps } from '@/types';
import React from 'react';
import { Pressable, PressableProps, View, ViewProps } from 'react-native';

type CardVariant = 'default' | 'elevated' | 'outlined' | 'filled';
type CardSize = 'sm' | 'md' | 'lg';

interface BaseCardProps extends BaseComponentProps {
  variant?: CardVariant;
  size?: CardSize;
}

interface CardProps extends BaseCardProps, ViewProps {
  pressable?: false;
}

interface PressableCardProps extends BaseCardProps, PressableProps {
  pressable: true;
}

type CardComponent = React.FC<CardProps> | React.FC<PressableCardProps>;

const getCardStyles = (variant: CardVariant, size: CardSize) => {
  const baseClass = 'rounded-2xl';
  
  // Size variants
  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  // Variant classes
  const variantClasses = {
    default: 'bg-surface',
    elevated: 'bg-surface shadow-lg elevation-4',
    outlined: 'bg-background border border-surface-light',
    filled: 'bg-surface-light',
  };

  return `${baseClass} ${sizeClasses[size]} ${variantClasses[variant]}`;
};

export const Card: CardComponent = ({
  variant = 'default',
  size = 'md',
  children,
  className = '',
  pressable,
  ...props
}: any) => {
  const cardStyles = `${getCardStyles(variant, size)} ${className}`;

  if (pressable) {
    return (
      <Pressable
        className={`${cardStyles} active:opacity-80`}
        {...(props as PressableProps)}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View
      className={cardStyles}
      {...(props as ViewProps)}
    >
      {children}
    </View>
  );
};
