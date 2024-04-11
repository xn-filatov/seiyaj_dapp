import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { AuthProvider } from "./providers/AuthProvider";
import { RequireAuth } from "./components/RequireAuth";
import Layout from "./components/Layout/Layout";
import { Web3Provider } from "./providers/Web3Provider";
import { ToastContainer } from "react-toastify";

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
        </Routes>{" "}
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
      </Web3Provider>
    </AuthProvider>
  );
}
