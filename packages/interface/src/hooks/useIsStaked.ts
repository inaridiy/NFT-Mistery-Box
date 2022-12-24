import { BigNumber } from "ethers";
import { useAccount, useContractRead } from "wagmi";

import { useMysteryBox } from "./useMysteryBox";

export const useIsStaked = () => {
  const MysteryBox = useMysteryBox();
  console.log(MysteryBox);
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
