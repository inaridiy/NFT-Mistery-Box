import { OwnedNft } from "alchemy-sdk";
import { BigNumber, ethers } from "ethers";
import { useContractWrite, useNetwork, usePrepareContractWrite } from "wagmi";

import { useMysteryBox } from "./useMysteryBox";

export const useStakeNFT = (nft: OwnedNft | null, isApproved: boolean) => {
  const { chain } = useNetwork();
  const MysteryBox = useMysteryBox();
  const { config, error, refetch } = usePrepareContractWrite({
    ...MysteryBox,
    functionName: "stake",
    enabled: Boolean(nft?.contract.address && nft?.tokenId && isApproved),
    overrides: {
      value:
        chain?.id === 1
          ? ethers.utils.parseEther("0.001")
          : ethers.utils.parseEther("5"),
    },
    args: [
      nft?.contract.address as `0x${string}`,
      BigNumber.from(nft?.tokenId || "0"),
    ],
  });
  const write = useContractWrite(config);

  return { ...write, error, refetch };
};
