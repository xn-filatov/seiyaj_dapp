import { useAccount } from "wagmi";
import "./Home.scss";
import Send from "../../components/Send";
import Burn from "../../components/Burn";
import Balance from "../../components/Balance";

export default function Home() {
  const { address, isConnected } = useAccount();

  return (
    <>
      {isConnected && (
        <div className="wrapper">
          <div className="white-box left">
            <img src="/ticket.png" />
          </div>

          <div className="middle">
            <div className="middle-left">
              <div className="white-box wallet-setup">
                <img src="/token_green.png" />
                <div>
                  <h3 className="label"> Setup your wallet.</h3>
                  <p className="description">
                    Create an Outlet wallet to interact with your favourite
                    protocols.
                  </p>
                </div>
                <button className="btn-black arrow">→</button>
              </div>

              <Balance />

              <div className="white-box middle-left-bottom-right">
                <p className="description">Refer a friend</p>
                <p className="label">Get 10$</p>
                <button className="btn-black arrow">→</button>
                <img src="/ticket.png" />
              </div>
            </div>

            <div className="middle-right">
              <div className="black-box">
                <img src="/id_card.png" />
                <button className="btn-green">Front</button>
                <p className="description">
                  Upload the Front of your State ID Card
                </p>
              </div>
            </div>
          </div>

          <div className="right">
            <div className="white-box">
              <img src="/coinbase_logo.png" />
              <h3 className="label">Send SYT to your wallet.</h3>
              <p className="description">
                Send from Coinbase or another exchange or ask a friend!
              </p>
              <div>
                <p>
                  Address:{" "}
                  {`${address?.slice(0, 5)}...${address?.slice(
                    address.length - 6,
                    address.length - 1
                  )}`}
                </p>
                <button
                  className="btn-black copy"
                  onClick={() =>
                    navigator.clipboard.writeText(address!.toString())
                  }
                >
                  <img src="/copy_icon.png" />
                </button>
              </div>
            </div>

            <Send />
            <Burn />
          </div>
        </div>
      )}
    </>
  );
}
