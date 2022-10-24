import React, { useState } from "react";
import "./order.css";
import { useEffect } from "react";
import Content from "./content";
import { useNavigate } from "react-router-dom";

function Order({ user, setUser }) {
  const navigate = useNavigate();
  if (!user.accessToken) {
    navigate("/");
  }
  const handlelogout = () => {
    setUser({});
  };
  const [content, setContent] = useState();
  const [logout, setLogout] = useState({});
  const [username, setUsername] = useState(user.name);
  useEffect(() => {
    setContent(<Content setContent={setContent} user={user} />);
  }, []);
  return (
    <div className="orders">
      <header>
        <div className="title">
          <h2>LAUNDRY</h2>
        </div>
        <div className="nav">
          <div className="list">
            <p>Pricing</p>
          </div>
          <div className="list">
            <p>Career</p>
          </div>
          <div
            className="logout"
            onMouseOver={() => {
              setUsername("LOGOUT");
              setLogout({
                backgroundColor: "rgb(250, 9, 141)",
                fontWeight: "bold",
                fontSize: "larger",
              });
            }}
            onMouseLeave={() => {
              setUsername(user.name);
              setLogout({});
            }}
            onClick={handlelogout}
            style={logout}
          >
            <div className="profile"></div>
            <p>{username}</p>
          </div>
        </div>
      </header>
      <section>
        <div className="sidebar">
          <div className="icon">
            <img src="./image/home.svg" alt="" />
          </div>
          <div className="icon">
            <img src="./image/more.svg" alt="" />
          </div>
          <div className="icon list">
            <img src="./image/list.svg" alt="" />
          </div>
        </div>
        <div className="content">{content}</div>
      </section>
      <footer>
        <p>2021 (c) Laundry</p>
      </footer>
    </div>
  );
}

export default Order;
