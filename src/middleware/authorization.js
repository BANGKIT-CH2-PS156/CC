const response = require("./../response");
const jwt = require("jsonwebtoken");
const blacklist = require("./../config/blacklist");

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return response.res401("Sorry you are not allow, please log in first", res);
  }

  if (blacklist.includes(authorization)) {
    return response.res401("Token has been revoked", res);
  }

  console.log(blacklist);

  const secret = process.env.JWT_SECRET;
  try {
    const jwtDecode = jwt.verify(authorization, secret);
    req.user = jwtDecode;
    next();
  } catch (error) {
    return response.res401("The token is incorrect or has been revoked", res);
  }
};

const auth2 = (req, res, next) => {
  //validation to check token
  const { authorization } = req.headers;
  if (authorization) {
    return response.res401("Sorry your has been Login", res);
  }
  next();
};

module.exports = { auth, auth2 };
