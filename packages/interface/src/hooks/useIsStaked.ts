import { BigNumber } from "ethers";
import { useAccount, useContractRead } from "wagmi";

import { MysteryBox } from "../assets/MysteryBox";

export const useIsStaked = () => {
  const { address } = useAccount();
  const stakeOf = useContractRead({
    ...MysteryBox,
    functionName: "stakeOf",
    enabled: Boolean(address),
    args: [address as `0x${string}`],
  });
  const stakeData = useContractRead({
    ...MysteryBox,
    functionName: "stakes",
    enabled: Boolean(stakeOf.data),
    args: [stakeOf.data as BigNumber],
  });

  return {
    isStaked: Boolean(stakeData.data?.[0] === address),
    isLoading: stakeOf.isLoading || stakeData.isLoading,
  };
};
