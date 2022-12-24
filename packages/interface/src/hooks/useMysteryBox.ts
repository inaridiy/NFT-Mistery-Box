import { useNetwork } from "wagmi";

import { MysteryBox, MysteryBoxEth } from "../assets/MysteryBox";

export const useMysteryBox = () => {
  const { chain } = useNetwork();

  return chain?.id === 1 ? MysteryBoxEth : MysteryBox;
};
