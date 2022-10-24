import React, { useState } from "react";
import SignIn from "./signIn";
import "./reg.css";

function Reg({ setSection, setUser }) {
  const [err, setErr] = useState("");
  const [color, setColor] = useState({ backgroundColor: "none" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let district = document.getElementById("district").value;
    let pincode = document.getElementById("pincode").value;
    let email = document.getElementById("email").value;
    let state = document.getElementById("state").value;
    let address = document.getElementById("address").value;
    let password = document.getElementById("password").value;
    const result = await (
      await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          district,
          password,
          state,
          address,
          pincode,
        }),
      })
    ).json();
    if (result.error) {
      setErr(result.message);
    } else {
      setSection(<SignIn setSection={setSection} setUser={setUser} />);
    }
  };
  return (
    <div id="reg">
      <div className="regtext">
        <div className="linee">
          <h1>Laundry service</h1>
          <p>Doorstep Wash &</p>
          <br />
          <p>Dryclean Service</p>
        </div>
        <br />
        <br />
        <br />
        <br />
        <span className="signBtn">Already Have Account?</span>
        <br />
        <br />
        <button onClick={() => setSection(<SignIn setSection={setSection} />)}>
          Sign In
        </button>
      </div>
      <div className="regform">
        <h1>REGISTER</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div id="reg_form">
            <div className="left form">
              <div className="reg_name">
                <input
                  type="text"
                  className="form_input"
                  placeholder="Name"
                  id="name"
                  required
                />
              </div>
              <div className="reg_name">
                <input
                  type="text"
                  className="form_input"
                  placeholder="Phone"
                  id="phone"
                  required
                />
              </div>
              <div className="reg_name">
                <input
                  type="text"
                  className="form_input"
                  placeholder="District"
                  id="district"
                  required
                />
              </div>
              <div className="reg_name">
                <input
                  type="text"
                  className="form_input"
                  placeholder="Pincode"
                  id="pincode"
                  required
                />
              </div>
            </div>
            <div className="right form">
              <div className="reg_name">
                <input
                  type="text"
                  className="form_input"
                  placeholder="Email"
                  id="email"
                  required
                />
              </div>
              <div className="reg_name">
                <input
                  type="text"
                  className="form_input"
                  placeholder="State"
                  id="state"
                  required
                />
              </div>
              <div className="reg_name">
                <input
                  type="text"
                  className="form_input"
                  placeholder="Address"
                  id="address"
                  required
                />
              </div>
              <div className="reg_name">
                <input
                  type="password"
                  className="form_input"
                  placeholder="Password"
                  id="password"
                  required
                />
              </div>
            </div>
          </div>
          <p className="err">{err}</p>
          <div className="terms">
            <div
              className="checkbox"
              style={color}
              onClick={() => {
                setColor({ backgroundColor: "green" });
              }}
            ></div>
            <a href="./">
              <p>
                I agree to Terms & Condition receiving marketing and promotional
                materials
              </p>
            </a>
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Reg;
