import { OwnedNft } from "alchemy-sdk";
import { BigNumber } from "ethers";
import { erc721ABI, useContractWrite, usePrepareContractWrite } from "wagmi";

import { MysteryBox } from "../assets/MysteryBox";

export const useApprove = (nft: OwnedNft | null) => {
  const { config, error, refetch } = usePrepareContractWrite({
    address: nft?.contract.address as `0x${string}`,
    abi: erc721ABI,
    functionName: "approve",
    enabled: Boolean(nft?.contract.address && nft?.tokenId),
    args: [
      MysteryBox.address as `0x${string}`,
      BigNumber.from(nft?.tokenId || "0"),
    ],
  });
  const write = useContractWrite(config);

  return { ...write, error, refetch };
};
