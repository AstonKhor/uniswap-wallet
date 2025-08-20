import { API_CONFIG } from '@/constants';
import { QueryClient } from '@tanstack/react-query';

// Create a client instance
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: API_CONFIG.CACHE_DURATION,
      gcTime: API_CONFIG.CACHE_DURATION * 2, // Keep data in cache for 10 minutes
      retry: API_CONFIG.RETRY_ATTEMPTS,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
    mutations: {
      retry: false,
    },
  },
});
