import { ErrorBoundary } from '@/core/error-handling/ErrorBoundary';
import { QueryProvider } from '@/hooks/queries';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import './global.css';

interface AppProps {
  children: React.ReactNode;
}

export default function App({ children }: AppProps) {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <StatusBar backgroundColor="#ffffff" style="dark" />
        {children}
      </QueryProvider>
    </ErrorBoundary>
  );
}
