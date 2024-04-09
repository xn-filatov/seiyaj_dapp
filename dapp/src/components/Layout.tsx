import { Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { ConnectKitButton } from "connectkit";

export default function Layout() {
  const { logout } = useAuth();

  return (
    <div>
      <ConnectKitButton />
      <button onClick={logout}>Log Out</button>
      <Outlet />
    </div>
  );
}
