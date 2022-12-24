import { useQuery } from "@tanstack/react-query";
import { useNetwork } from "wagmi";

import { alchemy, alchemyEth } from "../libs/alchemy";

export const useNfts = (address: string | undefined) => {
  const { chain } = useNetwork();
  const query = useQuery({
    queryKey: ["nfts", address, chain?.id || 0],
    queryFn: () =>
      chain?.id === 1
        ? alchemyEth.nft.getNftsForOwner(address as string)
        : alchemy.nft.getNftsForOwner(address as string),
    enabled: Boolean(address),
  });

  return query;
};
