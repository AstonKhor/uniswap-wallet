import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';

// Icon mapping to vector icons for better quality and consistency
const ICON_MAP: Record<string, { family: 'Ionicons' | 'MaterialIcons' | 'Feather'; name: string }> = {
  'house.fill': { family: 'Ionicons', name: 'home' },
  'chart.pie.fill': { family: 'Ionicons', name: 'pie-chart' },
  'list.bullet': { family: 'Ionicons', name: 'list' },
  'paperplane.fill': { family: 'Ionicons', name: 'send' },
  'gear': { family: 'Ionicons', name: 'settings-outline' },
  'plus': { family: 'Ionicons', name: 'add' },
  'minus': { family: 'Ionicons', name: 'remove' },
  'checkmark': { family: 'Ionicons', name: 'checkmark' },
  'xmark': { family: 'Ionicons', name: 'close' },
  'arrow.left': { family: 'Ionicons', name: 'chevron-back' },
  'arrow.right': { family: 'Ionicons', name: 'chevron-forward' },
  'arrow.up': { family: 'Ionicons', name: 'chevron-up' },
  'arrow.down': { family: 'Ionicons', name: 'chevron-down' },
};

interface IconSymbolProps {
  name: string;
  size?: number;
  color?: string;
}

export const IconSymbol: React.FC<IconSymbolProps> = ({ name, size = 24, color = '#000000' }) => {
  const iconConfig = ICON_MAP[name];
  
  if (!iconConfig) {
    // Fallback to text for unmapped icons
    return (
      <Ionicons color={color} name="help-outline" size={size} />
    );
  }

  const { family, name: iconName } = iconConfig;

  switch (family) {
    case 'Ionicons':
      return <Ionicons color={color} name={iconName as any} size={size} />;
    case 'MaterialIcons':
      return <MaterialIcons color={color} name={iconName as any} size={size} />;
    case 'Feather':
      return <Feather color={color} name={iconName as any} size={size} />;
    default:
      return <Ionicons color={color} name="help-outline" size={size} />;
  }
};
