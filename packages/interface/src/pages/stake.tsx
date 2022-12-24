import clsx from "clsx";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { Header } from "../components/Layouts/Header";
import { useNfts } from "../hooks/useNfts";

export default function Home() {
  const { address } = useAccount();
  const { data, isLoading } = useNfts(address);
  const [selectedNft, setSelectedNft] = useState<number | null>(null);
  const nfts = data?.ownedNfts.filter((nft) => nft.tokenType === "ERC721");
  console.log(nfts);
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
                selectedNft === i && "ring-2 ring-info"
              )}
              onClick={() => setSelectedNft(i)}
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
      {typeof selectedNft === "number" && (
        <div className="fixed bottom-0 w-full bg-neutral flex flex-col sm:flex-row p-4 justify-between sm:items-center">
          <div className="text-neutral-content text-2xl font-bold">
            {nfts?.[selectedNft].title || "No Name"}
          </div>
          <div className="flex items-center gap-4">
            <div className="text-neutral-content text-xl font-bold">
              5 Matic(Returned After)
            </div>
            <button className="btn bg-base-100 text-base-content hover:bg-base-100 hover:text-base-content">
              Stake NFT
            </button>
          </div>
        </div>
      )}
    </>
  );
}
