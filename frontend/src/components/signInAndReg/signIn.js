import React from "react";
import Reg from "./reg";
import "./signIn.css";
import { useNavigate } from "react-router-dom";

function SignIn({ setSection, setUser }) {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let userId = document.getElementById("userid").value;
    let password = document.getElementById("password").value;
    const result = await (
      await fetch("http://localhost:5000/sign_in", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ userId, password }),
      })
    ).json();
    if (result.accessToken) {
      setUser({
        accessToken: result.accessToken,
        userId: result.email,
        name: result.name,
      });
      navigate("/order");
    } else {
      alert(result.error);
    }
  };
  return (
    <div id="signIn">
      <div className="text_content">
        <div className="title">
          <h1>Laundry Service</h1>
          <p>Doorstep Wash & Dryclean Service</p>
          <div className="regBtn">
            <br />
            <br />
            <br />
            <p>Don't Have An Account?</p>
            <br />
            <button
              onClick={() =>
                setSection(<Reg setSection={setSection} setUser={setUser} />)
              }
            >
              Register
            </button>
          </div>
        </div>
      </div>
      <div className="signInform">
        <div className="signform">
          <h3>SIGN IN</h3>
          <br />
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="login">
              <div className="email input">
                <input
                  type="text"
                  className="form_input"
                  placeholder="Mobile / Email"
                  id="userid"
                  required
                />
              </div>
              <br />
              <br />
              <div className="password input">
                <input
                  type="password"
                  className="form_input"
                  placeholder="Password"
                  id="password"
                  required
                />
                <img src="./image/padlock.svg" alt="" />
                <p>Forgot Password?</p>
              </div>
            </div>
            <button type="submit">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
