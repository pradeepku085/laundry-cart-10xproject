import React, { useState } from "react";
import { useEffect } from "react";

const Item = ({ props, res, setRes }) => {
  const [reset, setReset] = useState({ display: "none" });
  const [quantity, setQuantity] = useState(0);
  const [washimg, setWashimg] = useState("./assets/washing-machine@2x.jpg");
  const [ironimg, setIroning] = useState("./assets/ironing@2x.png");
  const [bleach, setBleach] = useState("./assets/bleach@2x.jpg");
  const [count, setCount] = useState(0);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [price, setPrice] = useState("____");
  useEffect(() => {
    if (price !== "____") {
      let total = (count + count1 + count2) * quantity;
      let obj = { ...res };
      obj[props.product] = [count, count1, count2, price, quantity, total];
      setRes({ ...obj });
      setReset({ display: "block" });
    } else {
      let obj = { ...res };
      delete obj[props.product];
      setRes({ ...obj });
      setReset({ display: "none" });
    }
  }, [count, count1, count2, quantity, price]);
  const handleReset = () => {
    setPrice("____");
    setCount(0);
    setCount1(0);
    setCount2(0);
    setWashimg("./assets/washing-machine@2x.jpg");
    setIroning("./assets/ironing@2x.png");
    setBleach("./assets/bleach@2x.jpg");
    setQuantity(0);
  };
  const quantityChange = (e) => {
    let val = e.target.value;
    setQuantity(val);
    if (count + count1 + count2 > 0 && val > 0) {
      setPrice(
        `${val} x ${count + count1 + count2} = ${
          (count + count1 + count2) * val
        }`
      );
    } else {
      setPrice("____");
    }
  };
  const onclickedwashing = () => {
    let z = count;
    if (z === 0) {
      setWashimg("./cassets/washing-machine@2x.png");
      z = 1 * props.washing;
      setCount(z);
    } else {
      setWashimg("./assets/washing-machine@2x.jpg");
      z = 0;
      setCount(z);
    }
    if (z + count1 + count2 > 0 && quantity > 0) {
      setPrice(
        `${quantity} x ${z + count1 + count2} = ${
          (z + count1 + count2) * quantity
        }`
      );
    } else {
      setPrice("____");
    }
  };
  const onclickediron = () => {
    let y = count1;
    if (y === 0) {
      setIroning("./cassets/ironing@2x.png");
      y = 1 * props.ironing;
      setCount1(y);
    } else {
      setIroning("./assets/ironing@2x.png");
      y = 0;
      setCount1(y);
    }
    if (count + count2 + y > 0 && quantity > 0) {
      setPrice(
        `${quantity} x ${count + y + count2} = ${
          (count + y + count2) * quantity
        }`
      );
    } else {
      setPrice("____");
    }
  };
  const onclickedbleach = () => {
    let x = count2;
    if (x === 0) {
      setBleach("./cassets/bleach@2x.png");
      x = 1 * props.chemical;
      setCount2(x);
    } else {
      setBleach("./assets/bleach@2x.jpg");
      x = 0;
      setCount2(x);
    }
    if (count + count1 + x > 0 && quantity > 0) {
      setPrice(
        `${quantity} x ${count + count1 + x} = ${
          (count + count1 + x) * quantity
        }`
      );
    } else {
      setPrice("____");
    }
  };

  return (
    <>
      <tr className="table_data">
        <td>
          <div className="product details">
            <img src={props.image} alt="img" />
            <div>
              <h3>{props.product}</h3>
              <p>{props.description}</p>
            </div>
          </div>
        </td>
        <td className="quantity">
          <input
            placeholder="0"
            value={quantity}
            type="Number"
            min="0"
            onChange={(e) => quantityChange(e)}
          />
        </td>
        <td className="iconsorder">
          <div>
            <img
              src={washimg}
              alt="ironicon"
              className="img1"
              onClick={onclickedwashing}
            />
          </div>
          <div>
            <img
              src={ironimg}
              alt="ironicon"
              className="img1"
              onClick={onclickediron}
            />
          </div>
          <div>
            <img src="./assets/towel@2x.jpg" alt="ironicon" className="img1" />
          </div>
          <div>
            <img
              src={bleach}
              alt="ironicon"
              className="img2"
              onClick={onclickedbleach}
            />
          </div>
        </td>
        <td className="price">
          <div>
            <p>{price}</p>
            <button className="reset" style={reset} onClick={handleReset}>
              Reset
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default Item;
