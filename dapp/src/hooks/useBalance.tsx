import { useAccount, useReadContract } from "wagmi";
import { abi } from "../SeiyajToken.json";
import { formatEther } from "viem";

export default function useBalance(): {
  balance: number;
  updateBalance: any;
} {
  const { address } = useAccount();

  const {
    data: balance,
    isSuccess,
    refetch: updateBalance,
  } = useReadContract({
    address: import.meta.env.VITE_TOKEN_ADDRESS as `0x${string}`,
    abi,
    functionName: "balanceOf",
    args: [address],
  });

  return {
    balance: isSuccess ? parseFloat(formatEther(balance as bigint)) : 0,
    updateBalance,
  };
}
