import axios from "axios";
import { useAuth } from "../providers/AuthProvider";
import { useCookies } from "react-cookie";

export default function Profile() {
  const { user } = useAuth();
  const [cookie] = useCookies(["token"]);

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const birthdate = formData.get("birthdate") as string;
    const description = formData.get("description") as string;

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/user`,
        { name, birthdate, description },
        {
          headers: { Authorization: `Bearer ${cookie.token}` },
        }
      )
      .then(() => {})
      .catch(console.log);
  };

  return (
    user && (
      <div className="middle-right">
        <div className="black-box">
          <img src="/id_card.png" />
          <form onSubmit={handleSave} className="login-form">
            <label>
              Name: <input name="name" type="text" defaultValue={user.name} />
            </label>
            <label>
              Birthdate:{" "}
              <input
                name="birthdate"
                type="text"
                defaultValue={user.birthdate}
              />
            </label>
            <label>
              Description:{" "}
              <input
                name="description"
                type="text"
                defaultValue={user.description}
              />
            </label>
            <button type="submit" className="btn-green">
              Save
            </button>
          </form>
        </div>
      </div>
    )
  );
}
