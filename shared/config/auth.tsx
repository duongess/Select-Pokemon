"use client"
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import Layout from "./layout"

const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'd3a63b0bdbc1e61243229a982148b7b6',
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true,
});
const queryClient = new QueryClient();
export function Web3Wrapper({ children }: { children: React.ReactNode }) {
  
  return (
    <Layout>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            {children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </Layout>
  );
};