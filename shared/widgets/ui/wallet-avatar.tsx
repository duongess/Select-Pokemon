"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/shared/widgets/ui/avatar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDownIcon, UserIcon, Cog6ToothIcon } from '@heroicons/react/24/solid';
import { DropdownProfileCard } from "@/entities/user/components/dropdown-profile-card";
const avatar1 = "/default-avatar/1.png";

type WalletAvatarProps = {
  address?: string;
};

export function WalletAvatar({ address }: WalletAvatarProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const shortenAddress = (addr?: string) => {
    if (!addr) return "Not connected";
    return addr.slice(0, 6) + "..." + addr.slice(-4);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >
      <div
        className="w-full flex flex-col items-start gap-0 cursor-pointer rounded-md px-3 py-2 hover:bg-muted transition-all duration-200"
      >
        <div className="flex items-center gap-2 w-full">
          <Avatar className="w-6 h-6" onClick={() => router.push(`/profile`)}>
            <AvatarImage src={avatar1} alt="Avatar" />
            <AvatarFallback>
              {address ? address.slice(2, 4).toUpperCase() : "??"}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium truncate max-w-[120px] text-gray-200">
            {shortenAddress(address)}
          </span>
          <ChevronDownIcon
            className={`
              h-4 w-4 text-gray-400
              transition-transform duration-200 ease-in-out
              ${showDropdown ? 'rotate-180' : ''}
            `}
          />
        </div>
        <div
          className={`
            absolute
            top-[calc(100%-8px)]
            left-0
            w-full
            border border-t-0 border-gray-700
            rounded-b-md
            shadow-lg
            bg-gray-800
            z-50
            p-2
            flex flex-col gap-1
            transform origin-top
            transition-all duration-200 ease-in-out
            ${showDropdown
              ? 'scale-y-100 opacity-100 visible pointer-events-auto'
              : 'scale-y-0 opacity-0 invisible pointer-events-none'
            }
          `}
        >
          <DropdownProfileCard />
        </div>
      </div>
    </div>
  );
}
