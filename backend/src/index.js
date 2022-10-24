require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const user = require("../models/user");
const product = require("../models/product");
const order = require("../models/order");
const counter = require("../models/count");
const { verify } = require("jsonwebtoken");
const { hash, compare } = require("bcryptjs");
const { isAuth } = require("./authenticate");
const {
  createAccessToken,
  createRefereshToken,
  sendAccessToken,
  sendRefreshToken,
} = require("./token.js");
const port = process.env.PORT || 5000;

mongoose.connect(
  "mongodb+srv://instaclone:insta@test.vrl4wrj.mongodb.net/?retryWrites=true&w=majority"
);

const app = express();

app.use(cookieParser());
app.use(
  cors({
    // origin: "http://localhost:3000",
    credentials: true, //access-control-allow-credentials:true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/add_product", async (req, res) => {
  try {
    await product.create(req.body);
    res.send({
      message: "Product created",
    });
  } catch (err) {
    res.send({
      message: err.message,
    });
  }
});

app.post("/register", async (req, res) => {
  try {
    let email_data = await user.find({ email: req.body.email });
    let phone_data = await user.find({ phone: req.body.phone });
    if (email_data.length > 0 || phone_data.length > 0) {
      res.send({
        message: "User already exist",
        error: true,
      });
    } else {
      let hashpassword = await hash(req.body.password, 10);
      await user.create({ ...req.body, password: hashpassword });
      res.send({
        message: "User created",
        error: false,
      });
    }
  } catch (err) {
    res.send({
      message: err,
    });
  }
});

app.post("/sign_in", async (req, res) => {
  try {
    let input = req.body.userId;
    console.log(req.body);
    for (let i = 0; i < input.length; i++) {
      if (input[i] === "@") {
        input = true;
        break;
      }
    }
    let data;
    if (input === true) {
      data = await user.find({ email: req.body.userId });
    } else {
      data = await user.find({ phone: req.body.userId });
    }
    console.log(data);
    if (data.length == 0) {
      res.send({ error: "Invalid User" });
    } else {
      let valid = await compare(req.body.password, data[0].password);
      if (!valid) {
        res.send({ error: "Invalid Password" });
      } else {
        const accessToken = createAccessToken(data[0].email);
        const refreshToken = createRefereshToken(data[0].email);
        await user.updateOne(
          { email: data[0].email },
          { ...data, refreshToken: refreshToken }
        );
        sendRefreshToken(res, refreshToken);
        sendAccessToken(data[0].name, data[0].email, res, accessToken);
      }
    }
  } catch (err) {
    console.log({ error: err.message });
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("refreshToken", { path: "/refresh_token" });
  res.send({ message: "logged out" });
});

app.post("/auth/create_order", async (req, res) => {
  try {
    const userId = isAuth(req);
    if (userId !== undefined) {
      let [newcount] = await counter.find({ id: 1 });
      if (!newcount) {
        await counter.create({ id: 1, count: 1 });
        newcount = 1;
      } else {
        newcount = newcount.count;
      }
      let month = [
        "",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      let newDate = new Date();
      let date = `${newDate.getDate()} ${
        month[parseInt(newDate.getMonth()) + 1]
      } ${newDate.getFullYear()}, ${newDate.getHours()}:${newDate.getMinutes()}`;
      let id = "OR";
      let s = newcount.toString();
      let n = 5 - s.length;
      while (n > 0) {
        id += "0";
        n--;
      }
      id += s;
      await order.create({
        orderId: id,
        orderno: newcount,
        datetime: date,
        ...req.body,
      });
      newcount++;
      await counter.updateOne({ id: 1 }, { id: 1, count: newcount });
      res.send({
        message: "order created",
      });
    } else {
      res.send({
        message: "You need to login",
      });
    }
  } catch (err) {
    res.send({
      message: err.message,
    });
  }
});

app.get("/auth/orders", async (req, res) => {
  try {
    const userEmail = isAuth(req);
    if (userEmail !== undefined) {
      let orders = await order
        .find({
          userid: userEmail,
        })
        .sort({ orderno: -1 });
      res.send(orders);
    } else {
      res.send({
        message: "Invalid Token",
      });
    }
  } catch (err) {
    res.send({
      message: err.message,
    });
  }
});

app.post("/auth/update_order", async (req, res) => {
  try {
    const userEmail = isAuth(req);
    if (userEmail !== undefined) {
      let [new_order] = await order.find({ orderId: req.body.orderId });
      new_order.status = req.body.status;
      await order.updateOne({ orderId: req.body.orderId }, new_order);
      res.send({
        mwssage: "Order updated",
      });
    } else {
      res.send({
        message: "Invalid Token",
      });
    }
  } catch (err) {
    res.send({
      message: err.message,
    });
  }
});

app.get("/refresh_token", async (req, res) => {
  const token = req.cookies.refreshToken;
  if (token === undefined) {
    res.send({ accessToken: "" });
  } else {
    let payload = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
      const [userId] = await user.find({ email: payload.email });
      if (!userId) {
        res.send({ accessToken: "" });
      } else if (userId.refreshToken !== token) {
        res.send({ accessToken: "" });
      } else {
        const accesstoken = createAccessToken(userId.email);
        const refreshtoken = createRefereshToken(userId.email);
        userId.refreshToken = refreshtoken;
        await user.updateOne({ email: userId.email }, userId);
        sendRefreshToken(res, refreshtoken);
        sendAccessToken(userId.email, res, accesstoken);
      }
    } catch (err) {
      res.send({ message: err.message });
    }
  }
});
app.listen(port, () => console.log(`server running on port ${port}`));
