import React from "react";
import "./orderTable.css";

function OrderTable({ data }) {
  let [product, service, price, total] = data;
  return (
    <tr className="detailRow">
      <td className="product">
        <p>{product}</p>
      </td>
      <td className="service">
        <div>
          <p>{service}</p>
        </div>
      </td>
      <td className="price">
        <p>{price}</p>
      </td>
      <td className="total">
        <p>{total}</p>
      </td>
    </tr>
  );
}
export default OrderTable;
