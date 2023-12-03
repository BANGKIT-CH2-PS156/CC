const response = require("./../response");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return response(401, "Unauthorized", "tidak ada token", res);
  }
  const token = authorization.split(" ")[1];
  const secret = process.env.JWT_SECRET;
  try {
    const jwtDecode = jwt.verify(token, secret);
    req.user = jwtDecode;
  } catch (error) {
    return response(401, "Unauthorized", "token salah", res);
  }
  next();
};

module.exports = { auth };
