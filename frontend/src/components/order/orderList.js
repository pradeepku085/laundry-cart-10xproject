import React, { useState } from "react";
import List from "./list";
import "./orderlist.css";
import Create_order from "./create_order";
import ViewOrder from "../popup/viewOrder";
import CancelPopup from "../popup/cancelPopup";

function OrderList({ setContent, obj, user }) {
  const [cancelOrder, setCancelOrder] = useState("");
  const [viewContent, setViewContent] = useState(obj[0]);
  const [viewTrigger, setViewTrigger] = useState(false);
  const [cancelTrigger, setCancelTrigger] = useState(false);
  return (
    <>
      <div className="orderList_header">
        <div className="numoforder">
          <h3>Orders | {obj.length}</h3>
        </div>
        <div className="orderListHead">
          <button
            className="createorderBtn"
            onClick={() => {
              setContent(<Create_order setContent={setContent} user={user} />);
            }}
          >
            Create
          </button>
          <div className="orderList_search">
            <div className="orderList_searchbar">
              <div className="orderList_searchicon">
                <img src="./image/search.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="orderList">
        <table>
          <thead>
            <tr>
              <th>
                <div className="orderId">
                  <p>Order Id</p>
                </div>
              </th>
              <th>
                <div className="datetime">
                  <p>Date & Time</p>
                </div>
              </th>
              <th>
                <div className="location">
                  <p>Location</p>
                </div>
              </th>
              <th>
                <div className="district">
                  <p>District</p>
                </div>
              </th>
              <th>
                <div className="phone">
                  <p>Phone</p>
                </div>
              </th>
              <th>
                <div className="items">
                  <p>Items</p>
                </div>
              </th>
              <th>
                <div className="price">
                  <p>Price</p>
                </div>
              </th>
              <th>
                <div className="status">
                  <p>Status</p>
                </div>
              </th>
              <th>
                <div className="cancel">
                  <p>Cancel Order</p>
                </div>
              </th>
              <th>
                <div className="view">
                  <p>View</p>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {obj.map((item, i) => (
              <List
                index={i}
                data={item}
                key={i}
                setViewTrigger={setViewTrigger}
                setViewContent={setViewContent}
                cancelOrder={setCancelOrder}
                setCancelTrigger={setCancelTrigger}
              />
            ))}
          </tbody>
        </table>
      </div>
      <ViewOrder
        viewTrigger={viewTrigger}
        data={viewContent}
        cancelOrder={setCancelOrder}
        setViewTrigger={setViewTrigger}
        setCancelTrigger={setCancelTrigger}
        user={user}
      />
      <CancelPopup
        cancelTrigger={cancelTrigger}
        setCancelTrigger={setCancelTrigger}
        orderId={cancelOrder}
        setContent={setContent}
        user={user}
      />
    </>
  );
}

export default OrderList;
