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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <>
      {isConnected && (
        <div className="wrapper">
          <div className="white-box corner left">
            <img src="/ticket.png" />
          </div>
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
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      )}
    </>
  );
}
