import { OwnedNft } from "alchemy-sdk";
import { BigNumber, ethers } from "ethers";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

import { MysteryBox } from "../assets/MysteryBox";

export const useStakeNFT = (nft: OwnedNft | null) => {
  const { config, error, refetch } = usePrepareContractWrite({
    ...MysteryBox,
    functionName: "stake",
    enabled: Boolean(nft?.contract.address && nft?.tokenId),
    overrides: {
      value: ethers.utils.parseEther("5").add(1),
    },
    args: [
      nft?.contract.address as `0x${string}`,
      BigNumber.from(nft?.tokenId || "0"),
    ],
  });
  const write = useContractWrite(config);
  console.log(error);

  return { ...write, error, refetch };
};
