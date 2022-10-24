import React from "react";
import "./successPopup.css";
import Content from "../order/content";

function SuccessPopup({ trigger, setTrigger, setContent, user }) {
  function handleSuccess() {
    setTrigger(false);
    setContent(<Content setContent={setContent} user={user} />);
  }
  return trigger ? (
    <div className="popup window">
      <div className="successPopup">
        <div>
          <img src="./image/success.jpg" alt="" />

          <h2>Your order is successful</h2>
          <p>You can track the delivery in the "Orders" section</p>
          <br />
          <button onClick={handleSuccess}>Go to orders</button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default SuccessPopup;
