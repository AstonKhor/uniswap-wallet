import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons
} from '@expo/vector-icons';
import React from 'react';

// Crypto-specific icons for your wallet app
export type CryptoIconName = 
  | 'wallet' | 'wallet-outline'
  | 'card' | 'card-outline'
  | 'send' | 'receive'
  | 'swap' | 'history'
  | 'settings' | 'security' | 'document'
  | 'copy' | 'qr-code'
  | 'check' | 'close'
  | 'eye' | 'eye-off'
  | 'back' | 'forward'
  | 'add' | 'remove'
  | 'warning' | 'error' | 'success'
  | 'ethereum' | 'bitcoin';

interface IconProps {
  name: CryptoIconName;
  size?: number;
  color?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 24, color = '#000000' }) => {
  // Map crypto-specific names to actual icon families
  switch (name) {
    // Wallet & Finance
    case 'wallet':
      return <Ionicons color={color} name="wallet" size={size} />;
    case 'wallet-outline':
      return <Ionicons color={color} name="wallet-outline" size={size} />;
    case 'card':
      return <Ionicons color={color} name="card" size={size} />;
    case 'card-outline':
      return <Ionicons color={color} name="card-outline" size={size} />;
    
    // Actions
    case 'send':
      return <Ionicons color={color} name="send" size={size} />;
    case 'receive':
      return <MaterialCommunityIcons color={color} name="download" size={size} />;
    case 'swap':
      return <MaterialCommunityIcons color={color} name="swap-horizontal" size={size} />;
    case 'history':
      return <MaterialIcons color={color} name="history" size={size} />;
    
    // Navigation & UI
    case 'settings':
      return <Ionicons color={color} name="settings-outline" size={size} />;
    case 'security':
      return <MaterialIcons color={color} name="security" size={size} />;
    case 'document':
      return <Ionicons color={color} name="document-text-outline" size={size} />;
    case 'copy':
      return <Ionicons color={color} name="copy-outline" size={size} />;
    case 'qr-code':
      return <MaterialCommunityIcons color={color} name="qrcode" size={size} />;
    case 'back':
      return <Ionicons color={color} name="chevron-back" size={size} />;
    case 'forward':
      return <Ionicons color={color} name="chevron-forward" size={size} />;
    
    // States
    case 'check':
      return <Ionicons color={color} name="checkmark" size={size} />;
    case 'close':
      return <Ionicons color={color} name="close" size={size} />;
    case 'eye':
      return <Ionicons color={color} name="eye" size={size} />;
    case 'eye-off':
      return <Ionicons color={color} name="eye-off" size={size} />;
    case 'add':
      return <Ionicons color={color} name="add" size={size} />;
    case 'remove':
      return <Ionicons color={color} name="remove" size={size} />;
    
    // Status
    case 'warning':
      return <Ionicons color={color} name="warning" size={size} />;
    case 'error':
      return <Ionicons color={color} name="close-circle" size={size} />;
    case 'success':
      return <Ionicons color={color} name="checkmark-circle" size={size} />;
    
    // Crypto
    case 'ethereum':
      return <FontAwesome5 color={color} name="ethereum" size={size} />;
    case 'bitcoin':
      return <FontAwesome5 color={color} name="bitcoin" size={size} />;
    
    default:
      return <Ionicons color={color} name="help-outline" size={size} />;
  }
};
