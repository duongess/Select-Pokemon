// features/auth/model/types.ts
import { Connector } from 'wagmi';

export interface User {
  address: string;
  chainId?: number;
  ensName?: string;
  avatarUrl?: string;
}

export interface AuthState {
  user: User | null;
  connector: Connector | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}
