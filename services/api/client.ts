import { API_CONFIG } from '@/constants';
import { ERROR_CODES, WalletError } from '@/core/error-handling/errors';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
}

export class ApiClient {
  private baseUrl: string;
  private timeout: number;

  constructor(baseUrl: string = API_CONFIG.ALCHEMY_API_KEY ? 'https://eth-mainnet.g.alchemy.com/v2/' : '') {
    this.baseUrl = baseUrl;
    this.timeout = API_CONFIG.REQUEST_TIMEOUT;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new WalletError(
          `API request failed: ${response.status} ${response.statusText}`,
          ERROR_CODES.NETWORK_UNAVAILABLE,
          'network'
        );
      }

      const data = await response.json();
      
      return {
        success: true,
        data,
      };
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof WalletError) {
        throw error;
      }

      if (error instanceof Error && error.name === 'AbortError') {
        throw new WalletError(
          'Request timeout - please try again',
          ERROR_CODES.TIMEOUT,
          'network'
        );
      }

      throw new WalletError(
        'Network request failed',
        ERROR_CODES.NETWORK_UNAVAILABLE,
        'network'
      );
    }
  }

  async get<T>(endpoint: string, params?: Record<string, string>): Promise<ApiResponse<T>> {
    const url = params 
      ? `${endpoint}?${new URLSearchParams(params).toString()}`
      : endpoint;
    
    return this.makeRequest<T>(url);
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }
}

// Singleton instances
export const alchemyClient = new ApiClient(
  API_CONFIG.ALCHEMY_API_KEY ? `https://eth-mainnet.g.alchemy.com/v2/${API_CONFIG.ALCHEMY_API_KEY}` : ''
);

export const priceApiClient = new ApiClient(
  API_CONFIG.COINMARKETCAP_API_KEY ? 'https://pro-api.coinmarketcap.com/v1/' : 'https://api.coingecko.com/api/v3/'
);
