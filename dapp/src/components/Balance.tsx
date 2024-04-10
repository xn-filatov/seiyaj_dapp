import { useAccount, useReadContract } from "wagmi";
import { abi } from "../../../contracts/artifacts/contracts/SeiyajToken.sol/SeiyajToken.json";
import { formatEther } from "viem";

export default function Send() {
  const { address } = useAccount();
  const { data: balance, isSuccess } = useReadContract({
    address: import.meta.env.VITE_TOKEN_ADDRESS as `0x${string}`,
    abi,
    functionName: "balanceOf",
    args: [address],
  });

  return (
    <div className="white-box middle-left-bottom-left">
      <p className="description">Outlet Wallet</p>
      {isSuccess && (
        <p className="label">{formatEther(balance as bigint)} SYT</p>
      )}
      <button className="btn-black arrow">→</button>
      <img src="/token_purple.png" />
    </div>
  );
}
