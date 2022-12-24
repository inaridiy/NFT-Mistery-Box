import { OwnedNft } from "alchemy-sdk";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { Header } from "../components/Layouts/Header";
import { useApprove } from "../hooks/useApprove";
import { useIsApproved } from "../hooks/useIsApproved";
import { useMysteryBox } from "../hooks/useMysteryBox";
import { useNfts } from "../hooks/useNfts";
import { useStakeNFT } from "../hooks/useStakeNFT";

export default function Home() {
  const router = useRouter();
  const { address } = useAccount();
  const { data, isLoading } = useNfts(address);
  const [selectedNft, setSelectedNft] = useState<OwnedNft | null>(null);
  const nfts = data?.ownedNfts.filter((nft) => nft.tokenType === "ERC721");
  const MysteryBox = useMysteryBox();

  const { data: approved, refetch } = useIsApproved(selectedNft);
  const approve = useApprove(selectedNft);
  const stake = useStakeNFT(selectedNft, approved === MysteryBox.address);

  const handleApprove = () => {
    approve.writeAsync &&
      approve
        .writeAsync()
        .then((tx) => tx.wait())
        .then(() => refetch());
  };

  const handleStake = () => {
    stake.writeAsync &&
      stake
        .writeAsync()
        .then((tx) => tx.wait())
        .then(() => router.push("/complete"));
  };

  useEffect(() => {
    setSelectedNft(null);
  }, [address]);
  return (
    <>
      <Header title="Stake Your NFT"></Header>
      {isLoading && (
        <button className="btn loading btn-ghost btn-lg w-full"></button>
      )}
      <div className="px-2 mb-48">
        {nfts?.filter((nft) => nft.tokenType === "ERC721").length === 0 && (
          <div className="text-center font-bold text-xl text-base-content/50">
            You don&apos;t have any NFT&apos;s to stake.
          </div>
        )}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-w-screen-sm mx-auto">
          {nfts?.map((nft, i) => (
            <div
              key={nft.contract.address + i}
              className={clsx(
                "w-fill cursor-pointer rounded-lg p-0.5",
                selectedNft === nft && "ring-2 ring-info"
              )}
              onClick={() => setSelectedNft(nft)}
            >
              <div className="w-full aspect-square bg-base-300 rounded-lg overflow-hidden">
                {nft.media?.[0]?.format === "mp4" ? (
                  <video
                    src={nft.media?.[0]?.gateway}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <img
                    src={nft.media?.[0]?.gateway}
                    alt={nft.title}
                    className="object-cover w-full h-full"
                  />
                )}
              </div>
              <div className="text-xs sm:text-lg text-center font-bold whitespace-nowrap overflow-hidden">
                {nft.title}
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedNft && (
        <div className="fixed left-0 right-0 bottom-0 w-full bg-neutral p-2">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center max-w-screen-lg mx-auto">
            <div className="text-neutral-content text-2xl font-bold">
              {selectedNft.title || "No Name"}
            </div>
            <div className="flex items-center gap-4 justify-between">
              {approved === MysteryBox.address ? (
                <>
                  <div className="text-neutral-content text-xl font-bold">
                    5 Matic(Returned After)
                  </div>
                  <button
                    className="btn btn-info disabled:btn-info disabled:bg-info/10"
                    onClick={handleStake}
                    disabled={stake.isLoading || stake.isError}
                  >
                    Stake NFT
                  </button>
                </>
              ) : (
                <>
                  <div className="text-neutral-content text-xl font-bold">
                    Need Approve
                  </div>
                  <button
                    className={clsx(
                      "btn btn-error disabled:btn-error",
                      approve.isLoading && "loading"
                    )}
                    disabled={approve.isLoading || approve.isError}
                    onClick={handleApprove}
                  >
                    Approve
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
