"use clent"
import React from "react";
import { Button } from "@/shared/widgets/ui/button"
import { useRouter } from "next/navigation";
import { ChevronDownIcon, UserIcon, Cog6ToothIcon } from '@heroicons/react/24/solid';
import { useAccount, useDisconnect } from "wagmi";
import { useAppDispatch } from "@/shared/hooks/use-store";
import { disconnectWallet } from "@/features/auth/model/slice"

export function DropdownProfileCard() {
  const { address, isConnected, connector } = useAccount();
  const router = useRouter();
  
  const dispatch = useAppDispatch();
  React.useEffect(() => {
      if (!isConnected) {
          dispatch(disconnectWallet());
          router.push("/");
      }
  }, [address, isConnected, connector, dispatch]);

  const { disconnect } = useDisconnect();
  const logout = () => {
      disconnect();
      dispatch(disconnectWallet());
      router.push("/");
  }
  return (
    <div>
        <button 
        className="w-full text-left px-2 py-1 text-sm text-gray-200 hover:bg-gray-700 rounded-md flex items-center gap-2"
        onClick={() => router.push(`/profile`)}
        >
          <UserIcon className="h-4 w-4 text-purple-400" />
          Profile
        </button>
        <button 
        className="w-full text-left px-2 py-1 text-sm text-gray-200 hover:bg-gray-700 rounded-md flex items-center gap-2"
        onClick={() => router.push(`/settings`)}
        >
          <Cog6ToothIcon className="h-4 w-4 text-gray-400" />
          Settings
        </button>
        <button 
        className="w-full text-left px-2 py-1 text-sm text-red-500 hover:bg-gray-700 rounded-md flex items-center gap-2"
        onClick={logout}
        >
          Logout
        </button>
    </div>
  );
}

