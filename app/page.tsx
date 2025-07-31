"use client";
import React from "react";
import { useAccount } from "wagmi";
import { useRouter  } from "next/navigation";
import { ConnectButton  } from '@rainbow-me/rainbowkit';
import { Button } from "@/shared/widgets/ui/button";
import { useAppDispatch } from "@/shared/hooks/use-store";
import { connectWalletSuccess } from "@/features/auth/model/slice"

export default function LoginPage() {
  const fullText = "Welcome!";
  const [typedText, setTypedText] = React.useState("");
  const [index, setIndex] = React.useState(0);
  
  React.useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  const { address, isConnected, connector } = useAccount();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (isConnected && address && connector) {
      dispatch(connectWalletSuccess({
        user: { address },
        connector,
      }));
    }
  }, [isConnected, address, connector, dispatch]);

  const router = useRouter(); 

  return (
    <main className="min-h-screen flex flex-col lg:flex-row">
      {/* Left introduction section (larger) */}
      <section className="lg:w-2/3 w-full bg-[#181A20] flex flex-col justify-center items-center p-12">
        <h1 className="text-4xl font-bold text-white mb-6">
          {typedText}
          <span className="animate-pulse text-white">|</span>
        </h1>
        <p className="text-lg text-gray-300 mb-4">
          This is where you can connect your wallet, explore NFTs, and many other exciting features.
        </p>
        <div className="flex items-center gap-x-2">
          <ConnectButton label="Get Started" />
          {isConnected && (
            <Button
              onClick={() => router.push("/dashboard")}
              className="bg-white text-black hover:bg-gray-200"
            >
              Start
            </Button>
          )}
        </div>
      </section>

      {/* Right section left empty, moves below on small screens */}
      <section className="lg:w-1/3 w-full bg-[#23262F] flex items-center justify-center min-h-[300px]">
        {/* Empty or add content later */}
      </section>
    </main>
  );
}
