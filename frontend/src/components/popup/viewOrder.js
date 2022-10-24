import React from "react";
import "./orderSummery.css";
import OrderTable from "./orderTable";

function ViewOrder({
  viewTrigger,
  data,
  setViewTrigger,
  cancelOrder,
  setCancelTrigger,
}) {
  function handleCancel() {
    cancelOrder(data.orderId);
    setViewTrigger(false);
    setCancelTrigger(true);
  }
  function handleData(data) {
    let newData = [];
    let set = new Set();
    Object.keys(data).forEach(function (key, i) {
      newData[i] = [key];
      let s = "";
      for (let j = 0; j < 3; j++) {
        if (data[key][j] > 0) {
          if (s) {
            s += ", ";
          }
          if (j === 0) {
            s += "Washing";
            set.add("Washing");
          }
          if (j === 1) {
            s += "Ironing";
            set.add("Ironing");
          }
          if (j === 2) {
            s += "Bleach";
            set.add("Bleach");
          }
        }
      }
      newData[i][1] = s;
      let price = data[key][3].split("=");
      items += parseInt(data[key][4]);
      subTotal += parseInt(price[1]);
      newData[i][2] = price[0] + "=";
      newData[i][3] = data[key][5];
    });
    set.forEach((item) => {
      statusbar.push(item);
    });
    return newData;
  }
  let statusbar = [];
  let cancelBtn = { display: "none" };
  if (data.status === "Pickup") {
    cancelBtn = { display: "block" };
  }
  let items = 0;
  let subTotal = 0;
  let pickup = 90;
  let arr = handleData(data.orderdetails);
  statusbar.push("Delivery");
  let total = subTotal + pickup;
  return viewTrigger ? (
    <div className="popup">
      <div className="orderWindow">
        <div className="summeryHead">
          <p>Order Details</p>
          <img
            src="./image/close.svg"
            alt=""
            onClick={() => setViewTrigger(false)}
          />
        </div>
        <div className="storedetails">
          <div className="details">
            <div className="address">
              <h3>Store Name:</h3>
              <p>{data.storename}</p>
            </div>
            <div className="address">
              <h3>Store Address:</h3>
              <p>{data.storeaddress}</p>
            </div>
            <div className="phone">
              <h3>Phone:</h3>
              <p>{data.phone}</p>
            </div>
          </div>
        </div>
        <div className="statusbar">
          <div className="status">
            <div className="wrapper">
              <div className="circle"></div>
              <div>
                <p>Pickup</p>
              </div>
            </div>
            {statusbar.map((item, i) => (
              <>
                <div className="line" style={{}}></div>
                <div className="wrapper">
                  <div className="circle"></div>
                  <div key={i}>
                    <p>{item}</p>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
        <div className="orderDetails">
          <p className="tablehead">Order Details</p>
          {arr.map((item, i) => (
            <OrderTable data={item} key={i} />
          ))}
          <div className="subTable">
            <tr className="detailRow">
              <td className="price">
                <p>Sub-Total:</p>
              </td>
              <td className="total">
                <p>{subTotal}</p>
              </td>
            </tr>
            <tr className="detailRow">
              <td className="price">
                <p>Pickup:</p>
              </td>
              <td className="total">
                <p>{pickup}</p>
              </td>
            </tr>
          </div>
          <div className="totalPrice">
            <h3>TOTAL : Rs {total}</h3>
          </div>
        </div>
        <p className="add">Address:</p>
        <div className="userAddress">
          <div className="oldAddress">
            <h3>HOME</h3>
            <p>#223, 10th road, Jp Nagar, Bangalore</p>
          </div>
        </div>
        <button className="cancelBtn" onClick={handleCancel} style={cancelBtn}>
          Cancel
        </button>
      </div>
    </div>
  ) : (
    ""
  );
}

export default ViewOrder;
