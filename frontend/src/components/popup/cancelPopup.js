import React from "react";
import "./cancelPopup.css";
import Content from "../order/content";

function CancelPopup({
  cancelTrigger,
  setCancelTrigger,
  orderId,
  setContent,
  user,
}) {
  async function handleCancel() {
    const result = await (
      await fetch("http://localhost:5000/auth/update_order", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify({ orderId, status: "Order Canceled" }),
      })
    ).json();
    setCancelTrigger(false);
    setContent(<Content setContent={setContent} user={user} />);
  }
  return cancelTrigger ? (
    <div className="popup window">
      <div className="cancelPopup">
        <div className="cancelTop">
          <img
            src="./image/close.svg"
            alt=""
            onClick={() => setCancelTrigger(false)}
          />
        </div>
        <div className="cancelContent">
          <h3>Are you sure?</h3>
          <p>Do you want to cancel the order "{orderId}"</p>
          <br />
          <button className="cancelBtn" onClick={handleCancel}>
            Cancel Order
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default CancelPopup;
