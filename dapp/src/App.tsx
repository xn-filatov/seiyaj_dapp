import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { AuthProvider } from "./providers/AuthProvider";
import { RequireAuth } from "./components/RequireAuth";
import Layout from "./components/Layout";
import { Web3Provider } from "./providers/Web3Provider";

export default function App() {
  return (
    <AuthProvider>
      <Web3Provider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </Web3Provider>
    </AuthProvider>
  );
}
