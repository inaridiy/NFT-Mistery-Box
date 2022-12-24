import Link from "next/link";

import { Header } from "../components/Layouts/Header";

export default function Home() {
  return (
    <>
      <Header title="Complete"></Header>
      <div className="hero bg-base-100 flex-grow">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Complete!!</h1>
            <p className="py-6">
              The results will be announced around 21:00 JST on 12/25! Please
              wait until then!
            </p>
            <Link href="/" className="btn btn-primary">
              Back Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
