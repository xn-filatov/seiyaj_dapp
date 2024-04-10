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
        {user && (
          <div>
            <b>
              Welcome{" "}
              {user.name && user.name.length > 0 ? user.name : user.email}
            </b>
            {isDisconnected && (
              <i style={{ marginLeft: "20px" }}>
                Please connect your MM wallet
              </i>
            )}
          </div>
        )}
        <div style={{ alignItems: "center", display: "flex", gap: "20px" }}>
          <ConnectKitButton />
          <button className="logout-btn" onClick={logout}>
            Log Out
          </button>
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
