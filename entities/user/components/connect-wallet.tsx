import { useConnect } from 'wagmi';

const connectorIcons: Record<string, string> = {
  MetaMask: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAyNSIgaGVpZ2h0PSIxMDI1IiB2aWV3Qm94PSIwIDAgMTAyNSAxMDI1IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfNTQyXzMxODYpIj4KPHBhdGggZD0iTTg2Mi4wMDUgODcxLjU0Nkw2ODkuMTE0IDgyMC4wNjVMNTU4LjczIDg5OC4wMDZMNDY3Ljc2MyA4OTcuOTY4TDMzNy4zMDMgODIwLjA2NUwxNjQuNDg4IDg3MS41NDZMMTExLjkyIDY5NC4wODdMMTY0LjQ4OCA0OTcuMTMzTDExMS45MiAzMzAuNjEzTDE2NC40ODggMTI0LjIzM0w0MzQuNTI2IDI4NS41NjdINTkxLjk2N0w4NjIuMDA1IDEyNC4yMzNMOTE0LjU3MyAzMzAuNjEzTDg2Mi4wMDUgNDk3LjEzM0w5MTQuNTczIDY5NC4wODdMODYyLjAwNSA4NzEuNTQ2WiIgZmlsbD0iI0ZGNUMxNiIvPgo8cGF0aCBkPSJNMTY0LjUyNyAxMjQuMjMzTDQzNC41NjYgMjg1LjY4TDQyMy44MjYgMzk2LjQ3OUwxNjQuNTI3IDEyNC4yMzNaIiBmaWxsPSIjRkY1QzE2Ii8+CjxwYXRoIGQ9Ik0zMzcuMzQgNjk0LjE2M0w0NTYuMTU1IDc4NC42NzJMMzM3LjM0IDgyMC4wNjVWNjk0LjE2M1oiIGZpbGw9IiNGRjVDMTYiLz4KPHBhdGggZD0iTTQ0Ni42NTkgNTQ0LjUyNUw0MjMuODIzIDM5Ni41NTRMMjc3LjY1IDQ5Ny4xNjlMMjc3LjU3NCA0OTcuMTMyVjQ5Ny4yMDdMMjc4LjAyNiA2MDAuNzc2TDMzNy4zMDIgNTQ0LjUyNUgzMzcuMzRINDQ2LjY1OVoiIGZpbGw9IiNGRjVDMTYiLz4KPHBhdGggZD0iTTg2Mi4wMDUgMTI0LjIzM0w1OTEuOTY3IDI4NS42OEw2MDIuNjY5IDM5Ni40NzlMODYyLjAwNSAxMjQuMjMzWiIgZmlsbD0iI0ZGNUMxNiIvPgo8cGF0aCBkPSJNNjg5LjE5IDY5NC4xNjNMNTcwLjM3NSA3ODQuNjcyTDY4OS4xOSA4MjAuMDY1VjY5NC4xNjNaIiBmaWxsPSIjRkY1QzE2Ii8+CjxwYXRoIGQ9Ik03NDguOTIyIDQ5Ny4yMDdINzQ4Ljk2SDc0OC45MjJWNDk3LjEzMkw3NDguODg0IDQ5Ny4xNjlMNjAyLjcxMSAzOTYuNTU0TDU3OS44NzUgNTQ0LjUyNUg2ODkuMTk0TDc0OC41MDggNjAwLjc3Nkw3NDguOTIyIDQ5Ny4yMDdaIiBmaWxsPSIjRkY1QzE2Ii8+CjxwYXRoIGQ9Ik0zMzcuMzAzIDgyMC4wNjJMMTY0LjQ4OCA4NzEuNTQ0TDExMS45MiA2OTQuMTZIMzM3LjMwM1Y4MjAuMDYyWiIgZmlsbD0iI0UzNDgwNyIvPgo8cGF0aCBkPSJNNDQ2LjYyMyA1NDQuNDg3TDQ3OS42MzQgNzU4LjRMNDMzLjg4NiA2MzkuNDYzTDI3Ny45NTMgNjAwLjc3NkwzMzcuMjY3IDU0NC40ODdINDQ2LjU4Nkg0NDYuNjIzWiIgZmlsbD0iI0UzNDgwNyIvPgo8cGF0aCBkPSJNNjg5LjE4OCA4MjAuMDYyTDg2Mi4wMDMgODcxLjU0NEw5MTQuNTcxIDY5NC4xNkg2ODkuMTg4VjgyMC4wNjJaIiBmaWxsPSIjRTM0ODA3Ii8+CjxwYXRoIGQ9Ik01NzkuODcgNTQ0LjQ4N0w1NDYuODU5IDc1OC40TDU5Mi42MDcgNjM5LjQ2M0w3NDguNTQgNjAwLjc3Nkw2ODkuMTg5IDU0NC40ODdINTc5Ljg3WiIgZmlsbD0iI0UzNDgwNyIvPgo8cGF0aCBkPSJNMTExLjkyIDY5NC4wODVMMTY0LjQ4OCA0OTcuMTMxSDI3Ny41MzhMMjc3Ljk1MiA2MDAuNzM3TDQzMy44ODYgNjM5LjQyNEw0NzkuNjMzIDc1OC4zNjFMNDU2LjExOSA3ODQuNTU2TDMzNy4zMDQgNjk0LjA0N0gxMTEuOTJWNjk0LjA4NVoiIGZpbGw9IiNGRjhENUQiLz4KPHBhdGggZD0iTTkxNC41NzMgNjk0LjA4NUw4NjIuMDA0IDQ5Ny4xMzFINzQ4Ljk1NUw3NDguNTQgNjAwLjczN0w1OTIuNjA3IDYzOS40MjRMNTQ2Ljg1OSA3NTguMzYxTDU3MC4zNzQgNzg0LjU1Nkw2ODkuMTg5IDY5NC4wNDdIOTE0LjU3M1Y2OTQuMDg1WiIgZmlsbD0iI0ZGOEQ1RCIvPgo8cGF0aCBkPSJNNTkxLjk2OSAyODUuNTY3SDUxMy4yNDlINDM0LjUyOEw0MjMuODI2IDM5Ni4zNjZMNDc5LjYzNSA3NTguMjVINTQ2Ljg2Mkw2MDIuNzA5IDM5Ni4zNjZMNTkxLjk2OSAyODUuNTY3WiIgZmlsbD0iI0ZGOEQ1RCIvPgo8cGF0aCBkPSJNMTY0LjQ4OCAxMjQuMjMzTDExMS45MiAzMzAuNjEzTDE2NC40ODggNDk3LjEzM0gyNzcuNTM4TDQyMy43ODcgMzk2LjQ3OUwxNjQuNDg4IDEyNC4yMzNaIiBmaWxsPSIjNjYxODAwIi8+CjxwYXRoIGQ9Ik00MTMuOTUxIDU4Ny40NTFIMzYyLjczOUwzMzQuODU0IDYxNC43ODFMNDMzLjkyMyA2MzkuMzQ5TDQxMy45NTEgNTg3LjQxM1Y1ODcuNDUxWiIgZmlsbD0iIzY2MTgwMCIvPgo8cGF0aCBkPSJNODYyLjAwNiAxMjQuMjMzTDkxNC41NzQgMzMwLjYxM0w4NjIuMDA2IDQ5Ny4xMzNINzQ4Ljk1Nkw2MDIuNzA3IDM5Ni40NzlMODYyLjAwNiAxMjQuMjMzWiIgZmlsbD0iIzY2MTgwMCIvPgo8cGF0aCBkPSJNNjEyLjYxNyA1ODcuNDUxSDY2My45MDRMNjkxLjc5IDYxNC44MTlMNTkyLjYwNyA2MzkuNDI0TDYxMi42MTcgNTg3LjQxM1Y1ODcuNDUxWiIgZmlsbD0iIzY2MTgwMCIvPgo8cGF0aCBkPSJNNTU4LjY5MiA4MjcuNDFMNTcwLjM3MyA3ODQuNjM1TDU0Ni44NTkgNzU4LjQ0SDQ3OS41OTRMNDU2LjA4IDc4NC42MzVMNDY3Ljc2MiA4MjcuNDEiIGZpbGw9IiM2NjE4MDAiLz4KPHBhdGggZD0iTTU1OC42ODkgODI3LjQwN1Y4OTguMDQzSDQ2Ny43NlY4MjcuNDA3SDU1OC42ODlaIiBmaWxsPSIjQzBDNENEIi8+CjxwYXRoIGQ9Ik0zMzcuMzQgODE5Ljk5TDQ2Ny44MzcgODk4LjAwN1Y4MjcuMzcyTDQ1Ni4xNTUgNzg0LjU5N0wzMzcuMzQgODE5Ljk5WiIgZmlsbD0iI0U3RUJGNiIvPgo8cGF0aCBkPSJNNjg5LjE5IDgxOS45OUw1NTguNjkzIDg5OC4wMDdWODI3LjM3Mkw1NzAuMzc1IDc4NC41OTdMNjg5LjE5IDgxOS45OVoiIGZpbGw9IiNFN0VCRjYiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF81NDJfMzE4NiI+CjxyZWN0IHdpZHRoPSIxMDI0IiBoZWlnaHQ9IjEwMjQiIGZpbGw9IndoaXRlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjk4NjMyOCAwLjUpIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==",
  WalletConnect: "https://avatars.githubusercontent.com/u/37784886?s=200&v=4",
  // Thêm icon cho các connector khác nếu cần
};

export const WalletList = () => {
  const {
    connect,
    connectors,
    data: connectData,
    error,
    isPending,
    status,
  } = useConnect();
  // if (error) {
  //   return <div className="text-red-500">Error: {error.message}</div>;
  // }
  return (
    <div className="flex flex-col gap-3 w-full">
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          onClick={() => connect({ connector })}
          disabled={!connector.isAuthorized() || isPending}
          className={`flex items-center justify-between px-4 py-3 rounded-lg bg-[#23262F] hover:bg-[#353945] transition-colors border border-transparent hover:border-[#3772FF] focus:outline-none disabled:opacity-60`}
        >
          <div className="flex items-center gap-3">
            <img
              src={connectorIcons[connector.name] || "https://opensea.io/static/images/logos/opensea.svg"}
              alt={connector.name}
              className="w-7 h-7 rounded-full bg-white object-contain"
            />
            <span className="font-medium text-white">{connector.name}</span>
          </div>
          <div className="flex items-center gap-2">
            {!connector.isAuthorized() ? (
              <span className="text-xs text-gray-400">Not installed</span>
            ) : (
              <span className="text-xs text-gray-400">Installed</span>
            )}
            {isPending && status === connector.uid && (
              <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};
