import { useBlockNumber, useNetwork } from "wagmi";

export const useIsUnlocked = () => {
  const { chain } = useNetwork();
  const { data: blockNumber } = useBlockNumber();
  const unlockBlock = chain?.id === 1 ? 16261700 : 37258983;
  const blockPer = chain?.id === 1 ? 12 : 2.1;
  const isUnlocked = blockNumber && blockNumber > unlockBlock;
  const remianingTime =
    isUnlocked || !blockNumber ? 0 : (unlockBlock - blockNumber) * blockPer;
  return { isUnlocked, remianingTime };
};
