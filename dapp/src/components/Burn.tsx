import { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { abi } from "../../../contracts/artifacts/contracts/SeiyajToken.sol/SeiyajToken.json";

export default function Burn() {
  const { address } = useAccount();
  const [amount, setAmount] = useState<number | null>(null);
  const { writeContract, data, error, status } = useWriteContract();
  console.log(data, error, status);
  const handleBurn = () => {
    writeContract({
      address: import.meta.env.VITE_TOKEN_ADDRESS as `0x${string}`,
      abi,
      functionName: "burn",
      args: [address, BigInt(amount!)],
    });
  };

  return (
    <div className="white-box">
      <img src="/circles.png" />
      <h3 className="label">Burn SYT</h3>
      <input
        onChange={(e) => setAmount(parseFloat(e.target.value))}
        type="number"
        placeholder="Amount..."
      />
      <button onClick={handleBurn} disabled={!amount} className="btn-black">
        Send
      </button>
    </div>
  );
}
