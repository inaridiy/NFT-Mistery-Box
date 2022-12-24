import Image from "next/image";
import Link from "next/link";
import { useAccount } from "wagmi";

import { ConnectButton } from "../components/ConnectButton";
import { Header } from "../components/Layouts/Header";

export default function Home() {
  const { address } = useAccount();
  return (
    <>
      <Header title="Mystery">
        <ConnectButton />
      </Header>
      <div className="hero bg-base-100 flex-grow">
        <div className="relative w-full h-full">
          <Image
            src="/xmas-bg.jpg"
            alt="XMAS"
            className="w-full h-full absolute"
            width="800"
            height="400"
          />
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
            {address ? (
              <Link className="btn" href="/stake">
                Stake NFT
              </Link>
            ) : (
              <ConnectButton />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
