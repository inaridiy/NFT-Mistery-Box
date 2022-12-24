import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygon } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { NoSSR } from "../components/Elements";
import { HomeLayout } from "../components/Layouts/HomeLayout";
import "../styles/globals.css";

if (!process.env.NEXT_PUBLIC_ALCHEMY_KEY) {
  throw new Error("Please set your Alchemy ID in your .env file");
}

const { chains, provider } = configureChains(
  [polygon],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Christmas NFT Mystery BOX",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <HomeLayout>
            <NoSSR>
              <Component {...pageProps} />
            </NoSSR>
          </HomeLayout>
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}
