import { useLocation, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export function RequireAuth({ children }: { children: JSX.Element }) {
  let location = useLocation();
  const [cookies] = useCookies(["token"]);

  if (!cookies.token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
