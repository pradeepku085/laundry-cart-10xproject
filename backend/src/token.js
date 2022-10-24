const { sign } = require("jsonwebtoken");

const createAccessToken = (userId) => {
  return sign({ email: userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1800000",
  });
};

const createRefereshToken = (userId) => {
  return sign({ email: userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

const sendAccessToken = (userName, useremail, res, accessToken) => {
  res.send({
    accessToken,
    email: useremail,
    name: userName,
  });
};

const sendRefreshToken = (res, refreshToken) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    path: "/refresh_token",
  });
};

module.exports = {
  createAccessToken,
  createRefereshToken,
  sendAccessToken,
  sendRefreshToken,
};
