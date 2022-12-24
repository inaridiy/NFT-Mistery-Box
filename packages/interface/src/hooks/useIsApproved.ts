import { OwnedNft } from "alchemy-sdk";
import { BigNumber } from "ethers";
import { erc721ABI, useContractRead } from "wagmi";

export const useIsApproved = (nft: OwnedNft | null) => {
  const query = useContractRead({
    address: nft?.contract.address as `0x${string}`,
    abi: erc721ABI,
    functionName: "getApproved",
    enabled: Boolean(nft?.contract.address && nft?.tokenId),
    args: [BigNumber.from(nft?.tokenId || "0")],
  });

  return query;
};
