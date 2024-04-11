import "./ReferAFriend.scss";

export default function ReferAFriend() {
  return (
    <div className="white-box refer-friend">
      <p className="label">Refer a friend</p>
      <p className="description">Get 10$</p>
      <div className="refer-body">
        <img src="/ticket.png" /> <button className="btn-black arrow">→</button>
      </div>
    </div>
  );
}
