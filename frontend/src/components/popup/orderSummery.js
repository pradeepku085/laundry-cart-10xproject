import React from "react";
import "./orderSummery.css";
import { useState } from "react";
import OrderTable from "./orderTable";

function OrderSummery({ trigger, setTrigger, success, data, user }) {
  let [storename, setStorename] = useState("");
  let [storeAddress, setStoreAddress] = useState("");
  let [storePhone, setStorePhone] = useState("");
  let [confirmbtn, setConfirmbtn] = useState({ display: "none" });
  function handleData(data) {
    let newData = [];
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
          }
          if (j === 1) {
            s += "Ironing";
          }
          if (j === 2) {
            s += "Bleach";
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
    return newData;
  }
  let items = 0;
  let subTotal = 0;
  let pickup = 90;
  let arr = handleData(data);
  let total = subTotal + pickup;
  function handleChange(e) {
    if (e.target.value) {
      setStorename("Laundry Store");
      setStoreAddress("JP Nagar,Banglore");
      setStorePhone("+91987654321");
      setConfirmbtn({ display: "block" });
    } else {
      setStorename("");
      setStoreAddress("");
      setStorePhone("");
      setConfirmbtn({ display: "none" });
    }
  }
  async function handleConfirm() {
    let orderData = {
      orderdetails: data,
      userid: user.userId,
      price: total,
      items: items,
      status: "Pickup",
      location: storeAddress.split(",")[0],
      district: storeAddress.split(",")[1],
      phone: storePhone,
      storeaddress: storeAddress,
      storename: storename,
    };
    const result = await (
      await fetch("http://localhost:5000/auth/create_order", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify({ ...orderData }),
      })
    ).json();
    setTrigger(false);
    success(true);
  }
  return trigger ? (
    <div className="popup">
      <div className="orderWindow">
        <div className="summeryHead">
          <p>Summary</p>
          <img
            src="./image/close.svg"
            alt=""
            onClick={() => setTrigger(false)}
          />
        </div>
        <div className="storedetails">
          <div className="details">
            <div className="location">
              <select onChange={(e) => handleChange(e)}>
                <option value="">Store location</option>
                <option value="Laundry Store">Laundry Store</option>
              </select>
            </div>
            <div className="address">
              <h3>Store Address:</h3>
              <p>{storeAddress}</p>
            </div>
            <div className="phone">
              <h3>Phone:</h3>
              <p>{storePhone}</p>
            </div>
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
          <div className="addNew">
            <h3>Add New + </h3>
          </div>
        </div>
        <button
          className="confirmBtn"
          onClick={handleConfirm}
          style={confirmbtn}
        >
          Confirm
        </button>
      </div>
    </div>
  ) : (
    ""
  );
}

export default OrderSummery;
