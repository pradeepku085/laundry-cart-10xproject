import React, { useState } from "react";

function List({
  index,
  data,
  setViewTrigger,
  setViewContent,
  cancelOrder,
  setCancelTrigger,
}) {
  function handleView() {
    setViewContent(data);
    setViewTrigger(true);
  }
  let classAttribute = index % 2 !== 0 ? "odd" : "";
  let cancel = "";
  if (data.status === "Pickup") cancel = "Cancel Order";
  return (
    <tr className={classAttribute}>
      <td>
        <div className="orderId">
          <p>{data.orderId}</p>
        </div>
      </td>
      <td>
        <div className="datetime">
          <p>{data.datetime}</p>
        </div>
      </td>
      <td>
        <div className="location">
          <p>{data.location}</p>
        </div>
      </td>
      <td>
        <div className="district">
          <p>{data.district}</p>
        </div>
      </td>
      <td>
        <div className="phone">
          <p>{data.phone}</p>
        </div>
      </td>
      <td>
        <div className="items">
          <p>{data.items}</p>
        </div>
      </td>
      <td>
        <div className="price">
          <p style={{ color: "blue", fontWeight: "600" }}>
            {data.price + " Rs"}
          </p>
        </div>
      </td>
      <td>
        <div className="status">
          <p>{data.status}</p>
        </div>
      </td>
      <td>
        <div className="cancel">
          <p
            style={{ color: "red" }}
            onClick={() => {
              cancelOrder(data.orderId);
              setCancelTrigger(true);
            }}
          >
            {cancel}
          </p>
        </div>
      </td>
      <td>
        <div className="view">
          {/*Icon by <a href="https://freeicons.io/profile/714">Raj Dev</a> on <a href="https://freeicons.io">freeicons.io</a>*/}
          <p>
            <img src="./image/eye.svg" alt="" onClick={handleView} />
          </p>
        </div>
      </td>
    </tr>
  );
}
export default List;
