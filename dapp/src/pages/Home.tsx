import { useAccount, useReadContract } from "wagmi";
import { useAuth } from "../providers/AuthProvider";

export default function Home() {
  const { user } = useAuth();
  const { address, isDisconnected } = useAccount();

  const { data: balance } = useReadContract({
    address: import.meta.env.TOKEN_ADDRESS as `0x${string}`,
    abi: [
      "function balanceOf(address account) public view virtual returns (uint256)",
    ],
    functionName: "balanceOf",
    args: [address],
  });

  return (
    <>
      <h3>Welcome {user?.name}</h3>
      {isDisconnected && <p>Please connect your MM wallet</p>}
      <h3>{balance?.toString()} ETH</h3>
    </>
  );
}
