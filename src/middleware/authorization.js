const response = require("./../response");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return response.res401("Sorry you are not allow, please log in first", res);
  }
  const token = authorization.split(" ")[1];
  const secret = process.env.JWT_SECRET;
  try {
    const jwtDecode = jwt.verify(token, secret);
    req.user = jwtDecode;
  } catch (error) {
    return response.res401("The token is incorrect or has expired", res);
  }
  next();
};

module.exports = { auth };
