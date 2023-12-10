const response = require("./../response");
const jwt = require("jsonwebtoken");
const blacklist = require("./../config/blacklist");

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return response.res401("Sorry you are not allow, please log in first", res);
  }

  if (blacklist.includes(authorization)) {
    return response.res401("Sorry token has been revoked", res);
  }
  const token = authorization.split(' ')[1] //authorization.split if we testing token with authorization bearer in postman
  // const token = authorization //get token with headers menu in postman
  const secret = process.env.JWT_SECRET;
  try {
    const jwtDecode = jwt.verify(token, secret); 
    const email = jwtDecode.email;
    const emailEncrypt = Buffer.from(email).toString("base64");
    const user = {
      id: jwtDecode.id,
      email: jwtDecode.email,
      emailEncrypt: emailEncrypt,
    };
    req.user = user; //set data to use in the next
    next();
  } catch (error) {
    console.log(error);
    return response.res401("Sorry token is not valid", res);
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
