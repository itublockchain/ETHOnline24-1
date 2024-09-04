import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig } from 'wagmi';
import { ConnectKitProvider } from 'connectkit';
import { mainnet, polygon, optimism, arbitrum, zkSync, linea } from 'wagmi/chains';

const queryClient = new QueryClient();

const config = createConfig({
  autoConnect: true,
  connectors: [
    // Wallet Connectors burada
  ],
  chains: [mainnet, polygon, optimism, arbitrum, zkSync, linea],
});

const Web3Provider = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Web3Provider;
