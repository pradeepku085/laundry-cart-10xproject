import React, { useState } from "react";
import SignIn from "./signIn";
import "./landing.css";
import { useEffect } from "react";

function Landing({ setUser }) {
  const [section, setSection] = useState();
  useEffect(() => {
    setSection(<SignIn setSection={setSection} setUser={setUser} />);
  }, []);
  return (
    <div className="landing">
      <header>
        <div className="title">
          <h2>LAUNDRY</h2>
        </div>
        <div className="nav">
          <div className="list">
            <p>Home</p>
          </div>
          <div className="list">
            <p>Pricing</p>
          </div>
          <div className="list">
            <p>Career</p>
          </div>
          <div className="list signIn">
            <p>Sign In </p>
          </div>
        </div>
      </header>
      <div id="signInAndReg">{section}</div>
      <div className="refer">
        <h3>Now Refer & Earn ₹500 for every referral*</h3>
        <p>*Terms and conditions will be applied</p>
      </div>
      <div className="aboutUs">
        <div id="aboutusContent">
          <div className="listOne">
            <h3>ABOUT US</h3>
            <p>Doorstep Wash & Dryclean Service</p>
          </div>
          <div className="listTwo">
            <h3>Home</h3>
            <p>Sign In</p>
            <p>Register</p>
          </div>
          <div className="listThree">
            <h3>Pricing</h3>
          </div>
          <div className="listFour">
            <h3>Career</h3>
            <p>Blogs</p>
            <p>Create</p>
          </div>
          <div className="list_five">
            <h3>Contact</h3>
          </div>
          <div className="socialMedia">
            <h3>SOCIAL MEDIA</h3>
            <div className="socialicon">
              <div className="icons">
                <img src="./image/facebook.svg" alt="facebook" />
              </div>
              <div className="icons">
                <img src="./image/instagram.svg" alt="instagram" />
              </div>
              <div className="icons">
                <img src="./image/linkedin.svg" alt="linkedin" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <p>2021 (c) Laundry</p>
      </footer>
    </div>
  );
}

export default Landing;
