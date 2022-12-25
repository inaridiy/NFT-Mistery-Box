import { useContractWrite, usePrepareContractWrite } from "wagmi";

import { useIsUnlocked } from "./useIsUnlocked";
import { useMysteryBox } from "./useMysteryBox";

export const useClaim = () => {
  const MysteryBox = useMysteryBox();
  const { isUnlocked } = useIsUnlocked();
  const { config } = usePrepareContractWrite({
    ...MysteryBox,
    enabled: Boolean(isUnlocked),
    functionName: "claim",
  });
  const write = useContractWrite({ ...config });

  return { ...write };
};
