import { useQuery } from "@tanstack/react-query";

import { alchemy } from "../libs/alchemy";

export const useNfts = (address: string | undefined) => {
  const query = useQuery({
    queryKey: ["nfts", address],
    queryFn: () => alchemy.nft.getNftsForOwner(address as string),
    enabled: Boolean(address),
  });

  return query;
};
