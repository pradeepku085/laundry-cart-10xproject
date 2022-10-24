import React, { useState } from "react";
import "./create_order.css";
import Item from "./item";
import OrderSummery from "../popup/orderSummery";
import SuccessPopup from "../popup/successPopup";
import Content from "./content";

function Create_order({ setContent, user }) {
  const [res, setRes] = useState({});
  const [summerytrigger, setSummerytrigger] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const handleProceed = () => {
    if (Object.keys(res).length > 0) {
      setSummerytrigger(true);
    }
  };
  var obj = [
    {
      _id: "6349166d3bc798601f446426",
      product: "Shirts",
      description: "Lipsum as it is sometimes known",
      image: "./image/shirt.jpg",
      washing: 10,
      ironing: 10,
      drying: 10,
      chemical: 50,
      __v: 0,
    },
    {
      _id: "634916773bc798601f446428",
      product: "T Shirts",
      description: "Lipsum as it is sometimes known",
      image: "./image/tshirt.jpg",
      washing: 10,
      ironing: 10,
      drying: 10,
      chemical: 50,
      __v: 0,
    },
    {
      _id: "634916a23bc798601f44642a",
      product: "Trousers",
      description: "Lipsum as it is sometimes known",
      image: "./image/trousers.jpg",
      washing: 10,
      ironing: 10,
      drying: 10,
      chemical: 50,
      __v: 0,
    },
    {
      _id: "634916ba3bc798601f44642c",
      product: "Jeans",
      description: "Lipsum as it is sometimes known",
      image: "./image/jeans.jpg",
      washing: 15,
      ironing: 15,
      drying: 10,
      chemical: 60,
      __v: 0,
    },
    {
      _id: "634916d83bc798601f44642e",
      product: "Boxers",
      description: "Lipsum as it is sometimes known",
      image: "./image/boxers.jpg",
      washing: 10,
      ironing: 10,
      drying: 10,
      chemical: 50,
      __v: 0,
    },
    {
      _id: "634917073bc798601f446430",
      product: "Joggers",
      description: "Lipsum as it is sometimes known",
      image: "./image/joggers.jpg",
      washing: 20,
      ironing: 20,
      drying: 10,
      chemical: 100,
      __v: 0,
    },
    {
      _id: "634917193bc798601f446432",
      product: "Others",
      description: "Lipsum as it is sometimes known",
      image: "./image/others.jpg",
      washing: 20,
      ironing: 20,
      drying: 10,
      chemical: 100,
      __v: 0,
    },
  ];
  return (
    <div className="createorder">
      <div className="header">
        <div className="numoforder">
          <h3>Create Order</h3>
        </div>
        <div className="searchbar">
          <div className="searchicon">
            <img src="./image/search.svg" alt="" />
          </div>
        </div>
      </div>
      <div className="product_table">
        <table>
          <thead className="table_head">
            <tr>
              <th>
                <div className="product head">
                  <p>Product</p>
                </div>
              </th>
              <th>
                <div className="quantity head">
                  <p>Quantity</p>
                </div>
              </th>
              <th>
                <div className="wash head">
                  <p>Wash Type</p>
                </div>
              </th>
              <th>
                <div className="price head">
                  <p>Price</p>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {obj.map((items, index) => (
              <Item key={index} props={items} res={res} setRes={setRes} />
            ))}
          </tbody>
        </table>
        <div className="create_btn">
          <button
            onClick={() => setContent(<Content setContent={setContent} />)}
          >
            Cancel
          </button>
          <button onClick={handleProceed}>Proceed</button>
        </div>
      </div>
      <OrderSummery
        trigger={summerytrigger}
        setTrigger={setSummerytrigger}
        success={setSuccessPopup}
        data={res}
        user={user}
      />
      <SuccessPopup
        trigger={successPopup}
        setTrigger={setSuccessPopup}
        setContent={setContent}
        user={user}
      />
    </div>
  );
}

export default Create_order;
