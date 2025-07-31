"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { useState } from "react";
import LoadingSpinner from "@/shared/widgets/ui/loading-spinner";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {(loading || isPending) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <LoadingSpinner />
        </div>
      )}
      {children}
    </>
  );
}
