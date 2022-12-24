import { Alchemy, Network } from "alchemy-sdk";
export const alchemy = new Alchemy({
  network: Network.MATIC_MAINNET,
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
});

export const alchemyEth = new Alchemy({
  network: Network.ETH_MAINNET,
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
});
