import { useEffect, useState } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { abi } from "../../../contracts/artifacts/contracts/SeiyajToken.sol/SeiyajToken.json";
import useBalance from "../hooks/useBalance";

export default function Send() {
  //   const { address, isConnected } = useAccount();
  const { updateBalance } = useBalance();
  const [to, setTo] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const { writeContract, data: sendData } = useWriteContract();
  const { isSuccess: isSendSuccess } = useWaitForTransactionReceipt({
    hash: sendData,
  });

  useEffect(() => {
    updateBalance();
  }, [isSendSuccess]);

  const handleSend = () => {
    if (amount)
      writeContract({
        address: import.meta.env.VITE_TOKEN_ADDRESS as `0x${string}`,
        abi,
        functionName: "transfer",
        args: [to, amount * 1e18],
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
