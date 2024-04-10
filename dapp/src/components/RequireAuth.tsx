import { useLocation, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useAuth } from "../providers/AuthProvider";

export function RequireAuth({ children }: { children: JSX.Element }) {
  let location = useLocation();
  const [cookies] = useCookies(["token"]);
  const { user, getUser } = useAuth();

  if (!cookies.token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!user)
    getUser()
      .then(() => {
        return children;
      })
      .catch(() => {
        return <Navigate to="/login" state={{ from: location }} replace />;
      });
  else {
    return children;
  }
}
