import React, { useEffect } from "react";
import ZeroOrder from "./zeroOrder";
import OrderList from "./orderList";

function Content({ setContent, user }) {
  useEffect(() => {
    async function getdata() {
      const result = await (
        await fetch("http://localhost:5000/auth/orders", {
          method: "GET",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${user.accessToken}`,
          },
        })
      ).json();
      if (result.length === 0) {
        setContent(<ZeroOrder setContent={setContent} user={user} />);
      } else {
        setContent(
          <OrderList setContent={setContent} obj={result} user={user} />
        );
      }
    }
    getdata();
  }, []);
}

export default Content;
