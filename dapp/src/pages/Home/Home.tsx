import { useAccount } from "wagmi";
import "./Home.scss";
import Send from "../../components/Send";
import Burn from "../../components/Burn";
import Balance from "../../components/Balance";
import Mint from "../../components/Mint";
import Profile from "../../components/Profile";

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <>
      {isConnected && (
        <div className="wrapper">
          <div className="white-box corner left">
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
                {/* <img src="/ticket.png" /> */}
              </div>
            </div>
            <Profile />
          </div>

          <div className="right">
            <Mint />
            <Send />
            <Burn />
          </div>
        </div>
      )}
    </>
  );
}
