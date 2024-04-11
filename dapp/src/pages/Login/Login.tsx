import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./Login.scss";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export type User = {
  email: string;
  password: string;
  name?: string;
  birthdate?: string;
  description?: string;
};

export default function Login() {
  const navigate = useNavigate();
  const auth = useAuth();

  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await auth.signin({ name, email, password }).then(() => navigate("/"));
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await auth.login({ email, password }).then(() => navigate("/"));
  };

  const handleForgotPassword = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;

    await axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/forgot`, {
        email,
      })
      .then(() => {
        setIsEmailSent(true);
      })
      .catch((e) => {
        toast.error(e.response.data);
        throw e;
      });
  };

  return (
    <div className="login-page">
      <Tabs>
        <TabList>
          <Tab>Log In</Tab>
          <Tab>Sign Up</Tab>
          <Tab>Forgot password</Tab>
        </TabList>

        <TabPanel>
          <form onSubmit={handleLogin} className="login-form">
            <label>
              Email: <input name="email" type="text" />
            </label>
            <label>
              Password: <input name="password" type="text" />
            </label>
            <button type="submit">Log In</button>
          </form>
        </TabPanel>
        <TabPanel>
          <form onSubmit={handleSubmit} className="login-form">
            <label>
              Email: <input name="email" type="text" />
            </label>
            <label>
              Password: <input name="password" type="text" />
            </label>
            <label>
              Name: <input name="name" type="text" />
            </label>
            <button type="submit">Sign Up</button>
          </form>
        </TabPanel>
        <TabPanel>
          {(!isEmailSent && (
            <form onSubmit={handleForgotPassword} className="login-form">
              <label>
                Email: <input name="email" type="text" />
              </label>

              <button type="submit">Request</button>
            </form>
          )) || <h2>Email with a new password was successfully sent</h2>}
        </TabPanel>
      </Tabs>
    </div>
  );
}
