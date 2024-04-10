import { Outlet } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import { ConnectKitButton } from "connectkit";
import "./Layout.scss";
import { useAccount } from "wagmi";

export default function Layout() {
  const { user, logout } = useAuth();

  const { isDisconnected } = useAccount();
  return (
    <div className="container">
      <div className="layout-top">
        <b>Welcome {user?.name ?? user?.email}</b>
        {isDisconnected && <p>Please connect your MM wallet</p>}
        <ConnectKitButton />
        <button className="logout-btn" onClick={logout}>
          Log Out
        </button>
      </div>

      <div className="main">
        <Outlet />
      </div>

      <div className="layout-bottom">
        <hr />
      </div>
    </div>
  );
}
