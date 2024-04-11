import { useEffect, useState } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { abi } from "../SeiyajToken.json";
import useBalance from "../hooks/useBalance";
import { toast } from "react-toastify";

export default function Burn() {
  const { updateBalance } = useBalance();
  const [amount, setAmount] = useState<number | null>(null);
  const {
    writeContract,
    data: burnData,
    error: burnError,
  } = useWriteContract();
  const { isSuccess: isBurnSuccess } = useWaitForTransactionReceipt({
    hash: burnData,
  });

  useEffect(() => {
    if (isBurnSuccess) {
      toast("Your tokens were burnt successfully");
      updateBalance();
    }
  }, [isBurnSuccess]);

  useEffect(() => {
    if (burnError) {
      toast.error(burnError.message);
    }
  }, [burnError]);

  const handleBurn = () => {
    if (amount)
      writeContract({
        address: import.meta.env.VITE_TOKEN_ADDRESS as `0x${string}`,
        abi,
        functionName: "burn",
        args: [amount * 1e18],
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
