/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Network specific colors
        ethereum: '#627EEA',
        polygon: '#8247E5',
        arbitrum: '#28A0F0',
        optimism: '#FF0420',
        // App colors
        primary: '#6366f1',
        secondary: '#8b5cf6',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        background: '#0f0f0f',
        surface: '#1a1a1a',
        'surface-light': '#2d2d2d',
        'text-primary': '#ffffff',
        'text-secondary': '#a3a3a3',
        'text-muted': '#737373',
      },
      fontFamily: {
        'space-mono': ['SpaceMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
};
