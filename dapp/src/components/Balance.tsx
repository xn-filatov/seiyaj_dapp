import { useAccount } from "wagmi";
import useBalance from "../hooks/useBalance";

export default function Balance() {
  const { address } = useAccount();
  const { balance } = useBalance();

  return (
    <div className="white-box middle-left-bottom-left">
      <p className="description">Outlet Wallet</p>
      <p className="label">
        Address:{" "}
        {`${address?.slice(0, 5)}...${address?.slice(
          address.length - 6,
          address.length - 1
        )}`}
      </p>{" "}
      <button
        className="btn-black copy"
        onClick={() => navigator.clipboard.writeText(address!.toString())}
      >
        <img src="/copy_icon.png" />
      </button>
      <p className="label">{balance.toFixed(2)} SYT</p>
      <button className="btn-black arrow">→</button>
      {/* <img src="/token_purple.png" /> */}
    </div>
  );
}
