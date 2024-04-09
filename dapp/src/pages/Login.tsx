import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export type User = {
  email?: string;
  password?: string;
  address?: string;
  name?: string;
};

export default function Login() {
  const navigate = useNavigate();
  const auth = useAuth();

  //   const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await auth.signin({ name, email, password });
    navigate("/");
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await auth.login({ email, password });
    navigate("/");
  };

  return (
    <Tabs>
      <TabList>
        <Tab>Log In</Tab>
        <Tab>Sign Up</Tab>
      </TabList>

      <TabPanel>
        <div>
          <form onSubmit={handleLogin}>
            <label>
              Email: <input name="email" type="text" />
            </label>
            <label>
              Password: <input name="password" type="text" />
            </label>
            <button type="submit">Log In</button>
          </form>
        </div>
      </TabPanel>
      <TabPanel>
        <div>
          <form onSubmit={handleSubmit}>
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
        </div>
      </TabPanel>
    </Tabs>
  );
}
