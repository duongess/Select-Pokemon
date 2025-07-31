"use client";
import React from "react";
import { useAccount } from "wagmi";
import { WalletAvatar } from "@/shared/widgets/ui/wallet-avatar";
import { useRouter } from "next/navigation";
import { Ranking } from "@/shared/widgets/ui/ranking";
import { OverView } from "@/shared/widgets/ui/over-view";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/shared/widgets/ui/resizable";

export default function Dashboard() {
const { address, isConnected } = useAccount();

const overview = [
    { name: "marketplace", description: "This is a marketplace" },
    { name: "battle", description: "This is a battle" },
    { name: "quests", description: "This is a quests" },
    { name: "inventory", description: "This is an inventory" }
];

const router = useRouter();

// const prevAddressRef = React.useRef<string | undefined>(undefined);
// React.useEffect(() => {
//   if (!isConnected) return;

//   // Nếu address thay đổi
//   if (prevAddressRef.current && prevAddressRef.current !== address) {
//     console.log("👀 Wallet address changed!");

//     // 👉 Redirect hoặc reset state
//     router.push("/"); // Hoặc gọi lại API, hoặc mở modal, tùy bạn
//   }

//   // Cập nhật giá trị address hiện tại vào ref
//   prevAddressRef.current = address;
// }, [address]);


return (
  <main className="min-h-screen bg-[#0D0D0D] text-white flex flex-col">
    {/* 🧠 Navbar */}
    <nav className="sticky top-0 backdrop-blur flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 border-b border-gray-700">
      <input
        type="text"
        placeholder="Search"
        className="bg-[#1a1a1a] text-white px-4 py-2 rounded w-full md:w-1/3 border border-gray-700 shadow-sm"
      />
      <div className="flex gap-4 items-center self-end md:self-auto">
        <span>🔔</span>
        <WalletAvatar 
          address={address}
        />
      </div>
    </nav>

    {/* 📦 Main Content */}
    <ResizablePanelGroup direction="horizontal" className="flex-1">
      {/* 🎨 Left Content */}
      <ResizablePanel defaultSize={66} minSize={30} className="overflow-y-auto">
        <section className="w-full p-4 space-y-8">
          {/* Banner */}
          <div className="bg-[#181A20] rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-2">User Dashboard</h2>
            <p className="text-sm text-gray-400 truncate">Wallet: {address}</p>
            <div className="flex flex-wrap gap-6 mt-4 text-sm">
              <span>Floor: 0.1073 ETH</span>
              <span>Items: 10,001</span>
              <span>Volume: 38.2K ETH</span>
            </div>
          </div>

          {/* Over View */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Overview</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {overview.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#1F1F1F] p-4 rounded-lg hover:bg-[#2A2A2A] transition"
                >
                  <h4 className="font-semibold capitalize">{item.name}</h4>
                  <p className="text-sm text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          <OverView />
        </section>
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* 📈 Right Content */}
      <ResizablePanel defaultSize={34} minSize={20} className="overflow-y-auto border-t lg:border-t-0 lg:border-l border-gray-700 p-4">
        <Ranking />
      </ResizablePanel>
    </ResizablePanelGroup>

    {/* ⚙️ Footer */}
    <footer className="p-4 border-t border-gray-700 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-2">
      <div>Live · Aggregating · Networks</div>
      <div>Privacy · Support · Terms</div>
    </footer>
  </main>
);
}
