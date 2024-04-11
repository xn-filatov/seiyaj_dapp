import axios from "axios";
import { useAuth } from "../../providers/AuthProvider";
import { useCookies } from "react-cookie";
import "./Profile.scss";
import { toast } from "react-toastify";

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
      .then(() => {
        toast("Your profile changes were saved");
      })
      .catch((e) => {
        console.log(e);
        toast.error("Error!");
      });
  };

  return (
    user && (
      <div className="middle-right">
        <div className="profile">
          <img src="/id_card.png" />
          <form onSubmit={handleSave} className="profile-form">
            <label>Name:</label>
            <input name="name" type="text" defaultValue={user.name} />
            <label>Birthdate: </label>
            <input name="birthdate" type="text" defaultValue={user.birthdate} />
            <label>Description:</label>
            <textarea
              name="description"
              defaultValue={user.description}
              rows={10}
              cols={40}
            />
            <button type="submit" className="btn-green">
              Save
            </button>
          </form>
        </div>
      </div>
    )
  );
}
