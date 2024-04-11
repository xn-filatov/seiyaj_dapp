import { useEffect, useState } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { abi } from "../SeiyajToken.json";
import useBalance from "../hooks/useBalance";
import { toast } from "react-toastify";

export default function Send() {
  const { updateBalance } = useBalance();
  const [to, setTo] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const {
    writeContract,
    data: sendData,
    error: sendError,
  } = useWriteContract();
  const { isSuccess: isSendSuccess } = useWaitForTransactionReceipt({
    hash: sendData,
  });

  useEffect(() => {
    if (isSendSuccess) {
      toast("Your tokens were sent successfully");
      updateBalance();
    }
  }, [isSendSuccess]);

  useEffect(() => {
    if (sendError) {
      toast.error(sendError.message);
    }
  }, [sendError]);

  const handleSend = () => {
    if (amount)
      writeContract({
        address: import.meta.env.VITE_TOKEN_ADDRESS as `0x${string}`,
        abi,
        functionName: "safeTransfer",
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
      />
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
