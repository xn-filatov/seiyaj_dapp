import { useAccount } from "wagmi";
import "./Home.scss";
import Send from "../../components/Send";
import Burn from "../../components/Burn";
import Balance from "../../components/Balance/Balance";
import Mint from "../../components/Mint";
import Profile from "../../components/Profile/Profile";
import ReferAFriend from "../../components/ReferAFriend/ReferAFriend";
import "./Home.scss";
import LeftCorner from "../../components/LeftCorner";
import WalletSetup from "../../components/WalletSetup";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <>
      {isConnected && (
        <div className="wrapper">
          <LeftCorner />
          <div className="middle">
            <div className="middle-left">
              <WalletSetup />
              <Balance />
              <ReferAFriend />
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
