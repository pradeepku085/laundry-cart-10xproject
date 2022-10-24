const { verify } = require("jsonwebtoken");

const isAuth = (req) => {
  const authorization = req.headers["authorization"];
  if (!authorization) throw new Error("You need to login");
  const token = authorization.split(" ")[1];
  //console.log(token);
  const userId = verify(token, process.env.ACCESS_TOKEN_SECRET);
  //console.log(userId);
  return userId.email;
};

module.exports = {
  isAuth,
};
