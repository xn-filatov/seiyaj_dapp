import { Outlet } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import { ConnectKitButton } from "connectkit";
import "./Layout.scss";
import { useAccount, useDisconnect } from "wagmi";

export default function Layout() {
  const { user, logout } = useAuth();
  const { isDisconnected } = useAccount();
  const { disconnect } = useDisconnect();

  const handleLogout = () => {
    disconnect();
    logout();
  };

  return (
    <div className="container">
      <div className="layout-top">
        <div className="navbar">
          {user && (
            <div>
              <b style={{ color: "greenyellow" }}>Welcome {user.email}</b>
              {isDisconnected && (
                <i style={{ marginLeft: "20px" }}>
                  Please connect your MM wallet
                </i>
              )}
            </div>
          )}
          <div style={{ alignItems: "center", display: "flex", gap: "20px" }}>
            <ConnectKitButton />
            <button className="logout-btn" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </div>
      </div>

      <div className="main">
        <Outlet />
      </div>

      {/* <div className="layout-bottom">
        <hr />
      </div> */}
    </div>
  );
}
