import React from "react";
import Create_order from "./create_order";

function ZeroOrder({ setContent, user }) {
  return (
    <div id="zeroorder">
      <div className="header">
        <div className="numoforder">
          <h3>Orders | 0</h3>
        </div>
        <div className="searchbar">
          <div className="searchicon">
            <img src="./image/search.svg" alt="" />
          </div>
        </div>
      </div>
      <div className="real-content">
        <div>
          <p>No Orders Available</p>
          <br />
          <button
            onClick={() =>
              setContent(<Create_order setContent={setContent} user={user} />)
            }
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default ZeroOrder;
