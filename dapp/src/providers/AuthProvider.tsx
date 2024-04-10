import { createContext, useState, useContext } from "react";
import { useCookies } from "react-cookie";
import { User } from "../pages/Login/Login";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: User | null;
  signin: (user: User) => Promise<any>;
  login: (user: User) => Promise<any>;
  getUser: () => Promise<any>;
  logout: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const [user, setUser] = useState<User | null>(null);

  const signin = async (newUser: User) => {
    return axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/signup`, { ...newUser })
      .then((res) => {
        setCookie("token", res.data.token);
        setUser(res.data.user);

        return res;
      })
      .catch(console.log);
  };

  const login = async (newUser: User) => {
    return axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/login`, { ...newUser })
      .then((res) => {
        setCookie("token", res.data.token);

        setUser(res.data.user);
        return res;
      })
      .catch(console.log);
  };

  const getUser = async () => {
    return axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/user`, {
        headers: { Authorization: `Bearer ${cookie.token}` },
      })
      .then((res) => {
        setUser(res.data.user);
        return res;
      })
      .catch((e) => {
        removeCookie("token");
        throw e;
      });
  };

  const logout = async () => {
    removeCookie("token");
    navigate("/");
  };

  const value = { user, signin, login, getUser, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
