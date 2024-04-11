import { useAccount } from "wagmi";
import useBalance from "../../hooks/useBalance";
import "./Balance.scss";

export default function Balance() {
  const { address } = useAccount();
  const { balance } = useBalance();

  return (
    <div className="white-box wallet-data">
      <p className="label">Your Wallet</p>
      <div className="address">
        <p className="description">
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
          <img src="/copy_icon.png" width={20} height={20} />
        </button>
      </div>
      <div className="balance">
        <img src="/token_purple.png" />
        <b>{balance.toFixed(2)} SYT</b>
      </div>
    </div>
  );
}
