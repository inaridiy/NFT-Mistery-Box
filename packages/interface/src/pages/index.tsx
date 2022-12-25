import Image from "next/image";
import { useAccount } from "wagmi";

import { ConnectButton } from "../components/ConnectButton";
import { Header } from "../components/Layouts/Header";
import { useClaim } from "../hooks/useClaim";
import { useIsStaked } from "../hooks/useIsStaked";
import { useIsUnlocked } from "../hooks/useIsUnlocked";

export default function Home() {
  const { address } = useAccount();
  const { isStaked } = useIsStaked();
  const { isUnlocked, remianingTime } = useIsUnlocked();
  const claim = useClaim();

  return (
    <>
      <Header title={`${(remianingTime / 60).toFixed(1)}minutes to unlock`}>
        <ConnectButton />
      </Header>
      <div className="hero bg-base-100 flex-grow">
        <div className="relative w-full h-full">
          <div
            className="w-screen"
            style={{
              margin: "0 calc(50% - 50vw)",
            }}
          >
            <Image
              src="/xmas-bg.jpg"
              alt="XMAS"
              className="w-full h-full object-cover absolute"
              width="800"
              height="400"
            />
          </div>
        </div>
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold text-neutral-content">
              Xmas Mystery Box
            </h1>
            <p className="py-6 text-neutral-content">
              Everyone bring your NFT&apos;s and let&apos;s give each other
              Christmas presents!!!
            </p>
            {!address ? (
              <ConnectButton />
            ) : isUnlocked && isStaked ? (
              <button
                className="btn disabled:bg-base-100"
                onClick={() => claim.write && claim.write()}
              >
                Claim
              </button>
            ) : (
              <button className="btn disabled:bg-base-100" disabled>
                Claim
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
