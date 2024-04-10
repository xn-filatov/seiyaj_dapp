import { useState } from "react";
import { useWriteContract } from "wagmi";
import { abi } from "../../../contracts/artifacts/contracts/SeiyajToken.sol/SeiyajToken.json";

export default function Send() {
  //   const { address, isConnected } = useAccount();
  const [to, setTo] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const { writeContract } = useWriteContract();

  const handleSend = () => {
    writeContract({
      address: import.meta.env.VITE_TOKEN_ADDRESS as `0x${string}`,
      abi,
      functionName: "transfer",
      args: [to, BigInt(amount!)],
    });
  };

  return (
    <div className="white-box">
      <img src="/circles.png" />
      <h3 className="label">Send SYT</h3>
      <input
        onChange={(e) => setTo(e.target.value)}
        type="text"
        placeholder="To..."
      />
      <input
        onChange={(e) => setAmount(parseFloat(e.target.value))}
        type="number"
        placeholder="Amount..."
      />{" "}
      <button
        onClick={handleSend}
        disabled={!to || !amount}
        className="btn-black"
      >
        Send
      </button>
    </div>
  );
}
