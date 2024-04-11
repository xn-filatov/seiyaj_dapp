import { useEffect, useState } from "react";
import {
  useWriteContract,
  useReadContract,
  useAccount,
  useWaitForTransactionReceipt,
} from "wagmi";
import { abi } from "../SeiyajToken.json";
import useBalance from "../hooks/useBalance";

export default function Mint() {
  const { address } = useAccount();
  const { updateBalance } = useBalance();
  const [to, setTo] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const { writeContract, data: mintData } = useWriteContract();
  const { isSuccess: isMintSuccess } = useWaitForTransactionReceipt({
    hash: mintData,
  });
  const { data: owner } = useReadContract({
    address: import.meta.env.VITE_TOKEN_ADDRESS as `0x${string}`,
    abi,
    functionName: "owner",
  });

  useEffect(() => {
    updateBalance();
  }, [isMintSuccess]);

  const handleMint = () => {
    if (amount)
      writeContract({
        address: import.meta.env.VITE_TOKEN_ADDRESS as `0x${string}`,
        abi,
        functionName: "mint",
        args: [to, amount * 1e18],
      });
  };

  return (
    <div className="white-box">
      {(address == owner && (
        <>
          <img src="/coinbase_logo.png" />
          <h3 className="label">Mint SYT</h3>
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
            onClick={handleMint}
            disabled={!to || !amount}
            className="btn-black"
          >
            Mint
          </button>
        </>
      )) || (
        <>
          <img src="/coinbase_logo.png" />
          <h3 className="label">Mint SYT</h3>
          <p className="description">Only owner can mint these tokens</p>
        </>
      )}
    </div>
  );
}
