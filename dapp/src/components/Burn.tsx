import { useEffect, useState } from "react";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { abi } from "../SeiyajToken.json";
import useBalance from "../hooks/useBalance";

export default function Burn() {
  const { address } = useAccount();
  const { updateBalance } = useBalance();
  const [amount, setAmount] = useState<number | null>(null);
  const { writeContract, data: burnData } = useWriteContract();
  const { isSuccess: isBurnSuccess } = useWaitForTransactionReceipt({
    hash: burnData,
  });

  useEffect(() => {
    updateBalance();
  }, [isBurnSuccess]);

  const handleBurn = () => {
    if (amount)
      writeContract({
        address: import.meta.env.VITE_TOKEN_ADDRESS as `0x${string}`,
        abi,
        functionName: "burn",
        args: [address, amount * 1e18],
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
        Burn
      </button>
    </div>
  );
}
